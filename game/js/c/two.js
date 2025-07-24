// 游戏变量
let canvas, ctx;
let gameRunning = false;
let scores = [0, 0]; // 玩家1和玩家2的分数
let lives = [3, 3]; // 玩家1和玩家2的生命值
let maxLives = 3;
let animationId;
let keys = {};
let powerups = [
    { // 玩家1
        shield: { active: false, timeLeft: 0, duration: 10000 },
        doubleShot: { active: false, timeLeft: 0, duration: 10000 }
    },
    { // 玩家2
        shield: { active: false, timeLeft: 0, duration: 10000 },
        doubleShot: { active: false, timeLeft: 0, duration: 10000 }
    }
];
let powerupMultiplier = 1; // 邀请码激活后变为2

// 玩家飞船
const players = [
    { // 玩家1
        x: 200,
        y: 500,
        width: 40,
        height: 40,
        speed: 8,
        color: '#00c6ff',
        isShooting: false,
        bullets: [],
        lastShot: 0,
        shootDelay: 300,
        invincible: false,
        invincibleTime: 0,
        controls: {
            up: 'w',
            down: 's',
            left: 'a',
            right: 'd',
            shoot: ' '
        }
    },
    { // 玩家2
        x: 400,
        y: 500,
        width: 40,
        height: 40,
        speed: 8,
        color: '#ff6600',
        isShooting: false,
        bullets: [],
        lastShot: 0,
        shootDelay: 300,
        invincible: false,
        invincibleTime: 0,
        controls: {
            up: 'ArrowUp',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight',
            shoot: '0'
        }
    }
];

// 敌人
let enemies = [];
let enemyBullets = [];
let enemySpawnRate = 1000; // 毫秒
let lastEnemySpawn = 0;
let lastEnemyShoot = 0;
let enemyShootDelay = 1500;

// 道具
let powerupItems = [];

// 星星背景
let stars = [];

// 粒子效果
let particles = [];

// 初始化游戏
function init() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // 设置画布大小为窗口大小
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 创建星星背景
    createStars();
    
    // 事件监听
    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        // 防止方向键滚动页面
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
        }
    });
    window.addEventListener('keyup', (e) => keys[e.key] = false);
    
    // 鼠标事件
    canvas.addEventListener('mousedown', () => players[0].isShooting = true);
    canvas.addEventListener('mouseup', () => players[0].isShooting = false);
    
    // 显示自定义鼠标指针
    document.addEventListener('mousemove', updateCustomCursor);
    
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart-button').addEventListener('click', restartGame);
    document.getElementById('submit-code').addEventListener('click', submitInviteCode);
}

// 调整画布大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 重置玩家位置
    players[0].x = canvas.width / 3;
    players[0].y = canvas.height - 100;
    players[1].x = canvas.width * 2 / 3;
    players[1].y = canvas.height - 100;
    
    // 重新创建星星背景
    createStars();
}

// 更新自定义鼠标指针
function updateCustomCursor(e) {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.display = 'block';
}

// 提交邀请码
function submitInviteCode() {
    const codeInput = document.getElementById('code-input');
    if (codeInput.value === '1234') {
        // 增加生命值
        lives[0] = Math.min(lives[0] + 20, maxLives + 20);
        lives[1] = Math.min(lives[1] + 20, maxLives + 20);
        updateLives();
        
        // 技能时间翻倍
        powerupMultiplier = 2;
        
        // 更新现有技能时间
        for (let i = 0; i < 2; i++) {
            if (powerups[i].shield.active) {
                powerups[i].shield.timeLeft += powerups[i].shield.duration;
            }
            if (powerups[i].doubleShot.active) {
                powerups[i].doubleShot.timeLeft += powerups[i].doubleShot.duration;
            }
        }
        
        alert('邀请码正确！每位玩家获得20生命值，技能时间翻倍！');
        codeInput.value = '';
    } else {
        alert('邀请码错误！');
    }
}

