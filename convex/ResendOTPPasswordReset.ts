import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

export const ResendOTPPasswordReset = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes: Uint8Array) {
        crypto.getRandomValues(bytes);
      },
    };
    return generateRandomString(random, "0123456789", 8);
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const fromEmail = process.env.FROM_EMAIL;
    if (!fromEmail) {
      throw new Error(
        "FROM_EMAIL environment variable is not set. Run: npx convex env set FROM_EMAIL \"YourApp <hello@yourdomain.com>\"",
      );
    }
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "Reset your password",
      text: `Your password reset code is: ${token}`,
    });
    if (error) {
      throw new Error("Could not send password reset email");
    }
  },
});
