# O Middle - Development Guide

## Project Overview

O Middle is a production-ready Angular e-commerce application connecting farmers directly to consumers. The application eliminates middlemen to ensure fair prices for both parties.

## Architecture

### Component Structure

```
src/app/
├── pages/
│   ├── home/              # Landing page with role selection
│   ├── seller/            # Farmer/Seller portal (placeholder)
│   └── consumer/          # Consumer/Buyer portal (placeholder)
├── shared/
│   └── components/
│       └── role-selection-card/  # Reusable card component
├── app.component.ts       # Root component
├── app.config.ts          # Application configuration
└── app.routes.ts          # Route definitions
```

### Styling Architecture

```
src/styles/
├── _variables.scss        # Design tokens (colors, spacing, typography)
├── _mixins.scss          # Reusable SCSS mixins
└── styles.scss           # Global styles and reset
```

## Features

### ✅ Completed - Home/Landing Page

1. **Full-screen Layout**

   - Vertically and horizontally centered content
   - Green brand background
   - Responsive design (mobile-first)

2. **Branding Section**

   - Circular logo with "O" letter
   - App name: "O Middle"
   - Tagline: "Connecting farmers directly to consumers"

3. **Role Selection Cards**

   - Two clickable cards:
     - Farmer/Seller (green theme, 🌾 icon)
     - Consumer/Buyer (blue theme, 🛒 icon)
   - Each card navigates to respective portal

4. **Footer**
   - Tagline: "fair prices, zero middlemen"

### Component: RoleSelectionCardComponent

**Location:** `src/app/shared/components/role-selection-card/`

**Inputs:**

- `title: string` - Card title
- `subtitle: string` - Card description
- `icon: string` - Emoji or icon
- `themeColor: 'green' | 'blue'` - Color scheme
- `route: string` - Navigation route

**Features:**

- Fully accessible (keyboard navigation)
- Hover and focus states
- Touch-friendly spacing (44x44px minimum)
- Smooth animations and transitions

**Usage:**

```html
<app-role-selection-card
  title="Farmer / Seller"
  subtitle="I want to sell my staples"
  icon="🌾"
  themeColor="green"
  route="/seller"
>
</app-role-selection-card>
```

## Design System

### Colors

**Brand Colors:**

- Primary Green: `#2d5016`
- Primary Blue: `#1976d2`
- White: `#ffffff`

**Text Colors:**

- Primary (on green): `rgba(255, 255, 255, 1)`
- Secondary (on green): `rgba(255, 255, 255, 0.7)`
- Dark text: `#212121`
- Medium text: `#757575`

### Typography

**Font Family:** Inter (with system fallbacks)

**Font Sizes:**

- Extra Small: 12px
- Small: 14px
- Base: 16px
- Large: 18px
- XL: 20px
- 2XL: 24px
- 3XL: 32px
- 4XL: 40px

### Spacing Scale (8px base)

- XS: 8px
- SM: 16px
- MD: 24px
- LG: 32px
- XL: 48px
- 2XL: 64px

### Border Radius

- Small: 8px
- Medium: 16px
- Large: 24px
- Circle: 50%

### Shadows

- Small: Subtle elevation
- Medium: Card elevation
- Large: Logo and modals
- Hover: Elevated card state

## Accessibility

### Implemented Features

1. **Keyboard Navigation**

   - All interactive elements are keyboard accessible
   - Tab order follows logical flow
   - Enter and Space keys trigger card navigation

2. **Focus States**

   - Visible focus indicators (3px white outline)
   - `:focus-visible` for keyboard-only focus

3. **ARIA Attributes**

   - Proper `role` attributes
   - `aria-label` for screen readers
   - Semantic HTML structure

4. **Touch Targets**

   - Minimum 44x44px touch target size
   - Adequate spacing between interactive elements

5. **Color Contrast**
   - WCAG AA compliant color combinations
   - Text readable on all backgrounds

## Responsive Design

### Breakpoints

- XS: 0px (mobile-first)
- SM: 576px
- MD: 768px (tablet)
- LG: 992px
- XL: 1200px (desktop)

### Mobile-First Approach

All styles are written for mobile first, with `@include respond-to()` mixin for larger screens:

```scss
.element {
  font-size: 16px; // Mobile

  @include respond-to("md") {
    font-size: 18px; // Tablet and up
  }
}
```

## Routing

### Routes

