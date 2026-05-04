import { Send, CheckCircle2, Clock, FileEdit, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InvoiceStatus } from "@/lib/types";

interface StatusConfig {
  label: string;
  className: string;
  Icon: LucideIcon;
}

const STATUS_CONFIG: Record<InvoiceStatus, StatusConfig> = {
  draft: {
    label: "초안",
    className: "bg-muted text-muted-foreground",
    Icon: FileEdit,
  },
  sent: {
    label: "발송됨",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    Icon: Send,
  },
  accepted: {
    label: "수락됨",
    className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    Icon: CheckCircle2,
  },
  expired: {
    label: "만료됨",
    className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    Icon: Clock,
  },
};

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const { label, className, Icon } = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      {label}
    </span>
  );
}
