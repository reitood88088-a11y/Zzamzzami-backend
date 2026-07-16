Scan Tab Design Specification

This document provides the definitive UI/UX guidelines for the Scan Tab, the core functional screen of the 'JjamJjam' application. The layout is heavily optimized for one-handed operation (thumb-zone ergonomics) to ensure users can effortlessly scan study materials even in constrained environments like public transit.

1. Color System (HEX Values)

The design adheres to a strict flat UI paradigm, relying on solid colors, alpha channels (transparency), and high contrast to separate hierarchical layers without the use of drop shadows.

Brand & Surface Core

Primary (--primary): #83539D (Royal Lilac) - Used for the scan animation line, CTA button, and active bottom navigation state.

Canvas (--canvas): #FFFFFF (Pure White) - Base background for texts and standard UI elements.

Text Main (--text-main): #1A1A1A (Off-Black) - Used for primary headings and body typography.

Text Muted (--text-muted): #666666 (Subtitle Gray) - Used for inactive navigation labels.

Color Blocks & Overlays

Block Cream (--block-cream): #F7F4EE (Pastel Cream) - Background for the bottom action sheet to reduce eye strain.

Camera Overlay: rgba(0, 0, 0, 0.3) (Black, 30% Opacity) - Dims the peripheral camera view to focus user attention on the center.

Focus Frame: rgba(255, 255, 255, 0.8) (White, 80% Opacity) - Border color for the scanning target area.

Floating Tools: rgba(255, 255, 255, 0.9) (White, 90% Opacity) - Background for floating camera control icons, substituting a solid surface for better contextual blending.

2. Typography

All typography utilizes the Pretendard font family. The design strictly follows the established token system for consistent hierarchy.

Element (Token)

Font Size

Weight

Line Height

Letter Spacing

Color

Action Sheet Title ({type.headline})

26px

700 (Bold)

1.35 (135%)

-0.3px

#1A1A1A

Action Sheet Body ({type.body})

18px

300 (Light)

1.45 (145%)

-0.2px

#1A1A1A

CTA Scan Button ({type.button})

20px

500 (Medium)

1.40 (140%)

-0.1px

#FFFFFF

(Note: Global Header and Global Bottom Navigation typography follow their respective dedicated specification documents).

3. Layout Architecture

The screen is divided into fixed top/bottom navigational elements and a dynamic central viewport.

Top (Fixed): Global Header & Status Bar (z-index: 50).

Center (Flex-grow): Camera Viewport. This area takes up all available remaining height.

Focus Frame: Centered perfectly within the viewport, occupying 75% of the screen width and 60% of the viewport height.

Floating Tools: Anchored to the top-right of the viewport. top: 24px, right: 24px, with a vertical gap: 16px between buttons.

Bottom (Overlapping): Bottom Action Sheet.

Overlap: Utilizes a negative top margin (margin-top: -32px) to visually layer over the camera viewport.

Padding: Top 48px, Left/Right 24px, Bottom 100px (to ensure the CTA button clears the fixed bottom navigation).

Absolute Bottom (Fixed): Global Bottom Navigation (height: 80px, z-index: 100).

4. UI Components

Top Header (Global Component):

Strictly follows the Global Header & Status Bar Design Specification. (Royal Lilac background, #FFFFFF text/icons).

Camera Focus Frame:

Cut-out Effect: The center of the frame is fully transparent, while the rgba(0,0,0,0.3) overlay covers the rest of the screen.

Border: 2px solid rgba(255, 255, 255, 0.8).

Scan Animation: A 2px horizontal line utilizing the Primary color (#83539D). It animates vertically from top to bottom on a continuous 2s linear loop.

Floating Tools (Camera Controls):

Dimensions: 40px × 40px.

Styling: Perfect circle with rgba(255, 255, 255, 0.9) background and #1A1A1A icons.

Bottom Action Sheet:

Container utilizing the Block Cream (#F7F4EE) color.

Features asymmetric border radii: border-radius: 24px 24px 0 0.

Scan CTA Button:

Width: 100% of the parent container (minus padding).

Styling: Pill-shaped (border-radius: 50px), #83539D background, #FFFFFF text.

Bottom Navigation (Global Component v2):

Strictly follows the Global Bottom Navigation Design Specification (v2).

The floating Home button style is removed. All 5 tabs share a flat, identical structure.

Active State: The "Scan" (far left) tab icon and text are highlighted in #83539D.

5. Elevation & Depth

Zero Shadow Policy: Drop shadows (box-shadow) are strictly prohibited across the entire viewport, including the CTA button, floating camera tools, and the Bottom Navigation.

Depth Strategy: Visual depth is achieved exclusively through overlapping geometries (the action sheet overlapping the camera view) and alpha-channel contrasts (bright focus area vs. darkened overlay).

6. Shape & Radii

Perfect Circle (9999px): Floating tool backgrounds (Flash, Gallery).

Pill Shape (50px): Main Scan CTA Button.

Large Rounded Corners (24px): Top-left and top-right corners of the Bottom Action Sheet.

Small Rounded Corners (8px): Camera Focus Frame.

*Do

Thumb-Zone Optimization: Ensure the main Scan CTA button is massive and placed at the very bottom of the Action Sheet so users can comfortably reach it with one thumb.

Utilize Color Blocks: Use the Block Cream background for the lower half of the screen to provide a visually restful area, grounding the floating camera UI.

Maintain Contrast via Overlay: Ensure the rgba(0, 0, 0, 0.3) overlay is applied correctly to naturally draw the user's eye directly to the bright, clear center of the focus frame.

*Don't

Do Not Use Shadows: Never apply drop shadows to the Scan CTA button or the floating camera tools to make them "pop." Rely strictly on color contrast and shape.

Do Not Use Square Buttons: Do not apply sharp corners (0px) or subtle radii (e.g., 4px) to interactive buttons. The CTA must remain a friendly pill shape, and floating tools must be perfect circles.

Do Not Expose Complex Settings: Keep the viewport clutter-free. Do not place OCR language toggles, resolution settings, or advanced camera options on this primary screen. The goal is friction-free, immediate scanning.