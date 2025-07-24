const config = {
    rows: 15,
    cols: 15,
    cellSize: 30
};

// 游戏状态
let maze = [];
let playerPos = { row: 1, col: 1 };
let exitPos = { row: config.rows - 2, col: config.cols - 2 };
let steps = 0;
let startTime = 0;
let timerInterval = null;

// DOM元素
const mazeElement = document.getElementById('maze');
const stepsElement = document.getElementById('steps');
const timeElement = document.getElementById('time');
const winMessageElement = document.getElementById('winMessage');
const finalStepsElement = document.getElementById('finalSteps');
const finalTimeElement = document.getElementById('finalTime');

// 初始化游戏
function initGame() {
    generateMaze();
    renderMaze();
    placePlayer();
    placeExit();
    
    steps = 0;
    startTime = Date.now();
    stepsElement.textContent = steps;
    updateTimer();
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    
    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeyPress);
}

// 生成迷宫
function generateMaze() {
    // 初始化迷宫，全部为墙
    maze = Array(config.rows).fill().map(() => Array(config.cols).fill(1));
    
    // 使用深度优先搜索算法生成迷宫
    const stack = [];
    const startRow = 1;
    const startCol = 1;
    
    maze[startRow][startCol] = 0;
    stack.push({ row: startRow, col: startCol });
    
    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const { row, col } = current;
        
        // 查找未访问的邻居
        const neighbors = [];
        
        // 上
        if (row > 2 && maze[row - 2][col] === 1) {
            neighbors.push({ row: row - 2, col, wallRow: row - 1, wallCol: col });
        }
        // 右
        if (col < config.cols - 3 && maze[row][col + 2] === 1) {
            neighbors.push({ row, col: col + 2, wallRow: row, wallCol: col + 1 });
        }
        // 下
        if (row < config.rows - 3 && maze[row + 2][col] === 1) {
            neighbors.push({ row: row + 2, col, wallRow: row + 1, wallCol: col });
        }
        // 左
        if (col > 2 && maze[row][col - 2] === 1) {
            neighbors.push({ row, col: col - 2, wallRow: row, wallCol: col - 1 });
        }
        
        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            maze[next.row][next.col] = 0;
            maze[next.wallRow][next.wallCol] = 0;
            stack.push({ row: next.row, col: next.col });
        } else {
            stack.pop();
        }
    }
    
    // 确保起点和终点是通路
    maze[1][1] = 0;
    maze[config.rows - 2][config.cols - 2] = 0;
    
    // 随机移除一些墙增加通路
    for (let i = 0; i < config.rows * config.cols * 0.05; i++) {
        const row = Math.floor(Math.random() * (config.rows - 2)) + 1;
        const col = Math.floor(Math.random() * (config.cols - 2)) + 1;
        maze[row][col] = 0;
    }
}

// 渲染迷宫
function renderMaze() {
    mazeElement.innerHTML = '';
    mazeElement.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;
    mazeElement.style.gridTemplateRows = `repeat(${config.rows}, 1fr)`;
    
    for (let row = 0; row < config.rows; row++) {
        for (let col = 0; col < config.cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (maze[row][col] === 1) {
                cell.classList.add('wall');
            }
            
            cell.dataset.row = row;
            cell.dataset.col = col;
            mazeElement.appendChild(cell);
        }
    }
}

// 放置玩家
function placePlayer() {
    playerPos = { row: 1, col: 1 };
    updatePlayerPosition();
}

// 放置出口
function placeExit() {
    exitPos = { row: config.rows - 2, col: config.cols - 2 };
    
    // 找到出口对应的单元格并添加exit类
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        if (row === exitPos.row && col === exitPos.col) {
            cell.classList.add('exit');
        }
    });
}

// 更新玩家位置
function updatePlayerPosition() {
    // 移除所有玩家标记
    document.querySelectorAll('.player').forEach(el => el.classList.remove('player'));
    
    // 找到玩家当前位置并添加玩家标记
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        if (row === playerPos.row && col === playerPos.col) {
            cell.classList.add('player');
        }
    });
    
    // 检查是否到达出口
    if (playerPos.row === exitPos.row && playerPos.col === exitPos.col) {
        winGame();
    }
}

// 处理按键
function handleKeyPress(e) {
    let newRow = playerPos.row;
    let newCol = playerPos.col;
    
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            newRow--;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            newCol++;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            newRow++;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            newCol--;
            break;
        default:
            return;
    }
    
    // 检查移动是否有效
    if (newRow >= 0 && newRow < config.rows && 
        newCol >= 0 && newCol < config.cols && 
        maze[newRow][newCol] === 0) {
        
        playerPos.row = newRow;
        playerPos.col = newCol;
        steps++;
        stepsElement.textContent = steps;
        updatePlayerPosition();
    }
}

// 更新计时器
function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timeElement.textContent = elapsed;
}

// 胜利
function winGame() {
    clearInterval(timerInterval);
    
    finalStepsElement.textContent = steps;
    finalTimeElement.textContent = Math.floor((Date.now() - startTime) / 1000);
    
    winMessageElement.classList.add('show');
    
    // 移除键盘监听
    document.removeEventListener('keydown', handleKeyPress);
}

// 重置游戏
function resetGame() {
    winMessageElement.classList.remove('show');
    initGame();
}

// 显示游戏说明
function showInstructions() {
    alert('游戏说明:\n\n使用方向键或WASD键移动绿色圆点\n\n避开黑色墙壁，到达橙色出口\n\n尽可能用最少的步数和时间完成迷宫！');
}

// 初始化游戏
initGame();