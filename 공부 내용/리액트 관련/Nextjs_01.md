## Next.js 설치 & 초기 셋팅
----
1. 리액트 프로젝트 폴더 생성 및 작업 폴더 생성
    - npx create-next-app
    - npx create-next-app --typescript
        - NPM(Node Package Manager) vs NPX(execute npm package binaries)
            - npm : node.js의 의존성과 패키지 관리를 위한 패키지 매니저
                - npm 사용 => 글로벌 설치
                    - 모듈 업데이트 확인 불가
                    - 모듈 업데이트 변경으로 인한 다른 모듈 에러 발생
            - npx : npm에 속해있는 npm 패키지 실행 도구
                - npx 사용
2. Manual Setup
    - npm install next react react-dom
3. 프로젝트 실행
    - npm run dev 
4. 페이지 접속
    - http://localhost:3000 URL 입력
----
## TypeScript 설치
1. 프로젝트 루트 디렉토리에 next-env.d.ts 파일 생성
    - 추천 세팅을 사용하기 싫으면, tsconfig.json 파일 생성
2. npm install --save-dev typescript @types/react @types/node
3. pages 폴더 안에 .tsx 파일 생성 후 코드 넣고, 실행
    - npm run dev 로 실행
    - tsconfig.json 파일이 자동으로 생성되고, 셋팅까지 다 해줌
4. 페이지 접속해보기
    - http://localhost:3000 URL 입력
5. pages 폴더 안에 있는 index.js 파일을 index.tsx로 이름 변경 및 타입 스크립트코드 변경 => 실행
----
## Next.js 란?
- 리액트의 SSR을 쉽게 구현할 수 있게 도와주는 간단한 프레임 워크
- SSR의 단점(불필요한 부분까지 렌더링)과 CSR의 단점(초기 진입 속도 느림, SEO에 취약)을 해결하면서 두 방식의 장점을 살리고자 함
- 사용자가 처음 들어왔을 때의 페이지는 서버에서 받아 렌더링(SSR)하고, 그 뒤의 라우팅 처리는 CSR 방식을 이용
- 핵심 기능
    1. 코드 스플리팅
        - 규모가 큰 파일을 분리하여, 필요에 따라 해당 페이지만 불러옴
    2. 간단한 클라이언트 사이드 라우팅 제공
    3. 커스텀 API 서버
        - 커스텀 서버를 통해 라우트를 마스킹 할 수 있음
    4. getInitialProps() 함수
        - 데이터를 미리 가져 옴 => 한 번에 렌더링 가능
----
## Next.js 특징
1. pages 폴더 하위에 위치한 폴더 및 파일 명은 그대로 URL이 된다.
    - index.js는 /
    - first-post.js는 /posts/first-post
2. a 태그 사용
```
<a>태그를 <Link>컴포넌트로 감싼 형대로 사용
<div className={styles.container}>
Hello World!
    <Link href="/posts/first-post">
        <a className={styles.link}>go to first-post</a>
    </Link>
</div>
```