| Path        | Component         | Description                      |
| ----------- | ----------------- | -------------------------------- |
| `/`         | HomeComponent     | Landing page with role selection |
| `/seller`   | SellerComponent   | Farmer/Seller portal             |
| `/consumer` | ConsumerComponent | Consumer/Buyer portal            |
| `/**`       | Redirect          | Redirects to home                |

### Lazy Loading

All page components use lazy loading for optimal performance:

```typescript
{
  path: '',
  loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
}
```

## Development

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 18+

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start dev server
npm start

# Navigate to http://localhost:4200/
```

### Build

```bash
# Production build
npm run build

# Output in dist/omiddle/
```

## Best Practices Implemented

### 1. **Standalone Components**

All components use the standalone API (Angular 18+):

```typescript
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink]
})
```

### 2. **Type Safety**

- Strict TypeScript configuration
- Interface definitions for all data structures
- No implicit `any` types

### 3. **Clean Code**

- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Meaningful variable and function names
- Comprehensive comments

### 4. **Performance**

- Lazy-loaded routes
- OnPush change detection (when applicable)
- Minimal dependencies
- Optimized assets

### 5. **Maintainability**

- Modular structure
- Centralized design tokens
- Reusable components
- Clear folder organization

### 6. **Scalability**

- Feature-based folder structure
- Shared components library
- Design system with variables and mixins
- Easy to extend with new features

## SSR/SSG Compatibility

### Current Status

The application is SSR/SSG compatible with these considerations:

1. **No Browser-Only APIs**

   - No direct `window` or `document` references
   - Router navigation instead of `window.location`

2. **Platform Checks** (when needed)

   ```typescript
   import { isPlatformBrowser } from "@angular/common";
   import { PLATFORM_ID, inject } from "@angular/core";

   platformId = inject(PLATFORM_ID);
   if (isPlatformBrowser(this.platformId)) {
     // Browser-specific code
   }
   ```

## Static Application Features

Since this is initially a static application:

### Local Storage (Future)

For cart and product management:

```typescript
// Example structure for future implementation
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Store in localStorage
localStorage.setItem("cart", JSON.stringify(cartItems));
```

### Session Storage (Future)

For temporary user data:

```typescript
// Example for current session data
sessionStorage.setItem("userRole", "seller");
```

## Next Steps

### Immediate Next Steps:

1. ✅ Home/Landing Page (COMPLETED)
2. Seller Portal Pages
3. Consumer Portal Pages
4. Product Listing Components
5. Cart Functionality (localStorage)

### Future Enhancements:

- Authentication system
- Backend integration
- Real-time updates
- Payment processing
- Order tracking
- User profiles

## File Structure

```
omiddle/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.scss
│   │   │   ├── seller/
│   │   │   │   ├── seller.component.ts
│   │   │   │   ├── seller.component.html
│   │   │   │   └── seller.component.scss
│   │   │   └── consumer/
│   │   │       ├── consumer.component.ts
│   │   │       ├── consumer.component.html
│   │   │       └── consumer.component.scss
│   │   ├── shared/
│   │   │   └── components/
│   │   │       └── role-selection-card/
│   │   │           ├── role-selection-card.component.ts
│   │   │           ├── role-selection-card.component.html
│   │   │           └── role-selection-card.component.scss
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── styles.scss (imported automatically)
│   ├── index.html
│   ├── main.ts
│   └── favicon.ico
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── README.md
└── DEVELOPMENT.md (this file)
```

## Code Quality Standards

### Component Template (HTML)

- Semantic HTML
- Proper heading hierarchy
- ARIA attributes for accessibility
- BEM naming convention for CSS classes

### Component Logic (TypeScript)

- TypeScript strict mode
- Interface definitions
- JSDoc comments for public methods
- Readonly for constants
- Proper access modifiers

### Component Styles (SCSS)

- BEM methodology
- Mobile-first responsive design
- Use design tokens from `_variables.scss`
- Use mixins from `_mixins.scss`
- No inline styles
- No `!important` (unless absolutely necessary)

## Testing Strategy (Future)

### Unit Tests

- Component logic
- Service methods
- Utility functions

### E2E Tests

- User flows
- Navigation
- Accessibility

### Performance Tests

- Bundle size
- Load times
- Lighthouse scores

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private/Proprietary

---

**Last Updated:** January 8, 2026  
**Version:** 1.0.0  
**Status:** Home Page Complete ✅
