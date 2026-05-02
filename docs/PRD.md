# 노션 기반 견적서 웹 서비스 MVP PRD

## 1. 제품 개요

**한 문장 설명**
노션 데이터베이스에 입력된 견적서 내용을 고유 URL로 고객에게 공유하고, 고객이 웹 브라우저에서 확인 후 PDF로 다운로드할 수 있는 서비스.

**문제 정의**
1인 사업자 및 프리랜서는 견적서를 작성할 때 노션을 이미 활용하는 경우가 많지만, 고객에게 공유할 때는 PDF를 직접 만들거나 별도 도구를 사용해야 한다. 이 과정에서 중복 작업이 발생하고, 공유된 노션 링크는 편집 권한 관리가 번거롭다.

**목표**
- 노션에 견적서를 입력하면 → 자동으로 공유 가능한 전용 웹 페이지가 생성됨
- 고객은 로그인 없이 URL 하나로 견적서를 확인하고 PDF로 저장할 수 있음
- 어드민(사업자)은 별도 CMS 없이 노션만으로 견적서를 관리함

---

## 2. 사용자 유형

### 어드민 (사업자 / 프리랜서)
- 노션을 평소에 사용하는 1인 사업자 또는 프리랜서
- 고객에게 견적서를 제출해야 하는 상황에서 이 서비스를 활용
- 이 서비스의 어드민 페이지에는 **직접 접근하지 않음** — 노션 DB가 유일한 입력 인터페이스
- MVP에서 별도 로그인/인증 불필요: 노션 Integration Token은 환경 변수로 관리

### 클라이언트 (고객)
- 어드민으로부터 견적서 URL을 전달받은 고객
- 노션 계정 없음, 이 서비스 로그인 불필요
- 웹 브라우저에서 URL 접속 → 견적서 내용 확인 → PDF 다운로드

---

## 3. 핵심 기능 (MVP 범위)

### 3-1. 노션 DB 스키마 정의

노션 데이터베이스 이름: `견적서 (Invoices)`

| 속성명 (Notion Property) | 타입 | 필수 | 설명 |
|--------------------------|------|------|------|
| `title` (제목) | Title | Y | 견적서 제목 (예: "웹사이트 개발 견적서") |
| `slug` | Rich Text | Y | URL용 고유 식별자 (예: `project-abc-2024`) |
| `client_name` | Rich Text | Y | 고객사명 또는 고객 이름 |
| `issue_date` | Date | Y | 발행일 |
| `due_date` | Date | N | 견적 유효 기간 |
| `status` | Select | Y | `draft` / `sent` / `accepted` / `expired` |
| `total_amount` | Number | Y | 총 금액 (원 단위) |
| `memo` | Rich Text | N | 고객에게 전달할 메모 또는 비고 |
| `items` | Rich Text | Y | 품목 목록 (JSON 문자열로 저장, 아래 형식 참고) |
| `sender_name` | Rich Text | Y | 발신자(사업자) 이름 |
| `sender_contact` | Rich Text | N | 발신자 연락처 또는 이메일 |

**`items` 필드 JSON 형식 예시 (Rich Text에 저장)**

```json
[
  { "name": "UI 디자인", "quantity": 1, "unit_price": 500000, "amount": 500000 },
  { "name": "프론트엔드 개발", "quantity": 1, "unit_price": 2000000, "amount": 2000000 }
]
```

> 노션의 단일 DB에서 관계형 하위 항목(Relation) 대신 Rich Text + JSON을 활용하는 이유:
> Notion API v1의 Relation 속성은 별도 DB 조회가 필요해 API 호출 비용이 증가함.
> MVP에서는 단순성을 위해 Rich Text JSON 방식을 채택.

### 3-2. 견적서 조회 페이지 (고유 URL 방식)

- URL 구조: `/invoice/[slug]`
- `slug`는 노션 DB의 `slug` 속성값과 1:1 매핑
- 페이지 접근 시 서버에서 노션 API를 호출하여 데이터 조회 (Next.js Server Component)
- `status`가 `draft`인 경우: 404 또는 "준비 중" 안내 페이지 반환
- 조회 실패(노션 API 오류, slug 없음): 전용 에러 페이지 표시

**표시 항목**
- 견적서 제목, 발행일, 유효 기간
- 발신자 정보 (이름, 연락처)
- 고객사명
- 품목 테이블 (품목명 / 수량 / 단가 / 금액)
- 합계 금액 (세금 구분 없이 총액만 표시, MVP)
- 메모/비고

### 3-3. PDF 다운로드 기능

