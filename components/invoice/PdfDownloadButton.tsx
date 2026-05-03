"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PdfDownloadButton() {
  return (
    <Button
      onClick={() => window.print()}
      className="no-print gap-2"
    >
      <Download className="size-4" />
      PDF로 저장
    </Button>
  );
}
