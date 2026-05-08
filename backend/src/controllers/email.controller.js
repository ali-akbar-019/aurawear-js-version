import nodemailer from "nodemailer";

// POST /api/contact
export const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("[ContactForm] Received request:", { name, email, subject, message });

  if (!name || !email || !subject || !message) {
    console.warn("[ContactForm] Missing required fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // 1️⃣ Create transporter
    console.log("[ContactForm] Creating Nodemailer transporter...");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Check transporter configuration
    console.log("[ContactForm] Verifying transporter...");
    await transporter.verify();
    console.log("[ContactForm] Transporter verified successfully");

    // 2️⃣ Setup email data with AuraWear branding
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `New Contact Form Submission: ${subject}`,
      text: message,
      html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f6; padding: 40px;">
    <div style="max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #de3577, #ff6fa1); color: white; padding: 30px 25px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">AuraWear Contact Form</h1>
        <p style="margin-top: 8px; font-size: 16px; font-weight: 400; opacity: 0.9;">
          A new message has been submitted
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 30px 25px; color: #333; font-size: 16px; line-height: 1.6;">
        <p>Hello AuraWear Team,</p>
        <p>You have received a new message from the contact form on your website:</p>

        <table style="width: 100%; border-collapse: separate; border-spacing: 0 12px; margin-top: 20px;">
          <tr>
            <td style="font-weight: 600; width: 120px; color: #de3577; vertical-align: top;">Name:</td>
            <td style="color: #555;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #de3577; vertical-align: top;">Email:</td>
            <td style="color: #555;">${email}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #de3577; vertical-align: top;">Subject:</td>
            <td style="color: #555;">${subject}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #de3577; vertical-align: top;">Message:</td>
            <td style="color: #555; white-space: pre-line;">${message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>

        <!-- Optional CTA button -->
        <div style="margin-top: 30px; text-align: center;">
          <a href="mailto:${email}" 
             style="background-color: #de3577; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">
             Reply to Sender
          </a>
        </div>

        <p style="margin-top: 30px; font-size: 14px; color: #777;">
          This email was sent from the AuraWear website contact form.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f4f4f6; text-align: center; padding: 20px; font-size: 12px; color: #999;">
        &copy; ${new Date().getFullYear()} AuraWear. All rights reserved.
      </div>

    </div>
  </div>
  `,
    };

    console.log("[ContactForm] Sending email to:", process.env.CONTACT_RECEIVER);

    // 3️⃣ Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("[ContactForm] Email sent successfully. Message ID:", info.messageId);
    res.status(200).json({ message: "Email sent successfully", messageId: info.messageId });
  } catch (error) {
    console.error("[ContactForm] Failed to send email:", error.message || error);
    res.status(500).json({ error: "Failed to send email", details: error.message || error });
  }
};
