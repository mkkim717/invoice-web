import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Invoice } from "@/lib/types";

type SenderInfoProps = Pick<Invoice, "sender_name" | "sender_contact">;

export function SenderInfo({ sender_name, sender_contact }: SenderInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-normal text-muted-foreground">
          공급자
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-1 text-sm">
          <div className="flex flex-col gap-0.5">
            <dt className="sr-only">이름</dt>
            <dd className="font-semibold">{sender_name}</dd>
          </div>
          {sender_contact && (
            <div className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground">연락처</dt>
              <dd>{sender_contact}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}
