# Project Structure

```
omiddle/
│
├── 📄 Configuration Files
│   ├── angular.json                  # Angular CLI configuration
│   ├── package.json                  # Dependencies and scripts
│   ├── tsconfig.json                 # TypeScript base config
│   ├── tsconfig.app.json            # App-specific TS config
│   ├── tsconfig.spec.json           # Test-specific TS config
│   └── .gitignore                   # Git ignore rules
│
├── 📚 Documentation
│   ├── README.md                     # Project overview
│   ├── DEVELOPMENT.md               # Comprehensive dev guide
│   ├── QUICKSTART.md                # Quick setup instructions
│   └── PROJECT_STRUCTURE.md         # This file
│
├── 🎨 Source Code (src/)
│   │
│   ├── 📱 Application (app/)
│   │   │
│   │   ├── 📄 Core Files
│   │   │   ├── app.component.ts            # Root component
│   │   │   ├── app.config.ts               # App configuration
│   │   │   └── app.routes.ts               # Route definitions
│   │   │
│   │   ├── 📄 Pages (pages/)
│   │   │   │
│   │   │   ├── 🏠 Home Page (home/)        ✅ COMPLETE
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.scss
│   │   │   │
│   │   │   ├── 🌾 Seller Portal (seller/)  📦 PLACEHOLDER
│   │   │   │   ├── seller.component.ts
│   │   │   │   ├── seller.component.html
│   │   │   │   └── seller.component.scss
│   │   │   │
│   │   │   └── 🛒 Consumer Portal (consumer/) 📦 PLACEHOLDER
│   │   │       ├── consumer.component.ts
│   │   │       ├── consumer.component.html
│   │   │       └── consumer.component.scss
│   │   │
│   │   └── 🔧 Shared (shared/)
│   │       └── components/
│   │           └── role-selection-card/     ✅ COMPLETE
│   │               ├── role-selection-card.component.ts
│   │               ├── role-selection-card.component.html
│   │               └── role-selection-card.component.scss
│   │
│   ├── 🎨 Styles (styles/)
│   │   ├── _variables.scss           # Design tokens
│   │   ├── _mixins.scss             # SCSS utilities
│   │   └── (imported via styles.scss)
│   │
│   ├── 🖼️ Assets (assets/)
│   │   └── .gitkeep                 # Placeholder
│   │
│   ├── 📄 Entry Files
│   │   ├── main.ts                  # Application bootstrap
│   │   ├── index.html              # HTML entry point
│   │   ├── styles.scss             # Global styles
│   │   └── favicon.ico             # Site icon
│   │
│   └── 📦 Build Output (excluded from git)
│       └── dist/                    # Production build
│
└── 🔧 IDE & Tools
    └── .vscode/                     # VS Code settings
        ├── tasks.json
        ├── launch.json
        └── extensions.json
```

## Component Breakdown

### ✅ Completed Components

#### 1. HomeComponent

**Location:** `src/app/pages/home/`  
**Purpose:** Landing page with role selection  
**Features:**

- Branding section (logo, name, tagline)
- Two role selection cards
- Footer with brand message
- Fully responsive
- Keyboard accessible

**Dependencies:**

- RoleSelectionCardComponent

---

#### 2. RoleSelectionCardComponent

**Location:** `src/app/shared/components/role-selection-card/`  
**Purpose:** Reusable clickable card for role selection  
**Features:**

- Configurable title, subtitle, icon, theme color, route
- Smooth hover/focus animations
- Keyboard navigation support
- Accessibility features

**Props:**

- `title: string`
- `subtitle: string`
- `icon: string`
- `themeColor: 'green' | 'blue'`
- `route: string`

---

### 📦 Placeholder Components

#### 3. SellerComponent

**Location:** `src/app/pages/seller/`  
**Purpose:** Farmer/Seller portal (future implementation)  
**Current State:** Basic layout with back navigation

---

#### 4. ConsumerComponent

**Location:** `src/app/pages/consumer/`  
**Purpose:** Consumer/Buyer portal (future implementation)  
**Current State:** Basic layout with back navigation

---

## Design System Files

### \_variables.scss

**Location:** `src/styles/_variables.scss`

Contains:

- Brand colors (green, blue, white)
- Text colors (primary, secondary, dark, medium)
- Spacing scale (8px base)
- Border radius values
- Shadow definitions
- Typography scale
- Font weights
- Breakpoints
- Z-index scale
- Component-specific constants

