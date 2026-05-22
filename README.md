# Figma Health Dashboard Recreation

This project is a React + Vite recreation of the provided Figma component design. I used the original health widget and activity card idea as the base, then added small interactions to make the components feel more dynamic, clean, and functional.

## Installation

Clone the repository:

```bash
git clone <your-repo-link>
cd Figma-test
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Tech Stack

- React
- Vite
- CSS
- Lucide React Icons

## Project Structure

```txt
src/
  components/
    HealthDashboard/
      HealthDashboard.jsx
      HealthDashboard.css
      index.js
  data/
    dashboardData.js
  App.jsx
  main.jsx
```

## Thought Process

I started by reviewing the Figma design and identifying the main reusable UI pieces: health metric cards, activity rows, icon buttons, and the overall widget-style screen layout.

Instead of recreating only static cards, I wanted the interface to feel interactive while still keeping the original Figma design recognizable. The final design uses an icon-first layout where the right-side icon rail stays fixed, and users can reveal more details only when needed.

## How the UI Works

### Health Metric Icons

The health icons represent heart rate, sleep, steps, and weight. When a user clicks an icon, its detail card appears in the card area. Clicking the same icon again removes that card.

The show-all icon expands or collapses all health metric cards at once.

### Slot Placement

The health cards use a custom visual slot order to make the reveal interaction feel more intentional and balanced.

```js
const slotPlacementOrder = ["slot-two", "slot-one", "slot-four", "slot-three"];
```

This means the first selected card appears in the second visual slot, the second card appears in the first slot, the third appears in the fourth slot, and the fourth appears in the third slot.

### Activity Section

The weekly activity section starts as a small icon in the same fixed right-side rail. When the user clicks the activity icon, the weekly activity card expands on the left side.

Inside the activity card, each row can be expanded individually to show more details such as duration and notes. There is also an Expand All option to open every activity row at once.

## Component Overview

### `HealthDashboard`

The main parent component. It controls whether the weekly activity section is expanded and renders the overall dashboard layout.

### `StatsSection`

Handles the health metric icons, selected health cards, show-all behavior, and the fixed right-side control rail.

### `StatDetailCard`

Displays the expanded details for a selected health metric.

### `ActivitySection`

Controls whether the weekly activity card is shown.

### `ActivityList`

Displays the weekly activities and manages the expand/collapse behavior for activity rows.

### `ActivityRow`

Reusable row component for each activity item.

### `IconBox`

Reusable icon wrapper used across health metrics, activity rows, and control buttons.

## Responsive Behavior

The layout is responsive for smaller screens. On phone-size screens, hover tooltips are removed because hover interactions do not work naturally on touch devices. The icon rail and expanded cards also adjust to keep the interface usable on smaller viewports.

## Accessibility Notes

- Interactive elements use buttons instead of plain divs.
- Buttons include `aria-label` and `aria-pressed` where needed.
- Expandable activity rows use `aria-expanded`.
- Decorative icons are wrapped consistently for visual clarity.

## Tools Used

- Figma: Used as the visual design reference.
- React: Used for component-based UI development.
- Vite: Used for project setup and local development.
- CSS: Used for layout, responsiveness, transitions, and styling.
- Lucide React: Used for icon rendering.
- ChatGPT: Used for creating base for layout, responsive styling, card design, hover states, transitions, and refining UI interaction.

## Final Notes

The goal of this project was to keep the original Figma components recognizable while adding thoughtful interactions. I focused on a clean layout, reusable components, fixed icon alignment, stable spacing, and smooth expand/collapse behavior.
