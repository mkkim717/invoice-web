"use client";

import { useState } from "react";
import { CategoryHeader } from "@/components/examples/CategoryHeader";
import { ExampleSection } from "@/components/examples/ExampleSection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ColCount = 1 | 2 | 3 | 4;

function ResponsiveGridDemo() {
  const [cols, setCols] = useState<ColCount>(3);

  const gridClass: Record<ColCount, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {([1, 2, 3, 4] as ColCount[]).map((n) => (
          <Button
            key={n}
            size="sm"
            variant={cols === n ? "default" : "outline"}
            onClick={() => setCols(n)}
          >
            {n}열
          </Button>
        ))}
      </div>
      <div className={cn("grid gap-3", gridClass[cols])}>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex h-16 items-center justify-center rounded-lg bg-muted text-sm font-medium text-muted-foreground"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarLayoutDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex gap-3 rounded-lg border overflow-hidden" style={{ minHeight: 200 }}>
      <div
        className={cn(
          "flex-shrink-0 bg-muted p-3 transition-all duration-200",
          collapsed ? "w-12" : "w-40"
        )}
      >
        <Button
          size="sm"
          variant="ghost"
          className="w-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "← 접기"}
        </Button>
        {!collapsed && (
          <nav className="mt-3 flex flex-col gap-1">
            {["대시보드", "분석", "사용자", "설정"].map((item) => (
              <div
                key={item}
                className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-background hover:text-foreground cursor-default"
              >
                {item}
              </div>
            ))}
          </nav>
        )}
      </div>
      <div className="flex-1 p-4">
        <p className="text-sm font-medium">메인 콘텐츠 영역</p>
        <p className="mt-1 text-sm text-muted-foreground">
          사이드바를 접으면 더 많은 공간을 활용할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

function HolyGrailDemo() {
  return (
    <div className="flex flex-col gap-1 rounded-lg overflow-hidden border text-xs text-center" style={{ minHeight: 200 }}>
      <div className="bg-primary/10 px-3 py-2 font-medium text-primary">헤더</div>
      <div className="flex flex-1 gap-1">
        <div className="w-20 bg-muted/70 p-2 font-medium text-muted-foreground flex items-center justify-center">
          사이드바
        </div>
        <div className="flex-1 bg-background p-3 flex items-center justify-center">
          <span className="text-muted-foreground">메인 콘텐츠</span>
        </div>
        <div className="w-20 bg-muted/70 p-2 font-medium text-muted-foreground flex items-center justify-center">
          어사이드
        </div>
      </div>
      <div className="bg-primary/10 px-3 py-2 font-medium text-primary">푸터</div>
    </div>
  );
}

function CardGalleryDemo() {
  const items = [
    { title: "카드 1", height: "h-24", color: "bg-blue-500/10" },
    { title: "카드 2", height: "h-36", color: "bg-green-500/10" },
    { title: "카드 3", height: "h-20", color: "bg-purple-500/10" },
    { title: "카드 4", height: "h-32", color: "bg-orange-500/10" },
    { title: "카드 5", height: "h-28", color: "bg-pink-500/10" },
    { title: "카드 6", height: "h-16", color: "bg-cyan-500/10" },
  ];

  return (
    <div className="columns-2 gap-3 sm:columns-3">
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "mb-3 break-inside-avoid rounded-lg p-4 text-sm font-medium flex items-center justify-center",
            item.height,
            item.color
          )}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default function LayoutsExamplePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryHeader
        title="레이아웃 예제"
        description="다양한 레이아웃 패턴과 반응형 디자인 구현 방법을 확인하세요."
      />

      <div className="flex flex-col gap-8">
        <ExampleSection
          title="반응형 그리드"
          description="버튼으로 열 수를 조절하는 동적 그리드 레이아웃입니다."
          code={`"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ColCount = 1 | 2 | 3 | 4;

export function ResponsiveGridDemo() {
  const [cols, setCols] = useState<ColCount>(3);

  const gridClass: Record<ColCount, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {([1, 2, 3, 4] as ColCount[]).map((n) => (
          <Button
            key={n}
            size="sm"
            variant={cols === n ? "default" : "outline"}
            onClick={() => setCols(n)}
          >
            {n}열
          </Button>
        ))}
      </div>
      <div className={cn("grid gap-3", gridClass[cols])}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex h-16 items-center justify-center rounded-lg bg-muted">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}`}
        >
          <ResponsiveGridDemo />
        </ExampleSection>

        <ExampleSection
          title="사이드바 레이아웃"
          description="접을 수 있는 사이드바와 메인 콘텐츠 영역을 포함한 레이아웃입니다."
          code={`"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function SidebarLayoutDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex gap-3 rounded-lg border overflow-hidden">
      {/* 사이드바 */}
      <div className={cn(
        "flex-shrink-0 bg-muted p-3 transition-all duration-200",
        collapsed ? "w-12" : "w-40"
      )}>
        <Button size="sm" variant="ghost" className="w-full" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "→" : "← 접기"}
        </Button>
        {!collapsed && (
          <nav className="mt-3 flex flex-col gap-1">
            {["대시보드", "분석", "사용자", "설정"].map((item) => (
              <div key={item} className="rounded-md px-2 py-1.5 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* 메인 */}
      <div className="flex-1 p-4">
        <p className="text-sm font-medium">메인 콘텐츠 영역</p>
      </div>
    </div>
  );
}`}
        >
          <SidebarLayoutDemo />
        </ExampleSection>

        <ExampleSection
          title="Holy Grail 레이아웃"
          description="헤더, 사이드바, 메인 콘텐츠, 어사이드, 푸터를 포함한 완전한 페이지 레이아웃입니다."
          code={`export function HolyGrailDemo() {
  return (
    <div className="flex flex-col gap-1 rounded-lg overflow-hidden border">
      {/* 헤더 */}
      <div className="bg-primary/10 px-3 py-2 text-center font-medium text-primary">
        헤더
      </div>

      {/* 본문: 사이드바 + 메인 + 어사이드 */}
      <div className="flex flex-1 gap-1">
        <div className="w-20 bg-muted/70 p-2 text-center">사이드바</div>
        <div className="flex-1 bg-background p-3 text-center">메인 콘텐츠</div>
        <div className="w-20 bg-muted/70 p-2 text-center">어사이드</div>
      </div>

      {/* 푸터 */}
      <div className="bg-primary/10 px-3 py-2 text-center font-medium text-primary">
        푸터
      </div>
    </div>
  );
}`}
        >
          <HolyGrailDemo />
        </ExampleSection>

        <ExampleSection
          title="카드 갤러리 (Masonry)"
          description="CSS columns를 활용한 핀터레스트 스타일의 갤러리 레이아웃입니다."
          code={`export function CardGalleryDemo() {
  const items = [
    { title: "카드 1", height: "h-24", color: "bg-blue-500/10" },
    { title: "카드 2", height: "h-36", color: "bg-green-500/10" },
    // ...
  ];

  return (
    // columns-2 sm:columns-3 으로 반응형 열 수 조절
    <div className="columns-2 gap-3 sm:columns-3">
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "mb-3 break-inside-avoid rounded-lg p-4",
            item.height,
            item.color
          )}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}`}
        >
          <CardGalleryDemo />
        </ExampleSection>

        <ExampleSection
          title="센터링 패턴"
          description="Flexbox와 Grid를 활용한 수직/수평 중앙 정렬 패턴입니다."
          code={`// Flexbox 센터링
<div className="flex items-center justify-center h-32 bg-muted rounded-lg">
  중앙 정렬 (Flexbox)
</div>

// Grid 센터링
<div className="grid place-items-center h-32 bg-muted rounded-lg">
  중앙 정렬 (Grid)
</div>

// 절대 위치 센터링
<div className="relative h-32 bg-muted rounded-lg">
  <div className="absolute inset-0 flex items-center justify-center">
    중앙 정렬 (Absolute)
  </div>
</div>`}
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex h-24 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
              Flexbox
            </div>
            <div className="grid h-24 place-items-center rounded-lg bg-muted text-sm text-muted-foreground">
              Grid
            </div>
            <div className="relative h-24 rounded-lg bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                Absolute
              </div>
            </div>
          </div>
        </ExampleSection>
      </div>
    </div>
  );
}
