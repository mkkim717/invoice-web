"use client";

import { useState } from "react";
import {
  useLocalStorage,
  useMediaQuery,
  useDebounceValue,
  useCopyToClipboard,
  useToggle,
  useInterval,
} from "usehooks-ts";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import { CategoryHeader } from "@/components/examples/CategoryHeader";
import { ExampleSection } from "@/components/examples/ExampleSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

/* ──────────────── useLocalStorage ──────────────── */
function LocalStorageDemo() {
  const [count, setCount] = useLocalStorage("example-counter", 0);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        카운터 값이 localStorage에 저장됩니다. 페이지를 새로고침해도 유지됩니다.
      </p>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => setCount((c) => c - 1)}>-</Button>
        <span className="text-2xl font-bold tabular-nums w-16 text-center">{count}</span>
        <Button variant="outline" size="sm" onClick={() => setCount((c) => c + 1)}>+</Button>
        <Button variant="ghost" size="sm" onClick={() => setCount(0)}>초기화</Button>
      </div>
      <p className="text-xs text-muted-foreground">
        key: <code className="font-mono bg-muted px-1 rounded">example-counter</code>
      </p>
    </div>
  );
}

/* ──────────────── useMediaQuery ──────────────── */
function MediaQueryDemo() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">현재 브라우저 환경을 감지합니다.</p>
      <div className="flex flex-wrap gap-2">
        <Badge variant={isMobile ? "default" : "outline"}>
          모바일 {isMobile ? "✓" : "✗"}
        </Badge>
        <Badge variant={isTablet ? "default" : "outline"}>
          태블릿 이하 {isTablet ? "✓" : "✗"}
        </Badge>
        <Badge variant={isDark ? "default" : "outline"}>
          다크 모드 선호 {isDark ? "✓" : "✗"}
        </Badge>
      </div>
    </div>
  );
}

/* ──────────────── useDebounceValue ──────────────── */
function DebounceDemo() {
  const [input, setInput] = useState("");
  const [debouncedValue] = useDebounceValue(input, 500);

  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <p className="text-sm text-muted-foreground">
        입력 후 500ms가 지나야 디바운스된 값이 업데이트됩니다.
      </p>
      <Input
        placeholder="검색어를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="rounded-lg bg-muted p-3 text-sm">
        <p><span className="text-muted-foreground">즉시 값:</span> <code className="font-mono">{input || "(비어있음)"}</code></p>
        <p className="mt-1"><span className="text-muted-foreground">디바운스:</span> <code className="font-mono text-primary">{debouncedValue || "(비어있음)"}</code></p>
      </div>
    </div>
  );
}

/* ──────────────── useCopyToClipboard ──────────────── */
function CopyToClipboardDemo() {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const text = "usehooks-ts를 활용한 클립보드 복사 예제입니다!";

  const handleCopy = async () => {
    const success = await copy(text);
    if (success) {
      setCopied(true);
      toast.success("클립보드에 복사되었습니다");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
        <p className="flex-1 text-sm text-muted-foreground truncate">{text}</p>
        <Button size="sm" variant="ghost" onClick={handleCopy} className="shrink-0">
          {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
        </Button>
      </div>
    </div>
  );
}

/* ──────────────── useToggle ──────────────── */
function ToggleDemo() {
  const [isOn, toggle] = useToggle(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Switch checked={isOn} onCheckedChange={() => toggle()} id="toggle-demo" />
        <Label htmlFor="toggle-demo">
          상태: <span className={isOn ? "text-primary font-medium" : "text-muted-foreground"}>{isOn ? "켜짐" : "꺼짐"}</span>
        </Label>
      </div>
      <Button variant="outline" size="sm" onClick={() => toggle()} className="w-fit">
        toggle() 호출
      </Button>
    </div>
  );
}

/* ──────────────── useInterval ──────────────── */
function IntervalDemo() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => setCount((c) => c + 1),
    isRunning ? 1000 : null
  );

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        1초마다 카운터가 증가합니다. null을 전달하면 인터벌이 멈춥니다.
      </p>
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold tabular-nums w-16">{count}</span>
        <Button
          variant={isRunning ? "destructive" : "default"}
          size="sm"
          onClick={() => setIsRunning((r) => !r)}
        >
          {isRunning ? "정지" : "시작"}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setCount(0); setIsRunning(false); }}>
          초기화
        </Button>
      </div>
    </div>
  );
}

