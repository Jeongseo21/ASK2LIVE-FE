## ASK2LIVE

2021년 3월 11일 ~ 진행중

### **ASK2LIVE는 "짜임새 있는 Live Q&A" 서비스입니다.**

- 평소 궁금했던 호스트와의 음성/텍스트 기반 Live Q&A 특화 서비스
- Zoom, Google Meet, ClubHouse 등의 범용 서비스에 비해 궁금증을 해소한다는 뚜렷한 목적 지향 플랫폼.
- 플랫폼 특징
    - 호스트가 특정 주제로 세션 오픈을 예약
    - 평소 관심 있었던 게스트들이 사전질문을 등록
    → 호스트의 매끄러운 진행을 도울 수 있는 **큐시트** 역할
    - 라이브 중 게스트의 **질문들은 세션에 참여한 모든 사람들에게 공유되어 참여자들이 라이브 질문 흐름을 놓치지 않고 따라갈 수 있습니다.**
    - 음성이 부담스러운 유저를 위한 텍스트질문, 채팅 기능 구비. 유저 참여도 확대.


### 1. 메인페이지

- 로그인 후 진입 시 3개 카테고리로 분리된 세션 목록을 탐색
    - 라이브 진행 중인 Q&A
    - 라이브 예정인 Q&A
    - 게스트 모집 중인 Q&A

### 2. 세션 상세

- 관심 있는 Q&A를 클릭하여 세션의 상세 정보를 확인
- 사전 질문을 등록하여 Q&A 진행 시 자신의 질문을 우선 답변받을 수 있음
- "찜하기" 기능을 이용하면 찜했던 Q&A가 라이브되면 메인 최상단에 표시해주어 쉽게 진입할 수 있음

### 3. 라이브

- 호스트 VIEW
    - 현재 참여 중인 유저 목록 확인 가능
    - 유저가 등록한 텍스트/음성 질문의 답변 완료 처리
    - 게스트가 음성 질문 신청 시 마이크 권한을 부여하여 게스트의 음성을 모두에게 송출
- 게스트 VIEW
    - 텍스트/음성 질문을 선택하여 등록 가능
    - 이전에 답변 완료 처리된 질문 목록 확인

### 4. 마이페이지

- 자신을 나타낼 수 있는 정보 기입 가능
- 다른 유저들이 자신의 게스트가 될 수 있도록 홍보하는 역할 수행
    - 프로필 이미지
    - 닉네임
    - Company
    - Work Field
    - Biography

# 프론트엔드 기술

## Web RTC - Agora SDK

- Web RTC 기술을 구현하는 데 사용한 상용 SDK (Software Development Kit)
- 음성 스트리밍 구현에 필요했던 2가지 문제
    - 발언자의 목소리가 자신의 디바이스에서 다시 재생되는 문제
        - 아고라 공식 문서의 API와 메소드들을 공부
        - 컴포넌트 내의 적절한 곳에 API와 메소드들을 배치하여 발언자의 목소리가 청중들에게만 스트리밍될 수 있도록 구현
    - 음성 권한을 부여하는 기능 구현 문제
        - 아고라 슬랙 커뮤니티에서 비슷한 기능에 관심이 있는 다른 유저들의 질문들을 참고
        - 아고라에서 지원하는 RTM 기능을 활용
        - 호스트가 게스트에게 음성 권한을 부여할 때 해당 게스트에게 메시지를 전송하여 음성 스트리밍 기능을 활성화. 이를 기다리고 있는 라이브에 참여한 모든 유저들이 해당 게스트가 음성 권한을 획득했음을 인식.
        - 음성 권한을 획득한 게스트는 발언자가 되어 목소리가 청중들에게 스트리밍 됨

## React

- 리액트의 공식문서로 빠르게 내용을 학습하고 실제 코드에 적용할 수있도록 도와주고있음. 클래스형 컴포넌트 뿐만 아니라 React 버전 16.8에 추된 HOOK 문법도 설명이 되어있어서 둘을 비교하면서 공부할 수 있기 때문에 공식문서를 교과서로 삼아 공부했음.

### **State 관리**

"같은 코드가 여러 컴포넌트에서 중복되지 않게 하자!"

- ASK2LIVE의 특징은 컴포넌트의 depth가 깊고 서로 유기적으로 결합되어있는 데이터를 한 페이지에 그려줘야하기 때문에 전역적인 state 관리가 필요했음.
- Flux 디자인 패턴의 단방향 데이터 흐름을 활용한 Redux 라이브러리로 State를 관리하기로 결정. 러닝커브가 높다는 점에 있어 사용을 고민했지만 기존 방식에서 컴포넌트의 깊이가 깊어짐에 따라 디버깅에 어려움을 겪어 Redux를 도입하게되었음.
    - Redux 사용으로 얻은 이점
        - 기존의 컴포넌트 내부에서 호출했던 Api를 분리시킴으로써 비즈니스 로직을 컴포넌트와 분리할 수 있게 되었음.
        - 서로 떨어져있는 컴포넌트 사이에서 데이터를 변경하고 변경된 데이터를 가져오기 편리해짐
        - 같은 api를 여러 컴포넌트에서 호출해야할 때 이를 전역적으로 관리함으로써 코드의 중복을 막을 수 있었음.

코드 상에서 사용한 action들의 일부를 정리하였음.

## UI/UX

- 디자이너 "한수영" 님과 협업하여 메인페이지와 라이브 화면을 제작

### 유저테스트