// 创建星星背景
function createStars() {
    stars = [];
    const starCount = Math.max(100, Math.floor(canvas.width * canvas.height / 5000));
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 2 + 0.5,
            alpha: Math.random()
        });
    }
}

// 开始游戏
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    gameRunning = true;
    scores = [0, 0];
    lives = [maxLives, maxLives];
    powerupMultiplier = 1;
    players.forEach(player => {
        player.bullets = [];
        player.invincible = false;
    });
    enemyBullets = [];
    enemies = [];
    powerupItems = [];
    particles = [];
    powerups.forEach(p => {
        p.shield.active = false;
        p.doubleShot.active = false;
    });
    updateScore();
    updateLives();
    updatePowerupDisplay();
    gameLoop();
}

// 重新开始游戏
function restartGame() {
    document.getElementById('game-over-screen').style.display = 'none';
    startGame();
}

// 游戏结束
function gameOver() {
    gameRunning = false;
    document.getElementById('final-score').textContent = `玩家1: ${scores[0]} | 玩家2: ${scores[1]}`;
    document.getElementById('game-over-screen').style.display = 'flex';
    cancelAnimationFrame(animationId);
}

// 游戏主循环
function gameLoop() {
    if (!gameRunning) return;
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 更新和绘制背景
    updateBackground();
    
    // 更新和绘制玩家
    updatePlayers();
    drawPlayers();
    
    // 更新和绘制子弹
    updateBullets();
    drawBullets();
    
    // 更新和绘制敌人子弹
    updateEnemyBullets();
    drawEnemyBullets();
    
    // 生成和更新敌人
    spawnEnemies();
    updateEnemies();
    drawEnemies();
    
    // 更新和绘制道具
    updatePowerupItems();
    drawPowerupItems();
    
    // 更新和绘制粒子
    updateParticles();
    drawParticles();
    
    // 检查无敌状态
    checkInvincible();
    
    // 更新技能状态
    updatePowerups();
    
    // 继续循环
    animationId = requestAnimationFrame(gameLoop);
}

// 更新背景
function updateBackground() {
    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f0c29');
    gradient.addColorStop(0.5, '#302b63');
    gradient.addColorStop(1, '#24243e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 更新和绘制星星
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
        
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });
}

// 更新玩家位置
function updatePlayers() {
    players.forEach((player, index) => {
        const controls = player.controls;
        
        // 键盘控制移动
        if (keys[controls.up]) {
            player.y = Math.max(0, player.y - player.speed);
        }
        if (keys[controls.down]) {
            player.y = Math.min(canvas.height - player.height, player.y + player.speed);
        }
        if (keys[controls.left]) {
            player.x = Math.max(0, player.x - player.speed);
        }
        if (keys[controls.right]) {
            player.x = Math.min(canvas.width - player.width, player.x + player.speed);
        }
        
        // 射击逻辑
        const now = Date.now();
        if (keys[controls.shoot] && now - player.lastShot > player.shootDelay) {
            if (powerups[index].doubleShot.active) {
                // 双弹道射击
                player.bullets.push({
                    x: player.x + player.width / 2 - 10,
                    y: player.y,
                    width: 5,
                    height: 15,
                    speed: 10,
                    color: index === 0 ? '#00ffcc' : '#ffcc00'
                });
                player.bullets.push({
                    x: player.x + player.width / 2 + 5,
                    y: player.y,
                    width: 5,
                    height: 15,
                    speed: 10,
                    color: index === 0 ? '#00ffcc' : '#ffcc00'
                });
            } else {
                // 单弹道射击
                player.bullets.push({
                    x: player.x + player.width / 2 - 2.5,
                    y: player.y,
                    width: 5,
                    height: 15,
                    speed: 10,
                    color: index === 0 ? '#00ffcc' : '#ffcc00'
                });
            }
            player.lastShot = now;
        }
    });
}

