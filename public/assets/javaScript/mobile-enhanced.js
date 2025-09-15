// Enhanced Mobile Responsive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Add mobile menu functionality
    function createMobileMenu() {
        const header = document.querySelector('header');
        if (!header) return;
        
        const headerNav = header.querySelector('ul');
        if (!headerNav) return;
        
        // Create mobile menu toggle button
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.setAttribute('aria-label', 'Open mobile menu');
        
        // Create mobile menu overlay
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-menu-close';
        closeBtn.innerHTML = '✕';
        closeBtn.setAttribute('aria-label', 'Close mobile menu');
        
        // Clone navigation items
        const navItems = headerNav.cloneNode(true);
        navItems.className = 'mobile-nav-items';
        
        mobileMenu.appendChild(closeBtn);
        mobileMenu.appendChild(navItems);
        document.body.appendChild(mobileMenu);
        
        // Add toggle button to header
        header.appendChild(mobileToggle);
        
        // Add desktop class to original nav
        headerNav.classList.add('desktop-menu');
        
        // Event listeners
        mobileToggle.addEventListener('click', function() {
            mobileMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Initialize mobile menu
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth > 768) {
            if (mobileMenu) {
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Enhanced form validation with better UX
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input');
            
            inputs.forEach(input => {
                // Add enhanced focus states
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                    
                    // Add loading state during validation
                    if (this.value) {
                        this.classList.add('loading');
                        setTimeout(() => {
                            this.classList.remove('loading');
                        }, 500);
                    }
                });
                
                // Real-time validation feedback
                input.addEventListener('input', function() {
                    clearTimeout(this.validationTimeout);
                    this.validationTimeout = setTimeout(() => {
                        validateField(this);
                    }, 300);
                });
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        
        // Remove existing validation classes
        field.classList.remove('valid', 'invalid');
        
        if (!value) return;
        
        let isValid = true;
        
        if (name === 'feild1' || type === 'email') {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            isValid = emailRegex.test(value);
        }
        
        if (type === 'password' || name.includes('pass')) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            isValid = passwordRegex.test(value);
        }
        
        field.classList.add(isValid ? 'valid' : 'invalid');
    }
    
    // Initialize enhanced validation
    enhanceFormValidation();
    
    // Smooth scroll for anchor links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    initSmoothScroll();
    
    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate
        const animateElements = document.querySelectorAll('.container-section, .step, .rideWay, .driverCard');
        animateElements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    }
    
    if ('IntersectionObserver' in window) {
        initScrollAnimations();
    }
    
    // Performance optimization: Lazy load images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    if ('IntersectionObserver' in window) {
        initLazyLoading();
    }
    
    // Add PWA-like functionality
    function initPWAFeatures() {
        // Add to homescreen prompt
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', function(e) {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button
            const installBtn = document.createElement('button');
            installBtn.textContent = 'تثبيت التطبيق';
            installBtn.className = 'install-btn';
            installBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--main-color);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 20px rgba(244, 57, 1, 0.3);
                font-family: DynaPuff;
            `;
            
            installBtn.addEventListener('click', function() {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(function(choiceResult) {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                    installBtn.remove();
                });
            });
            
            document.body.appendChild(installBtn);
        });
    }
    
    initPWAFeatures();
});
