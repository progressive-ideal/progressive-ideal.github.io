/**
 * Stories Component
 * Renders success stories carousel from JSON data
 * 
 * Usage: Add placeholder with id="stories-container"
 */

(function() {
    'use strict';
    
    // Icon SVGs for different role types
    const roleIcons = {
        education: '<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>',
        work: '<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
        heart: '<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
        star: '<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'
    };
    
    // Quote icon SVG
    const quoteIcon = '<svg class="h-8 w-8 text-primary-300" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z"></path></svg>';
    
    /**
     * Helper to get URL with base path
     */
    function url(path) {
        return window.SiteConfig ? window.SiteConfig.navUrl(path) : path;
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
     * Generate story slide HTML
     */
    function generateStorySlide(story, index) {
        const icon = roleIcons[story.icon] || roleIcons.heart;
        
        return `
                            <!-- Story ${index + 1} -->
                            <div class="flex-shrink-0 px-3 w-full sm:w-1/2 lg:w-1/3" data-carousel-slide>
                                <div class="rounded-2xl bg-white p-8 shadow-lg h-full">
                                    <div class="mb-6">
                                        ${quoteIcon}
                                    </div>
                                    <blockquote class="text-lg font-medium leading-relaxed text-gray-900">
                                        "${story.quote}"
                                    </blockquote>
                                    <div class="mt-6 flex items-center gap-4">
                                        <img src="${url(story.image)}" alt="${story.author}" class="h-12 w-12 rounded-full object-cover" loading="lazy">
                                        <div>
                                            <div class="font-semibold text-gray-900">${story.author}</div>
                                            <div class="flex items-center gap-1 text-sm text-gray-600">
                                                ${icon}
                                                ${story.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
    }
    
    /**
     * Generate carousel dots HTML
     */
    function generateCarouselDots(stories) {
        return stories.map((_, index) => {
            const isActive = index === 0;
            const classes = isActive 
                ? 'h-2.5 w-8 rounded-full bg-primary-600 transition-all' 
                : 'h-2.5 w-2.5 rounded-full bg-gray-300 transition-all';
            return `<button type="button" aria-label="Go to slide ${index + 1}" class="${classes}"></button>`;
        }).join('\n                        ');
    }
    
    /**
     * Generate full stories carousel HTML
     */
    function generateStoriesHTML(stories) {
        const slidesHTML = stories.map((story, index) => generateStorySlide(story, index)).join('\n');
        const dotsHTML = generateCarouselDots(stories);
        
        return `
                <div class="relative mt-16" data-carousel>
                    <div class="overflow-hidden">
                        <div class="flex transition-transform duration-300 ease-out" data-carousel-track>
                            ${slidesHTML}
                        </div>
                    </div>
                    
                    <!-- Carousel Navigation -->
                    <button type="button" data-carousel-prev class="absolute -left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-50 lg:flex" aria-label="Previous testimonial">
                        <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button type="button" data-carousel-next class="absolute -right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-50 lg:flex" aria-label="Next testimonial">
                        <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    
                    <!-- Carousel Dots -->
                    <div class="mt-8 flex justify-center gap-2" data-carousel-dots>
                        ${dotsHTML}
                    </div>
                </div>`;
    }
    
    /**
     * Render stories component
     */
    async function renderStories() {
        const placeholder = document.getElementById('stories-container');
        if (!placeholder) return;
        
        // Fetch data
        const stories = await fetchJSON(['/data/stories.json', 'data/stories.json']);
        
        if (!stories || stories.length === 0) {
            console.warn('No stories data found');
            return;
        }
        
        placeholder.innerHTML = generateStoriesHTML(stories);
        
        // Initialize carousel if main.js has the carousel function
        if (typeof window.initCarousels === 'function') {
            window.initCarousels();
        }
    }
    
    // Expose render function globally
    window.renderStories = renderStories;
    
    // Auto-render when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderStories);
    } else {
        renderStories();
    }
})();