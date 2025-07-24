document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中是否有记住的选择
    const rememberedMode = localStorage.getItem('rememberedMode');
    const rememberCheckbox = rememberedMode ? 
        document.getElementById(`remember-${rememberedMode}`) : null;
    
    if (rememberedMode && rememberCheckbox) {
        // 自动跳转到记住的模式
        window.location.href = `${rememberedMode}.html`;
        return;
    }
    
    // 正常选择逻辑
    const modeOptions = document.querySelectorAll('.mode-option');
    const startBtn = document.getElementById('start-btn');
    let selectedMode = null;
    
    modeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除之前的选择
            modeOptions.forEach(opt => opt.classList.remove('selected'));
            
            // 添加新选择
            this.classList.add('selected');
            selectedMode = this.id;
            
            // 确保只有一个"总是选择这个"被选中
            const checkboxes = document.querySelectorAll('.remember-option input');
            checkboxes.forEach(checkbox => {
                if (checkbox !== this.querySelector('.remember-option input')) {
                    checkbox.checked = false;
                }
            });
        });
    });
    
    startBtn.addEventListener('click', function() {
        if (!selectedMode) {
            alert('请先选择一个游戏模式');
            return;
        }
        
        // 检查是否勾选了"总是选择这个"
        const rememberCheckbox = document.querySelector(`#${selectedMode} .remember-option input`);
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedMode', selectedMode);
        } else {
            localStorage.removeItem('rememberedMode');
        }
        
        // 跳转到对应模式页面
        window.location.href = `${selectedMode}.html`;
    });
});