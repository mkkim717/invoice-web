import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Invoice } from "@/lib/types";

type SenderInfoProps = Pick<Invoice, "sender_name">;

export function SenderInfo({ sender_name }: SenderInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-normal">
          공급자
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">{sender_name}</p>
      </CardContent>
    </Card>
  );
}
