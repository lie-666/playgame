const quotes = {
    easy: [
        { text: "生活就像一盒巧克力，你永远不知道下一颗是什么味道。", source: "《阿甘正传》" },
        { text: "知识就是力量。", source: "培根" },
        { text: "千里之行，始于足下。", source: "老子" },
        { text: "时间就像海绵里的水，只要愿挤，总还是有的。", source: "鲁迅" },
        { text: "成功的秘诀在于对目标的执着追求。", source: "爱默生" },
        { text: "学习是劳动，是充满思想的劳动。", source: "乌申斯基" },
        { text: "世上无难事，只要肯登攀。", source: "毛泽东" },
        { text: "读万卷书，行万里路。", source: "刘彝" },
        { text: "科学技术是第一生产力。", source: "邓小平" },
        { text: "良好的开端是成功的一半。", source: "亚里士多德" }
    ],
    medium: [
        { text: "我们都在阴沟里，但仍有人仰望星空。", source: "奥斯卡·王尔德" },
        { text: "人生有两出悲剧：一是万念俱灰，另一是踌躇满志。", source: "萧伯纳" },
        { text: "世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的胸怀。", source: "雨果" },
        { text: "生命不可能有两次，但许多人连一次也不善于度过。", source: "吕凯特" },
        { text: "人的一生可能燃烧也可能腐朽，我不能腐朽，我愿意燃烧起来！", source: "奥斯特洛夫斯基" },
        { text: "路是脚踏出来的，历史是人写出来的。人的每一步行动都在书写自己的历史。", source: "吉鸿昌" },
        { text: "社会犹如一条船，每个人都要有掌舵的准备。", source: "易卜生" },
        { text: "人生的价值，并不是用时间，而是用深度去衡量的。", source: "列夫·托尔斯泰" },
        { text: "生活只有在平淡无味的人看来才是空虚而平淡无味的。", source: "车尔尼雪夫斯基" },
        { text: "一个人的价值，应该看他贡献什么，而不应当看他取得什么。", source: "爱因斯坦" }
    ],
    hard: [
        { text: "当我沉默的时候，我觉得充实；我将开口，同时感到空虚。", source: "鲁迅《野草》" },
        { text: "悲剧将人生的有价值的东西毁灭给人看，喜剧将那无价值的撕破给人看。", source: "鲁迅" },
        { text: "其实地上本没有路，走的人多了，也便成了路。", source: "鲁迅《故乡》" },
        { text: "时间，每天得到的都是二十四小时，可是一天的时间给勤勉的人带来智慧和力量，给懒散的人只留下一片悔恨。", source: "鲁迅" },
        { text: "贪安稳就没有自由，要自由就要历些危险。只有这两条路。", source: "鲁迅" },
        { text: "面具戴太久，就会长到脸上，再想揭下来，除非伤筋动骨扒皮。", source: "鲁迅" },
        { text: "惟沉默是最高的轻蔑。", source: "鲁迅" },
        { text: "猛兽总是独行，牛羊才成群结队。", source: "鲁迅" },
        { text: "不在沉默中爆发，就在沉默中灭亡。", source: "鲁迅《记念刘和珍君》" },
        { text: "横眉冷对千夫指，俯首甘为孺子牛。", source: "鲁迅《自嘲》" }
    ],
    expert: [
        { text: "物格而后知至，知至而后意诚，意诚而后心正，心正而后身修，身修而后家齐，家齐而后国治，国治而后天下平。", source: "《大学》" },
        { text: "古之欲明明德于天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正其心；欲正其心者，先诚其意；欲诚其意者，先致其知；致知在格物。", source: "《大学》" },
        { text: "天命之谓性，率性之谓道，修道之谓教。道也者，不可须臾离也，可离非道也。是故君子戒慎乎其所不睹，恐惧乎其所不闻。", source: "《中庸》" },
        { text: "喜怒哀乐之未发，谓之中；发而皆中节，谓之和。中也者，天下之大本也；和也者，天下之达道也。致中和，天地位焉，万物育焉。", source: "《中庸》" },
        { text: "博学之，审问之，慎思之，明辨之，笃行之。有弗学，学之弗能弗措也；有弗问，问之弗知弗措也；有弗思，思之弗得弗措也；有弗辨，辨之弗明弗措也；有弗行，行之弗笃弗措也。", source: "《中庸》" },
        { text: "大学之道，在明明德，在亲民，在止于至善。知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。", source: "《大学》" },
        { text: "所谓诚其意者，毋自欺也。如恶恶臭，如好好色，此之谓自谦。故君子必慎其独也。小人闲居为不善，无所不至，见君子而后厌然，掩其不善，而著其善。", source: "《大学》" },
        { text: "富润屋，德润身，心广体胖，故君子必诚其意。", source: "《大学》" },
        { text: "君子有诸己而后求诸人，无诸己而后非诸人。所藏乎身不恕，而能喻诸人者，未之有也。", source: "《大学》" },
        { text: "仁者以财发身，不仁者以身发财。未有上好仁而下不好义者也，未有好义其事不终者也，未有府库财非其财者也。", source: "《大学》" }
    ]
};

