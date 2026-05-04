import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InvoiceStatusBadge } from "@/components/invoice/InvoiceStatusBadge";
import { formatDate } from "@/lib/format";
import type { Invoice } from "@/lib/types";

type InvoiceHeaderProps = Pick<Invoice, "title" | "issue_date" | "due_date" | "status">;

export function InvoiceHeader({ title, issue_date, due_date, status }: InvoiceHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                견적서
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            </div>
            <InvoiceStatusBadge status={status} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground">발행일</dt>
            <dd className="font-medium">{formatDate(issue_date)}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground">유효기간</dt>
            <dd className="font-medium">
              {due_date ? formatDate(due_date) : "미지정"}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
