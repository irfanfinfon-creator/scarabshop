# Scarabshop Color System

## Overview

This document contains the complete color palette for the Scarabshop design system. Colors are organized as design tokens compatible with Figma Token Studio.

---

## Brand Tokens

Foundation colors representing the brand identity.

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `brand/primary` | `gray-950` | `#0a0a0a` | Headings, primary text, icons |
| `brand/secondary` | `gray-500` | `#6b7280` | Body text, subtitles, descriptions |
| `brand/accent` | `red-400` | `#ff6b6b` | Primary CTAs, highlights, badges |
| `brand/accent-dark` | `red-500` | `#e85555` | Button hover, active states |
| `brand/accent-light` | `red-300` | `#fca5a5` | Subtle highlights, backgrounds |
| `brand/background` | `white` | `#ffffff` | Page backgrounds, cards |
| `brand/background-alt` | `gray-50` | `#f9fafb` | Alternate sections, table headers |

---

## Semantic Tokens

Colors used to convey meaning (success, warning, error, info).

### Success

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `semantic/success-bg` | `green-100` | `#dcfce7` | Success message background |
| `semantic/success-text` | `green-800` | `#166534` | Success text |
| `semantic/success-icon` | `green-600` | `#16a34a` | Success icons |

### Warning

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `semantic/warning-bg` | `yellow-100` | `#fef9c3` | Warning background |
| `semantic/warning-text` | `yellow-800` | `#854d0e` | Warning text |
| `semantic/warning-icon` | `yellow-600` | `#ca8a04` | Warning icons |

### Error

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `semantic/error-bg` | `red-100` | `#fee2e2` | Error background |
| `semantic/error-text` | `red-800` | `#991b1b` | Error text |
| `semantic/error-icon` | `red-600` | `#dc2626` | Error icons, delete buttons |

### Info

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `semantic/info-bg` | `blue-50` | `#eff6ff` | Info background |
| `semantic/info-text` | `blue-900` | `#1e3a8a` | Info text |
| `semantic/info-icon` | `blue-600` | `#2563eb` | Info icons |

---

## Neutral Tokens

Complete gray scale for layouts, surfaces, and text.

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `neutral/50` | `gray-50` | `#f9fafb` | Alternate backgrounds |
| `neutral/100` | `gray-100` | `#f3f4f6` | Dividers, placeholders |
| `neutral/200` | `gray-200` | `#e5e7eb` | Borders, input bg |
| `neutral/300` | `gray-300` | `#d1d5db` | Input borders |
| `neutral/400` | `gray-400` | `#9ca3af` | Placeholders, icons |
| `neutral/500` | `gray-500` | `#6b7280` | Secondary text (brand secondary) |
| `neutral/600` | `gray-600` | `#4b5563` | Body text |
| `neutral/700` | `gray-700` | `#374151` | Form labels |
| `neutral/800` | `gray-800` | `#1f2937` | Dark hover states |
| `neutral/900` | `gray-900` | `#111827` | Table text |
| `neutral/950` | `gray-950` | `#030712` | Primary text (brand primary) |

---

## Component Tokens

Colors specific to UI components.

### Buttons

| Token Name | Tailwind Ref | Hex Value | State |
|-----------|------------|----------|-------|
| `component/button-primary-bg` | `red-400` | `#ff6b6b` | Default (accent) |
| `component/button-primary-hover` | `red-500` | `#e85555` | Hover (accent-dark) |
| `component/button-primary-text` | `white` | `#ffffff` | Text |
| `component/button-destructive-bg` | `red-600` | `#dc2626` | Destructive |
| `component/button-destructive-hover` | `red-700` | `#b91c1c` | Destructive hover |
| `component/button-secondary-bg` | `gray-100` | `#f3f4f6` | Secondary |
| `component/button-secondary-hover` | `gray-200` | `#e5e7eb` | Secondary hover |

### Inputs

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `component/input-border` | `gray-300` | `#d1d5db` | Default border |
| `component/input-border-focus` | `red-400` | `#ff6b6b` | Focus ring |
| `component/input-bg` | `white` | `#ffffff` | Input background |
| `component/input-placeholder` | `gray-400` | `#9ca3af` | Placeholder text |

