**Overview**

This design system is built on an elegant balance of deep accents and soft backgrounds. The core UI features **Royal Lilac** for primary actions and highlights, while relying on off-black and pure white for structural clarity. Visual interest and storytelling are driven by oversized, full-width pastel color blocks tailored for a trendy and aesthetic-sensitive audience. The UI relies on generous whitespace and bold typography rather than shadows or gradients.

**Core Rules:**

* **Brand & Monochrome Base:** Primary call-to-actions (CTAs) and key highlights use Royal Lilac, while body lines and structural elements remain off-black or pure white to reduce eye strain.
* **Color Blocks:** Storytelling happens inside large pastel sections (Cream and Lilac) that break up the white canvas and provide a soft, premium feel.
* **Pill Shapes Only:** All text buttons are pills. All icon buttons are perfect circles. No square buttons.
* **Flat Design:** Use shadows sparingly or not at all. Color blocks provide page depth.

**Typography**

* **Font Family:** Pretendard (Used exclusively across the entire app)

Hierarchy is driven by font weight and tight letter-spacing on large text, rather than just size. Display text uses tight line-heights; body text uses generous line-heights for readability.

**Text Tokens**

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| `{type.display}` | 64px | Medium (500) | 1.10 | -1.0px | Section opener headlines |
| `{type.headline}` | 26px | Bold (700) | 1.35 | -0.3px | Story-block titles inside color blocks |
| `{type.subhead}` | 26px | Regular (400) | 1.35 | -0.3px | Intro paragraphs at near-headline scale |
| `{type.body-lg}` | 20px | Regular (400) | 1.40 | -0.1px | Lead body copy |
| `{type.body}` | 18px | Light (300) | 1.45 | -0.2px | Default paragraph text |
| `{type.body-sm}` | 16px | Regular (400) | 1.45 | -0.1px | Card text, footer links |
| `{type.button}` | 20px | Medium (500) | 1.40 | -0.1px | All pill buttons |
| `{type.eyebrow}` | 18px | Medium (500) | 1.30 | +0.5px | Uppercase section labels (Taxonomy) |
| `{type.caption}` | 12px | Regular (400) | 1.00 | +0.6px | Uppercase small labels |

**Colors**

**Brand & Surface Core**

* **Primary (Royal Lilac):** `{colors.primary}` (`#83539D`) - Used for primary CTAs, active states, and key brand highlights. Adds an elegant, deep accent to the UI.
* **Text Core (Off-Black):** `{colors.text-main}` (`#1A1A1A`) - Used for headlines and body text to provide comfortable high contrast and readability.
* **Canvas (Pure White):** `{colors.canvas}` (`#FFFFFF`) - Default page background and secondary button fills.
* **Surface Soft (Soft Gray):** `{colors.surface-soft}` (`#F2F2F2`) - Off-white for floating cards and icon buttons on light canvas.
* **Hairline (Border Gray):** `{colors.hairline}` (`#E5E5E5`) - 1px borders for inputs and table dividers.

**Color Blocks (Pastels)**
Use these exclusively as full-width section backgrounds to divide content. These specific values are chosen to lower visual fatigue while maintaining a trendy, premium aesthetic.

* **Cream:** `{colors.block-cream}` (`#F7F4EE`)
* **Lilac:** `{colors.block-lilac}` (`#E5DEFA`)

**Layout & Spacing**

**Spacing Scale**

* `{spacing.xs}`: 8px
* `{spacing.sm}`: 12px
* `{spacing.md}`: 16px
* `{spacing.lg}`: 24px (Card interior padding)
* `{spacing.xl}`: 32px
* `{spacing.xxl}`: 48px (Color block interior padding)
* `{spacing.section}`: 96px (Vertical gap between major white canvas sections)

**Radii (Shapes)**

* `{rounded.md}`: 8px (Inputs, image frames, list items)
* `{rounded.lg}`: 24px (Cards, color-block sections)
* `{rounded.pill}`: 50px (All text buttons)
* `{rounded.full}`: 9999px (Icon buttons)

**UI Components**

* **Primary Button:** Royal Lilac fill (`#83539D`), pure white text, pill shape. Padding: 10px top/bottom, 20px left/right.
* **Secondary Button:** Pure White fill (`#FFFFFF`), Off-Black text (`#1A1A1A`), pill shape. No border.
* **Icon Button:** Perfect circle (40px). Surface Soft fill (`#F2F2F2`) on light areas, translucent white on dark areas. Active states can use Royal Lilac.
* **Color-Block Section:** Spans full content width. Uses a `{colors.block-*}` background (Cream or Lilac), 24px border radius, and 48px interior padding.
* **Standard Card:** White or Surface Soft background, 24px border radius, 24px interior padding, with a 1px Hairline border (`#E5E5E5`). No shadows.
* **Text Input:** White background, 8px border radius, 12px vertical / 14px horizontal padding, 1px Hairline border. Focused inputs can use a Royal Lilac border.

**Responsive Design Guidelines**

**Breakpoints**

* **Desktop (1280px):** Max content width. Side gutters scale from 48px down to 24px.
* **Tablet (960px):** Multi-column grids (like pricing or features) collapse from 4 columns to 2. Navigation collapses to a hamburger menu.
* **Mobile (768px):** Color-block sections become full-bleed (border radius drops to 0, section touches screen edges). Grids collapse to 1 column.
* **Mobile Small (560px):** Large display text reduces in size. Pill buttons expand to 100% full-width.

**Touch Targets & Scaling**

* **Interactive Elements:** All buttons and inputs must maintain a minimum hit area of 44px on touch devices.
* **Images:** UI mocks and images inside color blocks must scale proportionally. Do not crop them on smaller screens.
* **Whitespace:** Maintain the white canvas gap between color blocks across all breakpoints so the pacing remains consistent.