import { formatKRW } from "@/lib/format";

interface TotalSectionProps {
  total_amount: number;
}

export function TotalSection({ total_amount }: TotalSectionProps) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-muted-foreground">합계 금액</span>
        <span
          className="text-3xl font-bold tabular-nums"
          aria-label={`합계 금액 ${formatKRW(total_amount)}`}
        >
          {formatKRW(total_amount)}
        </span>
      </div>
    </div>
  );
}
