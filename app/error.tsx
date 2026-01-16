"use client";

import { useEffect } from "react";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log error for debugging
    console.error("Global error caught:", error);
    console.error("Error digest:", error.digest);
    console.error("Timestamp:", new Date().toISOString());
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          {/* Error Icon */}
          <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-600 dark:text-red-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Error Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Oops! May nangyaring mali
          </h1>

          {/* Error Description */}
          <p className="text-gray-600 dark:text-gray-400">
            Nagkaroon ng problema sa application. Huwag mag-alala, safe ang iyong data.
          </p>

          {/* Error ID (for debugging) */}
          {error.digest && (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Error ID: <code className="font-mono text-xs">{error.digest}</code>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                I-report mo ito kung kailangan ng tulong
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} size="lg" className="w-full sm:w-auto">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Subukan Ulit
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Bumalik sa Home
          </Button>
        </div>

        {/* Additional Help Text */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Kung patuloy ang problema, i-refresh ang page o bumalik mamaya.
        </p>
      </div>
    </div>
  );
}
