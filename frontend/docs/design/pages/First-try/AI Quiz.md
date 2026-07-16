1. Color (색상)

플랫 디자인을 원칙으로 하며, 핵심 정보와 학습 결과(Insight)에 브랜드 컬러를 활용합니다.

Primary (진행 바, Insight 아이콘): #83539D (Royal Lilac)

Text Main (질문, 옵션 텍스트): #1A1A1A (Off-Black)

Text Muted (Insight 본문 텍스트): #666666 (Subtitle Gray)

Canvas (배경, 옵션 버튼 배경): #FFFFFF (Pure White)

Block Cream (메인 콘텐츠 배경): #F7F4EE (Pastel Cream)

Block Lilac (Insight 카드 배경): #E5DEFA (Pastel Lilac)

Hairline (옵션 버튼 테두리): #E5E5E5 (Border Gray)

2. Typography (타이포그래피)

모든 폰트는 Pretendard를 사용합니다.

용도

Font Size

Weight

Line Height

Letter Spacing

Color

질문 텍스트 ({type.headline})

26px

700 (Bold)

1.35

\-0.3px

\#1A1A1A

옵션 버튼 ({type.body})

18px

400 (Regular)

1.45

\-0.2px

\#1A1A1A

Insight 제목

16px

700 (Bold)

기본

기본

\#83539D

Insight 본문

16px

400 (Regular)

1.5

기본

\#1A1A1A

하단 GNB 텍스트

11px

500 (Medium)

기본

기본

\#666666

3. Layout (레이아웃)

전체 구조:

상단(Fixed): 상태바 + 헤더

중앙(Vertical Scroll): 스토리형 진행 바 + 질문 + 옵션 버튼 리스트 + Insight 카드

최하단(Fixed): 하단 네비게이션 바 (80px)

진행 바 (Progress Bar): 상단에 5분할 스토리형 바를 배치하여 사용자가 현재 위치와 남은 분량을 인지하게 함.

질문 영역: 상단에서 약 30px 하단에 질문 텍스트 배치.

옵션 버튼: 질문 바로 아래에 세로로 스택(Stack) 배치.

Insight 카드: 퀴즈 풀이 직후 노출되는 해설 카드로, 옵션 버튼 영역 하단에 위치.

4. UI Component (컴포넌트 명세)

스토리 진행 바 (Story Progress): 상단에 가로로 5개 세그먼트를 잇는 형태. 활성화된 세그먼트는 Primary 컬러 적용.

질문 텍스트: 핵심 질문을 강조하는 헤드라인 스타일.

옵션 버튼 (Option Buttons): 알약 형태(Pill)로, 테두리가 있는 버튼. 터치 시 활성화/비활성화 상태를 명확히 구분.

Insight 카드: 하단에 위치한 학습 해설 영역. 배경을 Block Lilac으로 처리하여 정보의 중요도를 강조.

5. Elevation (그림자 및 깊이감)

Flat Design 원칙 준수. 모든 요소에 그림자(Drop Shadow)를 배제하고 색상과 테두리만으로 깊이감을 형성합니다.

예외: 하단 GNB의 '홈' 버튼은 전체 UI의 일관성을 위해 뎁스(Shadow) 적용 유지.

6. Shape (형태 및 곡률)

완전한 원형 (Radius 9999px): 하단 홈 버튼, 헤더 아이콘 등.

알약 형태 (Radius 50px): 모든 옵션 버튼, 진행 바 세그먼트.

큰 둥근 모서리 (Radius 24px): Insight 카드 영역.

\*Do (권장 사항)

피드백 즉시 제공: 유저가 옵션을 클릭하는 즉시 정/오답 여부를 시각적(테두리 색상 변경 등)으로 피드백할 것.

집중도 유지: 질문이 화면에 꽉 차지 않도록 적절한 여백을 유지하여 가독성을 높일 것.

Insight 활용: Insight 카드에는 아이콘(전구 등)을 활용해 해설임을 직관적으로 인지시킬 것.

\*Don't (금지 사항)

그림자 사용 금지: Insight 카드나 버튼에 입체감을 주려고 그림자를 넣지 마세요.

복잡한 애니메이션 금지: 퀴즈 답변 시 너무 화려한 폭죽 애니메이션 등은 지양하고 깔끔한 색상 변화 위주로 처리하세요.

좁은 터치 영역 금지: 옵션 버튼은 엄지손가락으로 쉽게 누를 수 있을 만큼 넉넉한 높이(최소 50px 이상)를 확보하세요.

