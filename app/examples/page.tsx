import Link from "next/link";
import type { Metadata } from "next";
import {
  Component,
  FileText,
  LayoutGrid,
  Code2,
  Database,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "예제 모음",
  description: "실제 동작하는 예제를 통해 스타터킷의 모든 기능을 탐색하세요.",
};

/** 예제 카테고리 목록 */
const EXAMPLE_CATEGORIES = [
  {
    title: "컴포넌트 쇼케이스",
    description:
      "모든 UI 컴포넌트의 실제 동작을 확인하고 코드 예제를 살펴보세요.",
    href: "/examples/components",
    icon: Component,
    tags: ["UI/UX", "인터랙티브"],
  },
  {
    title: "폼 예제",
    description:
      "react-hook-form과 zod를 활용한 다양한 폼 구현 예제입니다.",
    href: "/examples/forms",
    icon: FileText,
    tags: ["검증", "상태관리"],
  },
  {
    title: "레이아웃 예제",
    description:
      "다양한 레이아웃 패턴과 반응형 디자인 구현 방법을 확인하세요.",
    href: "/examples/layouts",
    icon: LayoutGrid,
    tags: ["반응형", "레이아웃"],
  },
  {
    title: "usehooks-ts 예제",
    description:
      "usehooks-ts 라이브러리의 다양한 훅 사용법과 실용적인 예제들입니다.",
    href: "/examples/hooks",
    icon: Code2,
    tags: ["훅", "유틸리티"],
  },
  {
    title: "데이터 페칭",
    description:
      "API 호출, 로딩 상태, 에러 처리 등 데이터 관리 예제입니다.",
    href: "/examples/data-fetching",
    icon: Database,
    tags: ["API", "비동기"],
  },
  {
    title: "설정 및 최적화",
    description:
      "성능 최적화, SEO 설정, PWA 구현 등 프로덕션 환경을 위한 설정들입니다.",
    href: "/examples/settings",
    icon: Settings,
    tags: ["최적화", "SEO"],
  },
] as const;

export default function ExamplesPage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              예제 모음
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              실제 동작하는 예제를 통해 스타터킷의 모든 기능을 탐색해보세요.
              각 예제는 소스 코드와 함께 제공됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* 카테고리 카드 그리드 */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMPLE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.title} className="flex flex-col">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <CardTitle className="mt-3">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={category.href}>
                        예제 보기
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* 하단 안내문 */}
          <p className="mt-10 text-center text-sm text-muted-foreground">
            💡 각 예제는 실제 코드와 함께 제공되며 자유롭게 복사하여 사용할 수
            있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
