"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto flex items-center justify-center px-4 py-2.5 text-center">
        <p className="text-sm font-medium">
          Free shipping on orders over $50 | Use code{" "}
          <span className="font-bold underline underline-offset-2">WELCOME15</span>{" "}
          for 15% off your first order
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
