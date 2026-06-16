# Design system

This app mirrors the **PropertyPilot** house style. It is specific on purpose —
match it, don't improvise.

**The look:** a vertical stack of **cream cards** (`#F8F3E9`) separated by thin
**dark seams** (`#0A0A0A`) — the _Chassis_. **Every card is cream** (including the
hero); the only dark is the 4px seam between cards. Cards are **flat (no drop
shadows)**. Text is **pure black**. Headings are **Oswald**, body is **Lato**,
everything is **sentence case** (never ALL CAPS), and the UI copy is **German**.

Everything is composed from **tokens** and **primitives**. Don't write raw
colors, font sizes, or one-off styles.

## The Chassis

Cards never float on their own — they are stacked inside a **`<Chassis>`**, which
paints the dark canvas behind them so it shows only as 4px seams, and clips the
stack into one rounded panel. Cards inside render **`flush`** (no own radius).

```tsx
<Chassis>
  <PropertyHero ... />
  <InsuranceSection />
</Chassis>
```

## Tokens

Defined in [`src/app/globals.css`](./src/app/globals.css) as Tailwind v4 `@theme`.

### Colors

| Purpose                   | Utility                                                  |
| ------------------------- | -------------------------------------------------------- |
| Page + card surface       | `bg-cream`                                               |
| Dark seam (between cards) | `bg-canvas`                                              |
| Primary text              | `text-ink` (pure black)                                  |
| Secondary text            | `text-ink-soft` (`#767676`)                              |
| Tertiary text             | `text-ink-faint` (`#B3B2B2`)                             |
| Brand (green)             | `text-brand`, `bg-brand`, `bg-brand-tint`, `bg-brand/10` |
| Destructive (terracotta)  | `text-terracotta`, `bg-terracotta-tint`                  |
| Warning (amber)           | `text-warning-ink`, `bg-warning-tint`                    |
| Row separators            | `divide-hairline` / `border-hairline`                    |

### Radii

`rounded-card` (24) · `rounded-card-lg` (28, hero/chassis/sheet) · `rounded-grouped` (10)

**No card shadows** — cards are flat. The only shadows are functional:
`shadow-sheet` (bottom sheet) and `shadow-glass` (glass disc).

## Typography

Use the **`<Text>`** primitive — pick a `variant` (role) and optional `tone`
(color). Never set `font-size`, `font-family`, or a raw color directly.

Roles: `display`, `figure`, `largeTitle`, `title1`, `title2`, `title3` (Oswald) ·
`headline` (bold body) · `body`, `callout`, `subhead`, `footnote`, `caption`,
`caption2` (Lato).

Tones: `default` (black), `soft`, `faint`, `inverse`, `inverseSoft`, `brand`,
`danger`.

**Two heading levels only:** the card title (`title3`, via `DashboardCardHeader`)
and the group label (`footnote` + `bold` + `tone="soft"`).

## Primitives

All in [`src/components/ui`](./src/components/ui).

| Primitive                       | Use it for                                                           |
| ------------------------------- | -------------------------------------------------------------------- |
| `Chassis`                       | The card stack (cream cards + dark seams)                            |
| `Card`                          | A cream card — `default`, or the bigger `hero`; `flush` in a Chassis |
| `DashboardCardHeader`           | A card's title row (title3 + optional ⓘ)                             |
| `CardFooterLink`                | The brand-tinted "add / more" row at the bottom of a card            |
| `Text`                          | All text (variant + tone)                                            |
| `Button`                        | Actions (`primary`/`secondary`/`outline`/`ghost`/`destructive`)      |
| `Chip`                          | Single-select option pills (e.g. a category picker)                  |
| `Badge`                         | Small status pills (`brand`/`gold`/`danger`/`warning`/`neutral`)     |
| `Icon`                          | Icons by name (`shield`, `plus`, `box`, `warning`, `info` …)         |
| `BottomSheet`                   | Modal sheets (slide up, render the shared `SheetHeader`)             |
| `GlassButton`                   | The translucent glass disc (e.g. the sheet close button)             |
| `GroupedSection` / `GroupedRow` | A white iOS-style grouped list (for detail screens)                  |
| `Field`, `TextInput`            | Labelled form fields                                                 |
| `EmptyState`                    | Placeholder when there's nothing yet                                 |
| `Skeleton`                      | Loading placeholders                                                 |

## Data

There is no backend — data comes from a small mock layer in
[`src/lib/mock-api.ts`](./src/lib/mock-api.ts). `simulateRequest(value, { ms, failRate })`
adds latency and can fail. Money is formatted with `formatEuro` from
[`src/lib/format.ts`](./src/lib/format.ts).

## The token rule

Don't hardcode colors. `npm run check:design` scans for raw hex and arbitrary
color classes (e.g. `text-[#abc123]`) and nudges you toward the tokens. It's
advisory — a warning, not a failing gate.
