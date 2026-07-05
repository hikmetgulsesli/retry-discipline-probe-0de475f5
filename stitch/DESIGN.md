---
name: Retry Discipline Probe
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#45464c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f1500'
  on-tertiary-container: '#c76c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-page: 32px
  card-padding: 12px
  stack-gap: 8px
---

## Brand & Style
The design system is engineered for high-reliability monitoring and technical oversight. The brand personality is deterministic, precise, and utilitarian, aiming to evoke a sense of absolute control and clarity for DevOps engineers and system administrators. 

The style is **Industrial Minimalism**. It prioritizes information density over decorative flair, utilizing a rigid structural grid and high-contrast functional signaling. Visual metaphors are drawn from physical instrumentation panels—focusing on state-based logic where every pixel serves a diagnostic purpose. The interface remains quiet until action is required, ensuring that system status is the primary focal point.

## Colors
The palette is strictly functional, following a "signal-to-noise" logic. 

- **Primary:** Deep charcoal/black used for text and structural elements to ensure maximum legibility.
- **Success (Ready/Active):** A crisp Emerald (#059669) used for active probes and healthy system states.
- **Warning (Paused/Inactive):** A balanced Amber (#D97706) for non-critical alerts or Slate Gray (#64748B) for neutral inactive states.
- **Error:** A bold Red (#DC2626) for immediate visual interruption during probe failures.
- **Background:** Off-white (#F9FAFB) to provide a neutral canvas that doesn't compete with functional color signals.
- **Surface:** Pure White (#FFFFFF) cards with thin, 1px neutral borders are used to separate data clusters.

## Typography
The system uses a dual-font approach. **Inter** handles the interface's structural hierarchy and general legibility, while **JetBrains Mono** is utilized for all "active" data: timestamps, status values, probe IDs, and terminal output.

- **Headlines:** Reserved for dashboard sections and probe names.
- **Body:** Used for descriptions and tooltips.
- **Monospace Labels:** All system-generated data and status indicators must use the monospaced font to ensure character alignment in dense tables or status cards.
- **Mobile scaling:** For small screens, `headline-lg` reduces to 20px, and padding within cards is tightened to maintain density.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop (max-width: 1280px) and shifts to a fluid, single-column vertical stack on mobile. 

- **Grid:** A 12-column system with a 16px gutter.
- **Rhythm:** Spacing is strictly based on a 4px increment system. Elements should be grouped using 8px (small), 16px (medium), or 24px (large) increments to maintain a compact, industrial density.
- **Information Density:** Content should be "packed" rather than "airy." Use horizontal alignment for key-value pairs within cards to minimize vertical scrolling.

## Elevation & Depth
This system eschews shadows in favor of **Low-contrast outlines** and **Tonal layering**. 

- **Borders:** Surfaces are defined by 1px solid borders (#E5E7EB).
- **Depth:** Higher hierarchy elements (like active modals or flyouts) are differentiated by a slightly darker border or a 2px stroke rather than a shadow.
- **Interaction:** On hover, card borders transition to the Primary color (#111827) or the functional color associated with the probe's state (e.g., green for an active probe).

## Shapes
In line with the industrial aesthetic, the system uses a **Soft** (0.25rem) corner radius. This provides a professional, modern feel without becoming "playful." 

- **Primary Elements:** Buttons and Input fields use 4px (0.25rem) rounding.
- **Status Pills:** Can use 9999px (pill-shaped) rounding to distinguish them from structural card elements.
- **Data Points:** Small indicator lights or status pips are rendered as perfect squares to maintain the technical look.

## Components
- **Status Cards:** Compact white containers with a 1px border. The top border should be 3px thick and color-coded based on the probe status (Success/Warning/Error).
- **Primary Buttons:** Solid fill using the Primary color (#111827) with monospaced uppercase labels. No gradients.
- **Toggle Switches:** Rectangular design with high-contrast active states. Use the Success green for the "On" position.
- **Alert Banners:** Inline, full-width banners with no rounding. Use light background tints of the functional colors with bold 1px borders.
- **Data Tables:** High-density, border-collapse tables with JetBrains Mono for all cell data. Use zebra-striping (#F9FAFB) for row legibility.
- **Probe Pips:** 8x8px squares used next to text to indicate "Live" pulsing states via simple opacity animations.