/**
 * CTA Donate/Support Component
 * Reusable call-to-action section for donation/support
 * 
 * Usage: Add data-cta-donate attribute with optional config:
 * <div data-cta-donate='{"title":"Custom Title","description":"Custom description","buttonText":"Donate Now","buttonUrl":"/#donate"}'></div>
 */

(function() {
    'use strict';
    
    // Default configuration
    const defaultConfig = {
        title: 'Every Dollar Makes a Difference',
        description: 'Your generosity directly supports children in need, providing them with food, shelter, education, and hope for a brighter future.',
        buttonText: 'Donate Now',
        buttonUrl: '/#donate',
        sectionId: '',
        showImpactExamples: true,
        showTrustBadges: true
    };
    
    // Impact examples
    const impactExamples = [
        { amount: '$25', description: 'School supplies for a child' },
        { amount: '$50', description: 'Monthly food for a child' },
        { amount: '$100', description: 'Healthcare for a month' }
    ];
    
    // Trust badges
    const trustBadges = [
        { icon: 'shield', text: '100% Tax Deductible' },
        { icon: 'star', text: 'Verified Organization' }
    ];
    
    /**
     * Get SVG icon by name
     */
    function getIcon(name) {
        const icons = {
            shield: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
            star: '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>',
            heart: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>'
        };
        return icons[name] || '';
    }
    
    /**
     * Generate CTA section HTML
     */
    function generateCTAHTML(config) {
        const cfg = { ...defaultConfig, ...config };
        
        let impactExamplesHTML = '';
        if (cfg.showImpactExamples) {
            impactExamplesHTML = `
                    <div class="mt-8 flex flex-wrap items-center justify-center gap-6" data-animate="fade-in-up" data-delay="150">
                        ${impactExamples.map(item => `
                        <div class="flex items-center gap-2 text-sm text-primary-100">
                            <span class="font-bold text-white">${item.amount}</span>
                            <span>=</span>
                            <span>${item.description}</span>
                        </div>
                        `).join('')}
                    </div>`;
        }
        
        let trustBadgesHTML = '';
        if (cfg.showTrustBadges) {
            trustBadgesHTML = `
                    <div class="mt-10 flex flex-wrap items-center justify-center gap-8" data-animate="fade-in-up" data-delay="300">
                        ${trustBadges.map(item => `
                        <div class="flex items-center gap-2 text-sm text-primary-200">
                            ${getIcon(item.icon)}
                            <span>${item.text}</span>
                        </div>
                        `).join('')}
                    </div>`;
        }
        
        return `
    <!-- CTA Section -->
    <section ${cfg.sectionId ? `id="${cfg.sectionId}"` : ''} class="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 py-20 lg:py-28">
        <div class="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-3xl"></div>
        </div>
        
        <div class="container relative z-10 mx-auto px-4 lg:px-8">
            <div class="mx-auto max-w-3xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl" data-animate="fade-in-up">
                    ${cfg.title}
                </h2>
                <p class="mx-auto mt-6 max-w-xl text-lg text-primary-100" data-animate="fade-in-up" data-delay="100">
                    ${cfg.description}
                </p>
                ${impactExamplesHTML}
                <div class="mt-10" data-animate="fade-in-up" data-delay="200">
                    <a href="${cfg.buttonUrl}" class="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/40">
                        ${cfg.buttonText}
                        ${getIcon('heart')}
                    </a>
                </div>
                ${trustBadgesHTML}
            </div>
        </div>
    </section>`;
    }
    
    /**
     * Render CTA sections
     */
    function renderCTADonate() {
        const placeholders = document.querySelectorAll('[data-cta-donate]');
        
        placeholders.forEach(placeholder => {
            let config = {};
            
            // Parse config from data attribute
            try {
                const dataConfig = placeholder.getAttribute('data-cta-donate');
                if (dataConfig) {
                    config = JSON.parse(dataConfig);
                }
            } catch (e) {
                console.warn('Invalid CTA config:', e);
            }
            
            placeholder.outerHTML = generateCTAHTML(config);
        });
    }
    
    // Expose render function globally
    window.renderCTADonate = renderCTADonate;
    
    // Auto-render when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderCTADonate);
    } else {
        renderCTADonate();
    }
})();