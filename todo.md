# 할 일

이미지 최적화 작업(`3869523`) 이후 남은 작업들.

---

## 배포 전 필수

> ⚠️ 아래 업로드를 끝내기 전에는 `develop` 을 배포하거나 `main` 에 머지하면 안 된다.
> 코드는 이미 파생본 URL 을 보고 있는데 R2 에 파일이 없어서 목록·상세 이미지와
> SNS 공유 미리보기가 전부 깨진다.

- [ ] **R2 API 토큰 발급**
  - Cloudflare 대시보드 → R2 → API → Manage API Tokens → Create API Token
  - 권한 `Object Read & Write`, 대상은 이미지 버킷만 지정
  - Secret Access Key 는 발급 화면을 벗어나면 다시 볼 수 없으니 그 자리에서 복사
  - Account ID 는 R2 개요 페이지 오른쪽에 있음

- [ ] **`.env.local` 작성** (루트에 새로 생성, `.gitignore` 에 이미 잡혀 있음)

  ```
  R2_ACCOUNT_ID=
  R2_ACCESS_KEY_ID=
  R2_SECRET_ACCESS_KEY=
  R2_BUCKET=
  ```

- [ ] **파생본 업로드**

  ```
  pnpm thumbnails
  ```

  총 357개가 올라간다. 같은 이미지 119장을 3가지 형태로 만든 것:

  | 경로 | 개수 | 용량 | 용도 |
  | --- | --- | --- | --- |
  | `thumb/*_640.webp` | 119 | 3.2 MB | 목록 카드 (한 페이지 24장) |
  | `thumb/*_960.webp` | 119 | 4.9 MB | 상세 페이지 고해상도 화면 |
  | `og/*_og.jpg` | 119 | 3.3 MB | 카톡·트위터 공유 미리보기 |

  원본 120장 중 애니메이션 GIF(`loading_pang.gif`)는 변환하지 않고 원본을 그대로 쓴다.
  중간에 끊겨도 다시 실행하면 이미 올라간 것은 건너뛴다.

- [ ] **업로드 확인 후 배포**
  - 파생본 URL 접근 가능 여부와 `Cache-Control` 헤더가 제대로 붙었는지 확인
  - 목록 1페이지가 7.70MB → 0.61MB 로 줄었는지 실제로 확인

---

## 나중에 (급하지 않음)

- [ ] **`pub-*.r2.dev` 대신 커스텀 도메인 연결**
  - r2.dev 는 Cloudflare 개발용 도메인이라 프로덕션 트래픽에 rate limit 이 걸린다
  - 페이로드가 12배 줄어 당장의 위험은 낮아졌지만 근본적으로는 옮기는 게 맞다
  - 옮기면 `cdn-cgi/image` 런타임 변환도 쓸 수 있게 된다 (현재 r2.dev 에서는 404)

- [ ] **원본 파일에 `Cache-Control` 씌우기** — 우선순위 낮음

  ```
  pnpm thumbnails --fix-originals
  ```

  - R2 가 원본에 `Cache-Control` 을 안 보내서 브라우저가 휴리스틱 캐싱에 의존한다
    (`ETag` / `Last-Modified` 는 보내므로 캐시가 아예 안 되는 건 아니고, 보장이 없는 상태)
  - 이미지 최적화 이후로는 원본이 **다운로드 버튼과 OG 크롤러**만 건드리므로 체감 효과가 작다
  - 원본 46MB 를 전부 다시 올려야 하는 작업이라 급하지 않으면 미뤄도 된다

- [ ] **`caniuse-lite` 갱신** — lint 실행 때마다 경고가 뜬다

  ```
  npx update-browserslist-db@latest
  ```

---

## 이미지를 새로 추가할 때

`src/data/cards.ts` 에 카드를 추가한 뒤 아래를 실행하면 새로 추가된 것만 변환·업로드된다.

```
pnpm thumbnails
```

미리 결과만 보고 싶으면 `--dry-run`, 업로드 없이 `.thumbnails/` 에만 만들어보려면 `--local-only`.

생성 폭이나 품질을 바꾸려면 `scripts/thumbnail.config.mjs` 를 수정한다.
단, `THUMBNAIL_WIDTHS` 를 바꾸면 `src/shared/lib/imageLoader.ts` 의 같은 이름 상수도
함께 고치고 `--force` 로 다시 올려야 한다.
