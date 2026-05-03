import { Separator } from "@/components/ui/separator";
import { formatKRW } from "@/lib/format";

interface TotalSectionProps {
  total_amount: number;
}

export function TotalSection({ total_amount }: TotalSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <Separator />
      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-sm text-muted-foreground">합계</span>
        <span
          className="text-lg font-bold"
          aria-label={`합계 금액 ${formatKRW(total_amount)}`}
        >
          {formatKRW(total_amount)}
        </span>
      </div>
    </div>
  );
}
