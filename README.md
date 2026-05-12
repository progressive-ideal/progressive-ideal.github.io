# Progressive Ideal Yatimkhana (PIY) Website

A modern, responsive static website for Progressive Ideal Yatimkhana, an orphanage organization dedicated to providing hope, care, and a brighter future for children in need.

## 📁 Project Structure

```
progressive-ideal.github.io/
├── index.html                    # Homepage
├── about.html                    # About page
├── contact.html                  # Contact page
├── gallery.html                  # Gallery page
├── serve.json                    # Local dev server config
├── README.md                     # Project documentation
├── prompt.md                     # Development notes
├── .gitignore                    # Git ignore rules
│
├── css/
│   └── styles.css                # Custom styles
│
├── js/
│   ├── main.js                   # Main JavaScript file
│   ├── tailwind-config.js        # Tailwind CSS configuration
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

### Colors

Colors are defined in `js/tailwind-config.js`:

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

Fonts are configured in `js/components/head-config.js`. The default font is **Inter** from Google Fonts.

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

1. Push changes to the main branch:

   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

2. The site will automatically deploy via GitHub Pages.

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
