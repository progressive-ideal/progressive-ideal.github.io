/**
 * Site Configuration
 * 
 * BASE PATH CONFIGURATION:
 * - Set basePath to '' (empty string) for root deployment: https://example.com/
 * - Set basePath to '/yourpath' for subpath deployment: https://example.com/yourpath/
 * 
 * Examples:
 *   basePath: ''           → https://example.com/
 *   basePath: '/orphanage' → https://example.com/orphanage/
 *   basePath: '/myapp'     → https://example.com/myapp/
 * 
 * Note: Do NOT add a trailing slash to the basePath.
 */

const SiteConfig = {
    // Change this value when deploying to a subpath
    basePath: '',
    
    /**
     * Get full URL with base path prepended
     * @param {string} path - The path to prepend base path to (should start with /)
     * @returns {string} The full path with base path
     * 
     * @example
     * // With basePath: '/myapp'
     * SiteConfig.url('/about')     // Returns '/myapp/about'
     * SiteConfig.url('/data/x.json') // Returns '/myapp/data/x.json'
     * 
     * // With basePath: ''
     * SiteConfig.url('/about')     // Returns '/about'
     */
    url: function(path) {
        // Ensure path starts with /
        if (path && !path.startsWith('/')) {
            path = '/' + path;
        }
        return this.basePath + path;
    },
    
    /**
     * Check if a path is an external URL
     * @param {string} path - The path to check
     * @returns {boolean} True if external URL
     */
    isExternal: function(path) {
        return path && (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//'));
    },
    
    /**
     * Get URL for navigation, handling external links
     * @param {string} path - The path or URL
     * @returns {string} The appropriate URL
     */
    navUrl: function(path) {
        if (this.isExternal(path) || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
            return path;
        }
        return this.url(path);
    }
};

// Make it globally available
window.SiteConfig = SiteConfig;