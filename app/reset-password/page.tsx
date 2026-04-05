"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleRequestCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    signIn("password", formData)
      .then(() => setStep({ email: formData.get("email") as string }))
      .catch(() => setError("Could not send reset code. Check your email."))
      .finally(() => setLoading(false));
  }

  function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    signIn("password", formData)
      .catch(() => setError("Invalid code or password too weak."))
      .finally(() => setLoading(false));
  }

  if (step === "forgot") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Reset your password</CardTitle>
            <CardDescription>Enter your email and we&apos;ll send you a reset code</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRequestCode} className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <input name="flow" type="hidden" value="reset" />

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "Sending..." : "Send reset code"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Enter new password</CardTitle>
          <CardDescription>We sent a code to {step.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="code">Reset code</Label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="12345678"
                autoComplete="one-time-code"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>
            <input name="email" type="hidden" value={step.email} />
            <input name="flow" type="hidden" value="reset-verification" />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Resetting..." : "Reset password"}
            </Button>

            <button
              type="button"
              className="text-center text-sm text-muted-foreground font-medium underline-offset-4 hover:underline"
              onClick={() => {
                setStep("forgot");
                setError(null);
              }}
            >
              Try a different email
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