- 클라이언트 사이드에서 `window.print()` 기반 인쇄 다이얼로그를 활용하여 PDF 저장
- 전용 인쇄 전용 CSS (`@media print`)로 헤더/푸터/버튼 숨김, 견적서 본문만 출력
- 다운로드 버튼 클릭 → 브라우저 인쇄 다이얼로그 → "PDF로 저장" 선택
- MVP에서 서버 사이드 PDF 생성 라이브러리(puppeteer, @react-pdf/renderer 등) 미사용
  - 이유: 외부 라이브러리 의존성 최소화, Vercel 무료 플랜 호환

### 3-4. 어드민 인증 (MVP 판단)

**MVP에서 어드민 인증 페이지 미구현**

이유:
- 어드민의 유일한 작업은 노션에 데이터를 입력하는 것 → 이 서비스 내에서 어드민이 하는 행동이 없음
- 노션 Integration Token은 `.env.local`의 환경 변수로 관리 (공개 URL로 노출되지 않음)
- 어드민 대시보드(발행된 견적서 목록 확인 등)는 Phase 2 기능

---

## 4. 비기능 요구사항

### 성능
- 견적서 페이지 초기 로딩: 노션 API 응답 기준 3초 이내 목표
- Next.js `revalidate` 설정으로 노션 API 호출 빈도 조절 (기본값: 60초 캐시)
- 정적 생성(SSG) 대신 ISR(증분 정적 재생성) 사용: 노션 데이터 변경 시 반영 필요

### 보안
- 노션 Integration Token은 서버 환경 변수에만 저장, 클라이언트 번들에 미포함
- `NEXT_PUBLIC_` 접두사 사용 금지 (노션 관련 환경 변수)
- `status: draft` 견적서는 URL 직접 접근 시에도 내용 미노출

### 접근성
- 시맨틱 HTML 사용 (`<table>`, `<caption>`, `<th scope>`)
- 금액 표시 시 `aria-label`로 단위 명시
- 다크/라이트 테마 지원 (`next-themes` 활용)
- 모바일 반응형 필수 (뷰포트 기준 320px 이상)

---

## 5. 화면 / 라우트 설계

| 경로 | 페이지명 | 역할 | 인증 |
|------|----------|------|------|
| `/` | 랜딩 페이지 | 서비스 소개, 사용 방법 안내 | 불필요 |
| `/invoice/[slug]` | 견적서 조회 페이지 | 고객이 견적서를 확인하는 핵심 페이지 | 불필요 |
| `/invoice/[slug]/not-found` | 견적서 없음 | slug 미존재 또는 draft 상태 | 불필요 |
| `/error` | 에러 페이지 | 노션 API 오류 등 예외 상황 | 불필요 |

### 페이지별 상세 설명

#### 랜딩 페이지 (`/`)
- 역할: 서비스 진입점, 고객이 URL 없이 접속했을 때의 안내 페이지
- 표시 내용: 서비스 이름, 간단한 사용 방법 설명, 견적서 URL 입력 안내
- 구현: 서버 컴포넌트, 정적 렌더링

#### 견적서 조회 페이지 (`/invoice/[slug]`)
- 역할: 서비스의 핵심 페이지. 고객에게 공유되는 단 하나의 페이지
- 데이터 흐름: 서버에서 노션 API 호출 → 파싱 → Server Component로 렌더링
- 주요 컴포넌트:
  - `InvoiceHeader`: 견적서 제목, 발행일, 유효기간, 상태 배지
  - `SenderInfo`: 발신자 정보
  - `ClientInfo`: 고객사 정보
  - `ItemsTable`: 품목 테이블 (shadcn/ui Table 활용)
  - `TotalSection`: 합계 금액
  - `MemoSection`: 메모/비고
  - `PdfDownloadButton`: 클라이언트 컴포넌트 (`"use client"`)
- 렌더링: ISR (`export const revalidate = 60`)

---

## 6. 데이터 모델

### 노션 DB 속성 스키마 (구현 기준)

```typescript
// lib/types.ts

export interface InvoiceItem {
  name: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export type InvoiceStatus = 'draft' | 'sent' | 'accepted' | 'expired';

export interface Invoice {
  id: string;               // 노션 페이지 ID
  title: string;            // 견적서 제목
  slug: string;             // URL 식별자
  client_name: string;      // 고객사명
  issue_date: string;       // 발행일 (ISO 8601)
  due_date: string | null;  // 유효 기간
  status: InvoiceStatus;    // 상태
  total_amount: number;     // 총 금액
  memo: string | null;      // 메모
  items: InvoiceItem[];     // 품목 목록 (파싱 후)
  sender_name: string;      // 발신자 이름
  sender_contact: string | null; // 발신자 연락처
}
```

### 노션 API 응답 → Invoice 변환

