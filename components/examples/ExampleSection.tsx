"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./CodeBlock";

interface ExampleSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  code: string;
  filename?: string;
}

export function ExampleSection({
  title,
  description,
  children,
  code,
  filename,
}: ExampleSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">미리보기</TabsTrigger>
            <TabsTrigger value="code">코드</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="rounded-lg border border-border bg-background p-6">
              {children}
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={code} filename={filename} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
