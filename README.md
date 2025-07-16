# Federal Grants Database

A professional, searchable database of federal grant opportunities optimized for GitHub Pages.

## 🚀 Features

- **Fast Search**: Real-time search across all grant fields
- **Advanced Filtering**: Filter by category, status, and agency
- **Responsive Design**: Works perfectly on all devices
- **Professional UI**: Clean, modern interface
- **Keyboard Navigation**: Fully accessible with keyboard
- **CSV Export**: Download filtered results
- **SEO Optimized**: Meta tags and structured data
- **Performance Optimized**: Lazy loading and efficient rendering

## 📊 Database Stats

- **Total Grants**: [Will be populated by script]
- **Last Updated**: [Will be populated by script]
- **Data Source**: Grants.gov

## 🔧 Setup Instructions

### 1. Generate the Files

Run the Python script to generate all necessary files:

```bash
python github_grants_generator.py
```

### 2. Create GitHub Repository

1. Create a new repository on GitHub
2. Clone it locally:
   ```bash
   git clone https://github.com/Shilohtd/Fundingdatabase.git
   ```

### 3. Upload Files

Copy these generated files to your repository:
- `index.html`
- `styles.css`
- `app.js`
- `grants_data.json`
- `README.md`

### 4. Enable GitHub Pages

1. Go to your repository settings
2. Scroll to "Pages" section
3. Select source: "Deploy from a branch"
4. Choose branch: `main` (or `master`)
5. Choose folder: `/ (root)`
6. Click "Save"

### 5. Access Your Database

Your database will be available at:
`https://shilohtd.github.io/Fundingdatabase/`

## 🎯 Customization

### Update Data

To update the grants data:
1. Replace `Grants.csv` with new data
2. Run the Python script again
3. Upload the new `grants_data.json`
4. Commit and push changes

### Styling

Modify `styles.css` to customize:
- Colors (CSS custom properties at top)
- Layout and spacing
- Typography
- Mobile responsiveness

### Features

Modify `app.js` to add:
- Additional filters
- Different sorting options
- Export formats
- Analytics tracking

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## 🔍 SEO Features

- Semantic HTML structure
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Structured data markup
- Fast loading performance
- Mobile-first design

## 📈 Analytics

To add Google Analytics:
1. Uncomment the Analytics section in `index.html`
2. Replace `GA_TRACKING_ID` with your tracking ID
3. Redeploy to GitHub Pages

## 🚧 Troubleshooting

### Large File Issues
If `grants_data.json` is too large (>100MB):
1. Split data into multiple files
2. Use pagination to load data chunks
3. Consider using GitHub LFS for large files

### Performance Issues
If the site loads slowly:
1. Reduce page size in `app.js`
2. Implement virtual scrolling
3. Add search result limits

### CORS Issues
If loading locally:
1. Use a local server (e.g., `python -m http.server`)
2. Don't open `index.html` directly in browser

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues:
1. Check the [Issues](https://github.com/Shilohtd/Fundingdatabase/issues) page
2. Create a new issue if needed
3. Provide detailed information about the problem

---

**Data Source**: [Grants.gov](https://www.grants.gov)  
**Generated**: [Date will be auto-populated]  
**Version**: 1.0.0