Review Tab (Reels-Style Feed) Design Specification

This document outlines the UI/UX design and technical specifications for the Review Tab in the 'JjamJjam' application. Utilizing a vertical scroll "Reels" metaphor, this screen allows users to quickly review learned materials. It adheres strictly to the Global Header and Global Bottom Navigation standardizations.

1. Color System (HEX Values)

The palette enforces a strict flat design. To maintain brand consistency without causing visual fatigue, the interactive Floating Action Buttons (FABs) utilize Semantic Colors (Green, Yellow, Red) that share the exact same saturation (31%) and lightness (47%) as the Primary Royal Lilac color.

Background & Surface

Primary (--primary): #83539D (Royal Lilac) - Used for headers, active states, and main study words.

Block Cream (--block-cream): #F7F4EE (Pastel Cream) - Main container background for visual comfort during long study sessions.

Canvas (--canvas): #FFFFFF (Pure White) - Study card background and header text.

Block Lilac (--block-lilac): #E5DEFA (Pastel Lilac) - Background for the language indicator badge.

Hairline (--hairline): #E5E5E5 (Border Gray) - Card outlines and structural borders.

Action Button Colors (Matched Saturation & Lightness)

Action Green (Know it): #529D6E (Muted Emerald)

Action Yellow (Review): #9D8452 (Muted Gold)

Action Red (Don't Know): #9D5252 (Muted Red)

Text & Icons

Text Main (--text-main): #1A1A1A (Off-Black) - Used for meanings and example sentences.

Text Muted (--text-muted): #666666 (Subtitle Gray) - Used for timestamps, FAB labels, and inactive GNB tabs.

2. Typography

All typography utilizes the Pretendard font family.

Element (Token)

Font Size

Weight

Line Height

Letter Spacing

Color

Header App Title

22px

800 (ExtraBold)

Normal

-1.0px

#FFFFFF

Card Main Word ({type.headline})

26px

700 (Bold)

1.35

-0.3px

#83539D

Card Body (Meaning/Example)

18px

400 (Regular)

1.45

-0.2px

#1A1A1A

Language Indicator Badge

14px

700 (Bold)

Normal

+0.5px

#83539D (Uppercase)

Time/Date Text

14px

500 (Medium)

Normal

Normal

#666666

FAB Labels

12px

500 (Medium)

Normal

Normal

#666666

GNB Text (Inactive)

11px

500 (Medium)

Normal

Normal

#666666

3. Layout & Architecture

Overall Structure:

Top (Fixed): Global Status Bar + Header (z-index: 50).

Center (Vertical Scroll): Reels Feed Container (Block Cream background).

Bottom-Right (Fixed Overlay): 3 Floating Action Buttons (FABs).

Bottom (Fixed): Global Bottom Navigation (Height 80px, z-index: 50).

Reels Feed Container:

Occupies 100% of the available height between the fixed header and bottom navigation.

Must utilize scroll-snap-type: y mandatory to snap to the next/previous card seamlessly upon swiping.

Individual Study Card (Reel Item):

Width: calc(100% - 48px) (Maintains 24px left/right padding).

Height: calc(100% - 40px) (Leaves top/bottom margin so the next card peeks into the viewport).

Snap Target: scroll-snap-align: center.

Floating Action Buttons (Reel Actions):

Position: Fixed to the bottom-right (bottom: 120px, right: 24px).

Spacing: Vertical gap: 24px between each button group.

4. UI Components

Global Header & Status Bar

Strictly follows the Global Header & Status Bar Design Specification.

Dual-container layout, 47px status bar + 68px header, #83539D background, #FFFFFF icons and typography. No drop shadows.

Study Card

Background #FFFFFF, Border 1px solid #E5E5E5.

Corner Radius: 24px.

Safe Area Padding: The text content must have a generous right padding (padding-right: 60px) to prevent overlap with the right-aligned FABs.

Card Header (Language & Timestamp)

Positioned absolutely inside the card at top: 24px, left: 24px.

Language Indicator Badge: Pill-shaped (Radius 50px), Padding 6px 14px, Background #E5DEFA. Indicates the target language (e.g., "English", "Chinese", "Japanese").

Timestamp: "MM/DD · OO hours ago" format for items scanned within 24 hours.

Card Content (Mocking Data Target)

Word: "Meticulous"

Meaning: "꼼꼼한, 세심한"

Example: "He is always meticulous in his work."

Floating Action Buttons (FABs)

Button dimensions: Width/Height 48px. Perfect Circle (Radius 9999px).

Top Button (Know it / 알아요): Background #529D6E, Icon check.

Middle Button (Review / 한번더): Background #9D8452, Icon rotate-right.

Bottom Button (Don't Know / 몰라요): Background #9D5252, Icon xmark.

Icon color is #FFFFFF. Labels are placed directly below each button in #666666.

Global Bottom Navigation (GNB)

Strictly follows the Global Bottom Navigation Design Specification.

The "Review" (Layer Group icon) is set to the Active state (#83539D, Bold). All other tabs, including Home, are identically muted.

5. Elevation & Depth

Zero Shadow Policy: Maintain absolute Flat Design for maximum study immersion.

Study Cards: box-shadow: none. Separation from the background is achieved solely via the Hairline border and color contrast.

FABs: box-shadow: none.

GNB / Header: box-shadow: none.

6. Shape & Radii

Perfect Circle (Radius 9999px): Global Header Profile, All 3 Floating Action Buttons.

Pill Shape (Radius 50px): Language Indicator Badge inside the card.

Large Rounded Corners (Radius 24px): Main Study Text Cards.

*Do

Implement Flawless Scroll-Snap: The core UX of a "Reel" relies on satisfying, kinetic scrolling. Ensure native CSS scroll-snap is finely tuned so cards perfectly center on swipe.

Enforce Text Safe Areas: Ensure strict max-width or padding-right on the card's inner text wrapper so long example sentences never hide behind the floating action buttons on smaller screens.

Dynamic Language Indication: The top-left badge must clearly update to reflect the correct language category of the current vocabulary card.

*Don't

Do Not Allow Text Overflow: The card height is fixed. If the meaning/example sentence is exceptionally long, enforce a silent internal vertical scroll (overflow-y: auto with hidden scrollbars) or text-truncation. Text must never spill out of the card.

Do Not Introduce Drop Shadows: Do not attempt to make the cards or the FABs "pop" using drop shadows. The layout relies entirely on solid block colors and hairlines to establish depth.