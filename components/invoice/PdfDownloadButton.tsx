"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PdfDownloadButton() {
  return (
    <Button onClick={() => window.print()} className="no-print">
      <Printer className="mr-2 size-4" />
      PDF로 저장
    </Button>
  );
}
