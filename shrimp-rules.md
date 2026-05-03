# Invoice Web — AI Agent 개발 규칙

## 1. 프로젝트 개요

- **목적**: 노션 DB의 견적서 데이터를 고유 URL(`/invoice/[slug]`)로 공유하고 PDF 다운로드를 제공하는 서비스
- **스택**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui v4 (radix-nova) · Zod v4 · next-themes
- **노션 패키지**: `@notionhq/client` (TASK-008에서 설치 예정)
- **`src/` 디렉토리 없음** — 모든 파일은 프로젝트 루트 기준으로 구성

---

## 2. 디렉토리 구조

```
app/                        # Next.js App Router 페이지·레이아웃
  layout.tsx                # 루트 레이아웃 (서버 컴포넌트)
  globals.css               # Tailwind v4 테마 토큰 · @media print CSS
  page.tsx                  # 랜딩 페이지
  invoice/[slug]/
    page.tsx                # 견적서 조회 (ISR, revalidate=60)
    not-found.tsx           # slug 없음·draft 상태
    error.tsx               # 노션 API 오류 폴백 ("use client")
  error.tsx                 # 전역 에러 폴백
  global-error.tsx          # 최상위 에러 폴백

components/
  ui/                       # shadcn/ui 자동 생성 — 직접 편집 금지
  layout/                   # Header · Footer · ThemeToggle
  invoice/                  # 견적서 전용 컴포넌트 (서버 기본, PdfDownloadButton만 클라이언트)
  common/                   # 도메인 비종속 공용 컴포넌트 (LoadingSpinner · EmptyState · ErrorMessage)
  landing/                  # 랜딩 페이지 전용 컴포넌트

lib/
  utils.ts                  # cn() 유틸리티
  constants.ts              # SITE_CONFIG · NAV_LINKS (네비게이션 원천)
  types.ts                  # Invoice · InvoiceItem · InvoiceStatus 타입
  format.ts                 # formatKRW · formatDate · formatQuantity
  notion.ts                 # 노션 API 클라이언트 싱글톤 · getInvoiceBySlug
  notion-mapper.ts          # 노션 페이지 → Invoice 도메인 모델 변환
  env.ts                    # Zod로 환경 변수 런타임 검증

providers/
  ThemeProvider.tsx         # next-themes 클라이언트 프로바이더
```

**경로 alias**: `@/*` → 프로젝트 루트. 예) `@/lib/utils`, `@/components/ui/button`

---

## 3. TypeScript 규칙

- **`any` 타입 사용 절대 금지** — `unknown` 후 타입 가드 또는 Zod 파싱 사용
- 런타임 외부 데이터(노션 API 응답, 환경 변수)는 반드시 Zod 스키마로 파싱
- 인터페이스 정의 위치: `lib/types.ts` (도메인 타입), 각 파일 내부 (파일 전용 타입)
- 네이밍: 변수·함수 `camelCase`, 컴포넌트·타입·인터페이스 `PascalCase`, 상수 `UPPER_SNAKE_CASE`
- 들여쓰기: 2칸

---

## 4. Next.js 16 App Router 패턴

### 동적 라우트 params (필수)
```tsx
// Next.js 16에서 params는 Promise — 반드시 await
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
}
```

### ISR 설정
```tsx
// app/invoice/[slug]/page.tsx 최상단
export const revalidate = 60;
```

### 서브 레이아웃 (metadata 전용 패턴)
```tsx
export const metadata: Metadata = { title: "..." };
export default function Layout({ children }: { children: React.ReactNode }) {
  return children; // children 그대로 반환
}
```

### generateMetadata (동적 metadata)
```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // ...
}
```

### not-found / error 처리
- slug 없음·draft 상태 → `notFound()` 호출 → `not-found.tsx` 렌더링
- 노션 API 예외 → `throw error` → `error.tsx` 렌더링
- `error.tsx`는 반드시 `"use client"` 추가

---

## 5. 서버/클라이언트 컴포넌트 규칙

| 조건 | 컴포넌트 종류 |
|------|--------------|
| 기본값 | 서버 컴포넌트 |
| `useState`, `useEffect`, `useRef` 사용 | 클라이언트 (`"use client"`) |
| `usePathname`, `useRouter`, `useSearchParams` 사용 | 클라이언트 |
| `useTheme`, `next-themes` 훅 사용 | 클라이언트 |
| `window.print()` 등 브라우저 API 사용 | 클라이언트 |
| 노션 API 호출 | 서버 전용 — 클라이언트에서 절대 금지 |

