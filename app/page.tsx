import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "노션 기반 견적서 공유 서비스",
  description:
    "노션 DB에 입력한 견적서를 고유 URL로 공유하고 PDF로 다운로드할 수 있는 서비스입니다.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeatureGrid />

      {/* 사용 방법 섹션 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight">사용 방법</h2>
            <p className="max-w-xl text-muted-foreground">
              3단계로 견적서를 공유할 수 있습니다.
            </p>
          </div>

          <ol className="mx-auto flex max-w-2xl flex-col gap-6">
            {[
              {
                step: "01",
                title: "노션 DB에 견적서 작성",
                desc: "slug, 고객사명, 품목, 금액 등을 노션 데이터베이스에 입력합니다.",
              },
              {
                step: "02",
                title: "상태를 sent로 변경",
                desc: "status 속성을 draft → sent로 바꾸면 견적서 페이지가 즉시 공개됩니다.",
              },
              {
                step: "03",
                title: "URL을 고객에게 전달",
                desc: "/invoice/[slug] 주소를 복사해 고객에게 공유합니다.",
              },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex items-start gap-4">
                <Separator orientation="vertical" className="hidden sm:block h-auto" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {step}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
