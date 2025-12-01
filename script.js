// DOM元素
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

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
        const target = document.querySelector(this.getAttribute('href'));
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

// 活跃导航链接高亮
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// 作品筛选功能
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有活跃状态
        filterBtns.forEach(b => b.classList.remove('active'));
        // 添加当前按钮活跃状态
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    if (item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// 技能条动画
const skillBars = document.querySelectorAll('.skill-progress');
const aboutSection = document.getElementById('about');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// 使用Intersection Observer监听关于区域
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// 联系表单处理
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // 简单的表单验证
    if (!name || !email || !subject || !message) {
        showNotification('请填写所有必填字段', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return;
    }
    
    // 显示发送中状态
    showNotification('正在发送消息...', 'info');
    
    try {
        // 准备API请求数据
        const apiUrl = "https://mdfriday.sunwei.xyz/api/cta/submit?type=CTA";
        
        // 将表单数据格式化为API需要的格式
        // name字段放真实邮箱，email字段放：姓名===主题===消息
        const apiFormData = new FormData();
        apiFormData.append('id', '-1'); // 新建记录
        apiFormData.append('name', email); // 真实邮箱放在name字段
        apiFormData.append('email', `${name}===${subject}===${message}`); // 其他信息用===分隔
        
        // 发送请求
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: apiFormData,
            headers: {
                'X-Signer': 'me@sunwei.xyz',
                'X-Signature': 'bGRN2Mg7WPWIr87gzOyNHnHT1lZbGvaFru7WGY-fh_8'
            }
        });
        
        if (response.ok) {
            showNotification('消息发送成功！我们会尽快回复您。', 'success');
            contactForm.reset();
        } else {
            // 如果API请求失败，显示错误信息
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            showNotification('发送失败，请稍后重试或直接发送邮件至 hi@sunwei.xyz', 'error');
        }
        
    } catch (error) {
        console.error('Network Error:', error);
        showNotification('网络错误，请检查网络连接或直接发送邮件至 hi@sunwei.xyz', 'error');
    }
});

// 邮箱验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // 自动关闭
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
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
        case 'success': return '#10b981';
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
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// 神经网络动画增强
const nodes = document.querySelectorAll('.node');
const connections = document.querySelectorAll('.connection');

// 为节点添加随机脉冲效果
nodes.forEach((node, index) => {
    const delay = parseFloat(node.getAttribute('data-delay')) || 0;
    
    setInterval(() => {
        node.style.animationDuration = `${1.5 + Math.random() * 1}s`;
    }, 3000 + delay * 1000);
});

// 连接线流动效果
connections.forEach((connection, index) => {
    const delay = index * 0.5;
    connection.style.animationDelay = `${delay}s`;
    
    // 随机改变流动方向
    setInterval(() => {
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        connection.style.animationDirection = direction;
    }, 4000 + delay * 1000);
});

// 鼠标跟踪效果（可选）
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 为hero区域添加鼠标跟踪视差效果
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 预加载关键资源
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
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
    
    // 初始化AOS动画（如果需要）
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
});

// 窗口大小改变时的处理
window.addEventListener('resize', debounce(() => {
    // 重新计算动画位置
    if (window.innerWidth <= 768) {
        // 移动端优化
        heroVisual.style.transform = 'none';
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
    // 在生产环境中，可以发送错误信息到监控服务
});

// Service Worker注册（PWA支持）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // 这里可以注册Service Worker，实现离线缓存等功能
        // navigator.serviceWorker.register('/sw.js');
    });
}

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭移动端菜单
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
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

// 懒加载图片（如果有的话）
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// 打字机效果（可选，用于hero标题）
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

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
        element.textContent = Math.floor(current);
    }, 16);
}

// 当统计数字进入视窗时触发计数动画
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number) {
                element.textContent = '0';
                animateCounter(element, number);
                
                // 添加单位
                setTimeout(() => {
                    if (text.includes('+')) element.textContent += '+';
                    if (text.includes('%')) element.textContent += '%';
                    if (text.includes('年')) element.textContent += '年';
                }, 2000);
            }
            
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));
