import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "컴포넌트 쇼케이스",
  description: "모든 UI 컴포넌트의 실제 동작을 확인하고 코드 예제를 살펴보세요.",
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
