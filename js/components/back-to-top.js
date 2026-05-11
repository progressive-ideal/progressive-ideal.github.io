/**
 * Back to Top Component
 * Injects and manages the back-to-top button functionality
 */

(function() {
    'use strict';
    
    /**
     * Render the back-to-top button
     */
    function renderBackToTop() {
        const backToTopHTML = `
    <!-- Back to Top -->
    <button type="button" id="back-to-top" class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" style="opacity: 0; pointer-events: none; transform: translateY(16px);" aria-label="Back to top">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
        </svg>
    </button>`;
        
        // Insert at the end of body, before scripts
        document.body.insertAdjacentHTML('beforeend', backToTopHTML);
        
        // Initialize the button functionality
        initBackToTop();
    }
    
    /**
     * Initialize back-to-top button visibility on scroll
     */
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        // Show/hide button based on scroll position
        function toggleButton() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Listen for scroll events
        window.addEventListener('scroll', toggleButton, { passive: true });
        
        // Initial check
        toggleButton();
    }
    
    // Expose render function globally
    window.renderBackToTop = renderBackToTop;
    
    // Auto-render when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderBackToTop);
    } else {
        renderBackToTop();
    }
})();