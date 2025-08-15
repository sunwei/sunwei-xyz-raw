// DOM元素
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.getElementById('back-to-top');
const pricingToggle = document.getElementById('pricing-toggle');

// 导航栏滚动效果
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 添加滚动样式
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 回到顶部按钮显示/隐藏
    if (scrollTop > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    lastScrollTop = scrollTop;
});

// 移动端导航菜单切换
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 回到顶部功能
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero演示区域标签切换
const demoTabs = document.querySelectorAll('.demo-tab');
const demoPanels = document.querySelectorAll('.demo-panel');

demoTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // 移除所有活跃状态
        demoTabs.forEach(t => t.classList.remove('active'));
        demoPanels.forEach(p => p.classList.remove('active'));
        
        // 添加当前活跃状态
        tab.classList.add('active');
        demoPanels[index].classList.add('active');
    });
});

// Markdown文本计数器
const scriptTextarea = document.querySelector('.markdown-editor textarea');
const scriptCounter = document.querySelector('.markdown-counter span');

if (scriptTextarea && scriptCounter) {
    scriptTextarea.addEventListener('input', () => {
        const count = scriptTextarea.value.length;
        scriptCounter.textContent = `${count}/10000`;
        
        if (count > 10000) {
            scriptCounter.style.color = 'var(--color-error)';
        } else if (count > 8000) {
            scriptCounter.style.color = 'var(--color-warning)';
        } else {
            scriptCounter.style.color = 'var(--color-text-muted)';
        }
    });
}

// 打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // 重新开始
            setTimeout(() => {
                typeWriter(element, text, speed);
            }, 2000);
        }
    }
    
    type();
}

// 初始化打字机效果
const typingElement = document.querySelector('.typing-effect');
if (typingElement) {
    const texts = [
        '解析Markdown文件...',
        '应用精美主题...',
        '生成导航结构...',
        '构建响应式网站...'
    ];
    
    let currentTextIndex = 0;
    
    function startTyping() {
        typeWriter(typingElement, texts[currentTextIndex], 150);
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(startTyping, 4000);
    }
    
    startTyping();
}

// 客户评价轮播
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.nav-dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    // 隐藏所有卡片
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // 显示当前卡片
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }
}

// 自动轮播
function autoSlideTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// 点击导航点
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(index);
        
        // 重置自动轮播
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(autoSlideTestimonials, 5000);
    });
});

// 启动自动轮播
let testimonialInterval = setInterval(autoSlideTestimonials, 5000);

// 定价切换
if (pricingToggle) {
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const yearlyPrices = document.querySelectorAll('.price.yearly');
    
    pricingToggle.addEventListener('change', () => {
        if (pricingToggle.checked) {
            // 显示年付价格
            monthlyPrices.forEach(price => price.classList.add('hidden'));
            yearlyPrices.forEach(price => price.classList.remove('hidden'));
        } else {
            // 显示月付价格
            monthlyPrices.forEach(price => price.classList.remove('hidden'));
            yearlyPrices.forEach(price => price.classList.add('hidden'));
        }
    });
}

// FAQ折叠展开
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // 关闭所有其他FAQ项
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // 切换当前FAQ项
        item.classList.toggle('active', !isActive);
    });
});

// 视频播放按钮
const playBtns = document.querySelectorAll('.play-btn');

playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // 这里可以添加实际的视频播放逻辑
        showNotification('视频播放功能即将推出！', 'info');
    });
});

// 表单处理
const generateBtn = document.querySelector('.btn-generate');
const ctaBtns = document.querySelectorAll('.cta-buttons .btn');

if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        const textarea = document.querySelector('.markdown-editor textarea');
        const script = textarea ? textarea.value.trim() : '';
        
        if (script.length === 0) {
            showNotification('请先输入Markdown内容', 'warning');
            return;
        }
        
        if (script.length > 10000) {
            showNotification('内容不能超过10000个字符', 'error');
            return;
        }
        
        // 模拟生成视频
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在生成...';
        
        setTimeout(() => {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-download"></i> 下载Friday插件';
            showNotification('正在跳转到Obsidian社区插件页面...', 'success');
        }, 3000);
    });
}

