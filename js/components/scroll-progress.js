/**
 * Scroll Progress Component
 * Shows a progress bar at the top of the page indicating scroll position
 */

(function() {
    'use strict';
    
    /**
     * Render the scroll progress bar
     */
    function renderScrollProgress() {
        const scrollProgressHTML = `
    <!-- Scroll Progress -->
    <div id="scroll-progress" class="fixed top-0 left-0 z-[60] h-0.5 bg-primary-600 transition-all"></div>`;
        
        // Insert at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', scrollProgressHTML);
        
        // Initialize the progress bar
        initScrollProgress();
    }
    
    /**
     * Initialize scroll progress bar width based on scroll position
     */
    function initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;
        
        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
        
        // Listen for scroll events
        window.addEventListener('scroll', updateProgress, { passive: true });
        
        // Initial update
        updateProgress();
    }
    
    // Expose render function globally
    window.renderScrollProgress = renderScrollProgress;
    
    // Auto-render when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderScrollProgress);
    } else {
        renderScrollProgress();
    }
})();