"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Route Error]", error);
  }, [error]);
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="size-8 text-destructive" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            예상치 못한 오류가 발생했습니다
          </h1>
          <p className="max-w-md text-muted-foreground">
            서비스 이용에 불편을 드려 죄송합니다.
            잠시 후 다시 시도하거나 홈으로 돌아가 주세요.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono">
              오류 코드: {error.digest}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button onClick={reset}>다시 시도</Button>
          <Button variant="outline" asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
