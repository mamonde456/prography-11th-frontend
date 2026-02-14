# 11th Assignment - Backend Starter Kit

FE/APP 개발자가 JVM 지식 없이도 로컬에서 백엔드를 실행하고 API 명세를 확인할 수 있도록 만든 실행 패키지입니다.

---

## 목적

- FE, APP 개발자의 로컬 연동 환경 제공
- assignment 모듈 실행 JAR + API 명세 제공

## 프로젝트 구조

```
backend/
├── jar/
│   └── prography-be-assignment-1.0.0.jar   # 로컬 서버 실행용
├── api-spec/                                # API 명세
│   ├── common.md                            # 공통 사항 (응답 형식, Enum, 에러 코드)
│   ├── member/                              # 회원용 API (6개)
│   │   ├── 01-login.md
│   │   ├── 02-get-member.md
│   │   ├── 03-get-sessions.md
│   │   ├── 04-check-in.md
│   │   ├── 05-get-attendances.md
│   │   └── 06-get-attendance-summary.md
│   └── admin/                               # 관리자용 API (19개)
│       ├── 01-create-member.md
│       ├── 02-get-members-dashboard.md
│       ├── 03-get-member-detail.md
│       ├── 04-update-member.md
│       ├── 05-delete-member.md
│       ├── 06-get-cohorts.md
│       ├── 07-get-cohort-detail.md
│       ├── 08-get-sessions.md
│       ├── 09-create-session.md
│       ├── 10-update-session.md
│       ├── 11-delete-session.md
│       ├── 12-create-qrcode.md
│       ├── 13-renew-qrcode.md
│       ├── 14-register-attendance.md
│       ├── 15-update-attendance.md
│       ├── 16-get-session-attendance-summary.md
│       ├── 17-get-member-attendance-detail.md
│       ├── 18-get-session-attendances.md
│       └── 19-get-deposit-history.md
└── seed-data.md                             # 시드 데이터 명세
```

---

## 빠른 시작

### 1. Java 설치

> **Java 24 이상이 필수입니다.** (class file version 68.0)

**macOS** (Homebrew)
```bash
brew install --cask temurin
```

