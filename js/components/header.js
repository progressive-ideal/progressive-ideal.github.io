/**
 * Header Component
 * Reusable header with navigation for all pages
 */

(function() {
    'use strict';
    
    /**
     * Get the current page path for active navigation state
     */
    function getCurrentPage() {
        const path = window.location.pathname;
        const basePath = window.SiteConfig ? window.SiteConfig.basePath : '';
        
        // Remove base path from the current path for comparison
        let relativePath = path;
        if (basePath && path.startsWith(basePath)) {
            relativePath = path.substring(basePath.length) || '/';
        }
        
        // Handle both /about and /about.html formats
        if (relativePath === '/' || relativePath === '/index.html') return 'home';
        if (relativePath.startsWith('/about')) return 'about';
        if (relativePath.startsWith('/programs')) return 'programs';
        if (relativePath.startsWith('/contact')) return 'contact';
        if (relativePath.startsWith('/gallery')) return 'gallery';
        if (relativePath.startsWith('/updates')) return 'updates';
        return '';
    }
    
    /**
     * Mark the current page, treating clean URLs and HTML filenames equally.
     * Section links and parent listings on article pages are not current pages.
     */
    function currentPageAttribute(href) {
        if (href.includes('#')) return '';
        const normalize = path => path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
        return normalize(window.location.pathname) === normalize(href) ? ' aria-current="page"' : '';
    }

    /**
     * Generate navigation link with active state
     */
    function navLink(href, text, currentPage, pageName) {
        const isActive = currentPage === pageName;
        const activeClass = isActive ? 'text-gray-900' : 'text-gray-600';
        const hoverClass = isActive ? 'hover:text-primary-600' : 'hover:text-gray-900';
        const fullHref = window.SiteConfig ? window.SiteConfig.navUrl(href) : href;
        return `<a href="${fullHref}"${currentPageAttribute(fullHref)} class="text-sm font-medium ${activeClass} transition-colors ${hoverClass}">${text}</a>`;
    }
    
    /**
     * Generate mobile navigation link with active state
     */
    function mobileNavLink(href, text, currentPage, pageName) {
        const isActive = currentPage === pageName;
        const activeClass = isActive ? 'text-gray-900' : 'text-gray-600';
        const fullHref = window.SiteConfig ? window.SiteConfig.navUrl(href) : href;
        return `<a href="${fullHref}"${currentPageAttribute(fullHref)} class="block py-3 text-base font-medium ${activeClass}">${text}</a>`;
    }
    
    /**
     * Render the header component
     */
    function renderHeader() {
        const currentPage = getCurrentPage();
        const logoUrl = window.SiteConfig ? window.SiteConfig.url('/assets/logo.png') : '/assets/logo.png';
        const homeUrl = window.SiteConfig ? window.SiteConfig.url('/') : '/';
        const donateUrl = window.SiteConfig ? window.SiteConfig.url('/donate') : '/donate';
        
        const headerHTML = `
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all" data-header>
        <div class="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20 lg:px-8">
            <!-- Logo -->
            <a href="${homeUrl}" class="flex items-center gap-2" aria-label="Progressive Ideal Yatimkhana home">
                <img src="${logoUrl}" alt="Progressive Ideal Yatimkhana logo" style="height:2.5em;"/>
                <span class="hidden sm:block text-lg font-bold text-gray-900">
                    Progressive Ideal Yatimkhana
                </span>
            </a>
            
            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex lg:items-center lg:gap-8" aria-label="Main navigation">
                ${navLink('/', 'Home', currentPage, 'home')}
                ${navLink('/about', 'About', currentPage, 'about')}
                ${navLink('/programs', 'Programs', currentPage, 'programs')}
                ${navLink('/#impact', 'Impact', currentPage, 'impact')}
                ${navLink('/gallery', 'Gallery', currentPage, 'gallery')}
                ${navLink('/updates', 'Updates', currentPage, 'updates')}
                ${navLink('/contact', 'Contact', currentPage, 'contact')}
            </nav>
            
            <!-- Actions -->
            <div class="flex items-center gap-4">
                <a href="${donateUrl}" class="hidden rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 sm:inline-flex shadow-lg shadow-primary-500/25">
                    Donate Now
                </a>
                
                <!-- Mobile Menu Button -->
                <button type="button" data-mobile-toggle class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden" aria-label="Open menu" aria-expanded="false">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="hidden lg:hidden" data-mobile-menu>
            <nav class="border-t border-gray-200 bg-white px-4 py-4" aria-label="Main navigation">
                ${mobileNavLink('/', 'Home', currentPage, 'home')}
                ${mobileNavLink('/about', 'About', currentPage, 'about')}
                ${mobileNavLink('/programs', 'Programs', currentPage, 'programs')}
                ${mobileNavLink('/#impact', 'Impact', currentPage, 'impact')}
                ${mobileNavLink('/gallery', 'Gallery', currentPage, 'gallery')}
                ${mobileNavLink('/updates', 'Updates', currentPage, 'updates')}
                ${mobileNavLink('/contact', 'Contact', currentPage, 'contact')}
                <div class="mt-4 border-t border-gray-200 pt-4">
                    <a href="${donateUrl}" class="block w-full rounded-full bg-primary-500 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-600">
                        Donate Now
                    </a>
                </div>
            </nav>
        </div>
    </header>`;
        
        // Find the header placeholder or insert at beginning of body
        const placeholder = document.getElementById('header-placeholder');
        if (placeholder) {
            placeholder.outerHTML = headerHTML;
        } else {
            // Insert after skip-to-content link if exists, otherwise at start of body
            const skipLink = document.querySelector('a[href="#main-content"]');
            if (skipLink) {
                skipLink.insertAdjacentHTML('afterend', headerHTML);
            } else {
                document.body.insertAdjacentHTML('afterbegin', headerHTML);
            }
        }
    }
    
    // Expose render function globally
    window.renderHeader = renderHeader;
    
    // Auto-render if document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderHeader);
    } else {
        renderHeader();
    }
})();
