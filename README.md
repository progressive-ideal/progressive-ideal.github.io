# Progressive Ideal Yatimkhana (PIY) Website

A modern, responsive static website for Progressive Ideal Yatimkhana, an orphanage organization dedicated to providing hope, care, and a brighter future for children in need.

## Website TODOs

Work through these items one by one. This is still a template site; organization-specific content will be updated when the orphanage's actual data is provided. Keep the existing HTML/CSS/JavaScript approach.

- [ ] **1. Complete the donation process — deferred until later.** The Donate page at `/donate` is created and existing donation buttons and sections link to it. Add confirmed payment methods and account details, explain how to request a receipt, and provide a donation contact. The page currently directs visitors to Contact for instructions; payment integration remains pending.
- [ ] **2. Replace template content with actual orphanage data — awaiting data.** Review every page, JSON file, and shared component. Replace sample history, team members, testimonials, statistics, campaign goals/progress, social links, and contact details. Include tax-deductibility, verification, and spending-percentage claims only when supported by confirmed information.
- [x] **3. Fix navigation and asset paths for deployment.** Keep extensionless navigation links and the existing page structure for root-domain hosting on GitHub Pages and the future custom domain. Fixed the header logo, favicon paths on nested update pages, and JSON-loaded image paths. Automated asset checks passed, and live navigation was verified by the site owner. Subfolder deployment is tracked separately in task 15.
- [ ] **4. Complete the Contact page.** Replace the map placeholder with real directions or a map, remove the hardcoded sample address, use one source for contact details, and verify phone, email, and directions links.
- [ ] **5. Add a practical homepage introduction.** Explain where the orphanage is, whom it supports, and what care it provides, using the actual information supplied.
- [ ] **6. Replace stock imagery with approved photographs.** Update About, Programs, Gallery, and Updates with photos approved for public use. Ensure captions and alternative text accurately describe each image and do not present stock photos as the orphanage's own facility or children.
- [ ] **7. Make branding consistent.** Match the footer's current PIY text badge to the header branding and check logo sizing and presentation across screen sizes.
- [ ] **8. Simplify animations and add motion controls.** Review the hero slideshow, rotating text, counters, and moving updates; reduce competing movement, provide pause controls for autoplay, and make JavaScript animations respect reduced-motion preferences.
- [x] **9. Improve accessibility and content resilience.** Completed logo/navigation labels, FAQ relationships, keyboard skip links, gallery/lightbox controls, focus handling, and contrast improvements. Mobile navigation and FAQ controls work independently of `main.js`; native image links remain available if lightbox scripts fail. Desktop/mobile accessibility audits and script-failure checks passed. Remaining JSON-content fallbacks and extra hero failure handling were excluded at the site owner's request. The original hero appearance is preserved. Header spacing remains tracked in task 17.
- [x] **10. Prepare CSS for production.** All pages load generated `css/tailwind.css` instead of the browser Tailwind script. The existing theme is in `tailwind.config.cjs`, custom CSS remains in `css/styles.css`, and npm scripts provide production builds and watch mode. Commit generated CSS when styling changes; see the CSS build instructions below.
- [x] **11. Finalize the page structure.** Home, About, Programs, Gallery, Updates, Donate, and Contact are agreed and implemented. Updates will be maintained by the site owner. Existing donation buttons and sections remain and link to the Donate page. Impact and FAQ remain homepage sections. Content updates are tracked in task 2, donation details in task 1, and a possible Reports/Transparency page in task 16.
- [ ] **12. Decide on language support.** Confirm whether the intended audience needs English, Bangla, or both, then implement the agreed language setup.
- [ ] **13. Clarify content maintenance and update this README.** Document which content lives in JSON, HTML, and JavaScript; consolidate repeated details where useful. Correct the claim that all content is in JSON and bring the documented project structure into line with the repository.
- [ ] **14. Complete browser and launch verification.** Check desktop and mobile layouts, navigation, nested pages, donation links, FAQ behavior, gallery/lightbox interactions, autoplay controls, loading/error states, and console errors. Repeat JavaScript syntax, JSON validity, and duplicate-ID checks after implementation.
- [ ] **15. Support subfolder deployment — deferred; not needed for the current hosting setup.** Audit navigation, asset paths, JSON requests, and homepage section links with a nonempty `basePath`. Fix paths that bypass configuration and verify direct visits and refreshes on root and nested pages under a subfolder.
- [ ] **16. Consider a Reports/Transparency page — deferred; not needed for now.** Revisit whether to publish a dedicated page for reports, supporting documents, and financial summaries when suitable material is available.
- [ ] **17. Improve header spacing at narrower desktop widths.** Investigate the reported crowding below approximately 1280px, where the logo/title, navigation links, and Donate button sit too close together. Adjust spacing, title sizing, or the navigation breakpoint as needed, and verify that the header remains readable without overlap at intermediate widths.

