Home Tab Design Specification

This document provides the definitive UI/UX guidelines for the Home Tab (Main Screen) in the 'JjamJjam' application. This core screen utilizes a bookshelf and diary metaphor to visually categorize and present the user's learning records.

1. Color System (HEX Values)

The design adheres to the brand guidelines, utilizing pastel backgrounds to reduce visual fatigue while making the content (diaries) stand out.

Background & Surface

Primary (Header, Active States): #83539D (Royal Lilac)

Canvas (Diary Background, GNB Background): #FFFFFF (Pure White)

Bookshelf Bg 1 (Default Background): #E5E5E5 (Hairline Color) or Transparent

Bookshelf Bg 2 (Alternating Background): #F7F4EE (Pastel Cream) - Applied to even-numbered bookshelves (e.g., Chinese) for visual separation.

Hairline (Dividers, Diary Borders): #E5E5E5 (Border Gray)

Text & Icons

Text Main (Base Text, Titles): #1A1A1A (Off-Black)

Text Muted (Sub-text, Inactive Icons): #666666 (Subtitle Gray)

Header Text/Icons: #FFFFFF (Pure White)

Diary Spine (Categorization Accent Colors)

English Spine: #83539D (Royal Lilac - Primary)

Chinese Spine: #E88B81 (Soft Coral)

Japanese Spine: #7BBA9B (Soft Sage Green)

2. Typography

All typography exclusively utilizes the Pretendard font family.

Element (Token)

Font Size

Weight

Line Height

Letter Spacing

Color

Global Header Title

22px

800 (ExtraBold)

Normal

-1.0px

#FFFFFF

Subject Badge

16px

700 (Bold)

Normal

+0.5px

#1A1A1A

Diary Date

28px

700 (Bold)

Normal

-1.0px

#1A1A1A

Diary Content (Items)

13px

400 (Regular)

Normal

Normal

#666666

NEW Badge Text

10px

700 (Bold)

Normal

Normal

#FFFFFF

GNB Text (Inactive)

11px

500 (Medium)

Normal

Normal

#666666

GNB Text (Active)

11px

700 (Bold)

Normal

Normal

#1A1A1A

3. Layout & Architecture

Overall Structure:

Top (Fixed): Global Header & Status Bar (z-index: 50).

Center (Vertical Scroll): Bookshelf List (Vertical stack of subjects).

Bottom (Fixed): Global Bottom Navigation V2 (Height 80px, including 12px safe area padding).

Bookshelf Container: Top and bottom padding of 32px (var(--spacing-xl)). Bookshelves are stacked vertically.

Diary Horizontal Scroll (Swipe Affordance):

Gap: 16px between diary cards.

Padding: Left 24px. Right padding must be 32px to ensure the next card peeks into the viewport (Peeking UI).

Scrolling: Must utilize scroll-snap-type: x mandatory for a card-by-card snapping experience.

4. UI Components

Global Header & Status Bar

Strictly follows the Global Header & Status Bar Design Specification. (Royal Lilac background, #FFFFFF text/icons).

Subject Badge

Shape: Pill-shaped (border-radius: 50px).

Padding: 4px (top/bottom) by 16px (left/right).

Styling: border: 2px solid #1A1A1A, text must be forced to Uppercase.

Diary Card

Dimensions: Width 130px × Height 160px.

Spine Detailing: The left 14px utilizes a pseudo-element (::before) to apply the subject's designated spine color. A 1px semi-transparent black line (rgba(0,0,0,0.1)) is placed next to the spine to simulate a book crease.

NEW State: Diaries generated today feature a 2px solid #83539D border and a 'NEW' badge (Primary background, White text) positioned at the top right.

Global Bottom Navigation (GNB V2)

Strictly follows the Global Bottom Navigation Design Specification (v2).

No Floating Button: The home button is completely flat and structurally identical to the other 4 tabs. No exceptions.

5. Elevation & Depth

While adhering to flat design principles, highly subtle depth is applied to specific metaphors (books) to establish form.

Diary Card: box-shadow: 2px 2px 0px rgba(0,0,0,0.03) (A micro-shadow to simulate paper texture/thickness).

Bottom Navigation: box-shadow: none (Strictly flat, separated only by a hairline top border).

6. Shape & Radii

Perfect Circle (Radius 9999px): Header profile icon, NEW badge.

Pill Shape (Radius 50px): Subject Badge.

Asymmetric Rounding (Radius 4px 16px 16px 4px): Diary Card. Mimicking a physical book, the left side (spine) has sharp 4px corners, while the right side (pages) has softer 16px corners.

*Do

Chronological Sorting: Always render the most recently scanned (studied) diary at the far left (index 0).

Maintain Peeking UI: Precisely tune the right margin of the scroll container to ensure a portion of the next diary card is always visible. This is a critical UX affordance prompting users to swipe.

Establish Visual Hierarchy: Ensure the "NEW" state (badge and primary-colored border) immediately catches the user's eye upon loading the tab.

*Don't

No Heavy Drop Shadows: Do not apply large, blurred drop shadows to the diary cards. Stick to the specified micro-shadow (2px offset, 0px blur) to maintain the flat aesthetic.

No Square Badges: All badges must adhere to the specified pill or circular radii. Do not use generic 4px or 8px rounded squares for these elements.

No Complex Backgrounds: Do not use patterns or gradients for the bookshelf backgrounds. Use only the specified solid pastel tones.
