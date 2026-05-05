"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateStatusAction } from "@/app/admin/actions";
import type { InvoiceStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: InvoiceStatus; label: string }[] = [
  { value: "draft", label: "초안" },
  { value: "sent", label: "발송됨" },
  { value: "accepted", label: "수락됨" },
  { value: "expired", label: "만료됨" },
];

interface StatusUpdateSelectProps {
  pageId: string;
  currentStatus: InvoiceStatus;
}

export function StatusUpdateSelect({ pageId, currentStatus }: StatusUpdateSelectProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={currentStatus}
      disabled={isPending}
      onValueChange={(value) => {
        startTransition(async () => {
          await updateStatusAction(pageId, value as InvoiceStatus);
        });
      }}
    >
      <SelectTrigger className="h-8 w-28 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-xs">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
