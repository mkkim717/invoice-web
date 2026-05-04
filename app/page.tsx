import type { Metadata } from "next";
import { FileText, Download, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "견적서 조회 시스템",
  description: "노션 기반 견적서 관리 시스템",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold">견적서 조회 시스템</h1>
          <p className="mt-2 text-muted-foreground">
            노션 기반 견적서 관리 시스템에 오신 것을 환영합니다
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="size-4" />
                견적서 조회 방법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">1. 견적서 링크 받기</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  발행자로부터 이메일이나 메신저를 통해 견적서 고유 링크를 받습니다.
                </p>
              </div>
              <div>
                <p className="font-semibold">2. 견적서 확인</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  링크를 클릭하면 견적서 내용을 웹에서 바로 확인할 수 있습니다.
                </p>
              </div>
              <div>
                <p className="font-semibold">3. PDF 다운로드</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  견적서 페이지에서 &apos;PDF 다운로드&apos; 버튼을 클릭하여 파일로 저장하거나 인쇄할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Download className="size-4" />
                견적서 URL 예시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted px-4 py-3 font-mono text-sm">
                https://yourdomain.com/invoice/[견적서ID]
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                발행자가 보낸 링크의 [견적서ID] 부분은 각 견적서마다 고유한 값입니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="size-4" />
                문제가 있나요?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                견적서를 찾을 수 없거나 문제가 발생한 경우, 견적서를 발행한 담당자에게 올바른 링크를 다시 요청해 주세요.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
