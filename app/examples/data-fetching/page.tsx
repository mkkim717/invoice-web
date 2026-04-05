"use client";

import { useState, useCallback, useOptimistic, useTransition } from "react";
import { RefreshCw, AlertCircle, Search } from "lucide-react";
import { CategoryHeader } from "@/components/examples/CategoryHeader";
import { ExampleSection } from "@/components/examples/ExampleSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Post {
  id: number;
  title: string;
  userId: number;
}

/* ──────────────── 기본 fetch ──────────────── */
function BasicFetchDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      if (!res.ok) throw new Error(`HTTP 오류: ${res.status}`);
      const data = await res.json() as Post[];
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={fetchPosts} disabled={loading} className="w-fit">
        {loading && <RefreshCw className="mr-2 size-4 animate-spin" />}
        {loading ? "로딩 중..." : "데이터 불러오기"}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>오류 발생</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!loading && posts.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-20">작성자</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell className="truncate max-w-[300px]">{post.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">#{post.userId}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

/* ──────────────── 검색 + 필터링 ──────────────── */
const ALL_TODOS = [
  { id: 1, title: "할 일 완료하기", done: true },
  { id: 2, title: "장보기", done: false },
  { id: 3, title: "운동하기", done: true },
  { id: 4, title: "독서 30분", done: false },
  { id: 5, title: "코드 리뷰", done: true },
  { id: 6, title: "회의 준비", done: false },
];

