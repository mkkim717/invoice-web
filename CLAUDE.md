# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Context

- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

## 개발 명령어

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 검사
```

shadcn/ui 컴포넌트 추가:
```bash
npx shadcn@latest add <component>
```

## 기술 스택

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** — `tailwind.config.js` 없음, 테마 토큰은 `app/globals.css`에서 CSS 변수로 관리
- **shadcn/ui v4** — 스타일: `radix-nova`, oklch 색상 공간, `components.json` 설정
- **Zod v4** + **react-hook-form** — 폼 검증
- **next-themes** — 다크/라이트/시스템 테마

## 프로젝트 구조

`src/` 디렉토리 없음. 루트 레벨에서 직접 구성:

```
app/              # Next.js App Router 페이지 및 레이아웃
components/
  ui/             # shadcn/ui 컴포넌트
  layout/         # Header, Footer, ThemeToggle
  examples/       # 예제 페이지용 헬퍼 (CategoryHeader, CodeBlock, ExampleSection)
lib/
  utils.ts        # cn() 유틸리티 (clsx + tailwind-merge)
  constants.ts    # SITE_CONFIG, NAV_LINKS 등 사이트 설정
providers/
  ThemeProvider.tsx  # next-themes 클라이언트 프로바이더
```

경로 alias: `@/*` → 프로젝트 루트 (예: `@/lib/utils`, `@/components/ui/button`)

## 아키텍처 패턴

### 서버/클라이언트 컴포넌트
- **기본값은 서버 컴포넌트** — 인터랙션이 필요한 경우에만 `"use client"` 추가
- 루트 레이아웃(`app/layout.tsx`)은 서버 컴포넌트이며, 클라이언트 Provider(`ThemeProvider`, `TooltipProvider`)를 감쌈
- `usePathname`, `useState`, `useTheme` 등 훅 사용 시 클라이언트 컴포넌트 필요

### 서브 레이아웃 (metadata 전용)
`app/examples/*/layout.tsx` 파일들은 `Metadata`만 export하고 children을 그대로 반환하는 패스스루 패턴:
```tsx
export const metadata: Metadata = { title: "..." };
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

### 스타일링
- `cn()` (`@/lib/utils`)으로 조건부 클래스 결합
- Tailwind CSS v4: CSS `@layer`, `@custom-variant` 사용
- 다크모드: `class` 전략 (`dark` 클래스 토글)

## UI 언어

사용자 대상 텍스트는 한국어로 작성 (`lang="ko"`).
