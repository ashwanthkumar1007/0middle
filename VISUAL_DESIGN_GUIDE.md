# 📱 Visual Design Guide

## Home Page Layout

```
┌─────────────────────────────────────────┐
│                                         │
│              Brand Green                │
│            Background                   │
│                                         │
│         ┌─────────────┐                │
│         │             │                 │
│         │   ┌─────┐   │                │
│         │   │  O  │   │  White Circle  │
│         │   └─────┘   │  Green "O"     │
│         │             │                 │
│         └─────────────┘                │
│                                         │
│           0Middle                      │
│        (white, bold)                    │
│                                         │
│  Connecting farmers directly            │
│       to consumers                      │
│   (white, semi-transparent)             │
│                                         │
│ ┌─────────────────────────────────────┐│
│ │  ┌────┐                             ││
│ │  │ 🌾 │  Farmer / Seller            ││
│ │  └────┘                             ││
│ │         I want to sell my staples   ││
│ │                                     ││
│ └─────────────────────────────────────┘│
│                                         │
│ ┌─────────────────────────────────────┐│
│ │  ┌────┐                             ││
│ │  │ 🛒 │  Consumer / Buyer           ││
│ │  └────┘                             ││
│ │         I want to buy staples       ││
│ │                                     ││
│ └─────────────────────────────────────┘│
│                                         │
│    fair prices, zer0Middlemen         │
│      (white, low emphasis)              │
│                                         │
└─────────────────────────────────────────┘
```

## Component Breakdown

### 1. Logo Section

```
┌─────────────┐
│             │
│   ┌─────┐   │  Size: 80px (mobile), 100px (desktop)
│   │  O  │   │  Background: White (#ffffff)
│   └─────┘   │  Text: Green (#2d5016)
│             │  Font: Bold, 40px (mobile), 56px (desktop)
└─────────────┘  Shape: Circle (border-radius: 50%)
                 Shadow: Large elevation
```

### 2. App Name

```
0Middle

Font: Inter, Bold (700)
Size: 32px (mobile), 40px (desktop)
Color: White (#ffffff)
Margin: 24px below logo
```

### 3. Tagline

```
Connecting farmers directly to consumers

Font: Inter, Regular (400)
Size: 16px (mobile), 18px (desktop)
Color: rgba(255, 255, 255, 0.7)
Margin: 8px below app name
```

### 4. Role Selection Cards

#### Card Structure

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌────────┐                            │
│  │        │  Icon Container             │
│  │   🌾   │  64px (mobile), 80px (desktop)
│  │        │  Green background           │
│  └────────┘  Rounded corners (8px)      │
│                                         │
│  Farmer / Seller                        │
│  (20px, bold, dark text)                │
│                                         │
│  I want to sell my staples              │
│  (16px, regular, gray text)             │
│                                         │
└─────────────────────────────────────────┘

