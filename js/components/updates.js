/**
 * Updates Component - Dynamically loads and renders updates from updates.json
 * Used on: Homepage (highlights scroller) and Updates listing page
 */

const UpdatesComponent = (function () {
  let updatesCache = null;

  /**
   * Helper to get URL with base path
   */
  function url(path) {
    return window.SiteConfig ? window.SiteConfig.url(path) : path;
  }

  /**
   * Helper to get nav URL with base path
   */
  function navUrl(path) {
    return window.SiteConfig ? window.SiteConfig.navUrl(path) : path;
  }

  /**
   * Fetch updates data from JSON
   */
  async function fetchUpdates() {
    if (updatesCache) return updatesCache;

    // Try absolute path first, then relative fallback
    const paths = ["/updates/updates.json", "updates/updates.json"];

    for (const jsonPath of paths) {
      const fullPath = url(jsonPath);
      try {
        const response = await fetch(fullPath);
        if (!response.ok) continue;
        const updates = await response.json();
        updatesCache = updates;
        return updates;
      } catch (error) {
        continue;
      }
    }

    console.error("Error loading updates: all paths failed");
    return null;
  }

  /**
   * Format a date string (YYYY-MM-DD) into a human-readable format
   */
  function formatDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  /**
   * Format a date string into a short format (e.g., "April 18, 2026")
   */
  function formatDateShort(dateStr) {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  /**
   * Get month/year grouping key from date
   */
  function getMonthGroup(dateStr) {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  }

  /**
   * Render a single update card for the homepage scroller
   */
  function renderHighlightCard(update) {
    const badgeColor =
      update.categoryColor === "accent" ? "bg-accent-500" : "bg-primary-500";
    const imageHtml = update.image
      ? `<div class="relative h-40 overflow-hidden">
                   <img src="${update.image}" alt="${update.title}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
                   <span class="absolute left-3 top-3 rounded-full ${badgeColor} px-2.5 py-1 text-xs font-semibold text-white">${update.category}</span>
               </div>`
      : `<div class="relative h-40 overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                   <span class="absolute left-3 top-3 rounded-full ${badgeColor} px-2.5 py-1 text-xs font-semibold text-white">${update.category}</span>
                   <svg class="h-12 w-12 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                   </svg>
               </div>`;

    return `<a href="${navUrl("/updates/" + update.slug)}" class="group flex-shrink-0 w-80 snap-start rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all hover:border-primary-200 hover:shadow-lg">
                   ${imageHtml}
                   <div class="p-5">
                       <div class="text-xs text-gray-500 mb-2">${formatDateShort(update.date)}</div>
                       <h3 class="font-semibold text-gray-900 transition-colors group-hover:text-primary-600 line-clamp-2">${update.title}</h3>
                       <p class="mt-2 text-sm text-gray-600 line-clamp-2">${update.excerpt}</p>
                   </div>
               </a>`;
  }

  /**
   * Render a single update card for the listing page
   */
  function renderListingCard(update) {
    const badgeBg =
      update.categoryColor === "accent" ? "bg-accent-100" : "bg-primary-100";
    const badgeText =
      update.categoryColor === "accent"
        ? "text-accent-700"
        : "text-primary-700";
    const imageHtml = update.image
      ? `<div class="mb-4 shrink-0 overflow-hidden rounded-xl sm:mb-0 sm:h-36 sm:w-52">
                   <img src="${update.image.replace("w=400&h=200", "w=400&h=300")}" alt="${update.title}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
               </div>`
      : "";

    const cardClasses = update.image
      ? "group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-lg sm:flex sm:gap-6 sm:p-6"
      : "group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-lg sm:p-6";

    return `<a href="${navUrl("/updates/" + update.slug)}" class="${cardClasses}">
                   ${imageHtml}
                   <div class="flex flex-col justify-center">
                       <div class="mb-2 flex items-center gap-3">
                           <span class="rounded-full ${badgeBg} px-3 py-0.5 text-xs font-semibold ${badgeText}">${update.category}</span>
                           <span class="text-sm text-gray-500">${formatDateShort(update.date)}</span>
                       </div>
                       <h3 class="text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600 sm:text-xl">${update.title}</h3>
                       <p class="mt-2 line-clamp-2 text-gray-600">${update.excerpt}</p>
                   </div>
               </a>`;
  }

  /**
   * Render loading skeleton for homepage highlights
   */
  function renderHighlightSkeleton() {
    let html = "";
    for (let i = 0; i < 5; i++) {
      html += `<div class="flex-shrink-0 w-80 snap-start rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                       <div class="h-40 bg-gray-200 animate-pulse"></div>
                       <div class="p-5 space-y-3">
                           <div class="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                           <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                           <div class="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                       </div>
                   </div>`;
    }
    return html;
  }

  /**
   * Render loading skeleton for listing page
   */
  function renderListingSkeleton() {
    let html = "";
    for (let i = 0; i < 4; i++) {
      html += `<div class="rounded-2xl border border-gray-200 bg-white p-5 sm:flex sm:gap-6 sm:p-6">
                       <div class="mb-4 shrink-0 sm:mb-0 sm:h-36 sm:w-52 bg-gray-200 rounded-xl animate-pulse"></div>
                       <div class="flex-1 space-y-3">
                           <div class="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                           <div class="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                           <div class="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                       </div>
                   </div>`;
    }
    return html;
  }

  /**
   * Initialize homepage highlights
   */
  async function initHighlights() {
    const container = document.getElementById("updates-container");
    if (!container) return;

    // Show loading skeleton
    container.innerHTML = renderHighlightSkeleton();

    const updates = await fetchUpdates();

    if (!updates) {
      container.innerHTML = `<div class="py-8 text-center text-gray-500">Unable to load updates. Please try again later.</div>`;
      return;
    }

    // Sort by date (newest first) and take top 5
    const sorted = [...updates].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    const highlights = sorted.slice(0, 5);

    container.innerHTML = highlights.map(renderHighlightCard).join("");
  }

  /**
   * Initialize updates listing page
   */
  async function initListing() {
    const container = document.getElementById("updates-listing-container");
    if (!container) return;

    // Show loading skeleton
    container.innerHTML = renderListingSkeleton();

    const updates = await fetchUpdates();

    if (!updates) {
      container.innerHTML = `<div class="py-8 text-center text-gray-500">Unable to load updates. Please try again later.</div>`;
      return;
    }

    // Sort by date (newest first)
    const sorted = [...updates].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    // Group by month
    const groups = {};
    sorted.forEach((update) => {
      const key = getMonthGroup(update.date);
      if (!groups[key]) groups[key] = [];
      groups[key].push(update);
    });

    // Render grouped updates
    let html = "";
    let delayIndex = 0;

    Object.entries(groups).forEach(([month, monthUpdates]) => {
      html += `<div class="mb-16" data-animate="fade-in-up" ${delayIndex > 0 ? `data-delay="${delayIndex * 100}"` : ""}>
                         <div class="mb-8 flex items-center gap-4">
                             <h2 class="text-2xl font-bold text-gray-900">${month}</h2>
                             <div class="h-px flex-1 bg-gray-200"></div>
                         </div>
                         <div class="space-y-6">
                             ${monthUpdates.map((update) => renderListingCard(update)).join("")}
                         </div>
                     </div>`;
      delayIndex++;
    });

    container.innerHTML = html;

    // Re-initialize scroll animations for the newly added elements
    if (typeof initScrollAnimations === "function") {
      initScrollAnimations();
    }
  }

  // Public API
  return {
    initHighlights,
    initListing,
    fetchUpdates,
  };
})();

// Auto-initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  UpdatesComponent.initHighlights();
  UpdatesComponent.initListing();
});