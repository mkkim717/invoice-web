import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="font-semibold text-foreground">Invoice Web Admin</span>
          <form action={logoutAction}>
            <Button variant="ghost" size="sm" type="submit">
              로그아웃
            </Button>
          </form>
        </div>
      </header>
      <Separator />
      <main className="flex-1">{children}</main>
    </div>
  );
}
