"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/lib/types";

interface PdfDownloadButtonProps {
  invoice: Invoice;
}

export function PdfDownloadButton({ invoice }: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    setIsGenerating(true);
    try {
      const [{ pdf }, { InvoicePdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./InvoicePdfDocument"),
      ]);
      const element = InvoicePdfDocument({ invoice });
      const blob = await pdf(element).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${invoice.slug}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("[PDF Download]", err);
      alert("PDF 생성에 실패했습니다.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Button onClick={handleDownload} disabled={isGenerating} className="no-print">
      <Download className="mr-2 size-4" />
      {isGenerating ? "생성 중..." : "PDF 다운로드"}
    </Button>
  );
}