function SearchFilterDemo() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  const filtered = ALL_TODOS.filter((todo) => {
    const matchesQuery = todo.title.includes(query);
    const matchesFilter =
      filter === "all" ||
      (filter === "done" && todo.done) ||
      (filter === "pending" && !todo.done);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {(["all", "done", "pending"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {{ all: "전체", done: "완료", pending: "미완료" }[f]}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">검색 결과가 없습니다.</p>
        ) : (
          filtered.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 rounded-lg border px-3 py-2">
              <Badge variant={todo.done ? "default" : "secondary"}>
                {todo.done ? "완료" : "진행 중"}
              </Badge>
              <span className={`text-sm ${todo.done ? "line-through text-muted-foreground" : ""}`}>
                {todo.title}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ──────────────── 낙관적 업데이트 ──────────────── */
interface LikeItem {
  id: number;
  label: string;
  liked: boolean;
  count: number;
}

function OptimisticUpdateDemo() {
  const [items, setItems] = useState<LikeItem[]>([
    { id: 1, label: "Next.js가 좋아요", liked: false, count: 42 },
    { id: 2, label: "React가 최고예요", liked: false, count: 87 },
    { id: 3, label: "TypeScript 필수!", liked: false, count: 31 },
  ]);

  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state: LikeItem[], updatedItem: LikeItem) =>
      state.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  );

  const [isPending, startTransition] = useTransition();

  const handleLike = (item: LikeItem) => {
    const updated: LikeItem = {
      ...item,
      liked: !item.liked,
      count: item.liked ? item.count - 1 : item.count + 1,
    };

    startTransition(async () => {
      addOptimisticItem(updated);
      // 실제 API 호출 시뮬레이션 (500ms 지연)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        버튼을 누르면 즉시 UI가 업데이트됩니다 (낙관적 업데이트). 500ms 후 서버 응답이 반영됩니다.
      </p>
      {optimisticItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
          <span className="text-sm">{item.label}</span>
          <Button
            size="sm"
            variant={item.liked ? "default" : "outline"}
            onClick={() => handleLike(item)}
          >
            ❤️ {item.count}
          </Button>
        </div>
      ))}
    </div>
  );
}

/* ──────────────── 에러 처리 ──────────────── */
function ErrorHandlingDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  const simulateFetch = async (shouldFail: boolean) => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    if (shouldFail) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button onClick={() => simulateFetch(false)} disabled={status === "loading"}>
          {status === "loading" && <RefreshCw className="mr-2 size-4 animate-spin" />}
          성공 시뮬레이션
        </Button>
        <Button variant="destructive" onClick={() => simulateFetch(true)} disabled={status === "loading"}>
          {status === "loading" && <RefreshCw className="mr-2 size-4 animate-spin" />}
          오류 시뮬레이션
        </Button>
        {status !== "idle" && (
          <Button variant="ghost" onClick={() => setStatus("idle")}>
            초기화
          </Button>
        )}
      </div>

      {status === "loading" && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
        </div>
      )}

      {status === "success" && (
        <Alert>
          <AlertTitle>성공!</AlertTitle>
          <AlertDescription>데이터를 성공적으로 불러왔습니다.</AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>요청 실패</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <span>서버와 통신 중 오류가 발생했습니다.</span>
            <Button size="sm" variant="outline" className="w-fit" onClick={() => simulateFetch(false)}>
              <RefreshCw className="mr-2 size-3" />
              재시도
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

/* ──────────────── 페이지 ──────────────── */
export default function DataFetchingExamplePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryHeader
        title="데이터 페칭"
        description="API 호출, 로딩 상태, 에러 처리 등 데이터 관리 예제입니다."
      />

      <div className="flex flex-col gap-8">
        <ExampleSection
          title="기본 fetch"
          description="JSONPlaceholder API를 호출하며 로딩·성공·에러 상태를 처리합니다."
          code={`"use client";

import { useState, useCallback } from "react";

interface Post { id: number; title: string; userId: number; }

export function BasicFetchDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      if (!res.ok) throw new Error(\`HTTP 오류: \${res.status}\`);
      const data = await res.json() as Post[];
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <Button onClick={fetchPosts} disabled={loading}>데이터 불러오기</Button>
      {loading && <Skeleton className="h-10 w-full" />}
      {error && <Alert variant="destructive">{error}</Alert>}
      {posts.map((post) => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}`}
        >
          <BasicFetchDemo />
        </ExampleSection>

        <ExampleSection
          title="검색 + 클라이언트 필터링"
          description="로컬 데이터를 실시간으로 검색하고 필터링하는 패턴입니다."
          code={`"use client";

import { useState } from "react";

const ALL_TODOS = [
  { id: 1, title: "할 일 완료하기", done: true },
  // ...
];

export function SearchFilterDemo() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  const filtered = ALL_TODOS.filter((todo) => {
    const matchesQuery = todo.title.includes(query);
    const matchesFilter =
      filter === "all" ||
      (filter === "done" && todo.done) ||
      (filter === "pending" && !todo.done);
    return matchesQuery && matchesFilter;
  });

  return (
    <div>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="검색..." />
      {/* 필터 버튼들 */}
      {filtered.map((todo) => <div key={todo.id}>{todo.title}</div>)}
    </div>
  );
}`}
        >
          <SearchFilterDemo />
        </ExampleSection>

        <ExampleSection
          title="낙관적 업데이트 (useOptimistic)"
          description="React 19의 useOptimistic으로 서버 응답을 기다리지 않고 UI를 즉시 업데이트합니다."
          code={`"use client";

import { useState, useOptimistic, useTransition } from "react";

export function OptimisticUpdateDemo() {
  const [items, setItems] = useState(initialItems);

  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, updatedItem) =>
      state.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  );

  const [isPending, startTransition] = useTransition();

  const handleLike = (item) => {
    const updated = { ...item, liked: !item.liked, count: item.liked ? item.count - 1 : item.count + 1 };

    startTransition(async () => {
      addOptimisticItem(updated); // UI 즉시 업데이트
      await updateLikeOnServer(item.id); // 실제 API 호출
      setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
    });
  };
}`}
        >
          <OptimisticUpdateDemo />
        </ExampleSection>

        <ExampleSection
          title="에러 처리 패턴"
          description="로딩·성공·에러 상태 전환과 재시도 패턴을 보여줍니다."
          code={`"use client";

import { useState } from "react";

export function ErrorHandlingDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  const fetchData = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <Button onClick={fetchData} disabled={status === "loading"}>불러오기</Button>

      {status === "loading" && <Skeleton />}
      {status === "success" && <Alert>성공!</Alert>}
      {status === "error" && (
        <Alert variant="destructive">
          <AlertDescription>
            오류 발생
            <Button onClick={fetchData}>재시도</Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}`}
        >
          <ErrorHandlingDemo />
        </ExampleSection>
      </div>
    </div>
  );
}
