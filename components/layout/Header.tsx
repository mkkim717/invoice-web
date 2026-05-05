"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** 반응형 헤더 컴포넌트 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 + 데스크탑 네비게이션 */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-foreground">
            {SITE_CONFIG.name}
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground",
                  pathname === link.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 우측 액션 영역 */}
        <div className="flex items-center gap-2">
          {/* 데스크탑 테마 토글 */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          {/* 모바일 메뉴 (Sheet) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{SITE_CONFIG.name}</SheetTitle>
                </SheetHeader>
                {/* 모바일 네비게이션 링크 */}
                <nav className="flex flex-col gap-1 px-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                        pathname === link.href
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {/* 모바일 테마 토글 */}
                <div className="px-4">
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
