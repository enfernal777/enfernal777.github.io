// Premium Menu System
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');
const menuClose = document.getElementById('menu-close');

// Open menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close menu
menuClose.addEventListener('click', () => {
    closeMenu();
});

// Close menu when clicking on overlay background
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        closeMenu();
    }
});

// Close menu function
function closeMenu() {
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close menu when clicking on menu links
document.querySelectorAll('.menu-link, .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        closeMenu();
    }
});

// Premium Menu Link Hover Effects
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        // Add magnetic effect
        this.style.transform = 'translateX(10px)';
        
        // Create ripple effect on hover
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = '0';
        ripple.style.top = '0';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.background = 'rgba(102, 126, 234, 0.1)';
        ripple.style.pointerEvents = 'none';
        ripple.style.opacity = '0';
        ripple.style.transition = 'opacity 0.3s ease';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.opacity = '1';
        }, 10);
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = '';
        
        // Remove ripple effect
        const ripple = this.querySelector('div');
        if (ripple) {
            ripple.style.opacity = '0';
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 300);
        }
    });
});

// Add parallax effect to background text
window.addEventListener('scroll', () => {
    const bgText = document.querySelector('.menu-bg-text');
    if (bgText && menuOverlay.classList.contains('active')) {
        const scrolled = window.pageYOffset;
        bgText.style.transform = `translateY(-50%) rotate(90deg) translateX(${scrolled * 0.1}px)`;
    }
});

// Add cursor trail effect in menu
let mouseTrail = [];
const maxTrailLength = 10;

menuOverlay.addEventListener('mousemove', (e) => {
    if (!menuOverlay.classList.contains('active')) return;
    
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    // Remove old trail elements
    document.querySelectorAll('.cursor-trail').forEach(el => {
        if (Date.now() - el.dataset.time > 1000) {
            el.remove();
        }
    });
    
    // Create new trail element
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.dataset.time = Date.now();
    trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: #667eea;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        opacity: 0.8;
        transform: translate(-50%, -50%);
        animation: trailFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
});

// Add CSS for trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
        }
    }
`;
document.head.appendChild(trailStyle);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.project-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #6366f1;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style); 