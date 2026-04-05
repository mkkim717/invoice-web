import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "폼 예제",
  description: "react-hook-form과 zod를 활용한 다양한 폼 구현 예제입니다.",
};

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
