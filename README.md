# Federal Grants Database - NVCA Members Only

Professional, authentication-protected grants database for National Venture Capital Association members using Netlify Identity.

## 🔐 Authentication Features

- **Member-Only Access**: Netlify Identity authentication required
- **Secure Login**: Professional login/logout flow
- **User Management**: Admin can invite/manage members
- **Session Handling**: Automatic session management
- **Data Protection**: Grants data only loads after authentication

## 🎨 NVCA Brand Integration

Official NVCA color palette:
- **Primary Teal**: #5CB5B5
- **Navy Blue**: #374C6C  
- **Charcoal**: #2D2D2D

## 📊 Database Stats

- **Total Grants**: 1,727
- **Access Level**: NVCA Members Only
- **Generated**: August 06, 2025
- **Authentication**: Netlify Identity

## 🚀 Netlify Deployment & Setup

### 1. Deploy to Netlify

#### Option A: GitHub → Netlify Auto-Deploy
1. Push your code to GitHub
2. Connect GitHub repo to Netlify
3. Auto-deploys on every push

#### Option B: Manual Deploy
1. Drag and drop your build folder to Netlify
2. Manual updates required

### 2. Enable Netlify Identity

**Critical Step**: Enable authentication in Netlify Dashboard

1. Go to your Netlify site dashboard
2. Navigate to **Site settings → Identity**  
3. Click **"Enable Identity"**
4. Configure settings:
   - **Registration**: Set to **"Invite only"** (recommended for NVCA)
   - **External providers**: Enable Google/GitHub if desired
   - **Email templates**: Customize for NVCA branding

### 3. Invite NVCA Members

In Netlify Dashboard → Identity → Users:
1. Click **"Invite users"**
2. Add NVCA member email addresses  
3. Members will receive invitation emails
4. They can set their passwords and access the database

### 4. Configure Email Templates (Optional)

Customize the invitation and password reset emails:
1. Go to **Site settings → Identity → Emails**
2. Edit templates with NVCA branding
3. Add your organization's messaging

## 🔧 Local Development

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Run locally with Identity
netlify dev
```

This will run the site locally with Netlify Identity working.

## 👥 User Management

### Adding New Members
1. Netlify Dashboard → Identity → Users
2. Click "Invite users"  
3. Enter email addresses
4. Users receive invitation emails

### Managing Existing Members
- View all users in Identity dashboard
- Disable/enable user accounts
- Reset passwords
- View login activity

### Admin Access
Site owners have full admin access through Netlify dashboard.

## 🛡️ Security Features

- **Authentication Required**: No access without login
- **Session Management**: Automatic login/logout handling
- **Secure Data Loading**: Grants data only loads for authenticated users
- **HTTPS Enforced**: All traffic encrypted
- **CSP Headers**: Content Security Policy protection

## 📱 User Experience

### For NVCA Members:
1. Visit the grants database URL
2. See member login screen
3. Click "Member Login" 
4. Enter NVCA credentials
5. Access full grants database
6. Logout when finished

### For Admins:
1. Manage members via Netlify Dashboard
2. Monitor usage and access
3. Customize email templates
4. Control registration settings

## 🔄 Updating the Database

1. Replace `Grants.csv` with new data
2. Run `python nvca_grants_generator.py`
3. Deploy updated files to Netlify
4. Authentication and user accounts remain intact

## 🎯 Live Site

**Members Access**: [Your Netlify URL]
**Admin Dashboard**: https://app.netlify.com/sites/[your-site]/identity

## 📞 Support

**For NVCA Members**: Contact NVCA support for login assistance
**For Admins**: Use Netlify documentation and support

---

**Powered by**: National Venture Capital Association  
**Authentication**: Netlify Identity  
**Generated**: August 06, 2025 03:03 PM

## 🔒 Privacy & Security

This database is for NVCA members only. All data is protected behind authentication and encrypted in transit. Member information is managed through Netlify Identity with enterprise-grade security.