```typescript
// lib/notion.ts 에서 처리

// 노션 API 원시 데이터를 Invoice 타입으로 파싱하는 함수 필요
// - properties.slug.rich_text[0].plain_text
// - properties.items.rich_text[0].plain_text → JSON.parse()
// - properties.status.select.name
// - properties.issue_date.date.start
```

---

## 7. MVP 제외 항목 (Phase 2 이후)

| 기능 | 제외 이유 |
|------|-----------|
| 어드민 로그인 / 대시보드 | 노션이 어드민 UI 역할을 대체함 |
| 서버 사이드 PDF 생성 (puppeteer 등) | Vercel 서버리스 환경 제약 및 복잡도 증가 |
| 견적서 항목 DB 분리 (Notion Relation) | MVP 단순성을 위해 JSON 문자열로 대체 |
| 이메일 발송 기능 | 외부 서비스 연동 필요 |
| 고객 서명 / 수락 기능 | 복잡한 상태 관리 필요 |
| 견적서 버전 관리 | 노션 자체 히스토리 기능으로 대체 |
| 세금계산서 분리 (부가세 등) | 회계 로직 복잡도 증가 |
| 다국어 지원 | MVP 범위 초과 |
| 견적서 템플릿 기능 | 노션 템플릿으로 대체 |
| 실시간 알림 (노션 Webhook) | 별도 서버 인프라 필요 |

---

## 8. 기술 구현 가이드라인

### 환경 변수 설정

```bash
# .env.local
NOTION_TOKEN=secret_xxxxxxxxxxxx          # 노션 Integration Token
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxx  # 견적서 DB ID
```

### 노션 API 클라이언트 (`lib/notion.ts`)

```typescript
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// slug로 견적서 단건 조회
export async function getInvoiceBySlug(slug: string): Promise<Invoice | null> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'slug',
      rich_text: { equals: slug },
    },
  });
  // ...파싱 로직
}
```

### 패키지 설치 필요

```bash
npm install @notionhq/client
```

### Next.js App Router 패턴

- `/invoice/[slug]/page.tsx` — Server Component, ISR
- `revalidate = 60` 설정으로 1분 캐시
- `notFound()` 함수로 draft 또는 미존재 견적서 처리
- `PdfDownloadButton`만 `"use client"` 적용 (나머지는 서버 컴포넌트 유지)

### PDF 다운로드 구현 패턴

```typescript
// components/PdfDownloadButton.tsx
"use client";

export function PdfDownloadButton() {
  return (
    <button onClick={() => window.print()}>
      PDF로 저장
    </button>
  );
}
```

```css
/* app/globals.css — 인쇄 스타일 */
@media print {
  .no-print { display: none; }
  body { background: white; }
}
```

### 금액 표시 유틸리티

```typescript
// lib/utils.ts 에 추가
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}
```

### 컴포넌트 구조

```
components/
  invoice/
    InvoiceHeader.tsx      # 서버 컴포넌트
    SenderInfo.tsx         # 서버 컴포넌트
    ClientInfo.tsx         # 서버 컴포넌트
    ItemsTable.tsx         # 서버 컴포넌트
    TotalSection.tsx       # 서버 컴포넌트
    MemoSection.tsx        # 서버 컴포넌트
    PdfDownloadButton.tsx  # 클라이언트 컴포넌트 ("use client")
```

---

## 9. 개발 우선순위 / 마일스톤

### Phase 1 — MVP (핵심 기능)

| 순서 | 작업 | 설명 |
|------|------|------|
| 1 | 노션 DB 설정 | 속성 스키마대로 DB 생성, Integration 연결 |
| 2 | `@notionhq/client` 설치 및 API 연동 | `lib/notion.ts` 구현, 환경 변수 설정 |
| 3 | 데이터 타입 정의 | `lib/types.ts` — `Invoice`, `InvoiceItem` |
| 4 | 견적서 조회 페이지 | `/invoice/[slug]/page.tsx` — 데이터 조회 및 렌더링 |
| 5 | 견적서 UI 컴포넌트 | `InvoiceHeader`, `ItemsTable`, `TotalSection` 등 |
| 6 | PDF 다운로드 | `PdfDownloadButton` + `@media print` CSS |
| 7 | 에러 처리 | `not-found.tsx`, `error.tsx` |
| 8 | 랜딩 페이지 | `/` — 서비스 소개 |
| 9 | 배포 | Vercel 환경 변수 설정 후 배포 |

### Phase 2 — 기능 확장 (MVP 이후)

- 어드민 대시보드 (발행된 견적서 목록, 상태 변경)
- 이메일 발송 기능 (Resend 또는 SendGrid 연동)
- 고객 수락 기능 (전자 서명 또는 버튼 클릭 확인)
- 서버 사이드 고품질 PDF 생성 (별도 API Route + puppeteer)
- 견적서 만료 자동 처리

---

*최종 수정: 2026-05-02*
