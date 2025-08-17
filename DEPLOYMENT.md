# Deployment Guide

This guide provides instructions for deploying the Grammar Master LMS to various platforms.

## 🚀 Quick Deploy Options

### Replit Deployment (Recommended for Development)
1. Your project is already set up on Replit
2. Click the "Deploy" button in your Replit workspace
3. Follow the deployment wizard to configure your app
4. Your app will be available at `https://your-app-name.your-username.repl.co`

### Vercel Deployment
1. Push your code to GitHub (see instructions below)
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables in Vercel dashboard
6. Deploy!

### Netlify Deployment
1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com) and sign in
3. Click "New site from Git" and connect your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables in Netlify dashboard
6. Deploy!

## 📦 Environment Variables

Create these environment variables in your deployment platform:

```env
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret-key
DATABASE_URL=your-postgresql-connection-string
PORT=5000
```

## 🗄️ Database Setup

### Using Neon Database (Recommended)
1. Visit [neon.tech](https://neon.tech) and create an account
2. Create a new database project
3. Copy the connection string
4. Add it as `DATABASE_URL` environment variable

### Using Railway PostgreSQL
1. Visit [railway.app](https://railway.app) and create an account
2. Create a new project and add a PostgreSQL database
3. Copy the connection string from the database tab
4. Add it as `DATABASE_URL` environment variable

### Using Supabase
1. Visit [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings > Database and copy the connection string
4. Add it as `DATABASE_URL` environment variable

## 🔧 Production Configuration

### Build Optimization
The project is already configured with:
- Vite for fast builds and optimization
- TypeScript compilation
- CSS minification
- Asset optimization

### Security Considerations
- JWT secrets should be strong and unique
- Database connections should use SSL in production
- Environment variables should never be committed to git
- CORS should be configured for your domain

## 📱 GitHub Setup

Since git operations are restricted in this environment, here's how to set up your GitHub repository:

### 1. Create a New Repository on GitHub
1. Go to [github.com](https://github.com) and create a new repository
2. Name it `grammar-master-lms` or your preferred name
3. Don't initialize with README (we already have one)

### 2. Download Your Project Files
1. In Replit, click the three dots menu
2. Select "Download as zip"
3. Extract the files on your local machine

### 3. Initialize Git and Push
On your local machine, run these commands:

```bash
# Navigate to your project directory
cd grammar-master-lms

# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Complete Grammar Master LMS"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/yourusername/grammar-master-lms.git

# Push to GitHub
git push -u origin main
```

### 4. Alternative: Use GitHub CLI
If you have GitHub CLI installed:

```bash
# Create repository and push
gh repo create grammar-master-lms --public
git add .
git commit -m "Initial commit: Complete Grammar Master LMS"
git push -u origin main
```

## 🚀 Production Checklist

Before deploying to production:

- [ ] Set strong JWT secret
- [ ] Configure production database
- [ ] Set NODE_ENV=production
- [ ] Test all authentication flows
- [ ] Test quiz functionality
- [ ] Test lesson booking
- [ ] Verify email notifications work
- [ ] Test responsive design on mobile
- [ ] Run security audit
- [ ] Set up monitoring and logging
- [ ] Configure domain and SSL
- [ ] Set up backup procedures

## 📊 Monitoring and Analytics

Consider adding these tools for production:
- **Sentry** for error tracking
- **Google Analytics** for user analytics
- **Uptime monitoring** for availability
- **Database monitoring** for performance

## 🔄 Updates and Maintenance

To update your deployed application:
1. Make changes in your development environment
2. Test thoroughly
3. Commit and push to GitHub
4. Your deployment platform will automatically rebuild and deploy

---

Your Grammar Master LMS is ready for deployment! Choose the platform that best fits your needs and follow the appropriate guide above.