/* ──────────────── 페이지 ──────────────── */
export default function HooksExamplePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryHeader
        title="usehooks-ts 예제"
        description="usehooks-ts 라이브러리의 다양한 훅 사용법과 실용적인 예제들입니다."
      />

      <div className="flex flex-col gap-8">
        <ExampleSection
          title="useLocalStorage"
          description="localStorage에 상태를 영구 저장합니다. 페이지 새로고침 후에도 유지됩니다."
          code={`"use client";

import { useLocalStorage } from "usehooks-ts";

export function LocalStorageDemo() {
  const [count, setCount] = useLocalStorage("my-counter", 0);

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setCount((c) => c - 1)}>-</Button>
      <span>{count}</span>
      <Button onClick={() => setCount((c) => c + 1)}>+</Button>
    </div>
  );
}`}
        >
          <LocalStorageDemo />
        </ExampleSection>

        <ExampleSection
          title="useMediaQuery"
          description="CSS 미디어 쿼리를 React 훅으로 구독합니다."
          code={`"use client";

import { useMediaQuery } from "usehooks-ts";

export function MediaQueryDemo() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div className="flex gap-2">
      <Badge variant={isMobile ? "default" : "outline"}>모바일: {isMobile ? "예" : "아니오"}</Badge>
      <Badge variant={isTablet ? "default" : "outline"}>태블릿: {isTablet ? "예" : "아니오"}</Badge>
      <Badge variant={isDark ? "default" : "outline"}>다크모드: {isDark ? "예" : "아니오"}</Badge>
    </div>
  );
}`}
        >
          <MediaQueryDemo />
        </ExampleSection>

        <ExampleSection
          title="useDebounce"
          description="값의 변경을 지연시켜 불필요한 API 호출을 방지합니다."
          code={`"use client";

import { useState } from "react";
import { useDebounce } from "usehooks-ts";

export function DebounceDemo() {
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 500); // 500ms 지연

  // debouncedValue가 변경될 때 API 호출
  // useEffect(() => {
  //   if (debouncedValue) fetchSearchResults(debouncedValue);
  // }, [debouncedValue]);

  return (
    <div>
      <Input
        placeholder="검색어를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>디바운스된 값: {debouncedValue}</p>
    </div>
  );
}`}
        >
          <DebounceDemo />
        </ExampleSection>

        <ExampleSection
          title="useCopyToClipboard"
          description="텍스트를 클립보드에 복사하는 훅입니다."
          code={`"use client";

import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";

export function CopyToClipboardDemo() {
  const [, copy] = useCopyToClipboard();

  const handleCopy = async () => {
    const success = await copy("복사할 텍스트");
    if (success) toast.success("복사되었습니다!");
  };

  return (
    <Button onClick={handleCopy}>
      <Copy className="mr-2 size-4" />
      클립보드에 복사
    </Button>
  );
}`}
        >
          <CopyToClipboardDemo />
        </ExampleSection>

        <ExampleSection
          title="useToggle"
          description="boolean 상태를 간편하게 토글하는 훅입니다."
          code={`"use client";

import { useToggle } from "usehooks-ts";

export function ToggleDemo() {
  const [isOn, toggle] = useToggle(false);

  return (
    <div className="flex items-center gap-3">
      <Switch checked={isOn} onCheckedChange={() => toggle()} />
      <span>상태: {isOn ? "켜짐" : "꺼짐"}</span>
      <Button onClick={() => toggle()}>토글</Button>
    </div>
  );
}`}
        >
          <ToggleDemo />
        </ExampleSection>

        <ExampleSection
          title="useInterval"
          description="React 방식으로 setInterval을 안전하게 사용하는 훅입니다. null을 전달하면 정지됩니다."
          code={`"use client";

import { useState } from "react";
import { useInterval } from "usehooks-ts";

export function IntervalDemo() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // delay가 null이면 인터벌 정지
  useInterval(
    () => setCount((c) => c + 1),
    isRunning ? 1000 : null
  );

  return (
    <div className="flex items-center gap-4">
      <span>{count}</span>
      <Button onClick={() => setIsRunning((r) => !r)}>
        {isRunning ? "정지" : "시작"}
      </Button>
    </div>
  );
}`}
        >
          <IntervalDemo />
        </ExampleSection>
      </div>
    </div>
  );
}
