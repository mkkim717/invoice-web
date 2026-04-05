import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/lib/constants";

/** 사이트 푸터 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Separator />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {currentYear} {SITE_CONFIG.name}. All rights reserved.
        </p>
        <p>{SITE_CONFIG.description}</p>
      </div>
    </footer>
  );
}
