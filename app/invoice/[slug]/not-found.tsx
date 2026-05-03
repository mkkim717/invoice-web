import Link from "next/link";
import { FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InvoiceNotFound() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <FileSearch className="size-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            견적서를 찾을 수 없습니다
          </h1>
          <p className="max-w-md text-muted-foreground">
            요청하신 견적서가 존재하지 않거나 아직 준비 중입니다.
            URL을 다시 확인하거나 담당자에게 문의해 주세요.
          </p>
        </div>
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
