import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatKRW, formatQuantity } from "@/lib/format";
import type { InvoiceItem } from "@/lib/types";

interface ItemsTableProps {
  items: InvoiceItem[];
}

export function ItemsTable({ items }: ItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border overflow-hidden">
        <p className="py-8 text-center text-sm text-muted-foreground">
          등록된 품목이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableCaption className="sr-only">견적 품목 목록</TableCaption>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead scope="col">품목명</TableHead>
            <TableHead scope="col" className="hidden text-right sm:table-cell">수량</TableHead>
            <TableHead scope="col" className="hidden text-right sm:table-cell">단가</TableHead>
            <TableHead scope="col" className="text-right">금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={`${item.name}-${index}`}>
              <TableCell className="font-medium">
                <span>{item.name}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground sm:hidden">
                  {formatQuantity(item.quantity)}개 × {formatKRW(item.unit_price)}
                </span>
              </TableCell>
              <TableCell className="hidden text-right tabular-nums sm:table-cell">
                {formatQuantity(item.quantity)}
              </TableCell>
              <TableCell className="hidden text-right tabular-nums sm:table-cell">
                <span aria-label={`단가 ${formatKRW(item.unit_price)}`}>
                  {formatKRW(item.unit_price)}
                </span>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                <span aria-label={`금액 ${formatKRW(item.amount)}`}>
                  {formatKRW(item.amount)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
