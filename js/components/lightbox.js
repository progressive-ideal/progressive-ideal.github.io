/**
 * Reusable Lightbox Component with Custom Info Panel
 * Uses lightGallery with custom info button and slide-in panel
 * 
 * Usage:
 * <div id="my-gallery" data-lightbox>
 *   <a href="large.jpg" data-title="Title" data-description="Description" class="gallery-item">
 *     <img src="thumb.jpg" alt="Alt text">
 *   </a>
 * </div>
 * 
 * <script src="js/components/lightbox.js"></script>
 * <script>
 *   initLightbox('#my-gallery', options);
 * </script>
 */

// Keep focus listeners unique when gallery filters recreate lightGallery.
const lightboxFocusGalleries = new WeakSet();

function setupLightboxFocus(galleryElement) {
    if (lightboxFocusGalleries.has(galleryElement)) return;
    lightboxFocusGalleries.add(galleryElement);

    let openingThumbnail = null;

    // Native links emit click for both pointer and keyboard activation.
    galleryElement.addEventListener('click', function(event) {
        const thumbnail = event.target.closest('.gallery-item');
        if (thumbnail && galleryElement.contains(thumbnail)) {
            openingThumbnail = thumbnail;
        }
    }, true);

    galleryElement.addEventListener('lgAfterClose', function() {
        if (openingThumbnail && openingThumbnail.isConnected && openingThumbnail.getClientRects().length) {
            openingThumbnail.focus({ preventScroll: true });
        }
        openingThumbnail = null;
    });
}

// Initialize lightGallery with custom info panel
function initLightbox(selector, options = {}) {
    const galleryElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
    
    if (!galleryElement) {
        console.warn('Lightbox: Gallery element not found', selector);
        return null;
    }
    
    // Native image links remain available if the library could not load.
    if (typeof lightGallery !== 'function') return null;

    // Default configuration
    const defaultOptions = {
        plugins: [window.lgThumbnail, window.lgZoom].filter(Boolean),
        speed: 300,
        thumbnail: typeof lgThumbnail !== 'undefined',
        zoom: true,
        actualSize: false,
        showZoomInOutIcons: true,
        download: false,
        counter: true,
        mousewheel: true,
        getCaptionFromTitleOrAlt: false,
        mobileSettings: {
            controls: true,
            showCloseIcon: true,
            showZoomInOutIcons: true
        }
    };
    
    // Merge options
    const config = { ...defaultOptions, ...options };

    setupLightboxFocus(galleryElement);
    
    // Initialize lightGallery
    const lightGalleryInstance = lightGallery(galleryElement, config);
    
    // Setup custom info panel functionality
    setupInfoPanel(galleryElement, lightGalleryInstance);
    
    return lightGalleryInstance;
}

// Setup custom info button and panel
function setupInfoPanel(galleryElement, lightGalleryInstance) {
    let eventListenersAttached = false;
    
    // Attach event listeners only once per gallery element
    if (!eventListenersAttached) {
        galleryElement.addEventListener('lgAfterOpen', function() {
            const dialog = document.querySelector('.lg-container.lg-show');
            if (dialog && !dialog.hasAttribute('aria-labelledby')) {
                dialog.setAttribute('aria-label', 'Photo viewer');
            }
            addInfoButton(lightGalleryInstance);
        });
        galleryElement.addEventListener('lgAfterSlide', function() {
            updateInfoPanel(lightGalleryInstance);
        });
        galleryElement.addEventListener('lgBeforeClose', closeInfoPanel);
        eventListenersAttached = true;
    }
}

// Add custom info button to the lightbox toolbar
function addInfoButton(lightGalleryInstance) {
    const toolbar = document.querySelector('.lg-toolbar');
    const outer = document.querySelector('.lg-outer');
    if (!toolbar || !outer || toolbar.querySelector('.lg-info-btn')) return;
    const panelId = `${outer.id}-info-panel`;
    
    const infoBtn = document.createElement('button');
    infoBtn.type = 'button';
    infoBtn.className = 'lg-info-btn lg-icon';
    infoBtn.setAttribute('aria-label', 'Show info');
    infoBtn.setAttribute('aria-expanded', 'false');
    infoBtn.setAttribute('aria-controls', panelId);
    infoBtn.innerHTML = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    infoBtn.addEventListener('click', function() {
        toggleInfoPanel(lightGalleryInstance);
    });
    toolbar.appendChild(infoBtn);
    
    // Add info panel to the lightbox
    if (outer && !outer.querySelector('.lg-info-panel')) {
        const panel = document.createElement('div');
        panel.id = panelId;
        panel.className = 'lg-info-panel';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', 'Image information');
        panel.setAttribute('aria-hidden', 'true');
        panel.setAttribute('inert', '');
        panel.innerHTML = '<div class="lg-info-panel-content"></div>';
        outer.appendChild(panel);
    }
}

function setInfoPanelExpanded(panel, infoBtn, expanded) {
    panel.classList.toggle('lg-info-panel-visible', expanded);
    panel.setAttribute('aria-hidden', String(!expanded));
    panel.toggleAttribute('inert', !expanded);
    if (infoBtn) {
        infoBtn.classList.toggle('lg-info-btn-active', expanded);
        infoBtn.setAttribute('aria-expanded', String(expanded));
        infoBtn.setAttribute('aria-label', expanded ? 'Hide info' : 'Show info');
    }
}

// Toggle info panel visibility
function toggleInfoPanel(lightGalleryInstance) {
    const panel = document.querySelector('.lg-info-panel');
    const infoBtn = document.querySelector('.lg-info-btn');
    if (!panel) return;
    
    const expanded = !panel.classList.contains('lg-info-panel-visible');
    setInfoPanelExpanded(panel, infoBtn, expanded);
    
    if (expanded) {
        updateInfoPanelContent(lightGalleryInstance);
    }
}

// Close info panel when lightbox closes
function closeInfoPanel() {
    const panel = document.querySelector('.lg-info-panel');
    if (panel) {
        setInfoPanelExpanded(panel, document.querySelector('.lg-info-btn'), false);
    }
}

// Update info panel when slide changes
function updateInfoPanel(lightGalleryInstance) {
    const panel = document.querySelector('.lg-info-panel');
    if (panel && panel.classList.contains('lg-info-panel-visible')) {
        updateInfoPanelContent(lightGalleryInstance);
    }
}

// Update info panel content with current image description
function updateInfoPanelContent(lightGalleryInstance) {
    const panelContent = document.querySelector('.lg-info-panel-content');
    if (!panelContent || !lightGalleryInstance) return;
    
    const currentIndex = lightGalleryInstance.index;
    const galleryItems = lightGalleryInstance.galleryItems;
    const currentItem = galleryItems ? galleryItems[currentIndex] : null;
    
    if (currentItem) {
        // Get data from the gallery item
        const title = currentItem.title || currentItem.getAttribute?.('data-title') || '';
        const description = currentItem.getAttribute?.('data-description') || currentItem.subHtml || '';
        const category = currentItem.getAttribute?.('data-category') || '';
        
        let html = '';
        if (title) {
            html += '<h3 class="lg-info-title">' + title + '</h3>';
        }
        if (category) {
            html += '<span class="lg-info-category">' + category.charAt(0).toUpperCase() + category.slice(1) + '</span>';
        }
        if (description) {
            html += '<p class="lg-info-description">' + description + '</p>';
        }
        
        // If no content, show a default message
        if (!html) {
            html = '<p class="lg-info-description" style="opacity: 0.6;">No additional information available.</p>';
        }
        
        panelContent.innerHTML = html;
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.initLightbox = initLightbox;
}
