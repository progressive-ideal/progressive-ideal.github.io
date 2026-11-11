# Progressive Ideal Yatimkhana (PIY) Website

A modern, responsive static website for Progressive Ideal Yatimkhana, an orphanage organization dedicated to providing hope, care, and a brighter future for children in need.

## Website TODOs

Work through these items one by one. The first organization-data update is implemented. Items requiring confirmation are tracked in the board discussion checklist below. Keep the existing HTML/CSS/JavaScript approach.

- [ ] **1. Complete the donation process — deferred until later.** The Donate page at `/donate` is created and existing donation buttons and sections link to it. Add confirmed payment methods and account details, explain how to request a receipt, and provide a donation contact. The page currently directs visitors to Contact for instructions; payment integration remains pending.
- [ ] **2. Replace template content with actual orphanage data — board confirmation pending.** The approved history, reported figures, programs, achievements, committee, staff and brochure contacts are implemented. Unsupported template claims, testimonials, stock images and sample social links are removed. Resolve the confirmations and update/remove decisions in the checklist below before marking this task complete.
- [x] **3. Fix navigation and asset paths for deployment.** Keep extensionless navigation links and the existing page structure for root-domain hosting on GitHub Pages and the future custom domain. Fixed the header logo, favicon paths on nested update pages, and JSON-loaded image paths. Automated asset checks passed, and live navigation was verified by the site owner. Subfolder deployment is tracked separately in task 15.
- [ ] **4. Complete the Contact page — confirmation pending.** Added Kurapara/Pangsha/Rajbari, brochure phones/email, and a locality search on Google Maps. Removed the fake address and fixed office hours. Confirm contacts, postal code, exact map pin and visiting arrangements before completing.
- [x] **5. Add a practical homepage introduction.** Included the orphanage’s location, establishment year and educational/residential work in the existing homepage Impact introduction, with dated report figures in the original statistics cards.
- [ ] **6. Replace stock imagery with approved photographs — more photos requested.** Stock photos and portraits are removed. The five existing local hero photos are reused with their existing subject descriptions; confirm those captions. Original portrait frames remain empty until portraits are supplied. Requested paths are listed below.
- [x] **7. Make branding consistent.** Header and footer use the same logo with explicit 40px dimensions and preserved proportions. The footer logo has a white backing for its dark background, and the organization name wraps on narrower layouts. Verified branding and header spacing across all 13 pages at 12 widths from 320px to 1536px.
- [x] **8. Simplify carousel motion.** Testimonials no longer autoplay; arrows, dots, and swipes remain available. Updates pause while hovered or while a link inside has keyboard focus, and resume once neither applies. No visible Pause/Resume controls were added. The hero, other animations, and existing reduced-motion rules remain unchanged as requested. Desktop/mobile behavior was verified.
- [x] **9. Improve accessibility and content resilience.** Completed logo/navigation labels, FAQ relationships, keyboard skip links, gallery/lightbox controls, focus handling, and contrast improvements. Mobile navigation and FAQ controls work independently of `main.js`; native image links remain available if lightbox scripts fail. Desktop/mobile accessibility audits and script-failure checks passed. Remaining JSON-content fallbacks and extra hero failure handling were excluded at the site owner's request. The original hero appearance is preserved. Header spacing remains tracked in task 17.
- [x] **10. Prepare CSS for production.** All pages load generated `css/tailwind.css` instead of the browser Tailwind script. The existing theme is in `tailwind.config.cjs`, custom CSS remains in `css/styles.css`, and npm scripts provide production builds and watch mode. Commit generated CSS when styling changes; see the CSS build instructions below.
- [x] **11. Finalize the page structure.** Home, About, Programs, Gallery, Updates, Donate, and Contact are agreed and implemented. Updates will be maintained by the site owner. Existing donation buttons and sections remain and link to the Donate page. Impact and FAQ remain homepage sections. Content updates are tracked in task 2, donation details in task 1, and a possible Reports/Transparency page in task 16.
- [ ] **12. Decide on language support.** Confirm whether the intended audience needs English, Bangla, or both, then implement the agreed language setup.
- [ ] **13. Clarify content maintenance and update this README.** Document which content lives in JSON, HTML, and JavaScript; consolidate repeated details where useful. Correct the claim that all content is in JSON and bring the documented project structure into line with the repository.
- [ ] **14. Complete browser and launch verification.** Check desktop and mobile layouts, navigation, nested pages, donation links, FAQ behavior, gallery/lightbox interactions, autoplay controls, loading/error states, and console errors. Repeat JavaScript syntax, JSON validity, and duplicate-ID checks after implementation.
- [ ] **15. Support subfolder deployment — deferred; not needed for the current hosting setup.** Audit navigation, asset paths, JSON requests, and homepage section links with a nonempty `basePath`. Fix paths that bypass configuration and verify direct visits and refreshes on root and nested pages under a subfolder.
- [ ] **16. Consider a Reports/Transparency page — deferred; not needed for now.** Revisit whether to publish a dedicated page for reports, supporting documents, and financial summaries when suitable material is available.
- [x] **17. Improve header spacing at narrower desktop widths.** Full navigation now appears from 1280px; narrower widths use the menu button. Added explicit gaps between header groups, kept branding and actions from shrinking, and reset the compact menu when resizing to desktop. Verified all 13 pages at 12 widths from 320px to 1536px, including keyboard controls and focus during breakpoint changes.

