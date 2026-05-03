import { z } from "zod";

const envSchema = z.object({
  NOTION_TOKEN: z.string().min(1, "NOTION_TOKEN이 설정되지 않았습니다."),
  NOTION_DATABASE_ID: z.string().min(1, "NOTION_DATABASE_ID가 설정되지 않았습니다."),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const missing = parsed.error.issues.map((i) => i.message).join("\n");
  throw new Error(`환경 변수 설정 오류:\n${missing}\n\n.env.local 파일을 확인하세요.`);
}

export const env = parsed.data;
