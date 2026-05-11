/**
 * Progressive Ideal Trust Orphanage - Main JavaScript
 * Handles all interactive functionality
 */

/**
 * Handle scrolling to hash target after dynamic content loads
 * Uses timeout to wait for dynamic components to render
 */
function handleHashScroll() {
    const hash = window.location.hash;
    if (!hash || hash === '#') return;
    
    const targetId = hash.substring(1);
    
    // Wait for dynamic content to load
    setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, 800);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    // Note: back-to-top and scroll-progress are now handled by their own component scripts
    initScrollAnimations();
    initCounterAnimations();
    initProgressBars();
    initCarousel();
    initFAQ();
    initMobileMenu();
    initHeaderScroll();
    initNewsletterForm();
    initSmoothScroll();
    initTextRotator();
    
    // Handle hash scroll after dynamic content loads
    handleHashScroll();
});

/**
 * Scroll Animations - Fade in up effect when elements enter viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate="fade-in-up"]');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Counter Animation - Animate numbers from 0 to target
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const isPrice = element.textContent.includes('$');
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        if (isPrice) {
            element.textContent = '$' + current.toLocaleString();
        } else {
            element.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            if (isPrice) {
                element.textContent = '$' + target.toLocaleString();
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Progress Bars - Animate width on scroll
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('[data-progress]');
    
    if (!progressBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

/**
 * Carousel - Testimonials slider
 */
function initCarousel() {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;
    
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = carousel.querySelectorAll('[data-carousel-slide]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.className = `h-2.5 rounded-full transition-all ${index === 0 ? 'w-8 bg-primary-600' : 'w-2.5 bg-gray-300'}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.className = 'h-2.5 w-8 rounded-full bg-primary-600 transition-all';
            } else {
                dot.className = 'h-2.5 w-2.5 rounded-full bg-gray-300 transition-all';
            }
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
        resetAutoPlay();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Start autoplay
    startAutoPlay();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', startAutoPlay);
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqToggles = document.querySelectorAll('[data-faq-toggle]');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQs
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                    otherToggle.nextElementSibling.style.maxHeight = '0';
                    otherToggle.nextElementSibling.style.opacity = '0';
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                this.classList.remove('active');
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            } else {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            }
        });
    });
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const toggleBtn = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (!toggleBtn || !mobileMenu) return;
    
    toggleBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('open');
        
        if (isOpen) {
            mobileMenu.classList.remove('open');
            mobileMenu.classList.add('hidden');
            this.setAttribute('aria-expanded', 'false');
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Close menu when clicking on a link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenu.classList.add('hidden');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            mobileMenu.classList.add('hidden');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Header Shadow on Scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
    const form = document.querySelector('[data-newsletter-form]');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        console.log('Newsletter signup:', email);
        
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            this.reset();
        }, 2000);
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Utility: Debounce function
 */
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

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Text Rotator - Rotates through text items with animation
 */
function initTextRotator() {
    const rotator = document.querySelector('.text-rotator');
    if (!rotator) return;
    
    const items = rotator.querySelectorAll('.text-rotator-item');
    if (items.length <= 1) return;
    
    let currentIndex = 0;
    const interval = 3500; // 3.5 seconds
    
    // Ensure only the first item is active initially
    items.forEach((item, index) => {
        if (index === 0) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
            item.classList.remove('exit');
        }
    });
    
    function rotateText() {
        // Get current and next items
        const currentItem = items[currentIndex];
        const nextIndex = (currentIndex + 1) % items.length;
        const nextItem = items[nextIndex];
        
        // Add exit class to current item and remove active
        currentItem.classList.remove('active');
        currentItem.classList.add('exit');
        
        // After transition, prepare next item
        setTimeout(() => {
            currentItem.classList.remove('exit');
            nextItem.classList.add('active');
            currentIndex = nextIndex;
        }, 500); // Match the CSS transition duration
    }
    
    // Start the rotation after initial delay
    setTimeout(() => {
        setInterval(rotateText, interval);
    }, interval);
}
