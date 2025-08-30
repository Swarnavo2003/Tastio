import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD,
  },
});

export const sendOtpMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.HOST_EMAIL,
      to,
      subject: "Reset Your Password",
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP for password reset is <strong>${otp}</strong>. It resets in 10 minutes.</p>`,
    });
  } catch (error) {
    console.log("Error in sending mail", error);
  }
};
