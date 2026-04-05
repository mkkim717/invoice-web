/** 사이트 전역 설정 */
export const SITE_CONFIG = {
  name: "Next.js Starter Kit",
  description: "프로덕션 레디 Next.js 스타터킷",
  url: "https://example.com",
} as const;

/** 네비게이션 링크 목록 */
export const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/examples", label: "예제" },
  { href: "/about", label: "소개" },
  { href: "/dashboard", label: "대시보드" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
