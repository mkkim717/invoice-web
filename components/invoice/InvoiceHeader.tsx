import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InvoiceStatusBadge } from "@/components/invoice/InvoiceStatusBadge";
import { formatDate } from "@/lib/format";
import type { Invoice } from "@/lib/types";

type InvoiceHeaderProps = Pick<Invoice, "title" | "issue_date" | "status">;

export function InvoiceHeader({ title, issue_date, status }: InvoiceHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <InvoiceStatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <dl className="text-sm">
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground">발행일</dt>
            <dd className="font-medium">{formatDate(issue_date)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
