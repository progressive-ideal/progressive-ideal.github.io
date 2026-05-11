/**
 * Mobile CTA Component
 * Sticky donate button for mobile devices on all pages
 */

(function() {
    'use strict';
    
    /**
     * Render the mobile CTA component
     */
    function renderMobileCTA() {
        const mobileCTAHTML = `
    <!-- Sticky Mobile CTA -->
    <div class="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-3 shadow-lg lg:hidden" id="mobile-cta">
        <a href="/#donate" class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            Donate Now
        </a>
    </div>`;
        
        // Insert at the end of body, before closing tag
        document.body.insertAdjacentHTML('beforeend', mobileCTAHTML);
    }
    
    // Expose render function globally
    window.renderMobileCTA = renderMobileCTA;
    
    // Auto-render if document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderMobileCTA);
    } else {
        renderMobileCTA();
    }
})();