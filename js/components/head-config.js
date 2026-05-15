/**
 * Head Configuration Component
 * Injects common head elements: Favicon, Google Fonts
 * 
 * Usage: Include this script in the <head> section
 * <script src="js/components/head-config.js"></script>
 * 
 * Note: Tailwind CSS and config should be included separately via:
 * <script src="https://cdn.tailwindcss.com"></script>
 * <script src="js/tailwind-config.js"></script>
 */

(function() {
    'use strict';
    
    /**
     * Inject common head elements
     */
    function injectHeadElements() {
        const head = document.head;
        
        // Check if already injected
        if (document.querySelector('[data-head-config-injected]')) {
            return;
        }
        
        // Create marker to prevent duplicate injections
        const marker = document.createElement('meta');
        marker.setAttribute('data-head-config-injected', 'true');
        head.appendChild(marker);
        
        // 1. Favicon
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/svg+xml';
        favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%233b82f6'/><text x='50' y='68' font-family='system-ui, sans-serif' font-size='45' font-weight='bold' text-anchor='middle' fill='white'>PIY</text></svg>";
        head.appendChild(favicon);
        
        // 2. Google Fonts - Preconnect
        const preconnect1 = document.createElement('link');
        preconnect1.rel = 'preconnect';
        preconnect1.href = 'https://fonts.googleapis.com';
        head.appendChild(preconnect1);
        
        const preconnect2 = document.createElement('link');
        preconnect2.rel = 'preconnect';
        preconnect2.href = 'https://fonts.gstatic.com';
        preconnect2.setAttribute('crossorigin', '');
        head.appendChild(preconnect2);
        
        // 3. Google Fonts - Manrope
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap';
        head.appendChild(fontLink);
    }
    
    // Execute
    injectHeadElements();
    
    // Expose function globally
    window.headConfig = {
        inject: injectHeadElements
    };
})();