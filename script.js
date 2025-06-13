// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.project-card, .achievement-card, .skill-category, .timeline-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// EmailJS Configuration
(function() {
    emailjs.init("e7v3PSgckEowQy4W5"); // Your EmailJS public key
})();

// Contact form handling with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic form validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            time: new Date().toLocaleString(),
            to_email: 'roshaanahmed290@gmail.com'
        };
        
        emailjs.send('service_h114ab9', 'template_343afft', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Typing animation for hero title
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

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        document.querySelector('.scroll-progress-bar').style.width = scrollProgress + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Enhanced particle animation for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    // Create floating particles
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
    
    // Create geometric shapes
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'geometric-shape';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 10 + 's';
        shape.style.animationDuration = (Math.random() * 8 + 4) + 's';
        
        // Random shape types
        const shapeTypes = ['circle', 'square', 'triangle'];
        const randomShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.classList.add(randomShape);
        
        particlesContainer.appendChild(shape);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Create additional floating orbs for enhanced sections
function createFloatingOrbs() {
    const sections = ['experience', 'projects', 'skills', 'achievements', 'contact'];
    
    sections.forEach(sectionClass => {
        const section = document.querySelector(`.${sectionClass}`);
        if (section) {
            // Create floating orb element
            const orb = document.createElement('div');
            orb.className = 'floating-orb-extra';
            orb.style.cssText = `
                position: absolute;
                bottom: -30%;
                right: -10%;
                width: 300px;
                height: 300px;
                background: radial-gradient(circle, rgba(203, 213, 225, 0.08) 0%, transparent 70%);
                border-radius: 50%;
                animation: float 8s ease-in-out infinite;
                z-index: 0;
                pointer-events: none;
            `;
            section.appendChild(orb);
        }
    });
}

// Initialize floating orbs
document.addEventListener('DOMContentLoaded', createFloatingOrbs);

// Add CSS for animations and notifications
const additionalCSS = `
    .animate {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ffffff;
        border: 1px solid #2d3748;
        border-radius: 8px;
        padding: 1rem;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification.success {
        border-color: #38a169;
    }
    
    .notification.error {
        border-color: #e53e3e;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: #1a202c;
    }
    
    .notification.success i {
        color: #38a169;
    }
    
    .notification.error i {
        color: #e53e3e;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(45, 55, 72, 0.1);
        z-index: 9999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: #2d3748;
        width: 0%;
        transition: width 0.1s ease;
    }
    
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }
    
    .particle {
        position: absolute;
        background: radial-gradient(circle, #f1f5f9, #cbd5e1);
        border-radius: 50%;
        opacity: 0.6;
        animation: particleFloat linear infinite;
        box-shadow: 0 0 6px rgba(241, 245, 249, 0.3);
    }
    
    .geometric-shape {
        position: absolute;
        opacity: 0.1;
        animation: geometricFloat ease-in-out infinite;
    }
    
    .geometric-shape.circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(45deg, #f1f5f9, #cbd5e1);
    }
    
    .geometric-shape.square {
        width: 15px;
        height: 15px;
        background: linear-gradient(45deg, #cbd5e1, #94a3b8);
        transform: rotate(45deg);
    }
    
    .geometric-shape.triangle {
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 14px solid #94a3b8;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes geometricFloat {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
        }
        50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.3;
        }
    }
    
    .nav-link.active {
        color: #64ffda;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Smooth reveal animations for skill items
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('skill-animate');
    });
});

// Add more CSS for skill animations
const skillAnimationCSS = `
    .skill-animate {
        opacity: 0;
        transform: scale(0.8);
        animation: skillPop 0.6s ease-out forwards;
    }
    
    @keyframes skillPop {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

style.textContent += skillAnimationCSS; 