# Razorpay Environment Variables Setup Guide

## ⚠️ CRITICAL: Vercel Environment Variables

Your payment authentication is failing because the Razorpay credentials are not properly set on Vercel. Follow these steps:

### Step 1: Open Vercel Dashboard
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **furniture-park**
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add/Update These Environment Variables

Add or update the following variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `RAZORPAY_KEY_ID` | `rzp_live_S1SDwHGOyh7OzV` | Production, Preview, Development |
| `RAZORPAY_KEY_SECRET` | `jjqDENOmOvx2d5zd1jsl1KHG` | Production, Preview, Development |

**Important Notes:**
- Make sure to select **ALL environments** (Production, Preview, Development) when adding each variable
- The values must be **exact** - no extra spaces or quotes
- After adding, you MUST redeploy for changes to take effect

### Step 3: Redeploy Your Application

After adding the environment variables:

1. Go to the **Deployments** tab
2. Click on the **3 dots (⋯)** next to your latest deployment
3. Select **Redeploy**
4. Choose **Use existing Build Cache** or start fresh
5. Wait for deployment to complete

### Step 4: Verify the Fix

After redeployment:
1. Go to your website
2. Try to make a payment
3. Check the Vercel logs (Runtime Logs) to see the new debug output:
   - Look for: `🔐 Razorpay Configuration:`
   - Should show: `isLive: true`, `source: 'env'`

---

## Local Testing (Optional)

If you want to test locally, create a `.env` file in the `server` folder:

```env
RAZORPAY_KEY_ID=rzp_live_S1SDwHGOyh7OzV
RAZORPAY_KEY_SECRET=jjqDENOmOvx2d5zd1jsl1KHG
```

**Note:** The code now has these as fallback values, so it should work even without the .env file.

---

## What I Fixed

1. ✅ Updated fallback credentials to use **live** Razorpay keys instead of test keys
2. ✅ Added comprehensive error logging with emojis for easy debugging
3. ✅ Added authentication error detection and clearer error messages
4. ✅ Added validation checks before making API calls
5. ✅ Improved error handling throughout the payment flow

The code will now show detailed logs in Vercel that will help us debug if there are still issues.
