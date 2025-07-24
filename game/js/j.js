// 游戏常量
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    null,
    '#FF0D72', // I
    '#0DC2FF', // J
    '#0DFF72', // L
    '#F538FF', // O
    '#FF8E0D', // S
    '#FFE138', // T
    '#3877FF'  // Z
];

// 方块形状定义
const SHAPES = [
    null,
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],                          // J
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],                          // L
    [[0, 4, 4], [0, 4, 4], [0, 0, 0]],                           // O
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],                           // S
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],                           // T
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]                             // Z
];

// 游戏变量
let canvas = document.getElementById('game-board');
let ctx = canvas.getContext('2d');
let nextCanvas = document.getElementById('next-piece');
let nextCtx = nextCanvas.getContext('2d');
let scoreElement = document.getElementById('score');
let finalScoreElement = document.getElementById('final-score');
let gameOverElement = document.querySelector('.game-over');
let restartBtn = document.getElementById('restart-btn');

let board = createBoard();
let piece = null;
let nextPiece = null;
let score = 0;
let gameOver = false;
let paused = false;
let dropCounter = 0;
let dropInterval = 500; // 初始下落速度 (毫秒)
let lastTime = 0;
let animationId = null;

// 初始化游戏
function init() {
    board = createBoard();
    score = 0;
    scoreElement.textContent = score;
    gameOver = false;
    paused = false;
    dropInterval = 500;
    
    // 创建第一个方块和下一个方块
    piece = createPiece(Math.floor(Math.random() * 7) + 1);
    nextPiece = createPiece(Math.floor(Math.random() * 7) + 1);
    
    // 隐藏游戏结束界面
    gameOverElement.style.display = 'none';
    
    // 开始游戏循环
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    lastTime = 0;
    animationId = requestAnimationFrame(update);
}

// 创建游戏板
function createBoard() {
    return Array.from(Array(ROWS), () => Array(COLS).fill(0));
}

// 创建方块
function createPiece(type) {
    return {
        position: {x: Math.floor(COLS / 2) - 1, y: 0},
        shape: SHAPES[type],
        type: type
    };
}

// 绘制游戏板
function drawBoard() {
    // 绘制背景
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格线
    ctx.strokeStyle = 'rgba(76, 201, 240, 0.2)';
    ctx.lineWidth = 0.5;
    
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            ctx.beginPath();
            ctx.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            ctx.stroke();
        }
    }
    
    // 绘制已固定的方块
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                drawBlock(ctx, x, y, value);
            }
        });
    });
    
    // 绘制当前移动的方块
    if (piece) {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    drawBlock(
                        ctx, 
                        x + piece.position.x, 
                        y + piece.position.y, 
                        piece.type,
                        true // 当前移动的方块有发光效果
                    );
                }
            });
        });
    }
}

// 绘制单个方块
function drawBlock(context, x, y, type, isCurrent = false) {
    const color = COLORS[type];
    
    // 方块主体
    context.fillStyle = color;
    context.beginPath();
    context.roundRect(
        x * BLOCK_SIZE + 1, 
        y * BLOCK_SIZE + 1, 
        BLOCK_SIZE - 2, 
        BLOCK_SIZE - 2, 
        4
    );
    context.fill();
    
    // 高光效果
    if (isCurrent) {
        // 发光效果
        context.shadowColor = color;
        context.shadowBlur = 10;
        
        // 重新绘制以应用发光
        context.beginPath();
        context.roundRect(
            x * BLOCK_SIZE + 1, 
            y * BLOCK_SIZE + 1, 
            BLOCK_SIZE - 2, 
            BLOCK_SIZE - 2, 
            4
        );
        context.fill();
        
        // 重置阴影
        context.shadowColor = 'transparent';
        context.shadowBlur = 0;
    } else {
        // 普通方块的3D效果
        context.fillStyle = 'rgba(255, 255, 255, 0.2)';
        context.fillRect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, BLOCK_SIZE * 0.3, BLOCK_SIZE * 0.3);
    }
}