## 📁 Project Structure

```
progressive-ideal.github.io/
├── index.html                    # Homepage
├── about.html                    # About page
├── contact.html                  # Contact page
├── donate.html                   # Donation information page
├── gallery.html                  # Gallery page
├── serve.json                    # Local dev server config
├── package.json                  # CSS build and watch commands
├── package-lock.json             # Locked build dependencies
├── tailwind.config.cjs           # Tailwind theme and source scanning
├── README.md                     # Project documentation
├── prompt.md                     # Development notes
├── .gitignore                    # Git ignore rules
│
├── css/
│   ├── tailwind.input.css        # Tailwind build input
│   ├── tailwind.css              # Generated styles (committed)
│   └── styles.css                # Custom styles, loaded after Tailwind
│
├── js/
│   ├── main.js                   # Main JavaScript file
│   └── components/               # JavaScript components
│       ├── back-to-top.js        # Back to top button
│       ├── contact-info.js       # Contact information loader
│       ├── cta-donate.js         # Donation CTA section
│       ├── faq.js                # FAQ accordion
│       ├── footer.js             # Footer component
│       ├── gallery.js            # Gallery grid loader
│       ├── head-config.js        # Common head elements
│       ├── header.js              # Header component
│       ├── hero-carousel.js      # Hero carousel
│       ├── lightbox.js           # Lightbox wrapper
│       ├── mobile-cta.js         # Mobile CTA button
│       ├── programs.js            # Programs section
│       ├── scroll-progress.js    # Scroll progress bar
│       ├── stats.js              # Statistics counter
│       ├── stories.js            # Success stories
│       ├── team.js               # Team section
│       └── updates.js             # Updates/news loader
│
├── data/                         # JSON data files
│   ├── contact.json              # Contact information
│   ├── faq.json                  # FAQ content
│   ├── gallery.json              # Gallery images
│   ├── hero-carousel.json        # Hero carousel slides
│   ├── programs.json             # Programs data
│   ├── social-links.json         # Social media links
│   ├── stats.json                # Statistics & campaigns
│   ├── stories.json              # Success stories
│   └── team.json                 # Team members
│
└── updates/                      # Updates/news section
    ├── index.html                # Updates listing page
    ├── updates.json              # Updates metadata
    ├── annual-sports-day-celebration.html
    ├── health-camp-for-children.html
    ├── new-classroom-building-progress.html
    ├── partnership-with-local-schools.html
    ├── volunteer-appreciation-day.html
    └── winter-clothing-drive-success.html
```

## 📝 Content Management

### Updating Content

All content is stored in JSON files in the `/data` directory. To update content:

1. Open the relevant JSON file in `/data/`
2. Edit the values
3. Save the file
4. Refresh the browser to see changes

### Content Files Reference

| File                 | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `contact.json`       | Contact information (address, phone, email) |
| `faq.json`           | Frequently asked questions                  |
| `gallery.json`       | Gallery images and descriptions             |
| `hero-carousel.json` | Hero section carousel slides                |
| `programs.json`      | Organization programs                       |
| `social-links.json`  | Social media links                          |
| `stats.json`         | Statistics and fundraising campaigns        |
| `stories.json`       | Success/impact stories                      |
| `team.json`          | Team members                                |

### Adding a New Update/News Post

1. Create a new HTML file in `/updates/` (e.g., `new-event.html`)
2. Copy the structure from an existing update file
3. Update the content:
   - `<title>` tag
   - `<h1>` heading
   - Date in `<p class="update-date">`
   - Content inside the update content div
4. Add the update to `updates/updates.json`:

```json
{
  "id": 7,
  "title": "New Event Title",
  "date": "January 15, 2026",
  "excerpt": "Brief description of the update...",
  "image": "https://example.com/image.jpg",
  "link": "new-event.html"
}
```

### Adding Gallery Images

Add a new entry to `data/gallery.json`:

