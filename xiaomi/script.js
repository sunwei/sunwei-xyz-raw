// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前日期
    setCurrentDate();
    
    // 添加额外的动态效果
    addDynamicEffects();
    
    // 初始化音效
    initializeAudio();
    
    // 添加键盘事件
    addKeyboardEvents();
    
    console.log('🎂 小米的生日卡片加载完成！');
});

// 设置当前日期
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    dateElement.textContent = now.toLocaleDateString('zh-CN', options);
}

// 创建烟花效果
function createFireworks() {
    const container = document.querySelector('.fireworks-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ffa8e6'];
    
    // 播放音效
    playSound('firework');
    
    // 创建多个烟花
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createSingleFirework(container, colors);
        }, i * 200);
    }
    
    // 显示庆祝消息
    showCelebrationMessage('🎆 烟花绽放，为小米庆生！');
}

// 创建单个烟花
function createSingleFirework(container, colors) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // 随机位置
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(firework);
    
    // 创建爆炸粒子
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i * 30) * Math.PI / 180;
        const distance = 50 + Math.random() * 100;
        const finalX = x + Math.cos(angle) * distance;
        const finalY = y + Math.sin(angle) * distance;
        
        particle.style.setProperty('--final-x', finalX + 'px');
        particle.style.setProperty('--final-y', finalY + 'px');
        
        container.appendChild(particle);
        
        // 移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    // 移除主烟花
    setTimeout(() => {
        if (firework.parentNode) {
            firework.parentNode.removeChild(firework);
        }
    }, 2000);
}

// 播放生日歌
function playBirthdaySong() {
    playSound('birthday');
    
    // 创建音符动画
    createMusicNotes();
    
    // 显示歌词
    showBirthdayLyrics();
    
    showCelebrationMessage('🎵 生日快乐歌为小米响起！');
}

// 创建音符动画
function createMusicNotes() {
    const notes = ['♪', '♫', '♬', '♩', '♭', '♮', '♯'];
    const container = document.body;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.position = 'fixed';
            note.style.left = Math.random() * window.innerWidth + 'px';
            note.style.top = window.innerHeight + 'px';
            note.style.fontSize = (20 + Math.random() * 20) + 'px';
            note.style.color = '#ff6b6b';
            note.style.zIndex = '1000';
            note.style.pointerEvents = 'none';
            note.style.animation = 'noteFloat 3s ease-out forwards';
            
            container.appendChild(note);
            
            setTimeout(() => {
                if (note.parentNode) {
                    note.parentNode.removeChild(note);
                }
            }, 3000);
        }, i * 100);
    }
}

