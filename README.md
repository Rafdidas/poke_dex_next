# 🧢 PokeDex Next

Next.js 15 기반으로 만든 포켓몬 도감 웹 애플리케이션입니다.  
PokeAPI를 활용하여 포켓몬 데이터를 불러오고, React Query와 Zustand로 상태 관리를 수행합니다.

기존의 react만으로 만들었던 포켓몬 도감에 검색과, 타입분류 및 무한 스크롤을 적용하여
Next.js 로 변형.

<br/>

## 🚀 데모

👉 [배포 링크 (Vercel)](https://poke-dex-next.vercel.app/)  
🔗 PokeAPI: https://pokeapi.co

<br/>

## ⚙️ 주요 스택

- **Next.js 15 (App Router)**
- **React 18**
- **TypeScript**
- **React Query**
- **Zustand**
- **SCSS(Sass) **
- **Vercel 배포**

<br/>

## 📁 폴더 구조

```bash
poke_dex_next-main/
├── public/assets/ # 포켓몬 타입별 아이콘 및 공용 이미지
├── src/app/ # Next.js App Router 기준 폴더
│ ├── components/ # 재사용 가능한 UI 컴포넌트
│ ├── pokemon/[id]/ # 동적 라우팅: 포켓몬 상세 페이지
│ ├── styles/ # SCSS 스타일 파일
│ ├── layout.tsx # 전체 레이아웃 설정
│ ├── page.tsx # 메인 페이지: 포켓몬 리스트
│ ├── provider.tsx # React Query Provider 구성
│ └── globals.scss # 전역 스타일
├── lib/ # API 유틸 함수
├── types/ # 타입 정의
├── next.config.ts # Next.js 설정
├── tsconfig.json # TypeScript 설정

---

## 📄 주요 페이지 설명

### `page.tsx`
- 메인 페이지
- 포켓몬 리스트를 `PokemonList`로 렌더링
- 검색(`SearchBar`), 타입 필터링(`TypeFilter`), 무한 스크롤 포함

### `pokemon/[id]/page.tsx`
- 상세 페이지
- 포켓몬의 이름, 타입, 특성, 키/몸무게, 성별 비율, 능력치 등을 표시

---

## 🧩 주요 컴포넌트 설명

- `Header`, `Footer`: 기본 레이아웃 구성 요소
- `SearchBar`: 포켓몬 이름 검색
- `TypeFilter`: 타입별 필터 버튼
- `PokemonList`: 무한 스크롤을 통해 포켓몬 카드 렌더링
- `PokemonBox`: 개별 포켓몬 카드
- `ScrollToTopButton`: 스크롤 상단 이동 버튼
- `Loading`, `Spinner`: 로딩 상태 출력

---

## 🔌 API 및 타입 정의

- `lib/fetchAllPokemonNames.ts`
  - **역할**: 모든 포켓몬의 이름(`name`)과 URL을 가져옵니다.
  - **사용처**: 자동완성 검색, 전역 상태에 전체 포켓몬 목록 저장 등에 사용됩니다.

- `lib/fetchPokemonData.ts`
  - **역할**: 포켓몬 여러 마리의 데이터를 받아 타입, 이미지, 이름 등 필수 정보를 정제하여 반환합니다.
  - **기능**: 
    - limit, offset 파라미터로 페이징 제어
    - 각 포켓몬의 타입명을 한글로 변환
  - **포인트**: Promise.all을 사용해 병렬 요청 최적화

- `lib/fetchPokemonDataById.ts`
  - **역할**: 포켓몬 한 마리의 전체 정보를 가져와 정제된 형태로 반환
  - **반환 데이터:**: 
    - 이름/설명/이미지
    - 타입(한글 포함)
    - 키/몸무게/능력치/성별비율/알 그룹/특성 등
  - **포인트**: 
    - pokemon, species, type, ability 등 API 여러 곳에서 데이터를 조합
    - 한글 설명은 flavor_text_entries에서 language.name === "ko" 조건으로 추출

- `lib/fetchPokemonDataByUrl.ts`
  - **역할**: 특정 포켓몬의 URL로부터 데이터 요청 후 이름, 이미지, 타입만 정리
  - **사용처**: 타입 필터 후 정리된 포켓몬 정보 렌더링
  - **포인트**: 타입명을 한글(koreanType), 영문(engType) 모두 정리하여 UI에 활용

- `lib/fetchPokemonDetailById.ts`
  - **역할**: 상세 페이지 전용 API로 id를 기준으로 포켓몬 데이터 정제
  - **차이점**: 
    - PokemonData라는 커스텀 타입으로 변환
    - genderRate, eggGroups, abilities, stats, height, weight 등을 포함
  - **주의사항**: 성별 비율, 알 그룹 등은 species API에서 따로 추출해야 함

- `lib/findByKoreanName.ts`
  - **역할**: 한글 이름으로 검색 시 해당 포켓몬의 영어 이름과 ID를 찾아 반환
  - **기능**: 
    - pokemon-species API를 전체 순회하면서 names.language.name === 'ko' 조건으로 필터
    - 결과는 { id, name } 객체 반환
  - **사용처**: 검색창에서 한글 입력 시 포켓몬을 식별할 때 사용

- `types/pokeapi.ts`
  - PokéAPI 원형 타입들 정의
- `types/pokemon.ts`
  - 화면 출력용으로 변형된 정제된 타입 (예: `PokemonData`)

---

## 📢 추후 예정 기능
- 상세 페이지 진화 체인 추가
- 검색과 타입분류 기능 고도화