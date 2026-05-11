/**
 * Gallery Component
 * Dynamically loads and renders gallery images from data/gallery.json
 */

const GalleryComponent = (function() {
    'use strict';
    
    let galleryCache = null;
    
    /**
     * Fetch gallery data from JSON
     */
    async function fetchGallery() {
        if (galleryCache) return galleryCache;
        
        const paths = ['/data/gallery.json', 'data/gallery.json'];
        
        for (const jsonPath of paths) {
            try {
                const response = await fetch(jsonPath);
                if (!response.ok) continue;
                const gallery = await response.json();
                galleryCache = gallery;
                return gallery;
            } catch (error) {
                continue;
            }
        }
        
        console.error('Error loading gallery: all paths failed');
        return null;
    }
    
    /**
     * Render a single gallery item
     */
    function renderGalleryItem(item, index) {
        return `
        <div class="gallery-item group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg" data-category="${item.category}" data-src="${item.fullSize}" data-sub-html="<h4 class='text-lg font-semibold'>${item.title}</h4><p class='text-sm opacity-80'>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>" data-description="${item.description}" data-animate="fade-in-up" data-delay="${(index % 3) * 100}">
            <img src="${item.thumbnail}" alt="${item.title}" class="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div class="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <h3 class="text-lg font-semibold text-white">${item.title}</h3>
                <p class="text-sm text-gray-300">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
            </div>
        </div>`;
    }
    
    /**
     * Render loading skeleton
     */
    function renderSkeleton() {
        let html = '';
        for (let i = 0; i < 9; i++) {
            html += `
            <div class="rounded-2xl shadow-lg overflow-hidden">
                <div class="h-64 bg-gray-200 animate-pulse"></div>
            </div>`;
        }
        return html;
    }
    
    /**
     * Initialize gallery section
     */
    async function initGallery() {
        const container = document.getElementById('gallery-container');
        if (!container) return;
        
        // Show loading skeleton
        container.innerHTML = renderSkeleton();
        
        const gallery = await fetchGallery();
        
        if (!gallery) {
            container.innerHTML = '<div class="py-8 text-center text-gray-500">Unable to load gallery. Please try again later.</div>';
            return;
        }
        
        // Render gallery items
        const html = gallery.map((item, index) => renderGalleryItem(item, index)).join('');
        container.innerHTML = html;
        
        // Re-initialize scroll animations
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
    }
    
    // Public API
    return {
        initGallery,
        fetchGallery
    };
})();

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    GalleryComponent.initGallery();
});