# ?? Cyberpunk Portfolio - Quick Start Guide

## Running the Portfolio

### Development Mode
```bash
npm install --legacy-peer-deps
npm run dev
```
Visit `http://localhost:3000` to see your cyberpunk portfolio in action!

### Production Build
```bash
npm run build
npm start
```

---

## ?? Key Visual Elements

### Color Variables
Use these cyberpunk colors in your components:
- `var(--cyber-blue)` or `text-cyber-blue`
- `var(--cyber-purple)` or `text-cyber-purple`
- `var(--cyber-pink)` or `text-cyber-pink`
- `var(--cyber-green)` or `text-cyber-green`
- `var(--cyber-yellow)` or `text-cyber-yellow`

### Quick Component Examples

#### Add Glitch Effect to Text
```tsx
import GlitchText from "@/components/GlitchText";

<GlitchText as="h1" glitchIntensity="medium">
  Your Title Here
</GlitchText>
```

#### Use GlassCard for Content
```tsx
import GlassCard from "@/components/GlassCard";

<GlassCard className="p-6">
  Your content here
</GlassCard>
```

#### Add Neon Glow Effect
```tsx
<div className="shadow-[0_0_20px_rgba(0,217,255,0.4)] border-2 border-cyber-blue/60">
  Glowing element
</div>
```

#### Corner Brackets
```tsx
<div className="relative">
  <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-blue" />
  <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-pink" />
  Your content
</div>
```

---

## ?? Best Practices

1. **Dark Mode First**: The cyberpunk theme looks best in dark mode
2. **Use Neon Colors Sparingly**: They're powerful - use them for emphasis
3. **Animation Balance**: Let effects breathe - don't overuse
4. **Accessibility**: All effects respect `prefers-reduced-motion`
5. **Performance**: Use GPU-accelerated properties (transform, opacity)

---

## ?? Modified Files

### Core Files
- `tailwind.config.ts` - Cyberpunk colors & animations
- `src/app/globals.css` - Global effects & utilities

### Components
- `src/components/GlassCard.tsx` - Enhanced with neon effects
- `src/components/Badge.tsx` - Cyber-styled tech badges
- `src/components/GlitchText.tsx` - **NEW** glitch effect component
- `src/components/About.tsx` - Hero section with effects
- `src/components/Project.tsx` - Project cards with holographic hover
- `src/components/SectionHeading.tsx` - Neon section headers
- `src/components/Header.tsx` - Mobile navigation
- `src/components/Menu.tsx` - Desktop sidebar
- `src/components/Contact.tsx` - Contact section
- `src/components/ThemeToggle.tsx` - Cyber theme switcher
- `src/components/ScrollProgress.tsx` - Gradient progress bar

### Layout
- `src/app/layout.tsx` - Enhanced sidebar and backdrop

---

## ?? Customization Tips

### Change Primary Neon Color
In `tailwind.config.ts`, modify the `cyber` colors:
```ts
cyber: {
  blue: "#YOUR_COLOR", // Change primary neon
  // ...
}
```

### Adjust Glow Intensity
In component classes, change the shadow values:
```tsx
shadow-[0_0_30px_rgba(0,217,255,0.8)] // Stronger glow
shadow-[0_0_10px_rgba(0,217,255,0.2)] // Subtle glow
```

### Add More Animations
In `tailwind.config.ts`, add new keyframes:
```ts
keyframes: {
  yourAnimation: {
    '0%': { /* start */ },
    '100%': { /* end */ }
  }
}
```

---

## ?? Troubleshooting

### Dependencies Issues
```bash
npm install --legacy-peer-deps
```

### Build Errors
```bash
npm run build
# Check for TypeScript or ESLint errors
```

### Dark Mode Not Working
Check that `ThemeProvider` is wrapping your app in `layout.tsx`

---

## ?? Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Next.js](https://nextjs.org)
- [Cyberpunk Design Inspiration](https://dribbble.com/tags/cyberpunk)

---

## ?? You're Ready!

Your portfolio now has:
? Stunning cyberpunk aesthetics
? Neon glow effects
? Glitch animations
? Holographic elements
? Professional presentation
? Mobile responsive design
? Excellent performance

**Go forth and showcase your work in style! ???**
