import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "데이터 페칭",
  description: "API 호출, 로딩 상태, 에러 처리 등 데이터 관리 예제입니다.",
};

export default function DataFetchingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
