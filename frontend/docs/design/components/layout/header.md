Global Header & Status Bar Design Specification

This document provides the definitive UI/UX guidelines for the Global Header and Status Bar, a highly reusable top-navigation component applied across all main tabs in the '짬짬이' application. Consistency here is critical for brand identity and user navigation.

1. Color (HEX Values)

The header utilizes a high-contrast, flat dual-color scheme to maximize brand presence and legibility.

Background (Primary): #83539D (Royal Lilac) - Applied to both the Status Bar and the Header containers.

Text & Icons (Canvas): #FFFFFF (Pure White) - Applied to all typography, system icons, interactive buttons, and borders within the header area.

Profile Button Background: Transparent - Allows the Primary background to show through.

2. Typography

All text strictly uses the Pretendard font family.

| Element | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| App Title | Pretendard | 22px | 800 (ExtraBold) | Normal | -1.0px | #FFFFFF |
| Status Bar Time | Pretendard | 15px | 600 (SemiBold) | Normal | Normal | #FFFFFF |

3. Layout

The component is composed of two vertically stacked, horizontally spanning containers. It is designed to be fixed at the top of the viewport.

Overall Positioning: Both bars should act as a fixed or absolute overlay at the top (z-index: 50 or higher) to remain visible during vertical scrolling.

Status Bar Container:

Height: 47px (Fixed)

Padding: 0 28px (Left/Right)

Alignment: Flexbox (justify-content: space-between, align-items: center).

Header Container:

Height: Implicitly defined by padding and content (approx. 68px).

Padding: 16px 24px (Top/Bottom, Left/Right)

Alignment: Flexbox (justify-content: space-between, align-items: center).

4. UI Component

The global header consists of the following modular elements:

Status Bar Data:

Left: System Time ("9:41").

Right: System Icons group (Signal, Wi-Fi, Battery) rendered at 14px with a horizontal gap of 6px.

Hamburger Menu Button (Left Action):

Icon: FontAwesome fa-bars.

Size: 28px.

Behavior: Clickable area for opening side-navigation or settings.

App Title / Logo (Center):

Text: "짬짬이".

Positioning: Dead center of the header container.

Profile Button (Right Action):

Dimensions: Width 36px × Height 36px.

Styling: A transparent circle with a 2px solid #FFFFFF border.

Inner Icon: FontAwesome fa-user (Regular), rendered at 18px, dead center using flexbox.

5. Elevation

Shadow: 0px (None).

Depth Strategy: Strictly adheres to Flat Design. Do not use box-shadow to separate the header from the main scrolling content. Separation is achieved natively through the strong color contrast between the #83539D header and the #F7F4EE or #E5E5E5 backgrounds of the main content area.

6. Shape

Profile Button: Perfect Circle (border-radius: 9999px).

Containers: Sharp, full-width rectangles (0px border-radius) aligning perfectly with the device screen edges.

*Do

Fix to Top: Always ensure the combined Status Bar and Header remain sticky/fixed at the top of the user's viewport during scrolling.

Maintain Contrast: Ensure all child elements inside this component strictly use #FFFFFF to maintain WCAG-compliant contrast against the #83539D background.

Consistent Padding: Strictly adhere to the 24px and 28px horizontal safe-area paddings to align with iOS/Android design standards.

*Don't

No Drop Shadows: Never add a drop shadow (box-shadow) under the header to indicate scrolling depth. Stick to the flat design guidelines.

No Color Variations: Do not change the header's background color dynamically based on the page (e.g., making it white on the analysis tab). The Royal Lilac header is the core anchoring identity of the JjamJjam app.

No Icon Resizing: Do not alter the specific sizing ratio between the Hamburger menu (28px), App Title (22px), and Profile icon (18px inside a 36px box). This specific hierarchy is carefully balanced.