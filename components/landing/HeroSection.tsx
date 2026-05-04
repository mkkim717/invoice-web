import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">노션 연동 · 무료 오픈 소스</Badge>

          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <FileText className="size-8 text-primary" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            노션으로 작성한 견적서를
            <br />
            <span className="text-primary">URL 하나로 공유하세요</span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            노션 데이터베이스에 견적 내용을 입력하면 고유 웹 페이지가 자동으로 생성됩니다.
            고객은 로그인 없이 URL로 확인하고 PDF로 저장할 수 있습니다.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/invoice/web-design-2024">데모 견적서 보기</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                href="https://github.com/mkkim717/invoice-web"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
