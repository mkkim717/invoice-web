# 노션 기반 견적서 웹 서비스

노션(Notion) 데이터베이스에 입력한 견적서를 고유 URL로 고객에게 공유하고, 고객이 웹에서 확인 후 PDF로 다운로드할 수 있는 서비스입니다.

## 주요 기능

- **노션 연동**: 노션 DB에 견적서를 입력하면 자동으로 공유 가능한 웹 페이지 생성
- **고유 URL 공유**: `/invoice/[slug]` 형태로 고객에게 직접 링크 공유
- **PDF 다운로드**: 브라우저 인쇄 기능을 활용한 PDF 저장
- **다크/라이트 테마**: `next-themes` 기반 테마 전환 지원

## 기술 스택

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (radix-nova 스타일)
- **Notion API** (`@notionhq/client`) — 견적서 데이터 소스
- **Zod v4** + **react-hook-form** — 폼 검증

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 노션 API 키를 입력합니다.

```bash
NOTION_TOKEN=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxx
```

노션 Integration 발급: https://www.notion.so/my-integrations

### 3. 노션 데이터베이스 설정

노션에 아래 속성으로 데이터베이스를 생성하고 Integration을 연결합니다.

| 속성명 | 타입 | 설명 |
|--------|------|------|
| `title` | Title | 견적서 제목 |
| `slug` | Rich Text | URL 식별자 (예: `project-abc-2024`) |
| `client_name` | Rich Text | 고객사명 |
| `issue_date` | Date | 발행일 |
| `due_date` | Date | 견적 유효 기간 |
| `status` | Select | `draft` / `sent` / `accepted` / `expired` |
| `total_amount` | Number | 총 금액 |
| `items` | Rich Text | 품목 목록 (JSON 배열) |
| `sender_name` | Rich Text | 발신자 이름 |
| `sender_contact` | Rich Text | 발신자 연락처 |
| `memo` | Rich Text | 비고 |

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인합니다.

## 라우트 구조

| 경로 | 설명 |
|------|------|
| `/` | 랜딩 페이지 |
| `/invoice/[slug]` | 견적서 조회 페이지 (고객용) |

## 개발 명령어

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 검사
```

## 문서

- [PRD (제품 요구사항 문서)](./docs/PRD.md)

## 배포

[Vercel](https://vercel.com)을 권장합니다. 환경 변수(`NOTION_TOKEN`, `NOTION_DATABASE_ID`)를 Vercel 프로젝트 설정에서 추가합니다.
