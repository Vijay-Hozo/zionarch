import nodemailer from 'nodemailer';

// Create transporter (lazy initialization)
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return transporter;
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
                <strong style="color: #555;">Institution:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${formData.institution}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Internship Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e0e0e0; width: 35%;">
                <strong style="color: #555;">Batch</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${formData.internshipBatch}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">
                <strong style="color: #555;">Start Date</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${formData.startDate}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e0e0e0;">
                <strong style="color: #555;">Duration (Days)</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${formData.internshipDuration}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Portfolio</h2>
          <p style="color: #555;">
            <a href="${formData.portfolioUrl}" style="color: #e63946; text-decoration: none;" target="_blank">${formData.portfolioUrl}</a>
          </p>
        </div>

        ${formData.previousInternships ? `
        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Previous Internship Experience</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946;">
            <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.previousInternships}</p>
          </div>
        </div>
        ` : ''}

        ${formData.otherAttachments ? `
        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Other Attachments</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946;">
            <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.otherAttachments}</p>
          </div>
        </div>
        ` : ''}

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
          <p style="color: #999; font-size: 12px; margin: 0;">This internship application was submitted from the ZIONARCH website on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
      </div>
    </div>
  `;
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
    const { fullName, email, institution, portfolioUrl, otherAttachments, previousInternships, internshipBatch, startDate, internshipDuration } = req.body;

    // Validation
    if (!fullName || !email || !institution || !portfolioUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, institution, portfolioUrl',
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

    console.log(`Processing internship application from: ${fullName} (${email})`);

    const transporter = getTransporter();

    // Send email to HR
    const hrEmailResult = await transporter.sendMail({
      from: `"ZIONARCH Internship" <${process.env.SMTP_USER}>`,
      to: process.env.HR_EMAIL || 'hr@zionarch.com',
      subject: `New Internship Application from ${fullName}`,
      html: generateInternshipBusinessEmailHTML({
        fullName,
        email,
        institution,
        portfolioUrl,
        otherAttachments,
        previousInternships,
        internshipBatch,
        startDate,
        internshipDuration,
      }),
    });

    console.log(`HR email sent: ${hrEmailResult.messageId}`);

    // Send confirmation email to applicant
    const applicantEmailResult = await transporter.sendMail({
      from: `"ZIONARCH" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Internship Application Received - ZIONARCH',
      html: generateInternshipApplicantEmailHTML(fullName),
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
