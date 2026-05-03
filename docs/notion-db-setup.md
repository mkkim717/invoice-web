# 노션 DB 설정 가이드

Invoice Web 서비스는 **2개의 Notion 데이터베이스**를 사용합니다.

---

## DB 구조 한눈에 보기

```
견적서 DB (Invoice)          품목 DB (Items)
┌─────────────────────┐      ┌─────────────────────┐
│ title               │      │ name (품목명)         │
│ slug                │      │ quantity (수량)       │
│ client_name         │◄────►│ unit_price (단가)     │
│ issue_date          │      │ amount (수식: 자동계산)│
│ status              │      └─────────────────────┘
│ sender_name         │
│ items (관계)         │
│ total_amount (롤업)  │
└─────────────────────┘
```

---

## 1단계: 노션 Integration 생성

1. [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) 접속
2. **새 통합** 클릭 → 이름: `invoice-web` → **저장**
3. **내부 통합 시크릿** 복사 → `.env.local`의 `NOTION_TOKEN`에 붙여넣기

---

## 2단계: 품목 DB (Items) 생성

> ⚠️ **Invoice DB보다 먼저 생성해야 합니다** (관계 설정 시 필요)

새 페이지 → `/database` → **전체 페이지 데이터베이스** 생성
이름: **품목 (Items)**

| 속성명 | 노션 타입 | 설정 방법 |
|--------|-----------|-----------|
| `name` | 제목 (기본 제공) | 이름 그대로 사용 |
| `quantity` | 숫자(Number) | 형식: 숫자 |
| `unit_price` | 숫자(Number) | 형식: 원(₩) 또는 숫자 |
| `amount` | 수식(Formula) | `prop("quantity") * prop("unit_price")` 입력 |

---

## 3단계: 견적서 DB (Invoice) 생성

새 페이지 → `/database` → **전체 페이지 데이터베이스** 생성
이름: **견적서 (Invoice)**

| 속성명 | 노션 타입 | 설정 방법 |
|--------|-----------|-----------|
| `title` | 제목 (기본 제공) | 이름 그대로 사용 |
| `slug` | 텍스트(Text) | - |
| `client_name` | 텍스트(Text) | - |
| `issue_date` | 날짜(Date) | - |
| `status` | 텍스트(Text) | draft / sent / accepted / expired 중 입력 |
| `sender_name` | 텍스트(Text) | - |
| `items` | 관계(Relation) | 아래 설정 참고 |
| `total_amount` | 롤업(Rollup) | 아래 설정 참고 |

### `items` 관계 속성 설정
1. 속성 추가 → **관계(Relation)** 선택
2. **품목 (Items)** DB 선택
3. "역방향 관계 표시" 활성화 → Items DB에 `invoice` 속성 자동 생성

### `total_amount` 롤업 속성 설정
1. 속성 추가 → **롤업(Rollup)** 선택
2. **관계**: `items` 선택
3. **속성**: `amount` 선택
4. **계산**: `합계(Sum)` 선택

---

## 4단계: Integration을 두 DB에 연결

각 DB 페이지 우측 상단 **`...`** → **연결** → `invoice-web` Integration 선택

> Invoice DB와 Items DB **모두** Integration을 연결해야 합니다.

---

## 5단계: 데이터베이스 ID 확인

각 DB 페이지 URL에서 32자리 ID 복사:

```
https://www.notion.so/{워크스페이스}/{DATABASE_ID}?v=...
```

`.env.local`에 추가:

```bash
NOTION_TOKEN=secret_xxx...
NOTION_DATABASE_ID=xxx...          # 견적서 DB ID
NOTION_ITEMS_DATABASE_ID=xxx...    # 품목 DB ID
```

---

## 6단계: 테스트 데이터 입력

**① 품목 DB에 품목 2개 생성**

| name | quantity | unit_price |
|------|----------|------------|
| UI 디자인 | 1 | 1500000 |
| 프론트엔드 개발 | 1 | 3000000 |

**② 견적서 DB에 견적서 1개 생성**

| 속성 | 값 |
|------|----|
| title | 테스트 견적서 |
| slug | `test-invoice` |
| client_name | 테스트 고객사 |
| issue_date | 오늘 날짜 |
| status | `sent` |
| sender_name | 홍길동 |
| items | 위에서 만든 품목 2개 연결 |

→ `total_amount` 롤업이 **4,500,000**으로 자동 계산되면 정상입니다.
