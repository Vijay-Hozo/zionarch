import nodemailer from 'nodemailer';

// Create transporter (lazy initialization)
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const isSecure = port === 465;

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: isSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });
  }
  return transporter;
};

const parseDataUrlFile = (file) => {
  if (!file || !file.dataUrl) {
    return null;
  }

  const match = file.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    return null;
  }

  const contentType = file.type || match[1];
  return {
    filename: file.name || 'attachment',
    content: Buffer.from(match[2], 'base64'),
    contentType,
  };
};

/**
 * Generate plain text email for business (internship application)
 */
const generateInternshipBusinessEmailText = (formData) => {
  return `
New internship application received.

Personal Information:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Contact Number: ${formData.contactNumber}
- Qualification: ${formData.qualification}

Portfolio: ${formData.portfolioLink || 'Not provided'}
CV: ${formData.cvFile?.name || 'Attached'}

Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `.trim();
};

/**
 * Generate HTML email for business (internship application)
 */
const generateInternshipBusinessEmailHTML = (formData) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #e63946; border-bottom: 3px solid #e63946; padding-bottom: 15px; margin-top: 0;">New Internship Application</h1>
        
        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Personal Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; width: 35%;">
                <strong style="color: #555;">Full Name:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${formData.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                <strong style="color: #555;">Email:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                <a href="mailto:${formData.email}" style="color: #e63946; text-decoration: none;">${formData.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                <strong style="color: #555;">Contact Number:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${formData.contactNumber}</td>
            </tr>
            
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                <strong style="color: #555;">Qualification:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${formData.qualification}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Uploads</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">
                <strong style="color: #555;">CV</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${formData.cvFile?.name || 'Attached'}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e0e0e0;">
                <strong style="color: #555;">Portfolio</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${formData.portfolioLink || 'Not provided'}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="color: #999; font-size: 12px; margin: 0;">This is an automated notification from ZIONARCH.</p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Generate plain text confirmation email for applicant
 */
const generateInternshipApplicantEmailText = (name) => {
  return `
Dear ${name},

Thank you for applying for an internship at ZIONARCH! We have received your application and our HR team will review it shortly.

What happens next?
Our HR team will carefully review your application and reach out to you within 5-7 business days to discuss next steps. We appreciate your interest in joining the ZIONARCH internship program!

If you have any questions in the meantime, feel free to contact us at hr@zionarch.com

Best regards,
ZIONARCH Team
Architecture & Design
Building spaces that inspire life
  `.trim();
};

/**
 * Generate HTML confirmation email for applicant
 */
const generateInternshipApplicantEmailHTML = (name) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #e63946; text-align: center; margin-top: 0;">Internship Application Received!</h1>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Dear <strong>${name}</strong>,
        </p>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Thank you for applying for an internship at ZIONARCH! We have received your application and our HR team will review it shortly.
        </p>

        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #e63946; margin: 20px 0;">
          <p style="color: #555; margin: 0; font-size: 14px;">
            <strong>What happens next?</strong><br>
            Our HR team will carefully review your application and reach out to you within 5-7 business days to discuss next steps. We appreciate your interest in joining the ZIONARCH internship program!
          </p>
        </div>

        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          If you have any questions in the meantime, feel free to contact us at <a href="mailto:hr@zionarch.com" style="color: #e63946; text-decoration: none;">hr@zionarch.com</a>
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">ZIONARCH - Architecture & Design<br>Building spaces that inspire life</p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Send internship application email handler
 */
export const sendInternshipApplicationEmail = async (req, res) => {
  try {
    const { fullName, email, contactNumber, qualification, portfolioLink, cvFile } = req.body;

    // Validation
    if (!fullName || !email || !contactNumber || !qualification || !cvFile) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, contactNumber, qualification, cvFile',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.BUSINESS_EMAIL || !process.env.SMTP_FROM) {
      console.error('Missing SMTP configuration for internship email:', {
        SMTP_HOST: !!process.env.SMTP_HOST,
        SMTP_USER: !!process.env.SMTP_USER,
        SMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
        BUSINESS_EMAIL: !!process.env.BUSINESS_EMAIL,
        SMTP_FROM: !!process.env.SMTP_FROM,
      });
      return res.status(500).json({
        success: false,
        error: 'Email service not configured. Please contact administrator.',
      });
    }

    console.log(`Processing internship application from: ${fullName} (${email})`);

    const transporter = getTransporter();
    const attachments = [parseDataUrlFile(cvFile)].filter(Boolean);

    // Send email to business inbox
    const hrEmailResult = await transporter.sendMail({
      from: `"ZIONARCH" <${process.env.SMTP_FROM}>`,
      to: process.env.BUSINESS_EMAIL,
      replyTo: email,
      subject: 'New internship application received',
      text: generateInternshipBusinessEmailText({
        fullName,
        email,
        contactNumber,
        qualification,
        portfolioLink,
        cvFile,
      }),
      html: generateInternshipBusinessEmailHTML({
        fullName,
        email,
        contactNumber,
        qualification,
        portfolioLink,
        cvFile,
      }),
      attachments,
      headers: {
        'X-Category': 'notifications',
        'X-Priority': '1',
      },
    });

    console.log(`HR email sent: ${hrEmailResult.messageId}`);

    // Send confirmation email to applicant
    const applicantEmailResult = await transporter.sendMail({
      from: `"ZIONARCH" <${process.env.SMTP_FROM}>`,
      to: email,
      replyTo: process.env.BUSINESS_EMAIL,
      subject: 'Internship Application Received - ZIONARCH',
      text: generateInternshipApplicantEmailText(fullName),
      html: generateInternshipApplicantEmailHTML(fullName),
      headers: {
        'X-Category': 'transactional',
      },
    });

    console.log(`Applicant confirmation email sent: ${applicantEmailResult.messageId}`);

    res.status(200).json({
      success: true,
      message: 'Internship application email sent successfully',
      data: {
        hrEmailId: hrEmailResult.messageId,
        applicantEmailId: applicantEmailResult.messageId,
      },
    });
  } catch (error) {
    console.error('Error sending internship application email:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send internship application email',
    });
  }
};
