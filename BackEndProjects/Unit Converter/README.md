# Unit Converter

A simple, sketch-styled unit converter built with TypeScript and Express. It serves static HTML pages and processes conversions on the server via POST requests. Supports Length, Weight, and Temperature conversions with clean, readable results.

## Live Demo

- https://unit-converter-lvh1.onrender.com/index.html

## Features

- Length, Weight, and Temperature conversions
- Clean result page with nicely formatted numbers
- Lightweight Express server serving static pages from `public`
- TypeScript-first setup with fast `tsx` dev runner

## Tech Stack

- TypeScript, Node.js, Express
- `tsx` for dev/start, `tsc` for builds

## Project Structure

- Server: [BackEndProjects/Unit Converter/src/index.ts](BackEndProjects/Unit%20Converter/src/index.ts)
- Static pages (served from `/public`):
  - [BackEndProjects/Unit Converter/public/index.html](BackEndProjects/Unit%20Converter/public/index.html) — Length
  - [BackEndProjects/Unit Converter/public/weight.html](BackEndProjects/Unit%20Converter/public/weight.html) — Weight
  - [BackEndProjects/Unit Converter/public/temperature.html](BackEndProjects/Unit%20Converter/public/temperature.html) — Temperature
  - [BackEndProjects/Unit Converter/public/style.css](BackEndProjects/Unit%20Converter/public/style.css)

## Run Locally

Prereqs: Node.js 18+ recommended.

Using pnpm (recommended):

```bash
pnpm install
pnpm dev
```

Using npm:

```bash
npm install
npm run dev
```

The server starts on `http://localhost:3000` by default (respects `PORT`).

## Build

```bash
pnpm build
```

Outputs compiled JavaScript via TypeScript (`tsc`). You can also run directly with:

```bash
pnpm start
```

## Usage

Navigate between categories via the top nav:

- Length: `/index.html`
- Weight: `/weight.html`
- Temperature: `/temperature.html`

Enter a value, select the source and target units, and submit. The server returns a result page showing the formatted conversion and a Reset button.

## API Endpoints

All endpoints accept `application/x-www-form-urlencoded` form data:

- POST `/convert-length`

  - Fields: `value` (number), `fromUnit`, `toUnit`
  - Units: `millimeters`, `centimeters`, `meters`, `kilometers`, `inches`, `feet`, `yards`, `miles`

- POST `/convert-weight`

  - Fields: `value` (number), `fromUnit`, `toUnit`
  - Units: `milligrams`, `grams`, `kilograms`, `ounces`, `pounds`

- POST `/convert-temperature`
  - Fields: `value` (number), `fromUnit`, `toUnit`
  - Units: `celsius`, `fahrenheit`, `kelvin`

## Formatting

Results are trimmed to up to 4 decimal places and trailing zeros are removed for readability.

## Deployment

- Render URL: https://unit-converter-lvh1.onrender.com/index.html