// 添加音符浮动动画
const noteStyle = document.createElement('style');
noteStyle.textContent = `
    @keyframes noteFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(noteStyle);

// 显示生日歌词
function showBirthdayLyrics() {
    const lyrics = [
        '🎵 祝你生日快乐',
        '🎵 祝你生日快乐',
        '🎵 祝亲爱的小米',
        '🎵 生日快乐！🎂'
    ];
    
    lyrics.forEach((lyric, index) => {
        setTimeout(() => {
            showCelebrationMessage(lyric, 2000);
        }, index * 2500);
    });
}

// 许愿功能
function makeWish() {
    const modal = document.getElementById('wishModal');
    modal.style.display = 'flex';
    
    // 聚焦到输入框
    setTimeout(() => {
        document.getElementById('wishText').focus();
    }, 300);
    
    playSound('wish');
}

// 提交愿望
function submitWish() {
    const wishText = document.getElementById('wishText').value.trim();
    
    if (wishText) {
        // 创建许愿特效
        createWishEffect();
        
        // 显示确认消息
        showCelebrationMessage('🌟 愿望已经送达星空，一定会实现的！', 3000);
        
        // 保存愿望到本地存储
        saveWish(wishText);
        
        playSound('success');
    } else {
        showCelebrationMessage('💫 请先写下你的生日愿望哦！', 2000);
    }
    
    closeWish();
}

// 关闭许愿弹窗
function closeWish() {
    const modal = document.getElementById('wishModal');
    modal.style.display = 'none';
    document.getElementById('wishText').value = '';
}

// 创建许愿特效
function createWishEffect() {
    const stars = ['⭐', '✨', '🌟', '💫', '⚡'];
    const container = document.body;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.textContent = stars[Math.floor(Math.random() * stars.length)];
            star.style.position = 'fixed';
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = Math.random() * window.innerHeight + 'px';
            star.style.fontSize = (16 + Math.random() * 16) + 'px';
            star.style.zIndex = '1000';
            star.style.pointerEvents = 'none';
            star.style.animation = 'starWish 2s ease-out forwards';
            
            container.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 2000);
        }, i * 50);
    }
}

// 添加许愿星星动画
const starStyle = document.createElement('style');
starStyle.textContent = `
    @keyframes starWish {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(starStyle);

// 保存愿望
function saveWish(wish) {
    const wishes = JSON.parse(localStorage.getItem('xiaomi-wishes') || '[]');
    wishes.push({
        wish: wish,
        date: new Date().toISOString(),
        fulfilled: false
    });
    localStorage.setItem('xiaomi-wishes', JSON.stringify(wishes));
}

// 显示庆祝消息
function showCelebrationMessage(message, duration = 2000) {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.celebration-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'celebration-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff6b6b, #ffe66d);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 18px;
        font-weight: 600;
        z-index: 2000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: messageSlide 0.5s ease-out;
        text-align: center;
        max-width: 90vw;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'messageSlideOut 0.5s ease-out forwards';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 500);
        }
    }, duration);
}

// 添加消息动画样式
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes messageSlide {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes messageSlideOut {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(messageStyle);

// 添加动态效果
function addDynamicEffects() {
    // 随机闪烁星星
    setInterval(() => {
        addRandomStar();
    }, 3000);
    
    // 随机彩纸飘落
    setInterval(() => {
        addRandomConfetti();
    }, 5000);
    
    // 蛋糕蜡烛闪烁
    animateCandles();
}

// 添加随机星星
function addRandomStar() {
    const star = document.createElement('div');
    star.textContent = '✨';
    star.style.position = 'fixed';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.fontSize = '20px';
    star.style.zIndex = '10';
    star.style.pointerEvents = 'none';
    star.style.animation = 'randomStar 3s ease-out forwards';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 3000);
}

// 添加随机彩纸
function addRandomConfetti() {
    const confetti = ['🎊', '🎉', '🎈', '🎀'];
    const piece = document.createElement('div');
    piece.textContent = confetti[Math.floor(Math.random() * confetti.length)];
    piece.style.position = 'fixed';
    piece.style.left = Math.random() * window.innerWidth + 'px';
    piece.style.top = '-50px';
    piece.style.fontSize = '24px';
    piece.style.zIndex = '10';
    piece.style.pointerEvents = 'none';
    piece.style.animation = 'confettiFall 4s linear forwards';
    
    document.body.appendChild(piece);
    
    setTimeout(() => {
        if (piece.parentNode) {
            piece.parentNode.removeChild(piece);
        }
    }, 4000);
}

// 蜡烛动画
function animateCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        setInterval(() => {
            const intensity = 0.8 + Math.random() * 0.4;
            flame.style.transform = `translateX(-50%) scale(${intensity}) rotate(${-5 + Math.random() * 10}deg)`;
        }, 100 + index * 50);
    });
}

