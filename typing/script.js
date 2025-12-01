// 游戏状态管理
class TypingGame {
    constructor() {
        this.currentMode = 'finger-guide';
        this.stats = {
            level: 1,
            score: 0,
            accuracy: 100,
            totalKeystrokes: 0,
            correctKeystrokes: 0,
            wordsCompleted: 0,
            sentencesCompleted: 0,
            startTime: null
        };
        
        // 练习数据
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.currentLetterIndex = 0;
        
        this.commonWords = [
            'apple', 'book', 'cat', 'dog', 'elephant', 'fish', 'green', 'happy',
            'ice', 'jump', 'key', 'love', 'mouse', 'nice', 'orange', 'play',
            'quick', 'red', 'sun', 'tree', 'under', 'very', 'water', 'yellow',
            'zoo', 'ball', 'cake', 'door', 'easy', 'fun', 'good', 'help'
        ];
        this.currentWordIndex = 0;
        
        this.sentences = [
            'The quick brown fox jumps over the lazy dog.',
            'A journey of a thousand miles begins with a single step.',
            'Practice makes perfect in everything you do.',
            'Learning to type is fun and useful.',
            'Every expert was once a beginner.',
            'The best time to plant a tree was 20 years ago.',
            'Success is the sum of small efforts repeated.',
            'Dream big and dare to fail.',
            'Life is what happens when you are busy making plans.',
            'The only way to do great work is to love what you do.'
        ];
        this.currentSentenceIndex = 0;
        
        // 成就系统
        this.achievements = [
            { id: 'first_letter', title: '第一个字母', desc: '完成第一个字母练习', icon: '🎯', unlocked: false },
            { id: 'alphabet_master', title: '字母大师', desc: '完成所有字母练习', icon: '🔤', unlocked: false },
            { id: 'word_warrior', title: '单词战士', desc: '完成10个单词', icon: '📝', unlocked: false },
            { id: 'sentence_sage', title: '句子圣人', desc: '完成5个句子', icon: '📖', unlocked: false },
            { id: 'speed_demon', title: '速度恶魔', desc: '达到30 WPM', icon: '⚡', unlocked: false },
            { id: 'accuracy_ace', title: '准确专家', desc: '保持95%以上准确率', icon: '🎯', unlocked: false }
        ];
        
        // 手指对应关系
        this.fingerMap = {
            'q': 'left-pinky', 'a': 'left-pinky', 'z': 'left-pinky', '1': 'left-pinky', '`': 'left-pinky',
            'w': 'left-ring', 's': 'left-ring', 'x': 'left-ring', '2': 'left-ring',
            'e': 'left-middle', 'd': 'left-middle', 'c': 'left-middle', '3': 'left-middle',
            'r': 'left-index', 't': 'left-index', 'f': 'left-index', 'g': 'left-index',
            'v': 'left-index', 'b': 'left-index', '4': 'left-index', '5': 'left-index',
            'y': 'right-index', 'u': 'right-index', 'h': 'right-index', 'j': 'right-index',
            'n': 'right-index', 'm': 'right-index', '6': 'right-index', '7': 'right-index',
            'i': 'right-middle', 'k': 'right-middle', ',': 'right-middle', '8': 'right-middle',
            'o': 'right-ring', 'l': 'right-ring', '.': 'right-ring', '9': 'right-ring',
            'p': 'right-pinky', ';': 'right-pinky', '/': 'right-pinky', '0': 'right-pinky',
            '-': 'right-pinky', '=': 'right-pinky', '[': 'right-pinky', ']': 'right-pinky',
            '\\': 'right-pinky', '\'': 'right-pinky'
        };
        
        this.fingerNames = {
            'left-pinky': '左手小指',
            'left-ring': '左手无名指',
            'left-middle': '左手中指',
            'left-index': '左手食指',
            'right-index': '右手食指',
            'right-middle': '右手中指',
            'right-ring': '右手无名指',
            'right-pinky': '右手小指'
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateStats();
        this.renderAchievements();
        this.startLetterPractice();
        this.startWordPractice();
        this.startSentencePractice();
    }
    
    bindEvents() {
        // 模式切换
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMode(e.target.dataset.mode);
            });
        });
        
        // 键盘点击事件（指法教学）
        document.querySelectorAll('.key[data-key]').forEach(key => {
            key.addEventListener('click', (e) => {
                this.showFingerGuide(e.target.dataset.key);
            });
        });
        
        // 键盘按键事件
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
        
        // 输入框事件
        const letterInput = document.getElementById('letter-input');
        const wordInput = document.getElementById('word-input');
        const sentenceInput = document.getElementById('sentence-input');
        
        if (letterInput) {
            letterInput.addEventListener('input', (e) => this.handleLetterInput(e));
        }
        
        if (wordInput) {
            wordInput.addEventListener('input', (e) => this.handleWordInput(e));
        }
        
        if (sentenceInput) {
            sentenceInput.addEventListener('input', (e) => this.handleSentenceInput(e));
        }
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        // 更新按钮状态
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // 显示对应区域
        document.querySelectorAll('.game-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(mode).classList.add('active');
        
        // 重置当前模式的状态
        this.resetCurrentMode();
    }
    
    resetCurrentMode() {
        switch (this.currentMode) {
            case 'letter-practice':
                this.currentLetterIndex = 0;
                this.updateLetterDisplay();
                document.getElementById('letter-input').value = '';
                break;
            case 'word-practice':
                this.currentWordIndex = 0;
                this.updateWordDisplay();
                document.getElementById('word-input').value = '';
                this.stats.startTime = null;
                break;
            case 'sentence-practice':
                this.currentSentenceIndex = 0;
                this.updateSentenceDisplay();
                document.getElementById('sentence-input').value = '';
                this.stats.startTime = null;
                break;
        }
    }
    
    handleKeyPress(e) {
        if (this.currentMode === 'finger-guide') {
            this.highlightKey(e.key.toLowerCase());
            this.showFingerGuide(e.key.toLowerCase());
        }
        
        this.stats.totalKeystrokes++;
    }
    
    highlightKey(key) {
        // 清除之前的高亮
        document.querySelectorAll('.key.active').forEach(k => {
            k.classList.remove('active');
        });
        
        // 高亮当前按键
        const keyElement = document.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
            setTimeout(() => {
                keyElement.classList.remove('active');
            }, 300);
        }
    }
    
    showFingerGuide(key) {
        const finger = this.fingerMap[key];
        const fingerName = this.fingerNames[finger];
        
        document.getElementById('current-key').textContent = key.toUpperCase();
        document.getElementById('finger-instruction').textContent = 
            fingerName ? `使用 ${fingerName} 按下这个键` : '这个键的指法信息暂未收录';
        
        // 高亮对应的手指指导
        document.querySelectorAll('.finger').forEach(f => {
            f.style.background = 'white';
        });
        
        if (finger) {
            const fingerElement = document.querySelector(`.finger.${finger}`);
            if (fingerElement) {
                fingerElement.style.background = '#e6fffa';
                fingerElement.style.borderLeftWidth = '6px';
            }
        }
    }
    
    // 字母练习
    startLetterPractice() {
        this.updateLetterDisplay();
    }
    
    updateLetterDisplay() {
        const targetChar = document.getElementById('target-char');
        const progressFill = document.getElementById('letter-progress');
        const letterCount = document.getElementById('letter-count');
        
        if (targetChar && this.currentLetterIndex < this.alphabet.length) {
            targetChar.textContent = this.alphabet[this.currentLetterIndex];
            
            const progress = (this.currentLetterIndex / this.alphabet.length) * 100;
            progressFill.style.width = `${progress}%`;
            letterCount.textContent = this.currentLetterIndex;
        }
    }
    
    handleLetterInput(e) {
        const input = e.target;
        const inputValue = input.value.toUpperCase();
        const targetLetter = this.alphabet[this.currentLetterIndex];
        
        if (inputValue === targetLetter) {
            input.classList.remove('incorrect');
            input.classList.add('correct');
            this.stats.correctKeystrokes++;
            
            setTimeout(() => {
                this.nextLetter();
                input.value = '';
                input.classList.remove('correct');
            }, 500);
            
            this.addScore(10);
            
            if (this.currentLetterIndex === 1) {
                this.unlockAchievement('first_letter');
            }
        } else if (inputValue) {
            input.classList.remove('correct');
            input.classList.add('incorrect');
            setTimeout(() => {
                input.classList.remove('incorrect');
            }, 500);
        }
        
        this.updateAccuracy();
    }
    
    nextLetter() {
        this.currentLetterIndex++;
        if (this.currentLetterIndex >= this.alphabet.length) {
            this.unlockAchievement('alphabet_master');
            this.currentLetterIndex = 0; // 重新开始
            this.levelUp();
        }
        this.updateLetterDisplay();
    }
    
    // 单词练习
    startWordPractice() {
        this.updateWordDisplay();
    }
    
    updateWordDisplay() {
        const targetWord = document.getElementById('target-word');
        if (targetWord && this.currentWordIndex < this.commonWords.length) {
            targetWord.textContent = this.commonWords[this.currentWordIndex];
        }
    }
    
    handleWordInput(e) {
        const input = e.target;
        const inputValue = input.value.toLowerCase().trim();
        const targetWord = this.commonWords[this.currentWordIndex];
        
        if (!this.stats.startTime) {
            this.stats.startTime = Date.now();
        }
        
        if (inputValue === targetWord) {
            input.classList.remove('incorrect');
            input.classList.add('correct');
            this.stats.correctKeystrokes += targetWord.length;
            this.stats.wordsCompleted++;
            
            setTimeout(() => {
                this.nextWord();
                input.value = '';
                input.classList.remove('correct');
            }, 500);
            
            this.addScore(targetWord.length * 5);
            this.updateWordStats();
            
            if (this.stats.wordsCompleted === 10) {
                this.unlockAchievement('word_warrior');
            }
        } else if (inputValue && !targetWord.startsWith(inputValue)) {
            input.classList.add('incorrect');
        } else {
            input.classList.remove('incorrect', 'correct');
        }
        
        this.updateAccuracy();
    }
    
    nextWord() {
        this.currentWordIndex = (this.currentWordIndex + 1) % this.commonWords.length;
        this.updateWordDisplay();
    }
    
    updateWordStats() {
        document.getElementById('words-completed').textContent = this.stats.wordsCompleted;
        
        if (this.stats.startTime) {
            const timeElapsed = (Date.now() - this.stats.startTime) / 1000 / 60; // 分钟
            const wpm = Math.round(this.stats.wordsCompleted / timeElapsed) || 0;
            document.getElementById('wpm').textContent = wpm;
            
            if (wpm >= 30) {
                this.unlockAchievement('speed_demon');
            }
        }
    }
    
    // 句子练习
    startSentencePractice() {
        this.updateSentenceDisplay();
    }
    
    updateSentenceDisplay() {
        const targetSentence = document.getElementById('target-sentence');
        if (targetSentence && this.currentSentenceIndex < this.sentences.length) {
            targetSentence.textContent = this.sentences[this.currentSentenceIndex];
        }
    }
    
    handleSentenceInput(e) {
        const input = e.target;
        const inputValue = input.value;
        const targetSentence = this.sentences[this.currentSentenceIndex];
        
        if (!this.stats.startTime) {
            this.stats.startTime = Date.now();
        }
        
        if (inputValue === targetSentence) {
            input.classList.remove('incorrect');
            input.classList.add('correct');
            this.stats.correctKeystrokes += targetSentence.length;
            this.stats.sentencesCompleted++;
            
            setTimeout(() => {
                this.nextSentence();
                input.value = '';
                input.classList.remove('correct');
                this.updateSentenceStats();
            }, 1000);
            
            this.addScore(targetSentence.length * 2);
            
            if (this.stats.sentencesCompleted === 5) {
                this.unlockAchievement('sentence_sage');
            }
        } else if (inputValue && !targetSentence.startsWith(inputValue)) {
            input.classList.add('incorrect');
        } else {
            input.classList.remove('incorrect', 'correct');
        }
        
        this.updateAccuracy();
    }
    
    nextSentence() {
        this.currentSentenceIndex = (this.currentSentenceIndex + 1) % this.sentences.length;
        this.updateSentenceDisplay();
        this.stats.startTime = Date.now(); // 重置计时
    }
    
    updateSentenceStats() {
        document.getElementById('sentences-completed').textContent = this.stats.sentencesCompleted;
        
        if (this.stats.startTime) {
            const timeElapsed = (Date.now() - this.stats.startTime) / 1000;
            document.getElementById('time-taken').textContent = Math.round(timeElapsed);
            
            // 计算平均WPM
            const avgWpm = Math.round((this.stats.wordsCompleted + this.stats.sentencesCompleted * 10) / 
                                   ((Date.now() - this.stats.startTime) / 1000 / 60)) || 0;
            document.getElementById('avg-wpm').textContent = avgWpm;
        }
    }
    
    // 统计和分数系统
    addScore(points) {
        this.stats.score += points;
        this.updateStats();
        
        // 检查是否升级
        const newLevel = Math.floor(this.stats.score / 1000) + 1;
        if (newLevel > this.stats.level) {
            this.stats.level = newLevel;
            this.levelUp();
        }
    }
    
    updateAccuracy() {
        if (this.stats.totalKeystrokes > 0) {
            this.stats.accuracy = Math.round((this.stats.correctKeystrokes / this.stats.totalKeystrokes) * 100);
            
            if (this.stats.accuracy >= 95 && this.stats.totalKeystrokes >= 100) {
                this.unlockAchievement('accuracy_ace');
            }
        }
        this.updateStats();
    }
    
    updateStats() {
        document.getElementById('level').textContent = this.stats.level;
        document.getElementById('score').textContent = this.stats.score;
        document.getElementById('accuracy').textContent = this.stats.accuracy + '%';
    }
    
    levelUp() {
        // 升级特效
        const levelElement = document.getElementById('level');
        levelElement.classList.add('celebration');
        setTimeout(() => {
            levelElement.classList.remove('celebration');
        }, 600);
        
        // 显示升级消息
        this.showNotification(`🎉 恭喜升级到 ${this.stats.level} 级！`);
    }
    
    // 成就系统
    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            this.renderAchievements();
            this.showNotification(`🏆 解锁成就：${achievement.title}`);
        }
    }
    
    renderAchievements() {
        const achievementList = document.getElementById('achievements');
        achievementList.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`;
            achievementElement.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            `;
            
            if (achievement.unlocked) {
                achievementElement.classList.add('sparkle');
            }
            
            achievementList.appendChild(achievementElement);
        });
    }
    
    showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            font-weight: 600;
            animation: slideInRight 0.5s ease-out;
        `;
        notification.textContent = message;
        
        // 添加动画样式
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // 3秒后移除通知
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new TypingGame();
});

// 添加一些有趣的键盘音效（可选）
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.initAudio();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    playKeySound(frequency = 800, duration = 100) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }
    
    playSuccessSound() {
        this.playKeySound(1000, 200);
        setTimeout(() => this.playKeySound(1200, 200), 100);
    }
    
    playErrorSound() {
        this.playKeySound(300, 300);
    }
}

// 可选：启用音效
// const soundEffects = new SoundEffects();