## Content review and board discussion

Content updates must preserve the existing design, layout and formatting. Obtain the site owner’s approval before making design changes.

Source basis: only the four supplied files in `pito-data` were reviewed: `১২৩.docx`, `IAB Orphanage Report 2026.pptx 01.pptx`, and the two named WhatsApp brochure JPEGs. The 2026 presentation takes precedence where sources conflict, as directed by the site owner. No student rosters, birth dates, salaries or family details have been published. No source documents have been copied into the public site.

### Template content: update or remove decisions

| Item | Current action | Remaining decision |
| --- | --- | --- |
| 1999 founding story, invented milestones, 25 years of service | Replaced with 2007 Trust / 2009 Academy / 2013 orphanage / 2021 building / 2023 inauguration | Confirm final English wording |
| 150 children, 50 volunteers, dollar fundraising totals, 200 monthly meals | Removed; added dated 48-resident / 48-bed figures and 2025 exam results | Supply current figures if different; do not infer annual meal or volunteer totals |
| Fake campaign goals and progress bars | Removed from Home; reported needs included within the original Donate page layout | Decide which needs become funded campaigns, with approved BDT budgets and progress evidence |
| Fictional testimonials and portraits | Removed from Home; `data/stories.json` emptied; original Stories section retained but hidden pending genuine stories | Supply approved genuine testimonials before showing the original stories section |
| Sample team | Replaced with six committee members and eight staff from the 2026 presentation | Verify English names, current roles and portraits |
| Detailed sample program claims | Rewritten to documented education, Hifz, residential care and activities | Confirm any additional specific services before adding them |
| Stock gallery | Replaced with five existing local hero photos | Confirm captions and supply more approved photos |
| Six invented update articles | Removed from listings; old URLs show an unavailable notice with noindex | Delete retired files later or retain the notices; do not republish their invented dates, people or numbers |
| Real update content | Added 2025 academic achievements, 2026 Seerah/Hifz achievements and 8 April 2023 building inauguration | Add exact event dates/photos where available; year-only dates are intentional |
| Sample address, phone, email, postal code and office hours | Replaced with brochure contacts/locality; unknown postal code/hours omitted | Confirm contact and visiting details below |
| Tax-deductible / verified-charity badges and 85%/15% spending claims | Removed from FAQ and shared donation copy | Add only if the board supplies supporting information |
| Dollar-based donation examples | Removed | Approve current BDT costs and sponsorship terms before adding examples |
| Sample social links | Removed; social-link data is empty | Supply official public URLs or leave them absent |
| Newsletter invitation without a subscription system | Removed | Add only if a newsletter is actually operated |
| Name and alternate identity | Main name is Progressive Ideal Yatimkhana; Bengali name and “also known as Candemir Orphanage” appear on About | Confirm preferred legal/public spelling if needed |

### Contact and donation confirmations

- [ ] Confirm the brochure email spelling and current use: `pitypangsha@gmail.com`.
- [ ] After contact confirmation, update `data/contact.json` and the fallback values in `js/components/footer.js` and `js/components/contact-info.js` together.
- [ ] Confirm both published phone numbers: `01720-550728` and `01711-421957`, and which should be the primary public contact.
- [ ] Confirm the English locality spelling: Kurapara, Pangsha, Rajbari, Bangladesh; supply the postal code.
- [ ] Supply the exact map pin and preferred directions from the highway. The current map link searches the locality; it does not claim a verified entrance pin.
- [ ] Confirm visiting arrangements and any public office hours. No fixed opening hours are currently claimed.
- [ ] Confirm the complete current bank account holder, account number, bank, branch and routing information. The brochure’s legacy Janata Bank/Pangsha reference is not published as payment instructions.
- [ ] Confirm any bKash/Nagad/other payment options, donation contact, receipt procedure, one-time/recurring arrangements, and zakat/sadaqah handling.
- [ ] Confirm current sponsorship costs, what sponsorship covers, whether it supports an individual or pooled care, and donor update arrangements. The brochure’s historic BDT 2,500 figure is not used as a current price.
- [ ] Supply official Facebook/YouTube/Instagram URLs, if any.

