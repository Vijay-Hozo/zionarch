# ZIONARCH Backend API Setup

## Overview
The quote submission now uses a Node.js/Express backend API with Nodemailer instead of Supabase Edge Functions.

## Project Structure
```
backend/
├── server.js              # Express server setup
├── package.json          # Dependencies
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore file
└── routes/
    └── quote.js         # Quote email route handler
```

## Installation & Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- **express**: Web framework
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variable management
- **nodemailer**: Email sending library

### 2. Configure Environment Variables

Create a `.env` file in the `backend` folder by copying `.env.example`:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
BUSINESS_EMAIL=vijay2304a@gmail.com
FRONTEND_URL=http://localhost:5173
```

### 3. Gmail Configuration for Nodemailer

For Gmail SMTP:

1. **Enable 2-Factor Authentication**:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password
   - Use this as `SMTP_PASSWORD` in `.env`

3. **Use your Gmail address** for `SMTP_USER`

### 4. Frontend Configuration

Add to your `.env` file in the root project:

```
VITE_API_URL=http://localhost:5000
```

For production, update this to your deployed backend URL.

## Running the Backend

### Development Mode (with auto-reload)
```bash
cd backend
npm run dev
```

### Production Mode
```bash
cd backend
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{ "status": "Server is running" }
```

### Send Quote Email
```
POST /api/quote
Content-Type: application/json

{
  "projectType": "residential",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "location": "Mumbai, Maharashtra",
  "plotSize": "2400",
  "budget": "50L - 1Cr",
  "timeline": "12-18 months",
  "description": "I want to build a modern 3BHK villa..."
}
```

Response (Success - 200):
```json
{
  "success": true,
  "message": "Quote email sent successfully",
  "data": {
    "businessEmailId": "messageId1",
    "customerEmailId": "messageId2"
  }
}
```

Response (Error - 400/500):
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Email Flow

When a quote is submitted:

1. **Business Email** (to vijay2304a@gmail.com):
   - Contains complete project details
   - Contact information
   - Professional HTML formatting
   - Timestamp of submission

2. **Customer Confirmation Email** (to provided email):
   - Confirms receipt of quote request
   - Sets expectations (24-48 hours response)
   - Professional branding

## Deployment

### Option 1: Deploy to Heroku
```bash
cd backend
heroku create your-app-name
heroku config:set PORT=5000
heroku config:set SMTP_USER=your-email@gmail.com
# ... set all other env variables
git push heroku main
```

### Option 2: Deploy to Render.com
1. Connect your GitHub repository
2. Create new Web Service
3. Set Start Command: `npm start`
4. Add environment variables in the dashboard
5. Deploy

### Option 3: Deploy to DigitalOcean/AWS/VPS
1. Upload code to your server
2. Install Node.js
3. Install dependencies: `npm install`
4. Set environment variables
5. Use PM2 or similar for process management
6. Use Nginx as reverse proxy
7. Enable SSL with Let's Encrypt

## Troubleshooting

### Email not sending?
1. Verify SMTP credentials are correct
2. Check Gmail App Password (not regular password)
3. Ensure 2FA is enabled on Gmail account
4. Check server logs: `npm run dev` output

### CORS errors?
1. Ensure `FRONTEND_URL` in `.env` matches your frontend URL
2. Check that frontend uses correct `VITE_API_URL`
3. Verify API is running on correct port

### Connection refused errors?
1. Check backend is running: `npm run dev`
2. Verify `PORT` in `.env` is correct
3. Check no firewall is blocking the port

## API Usage in Frontend

The QuotePage.tsx already sends requests to the backend API:

```typescript
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const response = await fetch(`${apiUrl}/api/quote`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(quoteData),
});
```

## Security Considerations

1. **Never commit `.env`** - It's in `.gitignore`
2. **Use environment variables** for sensitive data
3. **Validate input** on backend (already implemented)
4. **Use HTTPS** in production
5. **Rate limiting** (optional - can be added with express-rate-limit)
6. **CORS whitelisting** - Only allow your frontend domain

## File Structure

```
backend/
├── server.js                    # Main Express app
├── package.json                # Dependencies
├── .env                         # Environment variables (NOT in git)
├── .env.example                # Template for .env
├── .gitignore                  # Git ignore rules
└── routes/
    └── quote.js                # Quote email endpoint
```

## Next Steps

1. Copy `.env.example` to `.env`
2. Fill in your SMTP credentials
3. Update frontend `VITE_API_URL` in `.env`
4. Run backend: `npm run dev`
5. Test the quote form on your frontend

## Notes

- The backend uses Nodemailer directly (not Supabase)
- All emails are sent through Gmail's SMTP server
- Email templates are generated as HTML with professional styling
- Both business and customer emails are sent automatically