```json
{
  "id": 10,
  "title": "Image Title",
  "category": "education",
  "thumbnail": "path/to/thumbnail.jpg",
  "fullSize": "path/to/full-size.jpg",
  "description": "Image description"
}
```

**Categories**: `education`, `activities`, `events`, `facility`

## 🎨 Customization

### CSS build

The site uses Tailwind CSS 3.4.17 to generate a static stylesheet. Node.js and npm are needed only for development; GitHub Pages serves the committed CSS without running a build.

Install the locked dependencies on first setup or after `package-lock.json` changes:

```bash
npm ci
```

Generate the minified production stylesheet:

```bash
npm run build:css
```

During development, automatically rebuild when HTML, JavaScript, the Tailwind configuration, or the input stylesheet changes:

```bash
npm run watch:css
```

Stop watch mode with Ctrl+C. Run `npm run build:css` before committing styling changes so the committed output is minified. Commit `css/tailwind.css` alongside its source changes; do not edit the generated file directly. Ordinary text, image, or JSON content updates do not require rebuilding unless they introduce new Tailwind classes.

The build scans root HTML pages, all update HTML pages, and JavaScript under `js/`, including shared components. Write complete class names in conditional branches (for example, `isActive ? 'bg-primary-600' : 'bg-gray-300'`) rather than assembling fragments such as `'bg-' + color + '-600'`. If a future component needs assembled classes or classes supplied by unscanned data, add the complete possibilities to `safelist` in `tailwind.config.cjs`. The saved example website is excluded from scanning.

Pages load `css/tailwind.css` first, followed by `css/styles.css`; nested update pages use `../css/`. Keep using an HTTP server for previewing the website because components fetch JSON.

### Colors

Colors are defined in `tailwind.config.cjs`. Rebuild CSS after changing them:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ... other shades
  },
  accent: {
    // accent colors
  }
}
```

### Typography

Google Fonts are loaded in `js/components/head-config.js`. The default font is **Manrope**, selected in `tailwind.config.cjs`.

### Styling

Custom CSS is in `css/styles.css`. This file contains:

- Custom animations
- Component-specific styles
- Utility classes
- Scrollbar styling

## 📱 Responsive Breakpoints

| Breakpoint | Screen Width |
| ---------- | ------------ |
| `sm`       | ≥ 640px      |
| `md`       | ≥ 768px      |
| `lg`       | ≥ 1024px     |
| `xl`       | ≥ 1280px     |
| `2xl`      | ≥ 1536px     |

## 🚢 Deployment

### GitHub Pages

1. If styling or Tailwind classes changed, run `npm run build:css` and include the generated `css/tailwind.css` in your commit.

2. Push changes to the main branch:

   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

3. The site will automatically deploy via GitHub Pages. No npm build is required on the host because generated CSS is committed.

### Other Static Hosts

The site can be deployed to any static hosting service:

- **Netlify**: Connect your Git repository
- **Vercel**: Import your project
- **Firebase Hosting**: Use Firebase CLI
- **Traditional Hosting**: Upload via FTP

## ✅ Pre-Publish Checklist

Before deploying changes:

- [ ] All pages render correctly in the browser
- [ ] All navigation links work
- [ ] Images load properly
- [ ] Mobile view looks correct
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] JSON files are valid (use a JSON validator)
- [ ] Footer is consistent across all pages

## 🔧 Troubleshooting

| Problem                         | Cause                          | Solution                                                    |
| ------------------------------- | ------------------------------ | ----------------------------------------------------------- |
| Page looks unstyled             | CSS file path is wrong         | Check `<link>` href — update files need `../css/styles.css` |
| 404 error on a link             | `href` path doesn't match file | Verify file names match exactly (case-sensitive)            |
| Images not showing              | Image path is wrong            | Check `src` path and ensure the image file exists           |
| Nav link broken on update pages | Missing `../` prefix           | Update pages are in a subfolder, links need `../` prefix    |
| Changes not showing             | Browser cache                  | Hard refresh with `Ctrl+Shift+R`                            |
| JSON data not loading           | Invalid JSON syntax            | Validate JSON at [jsonlint.com](https://jsonlint.com/)      |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support, please contact:

- Email: info@progressive-ideal.org
- Website: [progressive-ideal.github.io](https://progressive-ideal.github.io)

---

**Built with ❤️ for Progressive Ideal Yatimkhana**
