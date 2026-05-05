import type { Metadata } from "next";
import { listAllInvoices } from "@/lib/notion";
import { AdminInvoiceTable } from "@/components/admin/AdminInvoiceTable";
import { StatusFilter } from "@/components/admin/StatusFilter";
import type { InvoiceStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "견적서 관리",
};

const VALID_STATUSES: InvoiceStatus[] = ["draft", "sent", "accepted", "expired"];

export default async function AdminInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const invoices = await listAllInvoices();

  const filtered =
    status && VALID_STATUSES.includes(status as InvoiceStatus)
      ? invoices.filter((inv) => inv.status === status)
      : invoices;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">견적서 관리</h1>
        <span className="text-sm text-muted-foreground">총 {filtered.length}건</span>
      </div>
      <div className="mb-4">
        <StatusFilter currentStatus={status} />
      </div>
      <AdminInvoiceTable invoices={filtered} />
    </div>
  );
}
