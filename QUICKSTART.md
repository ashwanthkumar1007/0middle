# 🚀 Quick Start Guide

## 0Middle - E-commerce Platform

### Step 1: Install Dependencies

```bash
npm install
```

This will install:

- Angular 18
- TypeScript
- RxJS
- And all necessary dependencies

### Step 2: Run the Development Server

```bash
npm start
```

The application will be available at: **http://localhost:4200/**

### Step 3: Explore the Application

1. **Landing Page** (`/`)

   - View the home page with role selection
   - Two cards: Farmer/Seller and Consumer/Buyer
   - Click either card to navigate

2. **Seller Portal** (`/seller`)

   - Placeholder page for farmers
   - Back button to return home

3. **Consumer Portal** (`/consumer`)
   - Placeholder page for consumers
   - Back button to return home

## 📱 Test Responsive Design

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1200px

## ♿ Test Accessibility

1. **Keyboard Navigation:**

   - Press `Tab` to navigate between cards
   - Press `Enter` or `Space` to activate

2. **Screen Reader:**
   - Enable screen reader
   - Navigate through the page
   - Verify ARIA labels are announced

## 🎨 Design Features

### Home Page Includes:

- ✅ Green brand background
- ✅ Circular logo with "O"
- ✅ App name and tagline
- ✅ Two clickable role cards
- ✅ Footer with brand message
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Keyboard accessible
- ✅ Touch-friendly

## 📁 Project Structure

```
src/
├── app/
│   ├── pages/home/           ← Landing page ✅
│   ├── pages/seller/         ← Seller portal (placeholder)
│   ├── pages/consumer/       ← Consumer portal (placeholder)
│   └── shared/components/    ← Reusable components
├── styles/                   ← Design system (SCSS)
└── assets/                   ← Static files
```

## 🔧 Available Commands

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests (when implemented)
npm test

# Build with SSR
npm run build:ssr

# Serve SSR build
npm run serve:ssr
```

## 🎯 What's Next?

After the landing page, we can build:

1. **Seller Portal Pages:**

   - Product listing form
   - Inventory management
   - Price setting

2. **Consumer Portal Pages:**

   - Product catalog
   - Shopping cart
   - Order history

3. **Shared Features:**
   - Product card components
   - Search functionality
   - Filters

## 📚 Documentation

- **DEVELOPMENT.md** - Comprehensive development guide
- **README.md** - Project overview
- Component documentation in each `.ts` file

## 🆘 Troubleshooting

### Port already in use?

```bash
# Use a different port
ng serve --port 4300
```

### Dependencies not installing?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors?

```bash
# Check TypeScript version
npm list typescript

# Should be ~5.4.0
```

## ✅ Checklist

Before moving to next steps:

- [ ] npm install completed
- [ ] Development server runs
- [ ] Home page displays correctly
- [ ] Navigation works (click cards)
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] No console errors

---

**Ready to build the next feature!** 🎉

See **DEVELOPMENT.md** for detailed documentation.
