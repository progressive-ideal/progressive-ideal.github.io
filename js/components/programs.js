/**
 * Programs Component
 * Dynamically loads and renders programs from data/programs.json
 */

const ProgramsComponent = (function() {
    'use strict';
    
    let programsCache = null;
    
    // Icon SVGs
    const icons = {
        education: '<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>',
        healthcare: '<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
        nutrition: '<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H15m0 0a1 1 0 011 1v1a1 1 0 01-1 1H9.414a1 1 0 01-.707-.293L7 16m8-3h4M3 21h18"></path></svg>',
        recreation: '<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    };
    
    /**
     * Helper to get URL with base path
     */
    function url(path) {
        return window.SiteConfig ? window.SiteConfig.url(path) : path;
    }
    
    /**
     * Fetch programs data from JSON
     */
    async function fetchPrograms() {
        if (programsCache) return programsCache;
        
        const paths = ['/data/programs.json', 'data/programs.json'];
        
        for (const jsonPath of paths) {
            const fullPath = url(jsonPath);
            try {
                const response = await fetch(fullPath);
                if (!response.ok) continue;
                const programs = await response.json();
                programsCache = programs;
                return programs;
            } catch (error) {
                continue;
            }
        }
        
        console.error('Error loading programs: all paths failed');
        return null;
    }
    
    /**
     * Render a single program card
     */
    function renderProgramCard(program, index) {
        const icon = icons[program.icon] || icons.education;
        const linkUrl = window.SiteConfig ? window.SiteConfig.navUrl(program.link) : program.link;
        
        return `
        <div class="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl" data-animate="fade-in-up" data-delay="${(index + 1) * 100}">
            <div class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                ${icon}
            </div>
            <h3 class="text-xl font-semibold text-gray-900">${program.title}</h3>
            <p class="mt-3 text-gray-600">${program.description}</p>
            <a href="${linkUrl}" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700">
                Learn More
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </a>
        </div>`;
    }
    
    /**
     * Render loading skeleton
     */
    function renderSkeleton() {
        let html = '';
        for (let i = 0; i < 4; i++) {
            html += `
            <div class="rounded-2xl bg-white p-8 shadow-lg">
                <div class="h-14 w-14 bg-gray-200 rounded-xl animate-pulse"></div>
                <div class="mt-5 h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div class="mt-3 h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                <div class="mt-2 h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
            </div>`;
        }
        return html;
    }
    
    /**
     * Initialize programs section
     */
    async function initPrograms() {
        const container = document.getElementById('programs-container');
        if (!container) return;
        
        // Show loading skeleton
        container.innerHTML = renderSkeleton();
        
        const programs = await fetchPrograms();
        
        if (!programs) {
            container.innerHTML = '<div class="py-8 text-center text-gray-500">Unable to load programs. Please try again later.</div>';
            return;
        }
        
        // Render program cards
        const html = programs.map((program, index) => renderProgramCard(program, index)).join('');
        container.innerHTML = html;
        
        // Re-initialize scroll animations
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
    }
    
    // Public API
    return {
        initPrograms,
        fetchPrograms
    };
})();

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    ProgramsComponent.initPrograms();
});