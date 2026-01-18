"use client";

import { useEffect } from "react";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Global error caught:", error);
    console.error("Error digest:", error.digest);
    console.error("Timestamp:", new Date().toISOString());
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            An unexpected error occurred. Don&apos;t worry, your data is safe.
          </p>
        </div>

        {/* Error ID */}
        {error.digest && (
          <div className="mb-6 rounded-lg border border-border bg-muted/50 px-4 py-3 text-center">
            <p className="text-sm text-muted-foreground">
              Error ID: <code className="font-mono text-xs text-foreground">{error.digest}</code>
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Share this if you need support
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="h-12 w-full rounded-lg text-base font-medium transition-all duration-200 hover:opacity-90"
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="h-12 w-full rounded-lg text-base font-medium transition-all duration-200 hover:bg-muted"
          >
            <Home className="mr-2 size-4" />
            Back to Home
          </Button>
        </div>

        {/* Help Text */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          If the problem persists, try refreshing the page or come back later.
        </p>
      </div>
    </div>
  );
}
