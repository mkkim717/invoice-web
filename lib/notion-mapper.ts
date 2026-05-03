import { InvoiceSchema, InvoiceStatusSchema } from "@/lib/types";
import { NotionInvoicePropertiesSchema, NotionItemPagePropertiesSchema } from "@/lib/notion-schema";
import type { Invoice, InvoiceItem } from "@/lib/types";

function getRichText(prop: { rich_text: { plain_text: string }[] }): string {
  return prop.rich_text.map((t) => t.plain_text).join("");
}

function getTitle(prop: { title: { plain_text: string }[] }): string {
  return prop.title.map((t) => t.plain_text).join("");
}

function getDate(prop: { date: { start: string } | null }): string | null {
  return prop.date?.start ?? null;
}

function getTotalAmount(prop: unknown): number {
  if (!prop || typeof prop !== "object") return 0;
  if ("rollup" in prop) {
    return (prop as { rollup: { number?: number | null } }).rollup.number ?? 0;
  }
  if ("number" in prop) {
    return (prop as { number: number | null }).number ?? 0;
  }
  return 0;
}

/** Invoice 페이지 → Invoice 도메인 모델 변환 */
export function mapNotionPageToInvoice(
  page: { id: string; properties: unknown },
  items: InvoiceItem[] = []
): Invoice {
  const props = NotionInvoicePropertiesSchema.parse(page.properties);

  const statusRaw = getRichText(props.status);
  const statusResult = InvoiceStatusSchema.safeParse(statusRaw);

  const total_amount = props.total_amount
    ? getTotalAmount(props.total_amount)
    : items.reduce((sum, item) => sum + item.amount, 0);

  return InvoiceSchema.parse({
    id: page.id,
    title: getTitle(props.title),
    slug: getRichText(props.slug),
    client_name: getRichText(props.client_name),
    issue_date: getDate(props.issue_date) ?? new Date().toISOString().slice(0, 10),
    due_date: getDate(props.due_date),
    status: statusResult.success ? statusResult.data : "draft",
    total_amount,
    memo: getRichText(props.memo) || null,
    items,
    sender_name: getRichText(props.sender_name),
    sender_contact: getRichText(props.sender_contact) || null,
  });
}

/** Items DB 페이지 → InvoiceItem 변환 */
export function mapNotionItemPageToInvoiceItem(page: {
  id: string;
  properties: unknown;
}): InvoiceItem | null {
  try {
    // title 속성을 이름에 무관하게 찾기 (DB 컬럼명이 다를 수 있음)
    const rawProps = page.properties as Record<string, unknown>;
    const titleEntry = Object.entries(rawProps).find(
      ([, v]) => typeof v === "object" && v !== null && (v as { type?: string }).type === "title"
    );
    const name = titleEntry
      ? getTitle(titleEntry[1] as { title: { plain_text: string }[] })
      : "";

    const props = NotionItemPagePropertiesSchema.parse(rawProps);
    const quantity = props.quantity.number ?? 0;
    const unit_price = props.unit_price.number ?? 0;

    let amount = quantity * unit_price;
    if (props.amount?.formula && "number" in props.amount.formula) {
      const n = props.amount.formula.number;
      if (n != null) amount = n;
    }

    return { name, quantity, unit_price, amount };
  } catch {
    return null;
  }
}

/** Invoice 페이지 properties에서 items relation ID 목록 추출 */
export function getRelationIds(properties: unknown): string[] {
  if (!properties || typeof properties !== "object") return [];
  const itemsProp = (properties as Record<string, unknown>)["items"];
  if (
    itemsProp &&
    typeof itemsProp === "object" &&
    "relation" in itemsProp &&
    Array.isArray((itemsProp as { relation: unknown[] }).relation)
  ) {
    return (itemsProp as { relation: { id: string }[] }).relation.map((r) => r.id);
  }
  return [];
}
