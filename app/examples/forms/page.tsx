"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { CategoryHeader } from "@/components/examples/CategoryHeader";
import { ExampleSection } from "@/components/examples/ExampleSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ──────────────── 로그인 폼 ──────────────── */
const loginSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginForm) => {
    toast.success(`로그인 성공: ${data.email}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <div className="grid gap-1.5">
        <Label htmlFor="login-email">이메일</Label>
        <Input id="login-email" type="email" placeholder="name@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="login-pw">비밀번호</Label>
        <Input id="login-pw" type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit">로그인</Button>
    </form>
  );
}

/* ──────────────── 회원가입 폼 ──────────────── */
const signupSchema = z
  .object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
    email: z.string().email("유효한 이메일 주소를 입력하세요"),
    role: z.string().min(1, "역할을 선택하세요"),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
    confirmPassword: z.string(),
    agree: z.boolean().refine((v) => v === true, "약관에 동의해야 합니다"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

function SignupFormDemo() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema), defaultValues: { agree: false } });

  const onSubmit = (data: SignupForm) => {
    toast.success(`회원가입 완료: ${data.name}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <div className="grid gap-1.5">
        <Label htmlFor="su-name">이름</Label>
        <Input id="su-name" placeholder="홍길동" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="su-email">이메일</Label>
        <Input id="su-email" type="email" placeholder="name@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label>역할</Label>
        <Select onValueChange={(v) => setValue("role", v)}>
          <SelectTrigger>
            <SelectValue placeholder="역할 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">관리자</SelectItem>
            <SelectItem value="editor">편집자</SelectItem>
            <SelectItem value="viewer">열람자</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="su-pw">비밀번호</Label>
        <Input id="su-pw" type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="su-cpw">비밀번호 확인</Label>
        <Input id="su-cpw" type="password" placeholder="••••••••" {...register("confirmPassword")} />
        {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="su-agree"
          checked={watch("agree")}
          onCheckedChange={(v) => setValue("agree", v as boolean)}
        />
        <Label htmlFor="su-agree">이용약관 및 개인정보 처리방침에 동의합니다</Label>
      </div>
      {errors.agree && <p className="text-xs text-destructive">{errors.agree.message}</p>}
      <Button type="submit">회원가입</Button>
    </form>
  );
}

/* ──────────────── 동적 필드 폼 ──────────────── */
const dynamicSchema = z.object({
  skills: z.array(z.object({ value: z.string().min(1, "항목을 입력하세요") })),
});

type DynamicForm = z.infer<typeof dynamicSchema>;

function DynamicFieldDemo() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<DynamicForm>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { skills: [{ value: "" }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const onSubmit = (data: DynamicForm) => {
    toast.success(`기술 스택: ${data.skills.map((s) => s.value).join(", ")}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <Label>기술 스택</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <Input placeholder={`기술 ${index + 1}`} {...register(`skills.${index}.value`)} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      {errors.skills && <p className="text-xs text-destructive">모든 항목을 입력하세요</p>}
      <Button type="button" variant="outline" onClick={() => append({ value: "" })}>
        <Plus className="mr-2 size-4" /> 항목 추가
      </Button>
      <Button type="submit">저장</Button>
    </form>
  );
}

/* ──────────────── 설정 폼 ──────────────── */
const settingsSchema = z.object({
  language: z.string().min(1, "언어를 선택하세요"),
  bio: z.string().max(200, "200자 이하로 입력하세요"),
  emailNotify: z.boolean(),
  pushNotify: z.boolean(),
});

type SettingsForm = z.infer<typeof settingsSchema>;

function SettingsFormDemo() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { emailNotify: true, pushNotify: false, bio: "", language: "" },
  });

  const onSubmit = (data: SettingsForm) => {
    toast.success("설정이 저장되었습니다");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <div className="grid gap-1.5">
        <Label>언어</Label>
        <Select onValueChange={(v) => setValue("language", v)} defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="언어 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ko">한국어</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
          </SelectContent>
        </Select>
        {errors.language && <p className="text-xs text-destructive">{errors.language.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sf-bio">자기소개</Label>
        <Textarea id="sf-bio" placeholder="자기소개를 입력하세요... (최대 200자)" {...register("bio")} />
        {errors.bio && <p className="text-xs text-destructive">{errors.bio.message}</p>}
      </div>
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <p className="text-sm font-medium">이메일 알림</p>
          <p className="text-xs text-muted-foreground">이메일로 알림을 받습니다</p>
        </div>
        <Switch
          checked={watch("emailNotify")}
          onCheckedChange={(v) => setValue("emailNotify", v)}
        />
      </div>
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <p className="text-sm font-medium">푸시 알림</p>
          <p className="text-xs text-muted-foreground">브라우저 푸시 알림을 받습니다</p>
        </div>
        <Switch
          checked={watch("pushNotify")}
          onCheckedChange={(v) => setValue("pushNotify", v)}
        />
      </div>
      <Button type="submit">설정 저장</Button>
    </form>
  );
}

/* ──────────────── 페이지 ──────────────── */
export default function FormsExamplePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryHeader
        title="폼 예제"
        description="react-hook-form과 zod를 활용한 다양한 폼 구현 예제입니다."
      />

      <div className="flex flex-col gap-8">
        <ExampleSection
          title="기본 로그인 폼"
          description="zod 스키마 검증과 에러 메시지를 포함한 로그인 폼입니다."
          code={`"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginFormDemo() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    toast.success(\`로그인 성공: \${data.email}\`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <div className="grid gap-1.5">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="name@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">비밀번호</Label>
        <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit">로그인</Button>
    </form>
  );
}`}
        >
          <LoginFormDemo />
        </ExampleSection>

        <ExampleSection
          title="회원가입 폼"
          description="다중 필드, 비밀번호 확인, Select, Checkbox를 포함한 회원가입 폼입니다."
          code={`"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  role: z.string().min(1, "역할을 선택하세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
  confirmPassword: z.string(),
  agree: z.boolean().refine((v) => v === true, "약관에 동의해야 합니다"),
}).refine((d) => d.password === d.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export function SignupFormDemo() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { agree: false },
  });

  // ...폼 필드 렌더링
}`}
        >
          <SignupFormDemo />
        </ExampleSection>

        <ExampleSection
          title="설정 폼"
          description="Switch, Select, Textarea로 구성된 사용자 설정 폼입니다."
          code={`"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const settingsSchema = z.object({
  language: z.string().min(1, "언어를 선택하세요"),
  bio: z.string().max(200, "200자 이하로 입력하세요"),
  emailNotify: z.boolean(),
  pushNotify: z.boolean(),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export function SettingsFormDemo() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { emailNotify: true, pushNotify: false },
  });

  // Switch는 setValue로 제어
  // <Switch checked={watch("emailNotify")} onCheckedChange={(v) => setValue("emailNotify", v)} />
}`}
        >
          <SettingsFormDemo />
        </ExampleSection>

        <ExampleSection
          title="동적 필드 폼 (useFieldArray)"
          description="useFieldArray로 항목을 동적으로 추가하고 삭제하는 폼입니다."
          code={`"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const dynamicSchema = z.object({
  skills: z.array(z.object({ value: z.string().min(1, "항목을 입력하세요") })),
});

type DynamicForm = z.infer<typeof dynamicSchema>;

export function DynamicFieldDemo() {
  const { register, control, handleSubmit } = useForm<DynamicForm>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { skills: [{ value: "" }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <Input {...register(\`skills.\${index}.value\`)} />
          <Button type="button" onClick={() => remove(index)}>삭제</Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({ value: "" })}>항목 추가</Button>
      <Button type="submit">저장</Button>
    </form>
  );
}`}
        >
          <DynamicFieldDemo />
        </ExampleSection>
      </div>
    </div>
  );
}
