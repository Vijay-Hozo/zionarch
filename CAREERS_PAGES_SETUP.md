# New Careers Pages Implementation

## Overview
Created two separate career application pages with dedicated backend APIs:
1. **Work At ZIONARCH** - For professional positions
2. **Internship** - For internship applications

## Frontend Pages Created

### 1. WorkAtPage (`src/pages/WorkAtPage.tsx`)
- **Route:** `/work-at`
- **Fields:**
  - Full Name (required)
  - Email Address (required)
  - Institute of Architecture (required)
  - Year of Graduation (required)
  - Additional Qualifications (Masters, Summer Courses, Workshops)
  - Previous Work Experience
  - Online Portfolio Link (required)
  - Other Attachments/Links (optional)

### 2. InternshipPage (`src/pages/InternshipPage.tsx`)
- **Route:** `/internship`
- **Fields:**
  - Full Name (required)
  - Email Address (required)
  - Institute of Architecture (required)
  - Your Portfolio (PDF/URL) (required)
  - Previous Internship Experience (optional)
  - Internship Batch (required) - Dropdown with multiple batch options
  - Internship Start Date (required)
  - Internship Duration in Days (required)
  - Other Attachments/Links (optional)

## Backend APIs Created

### 1. Work Application API
- **Endpoint:** `POST /api/work-application`
- **File:** `backend/routes/work-application.js`
- **Handler:** `sendWorkApplicationEmail`
- **Emails Sent:**
  - Business email to HR (detailed application)
  - Confirmation email to applicant

### 2. Internship Application API
- **Endpoint:** `POST /api/internship-application`
- **File:** `backend/routes/internship-application.js`
- **Handler:** `sendInternshipApplicationEmail`
- **Emails Sent:**
  - Business email to HR (detailed application)
  - Confirmation email to applicant

## API Request Format

### Work Application
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "institution": "MIT",
  "yearOfGraduation": "2023",
  "additionalQualifications": "Masters in Architecture",
  "previousWorkExperience": "XYZ Firm, 2 years",
  "portfolioLink": "https://portfolio.com",
  "otherAttachments": "recommendation letter link"
}
```

### Internship Application
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "institution": "Harvard",
  "portfolioUrl": "https://portfolio.pdf",
  "previousInternships": "Interned at ABC Firm",
  "internshipBatch": "Jan-Mar 2025",
  "startDate": "2025-01-10",
  "internshipDuration": "60",
  "otherAttachments": "recommendation letter"
}
```

## Routes Added

### Frontend Routes
- `/work-at` - Work Application Page
- `/internship` - Internship Application Page

### Backend Routes
- `POST /api/work-application` - Work application submission
- `POST /api/internship-application` - Internship application submission

## Features

✅ Form validation (required fields)
✅ Email format validation
✅ Loading states with spinner animation
✅ Success/Error toast notifications
✅ Professional HTML email templates
✅ Both business and applicant confirmation emails
✅ Form reset after successful submission
✅ Responsive design (mobile & desktop)
✅ Similar to KSM India's implementation

## Email Templates

Both applications send professional HTML emails with:
- Applicant details
- Application information
- Links/URLs
- Timestamp
- Professional branding
- Confirmation messages

## Environment Variables

Ensure your `backend/.env` contains:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
BUSINESS_EMAIL=vijay2304a@gmail.com
HR_EMAIL=hr@zionarch.com
FRONTEND_URL=http://localhost:8081
```

## Navigation Links

Update your navigation/header to include:
- `/work-at` - "Work At ZIONARCH"
- `/internship` - "Internship Program"

Or keep the `/careers` page and add links to both new pages.

## Testing

To test locally:

1. **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start frontend:**
   ```bash
   npm run dev
   ```

3. **Test URLs:**
   - http://localhost:5173/work-at
   - http://localhost:5173/internship

## Notes

- Both pages follow the same structure as KSM India's implementation
- Email sending uses the same Nodemailer configuration as quote and internship emails
- Batch options for internship are customizable in the SelectContent
- All form fields are properly validated before submission
