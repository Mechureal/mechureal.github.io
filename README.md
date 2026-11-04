# Mechureal Official Website

Astro + TypeScript 정적 공식 사이트. 한국어 `/ko/`, 영어 `/en/`, 루트 `/`는 한국어로 이동합니다. 기존 루트 `index.html`은 원본 그대로 보존하며 Astro는 `src/pages/index.astro`를 빌드합니다. 배포 아티팩트에는 `dist/`만 포함됩니다.

## 개발과 검증

Node.js 24와 npm을 사용합니다. 의존성 버전은 `package-lock.json`에 고정합니다.

```sh
npm ci
npm run dev
npm run verify
npm run preview
```

`verify`는 Astro 타입 검사, 프로덕션 빌드, 생성된 링크·메타데이터·RSS·개인정보 검사, 임시 콘텐츠를 이용한 페이지네이션·번역 fallback·MDX·초안·미래 날짜 검증을 실행합니다. 임시 콘텐츠는 실행 후 제거하며 검증 빌드는 `.qa/fixture-dist/`에만 기록합니다. 배포 대상 `dist/`에는 테스트 글이 들어가지 않습니다.

Windows에서 상위 경로에 `#` 문자가 있으면 Vite가 콘텐츠 파일을 읽지 못할 수 있습니다. 이 경우 `#` 없는 경로에 별도 체크아웃하거나 검증용 복사본을 만들고 실행하세요. 저장소 원본을 이동하거나 덮어쓸 필요는 없습니다. 제한된 환경에서는 `ASTRO_TELEMETRY_DISABLED=1`로 Astro의 로컬 텔레메트리 설정 파일 접근을 끌 수 있습니다.

## 구조

- `src/pages/[lang]/[...path].astro`: 언어별 페이지, 글, 태그, 페이지네이션
- `src/layouts/Layout.astro`: 공통 UI, canonical, Open Graph, Twitter Card, hreflang
- `src/content/devlog/{ko,en}/`: Markdown / MDX 게시물
- `src/content.config.ts`: 메타데이터 검증과 언어를 포함한 고유 콘텐츠 ID
- `src/lib/i18n.ts`: 공통 UI 번역, 각 페이지의 긴 본문은 라우트 템플릿에서 관리
- `src/styles/global.css`: CSS 변수 기반 테마와 반응형 레이아웃
- `public/images/`: 자체 제작 콘셉트 그래픽과 메타데이터 없는 소셜 이미지
- `.github/workflows/pages.yml`: PR 검증, main 배포

## Devlog 발행

`src/content/devlog/ko/draft-template.mdx`를 원하는 언어 폴더에 복사합니다. 파일명과 `slug`, `translationKey`를 새 글에 맞게 바꾸고 본문을 작성합니다.

```yaml
title: "글 제목"
description: "짧은 요약"
date: 2026-11-04
updated: 2026-11-04
author: Mechureal
game: broke-rider-simulator
tags: [game-design, planning]
cover: /images/city-grid.svg
draft: true
lang: ko
translationKey: unique-topic
slug: unique-topic
```

- `draft`는 기본값이 `true`입니다. 검토 후 명시적으로 `false`로 바꿉니다.
- 미래 날짜 글과 초안은 프로덕션에서 상세 경로, 목록, 태그, RSS, 사이트맵 모두 제외됩니다. 날짜는 UTC 기준이며 예약 발행에는 해당 시점 이후 새 빌드가 필요합니다.
- 같은 글의 번역은 동일한 `translationKey`, 각각 `lang: ko` / `lang: en`을 사용합니다. `slug`는 언어마다 달라도 됩니다.
- 번역이 없으면 언어 전환은 다른 언어의 Devlog 목록으로 이동하며 안내 문구를 표시합니다. 존재하지 않는 번역의 `hreflang`은 생성하지 않습니다. 목록도 대상 태그/페이지가 없으면 다른 언어의 전체 목록으로 이동합니다.
- 한 페이지에 6개씩 최신순으로 표시합니다. 같은 날짜는 slug 순으로 정렬하여 빌드가 안정적입니다. 홈에는 최신 3개, 상세 글에는 관련 글과 이전/다음 글을 표시합니다.
- 공개 이미지와 동영상은 `public/`에 넣고 `/images/...`, `/videos/...` 경로를 사용합니다. Markdown 이미지에는 대체 텍스트를, 동영상에는 자막을 제공합니다. MDX 템플릿에 코드와 동영상 예제가 있습니다.
- 공개 파일은 `public/`에 넣는 즉시 배포됩니다. **비공개 초안의 이미지·영상·첨부파일은 `public/`에 넣지 마세요.**
- 새 기능을 완료로 설명하기 전에 실제 구현 상태를 검증합니다. 초기 3개 글은 개발 지시서의 팀 소개·기획 목표를 바탕으로 작성한 소개 글이며 구현 완료 소식이 아닙니다.

## GitHub Pages 배포

1. PR의 검증 결과와 콘텐츠를 검토합니다. 이 작업은 자동 병합하지 않습니다.
2. 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다. 설정 변경 권한이 필요합니다.
3. 승인된 PR을 `main`에 병합하면 `Website CI and Pages`가 실행됩니다. `main`의 수동 실행도 가능합니다.
4. Actions에서 build와 deploy 성공을 확인하고 `https://mechureal.github.io/`에서 `/ko/`, `/en/`, 글, RSS, 404를 확인합니다.

PR/기능 브랜치에서는 배포 job이 실행되지 않습니다. 따라서 PR 준비 시점에는 새 사이트의 실제 운영 배포 성공을 주장할 수 없습니다. 기존 Pages 배포 방식이 브랜치 기반이면 위 Source 변경 전까지 기존 페이지가 유지됩니다.

자체 도메인 전환 시 `SITE_URL`을 새 HTTPS origin으로 설정하여 빌드하고, `public/CNAME` 및 Pages DNS 설정을 추가합니다. 사이트는 origin 루트 배포용이며 `/project/` 하위 경로 배포는 별도 base-path 작업이 필요합니다.

## 브랜드와 개인정보

공식 작성자는 Mechureal입니다. 개인 프로필, 개인 이메일, 개인 소셜 링크 및 외부 분석 도구를 넣지 않습니다. 미확정 이메일·YouTube·SNS·Steam은 준비 중으로만 표시합니다. 정식 로고 및 실제 게임 화면이 제공되기 전까지 현재 워드마크와 그래픽은 교체 가능한 임시 브랜드 자산입니다.

새 이미지·영상은 픽셀 내용, EXIF/XMP, 파일명, 자막을 검토합니다. Git 커밋 작성자와 조직 구성원 정보는 웹사이트와 별개이므로 공개 전 별도 점검합니다. 기존 커밋 기록은 수정하지 않습니다. 게임 프로젝트는 이 저장소의 작업 범위에 포함되지 않습니다.

기술 참고: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/), [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).
