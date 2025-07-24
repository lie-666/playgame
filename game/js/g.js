document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score-display');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreDisplay = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');
    
    // 游戏常量
    const GRID_SIZE = 20;
    const TILE_COUNT = canvas.width / GRID_SIZE;
    const SNAKE_SPEED = 10; // 每秒更新次数
    const AI_UPDATE_INTERVAL = 10; // AI每10帧更新一次路径
    
    // 游戏变量
    let snake = [];
    let aiSnake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let aiDirection = 'left';
    let gameRunning = false;
    let score = 0;
    let lastUpdateTime = 0;
    let frameCount = 0;
    let gameLoopId;
    
    // 初始化游戏
    function initGame() {
        // 初始化玩家蛇
        snake = [
            {x: 10, y: 10},
            {x: 9, y: 10},
            {x: 8, y: 10}
        ];
        
        // 初始化AI蛇
        aiSnake = [
            {x: TILE_COUNT - 10, y: TILE_COUNT - 10},
            {x: TILE_COUNT - 9, y: TILE_COUNT - 10},
            {x: TILE_COUNT - 8, y: TILE_COUNT - 10}
        ];
        
        direction = 'right';
        nextDirection = 'right';
        aiDirection = 'left';
        score = 0;
        frameCount = 0;
        
        generateFood();
        scoreDisplay.textContent = `分数: ${score}`;
        gameOverScreen.style.display = 'none';
        gameRunning = true;
        
        if (gameLoopId) {
            cancelAnimationFrame(gameLoopId);
        }
        lastUpdateTime = performance.now();
        gameLoopId = requestAnimationFrame(gameLoop);
    }
    
    // 生成食物
    function generateFood() {
        let validPosition = false;
        
        while (!validPosition) {
            food = {
                x: Math.floor(Math.random() * TILE_COUNT),
                y: Math.floor(Math.random() * TILE_COUNT)
            };
            
            // 检查食物是否与蛇重叠
            validPosition = true;
            
            for (let segment of snake) {
                if (segment.x === food.x && segment.y === food.y) {
                    validPosition = false;
                    break;
                }
            }
            
            for (let segment of aiSnake) {
                if (segment.x === food.x && segment.y === food.y) {
                    validPosition = false;
                    break;
                }
            }
        }
    }
    
    // 游戏主循环
    function gameLoop(currentTime) {
        const deltaTime = currentTime - lastUpdateTime;
        
        if (deltaTime > 1000 / SNAKE_SPEED) {
            lastUpdateTime = currentTime - (deltaTime % (1000 / SNAKE_SPEED));
            
            update();
            frameCount++;
        }
        
        render();
        
        if (gameRunning) {
            gameLoopId = requestAnimationFrame(gameLoop);
        }
    }
    
    // 更新游戏状态
    function update() {
        // 更新玩家蛇方向
        direction = nextDirection;
        
        // 更新AI蛇 (每10帧更新一次路径)
        if (frameCount % AI_UPDATE_INTERVAL === 0) {
            updateAISnake();
        }
        
        // 移动玩家蛇
        moveSnake(snake, direction);
        
        // 移动AI蛇
        moveSnake(aiSnake, aiDirection);
        
        // 检查碰撞
        checkCollisions();
    }
    
    // 移动蛇
    function moveSnake(snakeArray, dir) {
        // 添加新头部
        const head = {...snakeArray[0]};
        
        switch (dir) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }
        
        snakeArray.unshift(head);
        
        // 检查是否吃到食物
        if (snakeArray === snake && head.x === food.x && head.y === food.y) {
            score += 10;
            scoreDisplay.textContent = `分数: ${score}`;
            generateFood();
        } else if (snakeArray === aiSnake && head.x === food.x && head.y === food.y) {
            generateFood();
        } else {
            // 没吃到食物，移除尾部
            snakeArray.pop();
        }
    }
    
    // 更新AI蛇行为
    function updateAISnake() {
        // 简单AI: 优先向食物移动，避开边界和自身
        const head = aiSnake[0];
        const possibleDirections = [];
        
        // 检查各个方向是否安全
        if (!isPositionBlocked(head.x, head.y - 1, aiSnake)) possibleDirections.push('up');
        if (!isPositionBlocked(head.x, head.y + 1, aiSnake)) possibleDirections.push('down');
        if (!isPositionBlocked(head.x - 1, head.y, aiSnake)) possibleDirections.push('left');
        if (!isPositionBlocked(head.x + 1, head.y, aiSnake)) possibleDirections.push('right');
        
        if (possibleDirections.length === 0) {
            // 没有安全方向，随机选择一个（可能会撞墙）
            const dirs = ['up', 'down', 'left', 'right'];
            aiDirection = dirs[Math.floor(Math.random() * dirs.length)];
            return;
        }
        
        // 优先选择朝向食物的方向
        let bestDirection = aiDirection;
        let minDistance = Infinity;
        
        for (let dir of possibleDirections) {
            let newX = head.x, newY = head.y;
            
            switch (dir) {
                case 'up': newY--; break;
                case 'down': newY++; break;
                case 'left': newX--; break;
                case 'right': newX++; break;
            }
            
            const distance = Math.abs(newX - food.x) + Math.abs(newY - food.y);
            
            if (distance < minDistance) {
                minDistance = distance;
                bestDirection = dir;
            }
        }
        
        // 避免180度转弯
        if (!((aiDirection === 'up' && bestDirection === 'down') ||
                (aiDirection === 'down' && bestDirection === 'up') ||
                (aiDirection === 'left' && bestDirection === 'right') ||
                (aiDirection === 'right' && bestDirection === 'left'))) {
            aiDirection = bestDirection;
        }
    }
    
    // 检查位置是否被阻挡
    function isPositionBlocked(x, y, snakeArray) {
        // 检查边界
        if (x < 0 || x >= TILE_COUNT || y < 0 || y >= TILE_COUNT) {
            return true;
        }
        
        // 检查蛇身
        for (let i = 0; i < snakeArray.length - 1; i++) {
            if (snakeArray[i].x === x && snakeArray[i].y === y) {
                return true;
            }
        }
        
        // 检查另一条蛇
        const otherSnake = snakeArray === snake ? aiSnake : snake;
        for (let segment of otherSnake) {
            if (segment.x === x && segment.y === y) {
                return true;
            }
        }
        
        return false;
    }
    
    // 检查碰撞
    function checkCollisions() {
        const head = snake[0];
        const aiHead = aiSnake[0];
        
        // 检查玩家蛇碰撞
        if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
            gameOver();
            return;
        }
        
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }
        
        // 检查与AI蛇碰撞
        for (let segment of aiSnake) {
            if (head.x === segment.x && head.y === segment.y) {
                gameOver();
                return;
            }
        }
        
        // 检查AI蛇碰撞
        if (aiHead.x < 0 || aiHead.x >= TILE_COUNT || aiHead.y < 0 || aiHead.y >= TILE_COUNT) {
            // AI蛇撞墙，重置AI蛇
            resetAISnake();
            return;
        }
        
        for (let i = 1; i < aiSnake.length; i++) {
            if (aiHead.x === aiSnake[i].x && aiHead.y === aiSnake[i].y) {
                resetAISnake();
                return;
            }
        }
        
        // 检查AI蛇与玩家蛇碰撞
        for (let segment of snake) {
            if (aiHead.x === segment.x && aiHead.y === segment.y) {
                resetAISnake();
                return;
            }
        }
    }
    
    // 重置AI蛇
    function resetAISnake() {
        // 在随机位置生成新的AI蛇
        const startX = Math.floor(Math.random() * (TILE_COUNT - 10)) + 5;
        const startY = Math.floor(Math.random() * (TILE_COUNT - 10)) + 5;
        
        aiSnake = [
            {x: startX, y: startY},
            {x: startX - 1, y: startY},
            {x: startX - 2, y: startY}
        ];
        
        aiDirection = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
    }
    
    // 游戏结束
    function gameOver() {
        gameRunning = false;
        finalScoreDisplay.textContent = `最终分数: ${score}`;
        gameOverScreen.style.display = 'flex';
    }
    
    // 渲染游戏
    function render() {
        // 清空画布
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制网格线
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < TILE_COUNT; i++) {
            ctx.beginPath();
            ctx.moveTo(i * GRID_SIZE, 0);
            ctx.lineTo(i * GRID_SIZE, canvas.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, i * GRID_SIZE);
            ctx.lineTo(canvas.width, i * GRID_SIZE);
            ctx.stroke();
        }
        
        // 绘制食物
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        const foodX = food.x * GRID_SIZE + GRID_SIZE / 2;
        const foodY = food.y * GRID_SIZE + GRID_SIZE / 2;
        ctx.arc(foodX, foodY, GRID_SIZE / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制玩家蛇
        drawSnake(snake, '#0f0', '#090');
        
        // 绘制AI蛇
        drawSnake(aiSnake, '#00f', '#009');
    }
    
    // 绘制蛇
    function drawSnake(snakeArray, headColor, bodyColor) {
        // 绘制蛇身
        for (let i = 0; i < snakeArray.length; i++) {
            const segment = snakeArray[i];
            const x = segment.x * GRID_SIZE;
            const y = segment.y * GRID_SIZE;
            
            ctx.fillStyle = i === 0 ? headColor : bodyColor;
            ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);
            
            // 添加圆角效果
            ctx.fillStyle = i === 0 ? headColor : bodyColor;
            ctx.beginPath();
            ctx.roundRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2, 4);
            ctx.fill();
            
            // 蛇头眼睛
            if (i === 0) {
                const eyeSize = GRID_SIZE / 5;
                const eyeOffset = GRID_SIZE / 4;
                
                ctx.fillStyle = 'white';
                
                // 根据方向确定眼睛位置
                let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
                
                if (snakeArray === snake) {
                    switch (direction) {
                        case 'up':
                            leftEyeX = x + eyeOffset;
                            leftEyeY = y + eyeOffset;
                            rightEyeX = x + GRID_SIZE - eyeOffset - eyeSize;
                            rightEyeY = y + eyeOffset;
                            break;
                        case 'down':
                            leftEyeX = x + eyeOffset;
                            leftEyeY = y + GRID_SIZE - eyeOffset - eyeSize;
                            rightEyeX = x + GRID_SIZE - eyeOffset - eyeSize;
                            rightEyeY = y + GRID_SIZE - eyeOffset - eyeSize;
                            break;
                        case 'left':
                            leftEyeX = x + eyeOffset;
                            leftEyeY = y + eyeOffset;
                            rightEyeX = x + eyeOffset;
                            rightEyeY = y + GRID_SIZE - eyeOffset - eyeSize;
                            break;
                        case 'right':
                            leftEyeX = x + GRID_SIZE - eyeOffset - eyeSize;
                            leftEyeY = y + eyeOffset;
                            rightEyeX = x + GRID_SIZE - eyeOffset - eyeSize;
                            rightEyeY = y + GRID_SIZE - eyeOffset - eyeSize;
                            break;
                    }
                } else {
                    // AI蛇眼睛
                    switch (aiDirection) {
                        case 'up':
                            leftEyeX = x + eyeOffset;
                            leftEyeY = y + eyeOffset;
                            rightEyeX = x + GRID_SIZE - eyeOffset - eyeSize;
                            rightEyeY = y + eyeOffset;
                            break;
                        case 'down':
                            leftEyeX = x + eyeOffset;
                            leftEyeY = y + GRID_SIZE - eyeOffset - eyeSize;
                            rightEyeX = x + GRID_SIZE - eyeOffset - eyeSize;
                            rightEyeY = y + GRID_SIZE - eyeOffset - eyeSize;
                            break;
                        case 'left':
                            leftEyeX = x + eyeOffset;
                            leftEyeY = y + eyeOffset;
                            rightEyeX = x + eyeOffset;
                            rightEyeY = y + GRID_SIZE - eyeOffset - eyeSize;
                            break;
                        case 'right':
                            leftEyeX = x + GRID_SIZE - eyeOffset - eyeSize;
                            leftEyeY = y + eyeOffset;
                            rightEyeX = x + GRID_SIZE - eyeOffset - eyeSize;
                            rightEyeY = y + GRID_SIZE - eyeOffset - eyeSize;
                            break;
                    }
                }
                
                ctx.fillRect(leftEyeX, leftEyeY, eyeSize, eyeSize);
                ctx.fillRect(rightEyeX, rightEyeY, eyeSize, eyeSize);
                
                // 瞳孔
                ctx.fillStyle = 'black';
                const pupilSize = eyeSize / 2;
                ctx.fillRect(leftEyeX + eyeSize / 4, leftEyeY + eyeSize / 4, pupilSize, pupilSize);
                ctx.fillRect(rightEyeX + eyeSize / 4, rightEyeY + eyeSize / 4, pupilSize, pupilSize);
            }
        }
    }
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (!gameRunning) return;
        
        switch (e.key) {
            case 'ArrowUp':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') nextDirection = 'right';
                break;
        }
    });
    
    // 重新开始按钮
    restartBtn.addEventListener('click', initGame);
    
    // 开始游戏
    initGame();
});