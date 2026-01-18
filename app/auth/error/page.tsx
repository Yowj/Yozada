import { AlertCircle } from "lucide-react";
import { Button } from "@/ui/button";

export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We encountered an error processing your request
          </p>
        </div>

        {/* Error Message */}
        {params?.error && (
          <div className="mb-6 rounded-lg bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
            Error code: {params.error}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <Button
            asChild
            className="h-12 w-full rounded-lg text-base font-medium transition-all duration-200 hover:opacity-90"
          >
            <a href="login">Back to sign in</a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-lg text-base font-medium transition-all duration-200 hover:bg-muted"
          >
            <a href="/">Go to homepage</a>
          </Button>
        </div>

        {/* Help Text */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Need help?{" "}
          <a
            href="#"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
