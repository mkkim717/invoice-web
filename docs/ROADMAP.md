# Invoice Web 개발 로드맵

노션 데이터베이스의 견적서를 고유 URL로 공유하고 고객이 웹/PDF로 확인할 수 있는 서비스의 개발 로드맵입니다.

## 개요

**Invoice Web**은 견적서를 발행하는 1인 사업자 및 소규모 팀을 위한 노션 기반 견적서 공유 서비스로 다음 기능을 제공합니다.

- **노션 DB 기반 견적서 관리**: 노션 데이터베이스에 견적 정보를 입력하면 자동으로 웹 페이지로 발행
- **고유 URL 공유**: `slug` 기반의 고유 URL로 고객에게 견적서 전달
- **웹/PDF 다운로드 뷰어**: 반응형 웹 뷰어 제공 및 브라우저 인쇄(`@media print`) 기반 PDF 저장 지원

## 전체 진행률

**Phase 1 (MVP) 진행률: 100% (19 / 19) — 완료**

- 완료: 프로젝트 문서화, UI 프레임워크 설정, 라우팅 스캐폴드, 타입 정의, 공용 유틸리티, 견적서 UI 컴포넌트, 더미 데이터 페이지, 랜딩 페이지, 노션 API 클라이언트 설정, 노션 API 연동 레이어, 실제 데이터 연결(ISR), UI 세련화, PDF 인쇄 품질 개선, 에러 처리 강화, PDF 즉시 다운로드 기능, Vercel 배포 가이드, 랜딩 페이지 UI 단순화
- 진행 중: 없음
- 대기: 없음

```
Phase 1 (MVP)        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100%  (TASK-001 ~ TASK-013, TASK-004.5, TASK-019 ~ TASK-022)
Phase 2 (기능 확장)  ░░░░░░░░░░░░░░░░░░░░    0%  (TASK-014 ~ TASK-018)
```

상태 범례

