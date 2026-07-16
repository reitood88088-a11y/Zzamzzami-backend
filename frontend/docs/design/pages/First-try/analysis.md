1. Color (색상)

플랫 디자인을 원칙으로 하며, 핵심 지표와 강조 요소에만 브랜드 컬러(Primary)를 적용하여 시선을 유도합니다.

Primary (핵심 지표, 활성 탭, 차트 강조, 말풍선 테두리/아이콘): #83539D (Royal Lilac)

Text Main (기본 본문 텍스트): #1A1A1A (Off-Black)

Text Muted (서브 텍스트, 비활성 차트 바, GNB 비활성): #666666 (Subtitle Gray)

Canvas (카드 배경, 비활성 탭 배경, 상단 헤더 텍스트): #FFFFFF (Pure White)

Block Cream (메인 콘텐츠 전체 배경): #F7F4EE (Pastel Cream)

Block Lilac (시간 절약 말풍선 배경): #E5DEFA (Pastel Lilac)

Hairline (카드 테두리, 구분선): #E5E5E5 (Border Gray)

2. Typography (타이포그래피)

모든 폰트는 Pretendard를 단일 사용합니다.

용도

Font Size

Weight

Line Height

Letter Spacing

Color

상단 헤더 앱 타이틀

22px

800 (ExtraBold)

기본

\-1.0px

\#FFFFFF

언어 탭 버튼

14px

600 (SemiBold)

기본

기본

활성 #FFFFFF / 비활성 #1A1A1A

통계 카드 제목 (Label)

11px

400 (Regular)

기본

기본

\#666666

통계 카드 수치 (Value)

18px

700 (Bold)

기본

기본

\#83539D

주간 차트 제목

16px

700 (Bold)

기본

기본

\#1A1A1A

차트 요일 라벨 (X축)

12px

400 (Regular)

기본

기본

\#666666

시간 절약 말풍선 본문

15px

600 (SemiBold)

1.4 (140%)

기본

\#1A1A1A

하단 GNB 텍스트

11px

500 (Medium)

기본

기본

활성 #1A1A1A / 비활성 #666666

3. Layout (레이아웃)

전체 레이아웃은 모바일 세로형(Portrait) 화면에 최적화된 Flexbox 구조를 따릅니다.

Top (Fixed): 상태바(47px) + 헤더 영역(약 68px). 상단에 고정(z-index: 30).

Middle (Scrollable): 메인 콘텐츠 영역 (.main-content).

전체 패딩: 상하좌우 24px (var(--spacing-lg)).

컴포넌트 간 세로 간격(Gap): 24px.

내용이 길어질 경우 이 영역 내부에서만 세로 스크롤 발생 (overflow-y: auto).

Bottom (Fixed): 네비게이션 바 (높이 80px, 하단 여유 12px 포함). 하단에 고정.

4. UI Component (컴포넌트 명세)

Top Header (상단 헤더)

배경: #83539D. 복습/홈 탭과 100% 동일한 구조 유지.

좌측 햄버거 메뉴 아이콘(28px), 중앙 타이틀, 우측 프로필 아이콘(원형 테두리 2px).

Language Tabs (언어 필터 탭)

알약 형태(Radius 50px). 가로 정렬(Flex), 요소 간 Gap 8px.

비활성: 배경 #FFFFFF, 테두리 1px solid #E5E5E5.

활성: 배경 #83539D, 테두리 없음. 글자색 #FFFFFF.

Stats Grid (핵심 통계 3열 카드)

그리드 레이아웃: grid-template-columns: 1fr 1fr 1fr, 간격(Gap) 12px.

카드 디자인: 배경 #FFFFFF, 테두리 1px solid #E5E5E5, 모서리 반경 24px. 내부 패딩 상하 16px, 좌우 8px.

Weekly Chart Card (주간 학습 차트)

카드 디자인: 배경 #FFFFFF, 테두리 1px solid #E5E5E5, 모서리 반경 24px, 내부 패딩 24px.

막대 그래프: 7개의 막대 배치. 막대 너비 24px, 모서리 반경 4px.

비활성 막대: #E5E5E5. 활성/강조 막대: #83539D.

Time Saved Bubble (시간 절약 말풍선)

형태: 모서리 반경 24px, 배경 #E5DEFA (연보라), 테두리 1px solid #83539D.

구조: 좌측 대중교통 아이콘(28px, #83539D), 우측 텍스트 정렬. 내부 패딩 20px, Gap 16px.

Bottom Navigation (하단 GNB)

현재 탭(분석) 아이콘 및 텍스트는 #83539D로 활성화 표시.

가운데 홈 버튼은 위로 16px 띄워진 플로팅 버튼(Radius 9999px) 형태 유지.

5. Elevation (그림자 및 깊이감)

학습 데이터의 가독성을 높이기 위해 철저한 Flat Design(플랫 디자인) 원칙을 준수합니다.

모든 카드 및 말풍선 (Stats, Chart, Bubble): box-shadow: none; (그림자 절대 금지). 얇은 테두리(Hairline)와 배경색의 명도 차이만으로 화면의 뎁스를 구분합니다.

Exception (예외): 하단 GNB의 중앙 홈(Home) 플로팅 버튼에만 예외적으로 일관성을 위한 그림자(box-shadow: 0 4px 12px rgba(131, 83, 157, 0.3))를 허용합니다.

6. Shape (형태 및 곡률)

완전한 원형 (Radius 9999px): 상단 프로필 아이콘 테두리, 하단 GNB 플로팅 홈 버튼.

알약 형태 (Radius 50px): 상단 언어 선택 탭 버튼.

큰 둥근 모서리 (Radius 24px): 3열 통계 카드, 주간 차트 카드, 시간 절약 말풍선 등 메인 대시보드를 구성하는 모든 카드 영역.

작은 둥근 모서리 (Radius 4px): 주간 차트 내부의 막대그래프(Bar).

\*Do (권장 사항)

간결한 데이터 표현: 복잡한 선 그래프나 원형 차트 대신 직관적인 막대(Bar) 차트와 큰 텍스트 수치를 활용하여 한눈에 들어오도록 구성하세요.

명확한 위계: 카드의 제목(Label)은 작고 옅게, 실제 수치(Value)는 크고 진한 포인트 컬러로 표현하여 유저가 가장 중요한 정보부터 인지하게 하세요.

여백(Padding) 준수: 카드 내부 패딩과 컴포넌트 간 간격을 철저히 지켜 답답해 보이지 않는 크림색 배경(Negative Space)을 확보하세요.

\*Don't (금지 사항)

카드에 그림자 넣기 금지: 카드 요소가 배경과 분리되어 보였으면 하는 마음에 임의로 Drop Shadow를 추가하지 마세요. 테두리(1px solid)만으로 충분합니다.

컬러 남용 금지: 차트에 시각적 즐거움을 준다고 무지개색이나 그라데이션을 사용하지 마세요. 지정된 Primary 컬러와 Gray 스케일만 활용하여 세련미를 유지하세요.

너무 많은 데이터 노출 금지: 대시보드에 스크롤을 끝없이 만들어 모든 통계를 보여주려 하지 마세요. 모바일 환경에 맞는 '핵심 요약' 정보만 노출하세요.

