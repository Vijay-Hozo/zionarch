import nodemailer from 'nodemailer';

// Create transporter (lazy initialization)
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    const port = parseInt(process.env.SMTP_PORT || '587');
    const isSecure = port === 465;
    
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: port,
      secure: isSecure, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 5000, // 5 seconds
      socketTimeout: 10000, // 10 seconds
    });
  }
  return transporter;
};

/**
 * Generate HTML email for business
 */
const generateBusinessEmailHTML = (quoteData) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #e63946; border-bottom: 3px solid #e63946; padding-bottom: 15px; margin-top: 0;">New Quote Request</h1>
        
        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Project Type</h2>
          <p style="background-color: #f0f0f0; padding: 12px; border-radius: 5px; margin: 0; color: #555; font-weight: 500;">${quoteData.projectType}</p>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; width: 30%;">
                <strong style="color: #555;">Name:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${quoteData.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                <strong style="color: #555;">Email:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                <a href="mailto:${quoteData.email}" style="color: #e63946; text-decoration: none;">${quoteData.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                <strong style="color: #555;">Phone:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                <a href="tel:${quoteData.phone}" style="color: #e63946; text-decoration: none;">${quoteData.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <strong style="color: #555;">Location:</strong>
              </td>
              <td style="padding: 10px 0;">${quoteData.location || 'Not provided'}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Project Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e0e0e0;">
                <strong style="color: #555;">Plot Size</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${quoteData.plotSize || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">
                <strong style="color: #555;">Budget Range</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${quoteData.budget || 'Not provided'}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e0e0e0;">
                <strong style="color: #555;">Expected Timeline</strong>
              </td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${quoteData.timeline || 'Not provided'}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Project Description</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946;">
            <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${quoteData.description || 'No description provided'}</p>
          </div>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
          <p style="color: #999; font-size: 12px; margin: 0;">This quote request was submitted from the ZIONARCH website on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Generate HTML email for customer
 */
const generateCustomerEmailHTML = (name) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #e63946; text-align: center; margin-top: 0;">Quote Request Received</h1>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Dear <strong>${name}</strong>,
        </p>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Thank you for submitting your quote request! We have received your inquiry and our team will review your project details shortly.
        </p>

        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #e63946; margin: 20px 0;">
          <p style="color: #555; margin: 0; font-size: 14px;">
            <strong>What happens next?</strong><br>
            Our team will review your requirements and contact you within 24-48 hours to discuss your project in detail and provide you with a personalized quote.
          </p>
        </div>

        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          If you have any urgent questions, feel free to reach out to us via WhatsApp or email.
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">ZIONARCH - Architecture & Design</p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Send quote email handler
 */
export const sendQuoteEmail = async (req, res) => {
  try {
    const { projectType, name, email, phone, location, plotSize, budget, timeline, description } = req.body;

    // Validation
    if (!projectType || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: projectType, name, email, phone',
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

    // Check if environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.BUSINESS_EMAIL || !process.env.SMTP_FROM) {
      console.error('Missing SMTP configuration:', {
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

    console.log(`Processing quote request from: ${name} (${email})`);

    // Get transporter instance
    const transporter = getTransporter();

    // Send email to business
    const businessEmailResult = await transporter.sendMail({
      from: `"ZIONARCH Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Quote Request from ${name} - ${projectType}`,
      html: generateBusinessEmailHTML({
        projectType,
        name,
        email,
        phone,
        location,
        plotSize,
        budget,
        timeline,
        description,
      }),
    });

    console.log(`Business email sent: ${businessEmailResult.messageId}`);

    // Send confirmation email to customer
    const customerEmailResult = await transporter.sendMail({
      from: `"ZIONARCH" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Quote Request Confirmation - ZIONARCH',
      html: generateCustomerEmailHTML(name),
    });

    console.log(`Customer confirmation email sent: ${customerEmailResult.messageId}`);

    res.status(200).json({
      success: true,
      message: 'Quote email sent successfully',
      data: {
        businessEmailId: businessEmailResult.messageId,
        customerEmailId: customerEmailResult.messageId,
      },
    });
  } catch (error) {
    console.error('Error sending quote email:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send quote email',
    });
  }
};
