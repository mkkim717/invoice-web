import { z } from "zod";

const NotionRichTextItemSchema = z.object({
  plain_text: z.string(),
});

export const NotionTextPropertySchema = z.object({
  rich_text: z.array(NotionRichTextItemSchema),
});

export const NotionTitlePropertySchema = z.object({
  title: z.array(NotionRichTextItemSchema),
});

export const NotionDatePropertySchema = z.object({
  date: z.object({ start: z.string() }).nullable(),
});

export const NotionNumberPropertySchema = z.object({
  number: z.number().nullable(),
});

export const NotionRelationPropertySchema = z.object({
  relation: z.array(z.object({ id: z.string() })),
});

export const NotionRollupPropertySchema = z.object({
  rollup: z.object({
    type: z.string(),
    number: z.number().nullable().optional(),
    function: z.string(),
  }),
});

export const NotionFormulaPropertySchema = z.object({
  formula: z.union([
    z.object({ type: z.literal("number"), number: z.number().nullable() }),
    z.object({ type: z.string() }),
  ]),
});

const emptyText = () => ({ rich_text: [] as { plain_text: string }[] });
const emptyDate = () => ({ date: null });

/** Invoice DB 속성 스키마 — 현재 노션 DB 구조 기준 */
export const NotionInvoicePropertiesSchema = z.object({
  title: NotionTitlePropertySchema,
  slug: NotionTextPropertySchema,
  client_name: NotionTextPropertySchema,
  issue_date: NotionDatePropertySchema,
  due_date: NotionDatePropertySchema.optional().default(emptyDate),
  // status는 현재 DB에서 rich_text 타입
  status: NotionTextPropertySchema,
  // total_amount는 rollup 또는 number, 없을 수 있음
  total_amount: z.union([NotionRollupPropertySchema, NotionNumberPropertySchema]).optional(),
  memo: NotionTextPropertySchema.optional().default(emptyText),
  // items는 현재 DB에서 relation 타입
  items: NotionRelationPropertySchema,
  sender_name: NotionTextPropertySchema,
  sender_contact: NotionTextPropertySchema.optional().default(emptyText),
});

/** Items DB 페이지 속성 스키마 */
export const NotionItemPagePropertiesSchema = z.object({
  name: NotionTitlePropertySchema,
  quantity: NotionNumberPropertySchema,
  unit_price: NotionNumberPropertySchema,
  amount: NotionFormulaPropertySchema.optional(),
});

export type NotionInvoiceProperties = z.infer<typeof NotionInvoicePropertiesSchema>;
export type NotionItemPageProperties = z.infer<typeof NotionItemPagePropertiesSchema>;
