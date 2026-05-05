"use client";

import { useTransition } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { acceptInvoiceAction } from "@/app/actions/invoice";
import type { InvoiceStatus } from "@/lib/types";

interface AcceptButtonProps {
  pageId: string;
  status: InvoiceStatus;
  slug: string;
}

export function AcceptButton({ pageId, status, slug }: AcceptButtonProps) {
  const [isPending, startTransition] = useTransition();

  if (status === "accepted") {
    return (
      <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
        <CheckCircle2 className="size-5" />
        <span className="font-medium">수락 완료</span>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <AlertCircle className="size-5" />
        <span>만료된 견적서입니다.</span>
      </div>
    );
  }

  if (status !== "sent") return null;

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await acceptInvoiceAction(pageId, slug);
        });
      }}
    >
      <CheckCircle2 className="mr-2 size-4" />
      {isPending ? "처리 중..." : "수락하기"}
    </Button>
  );
}
