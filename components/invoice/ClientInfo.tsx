import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Invoice } from "@/lib/types";

type ClientInfoProps = Pick<Invoice, "client_name">;

export function ClientInfo({ client_name }: ClientInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-normal">
          공급받는자
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">{client_name}</p>
      </CardContent>
    </Card>
  );
}
