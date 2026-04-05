"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CategoryHeader } from "@/components/examples/CategoryHeader";
import { ExampleSection } from "@/components/examples/ExampleSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AlertCircle, Info, Terminal, ChevronDown } from "lucide-react";

export default function ComponentsExamplePage() {
  const [progress, setProgress] = useState(60);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryHeader
        title="컴포넌트 쇼케이스"
        description="모든 UI 컴포넌트의 실제 동작을 확인하고 코드 예제를 살펴보세요."
      />

      <div className="flex flex-col gap-8">
        {/* 버튼 & 뱃지 */}
        <ExampleSection
          title="버튼 (Button)"
          description="다양한 variant와 size를 지원하는 버튼 컴포넌트입니다."
          code={`import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>기본</Button>
      <Button variant="outline">아웃라인</Button>
      <Button variant="secondary">보조</Button>
      <Button variant="ghost">고스트</Button>
      <Button variant="destructive">위험</Button>
      <Button variant="link">링크</Button>
      <Button size="sm">소형</Button>
      <Button size="lg">대형</Button>
      <Button disabled>비활성화</Button>
    </div>
  );
}`}
        >
          <div className="flex flex-wrap gap-3">
            <Button>기본</Button>
            <Button variant="outline">아웃라인</Button>
            <Button variant="secondary">보조</Button>
            <Button variant="ghost">고스트</Button>
            <Button variant="destructive">위험</Button>
            <Button variant="link">링크</Button>
            <Button size="sm">소형</Button>
            <Button size="lg">대형</Button>
            <Button disabled>비활성화</Button>
          </div>
        </ExampleSection>

        <ExampleSection
          title="뱃지 (Badge)"
          description="상태나 카테고리를 표시하는 뱃지 컴포넌트입니다."
          code={`import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>기본</Badge>
      <Badge variant="secondary">보조</Badge>
      <Badge variant="outline">아웃라인</Badge>
      <Badge variant="destructive">위험</Badge>
    </div>
  );
}`}
        >
          <div className="flex flex-wrap gap-2">
            <Badge>기본</Badge>
            <Badge variant="secondary">보조</Badge>
            <Badge variant="outline">아웃라인</Badge>
            <Badge variant="destructive">위험</Badge>
          </div>
        </ExampleSection>

        {/* 입력 요소 */}
        <ExampleSection
          title="입력 폼 요소"
          description="Input, Textarea, Select, Checkbox, Switch 등 기본 입력 컴포넌트입니다."
          code={`import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FormElementsDemo() {
  return (
    <div className="grid gap-4 max-w-sm">
      <div className="grid gap-1.5">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="name@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bio">자기소개</Label>
        <Textarea id="bio" placeholder="자기소개를 입력하세요..." />
      </div>
      <div className="grid gap-1.5">
        <Label>역할</Label>
        <Select>
          <SelectTrigger><SelectValue placeholder="역할 선택" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">관리자</SelectItem>
            <SelectItem value="user">사용자</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree">약관 동의</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notify" />
        <Label htmlFor="notify">알림 활성화</Label>
      </div>
    </div>
  );
}`}
        >
          <div className="grid gap-4 max-w-sm">
            <div className="grid gap-1.5">
              <Label htmlFor="email-demo">이메일</Label>
              <Input id="email-demo" type="email" placeholder="name@example.com" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="bio-demo">자기소개</Label>
              <Textarea id="bio-demo" placeholder="자기소개를 입력하세요..." />
            </div>
            <div className="grid gap-1.5">
              <Label>역할</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="역할 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="user">사용자</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree-demo" />
              <Label htmlFor="agree-demo">약관 동의</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="notify-demo" />
              <Label htmlFor="notify-demo">알림 활성화</Label>
            </div>
          </div>
        </ExampleSection>

        {/* 피드백 */}
        <ExampleSection
          title="알림 (Alert)"
          description="정보, 경고, 에러 상태를 표시하는 알림 컴포넌트입니다."
          code={`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle, Terminal } from "lucide-react";

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Alert>
        <Terminal className="size-4" />
        <AlertTitle>일반 알림</AlertTitle>
        <AlertDescription>일반적인 정보를 제공하는 알림입니다.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>오류 발생</AlertTitle>
        <AlertDescription>요청을 처리하는 중 오류가 발생했습니다.</AlertDescription>
      </Alert>
    </div>
  );
}`}
        >
          <div className="flex flex-col gap-3">
            <Alert>
              <Terminal className="size-4" />
              <AlertTitle>일반 알림</AlertTitle>
              <AlertDescription>일반적인 정보를 제공하는 알림입니다.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>오류 발생</AlertTitle>
              <AlertDescription>요청을 처리하는 중 오류가 발생했습니다.</AlertDescription>
            </Alert>
          </div>
        </ExampleSection>

        <ExampleSection
          title="진행률 & 스켈레톤 & 스피너"
          description="로딩 상태를 나타내는 컴포넌트들입니다."
          code={`import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export function FeedbackDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Progress (60%)</span>
        <Progress value={60} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Skeleton</span>
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Spinner:</span>
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" />
      </div>
    </div>
  );
}`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
                <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Skeleton</span>
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Spinner:</span>
              <Spinner className="size-3" />
              <Spinner />
              <Spinner className="size-6" />
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="토스트 (Sonner)"
          description="sonner 라이브러리를 활용한 토스트 알림입니다."
          code={`import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast.success("성공적으로 저장되었습니다")}>
        성공
      </Button>
      <Button variant="destructive" onClick={() => toast.error("오류가 발생했습니다")}>
        오류
      </Button>
      <Button variant="outline" onClick={() => toast.info("새로운 업데이트가 있습니다")}>
        정보
      </Button>
      <Button variant="secondary" onClick={() => toast.warning("주의가 필요합니다")}>
        경고
      </Button>
    </div>
  );
}`}
        >
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => toast.success("성공적으로 저장되었습니다")}>성공</Button>
            <Button variant="destructive" onClick={() => toast.error("오류가 발생했습니다")}>오류</Button>
            <Button variant="outline" onClick={() => toast.info("새로운 업데이트가 있습니다")}>정보</Button>
            <Button variant="secondary" onClick={() => toast.warning("주의가 필요합니다")}>경고</Button>
          </div>
        </ExampleSection>

        {/* 오버레이 */}
        <ExampleSection
          title="오버레이 컴포넌트"
          description="Dialog, Sheet, Popover, Tooltip, DropdownMenu 등 오버레이 컴포넌트입니다."
          code={`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function OverlayDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">다이얼로그</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>다이얼로그 예제</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">다이얼로그 내용입니다.</p>
        </DialogContent>
      </Dialog>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">시트</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>시트 패널</SheetTitle>
          </SheetHeader>
          <p className="mt-4 text-muted-foreground">측면 패널 내용입니다.</p>
        </SheetContent>
      </Sheet>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">툴팁 호버</Button>
        </TooltipTrigger>
        <TooltipContent>툴팁 내용입니다</TooltipContent>
      </Tooltip>
    </div>
  );
}`}
        >
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">다이얼로그</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>다이얼로그 예제</DialogTitle>
                  <DialogDescription>모달 다이얼로그 컴포넌트 예제입니다.</DialogDescription>
                </DialogHeader>
                <p className="text-muted-foreground">다이얼로그 내용입니다. 확인 버튼을 눌러 닫으세요.</p>
                <DialogFooter>
                  <Button>확인</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">시트</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>시트 패널</SheetTitle>
                  <SheetDescription>오른쪽에서 슬라이드로 등장하는 패널입니다.</SheetDescription>
                </SheetHeader>
                <p className="mt-4 text-muted-foreground">측면 패널 내용입니다.</p>
              </SheetContent>
            </Sheet>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">팝오버</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-sm">팝오버 내용입니다.</p>
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">툴팁 호버</Button>
              </TooltipTrigger>
              <TooltipContent>툴팁 내용입니다</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  드롭다운 <ChevronDown className="ml-1 size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>메뉴</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ExampleSection>

        {/* 데이터 표시 */}
        <ExampleSection
          title="테이블 (Table)"
          description="정형 데이터를 표시하는 테이블 컴포넌트입니다."
          code={`import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "홍길동", role: "관리자", status: "활성" },
  { name: "이영희", role: "사용자", status: "비활성" },
  { name: "김철수", role: "편집자", status: "활성" },
];

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.name}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>
              <Badge variant={row.status === "활성" ? "default" : "secondary"}>
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "홍길동", role: "관리자", status: "활성" },
                { name: "이영희", role: "사용자", status: "비활성" },
                { name: "김철수", role: "편집자", status: "활성" },
              ].map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === "활성" ? "default" : "secondary"}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleSection>

        <ExampleSection
          title="아바타 & 탭 & 스크롤 영역"
          description="Avatar, Tabs, ScrollArea 컴포넌트 예제입니다."
          code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MiscDemo() {
  return (
    <div className="flex flex-col gap-6">
      {/* 아바타 */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>홍길</AvatarFallback>
        </Avatar>
      </div>

      {/* 탭 */}
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">첫 번째</TabsTrigger>
          <TabsTrigger value="tab2">두 번째</TabsTrigger>
          <TabsTrigger value="tab3">세 번째</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">첫 번째 탭 내용입니다.</TabsContent>
        <TabsContent value="tab2">두 번째 탭 내용입니다.</TabsContent>
        <TabsContent value="tab3">세 번째 탭 내용입니다.</TabsContent>
      </Tabs>
    </div>
  );
}`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>홍길</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>이영</AvatarFallback>
              </Avatar>
            </div>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">첫 번째</TabsTrigger>
                <TabsTrigger value="tab2">두 번째</TabsTrigger>
                <TabsTrigger value="tab3">세 번째</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-3 text-sm text-muted-foreground">첫 번째 탭 내용입니다.</TabsContent>
              <TabsContent value="tab2" className="mt-3 text-sm text-muted-foreground">두 번째 탭 내용입니다.</TabsContent>
              <TabsContent value="tab3" className="mt-3 text-sm text-muted-foreground">세 번째 탭 내용입니다.</TabsContent>
            </Tabs>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">ScrollArea</span>
              <ScrollArea className="h-24 rounded-md border p-3">
                {Array.from({ length: 10 }, (_, i) => (
                  <p key={i} className="text-sm text-muted-foreground">스크롤 가능한 항목 {i + 1}</p>
                ))}
              </ScrollArea>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="브레드크럼 (Breadcrumb)"
          description="페이지 계층 구조를 나타내는 네비게이션 컴포넌트입니다."
          code={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/examples">예제</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>컴포넌트 쇼케이스</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-muted-foreground cursor-default">홈</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-muted-foreground cursor-default">예제</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>컴포넌트 쇼케이스</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ExampleSection>
      </div>
    </div>
  );
}