Width: 100%, max 400px
Padding: 32px (mobile), 48px (desktop)
Background: White (#ffffff)
Border Radius: 16px
Shadow: Medium elevation
Hover: Lifts up 4px with larger shadow
```

#### Card Themes

**Farmer Card:**

- Icon: 🌾 (wheat emoji)
- Icon Background: #2d5016 (brand green)
- Hover Effect: Lift + shadow

**Consumer Card:**

- Icon: 🛒 (shopping cart emoji)
- Icon Background: #1976d2 (brand blue)
- Hover Effect: Lift + shadow

### 5. Footer

```
fair prices, zer0Middlemen

Font: Inter, Regular (400)
Size: 14px (mobile), 16px (desktop)
Color: rgba(255, 255, 255, 0.7)
Position: Bottom of page
Alignment: Center
```

## Color Palette

```
┌─────────────┐
│   #2d5016   │  Brand Green (Primary)
└─────────────┘  Background, Farmer icon container

┌─────────────┐
│   #1976d2   │  Brand Blue (Secondary)
└─────────────┘  Consumer icon container

┌─────────────┐
│   #ffffff   │  White
└─────────────┘  Logo circle, cards, text

┌─────────────┐
│   #212121   │  Gray 900 (Dark Text)
└─────────────┘  Card titles

┌─────────────┐
│   #757575   │  Gray 600 (Medium Text)
└─────────────┘  Card subtitles
```

## Responsive Breakpoints

### Mobile (< 576px)

- Logo: 80px
- App Name: 32px
- Tagline: 16px
- Card Padding: 32px
- Icon Container: 64px
- Icon Size: 48px
- Gap between cards: 24px

### Tablet (576px - 991px)

- Logo: 90px
- App Name: 36px
- Tagline: 17px
- Card Padding: 40px
- Icon Container: 72px
- Icon Size: 56px
- Gap between cards: 28px

### Desktop (992px+)

- Logo: 100px
- App Name: 40px
- Tagline: 18px
- Card Padding: 48px
- Icon Container: 80px
- Icon Size: 64px
- Gap between cards: 32px

## Spacing System

```
8px base unit

┌────┐ 8px  - XS (xs)
┌────────────────┐ 16px - SM (sm)
┌────────────────────────┐ 24px - MD (md)
┌────────────────────────────────┐ 32px - LG (lg)
┌────────────────────────────────────────────────┐ 48px - XL (xl)
┌────────────────────────────────────────────────────────────────┐ 64px - 2XL (2xl)
```

## Shadows

### Small (Cards at rest)

```
box-shadow:
  0 1px 3px rgba(0, 0, 0, 0.12),
  0 1px 2px rgba(0, 0, 0, 0.24);
```

### Medium (Default card state)

```
box-shadow:
  0 3px 6px rgba(0, 0, 0, 0.15),
  0 2px 4px rgba(0, 0, 0, 0.12);
```

### Large (Logo)

```
box-shadow:
  0 10px 20px rgba(0, 0, 0, 0.15),
  0 3px 6px rgba(0, 0, 0, 0.10);
```

### Hover (Card hover state)

```
box-shadow:
  0 14px 28px rgba(0, 0, 0, 0.25),
  0 10px 10px rgba(0, 0, 0, 0.22);
```

## Animations

### Hover Effects

```scss
// Card hover
transition: all 250ms ease-in-out;
transform: translateY(-4px);

// Icon container on card hover
transform: scale(1.1);
```

### Focus Effects

```scss
// Keyboard focus
outline: 3px solid rgba(255, 255, 255, 0.8);
outline-offset: 2px;
```

### Click Effects

```scss
// Active state
transform: translateY(-2px);
```

## Typography Scale

```
12px - Extra Small (helper text)
14px - Small (footer, captions)
16px - Base (body text, subtitles)
18px - Large (emphasized text)
20px - XL (card titles)
24px - 2XL (section headers)
32px - 3XL (app name mobile)
40px - 4XL (app name desktop)
```

## Accessibility Features

### Keyboard Navigation

```
Tab Order:
1. Farmer/Seller Card
2. Consumer/Buyer Card

Activation:
- Enter key
- Space key
```

### Focus Indicators

```
┌─────────────────────────────────────────┐
│ ╔═══════════════════════════════════╗ │
│ ║  ┌────┐                           ║ │
│ ║  │ 🌾 │  Farmer / Seller          ║ │
│ ║  └────┘                           ║ │
│ ║  I want to sell my staples        ║ │
│ ╚═══════════════════════════════════╝ │
└─────────────────────────────────────────┘
   ^
   3px white outline with 2px offset
```

### ARIA Labels

```html
<div
  role="button"
  aria-label="Farmer / Seller: I want to sell my staples"
  tabindex="0"
></div>
```

### Touch Targets

```
Minimum: 44px × 44px
Recommended: 48px × 48px
Current: Full card is clickable
```

## Layout Grid

### Mobile Layout

```
┌─────────────────────────┐
│ ← 16px padding →        │
│  ┌──────────────────┐   │
│  │   Content Area   │   │
│  │   Max: 600px     │   │
│  └──────────────────┘   │
│                    ← 16px
└─────────────────────────┘
```

### Desktop Layout

```
┌─────────────────────────────────────────┐
│           ← 32px padding →              │
│      ┌──────────────────────┐           │
│      │   Content Area       │           │
│      │   Max: 600px         │           │
│      │   Centered           │           │
│      └──────────────────────┘           │
│                            ← 32px       │
└─────────────────────────────────────────┘
```

## State Variations

### Default State

- Card: White background, medium shadow
- Icon: Static, centered
- Cursor: Pointer

### Hover State

- Card: Lifted 4px, large shadow
- Icon: Scaled 1.1x
- Cursor: Pointer

### Focus State (Keyboard)

- Card: 3px white outline
- Icon: Normal
- Cursor: Pointer

### Active State (Click/Tap)

- Card: Lifted 2px, medium shadow
- Icon: Normal
- Cursor: Pointer

### Disabled State (Future)

- Card: Gray background, no shadow
- Icon: Grayscale, opacity 0.5
- Cursor: Not-allowed

## Interaction Flow

```
User arrives at page
       ↓
Views branding and role options
       ↓
Hovers over Farmer card (visual feedback)
       ↓
Clicks Farmer card
       ↓
Navigates to /seller
       ↓
Views seller portal placeholder
       ↓
Clicks "Back to Home"
       ↓
Returns to landing page
```

## Error States (Future)

### Network Error

```
┌─────────────────────────────────────────┐
│                                         │
│         ⚠️  Connection Error            │
│                                         │
│    Unable to load. Please try again.    │
│                                         │
│         [Retry Button]                  │
│                                         │
└─────────────────────────────────────────┘
```

### Loading State (Future)

```
┌─────────────────────────────────────────┐
│                                         │
│              ⌛ Loading...              │
│                                         │
│         [Spinner Animation]             │
│                                         │
└─────────────────────────────────────────┘
```

## Print Styles (Future)

When printing:

- Remove background colors
- Black text on white
- Remove shadows
- Show only essential content

---

**Design Version:** 1.0.0  
**Last Updated:** January 8, 2026  
**Status:** Implemented ✅
