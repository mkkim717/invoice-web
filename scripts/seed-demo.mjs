// 데모 견적서 3건 + 품목 데이터를 노션 DB에 생성하는 시드 스크립트
// 사용법: node --env-file=.env.local scripts/seed-demo.mjs
import { Client } from "@notionhq/client";

const INVOICE_DB_ID = process.env.NOTION_DATABASE_ID;
const ITEMS_DB_ID = process.env.NOTION_ITEMS_DATABASE_ID;

if (!INVOICE_DB_ID) {
  console.error("❌ NOTION_DATABASE_ID가 설정되지 않았습니다.");
  process.exit(1);
}
if (!ITEMS_DB_ID) {
  console.error("❌ NOTION_ITEMS_DATABASE_ID가 설정되지 않았습니다.");
  console.error("   .env.local에 NOTION_ITEMS_DATABASE_ID=<품목 DB ID>를 추가하세요.");
  process.exit(1);
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });

/** 품목 DB에 단일 품목 페이지 생성 후 page_id 반환 */
async function createItem(name, quantity, unitPrice) {
  const page = await notion.pages.create({
    parent: { database_id: ITEMS_DB_ID },
    properties: {
      name: { title: [{ text: { content: name } }] },
      quantity: { number: quantity },
      unit_price: { number: unitPrice },
    },
  });
  return page.id;
}

/** 견적서 DB에 견적서 페이지 생성 (실제 DB 속성 기준) */
async function createInvoice(invoice, itemIds) {
  await notion.pages.create({
    parent: { database_id: INVOICE_DB_ID },
    properties: {
      title: { title: [{ text: { content: invoice.title } }] },
      slug: { rich_text: [{ text: { content: invoice.slug } }] },
      client_name: { rich_text: [{ text: { content: invoice.clientName } }] },
      issue_date: { date: { start: invoice.issueDate } },
      status: { rich_text: [{ text: { content: invoice.status } }] },
      sender_name: { rich_text: [{ text: { content: invoice.senderName } }] },
      items: { relation: itemIds.map((id) => ({ id })) },
    },
  });
}

async function main() {
  console.log("🌱 데모 데이터 생성 시작...\n");

  // 1. 웹사이트 개발 견적서
  console.log("📄 [1/3] 웹사이트 개발 견적서 생성 중...");
  const webItems = await Promise.all([
    createItem("UI/UX 디자인", 1, 1_500_000),
    createItem("프론트엔드 개발", 1, 3_000_000),
    createItem("백엔드 API 개발", 1, 2_000_000),
  ]);
  await createInvoice(
    {
      title: "웹사이트 개발 견적서",
      slug: "web-design-2024",
      clientName: "(주)테크스타트업",
      issueDate: "2024-11-01",
      status: "sent",
      senderName: "김민근",
    },
    webItems
  );
  console.log("   ✅ slug: web-design-2024\n");

  // 2. 모바일 앱 개발 견적서
  console.log("📄 [2/3] 모바일 앱 개발 견적서 생성 중...");
  const mobileItems = await Promise.all([
    createItem("iOS 앱 개발", 1, 5_000_000),
    createItem("Android 앱 개발", 1, 5_000_000),
    createItem("디자인 시스템 구축", 1, 1_500_000),
  ]);
  await createInvoice(
    {
      title: "모바일 앱 개발 견적서",
      slug: "mobile-app-2024",
      clientName: "스마트커머스",
      issueDate: "2024-10-15",
      status: "accepted",
      senderName: "김민근",
    },
    mobileItems
  );
  console.log("   ✅ slug: mobile-app-2024\n");

  // 3. 브랜딩 작업 견적서
  console.log("📄 [3/3] 브랜딩 작업 견적서 생성 중...");
  const brandingItems = await Promise.all([
    createItem("로고 디자인", 1, 800_000),
    createItem("브랜드 가이드라인", 1, 1_200_000),
    createItem("명함 및 스티커 디자인", 3, 150_000),
  ]);
  await createInvoice(
    {
      title: "브랜딩 작업 견적서",
      slug: "branding-2024",
      clientName: "카페 봄날",
      issueDate: "2024-09-01",
      status: "sent",
      senderName: "김민근",
    },
    brandingItems
  );
  console.log("   ✅ slug: branding-2024\n");

  console.log("🎉 완료! 생성된 데모 견적서:");
  console.log("   → /invoice/web-design-2024");
  console.log("   → /invoice/mobile-app-2024");
  console.log("   → /invoice/branding-2024");
}

main().catch((err) => {
  console.error("❌ 오류:", err.message);
  process.exit(1);
});
