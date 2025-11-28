# 🚀 Vercel Deployment Guide

## Heart Disease Prediction System - Deployment Steps

---

## ✅ Pre-Deployment Checklist

Your project is now **ready for Vercel deployment**! The following configurations have been added:

### Files Created/Modified:
- ✅ `vercel.json` - Vercel serverless configuration
- ✅ `package.json` - Added build scripts and Node.js engine
- ✅ `server.js` - Updated for serverless compatibility
- ✅ `.env.example` - Environment variables template
- ✅ API URLs updated to use relative paths (not localhost)
- ✅ README.md updated with deployment instructions

---

## 🌐 Deploy to Vercel (3 Simple Steps)

### Method 1: Using Your Link (Recommended)

1. **Click your Vercel deployment link:**
   ```
   https://vercel.com/new/clone?repository-name=Prediction&s=https%3A%2F%2Fgithub.com%2Farpit58%2FPrediction.git&teamSlug=arpit-patels-projects-a985ece5
   ```

2. **Configure Environment Variables:**
   
   In the Vercel deployment screen, add these environment variables:
   
   | Name | Value | Description |
   |------|-------|-------------|
   | `JWT_SECRET` | `your_super_secret_key_12345` | Secure random string for JWT tokens |
   | `NODE_ENV` | `production` | Environment mode |
   
   **Important:** Replace `your_super_secret_key_12345` with a strong, random secret key!

3. **Click "Deploy"**
   
   Vercel will:
   - Clone your GitHub repository
   - Install dependencies
   - Build and deploy your app
   - Provide you with a live URL

---

### Method 2: Manual Deployment

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import GitHub Repository:**
   - Select "arpit58/Prediction"
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** Leave default
   - **Output Directory:** Leave default

4. **Add Environment Variables:**
   ```
   JWT_SECRET=your_super_secret_key_here
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes for deployment

---

## 🔐 Environment Variables Explained

### Required Variables:

#### `JWT_SECRET` (REQUIRED)
- **Purpose:** Secures JWT authentication tokens
- **How to generate:** Use a random string generator
- **Example:** `kJ8mN2pQ5rT9wX3zA7bC4dF6gH1jL0vB`
- **Security:** Never share this publicly!

#### `NODE_ENV` (REQUIRED)
- **Purpose:** Tells the app it's in production
- **Value:** Always set to `production`

---

## 📝 Post-Deployment Steps

### 1. Test Your Deployed App

Once deployed, Vercel will give you a URL like:
```
https://prediction-xyz123.vercel.app
```

**Test these features:**
- ✅ Visit the homepage
- ✅ Sign up with a new account
- ✅ Login with demo credentials
- ✅ Access dashboard
- ✅ Make a prediction

### 2. Demo Credentials

Your app includes demo accounts:

**Patient Account:**
- Email: `patient@example.com`
- Password: `password123`

**Employee Account:**
- Email: `employee@example.com`
- Password: `password123`

### 3. Custom Domain (Optional)

To add a custom domain:
1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow DNS configuration instructions

---

## 🔧 Troubleshooting

### Issue: "Internal Server Error"

**Solution:**
- Check environment variables are set correctly
- Verify `JWT_SECRET` is added in Vercel dashboard
- Check deployment logs in Vercel

### Issue: "API calls failing"

**Solution:**
- API URLs are now relative (`/api` instead of `http://localhost:3000/api`)
- Changes have been pushed to GitHub
- Redeploy if needed

### Issue: "Module not found"

**Solution:**
- Ensure `package.json` has all dependencies
- Check Node.js version (requires >= 14.x)
- Redeploy to reinstall dependencies

---

## 📊 Vercel Configuration Details

### `vercel.json` Explanation:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

- **builds:** Tells Vercel to use Node.js runtime
- **routes:** Routes all requests to `server.js`
- API routes handled under `/api/*`
- Static files served from `/public`

---

## 🔄 Updating Your Deployed App

When you make changes:

1. **Commit changes:**
   ```powershell
   git add .
   git commit -m "Your update message"
   ```

2. **Push to GitHub:**
   ```powershell
   git push
   ```

3. **Automatic deployment:**
   - Vercel automatically detects GitHub push
   - Deploys new version in ~1 minute
   - No manual action needed!

---

## 🎯 What Happens During Deployment?

1. **Vercel clones your GitHub repo**
2. **Installs Node.js dependencies** (`npm install`)
3. **Runs build script** (if any)
4. **Creates serverless functions** from `server.js`
5. **Deploys to CDN** (globally distributed)
6. **Provides HTTPS URL** (automatic SSL)

---

## ✨ Deployment Features

Your Vercel deployment includes:

- ✅ **Automatic HTTPS** - Free SSL certificate
- ✅ **Global CDN** - Fast worldwide access
- ✅ **Auto-scaling** - Handles traffic spikes
- ✅ **Zero downtime** - Seamless updates
- ✅ **Continuous deployment** - Auto-deploy on push
- ✅ **Environment variables** - Secure config
- ✅ **Deployment logs** - Debug easily

---

## 🌟 Next Steps

After successful deployment:

1. **Share your live URL** with users
2. **Test all features** thoroughly
3. **Monitor deployment logs** in Vercel dashboard
4. **Set up custom domain** (optional)
5. **Configure analytics** (optional)

---

## 📞 Support

If you encounter issues:

1. **Check Vercel Logs:**
   - Vercel Dashboard → Your Project → Deployments
   - Click on latest deployment
   - View "Functions" or "Build" logs

2. **Vercel Documentation:**
   - https://vercel.com/docs

3. **GitHub Repository:**
   - https://github.com/arpit58/Prediction

---

## 🎉 Success Checklist

- [ ] Clicked Vercel deployment link
- [ ] Connected GitHub repository
- [ ] Added `JWT_SECRET` environment variable
- [ ] Added `NODE_ENV=production` variable
- [ ] Clicked "Deploy" button
- [ ] Waited for deployment to complete
- [ ] Tested live URL
- [ ] Logged in with demo credentials
- [ ] Tested prediction feature
- [ ] Verified all pages work

---

**🚀 Your app is now live and ready for production use!**

**Deployment URL:** (Will be provided by Vercel after deployment)

**GitHub Repo:** https://github.com/arpit58/Prediction

---

*Last Updated: November 28, 2025*
