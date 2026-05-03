# Invoice Web 개발 로드맵

노션 데이터베이스의 견적서를 고유 URL로 공유하고 고객이 웹/PDF로 확인할 수 있는 서비스의 개발 로드맵입니다.

## 개요

**Invoice Web**은 견적서를 발행하는 1인 사업자 및 소규모 팀을 위한 노션 기반 견적서 공유 서비스로 다음 기능을 제공합니다.

- **노션 DB 기반 견적서 관리**: 노션 데이터베이스에 견적 정보를 입력하면 자동으로 웹 페이지로 발행
- **고유 URL 공유**: `slug` 기반의 고유 URL로 고객에게 견적서 전달
- **웹/PDF 다운로드 뷰어**: 반응형 웹 뷰어 제공 및 브라우저 인쇄(`@media print`) 기반 PDF 저장 지원

## 전체 진행률

**Phase 1 (MVP) 진행률: 약 15% (2 / 13)**

- 완료: 프로젝트 문서화(README, PRD), UI 프레임워크/스타일 시스템 초기 설정
- 진행 중: 없음
- 대기: 노션 API 연동, 견적서 페이지 구현, PDF 다운로드, 배포 등

```
Phase 1 (MVP)        ▓▓░░░░░░░░░░░░░░░░░░  15%  (TASK-001 ~ TASK-013)
Phase 2 (기능 확장)  ░░░░░░░░░░░░░░░░░░░░   0%  (TASK-014 ~ TASK-018)
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

### Phase 1-B: 애플리케이션 골격 구축 (대기)

- **TASK-003: 라우팅 구조 및 빈 페이지 스캐폴드** [TODO] - 우선순위
  - 관련 파일
    - `app/page.tsx` (랜딩 페이지 - 기존 스캐폴드 정리)
    - `app/invoice/[slug]/page.tsx` (견적서 상세, 빈 껍데기)
    - `app/invoice/[slug]/not-found.tsx` (견적서 없음)
    - `app/invoice/[slug]/error.tsx` (페이지 단위 에러)
    - `app/error.tsx` (전역 에러 폴백)
  - 구현 사항
    - Next.js 16 App Router 기반의 모든 핵심 라우트 빈 파일 생성
    - 각 페이지에 placeholder UI만 두고 데이터 페칭은 추후 작업에서 구현
    - `[slug]` 동적 라우팅 시그니처 검증 (`params: Promise<{ slug: string }>`)
    - `app/about/`, `app/dashboard/` 디렉토리 정리 또는 후속 단계 고려

- **TASK-004: 타입 정의 및 데이터 인터페이스 설계** [TODO]
  - 관련 파일
    - `lib/types.ts` (`Invoice`, `InvoiceItem`, `InvoiceStatus` 등)
    - `lib/notion-schema.ts` (노션 속성 ↔ 도메인 모델 매핑 스키마)
  - 구현 사항
    - 노션 DB 속성 스키마(slug, client_name, issue_date, status, total_amount, items, sender_name, memo)에 대응하는 TypeScript 인터페이스 정의
    - Zod 스키마로 런타임 파싱/검증 (`InvoiceSchema`, `InvoiceItemSchema`)
    - 상태 enum: `draft | sent | accepted | expired`
    - **`any` 타입 사용 금지 원칙 준수**

### Phase 1-C: UI/UX 완성 (더미 데이터 활용) (대기)

- **TASK-005: 견적서 UI 컴포넌트 라이브러리 구현** [TODO]
  - 관련 파일
    - `components/invoice/InvoiceHeader.tsx` (서버 컴포넌트)
    - `components/invoice/SenderInfo.tsx` (서버 컴포넌트)
    - `components/invoice/ClientInfo.tsx` (서버 컴포넌트)
    - `components/invoice/ItemsTable.tsx` (서버 컴포넌트)
    - `components/invoice/TotalSection.tsx` (서버 컴포넌트)
    - `components/invoice/MemoSection.tsx` (서버 컴포넌트)
    - `components/invoice/PdfDownloadButton.tsx` (클라이언트 컴포넌트)
    - `components/invoice/InvoiceStatusBadge.tsx` (상태 배지)
  - 구현 사항
    - shadcn/ui 기반의 카드/테이블/버튼 조합으로 견적서 레이아웃 구성
    - 상단: 발행자/수신자 정보, 발행일, 상태 배지
    - 중앙: 품목 테이블 (품목명, 수량, 단가, 합계)
    - 하단: 총액, VAT, 메모 섹션
    - PDF 다운로드 버튼은 클라이언트 컴포넌트 (`window.print()` 호출)
    - **반응형 디자인 필수 (모바일/태블릿/데스크톱)**

- **TASK-006: 더미 데이터 기반 견적서 페이지 UI 완성** [TODO]
  - 관련 파일
    - `app/invoice/[slug]/page.tsx` (더미 데이터 주입 버전)
    - `lib/dummy-invoices.ts` (목 데이터)
  - 구현 사항
    - `lib/dummy-invoices.ts`에 샘플 견적서 3~5건 정의
    - `slug` 파라미터로 더미 데이터 매칭 후 렌더링
    - 매칭 실패 시 `notFound()` 호출하여 not-found 페이지 표출
    - 인쇄용 CSS (`@media print`) 적용 — 헤더/푸터 숨김, 색상/여백 조정
    - 다크/라이트 테마에서 인쇄 시 항상 라이트로 강제

- **TASK-007: 랜딩 페이지 UI 완성** [TODO]
  - 관련 파일
    - `app/page.tsx`
    - `components/landing/HeroSection.tsx`
    - `components/landing/FeatureGrid.tsx`
  - 구현 사항
    - 서비스 소개 Hero 섹션 (타이틀, 서브타이틀, CTA)
    - 핵심 기능 3~4개 카드 그리드
    - 다크/라이트 테마 모두에서 자연스러운 색감 검증
    - 반응형 (모바일 우선) 적용

### Phase 1-D: 핵심 기능 구현 (대기)

- **TASK-008: 노션 API 클라이언트 설치 및 환경 변수 설정** [TODO] - 우선순위
  - 관련 파일
    - `package.json` (`@notionhq/client` 의존성 추가)
    - `.env.local` (`NOTION_TOKEN`, `NOTION_DATABASE_ID`)
    - `.env.example` (커밋용 예시)
    - `lib/env.ts` (Zod로 환경 변수 검증)
  - 구현 사항
    - `npm install @notionhq/client` 실행
    - 노션 Integration 토큰 발급 후 DB 연결
    - 노션 DB 스키마(slug, client_name, ...) 생성 가이드 문서화 (`docs/notion-db-setup.md`)
    - 환경 변수 누락 시 빌드 타임에 명확한 오류 발생하도록 Zod 검증

- **TASK-009: 노션 API 연동 레이어 구현** [TODO]
  - 관련 파일
    - `lib/notion.ts` (노션 클라이언트 싱글톤, `getInvoiceBySlug`, `listInvoices`)
    - `lib/notion-mapper.ts` (노션 페이지 → `Invoice` 도메인 모델 변환)
  - 구현 사항
    - `getInvoiceBySlug(slug: string): Promise<Invoice | null>` 구현
    - 노션 `databases.query`로 `slug` 필터링
    - `items` Rich Text/JSON 필드 파싱 → `InvoiceItem[]`
    - 노션 API 오류는 명확한 도메인 오류로 변환 (`NotionApiError`)
    - **Playwright MCP로 다음 시나리오 검증**
      - 유효한 slug 조회 → 정상 데이터 반환
      - 존재하지 않는 slug → null 반환
      - 노션 API 실패 → 에러 페이지 표시

- **TASK-010: 견적서 페이지를 실제 데이터와 연결 (ISR 적용)** [TODO]
  - 관련 파일
    - `app/invoice/[slug]/page.tsx` (더미 → 실제 노션 데이터로 교체)
    - `app/invoice/[slug]/not-found.tsx`
  - 구현 사항
    - `getInvoiceBySlug(slug)` 호출 후 데이터가 없으면 `notFound()`
    - ISR 설정: `export const revalidate = 60`
    - 메타데이터(`generateMetadata`) 동적 생성 (`title`, `description`, OG 태그)
    - 노션 API 오류 발생 시 `app/invoice/[slug]/error.tsx`로 폴백
    - **Playwright MCP E2E 테스트**
      - 실제 노션 DB의 슬러그로 조회 → UI 정상 렌더링
      - 잘못된 슬러그 접근 → not-found 페이지 표시
      - 60초 후 ISR 재검증 동작 확인

- **TASK-011: PDF 다운로드 기능 구현** [TODO]
  - 관련 파일
    - `components/invoice/PdfDownloadButton.tsx`
    - `app/globals.css` (또는 `app/invoice/[slug]/print.css`) — `@media print` 규칙
  - 구현 사항
    - 버튼 클릭 시 `window.print()` 호출 (브라우저 인쇄 → PDF 저장)
    - 인쇄 시 헤더/푸터/네비게이션/다운로드 버튼/테마 토글 숨김
    - 페이지 마진, 폰트 크기, 색상 보정
    - 인쇄 미리보기에서 1페이지에 적정 분량이 들어가도록 조정
    - **Playwright MCP로 인쇄 미디어 에뮬레이션 테스트** (`page.emulateMedia({ media: 'print' })`)

- **TASK-012: 에러/예외 처리 강화** [TODO]
  - 관련 파일
    - `app/invoice/[slug]/not-found.tsx`
    - `app/invoice/[slug]/error.tsx` ("use client")
    - `app/error.tsx` (전역 폴백)
    - `app/global-error.tsx`
  - 구현 사항
    - 사용자 친화적 한국어 에러 메시지
    - "홈으로 돌아가기" / "다시 시도" CTA 제공
    - 노션 API 오류는 콘솔/서버 로그에 상세히 남기되 사용자에게는 일반화된 메시지 노출
    - **Playwright MCP로 에러 시나리오 테스트** (잘못된 slug, API 다운 시뮬레이션)

### Phase 1-E: 배포 (대기)

- **TASK-013: Vercel 배포 및 운영 환경 검증** [TODO]
  - 관련 파일
    - `next.config.ts` (필요 시 이미지 도메인 등 추가)
    - `vercel.json` (옵션)
    - `docs/deployment.md` (배포 가이드)
  - 구현 사항
    - Vercel 프로젝트 생성 및 GitHub 연동
    - 환경 변수(`NOTION_TOKEN`, `NOTION_DATABASE_ID`) 설정
    - 프리뷰 배포로 ISR/PDF 다운로드/에러 처리 동작 확인
    - 프로덕션 도메인 연결 (선택)
    - **Playwright MCP로 배포된 환경에서 스모크 테스트 수행**
      - 랜딩 페이지 로드
      - 실제 견적서 슬러그 조회
      - PDF 다운로드 흐름

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
