import type { NextRequest } from "next/server";
import { listAllInvoices, updateInvoiceStatus } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const invoices = await listAllInvoices();

  const targets = invoices.filter(
    (inv) =>
      inv.status === "sent" &&
      inv.due_date !== null &&
      inv.due_date < today
  );

  const results = await Promise.allSettled(
    targets.map((inv) => updateInvoiceStatus(inv.id, "expired"))
  );

  const processed = results.filter((r) => r.status === "fulfilled").length;
  const errors = results.filter((r) => r.status === "rejected").length;

  return Response.json({ processed, errors, date: today });
}
