import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceStatusBadge } from "@/components/invoice/InvoiceStatusBadge";
import { StatusUpdateSelect } from "@/components/admin/StatusUpdateSelect";
import { SendEmailButton } from "@/components/admin/SendEmailButton";
import { formatKRW, formatDate } from "@/lib/format";
import type { Invoice } from "@/lib/types";

interface AdminInvoiceTableProps {
  invoices: Invoice[];
}

export function AdminInvoiceTable({ invoices }: AdminInvoiceTableProps) {
  if (invoices.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
        견적서가 없습니다.
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>고객사</TableHead>
            <TableHead>발행일</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right">금액</TableHead>
            <TableHead className="text-center">상태 변경</TableHead>
            <TableHead className="text-center">이메일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {invoice.status !== "draft" ? (
                  <Link
                    href={`/invoice/${invoice.slug}`}
                    target="_blank"
                    className="underline-offset-4 hover:underline"
                  >
                    {invoice.title}
                  </Link>
                ) : (
                  invoice.title
                )}
              </TableCell>
              <TableCell>{invoice.client_name}</TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(invoice.issue_date)}
              </TableCell>
              <TableCell>
                <InvoiceStatusBadge status={invoice.status} />
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatKRW(invoice.total_amount)}
              </TableCell>
              <TableCell className="text-center">
                <StatusUpdateSelect
                  pageId={invoice.id}
                  currentStatus={invoice.status}
                />
              </TableCell>
              <TableCell className="text-center">
                {invoice.status !== "draft" && (
                  <SendEmailButton
                    slug={invoice.slug}
                    title={invoice.title}
                    clientName={invoice.client_name}
                    totalAmount={invoice.total_amount}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