// 游戏状态
let gameState = {
    isPlaying: false,
    currentText: "",
    currentSource: "",
    currentDifficulty: "easy",
    startTime: 0,
    timer: null,
    timeLeft: 60,
    correctChars: 0,
    totalChars: 0,
    errors: 0,
    currentPosition: 0,
    score: 0
};

// DOM 元素
const elements = {
    targetText: document.getElementById("targetText"),
    inputArea: document.getElementById("inputArea"),
    startBtn: document.getElementById("startBtn"),
    resetBtn: document.getElementById("resetBtn"),
    wpmDisplay: document.getElementById("wpm"),
    accuracyDisplay: document.getElementById("accuracy"),
    timeDisplay: document.getElementById("time"),
    scoreDisplay: document.getElementById("score"),
    progressBar: document.getElementById("progress"),
    resultModal: document.getElementById("resultModal"),
    finalWpm: document.getElementById("finalWpm"),
    finalAccuracy: document.getElementById("finalAccuracy"),
    finalScore: document.getElementById("finalScore"),
    finalChars: document.getElementById("finalChars"),
    closeBtn: document.getElementById("closeBtn"),
    quoteInfo: document.getElementById("quoteInfo"),
    difficultyBtns: document.querySelectorAll(".difficulty-btn"),
    themeToggle: document.getElementById("themeToggle")
};

// 初始化游戏
function initGame() {
    // 重置游戏状态
    gameState.isPlaying = false;
    gameState.currentText = "";
    gameState.currentSource = "";
    gameState.startTime = 0;
    gameState.timeLeft = 60;
    gameState.correctChars = 0;
    gameState.totalChars = 0;
    gameState.errors = 0;
    gameState.currentPosition = 0;
    gameState.score = 0;
    
    // 重置UI
    elements.targetText.innerHTML = "点击开始按钮开始游戏！(请一个一个字打)";
    elements.inputArea.value = "";
    elements.inputArea.disabled = true;
    elements.wpmDisplay.textContent = "0";
    elements.accuracyDisplay.textContent = "0";
    elements.timeDisplay.textContent = "60";
    elements.scoreDisplay.textContent = "0";
    elements.progressBar.style.width = "0%";
    elements.quoteInfo.textContent = "";
    
    // 清除定时器
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
}

// 开始游戏
function startGame() {
    if (gameState.isPlaying) return;
    
    // 选择随机文本
    const difficultyQuotes = quotes[gameState.currentDifficulty];
    const randomIndex = Math.floor(Math.random() * difficultyQuotes.length);
    gameState.currentText = difficultyQuotes[randomIndex].text;
    gameState.currentSource = difficultyQuotes[randomIndex].source;
    
    // 重置游戏状态
    gameState.isPlaying = true;
    gameState.startTime = Date.now();
    gameState.timeLeft = 60;
    gameState.correctChars = 0;
    gameState.totalChars = gameState.currentText.length;
    gameState.errors = 0;
    gameState.currentPosition = 0;
    gameState.score = 0;
    
    // 更新UI
    renderText();
    elements.inputArea.value = "";
    elements.inputArea.disabled = false;
    elements.inputArea.focus();
    elements.quoteInfo.textContent = `- ${gameState.currentSource}`;
    
    // 开始计时器
    gameState.timer = setInterval(updateGame, 1000);
}

// 渲染文本
function renderText() {
    let html = "";
    for (let i = 0; i < gameState.currentText.length; i++) {
        let char = gameState.currentText[i];
        let charClass = "";
        
        if (i < gameState.currentPosition) {
            charClass = "correct";
        } else if (i === gameState.currentPosition) {
            charClass = "current";
        }
        
        // 处理空格
        if (char === " ") {
            char = "&nbsp;";
        }
        
        html += `<span class="character ${charClass}">${char}</span>`;
    }
    
    elements.targetText.innerHTML = html;
}

