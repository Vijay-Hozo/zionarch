# Render Deployment Guide for ZIONARCH Backend

## Issue
The `/api/quote` endpoint returns **500 Internal Server Error** in production (Render) but works fine in development. This is because the required environment variables are not configured in Render.

## Root Cause
The backend requires SMTP credentials to send emails, but these environment variables are only set locally in `backend/.env` and are not configured in the Render dashboard.

## Solution: Configure Environment Variables in Render

### Step 1: Access Render Dashboard
1. Go to https://dashboard.render.com
2. Select your backend service (`zionarch-backend` or similar)
3. Click on **"Environment"** in the left sidebar

### Step 2: Add Required Environment Variables

Add the following environment variables by clicking **"Add Environment Variable"**:

| Key | Value | Notes |
|-----|-------|-------|
| `PORT` | `5000` | Optional - Render sets this automatically |
| `SMTP_HOST` | `smtp.gmail.com` | Gmail SMTP server |
| `SMTP_PORT` | `587` | Port for TLS |
| `SMTP_USER` | `ridehopon@gmail.com` | Your Gmail address |
| `SMTP_PASSWORD` | `hhfkxmukpqshjicw` | App-specific password (see below) |
| `BUSINESS_EMAIL` | `vijay2304a@gmail.com` | Where quote emails are sent |
| `NODE_ENV` | `production` | Sets environment mode |

### Step 3: Gmail App Password Setup

If you haven't already created an app-specific password:

1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Select **"Mail"** and your device type
4. Copy the generated 16-character password
5. Use this password for `SMTP_PASSWORD` (no spaces)

> ⚠️ **Important**: Never use your regular Gmail password for SMTP. Always use an app-specific password.

### Step 4: Save and Redeploy

1. After adding all environment variables, click **"Save Changes"**
2. Render will automatically redeploy your service
3. Wait for the deployment to complete (check the logs)

### Step 5: Verify the Fix

Once deployed, check the server logs in Render:

1. Go to your service → **"Logs"** tab
2. Look for the startup message:
   ```
   Server is running on http://localhost:5000
   Environment: production
   SMTP Configuration: { host: 'smtp.gmail.com', user: 'ridehopon@gmail.com', ... }
   ```
3. Verify all SMTP fields show actual values (not "NOT SET")

### Step 6: Test the Endpoint

Test the production endpoint:

```bash
curl -X POST https://zionarch.onrender.com/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "projectType": "Residential",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "description": "Test quote request"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Quote email sent successfully",
  "data": {
    "businessEmailId": "...",
    "customerEmailId": "..."
  }
}
```

## Alternative SMTP Providers

If Gmail is not working or you want a more reliable solution for production:

### Option 1: SendGrid (Recommended for Production)
- Free tier: 100 emails/day
- More reliable than Gmail
- Better deliverability

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=<your-sendgrid-api-key>
```

### Option 2: Mailgun
- Free tier: 100 emails/day for 3 months
- Good deliverability

```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=<your-mailgun-smtp-username>
SMTP_PASSWORD=<your-mailgun-smtp-password>
```

### Option 3: Brevo (formerly Sendinblue)
- Free tier: 300 emails/day
- Great for small projects

```
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=<your-brevo-email>
SMTP_PASSWORD=<your-brevo-smtp-key>
```

## Troubleshooting

### Still getting 500 errors?

1. **Check Render logs** for the error message:
   ```
   Missing SMTP configuration: { SMTP_HOST: false, SMTP_USER: false, ... }
   ```
   → This means environment variables aren't set correctly

2. **Verify environment variables** in Render dashboard
   - Make sure there are no typos
   - Check for extra spaces in values
   - Ensure password is the app-specific password, not regular Gmail password

3. **Test SMTP credentials locally**:
   ```bash
   cd backend
   node -e "
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     auth: {
       user: 'ridehopon@gmail.com',
       pass: 'hhfkxmukpqshjicw'
     }
   });
   transporter.verify().then(() => console.log('✓ SMTP OK')).catch(console.error);
   "
   ```

4. **Gmail blocking access?**
   - Make sure 2FA is enabled
   - Use app-specific password, not regular password
   - Check https://myaccount.google.com/security for any blocks

### Emails not being received?

1. **Check spam folder** - automated emails often go to spam
2. **Verify sender reputation** - new Gmail accounts may have delivery issues
3. **Consider using a dedicated email service** like SendGrid for better deliverability

## Security Best Practices

### Don't Commit Secrets
Make sure your `.env` files are in `.gitignore`:

```gitignore
# Environment variables
.env
.env.local
.env.production
backend/.env
```

### Rotate Credentials Regularly
- Regenerate app-specific passwords every 6-12 months
- Use different passwords for dev and production if possible

### Use Secrets Management
For enterprise projects, consider:
- AWS Secrets Manager
- HashiCorp Vault
- Render's Secret Files feature

## Quick Checklist

- [ ] Environment variables added in Render dashboard
- [ ] App-specific password generated for Gmail
- [ ] Service redeployed in Render
- [ ] Logs show SMTP configuration loaded
- [ ] Test request returns 200 OK
- [ ] Emails received in `vijay2304a@gmail.com`
- [ ] Customer confirmation emails working

## Need Help?

If issues persist after following this guide:

1. Check Render logs for detailed error messages
2. Verify SMTP credentials work locally first
3. Try the `/api/health` endpoint to ensure server is running
4. Contact Render support if deployment issues persist

## Related Files
- [backend/routes/quote.js](backend/routes/quote.js) - Quote email handler
- [backend/server.js](backend/server.js) - Express server configuration
- [backend/.env.example](backend/.env.example) - Environment variable template
- [QUOTE_EMAIL_SETUP.md](QUOTE_EMAIL_SETUP.md) - Original setup guide
