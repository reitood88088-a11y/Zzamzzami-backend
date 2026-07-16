# Splash Screen Design Specification

## 1. Screen Overview

The Splash Screen is the first visual touchpoint users see when launching the app.
Its purpose is to communicate the brand identity quickly, clearly, and emotionally within 1–2 seconds.

This screen should feel:

* Simple
* Premium
* Friendly
* Fast
* Study-focused but not academically heavy

The screen uses a strong Royal Lilac background to create immediate brand recognition, while the white logo box and white typography provide strong contrast and visual clarity.

---

## 2. Color

### 2.1 Color Tokens

| Element       |        Token Name |                 HEX / Value | Usage                            |
| ------------- | ----------------: | --------------------------: | -------------------------------- |
| Background    |  `colors.primary` |                   `#83539D` | Full-screen background           |
| Logo Box      |   `colors.canvas` |                   `#FFFFFF` | White container for the app icon |
| Logo Icon     |  `colors.primary` |                   `#83539D` | Icon inside the logo box         |
| Title Text    |   `colors.canvas` |                   `#FFFFFF` | Main app title                   |
| Subtitle Text | `colors.white-85` | `rgba(255, 255, 255, 0.85)` | Supporting subtitle text         |
| Shadow        | `shadow.black-10` |        `rgba(0, 0, 0, 0.1)` | Subtle logo box shadow           |

### 2.2 Color Application

The entire screen background must use:

```css
background-color: #83539D;
```

The logo box must use:

```css
background-color: #FFFFFF;
```

The icon inside the logo box must use:

```css
color: #83539D;
```

The app title must use:

```css
color: #FFFFFF;
```

The subtitle must use:

```css
color: rgba(255, 255, 255, 0.85);
```

---

## 3. Typography

The entire screen must use **Pretendard** as the single font family.

```css
font-family: "Pretendard", sans-serif;
```

### 3.1 App Title

| Property       |          Value |
| -------------- | -------------: |
| Text           |          `짬짬이` |
| Font Family    |     Pretendard |
| Font Size      |         `42px` |
| Font Weight    |          `700` |
| Line Height    | `1.1` / `110%` |
| Letter Spacing |       `-1.0px` |
| Color          |      `#FFFFFF` |
| Alignment      |         Center |

CSS reference:

```css
.app-title {
  font-family: "Pretendard", sans-serif;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1.0px;
  color: #FFFFFF;
  text-align: center;
}
```

---

### 3.2 App Subtitle

| Property       |                       Value |
| -------------- | --------------------------: |
| Text           |        `오늘 찍은 문장, 내일 바로 복습` |
| Font Family    |                  Pretendard |
| Font Size      |                      `18px` |
| Font Weight    |                       `400` |
| Line Height    |             `1.45` / `145%` |
| Letter Spacing |                    `-0.2px` |
| Color          | `rgba(255, 255, 255, 0.85)` |
| Alignment      |                      Center |

CSS reference:

```css
.app-subtitle {
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.2px;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
}
```

---

## 4. Layout

### 4.1 Screen Container

The screen must occupy the full mobile viewport.

```css
.splash-screen {
  width: 100%;
  min-height: 100vh;
  background-color: #83539D;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

### 4.2 Alignment

All core elements must be centered both vertically and horizontally.

| Axis       | Alignment |
| ---------- | --------- |
| Horizontal | Center    |
| Vertical   | Center    |
| Direction  | Column    |

The layout should use Flexbox:

```css
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
```

---

## 5. Spacing

| Relationship             | Spacing |
| ------------------------ | ------: |
| Logo Box → App Title     |  `24px` |
| App Title → App Subtitle |  `12px` |

CSS reference:

```css
.logo-box {
  margin-bottom: 24px;
}

.app-title {
  margin-bottom: 12px;
}
```

The subtitle should not require additional bottom margin.

---

## 6. UI Components

The Splash Screen is composed of four main components.

```txt
SplashScreen
 ├─ SplashBackground
 ├─ LogoIconBox
 ├─ AppTitle
 └─ AppSubtitle
```

---

### 6.1 SplashBackground

The full-screen background component.

| Property         |           Value |
| ---------------- | --------------: |
| Width            |          `100%` |
| Height           |         `100vh` |
| Background Color |       `#83539D` |
| Layout           |     Flex column |
| Alignment        | Center / Center |

Purpose:

The background establishes the app’s primary brand color immediately.
No gradients, patterns, or additional decorative images should be used.

---

### 6.2 LogoIconBox

The logo box is the central visual anchor of the splash screen.

| Property         |                           Value |
| ---------------- | ------------------------------: |
| Width            |                         `104px` |
| Height           |                         `104px` |
| Background Color |                       `#FFFFFF` |
| Border Radius    |                          `30px` |
| Display          |                            Flex |
| Align Items      |                          Center |
| Justify Content  |                          Center |
| Shadow           | `0 8px 24px rgba(0, 0, 0, 0.1)` |

CSS reference:

```css
.logo-icon-box {
  width: 104px;
  height: 104px;
  background-color: #FFFFFF;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}
```

---

### 6.3 Logo Icon

The icon should visually communicate scanning, AI-powered learning, or document-based review.

Recommended icon direction:

* A simple document icon
* A scan-frame symbol
* A camera/document hybrid symbol
* A minimal AI review mark

| Property     |                     Value |
| ------------ | ------------------------: |
| Color        |                 `#83539D` |
| Style        |                 Line icon |
| Stroke Width | Medium, visually balanced |
| Alignment    |                    Center |
| Complexity   |                   Minimal |

The logo icon should not include multiple colors.
It should use only Royal Lilac on the white logo box.

---

### 6.4 AppTitle

The title displays the app name.

