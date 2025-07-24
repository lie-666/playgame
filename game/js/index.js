const values = [
    "富强", "民主", "文明", "和谐",
    "自由", "平等", "公正", "法治",
    "爱国", "敬业", "诚信", "友善"
];
let currentIndex = 0;

document.addEventListener('click', function(event) {
    const valueElement = document.createElement('div');
    valueElement.className = 'core-value';
    valueElement.textContent = values[currentIndex];
    
    // 初始位置（鼠标点击点）
    valueElement.style.left = (event.clientX + 10) + 'px';
    valueElement.style.top = (event.clientY - 10) + 'px';
    
    document.body.appendChild(valueElement);
    
    // 触发动画（向上移动150px + 淡出）
    setTimeout(() => {
        valueElement.style.opacity = '0';
        valueElement.style.transform = 'translateY(-150px)'; /* 上浮150px */
    }, 10);
    
    // 1秒后移除元素（和动画时间一致）
    setTimeout(() => {
        valueElement.remove();
    }, 1000);
    
    // 更新索引，循环显示
    currentIndex = (currentIndex + 1) % values.length;
});
// 更新日志功能
document.addEventListener('DOMContentLoaded', function() {
    const changelogBtn = document.querySelector('.changelog-btn');
    const changelogModal = document.querySelector('.changelog-modal');
    const closeBtn = document.querySelector('.close-changelog');
    
    // 打开更新日志
    changelogBtn.addEventListener('click', function() {
        changelogModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 关闭更新日志
    closeBtn.addEventListener('click', function() {
        changelogModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框外部关闭
    changelogModal.addEventListener('click', function(e) {
        if (e.target === changelogModal) {
            changelogModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});