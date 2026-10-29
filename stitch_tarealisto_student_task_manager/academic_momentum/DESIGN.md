---
name: Academic Momentum
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#684000'
  on-tertiary: '#ffffff'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system targets undergraduate and graduate university students seeking to conquer academic overload without cognitive fatigue. The brand personality balances studious clarity with invigorating progress—calm, focused, highly organized, yet energizing and rewarding. 

The aesthetic is Modern Tactile Minimalism: clean negative space, structural card containers, high typographic legibility, and satisfying micro-interactions that trigger a sense of completion. It avoids both cold corporate rigidity and childish gamification, leaning into a refined, contemporary productivity tool that feels effortless under deadline pressure.

## Colors

The palette leverages a structured functional color assignment designed for rapid scannability on small screens:

- **Primary (`#4F46E5` - Electric Indigo):** Anchors core actions, active navigation states, primary buttons, and focal academic tasks. Conveys analytical focus and mental sharpness.
- **Secondary (`#10B981` - Mint Emerald):** Signals completed assignments, grade achievements, progress milestones, and affirmative states.
- **Tertiary (`#F59E0B` - Warm Amber):** Reserved for impending deadlines (due within 24–48 hours), priority tags, and study session alerts without inducing panic.
- **Neutrals & Surfaces:**
  - Base Background: `#F8FAFC` (Slate 50) provides a soft, low-glare canvas.
  - Secondary Surface / Sub-containers: `#F1F5F9` (Slate 100).
  - Elevated Cards & Modals: `#FFFFFF` (Pure White).
  - Text & Outlines: Primary text uses `#0F172A` (Slate 900) for maximum contrast; secondary meta-text uses `#64748B` (Slate 500); structural dividing borders use `#E2E8F0` (Slate 200).
- **Subject Badges:** Subtle tinted pastel backgrounds (10–15% alpha) paired with high-contrast text to distinguish academic disciplines (e.g., Violet for Calculus, Teal for Computer Science, Rose for Humanities) without visual clash.

## Typography

The pairing blends the friendly, crisp geometric energy of Plus Jakarta Sans for titles and dynamic interface controls with the rock-solid legibility of Inter for body text, dates, subtasks, and long-form lecture descriptions.

- **Headlines & Titles:** Set in Plus Jakarta Sans with weights ranging from SemiBold (600) to Bold (700). Tighter tracking (`-0.01em` to `-0.02em`) gives titles authority and compact readability on mobile screens.
- **Body & Data:** Set in Inter with regular (400) and medium (500) weights to maximize scannability across high-density task lists.
- **Labels & Micro-copy:** Set in Plus Jakarta Sans SemiBold (600) with a slightly expanded letter-spacing (`+0.01em`) for uppercase course codes and deadline badges.

## Layout & Spacing

The layout is built around a mobile-first fluid single-column architecture, shifting to an anchored two-column layout on larger screens or split-view tablet viewports:

- **Mobile Rhythm:** Base margin is `1rem` (16px) with an interior card padding of `1rem`. Elements within cards (tags, assignment titles, due dates) use a tight `0.5rem` (`space-sm`) rhythm to maximize screen real estate while remaining touch-friendly.
- **Vertical Hierarchy:** Section headers, card stacks, and timeline groups maintain `1.5rem` (`space-xl`) separation to visually chunk study modules and chronological deadlines.
- **Interactive Targets:** Every tap target adheres to a minimum 44×44px hit-box, ensuring one-handed ergonomic navigation while walking between university lecture halls.

## Elevation & Depth

Visual depth is achieved through ambient, cool-toned shadows paired with subtle white-to-slate contrast rather than stark borders:

- **Level 0 (Canvas):** `#F8FAFC` flat surface.
- **Level 1 (Default Task & Course Cards):** White (`#FFFFFF`) surface with an ambient shadow: `0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 1px 3px -1px rgba(15, 23, 42, 0.06)`, framed by a faint hairline stroke (`#F1F5F9`).
- **Level 2 (Active/Selected Cards & Bottom Navigation Bar):** White surface with `0 8px 20px -4px rgba(15, 23, 42, 0.08), 0 3px 6px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Floating Action Button & Bottom Sheets):** White or Indigo surface with `0 12px 28px -4px rgba(79, 70, 229, 0.28), 0 4px 10px -2px rgba(15, 23, 42, 0.08)`.

## Shapes

The shape system employs pronounced rounded geometry (`roundedness: 2`, expanding up to `rounded-2xl` for task containers) to project warmth, approachability, and contemporary digital craft:

- **Standard Buttons, Form Inputs, and Badges:** `0.75rem` (12px) to `1rem` (16px) corner radius.
- **Cards & Bottom Sheets:** `1rem` (16px) to `1.25rem` (20px) corner radius, delivering soft encapsulation for assignment details.
- **Floating Action Button (FAB) & Tag Pills:** Full pill-radius (`9999px`) to immediately establish clear interactive and categorization affordances.

## Components

### Buttons
- **Primary:** Full indigo background (`#4F46E5`), white text (`Plus Jakarta Sans Label-LG`), minimum height of 48px, fully rounded (12px radius) with an active-state scale depression of `0.98`.
- **Secondary / Subdued:** Ghost indigo surface (`rgba(79, 70, 229, 0.08)`), indigo text, no border.
- **Floating Action Button (FAB):** 56×56px circle or pill-extended shape, floating at bottom-right (16px above bottom bar). Filled with `#4F46E5`, featuring a pure white centered plus icon and elevated shadow.

### Checkboxes & Completion States
- **Checkbox:** Custom 24×24px squircle (8px radius) with a 2px border in `#CBD5E1`.
- **Completed State:** Instant smooth fill transition to Emerald Mint (`#10B981`) with a crisp white SVG checkmark. Triggers a strike-through on the task title and dims text to `#94A3B8`.

### Course & Subject Badges
- Compact pill elements (horizontal padding `8px`, vertical `4px`).
- Background rendered in 10% opacity of the course color with solid 100% text color (e.g., Mathematics in `#4338CA`/`#EEF2FF`, Biology in `#047857`/`#ECFDF5`).

### Task Cards
- Pure white background, `16px` border-radius (`rounded-2xl`).
- Grid/Flex alignment: left-aligned interactive checkbox, followed by a middle column containing the title, subject badge, and Amber deadline label (e.g., "Mañana, 23:59"), with an optional right-aligned chevron or subtask counter ("2/3").

### Bottom Navigation Bar
- Fixed to viewport bottom with safe-area padding. Translucent white background with `backdrop-filter: blur(12px)`.
- Four destinations (Pendientes, Materias, Completadas, Perfil) with an icon and label stack. Active items render in `#4F46E5` with a subtle top indicator pip; inactive items render in `#94A3B8`.

### Input Fields
- Minimum height 48px, background `#F8FAFC`, border 1.5px `#E2E8F0`, transitioning to `#4F46E5` border with subtle indigo glow on focus.