// 绘制玩家
function drawPlayers() {
    players.forEach((player, index) => {
        // 如果无敌状态，闪烁效果
        if (player.invincible) {
            const blink = Math.floor(Date.now() / 100) % 2 === 0;
            if (!blink) return;
        }
        
        // 绘制防护盾
        if (powerups[index].shield.active) {
            ctx.strokeStyle = index === 0 ? 'rgba(0, 200, 255, 0.7)' : 'rgba(255, 150, 0, 0.7)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(
                player.x + player.width / 2,
                player.y + player.height / 2,
                player.width + 10,
                0,
                Math.PI * 2
            );
            ctx.stroke();
        }
        
        // 绘制飞船主体
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.moveTo(player.x + player.width / 2, player.y);
        ctx.lineTo(player.x + player.width, player.y + player.height);
        ctx.lineTo(player.x, player.y + player.height);
        ctx.closePath();
        ctx.fill();
        
        // 绘制飞船引擎效果
        ctx.fillStyle = index === 0 ? '#ff6600' : '#00aaff';
        ctx.beginPath();
        ctx.moveTo(player.x + player.width / 3, player.y + player.height);
        ctx.lineTo(player.x + player.width * 2/3, player.y + player.height);
        ctx.lineTo(player.x + player.width / 2, player.y + player.height + 10);
        ctx.closePath();
        ctx.fill();
    });
}

// 更新子弹
function updateBullets() {
    players.forEach((player, playerIndex) => {
        for (let i = player.bullets.length - 1; i >= 0; i--) {
            const bullet = player.bullets[i];
            bullet.y -= bullet.speed;
            
            // 移除超出画布的子弹
            if (bullet.y + bullet.height < 0) {
                player.bullets.splice(i, 1);
                continue;
            }
            
            // 检测子弹与敌人的碰撞
            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                if (checkCollision(bullet, enemy)) {
                    // 根据敌人类型掉落道具
                    if (enemy.isShieldDropper) {
                        powerupItems.push({
                            x: enemy.x + enemy.width / 2 - 15,
                            y: enemy.y + enemy.height,
                            width: 30,
                            height: 30,
                            speed: 2,
                            type: 'shield',
                            color: '#00aaff'
                        });
                    } else if (enemy.isDoubleShotDropper) {
                        powerupItems.push({
                            x: enemy.x + enemy.width / 2 - 15,
                            y: enemy.y + enemy.height,
                            width: 30,
                            height: 30,
                            speed: 2,
                            type: 'doubleShot',
                            color: '#ff00aa'
                        });
                    } else if (enemy.isLifeDropper) {
                        powerupItems.push({
                            x: enemy.x + enemy.width / 2 - 15,
                            y: enemy.y + enemy.height,
                            width: 30,
                            height: 30,
                            speed: 2,
                            type: 'life',
                            color: '#55ff55'
                        });
                    }
                    
                    // 创建爆炸粒子
                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                    
                    // 移除子弹和敌人
                    player.bullets.splice(i, 1);
                    enemies.splice(j, 1);
                    
                    // 增加分数
                    scores[playerIndex] += 10;
                    updateScore();
                    break;
                }
            }
        }
    });
}

// 绘制子弹
function drawBullets() {
    players.forEach(player => {
        player.bullets.forEach(bullet => {
            ctx.fillStyle = bullet.color;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            
            // 子弹尾迹
            ctx.fillStyle = bullet.color.replace(')', ', 0.5)').replace('rgb', 'rgba');
            ctx.fillRect(bullet.x, bullet.y + bullet.height, bullet.width, 5);
        });
    });
}

