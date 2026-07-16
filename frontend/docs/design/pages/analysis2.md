Analysis Tab Design Specification

This document provides the definitive UI/UX guidelines for the Analysis Tab in the '짬짬이' application. This tab presents a comprehensive overview of user learning statistics, achievements, and insights, utilizing a clean, data-focused flat design language. It strictly adheres to the standardized Global Header and Global Bottom Navigation guidelines.

1. Color System (HEX Values)

The palette follows a strict flat design system to minimize cognitive load and highlight critical performance metrics without visual clutter.

Background & Surface

Canvas (--canvas): #FFFFFF (Pure White) - Base background for data cards and inactive tabs.

Block Cream (--block-cream): #F7F4EE (Pastel Cream) - Global viewport background to reduce eye strain during data review.

Block Lilac (--block-lilac): #E5DEFA (Pastel Lilac) - Background for the "Time Saved" insight bubble to gently highlight its value.

Primary (--primary): #83539D (Royal Lilac) - Used for key metrics, active states, highlighted chart bars, and insight bubble borders.

Hairline (--hairline): #E5E5E5 (Border Gray) - Structural borders for cards and dividers.

Text & Icons

Text Main (--text-main): #1A1A1A (Off-Black) - Primary content, chart titles, and insight body text.

Text Muted (--text-muted): #666666 (Subtitle Gray) - Data labels, inactive chart bars, and X-axis text.

2. Typography

All typography exclusively utilizes the Pretendard font family.

Element

Font Size

Weight

Line Height

Letter Spacing

Color

Language Tab Button

14px

600 (SemiBold)

Normal

Normal

Active: #FFFFFF / Inactive: #1A1A1A

Stats Card Label

11px

400 (Regular)

Normal

Normal

#666666

Stats Card Value

18px

700 (Bold)

Normal

Normal

#83539D

Weekly Chart Title

16px

700 (Bold)

Normal

Normal

#1A1A1A

Chart Axis Label

12px

400 (Regular)

Normal

Normal

#666666

Insight Bubble Body

15px

600 (SemiBold)

1.4 (140%)

Normal

#1A1A1A

(Note: Header and Global Bottom Navigation typography follow their respective Global Component specifications.)

3. Layout & Architecture

The architecture follows a vertically constrained, modular layout optimized for mobile portrait screens.

Top (Fixed): Integrated Global Header and Status Bar (Standard Component, z-index: 50).

Middle (Vertical Scroll): Main content area (.main-content).

Background: Block Cream (#F7F4EE).

Padding: Uniform 24px padding around the viewport boundaries.

Gap: Standard 24px vertical spacing between major UI blocks (Tabs -> Stats -> Chart -> Bubble).

Overflow: Vertical scrolling is restricted to this content container only (overflow-y: auto).

Bottom (Fixed): Global Bottom Navigation (Standard Component, height: 80px, z-index: 50).

4. UI Components

Global Header & Status Bar

Strictly follows the Global Header & Status Bar Design Specification. (Royal Lilac background, #FFFFFF text/icons, Left Hamburger, Right Profile).

Language Filter Tabs

Layout: Horizontal Flexbox, gap: 8px.

Shape: Pill-shaped (border-radius: 50px).

Inactive State: Background #FFFFFF, Border 1px solid #E5E5E5, Text #1A1A1A.

Active State: Background #83539D, No Border, Text #FFFFFF.

Core Stats Grid

Layout: CSS Grid (grid-template-columns: 1fr 1fr 1fr), gap: 12px.

Card Design: Background #FFFFFF, Border 1px solid #E5E5E5, border-radius: 24px.

Inner Padding: Top/Bottom 16px, Left/Right 8px. Centered alignment.

Weekly Chart Card

Card Design: Background #FFFFFF, Border 1px solid #E5E5E5, border-radius: 24px, padding 24px.

Bar Elements: 7 vertical bars representing days. Bar width 24px, border-radius: 4px.

Bar States: Inactive/Low activity days use #E5E5E5. Active/High activity days use #83539D.

Time Saved Insight Bubble

Design: Background #E5DEFA (Pastel Lilac), Border 1px solid #83539D, border-radius: 24px.

Layout: Horizontal Flexbox (align-items: center), gap: 16px, internal padding 20px.

Content: Features a Primary-colored transit icon (e.g., train/bus) on the left, with descriptive copy on the right.

Global Bottom Navigation (GNB)

Strictly follows the Global Bottom Navigation Design Specification.

Active State: The "Stats" tab (far right) is highlighted in Primary (#83539D). All other tabs, including the Home tab, are muted.

5. Elevation & Depth

100% Flat Design Principle: box-shadow: none is strictly enforced across the entire viewport.

No Exceptions: Previous exceptions for floating action buttons or home buttons have been deprecated.

Depth Representation: Visual hierarchy and separation from the background are achieved entirely through color contrast (Cream vs. White backgrounds) and hairline borders (1px solid #E5E5E5).

6. Shape & Radii

Perfect Circle (Radius 9999px): Standard header profile icon.

Pill Shape (Radius 50px): Language filter tab buttons.

Large Rounded Corners (Radius 24px): All data cards, the chart container, and the insight bubble.

Small Rounded Corners (Radius 4px): Weekly chart bar elements.

*Do

Focus on Key Metrics: Use clear, large typographic values (18px, Bold) for core KPIs to ensure immediate data comprehension at a glance.

Ensure Negative Space: Strictly maintain the 24px container padding and gaps. The pastel cream background should act as "breathing room" around the white data cards.

Consistent Component Usage: Utilize the standardized Global Header and flat Bottom Navigation components without deviation.

*Don't

No Drop Shadows: Do not use shadows to create artificial depth on cards or the navigation bar. The flat design standard must be maintained completely.

No Data Overload: Avoid cluttering the screen with excessive line graphs or granular pie charts. Only present the most significant insights (like the Time Saved Bubble) that drive user motivation.

No Color Abuse: Do not use gradients or rainbow colors in the charts. Stick strictly to the Primary color and Gray scales to maintain a sophisticated, mature aesthetic.