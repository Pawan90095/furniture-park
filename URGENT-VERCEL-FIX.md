# 🚨 URGENT: Update Vercel Environment Variables

## The Problem

Vercel is using **OLD credentials** from environment variables:
- Current on Vercel: `rzp_test_RwA***` ❌
- New credentials: `rzp_test_S2VrB9WBQb7j5L` ✅

## Step-by-Step Fix (MUST DO THIS NOW!)

### 1. Open Vercel Dashboard
Click this link: [https://vercel.com/dashboard](https://vercel.com/dashboard)

### 2. Select Your Project
- Click on **furniture-park** (or your project name)

### 3. Go to Settings
- Click the **Settings** tab at the top

### 4. Click Environment Variables
- In the left sidebar, click **Environment Variables**

### 5. Update RAZORPAY_KEY_ID
Find the existing `RAZORPAY_KEY_ID` variable:
- Click the **⋯** (three dots) next to it
- Click **Edit**
- Replace the value with: `rzp_test_S2VrB9WBQb7j5L`
- Make sure all environments are selected (Production, Preview, Development)
- Click **Save**

### 6. Update RAZORPAY_KEY_SECRET
Find the existing `RAZORPAY_KEY_SECRET` variable:
- Click the **⋯** (three dots) next to it
- Click **Edit**
- Replace the value with: `9W71jj1bq1Erc8y2hiuxhWMJ`
- Make sure all environments are selected (Production, Preview, Development)
- Click **Save**

### 7. Redeploy
**CRITICAL**: Environment variable changes don't apply automatically!

Go to the **Deployments** tab:
- Find your latest deployment
- Click the **⋯** (three dots) on the right
- Select **Redeploy**
- Wait for deployment to complete (~2 minutes)

### 8. Verify
After redeployment, check this URL:
```
https://furniture-park-pawan-jaats-projects.vercel.app/api/payment/status
```

Should show:
```json
{
  "keyIdPrefix": "rzp_test_S2V***",  ← Should be S2V now!
  "source": "environment_variable"
}
```

### 9. Test Payment
Try the payment again - it should work!

---

## Why This Happened

Vercel stores environment variables separately from your code. When you update credentials in code, Vercel still uses the old ones from environment variables (which take priority). You MUST update them in the Vercel dashboard.

## Alternative - Quick Test Without Vercel Dashboard

If you want to test immediately without touching Vercel settings, I can:
1. Remove the environment variable dependency
2. Make the fallback values take priority
3. Deploy that change

Let me know which approach you prefer!
