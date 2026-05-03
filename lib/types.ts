import { z } from "zod";

export const InvoiceItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  unit_price: z.number(),
  amount: z.number(),
});

export const InvoiceStatusSchema = z.enum([
  "draft",
  "sent",
  "accepted",
  "expired",
]);

export const InvoiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  client_name: z.string(),
  issue_date: z.string(),
  due_date: z.string().nullable(),
  status: InvoiceStatusSchema,
  total_amount: z.number(),
  memo: z.string().nullable(),
  items: z.array(InvoiceItemSchema),
  sender_name: z.string(),
  sender_contact: z.string().nullable(),
});

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;
export type Invoice = z.infer<typeof InvoiceSchema>;
