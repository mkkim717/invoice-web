import type { Metadata } from "next";
import { CategoryHeader } from "@/components/examples/CategoryHeader";
import { ExampleSection } from "@/components/examples/ExampleSection";
import { CodeBlock } from "@/components/examples/CodeBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "설정 및 최적화",
  description: "성능 최적화, SEO 설정 등 프로덕션 환경을 위한 설정 예제입니다.",
};

const META_CODE = `// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Next.js Starter Kit",
    template: "%s | Next.js Starter Kit", // 하위 페이지 제목 패턴
  },
  description: "프로덕션 레디 Next.js 스타터킷",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "개발팀" }],
};

// app/about/page.tsx (서브 페이지)
export const metadata: Metadata = {
  title: "소개", // → "소개 | Next.js Starter Kit"
  description: "스타터킷 소개 페이지입니다.",
};`;

const OG_CODE = `// app/layout.tsx - Open Graph 설정
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Starter Kit",
  description: "프로덕션 레디 스타터킷",
  openGraph: {
    title: "Next.js Starter Kit",
    description: "프로덕션 레디 스타터킷",
    url: "https://example.com",
    siteName: "Next.js Starter Kit",
    images: [
      {
        url: "https://example.com/og.png",
        width: 1200,
        height: 630,
        alt: "Next.js Starter Kit OG Image",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Starter Kit",
    description: "프로덕션 레디 스타터킷",
    images: ["https://example.com/og.png"],
  },
};

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await fetchPost(params.id);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, images: [post.thumbnail] },
  };
}`;

const IMAGE_CODE = `// next/image를 활용한 이미지 최적화
import Image from "next/image";

// 정적 이미지 (자동으로 width/height 감지)
import logo from "@/public/logo.png";

export function OptimizedImage() {
  return (
    <>
      {/* 정적 이미지 */}
      <Image src={logo} alt="로고" />

      {/* 원격 이미지 - next.config.ts에서 도메인 허용 필요 */}
      <Image
        src="https://example.com/photo.jpg"
        alt="사진"
        width={800}
        height={600}
        priority // 뷰포트 상단 이미지에 사용 (LCP 최적화)
      />

      {/* 반응형 이미지 */}
      <div className="relative aspect-video">
        <Image
          src="/banner.jpg"
          alt="배너"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </>
  );
}`;

const FONT_CODE = `// app/layout.tsx - next/font로 폰트 최적화
import { Geist, Geist_Mono } from "next/font/google";

// 빌드 타임에 폰트를 다운로드하여 CSS 변수로 노출
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={\`\${geistSans.variable} \${geistMono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}

// tailwind.config (CSS 변수로 Tailwind에 등록)
// globals.css
// @theme inline {
//   --font-sans: var(--font-geist-sans);
//   --font-mono: var(--font-geist-mono);
// }`;

const ENV_CODE = `# .env.local (절대 git에 커밋하지 마세요)
DATABASE_URL="postgresql://..."
API_SECRET="secret-key"

# 브라우저에서 접근 가능한 환경변수 (NEXT_PUBLIC_ 접두사 필수)
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_ANALYTICS_ID="UA-XXXXX"

# .env.example (git에 커밋, 팀원에게 공유)
DATABASE_URL=""
API_SECRET=""
NEXT_PUBLIC_API_URL=""`;

const ENV_USAGE_CODE = `// 서버 컴포넌트 / API Route에서만 접근 가능
const dbUrl = process.env.DATABASE_URL;
const secret = process.env.API_SECRET;

// 클라이언트 + 서버 양쪽에서 접근 가능
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// TypeScript로 환경변수 타입 안전하게 사용
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);`;

export default function SettingsExamplePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryHeader
        title="설정 및 최적화"
        description="성능 최적화, SEO 설정 등 프로덕션 환경을 위한 설정들입니다."
      />

      <div className="flex flex-col gap-8">
        {/* 메타데이터 */}
        <Card>
          <CardHeader>
            <CardTitle>메타데이터 설정</CardTitle>
            <CardDescription>
              Next.js App Router의 Metadata API를 활용한 SEO 설정입니다. 루트 레이아웃에서 기본값을 설정하고 각 페이지에서 오버라이드합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={META_CODE} filename="app/layout.tsx" />
          </CardContent>
        </Card>

        {/* Open Graph */}
        <Card>
          <CardHeader>
            <CardTitle>Open Graph / SEO</CardTitle>
            <CardDescription>
              소셜 미디어 공유 시 표시되는 Open Graph 메타태그와 동적 메타데이터 생성 방법입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={OG_CODE} filename="app/layout.tsx" />
          </CardContent>
        </Card>

        {/* 이미지 최적화 */}
        <Card>
          <CardHeader>
            <CardTitle>이미지 최적화 (next/image)</CardTitle>
            <CardDescription>
              next/image는 자동으로 WebP/AVIF 변환, 지연 로딩, 반응형 크기 조정을 처리합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={IMAGE_CODE} filename="components/OptimizedImage.tsx" />
          </CardContent>
        </Card>

        {/* 폰트 최적화 */}
        <Card>
          <CardHeader>
            <CardTitle>폰트 최적화 (next/font)</CardTitle>
            <CardDescription>
              next/font는 외부 네트워크 요청 없이 폰트를 자체 호스팅합니다. 레이아웃 시프트(CLS)를 방지합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={FONT_CODE} filename="app/layout.tsx" />
          </CardContent>
        </Card>

        {/* 환경 변수 */}
        <Card>
          <CardHeader>
            <CardTitle>환경 변수 관리</CardTitle>
            <CardDescription>
              <code className="font-mono text-xs bg-muted px-1 rounded">NEXT_PUBLIC_</code> 접두사가 있는 환경변수만 브라우저에 노출됩니다. 민감한 정보는 절대 접두사를 붙이지 마세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CodeBlock code={ENV_CODE} filename=".env.local" />
            <CodeBlock code={ENV_USAGE_CODE} filename="lib/env.ts" />
          </CardContent>
        </Card>

        {/* ExampleSection을 이용한 next.config 예제 */}
        <ExampleSection
          title="next.config.ts 주요 설정"
          description="이미지 도메인 허용, 리다이렉트, 헤더 설정 등 Next.js 설정 파일의 주요 옵션입니다."
          code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 원격 이미지 도메인 허용 (next/image 사용 시)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/images/**",
      },
    ],
  },

  // URL 리다이렉트
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true, // 301 리다이렉트
      },
    ];
  },

  // 보안 헤더 설정
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },

  // 번들 분석 (ANALYZE=true npm run build)
  // 별도 패키지: npm install @next/bundle-analyzer
};

export default nextConfig;`}
        >
          <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            <p>이 예제는 <code className="font-mono text-xs bg-background px-1 rounded">next.config.ts</code>의 일반적인 설정 패턴을 보여줍니다.</p>
            <p className="mt-1">코드 탭을 확인하세요.</p>
          </div>
        </ExampleSection>
      </div>
    </div>
  );
}
