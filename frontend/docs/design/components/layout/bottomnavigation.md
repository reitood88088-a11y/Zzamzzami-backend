Global Bottom Navigation Design Specification

This document outlines the UI/UX design and technical specifications for the Global Bottom Navigation (GNB) component in the 'JjamJjam' application. This component utilizes a strict flat design system, ensuring all five navigational tabs possess identical visual hierarchy and structural anatomy.

1. Color System (HEX Values)

The component relies on a high-contrast, flat color palette to ensure WCAG legibility and clear state indication.

Background (--canvas): #FFFFFF (Pure White) - Base container background.

Top Border (--hairline): #E5E5E5 (Hairline Gray) - 1px solid stroke separating the navigation from the main scrollable content area.

Inactive State (--text-muted): #666666 (Subtitle Gray) - Applied to both the icon and the text label of unselected tabs. All tabs, including 'Home', share this default state.

Active State (--primary): #83539D (Royal Lilac) - Applied dynamically to the icon and text label of the currently active tab to indicate the user's location.

2. Typography

All navigation labels utilize the Pretendard font family. The hierarchy is managed strictly through font weight and color to denote active vs. inactive states.

State

Font Family

Size

Weight

Line Height

Color

Inactive (Default)

Pretendard

11px

500 (Medium)

Normal

#666666

Active (Selected)

Pretendard

11px

700 (Bold)

Normal

#83539D

3. Layout & Architecture

The navigation bar is anchored to the bottom of the viewport. It employs a Flexbox architecture to guarantee responsive, uniform distribution across varying device widths.

Positioning: position: absolute or fixed (depending on the parent container), bottom: 0, width: 100%. It must maintain a high z-index (e.g., 20 or higher) to overlay scrollable content.

Container Dimensions:

Height: 80px (Fixed).

Padding: padding-bottom: 12px (Critical: required to accommodate the iOS Home Indicator / Safe Area constraints). Left/right padding is set to 0.

Flex Properties: display: flex, justify-content: space-around, align-items: center.

Touch Target (Nav Item):

Width: 50px minimum (Ensuring accessible touch targets).

Flex Properties: display: flex, flex-direction: column, align-items: center, justify-content: center.

Gap: 4px vertical spacing between the icon and the text label.

4. UI Components

The navigation consists of five equally weighted interactive zones. Icons are sourced from FontAwesome and rendered at a fixed size of 22px.

스캔 (Scan): Icon: fa-camera (Solid)

복습 (Review): Icon: fa-layer-group (Solid)

홈 (Home): Icon: fa-house (Solid) — Standardized to match sibling elements.

AI 퀴즈 (AI Quiz): Icon: fa-bolt (Solid) — Updated label.

분석 (Stats): Icon: fa-chart-simple (Solid)

5. Elevation & Depth

Shadows: box-shadow: none.

Depth Strategy: The UI is strictly Flat. Z-axis separation from the main content is achieved exclusively via the 1px solid #E5E5E5 top border. All legacy floating attributes and drop shadows have been entirely deprecated.

6. Shape & Radii

Container: border-radius: 0px. The component stretches edge-to-edge.

Touch Targets: Rectangular bounding boxes with no visible background styling or rounded overlays.

*Do

Responsive Distribution: Ensure justify-content: space-around is utilized so that the gap between items scales fluidly depending on the device's screen width.

Safe Area Padding: Strictly enforce the 12px bottom padding to prevent touch interference with OS-level navigation bars (like the iOS Home Indicator).

Clear Active States: Toggle both the icon color and font weight (500 -> 700) simultaneously when a tab enters the active state.

*Don't

Do Not Break Uniformity: Never apply unique styling, sizing, floating logic, or background circles to the 'Home' tab. It must remain structurally identical to the other four tabs.

Do Not Use Drop Shadows: Do not apply a top drop-shadow to the navigation container. Stick strictly to the hairline border rule.