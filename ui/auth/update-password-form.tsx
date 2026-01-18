"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useState } from "react";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import { updatePassword } from "@/lib/actions/auth";

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const result = await updatePassword(password);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Set new password</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please enter your new password below</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Update Password Form */}
      <form onSubmit={handleUpdatePassword} className="space-y-6">
        {/* New Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            New Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg border-input bg-background px-4 pr-12 text-base transition-all duration-200 placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? <LoaderCircle className="size-5 animate-spin" /> : "Update password"}
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
