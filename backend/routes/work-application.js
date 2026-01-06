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

/**
 * Generate plain text email for business (work application)
 */
const generateWorkBusinessEmailText = (formData) => {
  return `
New work application received.

Personal Information:
- Name: ${formData.fullName}
- Email: ${formData.email}

Education & Experience:
- Institution: ${formData.institution}
- Year of Graduation: ${formData.yearOfGraduation}

Additional Qualifications:
${formData.additionalQualifications}

Previous Work Experience:
${formData.previousWorkExperience}

Portfolio: ${formData.portfolioLink}
${formData.otherAttachments ? `\nOther Attachments:\n${formData.otherAttachments}` : ''}

Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `.trim();
};

/**
 * Generate HTML email for business (work application)
 */
const generateWorkBusinessEmailHTML = (formData) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #e63946; border-bottom: 3px solid #e63946; padding-bottom: 15px; margin-top: 0;">New Work Application</h1>
        
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
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Education & Experience</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e0e0e0; width: 35%;">
                <strong style="color: #555;">Institution</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${formData.institution}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">
                <strong style="color: #555;">Year of Graduation</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${formData.yearOfGraduation}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Additional Qualifications</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946;">
            <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.additionalQualifications}</p>
          </div>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Previous Work Experience</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946;">
            <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.previousWorkExperience}</p>
          </div>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Portfolio</h2>
          <p style="color: #555;">
            <a href="${formData.portfolioLink}" style="color: #e63946; text-decoration: none;" target="_blank">${formData.portfolioLink}</a>
          </p>
        </div>

        ${formData.otherAttachments ? `
        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Other Attachments</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946;">
            <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.otherAttachments}</p>
          </div>
        </div>
        ` : ''}

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
const generateWorkApplicantEmailText = (name) => {
  return `
Dear ${name},

Thank you for applying for a position at ZIONARCH! We have received your application and our HR team will review it shortly.

What happens next?
Our HR team will carefully review your application and reach out to you within 5-7 business days to discuss next steps. We appreciate your interest in joining the ZIONARCH team!

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
const generateWorkApplicantEmailHTML = (name) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #e63946; text-align: center; margin-top: 0;">Application Received!</h1>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Dear <strong>${name}</strong>,
        </p>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Thank you for applying for a position at ZIONARCH! We have received your application and our HR team will review it shortly.
        </p>

        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #e63946; margin: 20px 0;">
          <p style="color: #555; margin: 0; font-size: 14px;">
            <strong>What happens next?</strong><br>
            Our HR team will carefully review your application and reach out to you within 5-7 business days to discuss next steps. We appreciate your interest in joining the ZIONARCH team!
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
 * Send work application email handler
 */
export const sendWorkApplicationEmail = async (req, res) => {
  try {
    const { fullName, email, institution, yearOfGraduation, additionalQualifications, previousWorkExperience, portfolioLink, otherAttachments } = req.body;

    // Validation
    if (!fullName || !email || !institution || !yearOfGraduation) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, institution, yearOfGraduation',
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
      console.error('Missing SMTP configuration for work application email:', {
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

    console.log(`Processing work application from: ${fullName} (${email})`);

    const transporter = getTransporter();

    // Send email to HR
    const hrEmailResult = await transporter.sendMail({
      from: `"ZIONARCH" <${process.env.SMTP_FROM}>`,
      to: process.env.BUSINESS_EMAIL,
      replyTo: email,
      subject: 'New work application received',
      text: generateWorkBusinessEmailText({
        fullName,
        email,
        institution,
        yearOfGraduation,
        additionalQualifications,
        previousWorkExperience,
        portfolioLink,
        otherAttachments,
      }),
      html: generateWorkBusinessEmailHTML({
        fullName,
        email,
        institution,
        yearOfGraduation,
        additionalQualifications,
        previousWorkExperience,
        portfolioLink,
        otherAttachments,
      }),
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
      subject: 'Work Application Received - ZIONARCH',
      text: generateWorkApplicantEmailText(fullName),
      html: generateWorkApplicantEmailHTML(fullName),
      headers: {
        'X-Category': 'transactional',
      },
    });

    console.log(`Applicant confirmation email sent: ${applicantEmailResult.messageId}`);

    res.status(200).json({
      success: true,
      message: 'Work application email sent successfully',
      data: {
        hrEmailId: hrEmailResult.messageId,
        applicantEmailId: applicantEmailResult.messageId,
      },
    });
  } catch (error) {
    console.error('Error sending work application email:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send work application email',
    });
  }
};
