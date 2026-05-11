/**
 * FAQ Component
 * Dynamically loads and renders FAQ from data/faq.json
 */

const FAQComponent = (function() {
    'use strict';
    
    let faqCache = null;
    
    /**
     * Fetch FAQ data from JSON
     */
    async function fetchFAQ() {
        if (faqCache) return faqCache;
        
        const paths = ['/data/faq.json', 'data/faq.json'];
        
        for (const jsonPath of paths) {
            try {
                const response = await fetch(jsonPath);
                if (!response.ok) continue;
                const faq = await response.json();
                faqCache = faq;
                return faq;
            } catch (error) {
                continue;
            }
        }
        
        console.error('Error loading FAQ: all paths failed');
        return null;
    }
    
    /**
     * Render a single FAQ item
     */
    function renderFAQItem(item, index, delay) {
        return `
        <div class="py-6" data-animate="fade-in-up" data-delay="${delay}">
            <button type="button" data-faq-toggle class="flex w-full items-center justify-between text-left">
                <span class="text-lg font-semibold text-gray-900">${item.question}</span>
                <span class="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-transform duration-200" data-faq-icon>
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
                    </svg>
                </span>
            </button>
            <div class="overflow-hidden transition-all duration-300" style="max-height: 0; opacity: 0;">
                <p class="pt-4 text-gray-600">${item.answer}</p>
            </div>
        </div>`;
    }
    
    /**
     * Render loading skeleton
     */
    function renderSkeleton() {
        let html = '';
        for (let i = 0; i < 5; i++) {
            html += `
            <div class="py-6">
                <div class="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div class="mt-4 h-4 w-full bg-gray-100 rounded animate-pulse"></div>
            </div>`;
        }
        return html;
    }
    
    /**
     * Initialize FAQ section
     */
    async function initFAQ() {
        const container = document.getElementById('faq-container');
        if (!container) return;
        
        // Show loading skeleton
        container.innerHTML = renderSkeleton();
        
        const faq = await fetchFAQ();
        
        if (!faq) {
            container.innerHTML = '<div class="py-8 text-center text-gray-500">Unable to load FAQ. Please try again later.</div>';
            return;
        }
        
        // Render FAQ items
        let html = '<div class="divide-y divide-gray-200">';
        faq.forEach((item, index) => {
            html += renderFAQItem(item, index, (index + 1) * 100);
        });
        html += '</div>';
        
        container.innerHTML = html;
        
        // Re-initialize FAQ accordion functionality (call global initFAQ from main.js)
        if (typeof window.initFAQ === 'function') {
            window.initFAQ();
        }
        
        // Re-initialize scroll animations
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
    }
    
    // Public API
    return {
        initFAQ,
        fetchFAQ
    };
})();

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    FAQComponent.initFAQ();
});