import type { Metadata } from "next";
import {
  Users,
  TrendingUp,
  FolderOpen,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = {
  title: "대시보드",
  description: "Next.js Starter Kit 대시보드 예제 페이지",
};

/** 통계 카드 데이터 */
const STATS = [
  {
    label: "총 사용자",
    value: "12,483",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
  },
  {
    label: "월간 수익",
    value: "₩4,820,000",
    change: "+8.2%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    label: "활성 프로젝트",
    value: "24",
    change: "-2",
    trend: "down" as const,
    icon: FolderOpen,
  },
  {
    label: "완료율",
    value: "89.3%",
    change: "+3.1%",
    trend: "up" as const,
    icon: CheckCircle2,
  },
] as const;

/** 최근 활동 데이터 */
const ACTIVITIES = [
  {
    user: "김민준",
    initials: "김",
    action: "새 프로젝트를 생성했습니다",
    target: "스타터킷 v2",
    time: "5분 전",
    status: "완료" as const,
  },
  {
    user: "이서연",
    initials: "이",
    action: "배포를 완료했습니다",
    target: "프로덕션 환경",
    time: "23분 전",
    status: "배포됨" as const,
  },
  {
    user: "박지호",
    initials: "박",
    action: "이슈를 제출했습니다",
    target: "버그 리포트 #42",
    time: "1시간 전",
    status: "검토중" as const,
  },
  {
    user: "최수아",
    initials: "최",
    action: "컴포넌트를 업데이트했습니다",
    target: "Header 컴포넌트",
    time: "2시간 전",
    status: "완료" as const,
  },
  {
    user: "정도윤",
    initials: "정",
    action: "코드 리뷰를 요청했습니다",
    target: "PR #87",
    time: "3시간 전",
    status: "대기중" as const,
  },
] as const;

/** 진행 중인 프로젝트 데이터 */
const PROJECTS = [
  { name: "웹 스타터킷", progress: 89, status: "진행중" },
  { name: "모바일 앱 리디자인", progress: 62, status: "진행중" },
  { name: "API 문서화", progress: 100, status: "완료" },
  { name: "성능 최적화", progress: 34, status: "진행중" },
] as const;

/** 상태 뱃지 variant 매핑 */
function getStatusVariant(
  status: string
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "완료":
    case "배포됨":
      return "default";
    case "검토중":
    case "진행중":
      return "secondary";
    case "대기중":
      return "outline";
    default:
      return "outline";
  }
}

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
        <p className="mt-1 text-muted-foreground">
          프로젝트 현황과 팀 활동을 한눈에 확인하세요.
        </p>
      </div>

      {/* 통계 카드 (2열 → 4열 반응형) */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const isUp = stat.trend === "up";
          return (
            <Card key={stat.label}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.label}</CardDescription>
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-xs">
                  {isUp ? (
                    <ArrowUpRight className="size-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="size-3 text-red-500" />
                  )}
                  <span className={isUp ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">지난 달 대비</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 탭 콘텐츠 */}
      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">최근 활동</TabsTrigger>
          <TabsTrigger value="projects">프로젝트 현황</TabsTrigger>
          <TabsTrigger value="loading">로딩 예제</TabsTrigger>
        </TabsList>

        {/* 최근 활동 탭 */}
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>
                팀 멤버들의 최근 활동 내역입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              {ACTIVITIES.map((activity, index) => (
                <div key={activity.user + activity.time}>
                  <div className="flex items-center gap-3 py-3">
                    <Avatar>
                      <AvatarFallback>{activity.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        <span className="text-foreground">{activity.user}</span>
                        <span className="text-muted-foreground">
                          {" "}
                          {activity.action}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.target} · {activity.time}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                  {index < ACTIVITIES.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 프로젝트 현황 탭 */}
        <TabsContent value="projects" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 현황</CardTitle>
              <CardDescription>진행 중인 프로젝트의 완료율입니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {PROJECTS.map((project) => (
                <div key={project.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{project.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(project.status)}>
                        {project.status}
                      </Badge>
                      <span className="text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                  <Progress value={project.progress} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 스켈레톤 로딩 예제 탭 */}
        <TabsContent value="loading" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>로딩 스켈레톤 예제</CardTitle>
              <CardDescription>
                데이터 로딩 중 표시되는 Skeleton 컴포넌트 예제입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="size-8 rounded-full" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
