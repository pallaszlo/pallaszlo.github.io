# Academic Personal Website

Simple, clean, and professional academic website built with pure HTML, CSS, and JavaScript.

## 🎯 Features

- ✨ Modern, responsive design
- 📱 Mobile-friendly layout
- 🎨 Clean and professional appearance
- 📚 Dynamic publication list loaded from JSON
- 🚀 No build process - just edit and deploy
- 📦 Lightweight and fast loading
- 🔧 Easy to customize

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles
├── js/
│   ├── publications.js    # Publications loading and display
│   └── main.js           # General site functionality
├── data/
│   └── publications.json # Publications data
└── assets/
    ├── cv.pdf            # Your CV (add this)
    └── images/           # Profile photo and other images
```

## 🚀 Quick Start

1. **Clone or download this repository**

2. **Customize the content:**
   - Edit `index.html` to add your information
   - Replace placeholder text with your actual data
   - Add your photo to `assets/images/`
   - Add your CV PDF to `assets/`

3. **Update publications:**
   - Edit `data/publications.json` with your publications
   - The format is self-explanatory

4. **Deploy to GitHub Pages:**
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push origin main
   ```
   
5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "main" branch as source
   - Click Save

Your site will be live at: `https://yourusername.github.io/repository-name/`

## ✏️ Customization Guide

### Change Colors

Edit the color variables in `css/style.css`:

```css
:root {
    --primary-color: #2c3e50;    /* Main color */
    --accent-color: #3498db;      /* Links and accents */
    /* ... other colors ... */
}
```

### Add Your Photo

1. Save your photo as `profile.jpg` in `assets/images/`
2. In `index.html`, replace:
   ```html
   <div class="placeholder-image">LP</div>
   ```
   with:
   ```html
   <img src="assets/images/profile.jpg" alt="László Pál">
   ```

### Update Contact Information

In `index.html`, find the sidebar section and update:
- Email address
- Social media links (Google Scholar, GitHub, ORCID)
- Office location in the Contact section

### Add/Remove Sections

Each section is wrapped in:
```html
<section id="section-name" class="section">
    <!-- content -->
</section>
```

Simply copy/paste this structure to add new sections.

### Customize Publications Display

In `js/publications.js`, you can:
- Change `MAX_INITIAL_PUBLICATIONS` to show more/fewer initially
- Modify the publication HTML template in `createPublicationHTML()`
- Add filtering or sorting options

## 📝 Adding New Publications

Edit `data/publications.json`:

```json
{
    "title": "Your Paper Title",
    "authors": "Author One, Author Two, László Pál",
    "year": 2025,
    "venue": "Journal Name or Conference",
    "type": "journal",  // or "conference", "book", "preprint"
    "doi": "10.xxxx/xxxxx",
    "featured": true  // optional, for highlighting
}
```

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📱 Responsive Design

The site automatically adapts to:
- Desktop (sidebar on left)
- Tablet (sidebar on top)
- Mobile (stacked layout)

## 🔧 No Dependencies

This site uses:
- ✅ Pure HTML5
- ✅ Pure CSS3
- ✅ Vanilla JavaScript
- ❌ No frameworks
- ❌ No build tools
- ❌ No package managers

## 📄 License

Feel free to use this template for your own academic website.

## 🤝 Support

For questions or issues, please contact [your email].

---

Last updated: January 2025
