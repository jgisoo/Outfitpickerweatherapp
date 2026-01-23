# GitHub Pages Deployment Guide

This app is configured to deploy to GitHub Pages. Follow these steps to deploy:

## Prerequisites
- A GitHub account
- This repository pushed to GitHub
- Git installed on your machine

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Push to your repository**
   ```bash
   git add .
   git commit -m "Deploy app"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select **gh-pages** branch and **/ (root)** folder
   - Click **Save**

3. **That's it!** 
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy your app
   - Your app will be available at `https://<your-username>.github.io/<repository-name>`

### Option 2: Manual Deployment

If you prefer to deploy manually from your local machine:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy using gh-pages**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages** (same as Option 1, step 2)

## Troubleshooting

### Issue: App shows 404 or blank page
- **Solution**: Check that GitHub Pages source is set to **gh-pages** branch in repository settings

### Issue: Assets not loading
- **Solution**: Verify `base: './'` is set in `vite.config.ts`

### Issue: Environment variables not working
- **Solution**: Create a `.env.production` file with public variables only (prefixed with `VITE_`)

## Project Structure After Deployment
```
dist/
├── index.html
├── 404.html (for SPA routing)
├── assets/
│   ├── index-*.css
│   └── index-*.js
```

## Notes
- The app uses `base: './'` in Vite config for relative imports
- A 404.html is created during build to support client-side routing
- GitHub Pages is free and automatically updates on each push to main branch
