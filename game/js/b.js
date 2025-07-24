// 游戏变量
let score = 0;
let gameRunning = false;
let ballX = 190;
let ballY = 300;
let ballSpeedX = 3;
let ballSpeedY = -3;
let paddleX = 160;
let obstacles = [];
let obstacleSpeed = 2;
let obstacleInterval = 1500;
let lastObstacleTime = 0;
let gameArea = document.getElementById('gameContainer');
let paddle = document.getElementById('paddle');
let ball = document.getElementById('ball');
let scoreDisplay = document.getElementById('score');
let startScreen = document.getElementById('startScreen');
let gameOverScreen = document.getElementById('gameOverScreen');
let finalScoreDisplay = document.getElementById('finalScore');
let startButton = document.getElementById('startButton');
let restartButton = document.getElementById('restartButton');

// 游戏区域尺寸
const gameWidth = 400;
const gameHeight = 600;

// 鼠标移动控制挡板
gameArea.addEventListener('mousemove', function(e) {
    if (!gameRunning) return;
    
    let rect = gameArea.getBoundingClientRect();
    paddleX = e.clientX - rect.left - 40;
    
    if (paddleX < 0) paddleX = 0;
    if (paddleX > gameWidth - 80) paddleX = gameWidth - 80;
    
    paddle.style.left = paddleX + 'px';
});

// 开始游戏
startButton.addEventListener('click', function() {
    startGame();
});

// 重新开始游戏
restartButton.addEventListener('click', function() {
    startGame();
});

function startGame() {
    // 重置游戏状态
    score = 0;
    ballX = 190;
    ballY = 300;
    ballSpeedX = 3;
    ballSpeedY = -3;
    paddleX = 160;
    obstacles = [];
    obstacleSpeed = 2;
    obstacleInterval = 1500;
    
    // 更新显示
    scoreDisplay.textContent = '分数: ' + score;
    paddle.style.left = paddleX + 'px';
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    
    // 清除所有障碍物
    document.querySelectorAll('.obstacle').forEach(obs => obs.remove());
    
    // 隐藏开始/结束屏幕
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    // 开始游戏循环
    gameRunning = true;
    lastObstacleTime = Date.now();
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!gameRunning) return;
    
    // 移动球
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // 球与墙壁碰撞检测
    if (ballX <= 0 || ballX >= gameWidth - 20) {
        ballSpeedX = -ballSpeedX;
    }
    
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }
    
    // 球与挡板碰撞检测
    if (ballY >= gameHeight - 35 && 
        ballX + 20 >= paddleX && 
        ballX <= paddleX + 80) {
        
        // 根据击中挡板的位置改变反弹角度
        let hitPosition = (ballX - paddleX) / 80;
        ballSpeedX = (hitPosition - 0.5) * 8;
        ballSpeedY = -Math.abs(ballSpeedY) - 0.2; // 增加一点速度
        
        // 增加分数
        score += 10;
        scoreDisplay.textContent = '分数: ' + score;
        
        // 每100分增加难度
        if (score % 100 === 0) {
            obstacleSpeed += 0.5;
            if (obstacleInterval > 800) {
                obstacleInterval -= 100;
            }
        }
    }
    
    // 球掉落到底部 - 游戏结束
    if (ballY >= gameHeight) {
        gameOver();
        return;
    }
    
    // 更新球的位置
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    
    // 生成障碍物
    let currentTime = Date.now();
    if (currentTime - lastObstacleTime > obstacleInterval) {
        createObstacle();
        lastObstacleTime = currentTime;
    }
    
    // 移动障碍物并检测碰撞
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.y += obstacleSpeed;
        obs.element.style.top = obs.y + 'px';
        
        // 障碍物与球碰撞检测
        if (ballX + 20 > obs.x && 
            ballX < obs.x + 60 && 
            ballY + 20 > obs.y && 
            ballY < obs.y + 20) {
            
            // 从上方或下方碰撞
            if (ballY < obs.y + 10) {
                ballSpeedY = -Math.abs(ballSpeedY);
            } else {
                ballSpeedY = Math.abs(ballSpeedY);
            }
            
            // 从左侧或右侧碰撞
            if (ballX < obs.x + 10) {
                ballSpeedX = -Math.abs(ballSpeedX);
            } else {
                ballSpeedX = Math.abs(ballSpeedX);
            }
            
            // 移除障碍物并增加分数
            obs.element.remove();
            obstacles.splice(i, 1);
            score += 20;
            scoreDisplay.textContent = '分数: ' + score;
        }
        
        // 移除超出屏幕的障碍物
        if (obs.y > gameHeight) {
            obs.element.remove();
            obstacles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(gameLoop);
}

function createObstacle() {
    let x = Math.random() * (gameWidth - 60);
    let obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = x + 'px';
    obstacle.style.top = '-20px';
    gameArea.appendChild(obstacle);
    
    obstacles.push({
        x: x,
        y: -20,
        element: obstacle
    });
}

function gameOver() {
    gameRunning = false;
    finalScoreDisplay.textContent = '分数: ' + score;
    gameOverScreen.style.display = 'flex';
}