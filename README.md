# Protected Federal Grants Database

A professional, searchable database of federal grant opportunities with **Netlify Identity authentication** - optimized for GitHub Pages.

## 🔐 Security Features

- **Netlify Identity Authentication**: Secure login/signup system
- **Protected Content**: Database only accessible after authentication
- **User Management**: Easy user administration through Netlify dashboard
- **Session Management**: Automatic login/logout handling

## 🚀 Database Features

- **Fast Search**: Real-time search across all grant fields
- **Advanced Filtering**: Filter by category, status, and agency
- **Responsive Design**: Works perfectly on all devices
- **Professional UI**: Clean, modern interface with authentication
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
- `index.html` (with authentication)
- `styles.css` (with login styling)
- `app.js` (with Netlify Identity integration)
- `grants_data.json`
- `README.md`

### 4. Deploy to Netlify

**Option A: Connect GitHub to Netlify**
1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Deploy settings: Build command: (leave empty), Publish directory: (leave empty)
5. Click "Deploy site"

**Option B: Manual Upload**
1. Drag and drop your files to Netlify's deploy area

### 5. Enable Netlify Identity 🔑

**CRITICAL STEP - This enables authentication:**

1. In your Netlify dashboard, go to your site
2. Click **"Site settings"** → **"Identity"**
3. Click **"Enable Identity"**
4. Configure these settings:
   - **Registration**: Set to "Invite only" or "Open" (your choice)
   - **External providers**: Enable Google, GitHub, etc. if desired
   - **Email templates**: Customize welcome/confirmation emails if needed

### 6. Access Your Protected Database

Your database will be available at:
`https://[your-site-name].netlify.app/`

**Note**: Users will see a login screen first, then access the grants database after authentication.

## 👥 User Management

### Adding Users (If set to "Invite Only"):
1. Go to Netlify dashboard → Your site → Identity → Users
2. Click "Invite users"
3. Enter email addresses
4. Users will receive invitation emails

### Managing Users:
- View all registered users in the Identity tab
- Delete users if needed
- Monitor login activity
- Assign roles (if you implement role-based access)

## 🎯 Customization

### Update Data

To update the grants data:
1. Replace `Grants.csv` with new data
2. Run the Python script again
3. Upload the new `grants_data.json`
4. Redeploy to Netlify

### Styling

Modify `styles.css` to customize:
- Colors (CSS custom properties at top)
- Login screen appearance
- Layout and spacing
- Typography
- Mobile responsiveness

### Authentication Settings

In Netlify Identity settings:
- **Registration**: Open vs Invite-only
- **External providers**: Google, GitHub, etc.
- **Email templates**: Customize messaging
- **Site URL**: Set for email links

### Features

Modify `app.js` to add:
- Additional filters
- Different sorting options
- Export formats
- Analytics tracking
- Role-based permissions

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
3. Redeploy to Netlify

## 🚧 Troubleshooting

### Authentication Issues
- **Login screen not appearing**: Check Netlify Identity is enabled
- **Can't create accounts**: Check registration settings in Netlify Identity
- **Email not working**: Verify domain settings in Netlify

### Large File Issues
If `grants_data.json` is too large (>100MB):
1. Split data into multiple files
2. Use pagination to load data chunks
3. Consider using Netlify Large Media

### Performance Issues
If the site loads slowly:
1. Reduce page size in `app.js`
2. Implement virtual scrolling
3. Add search result limits

## 🔐 Security Notes

- **Data Protection**: Only authenticated users can access the grants database
- **HTTPS**: Netlify provides automatic HTTPS
- **User Data**: Netlify Identity handles secure user storage
- **No Backend Required**: All authentication handled by Netlify's infrastructure

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
3. For Netlify Identity issues, check [Netlify's documentation](https://docs.netlify.com/visitor-access/identity/)

---

**Data Source**: [Grants.gov](https://www.grants.gov)  
**Authentication**: [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)  
**Generated**: [Date will be auto-populated]  
**Version**: 2.0.0 (With Authentication)