import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "usehooks-ts 예제",
  description: "usehooks-ts 라이브러리의 다양한 훅 사용법과 실용적인 예제들입니다.",
};

export default function HooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
