import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MemoSectionProps {
  memo: string | null;
}

export function MemoSection({ memo }: MemoSectionProps) {
  if (!memo) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">메모 / 비고</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{memo}</p>
      </CardContent>
    </Card>
  );
}