### 하이드레이션 안전 패턴 (테마 등 클라이언트 전용 값)
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <fallback />;
```

---

## 6. 스타일링 규칙 (Tailwind CSS v4)

- **`tailwind.config.js` 생성 금지** — v4에서 불필요
- 테마 토큰(색상·radius·폰트)은 `app/globals.css` `@theme inline { }` 블록에서만 관리
- 색상값은 `oklch` 색상 공간 사용 (예: `oklch(0.205 0 0)`)
- 다크모드 variant: `@custom-variant dark (&:is(.dark *))` — `dark:` 접두사로 사용
- 조건부 클래스 결합: 반드시 `cn()` (`@/lib/utils`) 사용
- `@media print` 규칙: `app/globals.css` 내에 작성

### 컨테이너 패턴 (모든 페이지 섹션에서 일관 적용)
```tsx
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
```

### shadcn/ui 컴포넌트 추가
```bash
npx shadcn@latest add <component>
```
- 설치된 컴포넌트는 `components/ui/`에 자동 생성
- **`components/ui/` 파일 직접 편집 금지** — 커스터마이징 필요 시 wrapper 컴포넌트 생성
- 아이콘 라이브러리: `lucide-react` 사용 (`import { IconName } from "lucide-react"`)

---

## 7. 노션 API 연동 규칙

### 환경 변수
```bash
NOTION_TOKEN=secret_xxx          # 서버 전용
NOTION_DATABASE_ID=xxx           # 서버 전용
```
- **`NEXT_PUBLIC_` 접두사 사용 절대 금지** (클라이언트 번들 노출 차단)
- 새 환경 변수 추가 시 → `.env.local` AND `.env.example` 동시 수정
- `lib/env.ts`에 Zod 검증 추가하여 누락 시 빌드 타임 오류 발생

### API 호출 위치
- 노션 API는 **`lib/notion.ts`에서만** 호출
- 컴포넌트에서 직접 노션 API 호출 금지
- `lib/notion-mapper.ts`에서 노션 원시 응답 → `Invoice` 도메인 모델 변환

### draft 상태 처리
```tsx
if (invoice.status === 'draft') notFound();
```

### items 파싱 (Rich Text JSON)
```typescript
const items = JSON.parse(properties.items.rich_text[0].plain_text) as InvoiceItem[];
```

---

## 8. 다중 파일 동기화 규칙

| 수정 파일 | 반드시 함께 확인·수정할 파일 |
|-----------|------------------------------|
| `lib/constants.ts` (NAV_LINKS 추가) | `components/layout/Header.tsx` 자동 반영 확인 |
| `lib/constants.ts` (SITE_CONFIG 수정) | `components/layout/Footer.tsx`, `app/layout.tsx` metadata 확인 |
| `app/globals.css` (CSS 변수 수정) | 해당 변수를 사용하는 모든 컴포넌트 시각 확인 |
| `.env.local` (환경 변수 추가) | `.env.example`에 키(값 없이) 동시 추가 |
| `lib/types.ts` (Invoice 타입 변경) | `lib/notion-mapper.ts`, `lib/notion.ts`, 관련 컴포넌트 전파 확인 |
| `components/invoice/` 신규 컴포넌트 추가 | `app/invoice/[slug]/page.tsx`에서 import 추가 |
| `app/invoice/[slug]/page.tsx` 수정 | ISR `revalidate = 60` 유지 여부 확인 |

---

## 9. 금액·날짜 포맷 유틸리티

- 금액 표시: `formatKRW(amount)` — `lib/format.ts` (`Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })`)
- 날짜 표시: `formatDate(isoString)` — `lib/format.ts`
- 컴포넌트에서 직접 `Intl.NumberFormat` 호출 금지, 반드시 유틸 함수 사용

---

## 10. PDF 다운로드 패턴

```tsx
// components/invoice/PdfDownloadButton.tsx
"use client";
export function PdfDownloadButton() {
  return <button onClick={() => window.print()}>PDF로 저장</button>;
}
```

```css
/* app/globals.css */
@media print {
  .no-print { display: none; }        /* 헤더·푸터·버튼에 적용 */
  body { background: white; color: black; }
}
```
- 인쇄 시 다크모드 강제 해제 — print 미디어에서는 항상 라이트 색상 적용

---

## 11. AI 의사결정 기준

### 새 컴포넌트 추가 시
1. 인터랙션 없음 → 서버 컴포넌트
2. 인터랙션 있음 → 최소 단위만 `"use client"` 분리
3. 도메인 비종속 → `components/common/`
4. 견적서 전용 → `components/invoice/`
5. 랜딩 전용 → `components/landing/`

### 스타일 토큰 선택 시
- 새 색상 추가 금지 — 기존 `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive` 토큰 활용
- radius는 `rounded-sm`/`rounded-md`/`rounded-lg`/`rounded-xl` 등 Tailwind 유틸 사용

### 에러 처리 우선순위
1. slug 없음 / draft → `notFound()` (404)
2. 노션 API 오류 → `throw error` (error.tsx 폴백)
3. 환경 변수 누락 → `lib/env.ts` Zod 검증으로 빌드 타임 실패

### 반응형 적용 순서
- 모바일 우선: 기본값 → `sm:` → `md:` → `lg:`
- 최소 지원 뷰포트: 320px

---

## 12. 금지 사항

- `tailwind.config.js` 생성 금지
- `any` 타입 사용 금지
- `NEXT_PUBLIC_NOTION_*` 환경 변수 사용 금지
- 클라이언트 컴포넌트에서 노션 API 직접 호출 금지
- `components/ui/` 파일 직접 편집 금지 (shadcn 자동 관리)
- 컴포넌트에서 직접 `Intl.NumberFormat` / `new Date().toLocaleDateString()` 호출 금지 → `lib/format.ts` 유틸 사용
- 동적 라우트에서 `params`를 동기적으로 접근 금지 → 반드시 `await params`
- `invoice` 페이지에서 `revalidate` 생략 금지
- UI 텍스트를 영어로 작성 금지 → 모든 사용자 대상 텍스트는 한국어
