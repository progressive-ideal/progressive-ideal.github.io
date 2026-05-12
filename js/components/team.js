/**
 * Team Component
 * Dynamically loads and renders team members from data/team.json
 */

const TeamComponent = (function() {
    'use strict';
    
    let teamCache = null;
    
    /**
     * Helper to get URL with base path
     */
    function url(path) {
        return window.SiteConfig ? window.SiteConfig.url(path) : path;
    }
    
    /**
     * Fetch team data from JSON
     */
    async function fetchTeam() {
        if (teamCache) return teamCache;
        
        const paths = ['/data/team.json', 'data/team.json'];
        
        for (const jsonPath of paths) {
            const fullPath = url(jsonPath);
            try {
                const response = await fetch(fullPath);
                if (!response.ok) continue;
                const team = await response.json();
                teamCache = team;
                return team;
            } catch (error) {
                continue;
            }
        }
        
        console.error('Error loading team: all paths failed');
        return null;
    }
    
    /**
     * Render a single team member card
     */
    function renderTeamMember(member, index) {
        return `
        <div class="group text-center" data-animate="fade-in-up" data-delay="${(index + 1) * 100}">
            <div class="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-2xl">
                <img src="${member.image}" alt="${member.name}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            </div>
            <h3 class="text-lg font-semibold text-gray-900">${member.name}</h3>
            <p class="text-primary-600">${member.role}</p>
            <p class="mt-2 text-sm text-gray-600">${member.bio}</p>
        </div>`;
    }
    
    /**
     * Render loading skeleton
     */
    function renderSkeleton() {
        let html = '';
        for (let i = 0; i < 4; i++) {
            html += `
            <div class="text-center">
                <div class="mx-auto mb-4 h-48 w-48 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div class="h-5 w-32 mx-auto bg-gray-200 rounded animate-pulse"></div>
                <div class="mt-2 h-4 w-24 mx-auto bg-gray-100 rounded animate-pulse"></div>
            </div>`;
        }
        return html;
    }
    
    /**
     * Initialize team section
     */
    async function initTeam() {
        const container = document.getElementById('team-container');
        if (!container) return;
        
        // Show loading skeleton
        container.innerHTML = renderSkeleton();
        
        const team = await fetchTeam();
        
        if (!team) {
            container.innerHTML = '<div class="py-8 text-center text-gray-500">Unable to load team. Please try again later.</div>';
            return;
        }
        
        // Render team members
        const html = team.map((member, index) => renderTeamMember(member, index)).join('');
        container.innerHTML = html;
        
        // Re-initialize scroll animations
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
    }
    
    // Public API
    return {
        initTeam,
        fetchTeam
    };
})();

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    TeamComponent.initTeam();
});