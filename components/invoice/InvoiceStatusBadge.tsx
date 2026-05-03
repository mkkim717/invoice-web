import { Badge } from "@/components/ui/badge";
import type { InvoiceStatus } from "@/lib/types";

const STATUS_LABEL: Record<InvoiceStatus, string> = {
  draft: "초안",
  sent: "발송됨",
  accepted: "수락됨",
  expired: "만료됨",
};

const STATUS_VARIANT: Record<
  InvoiceStatus,
  "secondary" | "default" | "outline" | "destructive"
> = {
  draft: "secondary",
  sent: "default",
  accepted: "outline",
  expired: "destructive",
};

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  return (
    <Badge
      variant={STATUS_VARIANT[status]}
      className={status === "accepted" ? "text-green-600 dark:text-green-400" : undefined}
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
}