**Windows**
- [Adoptium Temurin 24+](https://adoptium.net/) MSI 설치
- `JAVA_HOME` 환경변수 설정, `PATH`에 `%JAVA_HOME%\bin` 추가

**Linux**
- [Adoptium Temurin 24+](https://adoptium.net/) 설치

설치 확인:
```bash
java -version
```

### 2. 서버 실행

```bash
java -jar jar/prography-be-assignment-1.0.0.jar
```

### 3. 접속 확인

| 항목 | URL |
|------|-----|
| API Base URL | `http://localhost:8080/api/v1` |
| H2 Console | `http://localhost:8080/h2-console` |
| H2 JDBC URL | `jdbc:h2:mem:prography` |

> 데이터는 메모리 DB(H2)를 사용하므로 **서버 재시작 시 초기화**됩니다.

---

## 테스트 계정

| 구분 | loginId | password | 역할 |
|------|---------|----------|------|
| 관리자 | `admin` | `prography` | ADMIN |
| 테스트 회원 | `prography` | `prography` | MEMBER |

> 전체 36명의 계정이 시드 데이터로 제공됩니다. 모든 계정의 비밀번호는 `prography`입니다.
> 상세한 시드 데이터는 [`seed-data.md`](./seed-data.md)를 참조하세요.

---

## API 명세

공통 사항은 [`api-spec/common.md`](./api-spec/common.md)를 참조하세요.

### 공통 응답 형식

**성공**
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

**실패**
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

### 회원용 API (6개)

| # | Method | Path | 설명 | 명세 |
|---|--------|------|------|------|
| 1 | POST | `/api/v1/auth/login` | 로그인 | [01-login.md](./api-spec/member/01-login.md) |
| 2 | GET | `/api/v1/members/{id}` | 회원 조회 | [02-get-member.md](./api-spec/member/02-get-member.md) |
| 3 | GET | `/api/v1/sessions` | 일정 목록 조회 | [03-get-sessions.md](./api-spec/member/03-get-sessions.md) |
| 4 | POST | `/api/v1/attendances` | QR 출석 체크 | [04-check-in.md](./api-spec/member/04-check-in.md) |
| 5 | GET | `/api/v1/attendances` | 내 출결 기록 조회 | [05-get-attendances.md](./api-spec/member/05-get-attendances.md) |
| 6 | GET | `/api/v1/members/{memberId}/attendance-summary` | 내 출결 요약 조회 | [06-get-attendance-summary.md](./api-spec/member/06-get-attendance-summary.md) |

### 관리자용 API (19개)

#### 회원 관리

| # | Method | Path | 설명 | 명세 |
|---|--------|------|------|------|
| 1 | POST | `/api/v1/admin/members` | 회원 등록 | [01-create-member.md](./api-spec/admin/01-create-member.md) |
| 2 | GET | `/api/v1/admin/members` | 회원 대시보드 (페이징/필터/검색) | [02-get-members-dashboard.md](./api-spec/admin/02-get-members-dashboard.md) |
| 3 | GET | `/api/v1/admin/members/{id}` | 회원 상세 조회 | [03-get-member-detail.md](./api-spec/admin/03-get-member-detail.md) |
| 4 | PUT | `/api/v1/admin/members/{id}` | 회원 수정 | [04-update-member.md](./api-spec/admin/04-update-member.md) |
| 5 | DELETE | `/api/v1/admin/members/{id}` | 회원 탈퇴 (soft-delete) | [05-delete-member.md](./api-spec/admin/05-delete-member.md) |

#### 기수 관리

| # | Method | Path | 설명 | 명세 |
|---|--------|------|------|------|
| 6 | GET | `/api/v1/admin/cohorts` | 기수 목록 조회 | [06-get-cohorts.md](./api-spec/admin/06-get-cohorts.md) |
| 7 | GET | `/api/v1/admin/cohorts/{cohortId}` | 기수 상세 (파트/팀 포함) | [07-get-cohort-detail.md](./api-spec/admin/07-get-cohort-detail.md) |

#### 일정 관리

| # | Method | Path | 설명 | 명세 |
|---|--------|------|------|------|
| 8 | GET | `/api/v1/admin/sessions` | 일정 목록 (출결 요약 포함) | [08-get-sessions.md](./api-spec/admin/08-get-sessions.md) |
| 9 | POST | `/api/v1/admin/sessions` | 일정 생성 (QR 자동 생성) | [09-create-session.md](./api-spec/admin/09-create-session.md) |
| 10 | PUT | `/api/v1/admin/sessions/{id}` | 일정 수정 | [10-update-session.md](./api-spec/admin/10-update-session.md) |
| 11 | DELETE | `/api/v1/admin/sessions/{id}` | 일정 삭제 (soft-delete) | [11-delete-session.md](./api-spec/admin/11-delete-session.md) |

#### QR 코드 관리

| # | Method | Path | 설명 | 명세 |
|---|--------|------|------|------|
| 12 | POST | `/api/v1/admin/sessions/{sessionId}/qrcodes` | QR 코드 생성 | [12-create-qrcode.md](./api-spec/admin/12-create-qrcode.md) |
| 13 | PUT | `/api/v1/admin/qrcodes/{qrCodeId}` | QR 코드 갱신 | [13-renew-qrcode.md](./api-spec/admin/13-renew-qrcode.md) |

#### 출결 관리

| # | Method | Path | 설명 | 명세 |
|---|--------|------|------|------|
| 14 | POST | `/api/v1/admin/attendances` | 출결 등록 (수동) | [14-register-attendance.md](./api-spec/admin/14-register-attendance.md) |
| 15 | PUT | `/api/v1/admin/attendances/{id}` | 출결 수정 (보증금 자동 조정) | [15-update-attendance.md](./api-spec/admin/15-update-attendance.md) |
| 16 | GET | `/api/v1/admin/attendances/sessions/{sessionId}/summary` | 일정별 회원 출결 요약 | [16-get-session-attendance-summary.md](./api-spec/admin/16-get-session-attendance-summary.md) |
| 17 | GET | `/api/v1/admin/attendances/members/{memberId}` | 회원 출결 상세 | [17-get-member-attendance-detail.md](./api-spec/admin/17-get-member-attendance-detail.md) |
| 18 | GET | `/api/v1/admin/attendances/sessions/{sessionId}` | 일정별 출결 목록 | [18-get-session-attendances.md](./api-spec/admin/18-get-session-attendances.md) |

#### 보증금 관리

| # | Method | Path | 설명 | 명세 |
|---|--------|------|------|------|
| 19 | GET | `/api/v1/admin/cohort-members/{cohortMemberId}/deposits` | 보증금 이력 조회 | [19-get-deposit-history.md](./api-spec/admin/19-get-deposit-history.md) |

---

## Enum 참조

| Enum | 값 |
|------|-----|
| MemberStatus | `ACTIVE`, `INACTIVE`, `WITHDRAWN` |
| MemberRole | `MEMBER`, `ADMIN` |
| SessionStatus | `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` |
| AttendanceStatus | `PRESENT`, `ABSENT`, `LATE`, `EXCUSED` |
| DepositType | `INITIAL`, `PENALTY`, `REFUND` |

---

## 주요 비즈니스 규칙

### 출결 패널티

| 상태 | 패널티 금액 |
|------|------------|
| PRESENT (출석) | 0원 |
| ABSENT (결석) | 10,000원 |
| LATE (지각) | min(지각분 x 500, 10,000)원 |
| EXCUSED (공결) | 0원 (최대 3회) |

### QR 출석 체크 검증 순서

1. QR `hashValue` 유효성 검증
2. QR 만료 여부 검증
3. 일정 `IN_PROGRESS` 상태 확인
4. 회원 존재 및 상태 확인
5. 중복 출결 확인
6. 기수 회원 확인
7. 지각 시간 계산 및 패널티 적용

### 보증금

- 초기 보증금: 100,000원
- 패널티 발생 시 자동 차감
- 출결 수정 시 패널티 차이만큼 자동 조정 (추가 차감 또는 환급)

---

## 환경 변수 (선택)

아래 값이 없으면 기본값으로 실행됩니다.

| 변수 | 설명 |
|------|------|
| `JWT_SECRET` | JWT 서명 키 |
| `CORS_ALLOWED_ORIGINS` | CORS 허용 도메인 |
| `SERVER_PORT` | 서버 포트 (기본: 8080) |

```bash
export JWT_SECRET="your-local-secret"
export CORS_ALLOWED_ORIGINS="http://localhost:3000"
java -jar jar/prography-be-assignment-1.0.0.jar
```

---

## 트러블슈팅

| 증상 | 해결 방법 |
|------|----------|
| `java` 명령을 찾을 수 없음 | `JAVA_HOME` / `PATH` 설정 확인 |
| `UnsupportedClassVersionError` | Java 24 이상 필요 (`class file version 68.0`) |
| 8080 포트 충돌 | `SERVER_PORT=8081` 환경변수로 포트 변경 |
| 서버 시작 후 데이터 없음 | 메모리 DB 사용 중 — 재시작 시 시드 데이터 자동 로드 |
