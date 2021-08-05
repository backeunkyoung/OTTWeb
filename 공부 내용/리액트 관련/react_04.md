## 리액트 문법
----
### React 실행 시 컴포넌트 렌더링이 2번 일어나는 현상
- 리액트는 Strict Mode를 지원하는데, 이 기능은 사이드 이펙트를 발견할 수 있도록 도와준다.
- 즉, 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구이다.
- 이 모드는 개발모드에서만 활성화되기 때문에, 프로덕션 빌드에는 영향을 끼치지 않는다.
- index.js에 이 모드가 선언되어 있는데, 이것 때문에 렌더링이 2번 일어나는 것이다.
- 따라서 <React.StricMode>를 지워주면 해결된다.
----
### 리액트에서 HTML 렌더링 시 주의사항
- 리액트에서 String형태의 html을 일반적으로 렌더링 하면 그냥 String의 형태로 출력된다.
- 코드에서 HTML을 설정하는 것은 cross-site-scripting(XSS) 공격에 쉽게 노출될 수 있기 때문에 위험함
- 따라서 리액트에서는 String형태의 html 렌더링을 지원하지 않음
- 만약, 꼭 사용해야 한다면 dangerouslySetInnerHTML을 사용해야 함(이름만 봐도 권장하지 않는 방법임을 나타냄)
    - <div dangerouslySetInnerHTML = {{_html:codes}}>