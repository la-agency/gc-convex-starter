import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";
import { convexEnv } from "./env";

export const ResendOTPPasswordReset = Resend({
  id: "resend-otp",
  apiKey: convexEnv.RESEND_API_KEY,
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes: Uint8Array) {
        crypto.getRandomValues(bytes);
      },
    };
    return generateRandomString(random, "0123456789", 8);
  },
  async sendVerificationRequest({ identifier: email, token }) {
    const apiKey = convexEnv.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY is not set. Run: npx convex env set RESEND_API_KEY re_xxxxxxxxxx",
      );
    }
    const fromEmail = convexEnv.FROM_EMAIL;
    if (!fromEmail) {
      throw new Error(
        'FROM_EMAIL is not set. Run: npx convex env set FROM_EMAIL "App Name <you@yourdomain.com>"',
      );
    }
    const resend = new ResendAPI(apiKey);
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
