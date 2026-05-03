// 노션 API 통합 테스트 (Relation items 방식)
import { Client, isFullPage } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function fetchItemPages(itemIds) {
  if (itemIds.length === 0) return [];
  const results = await Promise.all(
    itemIds.map(async (id) => {
      try {
        const page = await notion.pages.retrieve({ page_id: id });
        if (page.object !== "page") return null;
        const props = page.properties;
        const titleEntry = Object.entries(props).find(([, v]) => v.type === "title");
        const name = titleEntry?.[1]?.title?.[0]?.plain_text ?? "(이름 없음)";
        const quantity = props["quantity"]?.number ?? 0;
        const unit_price = props["unit_price"]?.number ?? 0;
        const amount = props["amount"]?.formula?.number ?? quantity * unit_price;
        return { name, quantity, unit_price, amount };
      } catch (e) {
        return null;
      }
    })
  );
  return results.filter(Boolean);
}

async function main() {
  console.log("=== 노션 Relation items 통합 테스트 ===\n");

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    page_size: 5,
  });

  const fullPages = response.results.filter((p) => p.object === "page");
  console.log(`총 ${fullPages.length}개 페이지\n`);

  for (const page of fullPages) {
    const props = page.properties;
    const title = props["title"]?.title?.[0]?.plain_text ?? "(제목 없음)";
    const slug = props["slug"]?.rich_text?.[0]?.plain_text ?? "(없음)";
    const status = props["status"]?.rich_text?.[0]?.plain_text ?? "(없음)";
    const clientName = props["client_name"]?.rich_text?.[0]?.plain_text ?? "(없음)";
    const itemRelations = props["items"]?.relation ?? [];

    console.log(`[${page.id.slice(0, 8)}] ${title}`);
    console.log(`  slug: ${slug} | status: ${status} | client: ${clientName}`);
    console.log(`  items relation 수: ${itemRelations.length}개`);

    if (itemRelations.length > 0) {
      const itemIds = itemRelations.map((r) => r.id);
      const items = await fetchItemPages(itemIds);
      for (const item of items) {
        console.log(`    - ${item.name}: ${item.quantity}개 × ${item.unit_price.toLocaleString()}원 = ${item.amount.toLocaleString()}원`);
      }
    }
    console.log();
  }

  // slug 필터 테스트
  console.log("--- 존재하지 않는 slug 필터 테스트 ---");
  const r2 = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: { property: "slug", rich_text: { equals: "nonexistent-12345" } },
  });
  console.log(r2.results.filter((p) => p.object === "page").length === 0
    ? "✅ 빈 결과 정상"
    : "❌ 예상치 못한 결과");
}

main().catch(console.error);
