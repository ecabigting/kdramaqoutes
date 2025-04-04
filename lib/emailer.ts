
import sgMail from '@sendgrid/mail';
/**
 * Sends an email using SendGrid
 * @param {string} to - Recipient email address
 * @param {string} templateId - SendGrid template ID
 * @param {object} dynamicTemplateData - Dynamic data for the template
 * @returns {Promise<boolean>} True if email was sent successfully
 */
export async function sendEmail(
  to: string,
  templateId: string,
  dynamicTemplateData: Record<string, unknown>,
): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    throw new Error('SendGrid environment variables not configured');
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    templateId,
    dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false
  }
}

export async function sendUserVerificationEmail(userEmail: string, userName: string, token: string): Promise<boolean> {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  try {
    const result = await sendEmail(
      userEmail, // recipient
      process.env.SENDGRID_VERIFICATION_TEMPLATE_ID!, // template ID
      {
        verificationUrl, // maps to {{verificationUrl}} in template
        name: userName, // maps to {{name}} in template
        // // You can add more variables as needed
        // company: "TV Quotes App",
        // supportEmail: "support@tvquotes.app"
      }
    );

    if (!result) {
      console.error('Failed to send email:', result);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return false
  }
}
