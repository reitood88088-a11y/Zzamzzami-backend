1. Color (색상)

브랜드 가이드라인의 파스텔 톤과 플랫한 컬러 블록을 활용하여 텍스트 가독성을 극대화하고 시각적 피로도를 낮춥니다.

Background \& Surface

Primary (상단 헤더, 스토리 링 활성 테두리): #83539D (Royal Lilac)

Canvas (텍스트 카드 배경, 활성 스토리 내부, GNB): #FFFFFF (Pure White)

Block Cream (메인 콘텐츠 배경 - 시각적 편안함 제공): #F7F4EE (Pastel Cream)

Surface Soft (비활성 스토리 원 배경): #F2F2F2 (Soft Gray)

Hairline (카드 테두리, 비활성 스토리 테두리): #E5E5E5

Text \& Icons

Text Main (본문 텍스트, 카드 제목): #1A1A1A (Off-Black)

Text Muted (스토리 비활성 날짜, GNB 비활성): #666666 (Subtitle Gray)

Header Text/Icon (상단 헤더 텍스트/아이콘): #FFFFFF (Pure White)

Indicator Inactive (페이지네이션 비활성 닷): #D9D9D9

2. Typography (타이포그래피)

모든 폰트는 Pretendard를 사용합니다. 텍스트 카드의 가독성이 가장 중요하므로 Body-lg 규격을 따릅니다.

용도

Font Size

Weight

Line Height

Letter Spacing

Color

헤더 앱 타이틀

22px

800 (ExtraBold)

기본

\-1.0px

\#FFFFFF

스토리 날짜 텍스트

15px

700 (Bold)

기본

기본

\#666666 (활성시 Primary)

카드 제목 (Paragraph)

14px

700 (Bold)

기본

+0.5px

\#83539D (대문자 고정)

카드 본문 (학습 텍스트)

20px

400 (Regular)

1.6 (160%)

\-0.1px

\#1A1A1A

비활성 GNB 텍스트

11px

500 (Medium)

기본

기본

\#666666

활성(Home) GNB 텍스트

11px

700 (Bold)

기본

기본

\#1A1A1A

3. Layout (레이아웃)

전체 구조:

상단(Fixed): 상태바 + 헤더 (높이 고정, 좌측 햄버거 대신 뒤로가기 버튼)

중앙 상단(Horizontal Scroll): 스토리형 날짜 선택기

중앙 하단(Horizontal Scroll): 카드형 학습 텍스트 뷰어 (Carousel)

하단(Fixed): 네비게이션 바 (높이 80px)

스토리 선택기 (Story Date Container):

상하 패딩 24px, 좌우 패딩 32px.

아이템 간 간격(Gap) 14px.

스크롤 시 스냅(scroll-snap-type: x mandatory) 적용.

피드 카드 뷰어 (Feed Carousel):

카드 1개의 너비: 화면 너비의 88% (우측에 다음 카드가 살짝 보이도록 Peeking UI 적용).

카드 높이: 380px 고정. (본문이 길면 카드 내부에서만 세로 스크롤 발생).

카드 내부 패딩: 24px.

스크롤 스냅(scroll-snap-align: center)을 적용하여 사진 넘기듯 딱딱 맞춰지도록 설정.

4. UI Component (컴포넌트 명세)

Top Header (상단 헤더)

배경색 #83539D.

좌측: 뒤로 가기(<) 아이콘 적용 (뎁스가 깊어졌음을 인지시킴). 크기 24px.

우측: 프로필 아이콘 (Width/Height 36px, border: 2px solid #FFFFFF, 배경 투명).

Story Ring (인스타 스토리형 날짜 버튼)

전체 링 크기: 60px × 60px (원형).

비활성 상태: border: 2px solid #E5E5E5, 내부 배경 #F2F2F2.

활성 상태: border: 2px solid #83539D, 내부 배경 #FFFFFF. (사용자가 현재 보고 있는 날짜).

Feed Card (학습 텍스트 카드)

배경 #FFFFFF, 테두리 1px solid #E5E5E5.

형태: 모서리가 둥근 둥근 사각형 (Radius 24px).

내부 타이틀은 대문자(Uppercase)로 처리하여 위계 부여.

Pagination Dots (인디케이터)

카드 피드 하단에 위치. 간격(Gap) 6px.

닷(Dot) 크기: 6px × 6px (완벽한 원형).

비활성 #D9D9D9, 활성 #83539D.

Bottom Navigation (하단 GNB)

홈 탭과 100% 동일한 컴포넌트 사용 (홈 버튼 플로팅 디자인 유지).

5. Elevation (그림자 및 깊이감)

학습 텍스트에 집중해야 하므로, 카드나 스토리 링에 그림자를 일절 배제한 Flat Design을 유지합니다.

피드 카드 \& 스토리 링: 그림자 없음 (0px). 테두리 컬러로만 뎁스 구분.

Floating Home Button (홈 버튼): box-shadow: 0 4px 12px rgba(131, 83, 157, 0.3) (GNB 컴포넌트 일관성 유지)

6. Shape (형태 및 곡률)

완전한 원형 (Radius 9999px): 헤더 프로필, 스토리 링 테두리, 스토리 내부 원, 페이지네이션 닷, GNB 홈 버튼.

큰 둥근 모서리 (Radius 24px): 텍스트가 들어가는 피드 카드 (부드럽고 둥근 종이 카드 느낌).

\*Do (권장 사항)

Peeking UI 필수 적용: 텍스트 카드 가로 스크롤 시, 반드시 우측에 '다음 문단 카드'가 일부 튀어나와 보이도록 너비를 85\~88% 수준으로 설정하여 스와이프를 유도하세요.

Scroll Snap 적용: 스토리 링과 텍스트 카드 모두 인스타그램처럼 한 항목씩 '탁, 탁' 걸리도록 브라우저 네이티브 scroll-snap 기능을 반드시 구현하세요.

내부 스크롤 허용: 피드 카드의 높이를 넘어가는 매우 긴 텍스트 문단의 경우, 카드의 전체 크기를 늘리지 말고 카드 내부에서 세로로 스크롤 되도록(overflow-y: auto, 단 스크롤바는 숨김 처리) 구현하세요.

\*Don't (금지 사항)

그림자(Drop Shadow) 남용 금지: 텍스트 카드에 그림자를 넣으면 화면이 무거워 보입니다. 테두리선(Hairline) 하나만으로 배경(Cream)과 카드를 분리하세요.

햄버거 메뉴 사용 금지: 이 페이지는 Depth 2(상세 페이지)이므로 상단 좌측에는 반드시 '뒤로 가기'를 적용해야 합니다.