// 更新游戏状态
function updateGame() {
    if (!gameState.isPlaying) return;
    
    // 更新时间
    gameState.timeLeft--;
    elements.timeDisplay.textContent = gameState.timeLeft;
    elements.progressBar.style.width = `${(60 - gameState.timeLeft) / 60 * 100}%`;
    
    // 检查游戏是否结束
    if (gameState.timeLeft <= 0 || gameState.currentPosition >= gameState.currentText.length) {
        endGame();
        return;
    }
    
    // 计算并更新WPM和准确率
    const timeElapsed = (60 - gameState.timeLeft) / 60; // 分钟
    const wpm = timeElapsed > 0 ? Math.round((gameState.correctChars / 5) / timeElapsed) : 0;
    const accuracy = gameState.totalChars > 0 ? Math.round((gameState.correctChars / gameState.totalChars) * 100) : 0;
    
    elements.wpmDisplay.textContent = wpm;
    elements.accuracyDisplay.textContent = accuracy;
    
    // 计算得分
    gameState.score = Math.round(wpm * accuracy / 10);
    elements.scoreDisplay.textContent = gameState.score;
}

// 结束游戏
function endGame() {
    gameState.isPlaying = false;
    clearInterval(gameState.timer);
    elements.inputArea.disabled = true;
    
    // 计算最终统计数据
    const timeElapsed = (60 - gameState.timeLeft) / 60; // 分钟
    const finalWpm = timeElapsed > 0 ? Math.round((gameState.correctChars / 5) / timeElapsed) : 0;
    const finalAccuracy = gameState.totalChars > 0 ? Math.round((gameState.correctChars / gameState.totalChars) * 100) : 0;
    const finalScore = Math.round(finalWpm * finalAccuracy / 10);
    const finalChars = gameState.correctChars;
    
    // 更新结果模态框
    elements.finalWpm.textContent = finalWpm;
    elements.finalAccuracy.textContent = finalAccuracy;
    elements.finalScore.textContent = finalScore;
    elements.finalChars.textContent = finalChars;
    
    // 显示结果模态框
    elements.resultModal.classList.add("active");
    
    // 如果表现良好，显示彩花效果
    if (finalWpm > 40 && finalAccuracy > 90) {
        createConfetti();
    }
}

// 处理输入
function handleInput(e) {
    if (!gameState.isPlaying) return;
    
    const inputText = e.target.value;
    if (inputText.length === 0) return;
    
    const currentChar = gameState.currentText[gameState.currentPosition];
    
    // 检查输入是否正确
    if (inputText[inputText.length - 1] === currentChar) {
        // 正确输入
        gameState.correctChars++;
        gameState.currentPosition++;
        e.target.value = "";
        
        // 更新UI
        renderText();
        
        // 检查是否完成
        if (gameState.currentPosition >= gameState.currentText.length) {
            endGame();
        }
    } else {
        // 错误输入
        gameState.errors++;
        
        // 标记错误字符
        const characters = elements.targetText.querySelectorAll(".character");
        if (characters[gameState.currentPosition]) {
            characters[gameState.currentPosition].classList.add("incorrect");
            
            // 短暂闪烁效果
            setTimeout(() => {
                characters[gameState.currentPosition].classList.remove("incorrect");
            }, 300);
        }
    }
    
    // 更新总字符数（每次按键都算一个字符）
    gameState.totalChars++;
}

// 创建彩花效果
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.animation = `float ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // 动画结束后移除元素
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// 切换难度
function setDifficulty(difficulty) {
    gameState.currentDifficulty = difficulty;
    
    // 更新UI
    elements.difficultyBtns.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add("active");
        }
    });
    
    // 如果游戏正在进行，重新开始
    if (gameState.isPlaying) {
        initGame();
        startGame();
    }
}

// 切换主题
function toggleTheme() {
    document.body.classList.toggle("light-theme");
    
    if (document.body.classList.contains("light-theme")) {
        document.documentElement.style.setProperty('--background', '#f5f5f5');
        document.documentElement.style.setProperty('--surface', '#ffffff');
        document.documentElement.style.setProperty('--on-background', '#000000');
        document.documentElement.style.setProperty('--on-surface', '#000000');
        elements.themeToggle.textContent = "🌙";
    } else {
        document.documentElement.style.setProperty('--background', '#121212');
        document.documentElement.style.setProperty('--surface', '#1e1e1e');
        document.documentElement.style.setProperty('--on-background', '#ffffff');
        document.documentElement.style.setProperty('--on-surface', '#ffffff');
        elements.themeToggle.textContent = "🌓";
    }
}

// 事件监听器
elements.startBtn.addEventListener("click", startGame);
elements.resetBtn.addEventListener("click", initGame);
elements.inputArea.addEventListener("input", handleInput);
elements.closeBtn.addEventListener("click", () => {
    elements.resultModal.classList.remove("active");
});
elements.themeToggle.addEventListener("click", toggleTheme);

// 难度选择按钮
elements.difficultyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        setDifficulty(btn.dataset.difficulty);
    });
});

// 初始化游戏
initGame();