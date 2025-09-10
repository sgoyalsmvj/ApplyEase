# 🎨 ApplyEase Theme Guide

## Overview
ApplyEase uses a modern Gen Z-inspired design language with glass morphism, vibrant gradients, and immersive animations. This guide provides comprehensive instructions for maintaining visual consistency across the application.

---

## 🎯 Design Philosophy

### Core Principles
- **Gen Z Aesthetic**: Bold, vibrant, and modern design
- **Glass Morphism**: Frosted glass effects with backdrop blur
- **Immersive Animations**: Smooth micro-interactions and transitions
- **Dark Mode First**: Designed for both light and dark themes
- **Accessibility**: High contrast ratios and WCAG compliance

### Visual Identity
- **Primary Brand**: Purple to pink gradients
- **Secondary**: Blue to cyan gradients  
- **Accent**: Electric blue, cyber green, neon pink
- **Typography**: Inter (body), Space Grotesk (display)

---

## 🎨 Color System

### CSS Variables (globals.css)
```css
:root {
  /* Base Colors */
  --background: #ffffff;
  --foreground: #0a0a0a;
  --accent: #6366f1;
  --accent-secondary: #8b5cf6;
  --muted: #f8fafc;
  --border: #e2e8f0;

  /* Gen Z Color Palette */
  --electric-blue: #007cf0;
  --cyber-green: #00ff88;
  --neon-pink: #ff0080;
  --digital-purple: #7928ca;
  --sunset-orange: #ff6154;
  --mint-fresh: #50e3c2;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-tertiary: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --gradient-aurora: linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #da70d6, #ff0080);
}

[data-theme='dark'] {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --muted: #1e293b;
  --border: #334155;
  --accent: #818cf8;
  --accent-secondary: #a78bfa;
}
```

### Tailwind Color Extensions
```javascript
// tailwind.config.js
colors: {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  accent: {
    DEFAULT: 'var(--accent)',
    secondary: 'var(--accent-secondary)',
  },
  electric: { blue: 'var(--electric-blue)' },
  cyber: { green: 'var(--cyber-green)' },
  neon: { pink: 'var(--neon-pink)' },
  digital: { purple: 'var(--digital-purple)' },
  sunset: { orange: 'var(--sunset-orange)' },
  mint: { fresh: 'var(--mint-fresh)' },
}
```

---

## 🎭 Component Library

### Glass Morphism
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

