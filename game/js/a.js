const ball = document.getElementById('ball');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;
let isGameRunning = false;
let ballX = 0;
let ballY = 0;
let ballSpeedX = 0;
let ballSpeedY = 0;
let keysPressed = {};
const friction = 0.98;
const acceleration = 0.5;
const maxSpeed = 8;

// 初始化游戏
function initGame() {
    // 重置变量
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `分数: ${score}`;
    timerDisplay.textContent = `时间: ${timeLeft}`;
    
    // 放置小球在中心
    ballX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2 - ball.offsetHeight / 2;
    updateBallPosition();
    
    // 清除所有星星
    document.querySelectorAll('.star').forEach(star => star.remove());
    
    // 生成初始星星
    generateStars(5);
    
    // 显示游戏界面，隐藏开始和结束界面
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    // 开始游戏循环
    isGameRunning = true;
    gameInterval = setInterval(updateGame, 16);
    timerInterval = setInterval(updateTimer, 1000);
}

// 更新游戏状态
function updateGame() {
    // 处理小球移动
    handleBallMovement();
    
    // 检测碰撞
    checkStarCollisions();
}

// 处理小球移动
function handleBallMovement() {
    // 应用加速度
    if (keysPressed['ArrowLeft'] || keysPressed['a']) {
        ballSpeedX -= acceleration;
    }
    if (keysPressed['ArrowRight'] || keysPressed['d']) {
        ballSpeedX += acceleration;
    }
    if (keysPressed['ArrowUp'] || keysPressed['w']) {
        ballSpeedY -= acceleration;
    }
    if (keysPressed['ArrowDown'] || keysPressed['s']) {
        ballSpeedY += acceleration;
    }
    
    // 限制最大速度
    ballSpeedX = Math.max(-maxSpeed, Math.min(maxSpeed, ballSpeedX));
    ballSpeedY = Math.max(-maxSpeed, Math.min(maxSpeed, ballSpeedY));
    
    // 应用摩擦力
    ballSpeedX *= friction;
    ballSpeedY *= friction;
    
    // 如果速度很小，则停止
    if (Math.abs(ballSpeedX) < 0.1) ballSpeedX = 0;
    if (Math.abs(ballSpeedY) < 0.1) ballSpeedY = 0;
    
    // 更新位置
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // 边界检查
    if (ballX < 0) {
        ballX = 0;
        ballSpeedX *= -0.8; // 反弹
    }
    if (ballX > gameContainer.offsetWidth - ball.offsetWidth) {
        ballX = gameContainer.offsetWidth - ball.offsetWidth;
        ballSpeedX *= -0.8; // 反弹
    }
    if (ballY < 0) {
        ballY = 0;
        ballSpeedY *= -0.8; // 反弹
    }
    if (ballY > gameContainer.offsetHeight - ball.offsetHeight) {
        ballY = gameContainer.offsetHeight - ball.offsetHeight;
        ballSpeedY *= -0.8; // 反弹
    }
    
    // 更新小球位置
    updateBallPosition();
}

// 更新小球位置
function updateBallPosition() {
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    
    // 添加倾斜效果
    const tiltX = ballSpeedX * 3;
    const tiltY = ballSpeedY * 3;
    ball.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
}

// 生成星星
function generateStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置，确保不会太靠近边缘
        const x = Math.random() * (gameContainer.offsetWidth - 40) + 20;
        const y = Math.random() * (gameContainer.offsetHeight - 40) + 20;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // 随机大小
        const size = Math.random() * 0.5 + 0.8;
        star.style.transform = `scale(${size})`;
        
        // 随机动画延迟
        star.style.animationDelay = `${Math.random() * 0.5}s`;
        
        gameContainer.appendChild(star);
    }
}

// 检测星星碰撞
function checkStarCollisions() {
    const stars = document.querySelectorAll('.star');
    const ballRect = ball.getBoundingClientRect();
    
    stars.forEach(star => {
        const starRect = star.getBoundingClientRect();
        
        // 简单的碰撞检测
        if (
            ballRect.right > starRect.left &&
            ballRect.left < starRect.right &&
            ballRect.bottom > starRect.top &&
            ballRect.top < starRect.bottom
        ) {
            // 碰撞发生
            collectStar(star);
        }
    });
}

// 收集星星
function collectStar(star) {
    // 增加分数
    score += 10;
    scoreDisplay.textContent = `分数: ${score}`;
    
    // 创建粒子效果
    createParticles(star);
    
    // 移除星星
    star.remove();
    
    // 生成新星星
    generateStars(1);
}

// 创建粒子效果
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();
    
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // 随机颜色 - 金色调
        const hue = 40 + Math.random() * 20; // 40-60 是金色范围
        particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        
        // 随机大小
        const size = Math.random() * 6 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        gameContainer.appendChild(particle);
        
        // 动画
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const lifetime = Math.random() * 1000 + 500;
        
        let startTime = Date.now();
        
        function animateParticle() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / lifetime;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            const distance = speed * elapsed / 20;
            const currentX = x + Math.cos(angle) * distance;
            const currentY = y + Math.sin(angle) * distance;
            
            particle.style.left = `${currentX}px`;
            particle.style.top = `${currentY}px`;
            particle.style.opacity = 1 - progress;
            
            requestAnimationFrame(animateParticle);
        }
        
        requestAnimationFrame(animateParticle);
    }
}

// 更新计时器
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `时间: ${timeLeft}`;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

// 结束游戏
function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    
    finalScoreDisplay.textContent = `你的分数: ${score}`;
    gameOverScreen.style.display = 'flex';
}

// 事件监听器
startButton.addEventListener('click', initGame);
restartButton.addEventListener('click', initGame);

// 键盘控制
window.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
});

// 触摸控制（移动设备支持）
let touchStartX = 0;
let touchStartY = 0;

gameContainer.addEventListener('touchstart', (e) => {
    if (!isGameRunning) return;
    
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

gameContainer.addEventListener('touchmove', (e) => {
    if (!isGameRunning) return;
    
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    // 计算滑动方向
    const dx = touchX - touchStartX;
    const dy = touchY - touchStartY;
    
    // 根据滑动距离设置小球速度
    ballSpeedX = dx * 0.1;
    ballSpeedY = dy * 0.1;
    
    touchStartX = touchX;
    touchStartY = touchY;
});