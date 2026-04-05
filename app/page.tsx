import Link from "next/link";
import {
  Layers,
  Palette,
  Smartphone,
  Zap,
  Shield,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** 기능 목록 데이터 */
const FEATURES = [
  {
    icon: Zap,
    title: "Next.js 16 App Router",
    description:
      "최신 App Router 기반의 서버 컴포넌트로 빠른 초기 로딩과 스트리밍을 지원합니다.",
    badge: "성능",
  },
  {
    icon: Palette,
    title: "Tailwind CSS v4 + shadcn/ui",
    description:
      "CSS 변수 기반 디자인 토큰과 Radix UI 프리미티브로 일관된 디자인 시스템을 제공합니다.",
    badge: "디자인",
  },
  {
    icon: Smartphone,
    title: "반응형 레이아웃",
    description:
      "모바일, 태블릿, 데스크탑 모든 화면 크기에 최적화된 반응형 UI를 기본 제공합니다.",
    badge: "UX",
  },
  {
    icon: Layers,
    title: "다크 모드",
    description:
      "next-themes를 활용한 라이트/다크/시스템 테마 지원으로 사용자 선호 환경을 존중합니다.",
    badge: "테마",
  },
  {
    icon: Shield,
    title: "TypeScript",
    description:
      "엄격한 타입 시스템으로 런타임 오류를 사전에 방지하고 IDE 자동완성을 최대화합니다.",
    badge: "안정성",
  },
  {
    icon: Code2,
    title: "shadcn/ui 컴포넌트",
    description:
      "카드, 뱃지, 시트, 다이얼로그 등 25개 검증된 컴포넌트가 즉시 사용 가능한 상태입니다.",
    badge: "생산성",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <Badge variant="secondary">Next.js 16 + React 19</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              빠르게 시작하는
              <br />
              <span className="text-primary">모던 웹 스타터킷</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Next.js, TypeScript, Tailwind CSS, shadcn/ui가 모두 설정된 프로덕션
              레디 스타터킷입니다. 환경 설정에 시간을 낭비하지 말고 바로
              개발을 시작하세요.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/dashboard">대시보드 보기</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">소개 보기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              모든 것이 준비되어 있습니다
            </h2>
            <p className="max-w-xl text-muted-foreground">
              반복적인 환경 설정 없이 바로 비즈니스 로직 개발에 집중할 수
              있습니다.
            </p>
          </div>

          {/* 기능 카드 3열 그리드 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <Badge variant="outline">{feature.badge}</Badge>
                    </div>
                    <CardTitle className="mt-2">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-muted/50 px-6 py-16 text-center ring-1 ring-border">
            <h2 className="text-3xl font-bold tracking-tight">
              지금 바로 시작하세요
            </h2>
            <p className="max-w-xl text-muted-foreground">
              이 스타터킷을 활용해 여러분의 다음 프로젝트를 빠르게 구축하세요.
              모든 기반이 이미 갖춰져 있습니다.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">대시보드 살펴보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
