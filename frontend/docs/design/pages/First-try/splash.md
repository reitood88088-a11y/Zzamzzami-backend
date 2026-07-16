앱 실행 탭



1. Color (색상)

브랜드의 정체성을 강렬하게 전달하기 위해 지정된 Primary Color를 전체 배경으로 사용합니다.

Background (배경): #83539D (Royal Lilac / Primary)

Logo Box (로고 박스): #FFFFFF (Pure White / Canvas)

Logo Icon (로고 아이콘): #83539D (Royal Lilac / Primary)

Title Text (타이틀 텍스트): #FFFFFF (Pure White / Canvas)

Subtitle Text (서브타이틀 텍스트): rgba(255, 255, 255, 0.85) (White with 85% opacity - 시각적 피로도를 낮추기 위함)

2. Typography (타이포그래피)

전체 폰트는 Pretendard를 단일 사용합니다. 자간을 좁혀 트렌디하고 세련된 느낌을 줍니다.

App Title (앱 이름 - 짬짬이)

Font-family: Pretendard

Size: 42px (모바일 스플래시에 맞춘 커스텀 디스플레이 사이즈)

Weight: 700 (Bold)

Line Height: 1.1 (110%)

Letter Spacing (자간): -1.0px

App Subtitle (서브 카피 - 찍기만 하면 끝나는 AI 복습)

Font-family: Pretendard

Size: 18px (기본 {type.body} 규격 활용)

Weight: 400 (Regular)

Line Height: 1.45 (145%)

Letter Spacing (자간): -0.2px

3. Layout (레이아웃)

화면 중앙에 모든 핵심 요소가 집중되도록 정렬하여 시선을 하나로 모읍니다.

화면 전체 정렬: Flexbox를 사용하여 수직(Vertical) 및 수평(Horizontal) 중앙 정렬 (justify-content: center, align-items: center). 플렉스 방향은 세로(flex-direction: column).

컴포넌트 간 간격(Spacing):

로고 박스와 앱 타이틀 사이: Margin-bottom: 24px

앱 타이틀과 서브타이틀 사이: Margin-bottom: 12px (타이틀에 마진 적용)

4. UI Component (컴포넌트 명세)

화면을 구성하는 세 가지 핵심 컴포넌트입니다.

Logo Icon Box (심볼 영역)

크기: Width 104px × Height 104px

콘텐츠: 사용자가 직접 제작한 커스텀 앱 로고 이미지 삽입

정렬: Box 내부 중앙 정렬 (Flex center)

App Title (타이틀 영역)

"짬짬이" 텍스트. 로고 박스 하단에 위치.

App Subtitle (서브타이틀 영역)

"찍기만 하면 끝나는 자투리 복습" 텍스트. 타이틀 하단에 위치.

5. Elevation (그림자 및 깊이감)

기본적으로 Flat Design을 지향하지만, 중앙 로고에만 미세한 깊이감을 주어 배경과 분리시키고 클릭하고 싶은/입체적인 느낌(형태학적 친근감)을 부여합니다.

Logo Icon Box Shadow: box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

Y축 오프셋: 8px

블러 반경: 24px

스프레드: 0

색상: 검은색(Black) 투명도 10%

6. Shape (형태 및 곡률)

부드럽고 트렌디한 인상을 주기 위해 둥근 모서리를 사용합니다.

Logo Icon Box Radius: 30px (완전한 원형이 아닌, 부드러운 스퀘어 라운드 형태를 띠어 안정감을 줌)

Do (권장 사항)

최소한의 요소만 유지할 것: 사용자가 앱을 켜자마자 1\~2초 내에 핵심 브랜딩만 인식할 수 있도록 여백(Whitespace)을 충분히 확보하세요.

가독성 유지: 배경색(Royal Lilac) 위에서 텍스트가 뭉개지지 않도록 화이트 계열을 사용하고, 서브 타이틀은 85% 투명도로 약간 눌러주어 메인 타이틀(짬짬이)로 시선이 가도록 위계를 설정하세요.

부드러운 로딩: 가능하면 로고 아이콘이나 텍스트가 아주 살짝(0.5초 이내) 나타나는 Fade-in 애니메이션을 적용하면 고급스러운 느낌을 줄 수 있습니다.

Don't (금지 사항)

불필요한 버튼이나 네비게이션 추가 금지
배경 그라데이션 금지
추가 이미지 삽입 금지

