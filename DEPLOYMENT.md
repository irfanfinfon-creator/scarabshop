# Deployment Guide

This guide covers deploying the e-commerce MVP to production.

## Architecture Overview

- **Frontend**: Cloudflare Pages (static hosting)
- **Backend**: Supabase (already deployed)
- **Database**: PostgreSQL via Supabase (already deployed)

## Prerequisites

- Git repository with your code
- Cloudflare account
- Supabase project (already set up)

## Step 1: Prepare Database

### Apply Migrations

Migrations have already been applied to your Supabase database. You can verify in the Supabase dashboard:
1. Go to Table Editor
2. Confirm all tables exist: profiles, products, categories, orders, etc.

### Seed Sample Data (Optional)

To add sample products for testing:
1. Go to Supabase SQL Editor
2. Copy contents of `scripts/seed-database.sql`
3. Run the SQL script
4. Verify products appear in the products table

### Create Admin User

1. Sign up for an account on your live site
2. In Supabase dashboard > Table Editor > profiles
3. Find your user record
4. Set `is_admin` to `true`
5. Refresh your site and access Admin Panel

## Step 2: Deploy Frontend to Cloudflare Pages

### Option A: Via Git Integration (Recommended)

1. Push code to GitHub/GitLab
2. Log into Cloudflare Dashboard
3. Go to Workers & Pages > Create application > Pages > Connect to Git
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
6. Add environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
7. Click "Save and Deploy"

### Option B: Direct Upload

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy
wrangler pages deploy dist --project-name=shophub
```

## Step 3: Configure Custom Domain (Optional)

1. In Cloudflare Pages settings
2. Go to Custom domains
3. Add your domain
4. Update DNS records as instructed

## Step 4: Post-Deployment Verification

### Test Customer Flow
1. Browse products without login
2. Sign up for new account
3. Add products to cart
4. Complete checkout
5. View order history
6. Update profile

### Test Admin Flow
1. Login as admin user
2. Access Admin Panel
3. Create a test product
4. View orders dashboard
5. Update order status

## Environment Variables Reference

### Required Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these from Supabase Dashboard > Settings > API

## Security Checklist

- [ ] RLS policies enabled on all tables
- [ ] Admin role properly restricted
- [ ] Environment variables set in Cloudflare
- [ ] HTTPS enabled (automatic with Cloudflare)
- [ ] Rate limiting configured in Supabase
- [ ] Email confirmations disabled (or configured)

## Performance Optimization

### Cloudflare Settings
1. Enable auto-minification (JS, CSS, HTML)
2. Enable Brotli compression
3. Configure caching rules
4. Enable HTTP/3

### Supabase Settings
1. Enable connection pooling
2. Configure database backups
3. Set up monitoring alerts
4. Review and optimize slow queries

## Monitoring

### Cloudflare Analytics
- Page views and unique visitors
- Response times
- Error rates
- Geographic distribution

### Supabase Monitoring
- Database query performance
- Auth usage
- API request volume
- Error logs

## Rollback Procedure

### Cloudflare Pages
1. Go to Deployments tab
2. Find previous working deployment
3. Click "Rollback to this deployment"

### Database Migrations
Migrations cannot be easily rolled back. Best practices:
1. Test migrations in development first
2. Take database snapshot before major changes
3. Use Supabase point-in-time recovery if needed

## Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies installed
- Review build logs in Cloudflare dashboard

### Connection Issues
- Verify environment variables are set
- Check Supabase project status
- Confirm RLS policies allow access

### Authentication Problems
- Check email settings in Supabase
- Verify redirect URLs configured
- Review auth logs in Supabase dashboard

## Scaling Considerations

### Database
- Supabase automatically scales connections
- Upgrade plan for more concurrent connections
- Consider read replicas for high traffic

### Frontend
- Cloudflare Pages scales automatically
- No configuration needed
- Pay only for builds and requests

## Cost Estimation

### Supabase (Free tier includes)
- 500MB database
- 2GB file storage
- 50,000 monthly active users
- Upgrade: Starting at $25/month

### Cloudflare Pages
- Unlimited requests
- Unlimited bandwidth
- 500 builds/month free
- Additional builds: $5 per 500

## Next Steps

1. Set up monitoring and alerts
2. Configure email service for notifications
3. Integrate payment gateway (Stripe recommended)
4. Set up automated backups
5. Implement CI/CD pipeline
6. Add error tracking (Sentry)
7. Configure analytics (Google Analytics)

## Support Resources

- Supabase Docs: https://supabase.com/docs
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages
- Community Support: GitHub Issues
