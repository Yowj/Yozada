"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useState } from "react";
import { LoaderCircle, Mail } from "lucide-react";

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseUrl}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={cn("w-full", className)} {...props}>
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Check your email</h1>
          <p className="mt-2 text-sm text-muted-foreground">Password reset instructions sent</p>
        </div>

        {/* Success Message */}
        <div className="rounded-lg bg-muted px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            If you registered using your email and password, you will receive a password reset email.
          </p>
        </div>

        {/* Back to Login Link */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <a
            href="login"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
          >
            Back to sign in
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Reset your password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Forgot Password Form */}
      <form onSubmit={handleForgotPassword} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 rounded-lg border-input bg-background px-4 text-base transition-all duration-200 placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-8 h-12 w-full rounded-lg text-base font-medium transition-all duration-200 hover:opacity-90"
        >
          {isLoading ? <LoaderCircle className="size-5 animate-spin" /> : "Send reset link"}
        </Button>
      </form>

      {/* Back to Login Link */}
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <a
          href="login"
          className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
        >
          Back to sign in
        </a>
      </p>
    </div>
  );
}
