"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-500" />
            </div>
          </div>

          {/* Thank You Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Thank You!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for shopping with us
            </p>
          </div>

          {/* Order Confirmation */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Your order has been placed successfully.
            </p>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a confirmation email with your order details.
            </p>
          </div>

          {/* Countdown */}
          <div className="pt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Redirecting to home page in{" "}
              <span className="font-bold text-foreground">{countdown}</span>{" "}
              second{countdown !== 1 ? "s" : ""}...
            </p>

            {/* Manual Redirect Button */}
            <Button onClick={() => router.push("/")} className="w-full" variant="outline">
              Go to Home Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
