import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInvoiceBySlug } from "@/lib/notion";
import { InvoiceHeader } from "@/components/invoice/InvoiceHeader";
import { SenderInfo } from "@/components/invoice/SenderInfo";
import { ClientInfo } from "@/components/invoice/ClientInfo";
import { ItemsTable } from "@/components/invoice/ItemsTable";
import { TotalSection } from "@/components/invoice/TotalSection";
import { MemoSection } from "@/components/invoice/MemoSection";
import { PdfDownloadButton } from "@/components/invoice/PdfDownloadButton";
import { AcceptButton } from "@/components/invoice/AcceptButton";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const invoice = await getInvoiceBySlug(slug);
  if (!invoice) return { title: "견적서를 찾을 수 없습니다" };
  return {
    title: invoice.title,
    description: `${invoice.client_name} 앞 견적서`,
    openGraph: {
      title: invoice.title,
      description: `${invoice.client_name} 앞 견적서`,
    },
  };
}

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invoice = await getInvoiceBySlug(slug);

  if (!invoice) notFound();
  if (invoice.status === "draft") notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8 print:max-w-full print:px-0 print:py-4">
      <div className="flex flex-col gap-6 print:gap-4">
        <div className="flex justify-end no-print">
          <PdfDownloadButton invoice={invoice} />
        </div>

        <InvoiceHeader
          title={invoice.title}
          issue_date={invoice.issue_date}
          due_date={invoice.due_date}
          status={invoice.status}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <SenderInfo sender_name={invoice.sender_name} sender_contact={invoice.sender_contact} />
          <ClientInfo client_name={invoice.client_name} />
        </div>

        <ItemsTable items={invoice.items} />
        <TotalSection total_amount={invoice.total_amount} />
        <MemoSection memo={invoice.memo} />
        <div className="no-print flex justify-center pt-2">
          <AcceptButton
            pageId={invoice.id}
            status={invoice.status}
            slug={invoice.slug}
          />
        </div>
      </div>
    </div>
  );
}