---

### \_mixins.scss

**Location:** `src/styles/_mixins.scss`

Contains:

- `@mixin respond-to($breakpoint)` - Responsive helpers
- `@mixin flex-center` - Flexbox centering
- `@mixin card` - Card styling
- `@mixin hover-lift` - Hover effects
- `@mixin focus-visible` - Focus states
- `@mixin touch-target` - Accessibility sizing
- `@mixin truncate` - Text truncation
- `@mixin sr-only` - Screen reader only content

---

### styles.scss

**Location:** `src/styles.scss`

Contains:

- CSS reset
- Base HTML/body styles
- Global typography
- Link styles
- Button reset
- Focus management
- Utility classes
- Scrollbar styling

---

## Routing Structure

```
/                  → HomeComponent (Landing page)
/seller           → SellerComponent (Farmer portal)
/consumer         → ConsumerComponent (Buyer portal)
/**               → Redirect to /
```

All routes use **lazy loading** for optimal performance.

---

## Build Configuration

### angular.json

- **Project Type:** Application
- **Style Preprocessor:** SCSS
- **Build Target:** ES2022
- **Output Path:** `dist/omiddle/`
- **Assets:** `src/assets/`, `src/favicon.ico`
- **Styles:** `src/styles.scss` (global)

### TypeScript Configuration

- **Strict Mode:** Enabled
- **Target:** ES2022
- **Module:** ES2022
- **Experimental Decorators:** Enabled

---

## File Naming Conventions

### Components

```
component-name/
├── component-name.component.ts      # Logic
├── component-name.component.html    # Template
└── component-name.component.scss    # Styles
```

### Naming Rules

- **Files:** kebab-case (e.g., `role-selection-card.component.ts`)
- **Classes:** PascalCase (e.g., `RoleSelectionCardComponent`)
- **Variables:** camelCase (e.g., `themeColor`)
- **Constants:** UPPER_SNAKE_CASE or camelCase with readonly
- **SCSS Classes:** BEM methodology (e.g., `.role-card__title`)

---

## Import Structure

### TypeScript Imports (Order)

1. Angular core imports
2. Angular common imports
3. Third-party library imports
4. Local component imports
5. Local service imports
6. Local interface/type imports

### SCSS Imports (Order)

1. Variables
2. Mixins
3. Component-specific styles

Example:

```scss
@import '../../../styles/variables';
@import '../../../styles/mixins';

.component { ... }
```

---

## Development Workflow

1. **Create Component:**

   ```
   pages/new-page/
   ├── new-page.component.ts
   ├── new-page.component.html
   └── new-page.component.scss
   ```

2. **Add Route:**
   Update `app.routes.ts`

3. **Import Styles:**
   Add variables and mixins

4. **Follow Conventions:**
   - BEM for CSS classes
   - TypeScript strict mode
   - Accessibility first
   - Mobile-first responsive

---

## Static Assets

### Current Assets

- `favicon.ico` - Site icon (SVG placeholder)
- `assets/` - Empty (ready for images, icons, fonts)

### Future Assets

- Product images
- User avatars
- Icons/illustrations
- Custom fonts (if needed)

---

## Environment Files (Future)

When needed, add:

```
src/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
```

---

## State Management (Future)

When the app grows, consider:

- NgRx for global state
- Services for shared data
- Local storage for persistence
- Session storage for temporary data

---

## Testing Structure (Future)

```
src/
├── app/
│   ├── pages/
│   │   └── home/
│   │       ├── home.component.ts
│   │       └── home.component.spec.ts    # Unit tests
│   └── shared/
│       └── components/
│           └── role-selection-card/
│               └── role-selection-card.component.spec.ts
└── e2e/                                   # E2E tests
    └── src/
        └── app.e2e-spec.ts
```

---

## Key Principles

✅ **Standalone Components** - Modern Angular approach  
✅ **Lazy Loading** - Performance optimization  
✅ **Mobile-First** - Responsive design  
✅ **Accessibility** - WCAG AA compliance  
✅ **Type Safety** - Strict TypeScript  
✅ **Scalability** - Feature-based structure  
✅ **Maintainability** - Clean, documented code  
✅ **Reusability** - Shared components library

---

**Version:** 1.0.0  
**Last Updated:** January 8, 2026  
**Status:** Home Page Complete ✅