### People: English names and source conflicts

English names are working transliterations, not confirmed official spellings. The 2026 presentation is used first when conflicts arise. Joining dates and staff qualifications are omitted while awaiting confirmation.

- [ ] Verify committee spellings and current appointments: Dr. Md. Abdul Matin (President); Harun Or Rashid (Secretary); Maulana Enamul Haque, Maulana Sultan Mahmud, Kazi Farhat Jamil Rupu and Ahammad Ali Munshi (Members).
- [ ] Verify staff spellings/roles: H. M. Zilhajj Hasan (Superintendent); Shahinur Rahman (Assistant Superintendent); Hafiz Motaleb Hossain (Assistant Teacher); Hafiz Md. Ibrahim Hossain (Assistant Teacher, Hifz); Md. Mizanur Rahman (Part-time Assistant Teacher); Md. Abdul Alim (Cook); Md. Lokman Hossain (Assistant Cook); Md. Shafiqul Islam (Cleaner).
- [ ] Assistant superintendent: presentation names Shahinur Rahman; DOCX names Bahar. Shahinur is used on the site pending board confirmation.
- [ ] Cleaner: presentation names Md. Shafiqul Islam; DOCX names Md. Shariful Islam and includes security duties. Shafiqul/Cleaner is used pending confirmation.
- [ ] Reconcile joining dates: Motaleb (2021 vs 2022), Abdul Alim (2019 vs 2021), Lokman (2024 vs 2025), and any remaining name/qualification differences.
- [ ] Confirm teacher headcount: overview says five regular plus one part-time teacher, while the detailed table lists five people total. No teacher-count statistic is published.
- [ ] Supply the committee formation/latest meeting dates if these should be shown.

### Report figures and facilities to reconcile

- [ ] Confirm whether the 48 residents / 48 beds reported for January–June 2026 remain current. Until then, the website explicitly dates them to that report.
- [ ] Reconcile the class/program breakdown, which totals 49 against the stated total of 48; the Hifz overview says six while the detailed roster lists five. Only the approved aggregate 48 is published.
- [ ] Clarify the older brochure’s 100-student description across residential/nonresidential arrangements versus the 2026 residential count. These may describe different periods/populations; the site does not combine them.
- [ ] Confirm room accounting: the report states 12 rooms, but the listed room uses do not clearly reconcile. The site lists the reported bedrooms and facilities without asserting a total room count.
- [ ] Confirm current ownership/site details and whether the reported 66 decimals, two-storey building, 110×32-foot footprint, eight bedrooms and fourteen toilets remain accurate.
- [ ] Reconcile 2026 expenditure totals: BDT 3,785,982 in the detailed table versus BDT 3,785,989 in the summary.
- [ ] Reconcile income categories with summary income, clarify reporting periods, and reconcile 2025 financial figures with the DOCX. No financial totals are published yet.
- [ ] Explain slide 10’s surplus/deficit figures: BDT 487,280 stated surplus versus BDT 478,280 stated deficit; BDT 470,158 plus BDT 8,122 equals BDT 478,280. Clarify the correct balance and classification.
- [ ] Clarify the anomalous 2021 financial summary and distinguish actual income/expenses from carried balances, loans and transfers.
- [ ] Confirm local registration status. The presentation says pending/no number; no registered-charity, tax-deductibility or verification claims are published.
- [ ] Confirm the 2025 examination figures and precise details/dates of the 2026 Seerah award and Hifz completion, if fuller posts are wanted.
- [ ] Correct the source student date columns/typographical errors internally. Do not derive ages or admission statistics from them until checked.

### Content still needed

- [ ] Approve final mission/history wording and the relationship between the Trust, Academy, orphanage and Candemir name.
- [ ] Confirm schools/madrasas attended, education partnerships, and the status of the proposed Dakhil madrasa. It is not described as already operating.
- [ ] Confirm any specific medical services, meal schedule, dietary provision, counseling, computer classes or vocational training before adding them.
- [ ] Confirm current needs and rank repairs/painting/roof work, library resources, digital equipment, teacher training/staff support and road access. Add budgets only when approved.
- [ ] Confirm current admissions scope and process, if the board wants this public.
- [ ] Define volunteer opportunities, application process and visit arrangements.
- [ ] Supply dates, event descriptions and captions for additional updates. No invented dates will be assigned to undated photographs.
- [ ] Decide whether to add genuine testimonials. Provide approved quotations and attribution if so.
- [ ] Reports/Transparency remains deferred under task 16; a public report must not expose the internal student/staff records in the supplied files.

