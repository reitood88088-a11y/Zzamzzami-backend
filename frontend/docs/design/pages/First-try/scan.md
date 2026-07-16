1. Color (색상)

플랫 디자인 원칙에 따라 그림자를 배제하고, 솔리드 컬러와 투명도를 활용하여 UI 계층을 분리합니다.

Brand & Surface Core

Primary (헤더, 스캔 선, CTA 버튼, 활성 탭): #83539D (Royal Lilac)

Canvas (텍스트, 네비게이션 배경): #FFFFFF (Pure White)

Text Main (본문 및 타이틀 텍스트): #1A1A1A (Off-Black)

Text Muted (비활성 네비게이션 텍스트): #666666 (Subtitle Gray)

Color Blocks & Overlays

Block Cream (하단 액션 시트 배경): #F7F4EE (Pastel Cream)

Camera Overlay (카메라 어두운 배경): rgba(0, 0, 0, 0.3) (블랙 30% 투명도)

Focus Frame (스캔 초점 테두리): rgba(255, 255, 255, 0.8) (화이트 80% 투명도)

Floating Tools (플로팅 아이콘 배경): rgba(255, 255, 255, 0.9) (화이트 90% 투명도 - Surface Soft 대체)

2. Typography (타이포그래피)

모든 폰트는 Pretendard를 사용하며, 디자인 가이드라인의 Token 규격을 엄격히 따릅니다.

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

-1.0px

#FFFFFF

액션 시트 제목 ({type.headline})

26px

700 (Bold)

1.35 (135%)

-0.3px

#1A1A1A

액션 시트 본문 ({type.body})

18px

300 (Light)

1.45 (145%)

-0.2px

#1A1A1A

CTA 스캔 버튼 ({type.button})

20px

500 (Medium)

1.40 (140%)

-0.1px

#FFFFFF

비활성 GNB 텍스트

11px

500 (Medium)

기본

기본

#666666

3. Layout (레이아웃)

전체 구조:

상단(Fixed): 상태바 + 헤더 (Primary 컬러 배경)

중앙(Flex-grow): 카메라 뷰포트 (오버레이 및 스캔 포커스 프레임)

하단(Overlapping): 안내 텍스트와 스캔 버튼이 포함된 바텀 액션 시트(Bottom Action Sheet)

최하단(Fixed): 하단 네비게이션 바 (높이 80px)

Camera Viewport (카메라 영역):

스캔 포커스 프레임: 화면 너비의 75%, 높이의 60% 차지. 정중앙 배치.

플로팅 툴 (플래시, 갤러리): 우측 상단 배치. (Top 24px, Right 24px, 버튼 간격 Gap 16px)

Bottom Action Sheet (하단 액션 시트):

카메라 뷰 위로 겹치도록 상단 마진을 네거티브(margin-top: -32px)로 설정.

내부 패딩(Padding): 상단 48px (var(--spacing-xxl)), 좌우 24px (var(--spacing-lg)), 하단 100px (네비게이션 바 공간 확보용).

4. UI Component (컴포넌트 명세)

Top Header (상단 헤더)

배경색 #83539D. 좌측 햄버거 메뉴, 중앙 로고, 우측 프로필(원형 테두리). 텍스트 및 아이콘은 모두 화이트.

Camera Focus Frame (스캔 초점 영역)

오버레이(rgba(0,0,0,0.3)) 가운데를 투명하게 뚫어서 강조.

프레임 테두리: 2px solid rgba(255,255,255,0.8). 모서리 곡률 8px.

스캔 애니메이션: Primary 컬러(#83539D)의 두께 2px 가로선이 위아래로 반복해서 움직임 (2초 주기).

Floating Tools (우측 상단 제어 도구)

크기: Width/Height 40px. 완벽한 원형(9999px).

배경색 rgba(255, 255, 255, 0.9), 아이콘 컬러 #1A1A1A. 그림자 없음.

Bottom Action Sheet (하단 크림 블록)

디자인 가이드의 컬러 블록 메타포 적용. 배경 #F7F4EE.

상단 모서리 양쪽에만 24px 곡률 적용 (border-radius: 24px 24px 0 0).

Scan CTA Button (스캔하기 버튼)

넓이(Width): 가로 100% 꽉 채움.

알약 형태(Pill-shaped, Radius 50px).

배경 #83539D, 글씨 #FFFFFF. 그림자 없음(Flat).

Bottom Navigation (하단 GNB)

'홈탭'과 완벽하게 동일한 컴포넌트 유지 (가운데 홈 버튼 플로팅).

현재 위치가 '스캔' 탭이므로, 가장 좌측의 스캔 아이콘과 텍스트를 Primary 컬러(#83539D)로 활성화 표시.

5. Elevation (그림자 및 깊이감)

스캔 버튼 및 플로팅 아이콘을 포함한 카메라 뷰/액션 시트의 모든 UI 요소에 그림자(Drop Shadow)를 엄격히 금지합니다.

모든 텍스트 및 버튼: box-shadow: none; (Flat Design 원칙 유지)

Floating Home Button (하단 홈 탭 버튼): box-shadow: 0 4px 12px rgba(131, 83, 157, 0.3) (GNB 컴포넌트의 일관성 및 위계 유지를 위해 예외적으로 홈 버튼에만 적용)

6. Shape (형태 및 곡률)

완전한 원형 (Radius 9999px): 헤더 프로필, 우측 플로팅 툴 아이콘 배경, GNB 홈 버튼.

알약 형태 (Radius 50px): 하단 '스캔하기' CTA 버튼. (텍스트 버튼은 모두 알약 형태).

큰 둥근 모서리 (Radius 24px): 하단 액션 시트(Block Cream)의 좌상단, 우상단 모서리.

작은 둥근 모서리 (Radius 8px): 중앙 스캔 포커스 프레임.

🟢 Do (권장 사항)

Color Block 적극 활용: 하단의 여백을 단순히 하얗게 비워두지 말고, 가이드에 명시된 Block Cream 컬러 블록으로 덮는다.
엄지 영역(Thumb-zone) 최적화: 메인 스캔 버튼(CTA)을 화면 최하단 크림 블록 안에 큼지막하게 배치한다.
오버레이 대비 활용: 카메라 화면 주변부는 살짝 어둡게 눌러주고, 텍스트가 인식되는 프레임 안쪽만 맑게 보이게 한다.
🔴 Don't (금지 사항)

그림자 남용 금지: 스캔 버튼이나 카메라 툴 아이콘에 뎁스를 주겠다고 그림자를 넣지 마세요. 컬러와 형태(알약, 원형)만으로 버튼임을 인지시킵니다.

사각형 버튼 금지: 스캔 버튼이나 아이콘에 사각형 또는 애매한 라운드(예: 4px)를 적용하지 마세요.

복잡한 설정 노출 금지: 첫 화면에서는 오직 '촬영'에만 집중할 수 있도록 복잡한 OCR 해상도 설정이나 언어 선택 버튼을 밖으로 꺼내지 마세요. 