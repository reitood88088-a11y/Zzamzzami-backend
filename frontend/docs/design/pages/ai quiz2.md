AI Quiz Tab Design Specification

This document outlines the UI/UX design and technical specifications for the AI Quiz Tab in the '짬짬이' application. Inspired by the immersive progress mechanisms of social media stories, this screen is designed to facilitate quick, engaging learning assessments. It strictly adheres to the Global Header and Flat Global Bottom Navigation V2 standards.

1. Color System (HEX Values)

The design strictly follows a flat design paradigm. Brand colors are used purposefully to indicate progress, highlight interactive elements, and draw attention to learning insights.

Background & Surface

Primary (--primary): #83539D (Royal Lilac) - Used for the active progress bar segment, Insight icon, and active state in the GNB.

Canvas (--canvas): #FFFFFF (Pure White) - Base background for option buttons and standard UI elements.

Block Cream (--block-cream): #F7F4EE (Pastel Cream) - Main content wrapper background to reduce visual fatigue.

Block Lilac (--block-lilac): #E5DEFA (Pastel Lilac) - Background for the Insight card to indicate importance without overwhelming the user.

Hairline (--hairline): #E5E5E5 (Border Gray) - Borders for option buttons and structural separation.

Text & Icons

Text Main (--text-main): #1A1A1A (Off-Black) - Used for question text and option button labels.

Text Muted (--text-muted): #666666 (Subtitle Gray) - Used for Insight body text and inactive GNB labels.

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

Question Text ({type.headline})

26px

700 (Bold)

1.35

-0.3px

#1A1A1A

Option Button ({type.body})

18px

400 (Regular)

1.45

-0.2px

#1A1A1A

Insight Title

16px

700 (Bold)

Normal

Normal

#83539D

Insight Body Text

16px

400 (Regular)

1.50

Normal

#1A1A1A

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

#83539D

3. Layout & Architecture

The layout ensures a focused, distraction-free assessment environment.

Top (Fixed): Global Status Bar + Header (z-index: 50).

Center (Vertical Scroll): Main Quiz Content area.

Background: Block Cream (#F7F4EE).

Padding: Uniform 24px padding around the content.

Stack Order: Story Progress Bar -> Question Text -> Option Buttons Stack -> Insight Card.

Bottom (Fixed): Global Bottom Navigation V2 (Height 80px, z-index: 20).

4. UI Components

Global Header & Status Bar

Strictly follows the Global Header & Status Bar Design Specification.

Dual-container layout, #83539D background, #FFFFFF text/icons.

Story Progress Bar

Structure: A horizontal flex container featuring 5 equal-width segments.

Gap: 4px between segments.

State: Inactive segments use a muted gray (#D9D9D9). The active segment uses the Primary color (#83539D).

Question Text

Positioned immediately below the progress bar with a 10px top margin.

Left-aligned, utilizing the {type.headline} token for maximum readability.

Option Buttons

Layout: Vertically stacked (flex-direction: column) with a 12px bottom margin between buttons.

Dimensions: Width 100%. Adequate vertical padding (18px) to ensure an accessible touch target size.

Styling: Pill-shaped, #FFFFFF background, 1px solid #E5E5E5 border. Text is left-aligned.

Insight Card

Position: Displayed below the options immediately after a user selects an answer.

Styling: Block Lilac (#E5DEFA) background, 24px rounded corners, generous 24px padding.

Content: Features a title with a lightbulb icon (fa-lightbulb) in Primary color, followed by explanatory text.

Global Bottom Navigation (GNB V2)

Strictly follows the Global Bottom Navigation Design Specification (v2).

Active State: The fourth tab, "AI Quiz" (fa-bolt), is set to the Active state (#83539D, Bold). All other tabs, including the Home tab, are muted (#666666, Medium).

5. Elevation & Depth

Zero Shadow Policy: The application strictly adheres to Flat Design principles.

UI Elements: box-shadow: none is applied globally to option buttons, Insight cards, the global header, and the bottom navigation. Depth is communicated entirely through solid border lines (Hairline) and background color contrast.

6. Shape & Radii

Perfect Circle (Radius 9999px): Header profile button.

Pill Shape (Radius 50px): Option buttons and story progress bar segments.

Large Rounded Corners (Radius 24px): Insight Card.

*Do

Instant Visual Feedback: Ensure immediate visual feedback (e.g., changing the border/background color of the option button) the exact moment a user taps an answer.

Maintain Breathing Room: Preserve the 24px padding around the quiz container to prevent the question text from feeling cramped, ensuring high cognitive focus.

Emphasize Insights: Use semantic icons (like a lightbulb) within the Insight card to intuitively communicate that it is an explanatory or supplementary learning module.

*Don't

No Drop Shadows: Do not attempt to add 3D depth to the option buttons, the Insight card, or the navigation bar using box-shadow.

No Complex Animations: Avoid heavy, distracting animations (e.g., confetti or extreme screen shakes) upon answering. Rely on clean, crisp color transitions to indicate correct/incorrect states.

No Small Touch Targets: Never reduce the height of the Option Buttons below 50px. They must comfortably accommodate thumb taps during one-handed use.