const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const OTP = require('../models/OTP');

const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP - University Placement Portal',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #f0f0f0; background-color: #121212; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1e1e1e; padding: 30px; border-radius: 12px; border: 1px solid #333;">
            <h2 style="text-align: center; color: #00c6ff; margin-bottom: 20px;">University Placement Portal</h2>
            <p style="font-size: 16px;">Your One-Time Password (OTP) for account verification is:</p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #ffffff; background-color: #2a2a2a; padding: 10px 20px; border-radius: 8px;">${otp}</span>
            </div>
            <p style="font-size: 14px;">This OTP is valid for <strong>5 minutes</strong> only.</p>
            <p style="font-size: 14px; color: #ff6b6b;">Please do not share this OTP with anyone for security reasons.</p>
            <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} University Placement Portal. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully.' };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, message: 'Failed to send OTP email.' };
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    // Basic email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    await OTP.deleteMany({ email });
    await OTP.create({ email, otp: hashedOTP });

    const emailResult = await sendOTPEmail(email, otp);

    if (emailResult.success) {
      res.status(200).json({ success: true, message: 'OTP sent to your email.' });
    } else {
      res.status(500).json({ success: false, message: emailResult.message });
    }
  } catch (error) {
    console.error('Error in sendOTP controller:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: 'OTP expired or not found. Please resend.' });
    }

    const isMatch = await bcrypt.compare(otp, otpDoc.otp);

    if (isMatch) {
      await OTP.deleteOne({ email });
      return res.status(200).json({ success: true, message: 'OTP verified successfully.' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
    }
  } catch (error) {
    console.error('Error in verifyOTP controller:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
