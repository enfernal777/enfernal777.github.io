// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Header background change on scroll - keep consistent dark theme
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 14, 26, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(10, 14, 26, 0.95)';
        header.style.boxShadow = '0 1px 0 rgba(0, 255, 157, 0.2), 0 4px 20px rgba(0, 0, 0, 0.5)';
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
    
    // Temporarily hide the cursor during typing
    element.style.setProperty('--cursor-display', 'none');
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Show cursor again after typing is complete
            element.style.removeProperty('--cursor-display');
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

// Enhanced Interactive Physics-Inspired Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Physics-inspired mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Create quantum particles on mouse move
        createQuantumParticle(mouseX, mouseY);
        
        // Update orbital system based on mouse position
        updateOrbitalSystem(mouseX, mouseY);
        
        setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });

    // Create quantum particles that follow mouse
    function createQuantumParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #00ff9d, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: quantumDecay 2s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }

    // Add quantum decay animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes quantumDecay {
            0% {
                opacity: 1;
                transform: scale(1) translate(0, 0);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.5) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px);
            }
            100% {
                opacity: 0;
                transform: scale(0) translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px);
            }
        }
    `;
    document.head.appendChild(style);

    // Update orbital system based on mouse position
    function updateOrbitalSystem(x, y) {
        const orbitalSystem = document.querySelector('.orbital-system');
        if (orbitalSystem) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            orbitalSystem.style.transform = `
                translate(${deltaX * 20}px, ${deltaY * 20}px) 
                rotate(${deltaX * 10}deg)
            `;
        }
    }

    // Interactive skill tags with physics effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const physicsType = this.getAttribute('data-physics');
            createPhysicsEffect(this, physicsType);
        });
    });

    function createPhysicsEffect(element, type) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        switch(type) {
            case 'quantum':
                createQuantumField(centerX, centerY);
                break;
            case 'wave':
                createWaveEffect(centerX, centerY);
                break;
            case 'particle':
                createParticleExplosion(centerX, centerY);
                break;
            case 'field':
                createFieldLines(centerX, centerY);
                break;
            case 'neural':
                createNeuralNetwork(centerX, centerY);
                break;
            case 'cosmic':
                createCosmicEffect(centerX, centerY);
                break;
        }
    }

    function createQuantumField(x, y) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 3px;
                height: 3px;
                background: #00ff9d;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: quantumField${i} 1s ease-out forwards;
            `;
            
            const keyframes = `
                @keyframes quantumField${i} {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { 
                        transform: translate(${Math.cos(i * Math.PI / 4) * 50}px, ${Math.sin(i * Math.PI / 4) * 50}px) scale(0); 
                        opacity: 0; 
                    }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) particle.parentNode.removeChild(particle);
                if (styleSheet.parentNode) styleSheet.parentNode.removeChild(styleSheet);
            }, 1000);
        }
    }

    function createWaveEffect(x, y) {
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: fixed;
                left: ${x - 25}px;
                top: ${y - 25}px;
                width: 50px;
                height: 50px;
                border: 2px solid rgba(0, 255, 157, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: waveExpand${i} 1.5s ease-out forwards;
            `;
            
            const keyframes = `
                @keyframes waveExpand${i} {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(${3 + i}); opacity: 0; }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            document.body.appendChild(wave);
            
            setTimeout(() => {
                if (wave.parentNode) wave.parentNode.removeChild(wave);
                if (styleSheet.parentNode) styleSheet.parentNode.removeChild(styleSheet);
            }, 1500);
            
            setTimeout(() => {
                document.body.appendChild(wave);
            }, i * 200);
        }
    }

    function createParticleExplosion(x, y) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (i * 30) * Math.PI / 180;
            const velocity = 30 + Math.random() * 20;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 2px;
                height: 2px;
                background: #0099cc;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: particleExplode${i} 0.8s ease-out forwards;
            `;
            
            const keyframes = `
                @keyframes particleExplode${i} {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { 
                        transform: translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0); 
                        opacity: 0; 
                    }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) particle.parentNode.removeChild(particle);
                if (styleSheet.parentNode) styleSheet.parentNode.removeChild(styleSheet);
            }, 800);
        }
    }

    function createFieldLines(x, y) {
        for (let i = 0; i < 6; i++) {
            const line = document.createElement('div');
            const angle = i * 60;
            
            line.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 2px;
                height: 40px;
                background: linear-gradient(to bottom, #00ff9d, transparent);
                pointer-events: none;
                z-index: 1000;
                transform-origin: top center;
                transform: rotate(${angle}deg);
                animation: fieldPulse 1s ease-out forwards;
            `;
            
            document.body.appendChild(line);
            
            setTimeout(() => {
                if (line.parentNode) line.parentNode.removeChild(line);
            }, 1000);
        }
    }

    function createNeuralNetwork(x, y) {
        const nodes = [];
        for (let i = 0; i < 5; i++) {
            const node = document.createElement('div');
            const nodeX = x + (Math.random() - 0.5) * 100;
            const nodeY = y + (Math.random() - 0.5) * 100;
            
            node.style.cssText = `
                position: fixed;
                left: ${nodeX}px;
                top: ${nodeY}px;
                width: 6px;
                height: 6px;
                background: #00ff9d;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: neuralPulse 1.5s ease-out forwards;
            `;
            
            nodes.push({element: node, x: nodeX, y: nodeY});
            document.body.appendChild(node);
        }
        
        // Create connections between nodes
        for (let i = 0; i < nodes.length - 1; i++) {
            const connection = document.createElement('div');
            const dx = nodes[i + 1].x - nodes[i].x;
            const dy = nodes[i + 1].y - nodes[i].y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            connection.style.cssText = `
                position: fixed;
                left: ${nodes[i].x}px;
                top: ${nodes[i].y}px;
                width: ${length}px;
                height: 1px;
                background: rgba(0, 255, 157, 0.5);
                pointer-events: none;
                z-index: 999;
                transform-origin: left center;
                transform: rotate(${angle}deg);
                animation: connectionPulse 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(connection);
            
            setTimeout(() => {
                if (connection.parentNode) connection.parentNode.removeChild(connection);
            }, 1500);
        }
        
        setTimeout(() => {
            nodes.forEach(node => {
                if (node.element.parentNode) node.element.parentNode.removeChild(node.element);
            });
        }, 1500);
    }

    function createCosmicEffect(x, y) {
        // Create expanding cosmic ring
        const cosmicRing = document.createElement('div');
        cosmicRing.style.cssText = `
            position: fixed;
            left: ${x - 30}px;
            top: ${y - 30}px;
            width: 60px;
            height: 60px;
            border: 2px solid rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: cosmicExpand 2s ease-out forwards;
        `;
        
        // Create stars around the ring
        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            const angle = i * 45;
            const distance = 40;
            
            star.style.cssText = `
                position: fixed;
                left: ${x + Math.cos(angle * Math.PI / 180) * distance}px;
                top: ${y + Math.sin(angle * Math.PI / 180) * distance}px;
                width: 3px;
                height: 3px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: starBurst 2s ease-out forwards;
            `;
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) star.parentNode.removeChild(star);
            }, 2000);
        }
        
        document.body.appendChild(cosmicRing);
        
        setTimeout(() => {
            if (cosmicRing.parentNode) cosmicRing.parentNode.removeChild(cosmicRing);
        }, 2000);
    }

    // Add additional CSS animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes fieldPulse {
            0% { opacity: 1; transform: scaleY(0); }
            50% { opacity: 1; transform: scaleY(1); }
            100% { opacity: 0; transform: scaleY(1); }
        }
        
        @keyframes neuralPulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0; transform: scale(0.5); }
        }
        
        @keyframes connectionPulse {
            0% { opacity: 0; transform: scaleX(0); }
            50% { opacity: 1; transform: scaleX(1); }
            100% { opacity: 0; transform: scaleX(1); }
        }
        
        @keyframes cosmicExpand {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(5); }
        }
        
        @keyframes starBurst {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 1; transform: scale(2); }
            100% { opacity: 0; transform: scale(0); }
        }
    `;
    document.head.appendChild(additionalStyles);

    // Parallax effect for physics elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.physics-container');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Interactive project cards with physics
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Remove duplicate typing effect - already handled in the earlier typeWriter function

    // Add intersection observer for animations
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

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Make the hero section visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
}); 