import { Client, isFullPage } from "@notionhq/client";
import { env } from "@/lib/env";
import {
  mapNotionPageToInvoice,
  mapNotionItemPageToInvoiceItem,
  getRelationIds,
} from "@/lib/notion-mapper";
import type { Invoice, InvoiceItem, InvoiceStatus } from "@/lib/types";

export class NotionApiError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "NotionApiError";
  }
}

const notion = new Client({ auth: env.NOTION_TOKEN });

/** Relation으로 연결된 Items DB 페이지들을 병렬 조회 */
async function fetchItems(itemIds: string[]): Promise<InvoiceItem[]> {
  if (itemIds.length === 0) return [];

  const results = await Promise.all(
    itemIds.map(async (id) => {
      try {
        const page = await notion.pages.retrieve({ page_id: id });
        if (!isFullPage(page)) return null;
        return mapNotionItemPageToInvoiceItem(page);
      } catch {
        return null;
      }
    })
  );
  return results.filter((i): i is InvoiceItem => i !== null);
}

export async function getInvoiceBySlug(slug: string): Promise<Invoice | null> {
  try {
    const response = await notion.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      filter: {
        property: "slug",
        rich_text: { equals: slug },
      },
    });

    const fullPages = response.results.filter(isFullPage);
    if (fullPages.length === 0) return null;

    const page = fullPages[0];
    const itemIds = getRelationIds(page.properties);
    const items = await fetchItems(itemIds);

    return mapNotionPageToInvoice(page, items);
  } catch (error) {
    if (error instanceof NotionApiError) throw error;
    throw new NotionApiError(
      `slug '${slug}' 견적서 조회 중 오류가 발생했습니다.`,
      error
    );
  }
}

export async function listAllInvoices(): Promise<Invoice[]> {
  try {
    const response = await notion.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      sorts: [{ property: "issue_date", direction: "descending" }],
    });

    const fullPages = response.results.filter(isFullPage);
    const invoices = await Promise.all(
      fullPages.map(async (page) => {
        try {
          const itemIds = getRelationIds(page.properties);
          const items = await fetchItems(itemIds);
          return mapNotionPageToInvoice(page, items);
        } catch {
          return null;
        }
      })
    );

    return invoices.filter((inv): inv is Invoice => inv !== null);
  } catch (error) {
    throw new NotionApiError("전체 견적서 목록 조회 중 오류가 발생했습니다.", error);
  }
}

export async function updateInvoiceStatus(
  pageId: string,
  status: InvoiceStatus
): Promise<void> {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        status: {
          rich_text: [{ type: "text", text: { content: status } }],
        },
      },
    });
  } catch (error) {
    throw new NotionApiError("견적서 상태 업데이트 중 오류가 발생했습니다.", error);
  }
}

export async function listInvoices(): Promise<Invoice[]> {
  try {
    const response = await notion.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      filter: {
        and: [
          { property: "status", rich_text: { is_not_empty: true } },
          { property: "status", rich_text: { does_not_equal: "draft" } },
        ],
      },
      sorts: [{ property: "issue_date", direction: "descending" }],
    });

    const fullPages = response.results.filter(isFullPage);
    const invoices = await Promise.all(
      fullPages.map(async (page) => {
        try {
          const itemIds = getRelationIds(page.properties);
          const items = await fetchItems(itemIds);
          return mapNotionPageToInvoice(page, items);
        } catch {
          return null;
        }
      })
    );

    return invoices.filter((inv): inv is Invoice => inv !== null);
  } catch (error) {
    throw new NotionApiError("견적서 목록 조회 중 오류가 발생했습니다.", error);
  }
}
