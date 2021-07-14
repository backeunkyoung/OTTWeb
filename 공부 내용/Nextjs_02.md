## Redux(React + Flux)란?
- 애플리케이션의 state를 관리하기 위한 오픈소스 JavaScript 라이브러리
- Redux를 사용하지 않을 경우의 데이터 흐름 관리 방식 => MVC(Model-View-Controller) 패턴 방식
    - state가 변화하게 되면, '양방향 데이터 흐름'에 의해 제어 과정이 매우 복잡함
    - React 컴포넌트에서 개별적으로 state를 관리함
- Redux를 사용했을 경우의 데이터 흐름 관리 방식 => React + Flux 방식
    - state를 별도의 전용장소인 Store에서 관리하고, React 컴포넌트에서는 보여주기만 하는 용도로 사용함
        - state : 웹 사이트에서 현재를 위해 필요한 정보
            - ex) 로그인 한 사용자 정보, 현재 사용자가 보고 있는 탭 등
        - Store : 전역 JavaScript 변수
----
## Redux 장점
1. 상태의 중앙화
    - Redux는 store을 통해 상태를 한 곳에서 관리
        - 웹사이트의 상태를 어디서 관리할지 고민하지 않아도 됨
        - 웹 사이트에 다시 방문했을 때를 대비해 state를 쉽게 저장하고, 불러올 수 있다.
2. 읽기 전용 상태
    - 이전 상태로 돌아갈 때, 이전 상태를 현재 상태에 덮어쓰기만 하면된다.
3. 부수 효과(side effect) 없는 Reducer
    - Redux는 상태를 변경하는 도중 부수 효과가 일어나지 않도록 코딩하기를 요구함
        - 이와 함께 상태를 변경하려는 시도 자체를 복제, 저장, 전송할 수 있도록 JavaScript 객체 형태로 구성하기를 강제한다.
    - Reducer : 부수 효과가 일어나지 않도록 상태를 변경하는 함수
        - 부수 효과 : 함수가 실행 될 때, 매개변수가 다닌 다른 값에 따라 반환값이 바뀌는 것
    - Action : 상태 변경을 어떻게 할 것인지 정보를 담은 JavaScript 객체
    - Action만 가지고 상태가 어떻게 변화할지 완벽하게 예상할 수 있다.
    - Action의 일부를 제외하고 다시 실행하더라도 어떤 일이 벌어질지 예상하기 쉽다.
----
## Redux 단점
1. 높은 러닝커브
2, Redux가 개발자를 제약할 수 있다.
    - Redux의 철학이 강제하는 방식으로 인해 코드가 복잡해지거나 작성하기 어려워질 수 있다.
----
## Next.js에서 Redux 사용 셋팅
1. redux와 react를 연결하는데 도움을 주는 react-redux 라이브러리를 설치한다.
    - npm install redux react-redux
2. next.js와 react를 연결하기 위해서 next-redux-wrapper를 설치한다.
    - npm install next-redux-wrapper
3. redux를 사용할 때 유용한 redux devtools를 사용하기 위해 redux-devtools-extension을 설치한다.
    - npm install -D redux-devtools-extension
4. store가 바뀔 때마다 로깅(시스템 상태 정보를 기록)해주는 미들웨어 redex-logger를 설치
    - npm install redux-logger
5. Typescript 지원을 위한 설치
    - npm install @redexjs/toolkit
