"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STATUS_TABS = [
  { value: "", label: "전체" },
  { value: "draft", label: "초안" },
  { value: "sent", label: "발송됨" },
  { value: "accepted", label: "수락됨" },
  { value: "expired", label: "만료됨" },
] as const;

interface StatusFilterProps {
  currentStatus?: string;
}

export function StatusFilter({ currentStatus }: StatusFilterProps) {
  const router = useRouter();

  return (
    <Tabs
      value={currentStatus ?? ""}
      onValueChange={(value) => {
        router.push(value ? `/admin/invoices?status=${value}` : "/admin/invoices");
      }}
    >
      <TabsList>
        {STATUS_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
