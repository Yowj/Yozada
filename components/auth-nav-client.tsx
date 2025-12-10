"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { User, LogOut, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AuthNavClientProps {
  user: {
    email: string;
    isAdmin: boolean;
  } | null;
}

export function AuthNavClient({ user }: AuthNavClientProps) {
  if (user) {
    return (
      <>
        {user.isAdmin && (
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="flex items-center gap-2 h-10 px-2 sm:px-4">
              Admin Dashboard
            </Button>
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-10 px-2 sm:px-4">
              <User className="h-5 w-5" />
              <span className="hidden text-sm sm:inline">{user.email.split("@")[0]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-default focus:bg-transparent">
              <span className="text-xs text-muted-foreground">Signed in as</span>
              <span className="text-sm font-medium">{user.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/protected">Profile</Link>
            </DropdownMenuItem>
            {user.isAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/admin" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                window.location.reload(); // Refresh to update server state
              }}
              className="flex items-center gap-2 text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