- 완료: 작업이 종료되어 검증된 상태
- 진행: 현재 작업 중인 항목
- 대기(TODO): 아직 시작되지 않은 항목

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `docs/ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-notion-db-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 완료 후 작업 파일 내 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행

4. **로드맵 업데이트**
   - 로드맵의 완료된 작업을 완료 상태로 표시
   - 전체 진행률 갱신

---

## Phase 1: MVP

견적서를 노션 DB에서 가져와 고유 URL로 공유하고 PDF로 다운로드할 수 있는 최소 기능 제품(MVP)을 구축합니다.

### Phase 1-A: 프로젝트 기반 구축 (완료)

- **TASK-001: 프로젝트 문서화 작성** [완료]
  - 관련 파일: `README.md`, `docs/PRD.md`, `CLAUDE.md`, `AGENTS.md`
  - 완료 항목
    - [x] 프로젝트 개요 및 기술 스택 문서화 (`README.md`)
    - [x] PRD(요구사항 명세서) 작성 (`docs/PRD.md`)
    - [x] Claude Code/AGENTS 가이드 작성 (`CLAUDE.md`, `AGENTS.md`)

- **TASK-002: UI 프레임워크 및 스타일 시스템 설정** [완료]
  - 관련 파일: `app/layout.tsx`, `app/globals.css`, `components.json`, `providers/ThemeProvider.tsx`
  - 완료 항목
    - [x] Next.js 16 + React 19 + TypeScript 초기화
    - [x] Tailwind CSS v4 적용 및 `app/globals.css` 테마 토큰 정의
    - [x] shadcn/ui v4 (radix-nova) 설정 (`components.json`)
    - [x] `next-themes` 기반 다크/라이트/시스템 테마 토글
    - [x] 공통 레이아웃 컴포넌트 (`components/layout/Header`, `Footer`, `ThemeToggle`)
    - [x] 경로 alias `@/*` 설정 (`tsconfig.json`)

### Phase 1-B: 애플리케이션 골격 구축 (완료)

- **TASK-003: 라우팅 구조 및 빈 페이지 스캐폴드** [완료]
  - 관련 파일
    - `app/invoice/[slug]/page.tsx` (견적서 상세, placeholder UI)
    - `app/invoice/[slug]/not-found.tsx` (견적서 없음)
    - `app/invoice/[slug]/error.tsx` (페이지 단위 에러)
    - `app/error.tsx` (전역 에러 폴백)
  - 완료 항목
    - [x] `app/invoice/[slug]/page.tsx` — async 서버 컴포넌트, `params: Promise<{ slug: string }>` await 처리, `revalidate = 60`, Skeleton placeholder UI
    - [x] `app/invoice/[slug]/not-found.tsx` — 한국어 안내 메시지, 홈 링크
    - [x] `app/invoice/[slug]/error.tsx` — `"use client"`, error/reset props, 다시 시도 + 홈 버튼, `error.digest` 표시
    - [x] `app/error.tsx` — `"use client"`, 전역 에러 폴백, 홈 링크

- **TASK-004: 타입 정의 및 데이터 인터페이스 설계** [완료]
  - 관련 파일
    - `lib/types.ts` (`Invoice`, `InvoiceItem`, `InvoiceStatus` 등)
    - `lib/notion-schema.ts` (노션 속성 ↔ 도메인 모델 매핑 스키마)
  - 완료 항목
    - [x] `InvoiceItemSchema`, `InvoiceStatusSchema`, `InvoiceSchema` Zod v4 스키마 정의
    - [x] `z.infer<>` 로 TypeScript 타입 추출 — 단일 소스 유지
    - [x] 노션 API 원시 응답 속성 타입 6종 + `NotionInvoicePropertiesSchema` 전체 매핑
    - [x] `any` 타입 없음, TypeScript strict 모드 통과

- **TASK-004.5: 공용 유틸리티 및 shadcn/ui 베이스 컴포넌트 셋업** [완료]
  - 관련 파일
    - `lib/format.ts` (포맷팅 유틸리티 전용 모듈)
    - `components/common/LoadingSpinner.tsx`
    - `components/common/EmptyState.tsx`
    - `components/common/ErrorMessage.tsx`
  - 완료 항목
    - [x] `lib/format.ts` — `formatKRW`, `formatDate`, `formatQuantity` (Intl 객체 모듈 레벨 캐싱)
    - [x] `LoadingSpinner` — `ui/spinner.tsx` 래퍼, `size: 'sm' | 'md' | 'lg'` prop
    - [x] `EmptyState` — icon/title/description/action 선택 props, 서버 컴포넌트
    - [x] `ErrorMessage` — `Alert variant="destructive"` 활용, 서버 컴포넌트

### Phase 1-C: UI/UX 완성 (더미 데이터 활용) (완료)

- **TASK-005: 견적서 UI 컴포넌트 라이브러리 구현** [완료]
  - 관련 파일
    - `components/invoice/InvoiceStatusBadge.tsx` — status → Badge variant 매핑
    - `components/invoice/InvoiceHeader.tsx` — 제목·발행일·유효기간·상태배지
    - `components/invoice/SenderInfo.tsx` — 발신자명·연락처 (null 조건부)
    - `components/invoice/ClientInfo.tsx` — 고객사명
    - `components/invoice/ItemsTable.tsx` — shadcn Table, th scope="col", formatKRW
    - `components/invoice/TotalSection.tsx` — 합계 금액, aria-label
    - `components/invoice/MemoSection.tsx` — memo null 시 return null
    - `components/invoice/PdfDownloadButton.tsx` — "use client", window.print()
  - 완료 항목
    - [x] 8개 컴포넌트 생성 (PdfDownloadButton만 클라이언트, 나머지 서버)
    - [x] Invoice/InvoiceItem 타입 Pick으로 최소 의존성
    - [x] formatKRW/formatDate/formatQuantity 재사용
    - [x] 시맨틱 HTML (caption, th scope, aria-label)

- **TASK-006: 더미 데이터 기반 견적서 페이지 UI 완성** [완료]
  - 관련 파일
    - `lib/dummy-invoices.ts` — Invoice[] 3건 (sent/accepted/expired)
    - `app/invoice/[slug]/page.tsx` — 컴포넌트 조합, generateMetadata
    - `app/globals.css` — @media print 규칙
  - 완료 항목
    - [x] 더미 데이터 3건: web-design-2024, mobile-app-2024, branding-2024
    - [x] slug 매칭 실패 시 notFound() 호출
    - [x] generateMetadata로 동적 title 설정
    - [x] @media print: .no-print, header/footer 숨김, 흰 배경, @page margin 1.5cm

- **TASK-007: 랜딩 페이지 UI 완성** [완료]
  - 관련 파일
    - `components/landing/HeroSection.tsx` — 서비스 소개 Hero
    - `components/landing/FeatureGrid.tsx` — 기능 카드 3개
    - `app/page.tsx` — Invoice 서비스 소개로 전면 교체
  - 완료 항목
    - [x] 스타터킷 내용 완전 제거, Invoice 서비스 소개로 교체
    - [x] 기능 카드 3개 (노션DB 연동 / URL 공유 / PDF 다운로드)
    - [x] 사용방법 3단계 섹션 추가
    - [x] 반응형 그리드 (1열 → 3열)

### Phase 1-D: 핵심 기능 구현 (완료)

- **TASK-008: 노션 API 클라이언트 설치 및 환경 변수 설정** [완료]
  - 관련 파일
    - `package.json` (`@notionhq/client@2` 의존성)
    - `.env.local` (`NOTION_TOKEN`, `NOTION_DATABASE_ID`)
    - `lib/env.ts` (Zod로 환경 변수 검증)
    - `docs/notion-db-setup.md` (DB 구성 가이드)
  - 완료 항목
    - [x] `@notionhq/client@2` 설치 (v5는 API 호환성 문제로 v2 사용)
    - [x] 노션 Integration 생성 및 DB 연결 확인
    - [x] `lib/env.ts` — Zod 검증, 누락 시 빌드 타임 오류 발생
    - [x] `docs/notion-db-setup.md` — 2-DB 구조(견적서 DB + 품목 DB) 가이드

- **TASK-009: 노션 API 연동 레이어 구현** [완료]
  - 관련 파일
    - `lib/notion.ts` (노션 클라이언트 싱글톤, `getInvoiceBySlug`, `listInvoices`)
    - `lib/notion-mapper.ts` (노션 페이지 → `Invoice` 도메인 모델 변환)
    - `lib/notion-schema.ts` (노션 속성 타입 Zod 스키마)
  - 완료 항목
    - [x] `getInvoiceBySlug(slug)` — `databases.query` + slug 필터
    - [x] `listInvoices()` — status 필터(draft 제외), 날짜순 정렬
    - [x] `items` Relation → 품목 페이지 병렬 조회(`pages.retrieve`) → `InvoiceItem[]`
    - [x] `total_amount` — rollup/number 속성 또는 items 합산으로 폴백
    - [x] `NotionApiError` — 도메인 오류 클래스
    - [x] 스크립트 검증: slug 조회, items 조회, 빈 결과 반환 모두 정상

- **TASK-010: 견적서 페이지를 실제 데이터와 연결 (ISR 적용)** [완료]
  - 관련 파일
    - `app/invoice/[slug]/page.tsx` (더미 → 실제 노션 데이터로 교체)
    - `app/invoice/[slug]/not-found.tsx`
  - 완료 항목
    - [x] `DUMMY_INVOICES` → `getInvoiceBySlug()` 실제 노션 API 호출로 교체
    - [x] `draft` 상태 접근 시 `notFound()` 처리
    - [x] `generateMetadata`에 `openGraph` 태그 (`title`, `description`) 추가
    - [x] `MemoSection` 컴포넌트 렌더링 추가
    - [x] `export const revalidate = 60` 유지 (ISR 60초 캐시)
    - [x] 노션 API 오류는 catch 없이 `error.tsx`로 자연 전파

- **TASK-011b: UI 세련화 — 견적서·랜딩 시각 완성도 향상** [완료]
  - 관련 파일
    - `components/invoice/InvoiceStatusBadge.tsx` — 색상+아이콘 시스템 재설계
    - `components/invoice/TotalSection.tsx` — 합계 강조 강화
    - `components/invoice/InvoiceHeader.tsx` — 제목 위계, `due_date` 노출
    - `components/invoice/SenderInfo.tsx` — `sender_contact` 노출
    - `components/invoice/ItemsTable.tsx` — 컨테이너화, 반응형, tabular-nums
    - `components/invoice/MemoSection.tsx` — 본문 색상, 제목 단순화
    - `components/invoice/PdfDownloadButton.tsx` — Printer 아이콘
    - `components/landing/HeroSection.tsx` — CTA 버튼 추가
    - `components/landing/FeatureGrid.tsx` — 호버 효과, 번호 라벨
    - `app/globals.css` — 인쇄 시 카드 보더 제거
  - 완료 항목
    - [x] `InvoiceStatusBadge`: 4상태 bg+text 색상 + lucide 아이콘(FileEdit/Send/CheckCircle2/Clock), 다크모드 대응
    - [x] `TotalSection`: `text-3xl font-bold tabular-nums` + `border-primary/20 bg-primary/5` 강조 박스
    - [x] `InvoiceHeader`: 제목 `text-2xl sm:text-3xl`, "견적서" 라벨, `due_date` 표시(미지정 폴백)
    - [x] `SenderInfo`: `sender_contact` 조건부 표시
    - [x] `ItemsTable`: rounded border 래퍼, `bg-muted/50` 헤더, 모바일 컬럼 숨김 + 보조 라인, tabular-nums, 빈 배열 폴백, key 개선
    - [x] `MemoSection`: 본문 `text-foreground`, 제목 "비고"로 단순화
    - [x] `PdfDownloadButton`: `Printer` 아이콘으로 교체
    - [x] `HeroSection`: 데모 견적서 보기 + GitHub CTA 버튼 2개
    - [x] `FeatureGrid`: 호버 시 보더 색상 변화, 번호 라벨(01/02/03)
    - [x] `globals.css`: 인쇄 시 카드 보더·그림자 제거

- **TASK-011: PDF 인쇄 품질 개선** [완료]
  - 관련 파일
    - `app/globals.css` — `@media print` 규칙 보완
    - `app/invoice/[slug]/page.tsx` — 인쇄 최적화 클래스 추가
  - 완료 항목
    - [x] `print-color-adjust: exact` — Badge/배경색 인쇄 시 보존
    - [x] `break-inside: avoid` — Card 페이지 중간 분할 방지
    - [x] `font-size: 11pt` — 인쇄 폰트 크기 명시
    - [x] `a { color: inherit; text-decoration: none }` — 링크 스타일 제거
    - [x] 컨테이너에 `print:max-w-full print:px-0 print:py-4` — 인쇄 시 전체 폭 사용
    - [x] `tsc --noEmit` 오류 없음

- **TASK-012: 에러/예외 처리 강화** [완료]
  - 관련 파일
    - `app/global-error.tsx` (신규 생성)
    - `app/invoice/[slug]/error.tsx` ("use client")
    - `app/error.tsx` (전역 폴백)
  - 완료 항목
    - [x] `app/global-error.tsx` 신규 생성 — `html`/`body` 포함, 최소 인라인 UI, shadcn 미사용
    - [x] `useEffect console.error('[Global Error]')` — global-error.tsx 로깅
    - [x] `useEffect console.error('[Route Error]')` — app/error.tsx 로깅 추가
    - [x] `useEffect console.error('[Invoice Error]')` — app/invoice/[slug]/error.tsx 로깅 추가
    - [x] 기존 error.tsx UI 변경 없음
    - [x] `tsc --noEmit` 오류 없음

### Phase 1-E: PDF 즉시 다운로드 기능 (완료)

- **TASK-019: react-pdf 의존성 및 Noto Sans KR 폰트 자산 셋업** [완료]
  - 관련 파일
    - `package.json` (`@react-pdf/renderer` 의존성)
    - `public/fonts/NotoSansKR-Regular.otf` (신규)
    - `public/fonts/NotoSansKR-Bold.otf` (신규)
  - 완료 항목
    - [x] `@react-pdf/renderer` 설치 (53개 패키지 추가)
    - [x] Noto Sans KR Regular/Bold `.otf` 파일을 `public/fonts/`에 배치 (SIL OFL, GitHub noto-cjk SubsetOTF)
    - [x] dev 서버에서 `/fonts/NotoSansKR-Regular.otf`, `/fonts/NotoSansKR-Bold.otf` 200 OK 확인
    - [x] `npm run build` 회귀 없음 확인

- **TASK-020: InvoicePdfDocument 신규 컴포넌트 작성 (react-pdf 벡터 PDF 레이아웃)** [완료]
  - 관련 파일
    - `components/invoice/InvoicePdfDocument.tsx` (신규)
  - 완료 항목
    - [x] `Font.register`로 NotoSansKR Regular/Bold `.otf` 임베딩
    - [x] `Document/Page/View/Text + StyleSheet`로 견적서 PDF 레이아웃 구현
    - [x] 헤더(제목·상태배지·발행일·유효기간) → 발신자/고객 2열 → 품목 테이블(헤더 `fixed`) → 합계 → 메모 배치
    - [x] `formatKRW`, `formatDate` 재사용 (`lib/format.ts`)
    - [x] 흰 배경 고정(hex 팔레트, oklch 미사용), TypeScript any 없음

- **TASK-021: PdfDownloadButton 재작성 + InvoicePage 연결 + 다운로드 동작 검증** [완료]
  - 관련 파일
    - `components/invoice/PdfDownloadButton.tsx` (재작성)
    - `app/invoice/[slug]/page.tsx` (prop 전달 추가)
  - 완료 항목
    - [x] `window.print()` 제거, 동적 import로 `@react-pdf/renderer` + `InvoicePdfDocument` 지연 로드
    - [x] `pdf(...).toBlob()` → `URL.createObjectURL` → `<a download>` 트리거 → `URL.revokeObjectURL`
    - [x] `isGenerating` 상태로 버튼 비활성화 + "생성 중..." 라벨
    - [x] 파일명: `invoice-${invoice.slug}.pdf` (ASCII 안전)
    - [x] `<PdfDownloadButton invoice={invoice} />` prop 전달
    - [x] 브라우저 실측: 인쇄 다이얼로그 없이 즉시 다운로드, 한글 정상 출력, 텍스트 복사·검색 가능 확인

### Phase 1-F: UI 개선 (완료)

- **TASK-022: 랜딩 페이지 UI 단순화 (고객 안내 페이지로 교체)** [완료]
  - 관련 파일
    - `app/page.tsx` (전면 교체)
    - `components/landing/HeroSection.tsx` (삭제)
    - `components/landing/FeatureGrid.tsx` (삭제)
  - 완료 항목
    - [x] 마케팅용 Hero + FeatureGrid + 사용 방법 섹션 제거
    - [x] 제목("견적서 조회 시스템") + 부제목 + 3개 카드로 교체
    - [x] 카드 1: 견적서 조회 방법 (링크 받기 → 확인 → PDF 다운로드 3단계)
    - [x] 카드 2: 견적서 URL 예시 (`https://yourdomain.com/invoice/[견적서ID]` 코드 박스)
    - [x] 카드 3: 문제 안내 (담당자 재요청 안내)
    - [x] `HeroSection.tsx`, `FeatureGrid.tsx` 파일 삭제, `npm run build` 통과

### Phase 1-G: 배포 (완료)

- **TASK-013: Vercel 배포 및 운영 환경 검증** [완료]
  - 관련 파일
    - `docs/deployment.md` (배포 가이드)
  - 완료 항목
    - [x] `docs/deployment.md` 작성 — Vercel 배포 단계별 한국어 가이드
    - [x] 필수 환경변수(`NOTION_TOKEN`, `NOTION_DATABASE_ID`)와 선택(`NOTION_ITEMS_DATABASE_ID`) 구분 안내
    - [x] `NEXT_PUBLIC_` 접두사 금지 경고 및 `NODE_ENV` 자동 설정 안내
    - [x] 배포 후 확인 체크리스트 (랜딩/견적서/PDF 다운로드/404/테마/모바일)
    - [x] ISR `revalidate=60` 동작 방식 및 즉시 갱신 방법(`Redeploy`) 안내
    - [x] Vercel 무료 플랜 제약표 (함수 10초, 대역폭 100GB/월)

---

## Phase 2: 기능 확장 (MVP 이후)

MVP 검증 후 운영 효율성과 사용자 경험을 끌어올리는 확장 기능들입니다.

- **TASK-014: 어드민 대시보드** [TODO]
  - 관련 파일: `app/admin/page.tsx`, `app/admin/invoices/page.tsx`, `lib/auth.ts`
  - 구현 사항
    - 발행된 견적서 목록 조회 (노션 DB 기반)
    - 상태별 필터링 (`draft / sent / accepted / expired`)
    - 상태 변경 액션 (노션 페이지 업데이트 API 호출)
    - 간단한 인증(예: NextAuth 또는 Basic Auth) 적용
    - **Playwright MCP로 권한/CRUD 시나리오 테스트**

- **TASK-015: 이메일 발송 기능** [TODO]
  - 관련 파일: `lib/email.ts`, `app/api/invoices/[slug]/send/route.ts`
  - 구현 사항
    - Resend 또는 SendGrid 연동
    - 견적서 URL과 요약 정보를 담은 HTML 메일 템플릿
    - 발송 후 노션 상태를 `sent`로 자동 업데이트
    - 발송 로그 기록
    - **Playwright MCP + 메일 수신함 가짜 서버로 발송 검증**

- **TASK-016: 고객 수락(Accept) 기능** [TODO]
  - 관련 파일: `components/invoice/AcceptButton.tsx`, `app/api/invoices/[slug]/accept/route.ts`
  - 구현 사항
    - 견적서 페이지 하단 "수락하기" 버튼 (클라이언트 컴포넌트)
    - 클릭 시 서버 액션으로 노션 상태 `accepted` 변경
    - (옵션) 전자 서명 컴포넌트 통합
    - 중복 수락 방지 및 만료 견적 차단
    - **Playwright MCP로 수락 → 상태 전이 → UI 반영 흐름 테스트**

- **TASK-017: 서버 사이드 고품질 PDF 생성** [TODO]
  - 관련 파일: `app/api/invoices/[slug]/pdf/route.ts`, `lib/pdf.ts`
  - 구현 사항
    - puppeteer 또는 `@vercel/og` + 별도 렌더러 활용
    - 서버에서 한국어 폰트 임베딩 및 고해상도 렌더링
    - 다운로드 시 파일명 규칙 정의 (`견적서_{client_name}_{issue_date}.pdf`)
    - Vercel 서버리스 환경에서의 메모리/실행 시간 한도 고려
    - **Playwright MCP로 다운로드된 PDF 파일 무결성 검증**

- **TASK-018: 견적서 만료 자동 처리** [TODO]
  - 관련 파일: `app/api/cron/expire/route.ts`, `vercel.json` (Cron)
  - 구현 사항
    - Vercel Cron Jobs로 일 1회 실행
    - 발행일/유효기간 초과 견적을 `expired` 상태로 일괄 변경
    - 만료된 견적 페이지 접근 시 안내 UI 표출
    - 운영 모니터링용 로그/알림 구성

---

## 참고: 핵심 라우트 요약

| 라우트 | 설명 | 비고 |
|--------|------|------|
| `/` | 랜딩 페이지 | 서비스 소개 (TASK-007) |
| `/invoice/[slug]` | 견적서 조회 (고객용) | ISR `revalidate=60` (TASK-010) |
| `/invoice/[slug]/not-found` | 견적서 없음 안내 | TASK-012 |
| `/error` / `/global-error` | 노션 API 오류 등 예외 폴백 | TASK-012 |
| `/admin` | 어드민 대시보드 | Phase 2 (TASK-014) |

## 참고: 노션 DB 핵심 속성

`slug`, `client_name`, `issue_date`, `status(draft/sent/accepted/expired)`, `total_amount`, `items(Rich Text/JSON)`, `sender_name`, `memo`

## 참고: 견적서 컴포넌트 트리

```
components/invoice/
  InvoiceHeader.tsx      # 서버 컴포넌트
  SenderInfo.tsx         # 서버 컴포넌트
  ClientInfo.tsx         # 서버 컴포넌트
  ItemsTable.tsx         # 서버 컴포넌트
  TotalSection.tsx       # 서버 컴포넌트
  MemoSection.tsx        # 서버 컴포넌트
  InvoiceStatusBadge.tsx # 서버 컴포넌트
  PdfDownloadButton.tsx  # 클라이언트 컴포넌트
```
