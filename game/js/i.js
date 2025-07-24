// 游戏常量
const GRID_SIZE = 16;
const CELL_SIZE = 32;
const PLAYER_RADIUS = CELL_SIZE / 2 - 2;
const GAME_DURATION = 20; // 15秒游戏时间
const AI_MOVE_INTERVAL = 200; // AI每300毫秒移动一次

// 游戏状态
const EMPTY = 0;
const PLAYER = 1;
const AI = 2;

let grid = [];
let gameOver = false;
let playerScore = 0;
let aiScore = 0;
let timeLeft = GAME_DURATION;
let timerInterval;
let aiInterval;
let playerX = Math.floor(GRID_SIZE / 2);
let playerY = Math.floor(GRID_SIZE / 2);
let aiX = Math.floor(GRID_SIZE / 4);
let aiY = Math.floor(GRID_SIZE / 4);

// DOM元素
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerScoreElement = document.getElementById('playerScore');
const aiScoreElement = document.getElementById('aiScore');
const neutralScoreElement = document.getElementById('neutralScore');
const gameOverElement = document.getElementById('gameOver');
const restartButton = document.getElementById('restartButton');
const timerElement = document.getElementById('timer');

// 初始化游戏
function initGame() {
    // 初始化网格
    grid = new Array(GRID_SIZE);
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = new Array(GRID_SIZE).fill(EMPTY);
    }
    
    // 重置游戏状态
    gameOver = false;
    playerScore = 0;
    aiScore = 0;
    timeLeft = GAME_DURATION;
    playerX = Math.floor(GRID_SIZE / 2);
    playerY = Math.floor(GRID_SIZE / 2);
    aiX = Math.floor(GRID_SIZE / 4);
    aiY = Math.floor(GRID_SIZE / 4);
    
    // 清除之前的定时器
    clearInterval(timerInterval);
    clearInterval(aiInterval);
    
    // 开始计时器
    timerInterval = setInterval(updateTimer, 1000);
    
    // 开始AI移动
    aiInterval = setInterval(aiMove, AI_MOVE_INTERVAL);
    
    // 更新UI
    updateScores();
    timerElement.textContent = timeLeft;
    gameOverElement.textContent = "";
    gameOverElement.className = "game-over";
    
    // 绘制初始网格和角色
    drawGrid();
}

// 绘制网格和角色
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格背景
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (grid[y][x] === PLAYER) {
                ctx.fillStyle = 'limegreen';
            } else if (grid[y][x] === AI) {
                ctx.fillStyle = 'crimson';
            } else {
                ctx.fillStyle = 'white';
            }
            
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            
            // 绘制网格线
            ctx.strokeStyle = '#f0f0f0';
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
    
    // 绘制玩家圆球
    drawCircle(playerX, playerY, 'green', 'darkgreen');
    
    // 绘制AI圆球
    drawCircle(aiX, aiY, 'red', 'darkred');
}

// 绘制圆球
function drawCircle(x, y, color, borderColor) {
    ctx.beginPath();
    ctx.arc(
        x * CELL_SIZE + CELL_SIZE / 2,
        y * CELL_SIZE + CELL_SIZE / 2,
        PLAYER_RADIUS,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// 更新分数显示
function updateScores() {
    playerScore = countCells(PLAYER);
    aiScore = countCells(AI);
    const neutral = GRID_SIZE * GRID_SIZE - playerScore - aiScore;
    
    playerScoreElement.textContent = playerScore;
    aiScoreElement.textContent = aiScore;
    neutralScoreElement.textContent = neutral;
}

// 计算特定类型单元格的数量
function countCells(cellType) {
    let count = 0;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (grid[y][x] === cellType) count++;
        }
    }
    return count;
}

// 更新计时器
function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

// 结束游戏
function endGame() {
    clearInterval(timerInterval);
    clearInterval(aiInterval);
    gameOver = true;
    
    if (playerScore > aiScore) {
        gameOverElement.textContent = "你赢了！";
        gameOverElement.className = "game-over victory";
        createFireworks();
    } else if (aiScore > playerScore) {
        gameOverElement.textContent = "AI赢了！";
        gameOverElement.className = "game-over defeat";
    } else {
        gameOverElement.textContent = "平局！";
        gameOverElement.className = "game-over";
    }
}

