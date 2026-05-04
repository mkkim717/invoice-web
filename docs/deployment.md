# Vercel 배포 가이드

노션 기반 견적서 공유 서비스(Invoice Web)를 Vercel에 배포하는 단계별 가이드입니다.

---

## 사전 준비

배포 전 다음 항목을 준비합니다.

| 항목 | 확인 방법 |
|------|-----------|
| GitHub 저장소 push 완료 | `git log --oneline -1` |
| 노션 Integration Token | `.env.local`의 `NOTION_TOKEN` 값 |
| 노션 견적서 DB ID | `.env.local`의 `NOTION_DATABASE_ID` 값 |
| `npm run build` 통과 | 로컬에서 빌드 성공 확인 |

노션 Integration 및 DB 연결 방법은 [docs/notion-db-setup.md](./notion-db-setup.md)를 참고하세요.

---

## 1단계: Vercel 프로젝트 생성

1. [vercel.com/new](https://vercel.com/new) 접속
2. **Import Git Repository** → GitHub 계정 연결
3. `invoice-web` 저장소 선택 후 **Import**
4. 설정 화면에서 아래 값을 확인합니다 (모두 기본값 유지):

   | 항목 | 값 |
   |------|-----|
   | Framework Preset | Next.js (자동 감지) |
   | Root Directory | `./` |
   | Build Command | `next build` |
   | Output Directory | `.next` |
   | Install Command | `npm install` |

5. **환경 변수는 아직 입력하지 말고** 2단계에서 별도로 설정합니다.

---

## 2단계: 환경 변수 설정

**Settings > Environment Variables** 에서 아래 변수를 추가합니다.

### 필수 변수 (미설정 시 빌드 실패)

| Key | Value | Environments |
|-----|-------|--------------|
| `NOTION_TOKEN` | `secret_xxxxx...` (노션 Integration Token) | Production, Preview, Development |
| `NOTION_DATABASE_ID` | 견적서 데이터베이스 ID (32자리 hex) | Production, Preview, Development |

### 선택 변수 (현재 미사용, 향후 확장용)

| Key | Value | Environments |
|-----|-------|--------------|
| `NOTION_ITEMS_DATABASE_ID` | 품목 데이터베이스 ID | Production, Preview, Development |

### 주의사항

> **`NEXT_PUBLIC_` 접두사를 절대 사용하지 마세요.**
> `NEXT_PUBLIC_`이 붙은 변수는 브라우저(클라이언트)에 노출됩니다.
> 노션 Token/DB ID가 공개되면 누구나 데이터베이스에 접근할 수 있습니다.

> **`NODE_ENV`는 입력하지 않아도 됩니다.**
> Vercel이 자동으로 `production`으로 설정합니다.
> (오타 `NODE_EVB` 등이 있으면 삭제하세요 — 아무 효과가 없습니다.)

---

## 3단계: 첫 배포

환경 변수 설정 완료 후 **Deploy** 버튼을 클릭합니다.

빌드 로그에서 아래 메시지를 확인합니다:

```
✓ Compiled successfully
✓ Generating static pages
```

배포 완료 시 URL이 생성됩니다:

```
https://invoice-web-[hash].vercel.app
```

이후 `main` 브랜치에 `git push`할 때마다 자동으로 재배포됩니다.

---

## 4단계: 배포 후 확인 체크리스트

배포 URL을 기준으로 다음 항목을 직접 확인합니다.

- [ ] `/` — 랜딩 페이지 정상 로드 (서비스 소개, 기능 카드)
- [ ] `/invoice/<실제-slug>` — 견적서 데이터 표시 (노션에서 가져온 실제 데이터)
- [ ] PDF 다운로드 버튼 클릭 → 인쇄 다이얼로그 없이 즉시 `.pdf` 다운로드
- [ ] 다운로드된 PDF에서 한글 텍스트 복사 가능 여부 확인
- [ ] 존재하지 않는 slug(`/invoice/없는slug`) → 404 안내 페이지
- [ ] 다크/라이트 테마 전환 정상 동작
- [ ] 모바일(핸드폰 브라우저)에서 견적서 레이아웃 확인

---

## 5단계: (선택) 커스텀 도메인 연결

1. **Settings > Domains** → 도메인 입력 (예: `invoice.example.com`)
2. DNS 설정: 도메인 등록 업체에서 CNAME 레코드 추가
   ```
   Type:  CNAME
   Name:  invoice (또는 @)
   Value: cname.vercel-dns.com
   ```
3. 인증서(HTTPS)는 Vercel이 자동 발급합니다.

---

## 참고: ISR 동작 방식

이 프로젝트는 `app/invoice/[slug]/page.tsx`에서 `export const revalidate = 60`으로 설정되어 있습니다.

```
[고객 첫 접속]
  → Vercel 서버가 노션 API 호출 → HTML 생성 → 캐시 저장 → 응답

[60초 이내 다음 접속]
  → 캐시된 HTML 즉시 응답 (노션 API 호출 없음, 빠름)

[60초 경과 후 접속]
  → 캐시된 HTML 즉시 응답 (빠름)
  → 백그라운드에서 노션 API 재호출 → 캐시 갱신

[그 다음 접속]
  → 갱신된 HTML 응답
```

**노션에서 견적서 수정 후 최대 60초 이내에 고객 화면에 반영됩니다.**

### 즉시 반영이 필요한 경우

Vercel 대시보드 → **Deployments** → 최근 배포 항목의 `...` → **Redeploy**

또는 빈 커밋으로 재배포 트리거:

```bash
git commit --allow-empty -m "chore: 캐시 강제 갱신" && git push
```

---

## 참고: Vercel 무료 플랜 제약

| 항목 | 제한 | 이 프로젝트 영향 |
|------|------|-----------------|
| 서버리스 함수 실행 시간 | 10초 | 노션 API 응답 1~3초, 여유 있음 |
| 월 대역폭 | 100GB | 개인 서비스 수준에서 충분 |
| 빌드 시간 | 월 6,000분 | `git push`마다 1~2분, 여유 있음 |
| PDF 생성 | — | 클라이언트 사이드(`@react-pdf/renderer`) → 서버 함수 무관 |
| 정적 자산 (`public/fonts/`) | — | CDN에서 자동 서빙 |

> 노션 API가 간헐적으로 느릴 경우(3초 초과) ISR 캐시가 만료된 첫 요청에서만 지연이 발생합니다. 캐시된 이후 요청은 영향 없습니다.
