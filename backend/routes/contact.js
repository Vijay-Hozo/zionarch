import nodemailer from 'nodemailer';

// Create transporter (lazy initialization)
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // Use TLS, not SSL for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });
  }
  return transporter;
};

/**
 * Generate HTML email for business (contact form)
 */
const generateContactBusinessEmailHTML = (formData) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #e63946; border-bottom: 3px solid #e63946; padding-bottom: 15px; margin-top: 0;">New Contact Form Submission</h1>
        
        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; width: 35%;">
                <strong style="color: #555;">Full Name:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${formData.name}</td>
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
              <td style="padding: 10px 0;">
                <strong style="color: #555;">Phone:</strong>
              </td>
              <td style="padding: 10px 0;">
                <a href="tel:${formData.phone}" style="color: #e63946; text-decoration: none;">${formData.phone}</a>
              </td>
            </tr>
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Message</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946;">
            <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.message}</p>
          </div>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
          <p style="color: #999; font-size: 12px; margin: 0;">This contact form was submitted from the ZIONARCH website on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Generate HTML confirmation email for user
 */
const generateContactApplicantEmailHTML = (name) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #e63946; text-align: center; margin-top: 0;">Message Received!</h1>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Dear <strong>${name}</strong>,
        </p>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Thank you for reaching out to ZIONARCH! We have received your message and our team will get back to you as soon as possible.
        </p>

        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #e63946; margin: 20px 0;">
          <p style="color: #555; margin: 0; font-size: 14px;">
            <strong>What happens next?</strong><br>
            Our team will review your message and contact you within 24-48 hours. We appreciate your interest in ZIONARCH!
          </p>
        </div>

        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          If you have any urgent matters, feel free to call us at <a href="tel:+914424465454" style="color: #e63946; text-decoration: none;">+91 44 2446 5454</a> or <a href="tel:+918695478788" style="color: #e63946; text-decoration: none;">+91 86954 78788</a>
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">ZIONARCH - Architecture & Design<br>Building spaces that inspire life</p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Send contact form email handler
 */
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone, message',
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

    console.log(`Processing contact form submission from: ${name} (${email})`);

    // Get transporter instance
    const transporter = getTransporter();

    // Send email to business
    const businessEmailResult = await transporter.sendMail({
      from: process.env.BUSINESS_EMAIL || 'office@zionarch.com',
      to: process.env.BUSINESS_EMAIL || 'office@zionarch.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: generateContactBusinessEmailHTML({
        name,
        email,
        phone,
        message,
      }),
    });

    console.log(`Business email sent: ${businessEmailResult.messageId}`);

    // Send confirmation email to user
    const userEmailResult = await transporter.sendMail({
      from: process.env.BUSINESS_EMAIL || 'office@zionarch.com',
      to: email,
      subject: 'We Received Your Message - ZIONARCH',
      html: generateContactApplicantEmailHTML(name),
    });

    console.log(`User confirmation email sent: ${userEmailResult.messageId}`);

    res.status(200).json({
      success: true,
      message: 'Contact form email sent successfully',
      data: {
        businessEmailId: businessEmailResult.messageId,
        userEmailId: userEmailResult.messageId,
      },
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send contact form email',
    });
  }
};
