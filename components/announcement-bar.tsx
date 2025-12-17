import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-center text-sm font-medium">
          <span>
            🎉 Free shipping on orders over $50! Use code{" "}
            <span className="font-bold">FREESHIP50</span>
          </span>
          <Link href="/products" className="underline underline-offset-4 hover:no-underline">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