// 添加动画样式
const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
    @keyframes randomStar {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(${window.innerHeight + 50}px) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(dynamicStyle);

// 初始化音效系统
function initializeAudio() {
    // 创建音频上下文（简单的音效模拟）
    window.audioContext = null;
    
    if (typeof AudioContext !== 'undefined') {
        window.audioContext = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
        window.audioContext = new webkitAudioContext();
    }
}

// 播放音效
function playSound(type) {
    if (!window.audioContext) {
        return;
    }
    
    try {
        const oscillator = window.audioContext.createOscillator();
        const gainNode = window.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(window.audioContext.destination);
        
        switch (type) {
            case 'firework':
                // 烟花音效
                oscillator.frequency.setValueAtTime(800, window.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, window.audioContext.currentTime + 0.5);
                gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(window.audioContext.currentTime + 0.5);
                break;
                
            case 'birthday':
                // 生日歌音效
                const notes = [262, 262, 294, 262, 349, 330]; // C C D C F E
                notes.forEach((freq, index) => {
                    setTimeout(() => {
                        const osc = window.audioContext.createOscillator();
                        const gain = window.audioContext.createGain();
                        osc.connect(gain);
                        gain.connect(window.audioContext.destination);
                        osc.frequency.setValueAtTime(freq, window.audioContext.currentTime);
                        gain.gain.setValueAtTime(0.1, window.audioContext.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.3);
                        osc.start();
                        osc.stop(window.audioContext.currentTime + 0.3);
                    }, index * 400);
                });
                break;
                
            case 'wish':
                // 许愿音效
                oscillator.frequency.setValueAtTime(523, window.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1047, window.audioContext.currentTime + 1);
                gainNode.gain.setValueAtTime(0.05, window.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 1);
                oscillator.start();
                oscillator.stop(window.audioContext.currentTime + 1);
                break;
                
            case 'success':
                // 成功音效
                [523, 659, 784, 1047].forEach((freq, index) => {
                    setTimeout(() => {
                        const osc = window.audioContext.createOscillator();
                        const gain = window.audioContext.createGain();
                        osc.connect(gain);
                        gain.connect(window.audioContext.destination);
                        osc.frequency.setValueAtTime(freq, window.audioContext.currentTime);
                        gain.gain.setValueAtTime(0.08, window.audioContext.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.2);
                        osc.start();
                        osc.stop(window.audioContext.currentTime + 0.2);
                    }, index * 100);
                });
                break;
        }
    } catch (error) {
        console.log('音效播放失败:', error);
    }
}

// 键盘事件
function addKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'f':
            case 'F':
                createFireworks();
                break;
            case 'm':
            case 'M':
                playBirthdaySong();
                break;
            case 'w':
            case 'W':
                makeWish();
                break;
            case 'Escape':
                closeWish();
                break;
            case 'Enter':
                if (document.getElementById('wishModal').style.display === 'flex') {
                    submitWish();
                }
                break;
        }
    });
}

// 点击卡片添加特效
document.addEventListener('click', function(e) {
    if (e.target.closest('.birthday-card')) {
        createClickEffect(e.clientX, e.clientY);
    }
});

// 创建点击特效
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.textContent = '💖';
    effect.style.position = 'fixed';
    effect.style.left = (x - 10) + 'px';
    effect.style.top = (y - 10) + 'px';
    effect.style.fontSize = '20px';
    effect.style.zIndex = '1000';
    effect.style.pointerEvents = 'none';
    effect.style.animation = 'clickEffect 1s ease-out forwards';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 1000);
}

// 点击特效动画
const clickStyle = document.createElement('style');
clickStyle.textContent = `
    @keyframes clickEffect {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(2) translateY(-30px);
        }
    }
`;
document.head.appendChild(clickStyle);

// 添加触摸支持
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.birthday-card')) {
        const touch = e.touches[0];
        createClickEffect(touch.clientX, touch.clientY);
    }
});

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时显示欢迎消息
        setTimeout(() => {
            showCelebrationMessage('🎂 欢迎回来，继续为小米庆生！');
        }, 500);
    }
});

// 自动生日祝福
setTimeout(() => {
    showCelebrationMessage('🎉 小米12岁生日快乐！愿你永远开朗活泼！', 3000);
}, 2000);

// 定期显示鼓励消息
setInterval(() => {
    const messages = [
        '🌟 小米真棒！',
        '💖 愿你每天都开心！',
        '🎈 12岁的你最美丽！',
        '🦄 像独角兽一样闪闪发光！',
        '🌈 彩虹般的美好未来等着你！'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showCelebrationMessage(randomMessage, 2000);
}, 30000); // 每30秒显示一次

console.log('🎂 小米生日卡片脚本加载完成！');
console.log('💡 快捷键: F-烟花, M-音乐, W-许愿');
