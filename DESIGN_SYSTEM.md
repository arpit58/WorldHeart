# 🎨 Heart Disease Prediction System - Design System
## Modern Premium Health-Tech UI

---

## 📐 Design Principles

### Core Values
- **Clean & Minimal**: Generous whitespace, clear hierarchy
- **Modern & Professional**: SaaS-grade quality
- **Accessible**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first approach
- **Performant**: Smooth animations, optimized assets

---

## 🎨 Color Palette

### Primary Colors
```css
/* Gradient Primary */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--color-primary: #667eea;
--color-primary-dark: #764ba2;

/* Accent Colors */
--color-accent-blue: #3b82f6;
--color-accent-purple: #8b5cf6;
--color-accent-pink: #ec4899;
```

### Neutral Colors
```css
/* Grays */
--color-gray-50: #f8fafc;
--color-gray-100: #f1f5f9;
--color-gray-200: #e2e8f0;
--color-gray-300: #cbd5e1;
--color-gray-400: #94a3b8;
--color-gray-500: #64748b;
--color-gray-600: #475569;
--color-gray-700: #334155;
--color-gray-800: #1e293b;
--color-gray-900: #0f172a;
```

### Semantic Colors
```css
/* Success (Low Risk) */
--color-success-bg: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
--color-success-text: #065f46;
--color-success-accent: #059669;

/* Warning (Medium Risk) */
--color-warning-bg: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
--color-warning-text: #92400e;
--color-warning-accent: #d97706;

/* Danger (High Risk) */
--color-danger-bg: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
--color-danger-text: #991b1b;
--color-danger-accent: #dc2626;
```

---

## 📝 Typography

### Font Family
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes & Weights
```css
/* Headings */
--text-hero: 42px / 800 / -1.5px letter-spacing
--text-h1: 36px / 800 / -1px letter-spacing
--text-h2: 28px / 700 / -0.5px letter-spacing
--text-h3: 24px / 700 / -0.5px letter-spacing
--text-h4: 20px / 700 / -0.3px letter-spacing

/* Body Text */
--text-large: 18px / 400 / -0.3px letter-spacing
--text-base: 16px / 400 / normal
--text-medium: 15px / 500 / -0.2px letter-spacing
--text-small: 14px / 500 / -0.2px letter-spacing
--text-xs: 13px / 500 / normal
```

---

## 📦 Spacing System

### 8px Grid System
```css
--space-1: 8px;   /* 0.5rem */
--space-2: 16px;  /* 1rem */
--space-3: 24px;  /* 1.5rem */
--space-4: 32px;  /* 2rem */
--space-5: 40px;  /* 2.5rem */
--space-6: 48px;  /* 3rem */
--space-8: 64px;  /* 4rem */
```

### Component Spacing
- **Card padding**: 32-40px
- **Form field gap**: 24px
- **Section margin**: 32-40px
- **Grid gap**: 20-24px

---

## 🔲 Border Radius

```css
--radius-sm: 12px;    /* Small elements */
--radius-md: 14px;    /* Inputs, buttons */
--radius-lg: 16px;    /* Cards, sections */
--radius-xl: 20px;    /* Large cards */
--radius-2xl: 24px;   /* Hero sections */
--radius-full: 9999px; /* Pills, avatars */
```

---

## ✨ Shadows & Elevation

### Shadow Levels
```css
/* Light shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);

/* Medium shadows */
--shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.12);

/* Colored shadows */
--shadow-primary: 0 12px 32px rgba(102, 126, 234, 0.35);
--shadow-success: 0 8px 24px rgba(5, 150, 105, 0.3);
--shadow-danger: 0 8px 24px rgba(220, 38, 38, 0.3);
```

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px) saturate(180%);
box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
```

---

## 🎭 Components Library

### 1. Navbar
**Specs:**
- Height: 72px (with padding)
- Background: Glassmorphic with blur(20px)
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Sticky positioning
- Z-index: 100

**Elements:**
- Logo + Brand name (gradient text)
- User profile (circular avatar, 36px)
- Buttons (rounded-12px, glassmorphic)

---

### 2. Hero Card
**Specs:**
- Border-radius: 24px
- Padding: 48px 40px
- Background: Glassmorphic white (0.95 opacity)
- Top border: 4px gradient accent
- Text-align: center

**Elements:**
- Badge: Pill-shaped, gradient background
- Title: 36-42px, gradient text
- Subtitle: 16-18px, gray-500

---

### 3. Form Inputs

#### Text Input
```css
padding: 14px 18px;
border-radius: 14px;
border: 2px solid #e2e8f0;
background: #f8fafc;
font-size: 15px;
font-weight: 500;

/* Focus State */
border-color: #667eea;
box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
transform: translateY(-2px);
```

#### Select Dropdown
- Same as text input
- Custom arrow icon (SVG)
- Padding-right: 48px

#### Labels
```css
font-size: 14px;
font-weight: 600;
color: #1e293b;
display: flex with icon (16px)
gap: 8px;
```

---

### 4. iOS Toggle Switch

**Dimensions:**
- Width: 56px
- Height: 32px
- Toggle circle: 26px

**Colors:**
- Off: #cbd5e1
- On: Gradient primary
- White circle with shadow

**Animation:**
- Transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
- Smooth slide effect

---

### 5. Primary Button

```css
width: 100%;
padding: 18px 32px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
border-radius: 16px;
font-size: 17px;
font-weight: 700;
color: white;
box-shadow: 0 12px 32px rgba(102, 126, 234, 0.35);

