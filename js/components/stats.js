/**
 * Stats Component
 * Renders statistics sections from JSON data
 * 
 * Usage: 
 * - Add placeholder with id="impact-stats-container" for impact stats
 * - Add placeholder with id="campaigns-container" for campaign progress bars
 */

(function() {
    'use strict';
    
    /**
     * Helper to get URL with base path
     */
    function url(path) {
        return window.SiteConfig ? window.SiteConfig.url(path) : path;
    }
    
    /**
     * Fetch JSON data with fallback
     */
    async function fetchJSON(paths) {
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
        return null;
    }
    
    /**
     * Generate stat HTML for a single stat item
     */
    function generateStatHTML(stat, index) {
        const delay = index * 100;
        const prefix = stat.prefix || '';
        const suffix = stat.suffix || '';
        
        return `
                    <div class="text-center min-w-[120px] sm:min-w-[150px]" data-animate="fade-in-up" data-delay="${delay}">
                        <div class="text-4xl font-bold text-primary-600 lg:text-5xl">
                            ${stat.animate === false ? `<span>${prefix}${stat.value}${suffix}</span>` : `<span data-counter="${stat.value}" data-prefix="${prefix}" data-suffix="${suffix}">${prefix}0${suffix}</span>`}
                        </div>
                        <div class="mt-2 text-sm font-medium text-gray-600">${stat.label}</div>
                    </div>`;
    }
    
    /**
     * Generate campaign progress bars HTML
     */
    function generateCampaignsHTML(campaigns) {
        return campaigns.map(campaign => {
            return `
                    <div>
                        <div class="mb-2 flex items-center justify-between">
                            <span class="font-medium text-gray-900">${campaign.name}</span>
                            <span class="text-sm text-gray-600">${campaign.progress}% of ${campaign.goal}</span>
                        </div>
                        <div class="h-3 overflow-hidden rounded-full bg-gray-200">
                            <div class="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600" data-progress="${campaign.progress}" style="width: 0%"></div>
                        </div>
                    </div>`;
        }).join('\n                    ');
    }
    
    /**
     * Render impact stats section
     */
    function renderImpactStats(stats) {
        const placeholder = document.getElementById('impact-stats-container');
        if (!placeholder || !stats) return;
        
        const statsHTML = stats.map((stat, index) => generateStatHTML(stat, index)).join('\n');
        
        placeholder.innerHTML = `<div class="mt-16 flex flex-wrap justify-center gap-8">
                    ${statsHTML}
                </div>`;
    }
    
    /**
     * Render campaigns section
     */
    function renderCampaigns(campaigns) {
        const placeholder = document.getElementById('campaigns-container');
        if (!placeholder || !campaigns || !campaigns.length) return;
        
        placeholder.innerHTML = `<h3 class="text-center text-xl font-semibold text-gray-900">Active Campaigns</h3>
                    
                    ${generateCampaignsHTML(campaigns)}`;
    }
    
    /**
     * Initialize counter animations for dynamically added counters
     */
    function initDynamicCounters() {
        const counters = document.querySelectorAll('#impact-stats-container [data-counter]');
        
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
    
    /**
     * Animate a counter element
     */
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = prefix + current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target.toLocaleString() + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    /**
     * Initialize progress bar animations
     */
    function initDynamicProgressBars() {
        const progressBars = document.querySelectorAll('#campaigns-container [data-progress]');
        
        if (!progressBars.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.getAttribute('data-progress');
                    setTimeout(() => {
                        entry.target.style.width = targetWidth + '%';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    /**
     * Initialize stats component
     */
    async function renderStats() {
        const data = await fetchJSON(['/data/stats.json', 'data/stats.json']);
        
        if (!data) {
            console.warn('No stats data found');
            return;
        }
        
        // Render each section
        renderImpactStats(data.stats);
        renderCampaigns(data.campaigns);
        
        // Initialize animations for the dynamically added elements
        initDynamicCounters();
        initDynamicProgressBars();
        
        // Also try to use main.js functions if available (for scroll animations)
        if (typeof window.initScrollAnimations === 'function') {
            window.initScrollAnimations();
        }
    }
    
    // Expose render function globally
    window.renderStats = renderStats;
    
    // Auto-render when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderStats);
    } else {
        renderStats();
    }
})();