[data-theme='dark'] .glass {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Usage:**
```jsx
<div className="glass p-6 rounded-2xl">
  Content with glass morphism effect
</div>
```

### Text Gradients
```css
.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-secondary {
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-aurora {
  background: var(--gradient-aurora);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 300% 300%;
  animation: aurora-text 4s ease-in-out infinite;
}
```

**Usage:**
```jsx
<h1 className="text-gradient">ApplyEase</h1>
<span className="text-gradient-secondary">Accent Text</span>
<h2 className="text-gradient-aurora">Animated Text</h2>
```

### Buttons
```css
.btn-primary {
  background: var(--gradient-primary);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
}
```

**Usage:**
```jsx
import { MagneticButton } from '@/components/ui/magnetic-button'

<MagneticButton className="btn-primary">
  Click Me
</MagneticButton>
```

---

## 🏗️ Layout System

### Spacing Variables
```css
:root {
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 2.5rem;   /* 40px */
  --spacing-3xl: 3rem;     /* 48px */
  --spacing-4xl: 4rem;     /* 64px */
  --spacing-5xl: 5rem;     /* 80px */
  --spacing-6xl: 6rem;     /* 96px */
  --spacing-7xl: 8rem;     /* 128px */
  --spacing-8xl: 10rem;    /* 160px */

  /* Section Spacing */
  --section-padding-y: var(--spacing-7xl);
  --section-padding-x: var(--spacing-lg);
  --nav-height: 80px;
}
```

### Container Classes
```css
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.px-container {
  padding-left: var(--spacing-lg);
  padding-right: var(--spacing-lg);
}

.section {
  padding: var(--section-padding-y) 0;
  position: relative;
}

.section-lg {
  padding: var(--spacing-8xl) 0;
}
```

### Page Layout Wrapper
```jsx
import { PageLayout } from '@/components/ui/page-layout'

// For pages with navigation and footer
<PageLayout>
  <YourContent />
</PageLayout>

// For auth pages without nav/footer
<PageLayout showNavigation={false} showFooter={false}>
  <YourContent />
</PageLayout>
```

---

## ✨ Animation Guidelines

### Framer Motion Patterns
```jsx
// Page entrance animation
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>

// Staggered children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>

// Hover animations
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Interactive Element
</motion.div>
```

### CSS Animations
```css
/* Floating animation */
.floating {
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Pulse glow effect */
.pulse-glow {
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

/* Morphing shapes */
.morphing-blob {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: morph 8s ease-in-out infinite;
}
```

---

## 🎨 Background Effects

### Gradient Orbs
```jsx
// For auth pages and hero sections
<div className="absolute inset-0 -z-10">
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
</div>
```

### Floating Particles
```jsx
{/* Add to any section for depth */}
{[...Array(20)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-2 h-2 bg-white rounded-full opacity-40 dark:opacity-20"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -100, 0],
      opacity: [0, 0.8, 0],
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      delay: Math.random() * 2,
      ease: 'easeInOut',
    }}
  />
))}
```

---

## 📱 Form Components

### Input Styling
```jsx
// Standard form input with icon
<div className="relative">
  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
  <input
    className="w-full pl-10 pr-4 py-4 glass border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 bg-white/5"
    placeholder="Enter text"
  />
</div>
```

### Error States
```jsx
{error && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="glass border border-red-500/20 p-4 rounded-xl"
  >
    <div className="text-sm text-red-600 dark:text-red-400">
      {error}
    </div>
  </motion.div>
)}
```

---

## 🌙 Dark Mode Guidelines

### Implementation
```jsx
// Theme context usage
import { useTheme } from '@/components/providers/theme-provider'

const { theme, toggleTheme } = useTheme()

// Conditional styling
<div className={`
  bg-white dark:bg-gray-900 
  text-gray-900 dark:text-white
  border-gray-200 dark:border-gray-700
`}>
```

### Color Variations
- Use `dark:` prefixes for dark mode specific styles
- Ensure text contrast ratios meet WCAG standards
- Test all components in both themes
- Use CSS variables for consistent theming

---

## 🎯 Section Guidelines

### Hero Sections
```jsx
<section className="hero-section px-container relative overflow-hidden">
  {/* Background effects */}
  <div className="absolute inset-0 -z-10">
    {/* Gradient orbs */}
  </div>
  
  {/* Content */}
  <div className="container text-center">
    <motion.h1 
      className="display-text text-6xl md:text-8xl mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Hero <span className="text-gradient">Title</span>
    </motion.h1>
    {/* More content */}
  </div>
</section>
```

### Content Sections
```jsx
<section className="section px-container">
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="display-text text-4xl md:text-6xl mb-6">
        Section <span className="text-gradient">Title</span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Section description
      </p>
    </div>
    {/* Section content */}
  </div>
</section>
```

### CTA Sections
```jsx
<section className="section-lg px-container relative overflow-hidden">
  {/* Vibrant background */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
    <div className="absolute inset-0 bg-black/10 dark:bg-black/40" />
  </div>
  
  {/* White text content */}
  <div className="container text-center text-white">
    {/* CTA content */}
  </div>
</section>
```

---

## 🔧 Development Guidelines

### File Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── providers/    # Context providers
├── app/
│   ├── globals.css   # Global styles and variables
│   └── layout.js     # Root layout with theme provider
```

### Component Creation Checklist
- [ ] Add proper TypeScript types
- [ ] Include dark mode variants
- [ ] Add motion animations where appropriate
- [ ] Test accessibility (keyboard nav, screen readers)
- [ ] Follow naming conventions
- [ ] Include JSDoc comments

### Best Practices
1. **Use CSS Variables**: Always prefer CSS variables over hardcoded values
2. **Mobile First**: Design for mobile, enhance for desktop
3. **Performance**: Use `transform` and `opacity` for animations
4. **Accessibility**: Include proper ARIA labels and semantic HTML
5. **Consistency**: Follow established patterns and spacing

---

## 🎨 Icons & Assets

### Icon Library
```jsx
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Github,
  User,
  Briefcase,
  MessageCircle
} from 'lucide-react'
```

### Usage Guidelines
- Use 16px (w-4 h-4) for small icons
- Use 20px (w-5 h-5) for standard icons  
- Use 24px (w-6 h-6) for large icons
- Always add proper alt text for accessibility

---

## 📋 Quality Checklist

### Before Shipping
- [ ] Component works in both light and dark themes
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] Animations are smooth and purposeful
- [ ] Accessibility requirements met
- [ ] Performance optimized (no unnecessary re-renders)
- [ ] Error states handled gracefully
- [ ] Loading states implemented
- [ ] Code follows style guide

### Testing
```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Check for type errors
pnpm type-check

# Run linting
pnpm lint
```

---

## 🚀 Common Patterns

### Page Template
```jsx
'use client'

import { motion } from 'framer-motion'
import { PageLayout } from '@/components/ui/page-layout'

export default function MyPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Page content */}
      </motion.div>
    </PageLayout>
  )
}
```

### Card Component
```jsx
<div className="glass p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
  <h3 className="text-xl font-semibold mb-4 text-gradient">
    Card Title
  </h3>
  <p className="text-gray-600 dark:text-gray-300">
    Card content
  </p>
</div>
```

---

## 📞 Support

For questions about the theme system:
1. Check this documentation first
2. Review existing components for patterns
3. Test thoroughly in both themes
4. Follow accessibility guidelines

Remember: **Consistency is key** - when in doubt, follow existing patterns and maintain the established visual language.

---

*Last updated: September 10, 2025*
*ApplyEase Design System v1.0*
