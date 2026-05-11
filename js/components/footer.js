/**
 * Footer Component
 * Reusable footer for all pages - uses data from JSON files
 */

(function() {
    'use strict';
    
    // Social media icons
    const socialIcons = {
        facebook: '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>',
        youtube: '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>',
        instagram: '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>'
    };
    
    // Default data (fallback)
    const defaultContact = {
        organization: "Progressive Ideal Trust",
        address: { street: "123 Charity Lane", city: "City", country: "Country", postalCode: "12345" },
        phone: "+1 (555) 123-4567",
        email: "info@progressiveidealtrust.org"
    };
    
    const defaultSocialLinks = [
        { platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
        { platform: "YouTube", url: "https://youtube.com", icon: "youtube" },
        { platform: "Instagram", url: "https://instagram.com", icon: "instagram" }
    ];
    
    /**
     * Fetch JSON data with fallback
     */
    async function fetchJSON(paths, fallback) {
        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (!response.ok) continue;
                return await response.json();
            } catch (error) {
                continue;
            }
        }
        return fallback;
    }
    
    /**
     * Render social links HTML
     */
    function renderSocialLinks(links) {
        return links.map(link => {
            const icon = socialIcons[link.icon] || socialIcons.facebook;
            return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="rounded-lg bg-gray-800 p-2.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white" aria-label="${link.platform}">
                ${icon}
            </a>`;
        }).join('');
    }
    
    /**
     * Render the footer component
     */
    async function renderFooter() {
        // Fetch data
        const contact = await fetchJSON(['/data/contact.json', 'data/contact.json'], defaultContact);
        const socialLinks = await fetchJSON(['/data/social-links.json', 'data/social-links.json'], defaultSocialLinks);
        
        const footerHTML = `
    <!-- Footer -->
    <footer class="bg-gray-900 pt-16 text-gray-300 lg:pt-24">
        <div class="container mx-auto px-4 lg:px-8">
            <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
                <!-- Brand Column -->
                <div class="lg:col-span-4">
                    <a href="/" class="inline-block">
                        <div class="flex items-center gap-2">
                            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-lg">
                                P
                            </div>
                            <span class="text-lg font-bold text-white">${contact.organization}</span>
                        </div>
                    </a>
                    <p class="mt-4 max-w-xs text-gray-400">
                        Providing hope, care, and a brighter future for children in need since 1999.
                    </p>
                    <div class="mt-6 flex gap-4">
                        ${renderSocialLinks(socialLinks)}
                    </div>
                </div>
                
                <!-- Link Columns -->
                <div class="grid gap-8 sm:grid-cols-3 lg:col-span-5">
                    <div>
                        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
                        <ul class="mt-4 space-y-3">
                            <li><a href="/" class="text-gray-400 transition-colors hover:text-white">Home</a></li>
                            <li><a href="/about" class="text-gray-400 transition-colors hover:text-white">About Us</a></li>
                            <li><a href="/#programs" class="text-gray-400 transition-colors hover:text-white">Programs</a></li>
                            <li><a href="/gallery" class="text-gray-400 transition-colors hover:text-white">Gallery</a></li>
                            <li><a href="/updates" class="text-gray-400 transition-colors hover:text-white">Updates</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Get Involved</h3>
                        <ul class="mt-4 space-y-3">
                            <li><a href="/#donate" class="text-gray-400 transition-colors hover:text-white">Donate</a></li>
                            <li><a href="/#get-involved" class="text-gray-400 transition-colors hover:text-white">Volunteer</a></li>
                            <li><a href="/contact" class="text-gray-400 transition-colors hover:text-white">Contact Us</a></li>
                            <li><a href="/#faq" class="text-gray-400 transition-colors hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
                        <ul class="mt-4 space-y-3">
                            <li class="text-gray-400">${contact.address.street}</li>
                            <li class="text-gray-400">${contact.address.city}, ${contact.address.country} ${contact.address.postalCode}</li>
                            <li><a href="tel:${contact.phone}" class="text-gray-400 transition-colors hover:text-white">${contact.phone}</a></li>
                            <li><a href="mailto:${contact.email}" class="text-gray-400 transition-colors hover:text-white">${contact.email}</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Newsletter -->
                <div class="lg:col-span-3">
                    <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Stay Updated</h3>
                    <p class="mt-4 text-gray-400">Get updates on our programs and the children we serve.</p>
                    <form class="mt-4" data-newsletter-form>
                        <div class="flex gap-2">
                            <input type="email" placeholder="Enter your email" required class="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                            <button type="submit" class="rounded-lg bg-primary-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary-600">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Bottom Bar -->
            <div class="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-800 py-8 sm:flex-row">
                <p class="text-sm text-gray-500">© ${new Date().getFullYear()} ${contact.organization} Orphanage. All rights reserved.</p>
                <div class="flex gap-6">
                    <a href="#" class="text-sm text-gray-500 transition-colors hover:text-gray-300">Privacy Policy</a>
                    <a href="#" class="text-sm text-gray-500 transition-colors hover:text-gray-300">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>`;
        
        // Find the footer placeholder or insert before the scripts
        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) {
            placeholder.outerHTML = footerHTML;
        } else {
            // Insert before the back-to-top button or before the first script tag
            const backToTop = document.getElementById('back-to-top');
            const firstScript = document.querySelector('script[src]');
            
            if (backToTop) {
                backToTop.insertAdjacentHTML('beforebegin', footerHTML);
            } else if (firstScript) {
                firstScript.insertAdjacentHTML('beforebegin', footerHTML);
            } else {
                // Last resort: append to body
                document.body.insertAdjacentHTML('beforeend', footerHTML);
            }
        }
    }
    
    // Expose render function globally
    window.renderFooter = renderFooter;
    
    // Auto-render if document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderFooter);
    } else {
        renderFooter();
    }
})();