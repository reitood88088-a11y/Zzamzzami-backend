1. Color (색상)

학습 내용에 온전히 집중할 수 있도록 배경과 카드의 색상을 분리하고, 상호작용(터치)이 필요한 핵심 요소에만 브랜드 컬러(Primary)를 배치합니다.

Background \& Surface

Primary (상단 헤더, 우측 플로팅 버튼, 메인 단어 텍스트): #83539D (Royal Lilac)

Block Cream (릴스 전체 배경 - 시각적 편안함): #F7F4EE (Pastel Cream)

Canvas (학습 카드 배경, 상단 헤더 텍스트/아이콘): #FFFFFF (Pure White)

Block Lilac (카드 좌상단 과목 배지 배경): #E5DEFA (Pastel Lilac)

Hairline (카드 테두리 선): #E5E5E5 (Border Gray)

Text \& Icons

Text Main (카드 본문 뜻 및 예문): #1A1A1A (Off-Black)

Text Muted (날짜/시간, 플로팅 버튼 라벨, 비활성 GNB): #666666 (Subtitle Gray)

2. Typography (타이포그래피)

모든 폰트는 Pretendard를 사용합니다.

용도 (Token)

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

카드 메인 단어 ({type.headline})

26px

700 (Bold)

1.35

\-0.3px

\#83539D

카드 본문 (뜻/예문) ({type.body})

18px

400 (Regular)

1.45

\-0.2px

\#1A1A1A

과목 배지

14px

700 (Bold)

기본

+0.5px

\#83539D (대문자)

시간/날짜 텍스트

14px

500 (Medium)

기본

기본

\#666666

플로팅 버튼 라벨

12px

500 (Medium)

기본

기본

\#666666

비활성 GNB 텍스트

11px

500 (Medium)

기본

기본

\#666666

3. Layout (레이아웃)

전체 구조:

상단(Fixed): 상태바 + 헤더 (높이 고정, Primary 배경)

중앙(Vertical Scroll): 릴스형 피드 컨테이너 (Block Cream 배경)

우측 하단(Fixed Overlay): 플로팅 액션 버튼 3종 모음

하단(Fixed): 네비게이션 바 (높이 80px)

릴스 피드 컨테이너 (Reels Container):

모바일 화면에서 상/하단 고정 영역을 제외한 나머지 높이를 100% 차지.

scroll-snap-type: y mandatory 속성을 반드시 적용하여 스와이프 시 다음 카드로 자석처럼 달라붙도록 설정.

개별 학습 카드 (Reel Item):

Width: 화면 너비에서 좌우 패딩 24px씩 제외.

Height: 상하로 다음 카드가 살짝 보이는 간격을 위해 컨테이너 높이에서 위아래 여백을 둠. (height: calc(100% - 40px))

scroll-snap-align: center 속성 적용.

우측 플로팅 액션 버튼 (Reel Actions):

위치: 화면 우측 하단 (bottom: 120px, right: 24px). 스크롤을 해도 항상 이 위치에 고정(Absolute).

버튼 간 간격(Gap): 24px (var(--spacing-lg)).

4. UI Component (컴포넌트 명세)

학습 카드 (Study Card)

배경색 #FFFFFF, 테두리 1px solid #E5E5E5.

형태: 모서리 곡률 24px. 그림자 없음.

내부 정렬: 단어와 뜻은 카드의 정중앙에 배치하되, 우측 플로팅 버튼과 텍스트가 겹치지 않도록 우측 패딩(padding-right: 60px)을 넉넉히 확보.

카드 헤더 (Card Header - 과목 \& 시간)

카드 내부 좌상단(top: 24px, left: 24px)에 고정 배치.

과목 배지: 알약 형태(Radius 50px). 패딩 6px 14px. 배경 #E5DEFA.

시간 표기 로직: 스캔된 지 24시간 이내인 자료만 MM/DD · OO시간 전 형태로 표기. 분과 초는 생략.

플로팅 액션 버튼 (Floating Action Buttons)

아이콘 버튼: 크기 Width/Height 48px. 배경색 #83539D, 아이콘 색상 #FFFFFF.

라벨 텍스트: 버튼 바로 아래에 중앙 정렬로 배치.

Bottom Navigation (하단 GNB)

홈탭과 동일한 구조. 현재 '복습' 탭이므로 두 번째 아이콘의 색상을 #83539D로 활성화.

5. Elevation (그림자 및 깊이감)

학습 몰입도를 위해 철저한 Flat Design을 유지합니다.

학습 카드: box-shadow: none; (테두리 Hairline만으로 배경 Cream과 분리)

플로팅 액션 버튼 3종: box-shadow: none;

Floating Home Button (홈 버튼): box-shadow: 0 4px 12px rgba(131, 83, 157, 0.3) (GNB 일관성 유지를 위해 홈 버튼에만 예외 적용)

6. Shape (형태 및 곡률)

완전한 원형 (Radius 9999px): 헤더 프로필, 플로팅 액션 버튼 3종(알아요, 한번더, 몰라요), GNB 홈 버튼.

알약 형태 (Radius 50px): 카드 좌상단 과목 배지.

큰 둥근 모서리 (Radius 24px): 메인 학습 텍스트 카드.

\*Do (권장 사항)

정확한 Scroll-Snap 구현: 릴스의 핵심은 '손가락으로 튕겼을 때 정확히 한 장씩 넘어가는 쾌감'입니다. CSS Native Snap이나 부드러운 스크롤 라이브러리를 사용.
우측 여백(Safe Area) 확보: 가운데 텍스트 내용이 길어질 경우, 우측에 둥둥 떠 있는 액션 버튼들(알아요 등)에 글자가 가려지지 않도록 카드 내부 텍스트 영역의 max-width 또는 우측 padding을 강제하세요.

무한 스크롤(Infinite Scroll): 과거 스캔 데이터가 많을 경우

\*Don't (금지 사항)

카드 밖으로 텍스트 이탈 금지: 카드의 높이는 고정되어 있으므로, 텍스트(뜻/예문)가 너무 길 경우 카드 안에서 세로로 조용히 스크롤 되거나 말줄임표 처리되도록 하되, 절대로 카드 영역 밖으로 텍스트가 삐져나오게 하지 마세요.

그라데이션 및 그림자 추가 금지: 카드를 돋보이게 하겠다고 카드 겉면이나 액션 버튼에 드롭 섀도우를 넣지 마세요. 배경색(Cream)과 카드색(White)의 명도 차이만으로 충분히 분리됩니다.