// 更新敌人子弹
function updateEnemyBullets() {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const bullet = enemyBullets[i];
        bullet.y += bullet.speed;
        
        // 移除超出画布的子弹
        if (bullet.y > canvas.height) {
            enemyBullets.splice(i, 1);
            continue;
        }
        
        // 检测子弹与玩家的碰撞
        players.forEach((player, playerIndex) => {
            if (!player.invincible && checkCollision(bullet, player)) {
                // 如果有防护盾，不减少生命值
                if (powerups[playerIndex].shield.active) {
                    enemyBullets.splice(i, 1);
                    return;
                }
                
                enemyBullets.splice(i, 1);
                decreaseLife(playerIndex);
            }
        });
    }
}

// 绘制敌人子弹
function drawEnemyBullets() {
    enemyBullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        
        // 子弹尾迹
        ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
        ctx.fillRect(bullet.x, bullet.y - 5, bullet.width, 5);
    });
}

// 生成敌人
function spawnEnemies() {
    const now = Date.now();
    if (now - lastEnemySpawn > enemySpawnRate) {
        const enemyType = Math.random();
        let enemy;
        
        if (enemyType < 0.15) {
            // 15% 几率生成生命敌机
            enemy = createLifeDropper();
        } else if (enemyType < 0.3) {
            // 15% 几率生成防护盾敌机
            enemy = createShieldDropper();
        } else if (enemyType < 0.45) {
            // 15% 几率生成双弹道敌机
            enemy = createDoubleShotDropper();
        } else {
            // 55% 普通敌机
            enemy = createNormalEnemy();
        }
        
        enemies.push(enemy);
        lastEnemySpawn = now;
        
        // 随着分数增加，敌人出现得更快
        const totalScore = scores[0] + scores[1];
        enemySpawnRate = Math.max(200, 1000 - totalScore / 10);
    }
    
    // 敌机射击
    if (now - lastEnemyShoot > enemyShootDelay) {
        shootFromRandomEnemy();
        lastEnemyShoot = now;
        enemyShootDelay = Math.max(500, 1500 - (scores[0] + scores[1]) / 20);
    }
}