// 创建烟花效果
function createFireworks() {
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top = `${Math.random() * 100}%`;
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.boxShadow = `0 0 10px 2px ${colors[Math.floor(Math.random() * colors.length)]}`;
            document.body.appendChild(firework);
            
            // 烟花动画
            const duration = Math.random() * 3 + 2;
            firework.style.transition = `all ${duration}s ease-out`;
            firework.style.transform = `scale(${Math.random() * 10 + 5})`;
            firework.style.opacity = '0';
            
            // 移除烟花元素
            setTimeout(() => {
                firework.remove();
            }, duration * 1000);
        }, Math.random() * 2000);
    }
}

// 玩家移动处理
function handlePlayerMove(newX, newY) {
    if (gameOver) return;
    
    // 检查边界
    if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
        // 更新玩家位置
        playerX = newX;
        playerY = newY;
        
        // 占领当前位置（可以覆盖已有颜色）
        grid[playerY][playerX] = PLAYER;
        
        drawGrid();
        updateScores();
    }
}

// AI移动
function aiMove() {
    if (gameOver) return;
    
    // 寻找最佳移动方向
    const direction = findBestDirection();
    
    // 移动AI
    aiX += direction.dx;
    aiY += direction.dy;
    
    // 确保不超出边界
    aiX = Math.max(0, Math.min(GRID_SIZE - 1, aiX));
    aiY = Math.max(0, Math.min(GRID_SIZE - 1, aiY));
    
    // 占领当前位置
    grid[aiY][aiX] = AI;
    
    drawGrid();
    updateScores();
}

// 寻找最佳移动方向
function findBestDirection() {
    // 计算到玩家的方向
    const dxToPlayer = playerX - aiX;
    const dyToPlayer = playerY - aiY;
    
    // 有一定概率追逐玩家，否则随机移动
    const chasePlayer = Math.random() < 0.7;
    
    let dx = 0;
    let dy = 0;
    
    if (chasePlayer) {
        // 向玩家方向移动
        if (Math.abs(dxToPlayer) > Math.abs(dyToPlayer)) {
            dx = dxToPlayer > 0 ? 1 : -1;
        } else {
            dy = dyToPlayer > 0 ? 1 : -1;
        }
    } else {
        // 随机移动
        const directions = [
            {dx: 1, dy: 0}, {dx: -1, dy: 0},
            {dx: 0, dy: 1}, {dx: 0, dy: -1}
        ];
        const randomDir = directions[Math.floor(Math.random() * directions.length)];
        dx = randomDir.dx;
        dy = randomDir.dy;
    }
    
    // 确保移动方向有效
    const newX = aiX + dx;
    const newY = aiY + dy;
    
    if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) {
        // 如果方向无效，尝试其他方向
        const validDirections = [
            {dx: 1, dy: 0}, {dx: -1, dy: 0},
            {dx: 0, dy: 1}, {dx: 0, dy: -1}
        ].filter(dir => {
            const testX = aiX + dir.dx;
            const testY = aiY + dir.dy;
            return testX >= 0 && testX < GRID_SIZE && testY >= 0 && testY < GRID_SIZE;
        });
        
        if (validDirections.length > 0) {
            const randomValidDir = validDirections[Math.floor(Math.random() * validDirections.length)];
            return randomValidDir;
        }
    }
    
    return {dx, dy};
}

// 键盘控制
function handleKeyPress(e) {
    if (gameOver) return;
    
    let newX = playerX;
    let newY = playerY;
    
    switch (e.key) {
        case 'ArrowUp':
            newY--;
            break;
        case 'ArrowDown':
            newY++;
            break;
        case 'ArrowLeft':
            newX--;
            break;
        case 'ArrowRight':
            newX++;
            break;
        default:
            return;
    }
    
    handlePlayerMove(newX, newY);
}

// 事件监听
document.addEventListener('keydown', handleKeyPress);

restartButton.addEventListener('click', initGame);

// 开始游戏
initGame();