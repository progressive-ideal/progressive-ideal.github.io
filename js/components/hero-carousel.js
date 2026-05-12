/**
 * Hero Carousel Component
 * Auto-rotating background carousel for the hero section
 */

(function() {
    'use strict';
    
    // Default data (fallback)
    const defaultData = {
        images: [
            {
                src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop",
                alt: "Children smiling and learning together"
            }
        ],
        interval: 5000
    };
    
    /**
     * Helper to get URL with base path
     */
    function url(path) {
        return window.SiteConfig ? window.SiteConfig.url(path) : path;
    }
    
    /**
     * Fetch JSON data with fallback
     */
    async function fetchJSON(paths, fallback) {
        for (const path of paths) {
            const fullPath = url(path);
            try {
                const response = await fetch(fullPath);
                if (!response.ok) continue;
                return await response.json();
            } catch (error) {
                continue;
            }
        }
        return fallback;
    }
    
    /**
     * Create carousel HTML
     */
    function createCarouselHTML(images) {
        const slidesHTML = images.map((image, index) => `
            <div class="hero-carousel-slide ${index === 0 ? 'active' : ''}" data-slide-index="${index}">
                <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover" loading="${index === 0 ? 'eager' : 'lazy'}">
            </div>
        `).join('');
        
        return `
            <div class="hero-carousel" data-hero-carousel>
                ${slidesHTML}
                <div class="hero-carousel-overlay"></div>
            </div>
        `;
    }
    
    /**
     * Initialize carousel functionality
     */
    function initCarousel(container, interval) {
        const slides = container.querySelectorAll('.hero-carousel-slide');
        
        if (slides.length <= 1) return;
        
        let currentIndex = 0;
        let autoPlayInterval;
        
        /**
         * Go to specific slide
         */
        function goToSlide(index) {
            // Remove active class from current slide
            slides[currentIndex].classList.remove('active');
            
            // Update index
            currentIndex = index;
            if (currentIndex >= slides.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = slides.length - 1;
            
            // Add active class to new slide
            slides[currentIndex].classList.add('active');
        }
        
        /**
         * Go to next slide
         */
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        /**
         * Start auto-play
         */
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, interval);
        }
        
        /**
         * Stop auto-play
         */
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }
        
        // Pause on hover (optional - for better UX)
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
        
        // Handle visibility change (pause when tab is not visible)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
        
        // Start auto-play
        startAutoPlay();
        
        // Return control functions for external use
        return {
            next: nextSlide,
            prev: () => goToSlide(currentIndex - 1),
            goTo: goToSlide,
            start: startAutoPlay,
            stop: stopAutoPlay
        };
    }
    
    /**
     * Render the hero carousel component
     */
    async function renderHeroCarousel() {
        const container = document.querySelector('[data-hero-carousel-container]');
        if (!container) return;
        
        // Fetch data
        const data = await fetchJSON(['/data/hero-carousel.json', 'data/hero-carousel.json'], defaultData);
        
        // Create and insert carousel HTML
        container.innerHTML = createCarouselHTML(data.images);
        
        // Initialize carousel functionality
        const carousel = container.querySelector('[data-hero-carousel]');
        if (carousel) {
            initCarousel(carousel, data.interval || 5000);
        }
    }
    
    // Expose render function globally
    window.renderHeroCarousel = renderHeroCarousel;
    
    // Auto-render if document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderHeroCarousel);
    } else {
        renderHeroCarousel();
    }
})();