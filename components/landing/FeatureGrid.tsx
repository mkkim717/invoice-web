import { Database, Link2, FileDown } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const FEATURES = [
  {
    icon: Database,
    title: "노션 DB 연동",
    description:
      "노션 데이터베이스가 곧 어드민 대시보드입니다. 별도 CMS 없이 노션에서 견적서를 작성·관리하세요.",
    number: "01",
  },
  {
    icon: Link2,
    title: "고유 URL 공유",
    description:
      "각 견적서마다 고유한 슬러그 URL이 생성됩니다. 링크 하나를 고객에게 전달하면 끝입니다.",
    number: "02",
  },
  {
    icon: FileDown,
    title: "PDF 다운로드",
    description:
      "브라우저 인쇄 기능을 활용해 깔끔한 PDF를 저장할 수 있습니다. 별도 설치나 변환 불필요.",
    number: "03",
  },
] as const;

export function FeatureGrid() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight">핵심 기능</h2>
          <p className="max-w-xl text-muted-foreground">
            복잡한 설정 없이 노션과 URL만으로 견적서를 공유합니다.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="transition-colors hover:border-primary/50 cursor-default"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {feature.number}
                    </span>
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
  );
}