| Property  |          Value |
| --------- | -------------: |
| Text      |          `짬짬이` |
| Position  | Below logo box |
| Alignment |         Center |
| Color     |      `#FFFFFF` |

This is the strongest text element on the screen and should receive the highest visual priority.

---

### 6.5 AppSubtitle

The subtitle explains the app’s core value in one short sentence.

| Property  |                       Value |
| --------- | --------------------------: |
| Text      |        `오늘 찍은 문장, 내일 바로 복습` |
| Position  |             Below app title |
| Alignment |                      Center |
| Color     | `rgba(255, 255, 255, 0.85)` |

The subtitle should feel supportive, not dominant.
Its opacity is reduced to 85% to lower visual fatigue and keep the title as the main focus.

---

## 7. Elevation

The overall design should remain flat.
Only the logo box receives elevation to separate it from the solid background.

### 7.1 Logo Box Shadow

```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
```

| Property    |                Value |
| ----------- | -------------------: |
| X Offset    |                `0px` |
| Y Offset    |                `8px` |
| Blur Radius |               `24px` |
| Spread      |                `0px` |
| Color       | `rgba(0, 0, 0, 0.1)` |

Purpose:

The shadow gives the logo a subtle sense of depth without breaking the flat design direction.

---

## 8. Shape

### 8.1 Logo Box Shape

The logo box uses a soft rounded-square shape rather than a perfect circle.

| Property      |   Value |
| ------------- | ------: |
| Width         | `104px` |
| Height        | `104px` |
| Border Radius |  `30px` |

CSS reference:

```css
border-radius: 30px;
```

Design rationale:

A rounded square feels stable, modern, and app-like.
It is softer than a sharp rectangle but more structured than a circle.

---

## 9. Animation

Animation is optional but recommended.

### 9.1 Fade-in Animation

The logo and text may appear with a subtle fade-in animation.

| Property       |           Value |
| -------------- | --------------: |
| Animation Type |         Fade-in |
| Duration       |   `0.4s – 0.5s` |
| Easing         |      `ease-out` |
| Delay          | Minimal or none |

CSS reference:

```css
@keyframes splashFadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.splash-content {
  animation: splashFadeIn 0.5s ease-out;
}
```

The animation should be subtle.
It should not delay the user from entering the app.

---

## 10. Responsive Behavior

This screen is designed primarily for mobile.

### 10.1 Mobile First

| Device Type     | Behavior                                           |
| --------------- | -------------------------------------------------- |
| Small Mobile    | Keep all elements centered                         |
| Standard Mobile | Use default sizes                                  |
| Large Mobile    | Keep fixed logo size and centered layout           |
| Tablet          | Keep centered composition, avoid scaling too large |

The logo box should remain `104px × 104px` on most mobile devices.

If the screen height is very small, reduce vertical spacing slightly, but do not reduce the logo below `88px`.

---

## 11. Accessibility

### 11.1 Contrast

White text on Royal Lilac should maintain strong contrast.

The subtitle uses 85% opacity, but it must remain readable on the primary background.

### 11.2 Text Legibility

Do not use extremely thin font weights.
The subtitle should remain at least `400` weight.

### 11.3 Motion Sensitivity

If the user has reduced motion enabled, the fade-in animation should be disabled.

```css
@media (prefers-reduced-motion: reduce) {
  .splash-content {
    animation: none;
  }
}
```

---

## 12. Do

* Use `#83539D` as the full-screen background color.
* Use a white rounded-square logo box.
* Keep all elements centered vertically and horizontally.
* Use only the essential three visible elements: logo, title, subtitle.
* Use Pretendard consistently.
* Maintain generous whitespace.
* Use the subtitle opacity to create visual hierarchy.
* Apply shadow only to the logo box.
* Use a simple single-color logo icon.
* Keep the splash screen visible only briefly before navigating to the main app.

---

## 13. Don’t

* Do not add buttons.
* Do not add bottom navigation.
* Do not add tabs.
* Do not add onboarding text.
* Do not use background gradients.
* Do not use extra decorative images.
* Do not use multiple brand colors inside the logo icon.
* Do not apply shadows to the text.
* Do not make the subtitle visually stronger than the app title.
* Do not overcrowd the screen.
* Do not use a square logo box with sharp corners.
* Do not use a circular logo box unless the brand system changes.

---

## 14. Final Visual Summary

```txt
Full Screen Background
Color: #83539D

Center Column
 ├─ Logo Icon Box
 │   ├─ Size: 104px × 104px
 │   ├─ Background: #FFFFFF
 │   ├─ Radius: 30px
 │   ├─ Shadow: 0 8px 24px rgba(0,0,0,0.1)
 │   └─ Icon: Royal Lilac #83539D
 │
 ├─ App Title
 │   ├─ Text: 짬짬이
 │   ├─ Size: 42px
 │   ├─ Weight: 700
 │   ├─ Letter Spacing: -1.0px
 │   └─ Color: #FFFFFF
 │
 └─ App Subtitle
     ├─ Text: 오늘 찍은 문장, 내일 바로 복습
     ├─ Size: 18px
     ├─ Weight: 400
     ├─ Letter Spacing: -0.2px
     └─ Color: rgba(255,255,255,0.85)
```

---

## 15. Implementation Reference

```css
.splash-screen {
  width: 100%;
  min-height: 100vh;
  background-color: #83539D;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard", sans-serif;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: splashFadeIn 0.5s ease-out;
}

.logo-icon-box {
  width: 104px;
  height: 104px;
  background-color: #FFFFFF;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.logo-icon {
  color: #83539D;
}

.app-title {
  font-family: "Pretendard", sans-serif;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1.0px;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 12px;
}

.app-subtitle {
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.2px;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
}

@keyframes splashFadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .splash-content {
    animation: none;
  }
}
```
