import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "소개",
  description: "Next.js Starter Kit 소개 페이지",
};

/** 기술 스택 목록 */
const TECH_STACK = [
  { name: "Next.js 16", description: "App Router, Server Components, Streaming" },
  { name: "React 19", description: "최신 React 기능 및 동시성 모드" },
  { name: "TypeScript", description: "엄격한 타입 시스템으로 안전한 코드" },
  { name: "Tailwind CSS v4", description: "CSS 변수 기반 유틸리티 퍼스트 CSS" },
  { name: "shadcn/ui v4", description: "Radix UI 기반 접근성 컴포넌트" },
  { name: "next-themes", description: "라이트/다크/시스템 테마 지원" },
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* 페이지 헤더 */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">소개</Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Next.js Starter Kit이란?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          반복적인 프로젝트 초기 설정 없이 바로 개발을 시작할 수 있도록
          설계된 프로덕션 레디 Next.js 스타터킷입니다.
        </p>
      </div>

      <Separator className="mb-12" />

      {/* 소개 본문 */}
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="mb-3 text-2xl font-semibold">왜 이 스타터킷인가요?</h2>
            <p className="text-muted-foreground leading-relaxed">
              새 프로젝트를 시작할 때마다 동일한 설정을 반복하는 것은
              시간 낭비입니다. 다크 모드 설정, 반응형 레이아웃, 컴포넌트
              라이브러리 연동 등을 매번 처음부터 구성하는 대신, 이미
              검증된 구성으로 즉시 시작하세요.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">어떻게 사용하나요?</h2>
            <p className="text-muted-foreground leading-relaxed">
              이 저장소를 클론하거나 템플릿으로 사용하면 됩니다.
              모든 의존성이 설치되어 있고, 설정이 완료되어 있으므로
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                npm run dev
              </code>
              명령어 하나로 개발을 시작할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <Button asChild>
              <Link href="/dashboard">
                대시보드 보기 <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="mr-1 size-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* 기술 스택 카드 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">기술 스택</h2>
          {TECH_STACK.map((tech) => (
            <Card key={tech.name} size="sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{tech.name}</CardTitle>
                  <Globe className="size-4 text-muted-foreground" />
                </div>
                <CardDescription>{tech.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-12" />

      {/* 포함된 컴포넌트 안내 */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold">포함된 shadcn/ui 컴포넌트</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "button", "card", "badge", "separator", "skeleton", "spinner",
            "sheet", "dropdown-menu", "tabs", "breadcrumb",
            "dialog", "sonner", "alert", "tooltip", "popover",
            "input", "label", "select", "checkbox", "textarea", "switch",
            "table", "avatar", "scroll-area", "progress",
          ].map((component) => (
            <Badge key={component} variant="outline">
              {component}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