// CTA按钮处理
ctaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const text = btn.textContent.trim();
        
        if (text.includes('安装Friday') || text.includes('下载Friday')) {
            showNotification('正在跳转到Obsidian社区插件页面...', 'info');
        } else if (text.includes('预约演示') || text.includes('联系销售')) {
            showNotification('正在跳转到预约页面...', 'info');
        }
    });
});

// 通知系统
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // 自动关闭
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#22c55e';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#6366f1';
    }
}

// 添加通知动画样式
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        opacity: 0.7;
        transition: opacity 0.2s;
        border-radius: 4px;
    }
    
    .notification-close:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(notificationStyles);

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
const animatedElements = document.querySelectorAll('.feature-card, .example-card, .workflow-step, .pricing-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// 数字计数动画
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // 格式化数字
        const formattedNumber = Math.floor(current).toLocaleString();
        element.textContent = formattedNumber;
    }, 16);
}

// 统计数字动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number && !element.dataset.animated) {
                element.dataset.animated = 'true';
                element.textContent = '0';
                animateCounter(element, number);
                
                // 添加单位
                setTimeout(() => {
                    if (text.includes('+')) element.textContent += '+';
                    if (text.includes('%')) element.textContent += '%';
                    if (text.includes('万')) element.textContent += '万';
                }, 2000);
            }
            
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

// 观察统计数字
const statNumbers = document.querySelectorAll('.trust-item');
statNumbers.forEach(stat => {
    const numberSpan = stat.querySelector('span');
    if (numberSpan && /\d/.test(numberSpan.textContent)) {
        statsObserver.observe(numberSpan);
    }
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 预加载关键资源
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 初始化第一个客户评价
    if (testimonialCards.length > 0) {
        showTestimonial(0);
    }
});

// 窗口大小改变时的处理
window.addEventListener('resize', debounce(() => {
    // 移动端菜单处理
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}, 250));

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        if (pageLoadTime > 3000) {
            console.warn('Page load time is slow:', pageLoadTime + 'ms');
        }
    });
}

// 错误处理
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭移动端菜单
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // 关闭通知
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
    
    // Tab键导航增强
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// 鼠标点击时移除键盘导航样式
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// 添加键盘导航样式
const keyboardNavStyles = document.createElement('style');
keyboardNavStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardNavStyles);

// 模拟加载状态
function showLoadingState(element, text = '加载中...') {
    const originalContent = element.innerHTML;
    element.disabled = true;
    element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    
    return () => {
        element.disabled = false;
        element.innerHTML = originalContent;
    };
}

// 表单验证
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 本地存储管理
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('localStorage not available');
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('localStorage not available');
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('localStorage not available');
        }
    }
};

// 用户偏好设置
const userPrefs = storage.get('userPreferences') || {};

// 保存用户在定价切换上的选择
if (pricingToggle) {
    pricingToggle.checked = userPrefs.yearlyPricing || false;
    
    pricingToggle.addEventListener('change', () => {
        userPrefs.yearlyPricing = pricingToggle.checked;
        storage.set('userPreferences', userPrefs);
    });
}

// 暗色模式切换（可选功能）
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    userPrefs.darkMode = isDark;
    storage.set('userPreferences', userPrefs);
}

// 应用保存的暗色模式设置
if (userPrefs.darkMode) {
    document.body.classList.add('dark-mode');
}

// 主题切换功能
const themeTabsContainer = document.querySelector('.theme-tabs');
const themePreviews = document.querySelectorAll('.theme-preview');

if (themeTabsContainer) {
    const themeTabs = themeTabsContainer.querySelectorAll('.theme-tab');
    
    themeTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // 移除所有活跃状态
            themeTabs.forEach(t => t.classList.remove('active'));
            themePreviews.forEach(p => p.classList.remove('active'));
            
            // 添加当前活跃状态
            tab.classList.add('active');
            
            // 根据data-theme属性找到对应的预览
            const themeType = tab.getAttribute('data-theme');
            const targetPreview = document.getElementById(themeType + '-preview');
            if (targetPreview) {
                targetPreview.classList.add('active');
            }
        });
    });
}


