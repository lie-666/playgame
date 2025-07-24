document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const gameMessage = document.getElementById('game-message');
    const messageText = document.getElementById('message-text');
    const keepPlayingBtn = document.getElementById('keep-playing');
    const tryAgainBtn = document.getElementById('try-again');
    const newGameBtn = document.getElementById('new-game');
    const undoMoveBtn = document.getElementById('undo-move');
    
    let grid = [];
    let score = 0;
    let previousStates = [];
    const gridSize = 4;
    const winningValue = 2048;
    let gameWon = false;
    let gameOver = false;
    
    // 初始化游戏
    function initGame() {
        // 清空网格
        gridContainer.innerHTML = '';
        
        // 创建4x4网格
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement('div');
            row.className = 'grid-row';
            
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                row.appendChild(cell);
            }
            
            gridContainer.appendChild(row);
        }
        
        // 初始化网格数组
        grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        
        // 重置游戏状态
        score = 0;
        gameWon = false;
        gameOver = false;
        previousStates = [];
        
        // 更新UI
        updateScore();
        hideMessage();
        
        // 添加初始方块
        addRandomTile();
        addRandomTile();
        
        // 保存初始状态
        saveState();
    }
    
    // 添加随机方块
    function addRandomTile() {
        const emptyCells = [];
        
        // 找出所有空格子
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === 0) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }
        
        // 如果有空格子，随机选择一个并添加2或4
        if (emptyCells.length > 0) {
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[row][col] = Math.random() < 0.9 ? 2 : 4;
            
            // 创建新方块并添加动画
            createTile(row, col, grid[row][col], true);
        }
    }
    
    // 创建方块元素
    function createTile(row, col, value, isNew = false, isMerged = false) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${value}`;
        if (value > 2048) tile.classList.add('tile-super');
        if (isNew) tile.classList.add('tile-new');
        if (isMerged) tile.classList.add('tile-merged');
        tile.textContent = value;
        tile.dataset.row = row;
        tile.dataset.col = col;
        
        // 定位方块
        const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
        cell.appendChild(tile);
        
        return tile;
    }
    
    // 更新所有方块位置
    function updateTiles() {
        // 移除所有现有方块
        document.querySelectorAll('.tile').forEach(tile => tile.remove());
        
        // 重新创建所有方块
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] !== 0) {
                    createTile(i, j, grid[i][j]);
                }
            }
        }
    }
    
    // 移动方块
    function moveTiles(direction) {
        // 如果没有移动空间，直接返回
        if (!canMove()) return false;
        
        // 保存当前状态以便撤销
        saveState();
        
        let moved = false;
        const newGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        
        // 根据方向处理移动
        if (direction === 'up') {
            for (let j = 0; j < gridSize; j++) {
                let row = 0;
                let prevValue = 0;
                
                for (let i = 0; i < gridSize; i++) {
                    if (grid[i][j] !== 0) {
                        if (grid[i][j] === prevValue) {
                            newGrid[row-1][j] = prevValue * 2;
                            score += prevValue * 2;
                            prevValue = 0;
                            moved = true;
                        } else {
                            newGrid[row][j] = grid[i][j];
                            prevValue = grid[i][j];
                            if (row !== i) moved = true;
                            row++;
                        }
                    }
                }
            }
        } else if (direction === 'down') {
            for (let j = 0; j < gridSize; j++) {
                let row = gridSize - 1;
                let prevValue = 0;
                
                for (let i = gridSize - 1; i >= 0; i--) {
                    if (grid[i][j] !== 0) {
                        if (grid[i][j] === prevValue) {
                            newGrid[row+1][j] = prevValue * 2;
                            score += prevValue * 2;
                            prevValue = 0;
                            moved = true;
                        } else {
                            newGrid[row][j] = grid[i][j];
                            prevValue = grid[i][j];
                            if (row !== i) moved = true;
                            row--;
                        }
                    }
                }
            }
        } else if (direction === 'left') {
            for (let i = 0; i < gridSize; i++) {
                let col = 0;
                let prevValue = 0;
                
                for (let j = 0; j < gridSize; j++) {
                    if (grid[i][j] !== 0) {
                        if (grid[i][j] === prevValue) {
                            newGrid[i][col-1] = prevValue * 2;
                            score += prevValue * 2;
                            prevValue = 0;
                            moved = true;
                        } else {
                            newGrid[i][col] = grid[i][j];
                            prevValue = grid[i][j];
                            if (col !== j) moved = true;
                            col++;
                        }
                    }
                }
            }
        } else if (direction === 'right') {
            for (let i = 0; i < gridSize; i++) {
                let col = gridSize - 1;
                let prevValue = 0;
                
                for (let j = gridSize - 1; j >= 0; j--) {
                    if (grid[i][j] !== 0) {
                        if (grid[i][j] === prevValue) {
                            newGrid[i][col+1] = prevValue * 2;
                            score += prevValue * 2;
                            prevValue = 0;
                            moved = true;
                        } else {
                            newGrid[i][col] = grid[i][j];
                            prevValue = grid[i][j];
                            if (col !== j) moved = true;
                            col--;
                        }
                    }
                }
            }
        }
        
        // 如果发生了移动，更新网格并添加新方块
        if (moved) {
            grid = newGrid;
            updateScore();
            updateTiles();
            setTimeout(() => {
                addRandomTile();
                checkGameStatus();
            }, 100);
        }
        
        return moved;
    }
    
    // 检查游戏状态
    function checkGameStatus() {
        // 检查是否达到2048
        if (!gameWon) {
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (grid[i][j] === winningValue) {
                        gameWon = true;
                        showMessage('你赢了！');
                        break;
                    }
                }
                if (gameWon) break;
            }
        }
        
        // 检查游戏是否结束
        if (!canMove()) {
            gameOver = true;
            showMessage('游戏结束！');
        }
    }
    
    // 检查是否还能移动
    function canMove() {
        // 检查是否有空格子
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === 0) {
                    return true;
                }
            }
        }
        
        // 检查是否有相邻的相同数字
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (j < gridSize - 1 && grid[i][j] === grid[i][j+1]) {
                    return true;
                }
                if (i < gridSize - 1 && grid[i][j] === grid[i+1][j]) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // 更新分数显示
    function updateScore() {
        scoreDisplay.textContent = score;
    }
    
    // 显示游戏消息
    function showMessage(text) {
        messageText.textContent = text;
        gameMessage.classList.add(text === '你赢了！' ? 'game-won' : 'game-over');
    }
    
    // 隐藏游戏消息
    function hideMessage() {
        gameMessage.classList.remove('game-won', 'game-over');
    }
    
    // 保存游戏状态以便撤销
    function saveState() {
        // 深拷贝当前网格和分数
        const gridCopy = grid.map(row => [...row]);
        previousStates.push({
            grid: gridCopy,
            score: score,
            gameWon: gameWon,
            gameOver: gameOver
        });
        
        // 限制保存的状态数量
        if (previousStates.length > 5) {
            previousStates.shift();
        }
    }
    
    // 撤销上一步
    function undoMove() {
        if (previousStates.length > 0) {
            const prevState = previousStates.pop();
            grid = prevState.grid.map(row => [...row]);
            score = prevState.score;
            gameWon = prevState.gameWon;
            gameOver = prevState.gameOver;
            
            updateScore();
            updateTiles();
            hideMessage();
        }
    }
    
    // 键盘事件监听
    document.addEventListener('keydown', (e) => {
        if (gameOver) return;
        
        let moved = false;
        
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                moved = moveTiles('up');
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                moved = moveTiles('down');
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                moved = moveTiles('left');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                moved = moveTiles('right');
                break;
        }
        
        if (moved) {
            e.preventDefault();
        }
    });
    
    // 按钮事件监听
    keepPlayingBtn.addEventListener('click', () => {
        hideMessage();
    });
    
    tryAgainBtn.addEventListener('click', initGame);
    newGameBtn.addEventListener('click', initGame);
    undoMoveBtn.addEventListener('click', undoMove);
    
    // 触摸事件处理（移动端支持）
    let touchStartX = 0;
    let touchStartY = 0;
    
    gridContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    gridContainer.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY || gameOver) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // 确定滑动方向
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                moveTiles('left');
                touchStartX = 0;
                touchStartY = 0;
            } else if (diffX < -50) {
                moveTiles('right');
                touchStartX = 0;
                touchStartY = 0;
            }
        } else {
            if (diffY > 50) {
                moveTiles('up');
                touchStartX = 0;
                touchStartY = 0;
            } else if (diffY < -50) {
                moveTiles('down');
                touchStartX = 0;
                touchStartY = 0;
            }
        }
    }, { passive: true });
    
    // 初始化游戏
    initGame();
});