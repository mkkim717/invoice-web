import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "레이아웃 예제",
  description: "다양한 레이아웃 패턴과 반응형 디자인 구현 방법을 확인하세요.",
};

export default function LayoutsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
