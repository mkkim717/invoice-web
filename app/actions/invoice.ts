"use server";

import { revalidatePath } from "next/cache";
import { updateInvoiceStatus } from "@/lib/notion";

export async function acceptInvoiceAction(pageId: string, slug: string) {
  await updateInvoiceStatus(pageId, "accepted");
  revalidatePath(`/invoice/${slug}`);
}