### Photos requested: place files, then provide their paths

The five existing hero files remain in use; please confirm their current descriptions (campus, children outside, fruit gathering, classroom study, outdoor activities). No new files are assumed to exist, so the original portrait frames remain empty rather than displaying broken portrait links. Portraits should identify the person; activity photos need a caption and date/year when known.

| Person | Suggested portrait path |
| --- | --- |
| Dr. Md. Abdul Matin | `assets/people/dr-md-abdul-matin.jpg` |
| Harun Or Rashid | `assets/people/harun-or-rashid.jpg` |
| Maulana Enamul Haque | `assets/people/maulana-enamul-haque.jpg` |
| Maulana Sultan Mahmud | `assets/people/maulana-sultan-mahmud.jpg` |
| Kazi Farhat Jamil Rupu | `assets/people/kazi-farhat-jamil-rupu.jpg` |
| Ahammad Ali Munshi | `assets/people/ahammad-ali-munshi.jpg` |
| H. M. Zilhajj Hasan | `assets/people/h-m-zilhajj-hasan.jpg` |
| Shahinur Rahman | `assets/people/shahinur-rahman.jpg` |
| Hafiz Motaleb Hossain | `assets/people/hafiz-motaleb-hossain.jpg` |
| Hafiz Md. Ibrahim Hossain | `assets/people/hafiz-md-ibrahim-hossain.jpg` |
| Md. Mizanur Rahman | `assets/people/md-mizanur-rahman.jpg` |
| Md. Abdul Alim | `assets/people/md-abdul-alim.jpg` |
| Md. Lokman Hossain | `assets/people/md-lokman-hossain.jpg` |
| Md. Shafiqul Islam | `assets/people/md-shafiqul-islam.jpg` |

- [ ] Facilities: current exterior, bedrooms, dining room, kitchen and study space. Suggested location: `assets/facilities/`.
- [ ] Education/Hifz: classroom/coaching and Hifz activities. Suggested location: `assets/education/`.
- [ ] Achievements: approved photographs for the 2025 results, 2026 Seerah achievement and Hifz completion. Suggested location: `assets/achievements/`.
- [ ] Events: sports/cultural activities, distributions, Ramadan/Eid activities and educational visits, with date/caption. Suggested location: `assets/events/`.
- [ ] Optional: an actual 8 April 2023 inauguration photograph. The existing campus image is explicitly not labelled an inauguration-day photo.
- [ ] Use originals or selected images from the supplied presentation where possible, rather than photographing/cropping the printed brochure. Confirm which images are approved for public use. Filenames/extensions can differ from the suggestions; provide the actual paths.

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
│   ├── social-links.json         # Social media links
│   ├── stats.json                # Statistics & campaigns
│   ├── stories.json              # Success stories
│   └── team.json                 # Team members
│
└── updates/                      # Updates/news section
    ├── index.html                # Updates listing page
    ├── updates.json              # Updates metadata
    ├── academic-achievements-2025.html
    ├── seerah-and-hifz-achievements-2026.html
    ├── campus-inauguration-2023.html
    ├── annual-sports-day-celebration.html
    ├── health-camp-for-children.html
    ├── new-classroom-building-progress.html
    ├── partnership-with-local-schools.html
    ├── volunteer-appreciation-day.html
    └── winter-clothing-drive-success.html
```

## 📝 Content Management

### Updating Content

Content is split between page HTML and JSON. Contact details, people, statistics, FAQ and gallery entries are in `data/`; updates metadata is in `updates/updates.json`. History, programs, facilities, achievements and article text are also written in the corresponding HTML pages. Shared donation copy lives in `js/components/cta-donate.js`. For JSON content:

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
| `programs.html`      | Program descriptions                         |
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
  "slug": "new-event",
  "title": "New Event Title",
  "date": "2026-01-15",
  "category": "Events",
  "categoryColor": "primary",
  "excerpt": "Brief, verified description of the update.",
  "image": "assets/events/new-event.jpg"
}
```

Use an ISO date (`YYYY-MM-DD`) when known, or a year (`YYYY`) when the source provides only a year. Do not assign a made-up event date. The `slug` must match the HTML filename without `.html`; use `null` for an image until an appropriate photograph is available.

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

- Email: pitypangsha@gmail.com
- Website: [progressive-ideal.github.io](https://progressive-ideal.github.io)

---

**Built with ❤️ for Progressive Ideal Yatimkhana**
