/** 사이트 전역 설정 */
export const SITE_CONFIG = {
  name: "Invoice Web",
  description: "노션 기반 견적서 공유 서비스",
  url: "https://example.com",
} as const;

/** 네비게이션 링크 목록 */
export const NAV_LINKS = [
  { href: "/", label: "홈" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
