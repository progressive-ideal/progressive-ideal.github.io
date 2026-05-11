# Content Update Guide — Pity Website

This is a static website built with plain HTML, CSS, and JavaScript. There is no database or content management system (CMS). All content lives directly inside HTML files. To update content, you edit the HTML files using a code editor.

---

## 📁 Site Structure Overview

```
pity/
├── index.html              ← Homepage
├── about.html              ← About page
├── contact.html            ← Contact page
├── gallery.html            ← Gallery page
├── css/
│   └── styles.css          ← All site styles
├── js/
│   └── main.js             ← All site scripts
├── updates/
│   ├── index.html          ← Updates listing page
│   ├── annual-sports-day-celebration.html
│   ├── health-camp-for-children.html
│   ├── new-classroom-building-progress.html
│   ├── partnership-with-local-schools.html
│   ├── volunteer-appreciation-day.html
│   └── winter-clothing-drive-success.html
├── serve.json               ← Local dev server config
└── .gitignore
```

---

## 🛠️ Tools You Need

1. **A code editor** — [Visual Studio Code](https://code.visualstudio.com/) (recommended, free)
2. **A web browser** — Chrome, Firefox, Edge, etc. for previewing changes
3. **A terminal/command prompt** — for running a local server (optional but recommended)
4. **Git** (if deploying via a Git-based host like GitHub Pages, Netlify, Vercel)

---

## 🚀 Quick Start: Running the Site Locally

Before editing, you should run the site locally so you can preview your changes.

### Option A: Using Node.js (recommended)

1. Install [Node.js](https://nodejs.org/) if you don't have it.
2. Open a terminal in the project folder and run:
   ```
   npx serve
   ```
3. Open `http://localhost:3000` in your browser.

### Option B: Using Python

If you have Python installed:

```
python -m http.server 8000
```

Then open `http://localhost:8000`.

### Option C: VS Code Live Server Extension

1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

---

## ✏️ How to Edit Content

### 1. Editing Text on an Existing Page

Open the HTML file in your code editor. Find the text you want to change and edit it directly.

**Example — Changing the hero heading on the homepage (`index.html`):**

Before:

```html
<h1 class="hero-title">Empowering Children, Building Futures</h1>
```

After:

```html
<h1 class="hero-title">Empowering Young Minds, Shaping Tomorrow</h1>
```

**Tips:**

- Use `Ctrl+F` (or `Cmd+F` on Mac) to search for the text you want to change.
- Only change the text **between** the HTML tags. Don't modify the tag names or attributes (like `class="hero-title"`) unless you know what you're doing.
- Save the file and refresh the browser to see your changes.

---

### 2. Editing the Navigation Menu

The navigation is repeated in every HTML file. If you add/rename a page, you must update the nav in **every** HTML file.

The nav block looks like this (appears in all pages):

```html
<nav class="navbar">
  <div class="container nav-container">
    <a href="index.html" class="nav-logo">Pity</a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="gallery.html">Gallery</a></li>
      <li><a href="updates/index.html">Updates</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </div>
</nav>
```

**Important:** If you add a new page, add a `<li>` entry in every file's nav. Keep the `href` path consistent.

---

### 3. Adding a New Update/News Post

This is the most common content update. Follow these steps:

#### Step 1: Create a new HTML file in the `updates/` folder

Name it using lowercase words separated by hyphens (kebab-case). For example: `updates/summer-camp-2026.html`

#### Step 2: Copy an existing update file as a template

The easiest approach is to duplicate an existing update file (e.g., `updates/annual-sports-day-celebration.html`) and modify it. Here's the template structure every update follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YOUR TITLE - Pity</title>
    <link rel="stylesheet" href="../css/styles.css" />
  </head>
  <body>
    <!-- Navigation (copy from another update file) -->
    <nav class="navbar">
      <div class="container nav-container">
        <a href="../index.html" class="nav-logo">Pity</a>
        <ul class="nav-links">
          <li><a href="../index.html">Home</a></li>
          <li><a href="../about.html">About</a></li>
          <li><a href="../gallery.html">Gallery</a></li>
          <li><a href="../updates/index.html">Updates</a></li>
          <li><a href="../contact.html">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- Update Content -->
    <section class="update-detail">
      <div class="container">
        <a href="index.html" class="back-link">&larr; Back to Updates</a>
        <h1>YOUR UPDATE TITLE</h1>
        <p class="update-date">MONTH DAY, YEAR</p>
        <div class="update-content">
          <p>YOUR CONTENT HERE. You can add multiple paragraphs.</p>
          <p>Another paragraph...</p>
        </div>
      </div>
    </section>

    <!-- Footer (copy from another update file) -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2026 Pity. All rights reserved.</p>
      </div>
    </footer>

    <script src="../js/main.js"></script>
  </body>
</html>
```

**Key things to change in the new file:**

- `<title>` tag
- `<h1>` heading
- `<p class="update-date">` date
- The content inside `<div class="update-content">`
- **Note:** Paths in update files use `../` prefix (e.g., `../css/styles.css`, `../index.html`) because update files are one folder deep.

#### Step 3: Add the new update to the updates listing page

Open `updates/index.html` and add a new card inside the `<div class="updates-grid">` section:

```html
<div class="update-card">
  <div class="update-card-content">
    <span class="update-date">MONTH DAY, YEAR</span>
    <h3>YOUR UPDATE TITLE</h3>
    <p>BRIEF SUMMARY/EXCERPT OF THE UPDATE</p>
    <a href="summer-camp-2026.html" class="btn btn-primary">Read More</a>
  </div>
</div>
```

**Important:** The `href` in the "Read More" link must match your new file's name exactly.

#### Step 4: (Optional) Add the update to the homepage

If you want the new update to appear on the homepage's "Latest Updates" section, open `index.html`, find the `<div class="updates-grid">` section, and add a similar card there. The `href` path will need the `updates/` prefix:

```html
<a href="updates/summer-camp-2026.html" class="btn btn-primary">Read More</a>
```

---

### 4. Adding Images to the Gallery

1. Place image files in an `images/` folder (create one if it doesn't exist — currently the site uses placeholder URLs from picsum.photos).
2. Open `gallery.html` and add a new `<div class="gallery-item">` inside the gallery grid:

```html
<div class="gallery-item">
  <img
    src="images/your-photo.jpg"
    alt="Description of the photo"
    loading="lazy"
  />
</div>
```

**Tips for images:**

- Use `.jpg`, `.png`, or `.webp` formats.
- Optimize images before uploading (use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)) to keep file sizes under 200KB.
- Always add descriptive `alt` text for accessibility.
- Use `loading="lazy"` so images only load when scrolled into view.

---

### 5. Replacing Placeholder Images

The site currently uses placeholder images from `picsum.photos`. To replace with real images:

**Before:**

```html
<img src="https://picsum.photos/seed/xyz/800/600" alt="..." />
```

**After:**

```html
<img src="images/real-photo.jpg" alt="Description of the real photo" />
```

Do this for each image across all pages.

---

### 6. Editing Contact Information

Open `contact.html` and update the contact details directly in the HTML:

```html
<div class="contact-info">
  <div class="contact-item">
    <h3>Email</h3>
    <p>info@pity.org</p>
    <!-- Change this -->
  </div>
  <div class="contact-item">
    <h3>Phone</h3>
    <p>+1 (555) 123-4567</p>
    <!-- Change this -->
  </div>
  <div class="contact-item">
    <h3>Address</h3>
    <p>123 Charity Lane</p>
    <!-- Change this -->
  </div>
</div>
```

---

### 7. Editing the Footer

The footer appears in **every** HTML file. If you change it, update it in all files:

- `index.html`
- `about.html`
- `contact.html`
- `gallery.html`
- `updates/index.html`
- All update post files in `updates/`

---

### 8. Changing Colors / Styling

All styles are in `css/styles.css`. Key things you can change:

- **Primary color:** Search for the main color values (e.g., `#2563eb`, `#1d4ed8`) and replace them site-wide.
- **Fonts:** Look for `font-family` declarations near the top of the CSS file.
- **Spacing/sizing:** Adjust `padding`, `margin`, `font-size` values as needed.

**Tip:** Use `Ctrl+F` in the CSS file to find and replace color values.

---

## 🚢 Deploying Changes

After making and testing your changes locally:

### If using GitHub Pages / Netlify / Vercel:

```bash
git add .
git commit -m "Describe your change here"
git push
```

The site will auto-deploy from your Git repository.

### If using traditional hosting (FTP):

Use an FTP client like [FileZilla](https://filezilla-project.org/) to upload the changed files to your web host, maintaining the same folder structure.

---

## ✅ Pre-Publish Checklist

Before pushing changes live, verify:

- [ ] All changed pages render correctly in the browser
- [ ] All navigation links work (click every link)
- [ ] Images load properly
- [ ] New update posts appear on both the updates listing page and homepage (if added)
- [ ] The footer is consistent across all pages
- [ ] No broken images or missing files
- [ ] Mobile view looks acceptable (resize browser window or use DevTools: `F12` → toggle device toolbar)

---

## ⚠️ Common Pitfalls

| Problem                         | Cause                                    | Fix                                                              |
| ------------------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| Page looks unstyled             | CSS file path is wrong                   | Check `<link>` href — update files need `../css/styles.css`      |
| 404 error on a link             | `href` path doesn't match the file       | Verify file names match exactly (case-sensitive on some servers) |
| Images not showing              | Image path is wrong or file not uploaded | Check `src` path and ensure the image file exists                |
| Nav link broken on update pages | Missing `../` prefix                     | Update pages are in a subfolder, so links need `../` prefix      |
| Changes not showing in browser  | Browser cache                            | Hard refresh with `Ctrl+Shift+R`                                 |

---

This guide covers the most common content update scenarios. Since the site is static HTML, the workflow is always: **edit the file → save → refresh browser → verify → deploy**.
