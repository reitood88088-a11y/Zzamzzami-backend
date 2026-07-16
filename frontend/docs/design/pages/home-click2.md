Home Click Tab (Detail Tab) Design Specification

This document provides the definitive UI/UX guidelines for the Home Click Tab (Detail Tab), which is accessed when a user clicks on a specific subject or study material from the Home Tab. This screen utilizes an Instagram-style story and feed UI to provide a familiar and engaging learning experience. It strictly adheres to the Global Header and Global Bottom Navigation (V2) standardizations.

1. Color System (HEX Values)

The color palette utilizes pastel tones and flat color blocks to maximize text readability and reduce visual fatigue.

Background & Surface

Primary (Story Ring Active Border): #83539D (Royal Lilac)

Canvas (Text Card Background, Active Story Background): #FFFFFF (Pure White)

Block Cream (Main Content Background): #F7F4EE (Pastel Cream)

Surface Soft (Inactive Story Circle Background): #F2F2F2 (Soft Gray)

Hairline (Card Border, Inactive Story Border): #E5E5E5 (Border Gray)

Text & Icons

Text Main (Body Text, Card Title): #1A1A1A (Off-Black)

Text Muted (Inactive Story Date): #666666 (Subtitle Gray)

2. Typography

All typography exclusively utilizes the Pretendard font family. The {type.body-lg} standard is applied to the main text cards as readability is the highest priority.

Element

Font Size

Weight

Line Height

Letter Spacing

Color

Story Date Text

15px

700 (Bold)

Normal

Normal

Inactive: #666666 / Active: #83539D

Card Title (Paragraph)

14px

700 (Bold)

Normal

+0.5px

#83539D (Uppercase)

Card Body (Study Text)

20px

400 (Regular)

1.6 (160%)

-0.1px

#1A1A1A

(Note: Header and Global Bottom Navigation text follow their respective Global Component specifications.)

3. Layout & Architecture

The layout is designed for focused reading with horizontal carousel navigation.

Overall Structure:

Top (Fixed): Global Status Bar + Header (Fixed height, utilizes a 'Back' button instead of a hamburger menu).

Center Top (Horizontal Scroll): Story-style Date Selector.

Center Bottom (Horizontal Scroll): Card-style Study Text Viewer (Carousel).

Bottom (Fixed): Global Bottom Navigation V2 (Height 80px).

Story Date Selector (.story-date-container):

Padding: Top/Bottom 24px, Left/Right 32px.

Gap: 14px between items.

Scrolling: Must use scroll-snap-type: x mandatory.

Feed Card Viewer (.feed-carousel):

Card Width: 88% of the viewport width (Implements a "Peeking UI" so the next card is partially visible).

Card Height: Fixed at 380px. (If content overflows, vertical scrolling occurs only inside the card).

Internal Padding: 24px.

Scrolling: Must use scroll-snap-align: center for a photo-swipe-like experience.

4. UI Components

Top Header (Global Component):

Strictly follows the Global Header & Status Bar Design Specification.

Modification: Because this is a Depth-2 page, the left action button must be a 'Back' (<) icon instead of the hamburger menu.

Story Ring (Instagram-style Date Button):

Dimensions: Overall ring size 60px × 60px (Perfect Circle).

Inactive State: Border 2px solid #E5E5E5, Inner Background #F2F2F2.

Active State: Border 2px solid #83539D, Inner Background #FFFFFF. (Indicates the currently viewed date).

Feed Card (Study Text Card):

Design: Background #FFFFFF, Border 1px solid #E5E5E5.

Shape: Rounded rectangle (Radius 24px).

Formatting: The internal title must be forced to uppercase to establish clear hierarchy.

Pagination Dots (Indicator):

Position: Below the feed cards.

Dimensions: 6px × 6px (Perfect Circle), Gap 6px.

States: Inactive #D9D9D9, Active #83539D.

Global Bottom Navigation (GNB V2):

Strictly follows the Global Bottom Navigation Design Specification (v2).

Active State: The "Home" tab should be set to the active state (#83539D).

5. Elevation & Depth

To ensure maximum focus on the study text, Flat Design is strictly maintained. Shadows are entirely excluded from cards and story rings.

Feed Card & Story Ring: box-shadow: none (0px). Depth is distinguished solely by border colors.

Bottom Navigation & Header: box-shadow: none.

6. Shape & Radii

Perfect Circle (Radius 9999px): Header profile, Story Ring borders, Story Inner Circle, Pagination Dots.

Large Rounded Corners (Radius 24px): Feed Cards (Simulates soft, rounded paper cards).

*Do

Mandatory Peeking UI: When setting up the horizontal scroll for the text cards, ensure the width is set around 85%~88% so that a portion of the next paragraph card is always visible on the right. This is a critical affordance to prompt swiping.

Apply Scroll Snap: Both the story rings and the text cards must utilize native browser scroll-snap features to provide a tactile, item-by-item snapping experience similar to Instagram.

Allow Internal Scrolling: For exceptionally long text passages that exceed the fixed card height, implement vertical scrolling inside the card (overflow-y: auto, with scrollbars hidden) rather than expanding the card's height.

*Don't

No Drop Shadows: Do not add shadows to the text cards to make them "pop." It creates a heavy interface. Separate the card from the cream background using only the hairline border.

No Hamburger Menu: Do not use the hamburger menu on this screen. As a detail page, the top-left navigation action must always be a "Back" button to allow users to return to the Home tab.