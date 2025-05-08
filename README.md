# 🧢 PokeDex Next

Next.js 15 기반으로 만든 포켓몬 도감 웹 애플리케이션입니다.  
PokeAPI를 활용하여 포켓몬 데이터를 불러오고, React Query와 Zustand로 상태 관리를 수행합니다.

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
- **SCSS(Sass) 모듈**
- **Vercel 배포**

<br/>

## 📁 폴더 구조

```bash
poke_dex_next/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 메인 페이지
│   │   ├── pokemon/[id]/     # 포켓몬 상세 페이지
│   ├── components/           # 공통 UI 컴포넌트
│   ├── hooks/                # 커스텀 훅
│   ├── lib/                  # API 함수 및 유틸
│   ├── store/                # Zustand 상태관리
│   ├── styles/               # SCSS 스타일
├── public/                   # 정적 파일 (타입 아이콘 등)
└── README.md