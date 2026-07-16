1. Color (색상)

브랜드 가이드라인을 준수하며, 파스텔 톤 배경을 활용.
Background & Surface

Primary (상단 헤더, 홈 버튼 배경): #83539D (Royal Lilac)

Canvas (다이어리 배경, 하단 네비게이션 배경): #FFFFFF (Pure White)

Bookshelf Bg 1 (기본 배경): #E5E5E5 (Hairline Color 활용) 또는 투명

Bookshelf Bg 2 (교차 배경 - 크림): #F7F4EE (Pastel Cream) - HSK 등 짝수 번째 책장에 적용

Hairline (구분선, 다이어리 테두리): #E5E5E5

Text & Icons

Text Main (기본 텍스트, 타이틀): #1A1A1A (Off-Black)

Text Muted (서브 텍스트, 비활성 아이콘): #666666 (Subtitle Gray)

Header Text/Icon (상단 헤더 내부 텍스트/아이콘): #FFFFFF (Pure White)

Diary Spine (책등 포인트 컬러)

TOEIC Spine: #83539D (Royal Lilac - Primary)

HSK Spine: #E88B81 (Soft Coral)

JLPT Spine: #7BBA9B (Soft Sage Green)

2. Typography (타이포그래피)

모든 폰트는 Pretendard를 사용합니다.

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

-1.0px

#FFFFFF

과목 뱃지 (Subject)

16px

700 (Bold)

기본

+0.5px

#1A1A1A

다이어리 날짜 (Date)

28px

700 (Bold)

기본

-1.0px

#1A1A1A

다이어리 내용 (Items)

13px

400 (Regular)

기본

기본

#666666

NEW 뱃지 텍스트

10px

700 (Bold)

기본

기본

#FFFFFF

비활성 네비게이션 텍스트

11px

500 (Medium)

기본

기본

#666666

활성(Home) 네비게이션

11px

700 (Bold)

기본

기본

#1A1A1A

3. Layout (레이아웃)

전체 구조:

상단(Fixed): 상태바 + 헤더 (높이 유동적이나 콘텐츠 여백 16px 24px 유지)

중앙(Scroll): 과목별 책장 리스트 (세로 스크롤)

하단(Fixed): 네비게이션 바 (높이 80px, 하단 여유 공간 12px 포함)

책장(Bookshelf) 영역: 상하 패딩 32px (var(--spacing-xl)). 각 책장은 세로로 나열되며 짝수 번째 책장은 크림색 배경을 적용.

다이어리 가로 스크롤 (Swipe Affordance):

다이어리 간 간격(Gap): 16px

좌우 패딩: 좌측 24px, 우측은 스크롤 시 다음 카드가 살짝 보이도록(Peeking) 32px 여유.

CSS scroll-snap-type: x mandatory를 적용하여 카드 단위로 딱딱 떨어지게 스크롤.

4. UI Component (컴포넌트 명세)

Top Header (상단 헤더)

배경색 #83539D. 좌측 햄버거 메뉴, 중앙 앱 이름, 우측 프로필 아이콘 배치.

프로필 아이콘: Width/Height 36px, border: 2px solid #FFFFFF, 배경 투명.

Subject Badge (과목 뱃지)

알약 형태(Pill-shaped). Padding 4px 16px.

테두리 border: 2px solid #1A1A1A, 텍스트 대문자 고정(Uppercase).

Diary Card (학습 다이어리 카드)

크기: Width 130px × Height 160px.

좌측 14px 영역은 가상 요소(::before)를 활용해 책등(Spine) 컬러 적용.

책등 옆에 1px 반투명 검은색 선(rgba(0,0,0,0.1))을 넣어 접히는 선 디테일 표현.

NEW 상태: 당일 스캔한 최신 다이어리는 테두리를 #83539D (2px)로 강조하고 우측 상단에 'NEW' 뱃지(Primary 배경, 흰색 글씨) 부착.

Bottom Navigation (하단 GNB)

5개 메뉴 균등 분할 배치.

Home Floating Button (가운데 홈 버튼):

상단으로 16px 띄움(top: -16px).

아이콘 컨테이너 크기: Width/Height 56px.

배경색 #83539D, 아이콘 흰색, 테두리 4px solid #FFFFFF로 배경과 분리.

5. Elevation (그림자 및 깊이감)

플랫 디자인을 지향하되, 상호작용이 필요한 요소와 메타포(책)에 미세한 깊이감을 줍니다.

Diary Card (다이어리): box-shadow: 2px 2px 0px rgba(0,0,0,0.03) (매우 미세한 플랫 뎁스로 종이 질감만 살짝 표현)

Floating Home Button (홈 버튼): box-shadow: 0 4px 12px rgba(131, 83, 157, 0.3) (버튼이 떠 보이도록 브랜드 컬러가 섞인 그림자 부여)

6. Shape (형태 및 곡률)

완전한 원형 (Radius 9999px): 헤더 프로필 버튼 테두리, 하단 홈 플로팅 버튼, NEW 뱃지.

알약 형태 (Radius 50px): 과목 뱃지(Subject Badge).

비대칭 라운드 (Radius 4px 16px 16px 4px): 다이어리 카드. 실제 책처럼 좌측(제본 면)은 각지게 4px, 우측(넘기는 면)은 둥글게 16px 처리.

🟢 Do (권장 사항)

최신순 정렬: 가장 최근에 스캔(학습)한 날짜의 다이어리가 무조건 가장 왼쪽(첫 번째)에 오도록 렌더링하세요.

Peeking UI 유지: 우측 끝 화면 마진을 조절하여 항상 다음 다이어리의 일부가 화면에 걸쳐 보이도록 하세요. (스와이프를 유도하는 핵심 UX)

명확한 위계: 최신 학습 기록(NEW 뱃지, 보라색 테두리)이 시각적으로 가장 먼저 눈에 띄게 하세요.

🔴 Don't (금지 사항)

과도한 그림자 금지: 다이어리 카드에 무겁