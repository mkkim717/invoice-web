"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatKRW } from "@/lib/format";

interface SendEmailButtonProps {
  slug: string;
  title: string;
  clientName: string;
  totalAmount: number;
}

export function SendEmailButton({
  slug,
  title,
  clientName,
  totalAmount,
}: SendEmailButtonProps) {
  function handleClick() {
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin;
    const invoiceUrl = `${appUrl}/invoice/${slug}`;

    const subject = encodeURIComponent(`[견적서] ${title}`);
    const body = encodeURIComponent(
      [
        `안녕하세요, ${clientName} 담당자님.`,
        "",
        `견적서를 보내드립니다.`,
        "",
        `■ 견적서 제목: ${title}`,
        `■ 합계 금액: ${formatKRW(totalAmount)}`,
        "",
        `아래 링크에서 견적서를 확인하실 수 있습니다:`,
        invoiceUrl,
        "",
        "감사합니다.",
      ].join("\n")
    );

    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} className="h-8 px-2">
      <Mail className="size-4" />
    </Button>
  );
}
