# Quote Email Integration Setup Guide

## Overview
The quote form now sends email notifications to `vijay2304a@gmail.com` using a Supabase Edge Function with Nodemailer.

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your Supabase project:

**In Supabase Dashboard → Project Settings → Environment Variables:**

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
```

### 2. Gmail Configuration

For Gmail SMTP:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password
   - Use this as `SMTP_PASSWORD`

3. Use your full Gmail address for `SMTP_USER`

### 3. Update Supabase URL

In [QuotePage.tsx](src/pages/QuotePage.tsx), replace the placeholder URL:

```typescript
const response = await fetch(
  "https://yoursupabaseprojectid.supabase.co/functions/v1/send-quote-email",
```

Replace `yoursupabaseprojectid` with your actual Supabase project ID.

### 4. Verify VITE_SUPABASE_ANON_KEY

Ensure your `.env.local` file contains:
```
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Email Flow

### When a user submits the quote form:

1. **Email sent to business**: vijay2304a@gmail.com
   - Contains full quote details
   - Formatted professionally
   - Includes all contact information and project details

2. **Confirmation email sent to customer**
   - Confirms receipt of their quote request
   - Sets expectations for response time (24-48 hours)
   - Professional branding

3. **User sees success message**
   - Toast notification appears
   - Form resets
   - Ready for new submissions

## Optional: WhatsApp Integration

To also send a WhatsApp message, uncomment this line in the handleSubmit function:

```typescript
// Uncomment this line to enable WhatsApp
window.open(waUrl, "_blank");
```

## Troubleshooting

### Email not sending?

1. **Check environment variables** are properly set in Supabase Dashboard
2. **Verify SMTP credentials** by testing in a separate service
3. **Check Supabase Function logs**:
   - Go to Supabase Dashboard → Edge Functions → send-quote-email
   - Check the logs for error messages
4. **Verify firewall rules** if using corporate email

### CORS Issues?

The function includes CORS headers for browser requests. If you still encounter issues:

1. Verify the function is deployed
2. Check the response headers include `Access-Control-Allow-Origin: *`

### Permission Errors?

Make sure your SMTP user has permission to send emails. For Gmail:
- App Password must be used (not regular password)
- 2FA must be enabled first

## Function Details

**File**: `supabase/functions/send-quote-email/index.ts`

- Uses Deno SMTP client for sending emails
- Accepts POST requests with quote form data
- Sends two emails:
  1. To business email with full details
  2. To customer email as confirmation
- Returns JSON response with success/error status

## Additional Customizations

### Change recipient email:
Edit this line in the Edge Function:
```typescript
const businessEmail = "vijay2304a@gmail.com";
```

### Customize email templates:
Modify the HTML in `emailHTML` or `confirmationHTML` variables

### Add more recipients:
Modify the email sending logic to send to multiple addresses