### Badges

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `component/badge-success-bg` | `green-100` | `#dcfce7` | Success badges |
| `component/badge-success-text` | `green-800` | `#166534` | Success text |
| `component/badge-warning-bg` | `yellow-100` | `#fef9c3` | Warning badges |
| `component/badge-warning-text` | `yellow-800` | `#854d0e` | Warning text |
| `component/badge-error-bg` | `red-100` | `#fee2e2` | Error badges |
| `component/badge-error-text` | `red-800` | `#991b1b` | Error text |
| `component/badge-info-bg` | `blue-100` | `#dbeafe` | Info badges |
| `component/badge-info-text` | `blue-800` | `#1e40af` | Info text |
| `component/badge-category-bg` | `purple-100` | `#f3e8ff` | Category badges |
| `component/badge-category-text` | `purple-800` | `#6b21a8` | Category text |

### Cards

| Token Name | Tailwind Ref | Hex Value | Usage |
|-----------|------------|----------|-------|
| `component/card-bg` | `white` | `#ffffff` | Card backgrounds |
| `component/card-border` | `gray-100` | `#f3f4f6` | Card borders |
| `component/card-shadow` | - | `shadow-lg` | Card shadows |

---

## Overlay Tokens

Colors for modals, overlays, and backgrounds with opacity.

| Token Name | Tailwind Ref | Opacity | Usage |
|-----------|------------|---------|-------|
| `overlay/modal-backdrop` | `black` | 50% | Modal overlays |
| `overlay/hero-backdrop` | `black` | 60% | Hero section overlay |
| `overlay/loading-bg` | `white` | 80% | Loading screen |
| `overlay/badge-bg` | `white` | 10% | Badge backgrounds |
| `overlay/badge-border` | `white` | 20% | Badge borders |
| `overlay/blur-bg` | `white` | 80% | Blur backdrop |

---

## Color Usage Map

### Where Each Color is Used

#### Brand Colors
- `brand/primary` (gray-950): Headings, Logo, Primary buttons, Footer bg
- `brand/secondary` (gray-500): Body text, Subtitles, Icons
- `brand/accent` (red-400): CTAs, Badges, Highlights, Links
- `brand/accent-dark` (red-500): Button hover, Active states
- `brand/accent-light` (red-300): Subtle highlights
- `brand/background` (white): Page backgrounds
- `brand/background-alt` (gray-50): Feature section bg

#### Components
| Component | Primary Colors |
|-----------|------------|
| Buttons | `accent`, `accent-dark`, `white` |
| Inputs | `gray-300`, `white`, `accent` (focus) |
| Cards | `white`, `gray-100` |
| Badges | `green`, `yellow`, `red`, `purple`, `blue` |
| Hero | `primary`, `accent`, white opacity |
| Footer | `primary`, `accent` |
| Header | `white`, `gray-100` |

---

## Known Issues / TODOs

The following color mismatches have been identified and should be fixed in future updates:

| File | Current | Should Be | Issue |
|------|---------|----------|-------|
| `ProfileSection.tsx` | `hover:bg-blue-700` | `hover:bg-red-500` | Wrong hover on accent button |
| `AddressSection.tsx` | `hover:bg-blue-700` | `hover:bg-red-500` | Wrong hover on accent button |
| `UnifiedProfile.tsx` | `hover:bg-blue-700` | `hover:bg-red-500` | Wrong hover on accent button |
| `ProductManagement.tsx` | `hover:bg-blue-700` | `hover:bg-red-500` | Wrong hover on accent button |

---

## Quick Reference

### Tailwind Class → Token Name Mapping

| Tailwind Class | Token Name |
|----------------|------------|
| `text-gray-950` | `brand/primary` |
| `text-gray-500` | `brand/secondary` |
| `text-red-400` | `brand/accent` |
| `bg-red-400` | `brand/accent` |
| `bg-red-500` | `brand/accent-dark` |
| `bg-red-300` | `brand/accent-light` |
| `bg-white` | `brand/background` |
| `bg-gray-50` | `brand/background-alt` |
| `text-green-600` | `semantic/success-icon` |
| `text-yellow-600` | `semantic/warning-icon` |
| `text-red-600` | `semantic/error-icon` |
| `text-blue-600` | `semantic/info-icon` |

---

*Last Updated: April 2026*
*Project: Scarabshop E-commerce*