"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { env } from "@/lib/env";
import { COOKIE_NAME, deriveToken } from "@/lib/auth";
import { updateInvoiceStatus } from "@/lib/notion";
import type { InvoiceStatus } from "@/lib/types";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || password !== env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  const token = await deriveToken(env.ADMIN_PASSWORD, env.ADMIN_SECRET);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/admin/invoices");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}

export async function updateStatusAction(pageId: string, status: InvoiceStatus) {
  await updateInvoiceStatus(pageId, status);
  revalidatePath("/admin/invoices");
}
