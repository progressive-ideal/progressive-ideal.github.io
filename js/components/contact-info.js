/**
 * Contact Info Component
 * Renders contact information from contact.json
 * 
 * Usage: Add placeholder with id="contact-info-container"
 */

(function() {
    'use strict';
    
    // Default data (fallback)
    const defaultContact = {
        organization: "Progressive Ideal Yatimkhana",
        address: {
            street: "123 Charity Lane",
            city: "City",
            country: "Country",
            postalCode: "12345"
        },
        phone: "+1 (555) 123-4567",
        email: "info@progressiveidealyatimkhana.org",
        hours: {
            weekdays: "9:00 AM - 5:00 PM",
            friday: "Closed",
            saturday: "Closed"
        }
    };
    
    const defaultSocialLinks = [
        { platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
        { platform: "YouTube", url: "https://youtube.com", icon: "youtube" },
        { platform: "Instagram", url: "https://instagram.com", icon: "instagram" }
    ];
    
    // Social media icons
    const socialIcons = {
        facebook: '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>',
        youtube: '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>',
        instagram: '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>'
    };
    
    /**
     * Helper to get URL with base path
     */
    function url(path) {
        return window.SiteConfig ? window.SiteConfig.url(path) : path;
    }
    
    /**
     * Fetch JSON data with fallback
     */
    async function fetchJSON(paths, fallback) {
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
        return fallback;
    }
    
    /**
     * Generate contact info HTML
     */
    function generateContactInfoHTML(contact, socialLinks) {
        return `
                        <div class="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-8">
                            <!-- Row 1: Phone (right-aligned) | Address (left-aligned) -->
                            <div class="flex gap-4 sm:flex-row-reverse sm:text-right">
                                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Phone</h3>
                                    <p class="mt-1 text-gray-600"><a href="tel:${contact.phone.replace(/[^0-9+]/g, '')}" class="hover:text-primary-600">${contact.phone}</a></p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Address</h3>
                                    <p class="mt-1 text-gray-600">${contact.address.street}<br>${contact.address.city}, ${contact.address.country} ${contact.address.postalCode}</p>
                                </div>
                            </div>
                            
                            <!-- Row 2: Email (right-aligned) | Office Hours (left-aligned) -->
                            <div class="flex gap-4 sm:flex-row-reverse sm:text-right">
                                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Email</h3>
                                    <p class="mt-1 text-gray-600"><a href="mailto:${contact.email}" class="hover:text-primary-600">${contact.email}</a></p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Office Hours</h3>
                                    <p class="mt-1 text-gray-600">Sunday - Thursday: ${contact.hours.weekdays}<br>Friday: ${contact.hours.friday}<br>Saturday: ${contact.hours.saturday}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Social Links -->
                        <div class="mt-10 text-center">
                            <h3 class="font-semibold text-gray-900">Follow Us</h3>
                            <div class="mt-4 flex justify-center gap-4">
                                ${socialLinks.map(link => {
                                    const icon = socialIcons[link.icon] || socialIcons.facebook;
                                    return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.platform}" class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-primary-600 hover:text-white">
                                    ${icon}
                                </a>`;
                                }).join('')}
                            </div>
                        </div>`;
    }
    
    /**
     * Render contact info component
     */
    async function renderContactInfo() {
        const placeholder = document.getElementById('contact-info-container');
        if (!placeholder) return;
        
        // Fetch data
        const contact = await fetchJSON(['/data/contact.json', 'data/contact.json'], defaultContact);
        const socialLinks = await fetchJSON(['/data/social-links.json', 'data/social-links.json'], defaultSocialLinks);
        
        placeholder.innerHTML = generateContactInfoHTML(contact, socialLinks);
    }
    
    // Expose render function globally
    window.renderContactInfo = renderContactInfo;
    
    // Auto-render when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderContactInfo);
    } else {
        renderContactInfo();
    }
})();
