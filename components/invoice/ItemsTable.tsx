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
  return (
    <Table>
      <TableCaption className="sr-only">견적 품목 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">품목명</TableHead>
          <TableHead scope="col" className="text-right">수량</TableHead>
          <TableHead scope="col" className="text-right">단가</TableHead>
          <TableHead scope="col" className="text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-right">
              {formatQuantity(item.quantity)}
            </TableCell>
            <TableCell className="text-right">
              <span aria-label={`단가 ${formatKRW(item.unit_price)}`}>
                {formatKRW(item.unit_price)}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <span aria-label={`금액 ${formatKRW(item.amount)}`}>
                {formatKRW(item.amount)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