// 创建普通敌机
function createNormalEnemy() {
    const size = Math.random() * 30 + 20;
    return {
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 60 + 300}, 80%, 60%)`,
        isLifeDropper: false,
        isShieldDropper: false,
        isDoubleShotDropper: false
    };
}

// 创建生命敌机
function createLifeDropper() {
    const size = Math.random() * 30 + 20;
    return {
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: Math.random() * 2 + 1,
        color: `hsl(120, 80%, 60%)`,
        isLifeDropper: true,
        isShieldDropper: false,
        isDoubleShotDropper: false
    };
}

// 创建防护盾敌机
function createShieldDropper() {
    const size = Math.random() * 30 + 20;
    return {
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: Math.random() * 2 + 1,
        color: `hsl(200, 80%, 60%)`,
        isLifeDropper: false,
        isShieldDropper: true,
        isDoubleShotDropper: false
    };
}

// 创建双弹道敌机
function createDoubleShotDropper() {
    const size = Math.random() * 30 + 20;
    return {
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: Math.random() * 2 + 1,
        color: `hsl(300, 80%, 60%)`,
        isLifeDropper: false,
        isShieldDropper: false,
        isDoubleShotDropper: true
    };
}

// 随机敌机射击
function shootFromRandomEnemy() {
    if (enemies.length === 0) return;
    
    const shootingEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    
    enemyBullets.push({
        x: shootingEnemy.x + shootingEnemy.width / 2 - 3,
        y: shootingEnemy.y + shootingEnemy.height,
        width: 6,
        height: 15,
        speed: 5,
        color: '#ff5555'
    });
}

// 更新敌人
function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.y += enemy.speed;
        
        // 移除超出画布的敌人
        if (enemy.y > canvas.height) {
            enemies.splice(i, 1);
            continue;
        }
        
        // 检测敌人与玩家的碰撞
        players.forEach((player, playerIndex) => {
            if (!player.invincible && checkCollision(enemy, player)) {
                // 如果有防护盾，不减少生命值
                if (powerups[playerIndex].shield.active) {
                    enemies.splice(i, 1);
                    return;
                }
                
                createExplosion(player.x + player.width / 2, player.y + player.height / 2, player.color);
                decreaseLife(playerIndex);
                enemies.splice(i, 1);
            }
        });
    }
}

// 绘制敌人
function drawEnemies() {
    enemies.forEach(enemy => {
        // 敌人主体
        ctx.fillStyle = enemy.color;
        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // 敌人细节
        if (enemy.isLifeDropper) {
            // 生命敌机的特殊标记
            ctx.fillStyle = 'white';
            ctx.font = `${enemy.width / 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText("♥", enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        } else if (enemy.isShieldDropper) {
            // 防护盾敌机的特殊标记
            ctx.fillStyle = 'white';
            ctx.font = `${enemy.width / 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText("⛨", enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        } else if (enemy.isDoubleShotDropper) {
            // 双弹道敌机的特殊标记
            ctx.fillStyle = 'white';
            ctx.font = `${enemy.width / 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText("⚡", enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        } else {
            // 普通敌机的细节
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 3, enemy.width / 4, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

// 更新道具
function updatePowerupItems() {
    for (let i = powerupItems.length - 1; i >= 0; i--) {
        const item = powerupItems[i];
        item.y += item.speed;
        
        // 移除超出画布的道具
        if (item.y > canvas.height) {
            powerupItems.splice(i, 1);
            continue;
        }
        
        // 检测道具与玩家的碰撞
        players.forEach((player, playerIndex) => {
            if (checkCollision(item, player)) {
                if (item.type === 'life') {
                    increaseLife(playerIndex);
                } else if (item.type === 'shield') {
                    activateShield(playerIndex);
                } else if (item.type === 'doubleShot') {
                    activateDoubleShot(playerIndex);
                }
                powerupItems.splice(i, 1);
            }
        });
    }
}

// 绘制道具
function drawPowerupItems() {
    powerupItems.forEach(item => {
        ctx.fillStyle = item.color;
        
        if (item.type === 'life') {
            // 绘制心形生命道具
            drawHeart(
                ctx, 
                item.x + item.width / 2, 
                item.y + item.height / 2, 
                item.width / 2, 
                item.height / 2
            );
        } else if (item.type === 'shield') {
            // 绘制防护盾道具
            ctx.beginPath();
            ctx.arc(
                item.x + item.width / 2,
                item.y + item.height / 2,
                item.width / 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
            
            ctx.fillStyle = 'white';
            ctx.font = `${item.width / 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText("⛨", item.x + item.width / 2, item.y + item.height / 2);
        } else if (item.type === 'doubleShot') {
            // 绘制双弹道道具
            ctx.beginPath();
            ctx.arc(
                item.x + item.width / 2,
                item.y + item.height / 2,
                item.width / 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
            
            ctx.fillStyle = 'white';
            ctx.font = `${item.width / 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText("⚡", item.x + item.width / 2, item.y + item.height / 2);
        }
    });
}

// 绘制心形
function drawHeart(ctx, x, y, width, height) {
    ctx.save();
    ctx.beginPath();
    const topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // 左上曲线
    ctx.bezierCurveTo(
        x, y, 
        x - width / 2, y, 
        x - width / 2, y + topCurveHeight
    );
    // 左下曲线
    ctx.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height
    );
    // 右下曲线
    ctx.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + topCurveHeight
    );
    // 右上曲线
    ctx.bezierCurveTo(
        x + width / 2, y, 
        x, y, 
        x, y + topCurveHeight
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// 激活防护盾
function activateShield(playerIndex) {
    powerups[playerIndex].shield.active = true;
    powerups[playerIndex].shield.timeLeft = Date.now() + powerups[playerIndex].shield.duration * powerupMultiplier;
    updatePowerupDisplay();
}

// 激活双弹道
function activateDoubleShot(playerIndex) {
    powerups[playerIndex].doubleShot.active = true;
    powerups[playerIndex].doubleShot.timeLeft = Date.now() + powerups[playerIndex].doubleShot.duration * powerupMultiplier;
    updatePowerupDisplay();
}

// 更新技能状态
function updatePowerups() {
    const now = Date.now();
    
    for (let i = 0; i < 2; i++) {
        if (powerups[i].shield.active && now > powerups[i].shield.timeLeft) {
            powerups[i].shield.active = false;
            updatePowerupDisplay();
        }
        
        if (powerups[i].doubleShot.active && now > powerups[i].doubleShot.timeLeft) {
            powerups[i].doubleShot.active = false;
            updatePowerupDisplay();
        }
    }
}

// 更新技能显示
function updatePowerupDisplay() {
    for (let i = 0; i < 2; i++) {
        let displayText = '';
        
        if (powerups[i].shield.active) {
            const timeLeft = Math.ceil((powerups[i].shield.timeLeft - Date.now()) / 1000);
            displayText += `防护盾: ${timeLeft}s | `;
        }
        
        if (powerups[i].doubleShot.active) {
            const timeLeft = Math.ceil((powerups[i].doubleShot.timeLeft - Date.now()) / 1000);
            displayText += `双弹道: ${timeLeft}s`;
        }
        
        document.getElementById(`powerup-display-${i+1}`).textContent = displayText;
    }
}

// 创建爆炸粒子
function createExplosion(x, y, color) {
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 3 + 1,
            color: color,
            speedX: Math.random() * 6 - 3,
            speedY: Math.random() * 6 - 3,
            alpha: 1,
            decay: Math.random() * 0.05 + 0.01
        });
    }
}

// 更新粒子
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= p.decay;
        
        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}

// 绘制粒子
function drawParticles() {
    particles.forEach(p => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });
}

// 减少生命
function decreaseLife(playerIndex) {
    if (players[playerIndex].invincible) return;
    
    lives[playerIndex]--;
    updateLives();
    
    // 检查游戏是否结束
    if (lives[0] <= 0 && lives[1] <= 0) {
        gameOver();
    } else if (lives[playerIndex] <= 0) {
        // 如果只有一个玩家死亡，设置无敌状态
        players[playerIndex].invincible = true;
        players[playerIndex].invincibleTime = Date.now() + 2000; // 2秒无敌时间
    } else {
        // 设置无敌状态
        players[playerIndex].invincible = true;
        players[playerIndex].invincibleTime = Date.now() + 2000; // 2秒无敌时间
    }
}

// 增加生命
function increaseLife(playerIndex) {
    if (lives[playerIndex] < 999999999) { // 允许超过最大生命值（邀请码奖励）
        lives[playerIndex]++;
        updateLives();
    }
}

// 检查无敌状态
function checkInvincible() {
    const now = Date.now();
    players.forEach((player, index) => {
        if (player.invincible && now > player.invincibleTime) {
            player.invincible = false;
        }
    });
}

// 碰撞检测
function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
}

// 更新分数显示
function updateScore() {
    document.getElementById('score-display-1').textContent = `玩家1: ${scores[0]}`;
    document.getElementById('score-display-2').textContent = `玩家2: ${scores[1]}`;
}

// 更新生命显示
function updateLives() {
    document.getElementById('lives-display-1').textContent = `生命: ${lives[0]}/${maxLives}`;
    document.getElementById('lives-display-2').textContent = `生命: ${lives[1]}/${maxLives}`;
    
    // 生命低时闪烁效果
    for (let i = 0; i < 2; i++) {
        const livesDisplay = document.getElementById(`lives-display-${i+1}`);
        if (lives[i] <= 1) {
            livesDisplay.classList.add('pulse');
        } else {
            livesDisplay.classList.remove('pulse');
        }
    }
}

// 初始化游戏
window.onload = init;