- 실제 안정적 운영이 가능한지 테스트하기 위해 "정글 Ask Me Anything" 세션 진행
- 정글 프로그램에 관심이 있는 유저들을 사전에 모집하여 1기 교육생들에게 묻고 답하는 Q&A 형태로 진행
- 참여자 수 16명, 진행 시간 약 60분으로 끊김 없이 안정적인 서비스 운영 확인
- 사용성에 대한 긍정적 피드백과 더불어 UI/UX의 개선점을 들을 수 있는 좋은 기회가 되었음
    - 이후 개선사항
    - 발언자의 Avatar 주변에 음성이 송출되고 있다는 점을 알 수 있도록 음파 추가
    - 라이브 내 텍스트/음성 질문 시 주목도 있게 보여질 수 있도록 함
    - 음성질문 예시
- 사용성에 대한 긍정적 피드백과 더불어 UI/UX의 개선점을 들을 수 있는 좋은 기회가 되었음
    - 이후 개선사항
    - 발언자의 Avatar 주변에 음성이 송출되고 있다는 점을 알 수 있도록 음파 추가
    - 라이브 내 텍스트/음성 질문 시 주목도 있게 보여질 수 있도록 함
    - 음성질문 예시

# 백엔드

## Django

- 비즈니스 로직 구현
    - ORM을 활용한 관계형 데이터 구축
    - 모델, 뷰, 시리얼라이저(DRF)를 활용한 API 디자인
    - Channels, Channels-redis를 활용한 웹소켓 요청 처리
    - Async,Await를 활용한 비동기 함수 구현

## DB 모델링

- MySQL을 사용해 관계형 데이터베이스 구축

## LOCUST

- REST API, WebSocket 기반 채팅 구현 완료 후 부하 테스트를 위해 Locust활용
- 가상의 유저 100명이 ASK2LIVE 서비스를 이용하는 것을 가정
    - 로그인 → 세션 조회 → 사전질문 등록 → 세션 생성 & 개설 → 라이브 진입 & 이탈 까지의 전체 플로우를 스크립트화

- 테스트 후 부하 최소화를 위해 서버 튜닝
    - Gunicorn 워커 개수 증가
    - Nginx Connection 늘리기
    - EC2 스케일업

**결과**

- 평균 Response 시간 24% 감소

- RPS (Request Per Second) 32% 증가

## Redis 사용

- 메세지 데이터를 저장할 Cache Memory로 Redis 활용
    - 기존 방식
        - 브라우저가 보낸 메시지를 DB에 저장
        - 전체 메세지를 DB에서 다시 조회해서 채팅 그룹에 Broadcast
    - 문제점
        - 많은 양의 메시지가 전송될 경우 DB I/O Time이 늘어나면서 보낸 메세지 응답과 받은 메세지 응답의 Latency 발생

- **캐시를 활용한 개선 방식**
    - 브라우저에서 메시지가 전송되면 서버에서는 받은 메시지를 그대로 다시 Broadcast
    - Redis를 캐시메모리로 활용
        - 유저가 채팅방 첫 진입 시 Redis에 메세지가 존재하면 MySQL을 안 거치고 전달=
        - Redis에 데이터가 없을 경우에만 DB에서 데이터를 조회하여 전달
- 메시지 수신 평균 응답시간 58% 감소

- 평균 디스크 TPS 67% 감소

## 인프라 세팅

총 2개의 AWS EC2를 활용

- 1번째 EC2 안에 아래의 서버 세팅
    - 모든 요청을 서빙할 웹서버(Nginx)
    - 웹소켓을 위한 채팅 서버(Daphne)
    - HTTP 요청을 위한 WAS 서버(Gunicorn)
    - React 코드 빌드 파일을 Django Template에 넣어 싱글 페이지 랜더링
- 2번째 EC2 안에 아래의 데이터베이스 세팅
    - 채팅에 활용할 채팅 그룹, 메세지 데이터를 담을 Redis
    - 비즈니스 로직에 활용할 데이터를 담을 MySQL

# 협업방식 & 툴

## Scrum

- 매일 오전 11시 데일리 스크럼을 진행하여 당일의 Task 공유 및 확인

## Git

- 모든 코드는 Github을 이용하여 관리
- 최종 빌드 버전을 관리할 Upstream 저장소 생성
- 각 팀원 별로 분리된 기능 개발을 위해 Local Remote 저장소 생성
- Local 환경에서 개발할 때는 기능 별로 분리된 Branch 전략 사용
- 개발 기간이 길어지면서 코드를 Merge할 때 Conflict가 자주 발생하는 상황 직면
- 멘토님의 조언을 바탕으로 하루 1~2회 모두의 코드를 Merge하는 습관을 가지고자 노력
- Pull Request를 생성하면 팀원들이 모여 Conflict를 수정하고 모두의 코드 버전을 동기화하는 과정을 거침

## Swagger

- 프론트-백엔드 간 원활한 API 규격 소통을 위한 용도로 사용
- www.ask2live.me/swagger

## Figma

- 디자이너 한수영님과 협업하는 툴
- Figma의 코멘트 기능을 활용하여 UI 디자인 개발 우선순위를 결정
- 
- 현업에서 실제 쓰이는 툴을 경험하고, 디자이너와 협업하는 방법에 대해 고민하고 배울 수 있었던 좋은 계기
- 추후 지속적 협업을 통해 디자인 업그레이드를 할 예정
- 디자인 화면 예시
- 개발팀 회의 결과를 이미지로 공유