// 绘制下一个方块预览
function drawNextPiece() {
    nextCtx.fillStyle = 'rgba(30, 30, 60, 0.7)';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    if (nextPiece) {
        // 计算居中位置
        const offsetX = (nextCanvas.width / 2) - ((nextPiece.shape[0].length * BLOCK_SIZE) / 2);
        const offsetY = (nextCanvas.height / 2) - ((nextPiece.shape.length * BLOCK_SIZE) / 2);
        
        nextPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    nextCtx.fillStyle = COLORS[nextPiece.type];
                    nextCtx.beginPath();
                    nextCtx.roundRect(
                        offsetX + x * BLOCK_SIZE + 1, 
                        offsetY + y * BLOCK_SIZE + 1, 
                        BLOCK_SIZE - 2, 
                        BLOCK_SIZE - 2, 
                        4
                    );
                    nextCtx.fill();
                }
            });
        });
    }
}

// 碰撞检测
function collide() {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] !== 0 &&
                (board[y + piece.position.y] === undefined ||
                    board[y + piece.position.y][x + piece.position.x] === undefined ||
                    board[y + piece.position.y][x + piece.position.x] !== 0)) {
                return true;
            }
        }
    }
    return false;
}

// 旋转方块
function rotate() {
    if (piece.type === 4) return; // O型方块不旋转
    
    const originalShape = piece.shape;
    
    // 转置矩阵
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < y; x++) {
            [piece.shape[x][y], piece.shape[y][x]] = [piece.shape[y][x], piece.shape[x][y]];
        }
    }
    
    // 反转每一行
    piece.shape.forEach(row => row.reverse());
    
    // 如果旋转后发生碰撞，则恢复原状
    if (collide()) {
        piece.shape = originalShape;
    }
}

// 移动方块
function movePiece(direction) {
    piece.position.x += direction;
    if (collide()) {
        piece.position.x -= direction;
    }
}

// 快速下落
function hardDrop() {
    while (!collide()) {
        piece.position.y++;
    }
    piece.position.y--; // 回退一步
    mergePiece();
}

// 合并方块到游戏板
function mergePiece() {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + piece.position.y][x + piece.position.x] = piece.type;
            }
        });
    });
    
    // 检查是否有完整的行
    checkRows();
    
    // 生成新方块
    piece = nextPiece;
    nextPiece = createPiece(Math.floor(Math.random() * 7) + 1);
    
    // 检查游戏是否结束
    if (collide()) {
        gameOver = true;
        finalScoreElement.textContent = score;
        gameOverElement.style.display = 'block';
    }
}

// 检查并清除完整的行
function checkRows() {
    let linesCleared = 0;
    
    outer: for (let y = ROWS - 1; y >= 0; y--) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }
        
        // 移除完整的行
        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        y++; // 检查同一行(现在是新行)
        
        linesCleared++;
    }
    
    // 更新分数
    if (linesCleared > 0) {
        // 根据消除的行数计算分数
        const points = [0, 100, 300, 500, 800][linesCleared] * (Math.floor(score / 1000) + 1);
        score += points;
        scoreElement.textContent = score;
        
        // 随着分数增加加快下落速度
        dropInterval = Math.max(100, 1000 - Math.floor(score / 1000) * 50);
    }
}

// 游戏更新函数
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    if (gameOver || paused) {
        return;
    }
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        piece.position.y++;
        if (collide()) {
            piece.position.y--;
            mergePiece();
        }
        dropCounter = 0;
    }
    
    drawBoard();
    drawNextPiece();
    animationId = requestAnimationFrame(update);
}

// 键盘控制
document.addEventListener('keydown', event => {
    if (gameOver) return;
    
    switch (event.keyCode) {
        case 37: // 左箭头
            movePiece(-1);
            break;
        case 39: // 右箭头
            movePiece(1);
            break;
        case 40: // 下箭头
            piece.position.y++;
            if (collide()) {
                piece.position.y--;
                mergePiece();
            }
            dropCounter = 0;
            break;
        case 38: // 上箭头
            rotate();
            break;
        case 32: // 空格
            hardDrop();
            break;
        case 80: // P键
            paused = !paused;
            if (!paused && !gameOver) {
                lastTime = 0;
                animationId = requestAnimationFrame(update);
            }
            break;
    }
});

// 重新开始按钮
restartBtn.addEventListener('click', init);

// 开始游戏
init();