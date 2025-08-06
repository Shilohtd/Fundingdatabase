# Federal Grants Database - NVCA

Professional, searchable database of federal grant opportunities with National Venture Capital Association branding.

## 🎨 NVCA Brand Integration

Official NVCA color palette:
- **Primary Teal**: #5CB5B5
- **Navy Blue**: #374C6C  
- **Charcoal**: #2D2D2D
- **Light Teal**: #C9DEDD

## 📊 Database Stats

- **Total Grants**: 1,727
- **Generated**: August 06, 2025
- **Data Source**: Grants.gov

## 🚀 Quick Deploy

```bash
cd github-grants-site
git init
git add .
git commit -m "NVCA Grants Database"
git branch -M main
git remote add origin https://github.com/Shilohtd/Fundingdatabase.git
git push -u origin main
```

Enable GitHub Pages: Settings → Pages → Deploy from branch → main

**Live Site**: https://shilohtd.github.io/Fundingdatabase/

## ✨ Features

- Real-time search across all fields
- Advanced filtering (category, status, agency)
- NVCA-branded professional design
- Mobile responsive
- CSV export functionality
- Keyboard accessible
- SEO optimized

## 🔄 Adding New Files

This generator uses a modular system. To add new files:

1. Create a new generator class inheriting from `FileGenerator`
2. Add it to the `FILE_GENERATORS` list in the main script
3. Re-run the script

Example:
```python
class SitemapGenerator(FileGenerator):
    def get_filename(self) -> str:
        return "sitemap.xml"
    
    def generate(self) -> str:
        return "<?xml version='1.0'?>..."
```

## 📱 Browser Support

- Chrome/Edge/Firefox/Safari (latest 2 versions)
- Mobile browsers
- WCAG 2.1 AA compliant

---

**Powered by**: National Venture Capital Association  
**Generated**: August 06, 2025 02:39 PM