/* Hover */
transform: translateY(-3px);
box-shadow: 
    0 16px 48px rgba(102, 126, 234, 0.45),
    0 0 0 6px rgba(102, 126, 234, 0.15);
```

**Features:**
- Icon + text layout
- Shine effect on hover
- Loading state with spinner
- Disabled state (opacity: 0.6)

---

### 6. Data Cards (Patient/Staff)

**Structure:**
```css
border-radius: 16px;
padding: 24px;
background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
border: 1px solid #e2e8f0;

/* Hover */
transform: translateY(-4px);
border-color: #667eea;
box-shadow: 0 12px 40px rgba(102, 126, 234, 0.15);
```

**Elements:**
- Header row: Name + Badge
- Metadata: Age, department
- Risk indicator: Colored background + dot
- Left accent bar (4px gradient)

---

### 7. Risk Indicators

#### Low Risk
```css
background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
color: #065f46;
dot-color: #059669 (with glow);
```

#### Medium Risk
```css
background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
color: #92400e;
dot-color: #d97706 (with glow);
```

#### High Risk
```css
background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
color: #991b1b;
dot-color: #dc2626 (with glow);
```

---

### 8. Search & Filter Bar

**Search Box:**
```css
background: #f1f5f9;
border: 1px solid #e2e8f0;
border-radius: 12px;
padding: 10px 16px;
width: 200px;

/* Focus */
background: white;
border-color: #667eea;
box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
```

**Filter Dropdown:**
- Same styling as search box
- Custom select styling
- Hover/focus states

---

### 9. Chart Cards

```css
background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
border: 2px solid #e2e8f0;
border-radius: 20px;
padding: 24px;

/* Hover */
transform: translateY(-4px);
border-color: #667eea;
```

**Chart Container:**
- Height: 300px (desktop), 250px (mobile)
- Responsive canvas sizing
- Chart.js styling

---

## 🎬 Animations

### Timing Functions
```css
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Common Animations

#### Fade In Up
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

#### Float
```css
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
```

#### Shine Effect
```css
@keyframes shine {
    to {
        left: 100%;
    }
}
```

#### Spin (Loading)
```css
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 480px;   /* Small phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops */
--breakpoint-xl: 1400px;  /* Large desktops */
```

### Responsive Grid
```css
/* Desktop: 2 columns */
grid-template-columns: repeat(2, 1fr);
gap: 24px;

/* Tablet: 1-2 columns adaptive */
@media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
}
```

---

## ♿ Accessibility

### Focus States
- All interactive elements have visible focus rings
- Focus ring: `0 0 0 4px rgba(102, 126, 234, 0.1)`
- Keyboard navigation support

### Color Contrast
- Text on white: WCAG AA compliant
- Risk indicators: High contrast ratios
- Icon + text labels for clarity

### Screen Reader Support
- Semantic HTML5 elements
- ARIA labels where needed
- Skip navigation links

---

## 🚀 Performance Optimizations

### CSS
- Use `will-change` sparingly
- Hardware-accelerated animations (transform, opacity)
- Efficient selectors

### Images
- SVG icons (inline, optimized)
- Lazy loading for charts
- No external image assets

### Fonts
- Preconnect to Google Fonts
- Font-display: swap
- Subset Inter font

---

## 📋 Component Checklist

### Dashboard Page ✅
- [x] Glassmorphic navbar
- [x] Hero section with gradient
- [x] Action cards with hover effects
- [x] Search and filter bar
- [x] Patient/staff data cards
- [x] Risk indicators with colors
- [x] Responsive grid layout
- [x] Staggered animations

### Prediction Form ✅
- [x] Modern 2-column grid
- [x] Icon-labeled inputs
- [x] iOS-style toggle switch
- [x] Gradient submit button
- [x] Loading states
- [x] Error handling
- [x] Voice announcement toggle
- [x] Chart visualization
- [x] Fully responsive

---

## 🎨 Usage Examples

### Creating a Card
```html
<div class="modern-patient-card">
    <div class="card-header-row">
        <div>
            <h3 class="patient-name">John Doe</h3>
            <p class="patient-age">Age: 45 years</p>
        </div>
        <div class="patient-badge">Patient</div>
    </div>
    <div class="risk-indicator risk-low">
        <div class="risk-dot"></div>
        <span>Low Risk</span>
    </div>
</div>
```

### Creating a Button
```html
<button class="modern-submit-btn">
    <svg><!-- icon --></svg>
    Button Text
    <div class="button-shine"></div>
</button>
```

### Creating an Input
```html
<div class="modern-input-group">
    <label class="modern-label">
        <svg><!-- icon --></svg>
        Label Text
    </label>
    <input type="text" class="modern-input" placeholder="Placeholder">
</div>
```

---

## 📚 Resources

- **Font**: [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)
- **Icons**: Inline SVG (Heroicons style)
- **Charts**: Chart.js v4.4.0
- **Colors**: Tailwind CSS inspired palette

---

## 🔄 Version History

- **v1.0** - Initial design system
- Modern glassmorphism aesthetic
- Complete component library
- Fully responsive layouts
- Dark mode support

---

**Design by:** Heart Disease Prediction System Team  
**Last Updated:** November 28, 2025  
**Status:** ✅ Production Ready
