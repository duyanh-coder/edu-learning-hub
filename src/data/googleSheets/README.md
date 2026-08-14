# Google Sheets Read Adapter

Prototype 03.6 implements **read-only** access to a Google Spreadsheet through the Google Visualization CSV endpoint.

## Configuration

Create `.env` from `.env.example`:

```env
VITE_DATA_PROVIDER=google-sheets
VITE_GOOGLE_SHEET_ID=YOUR_SPREADSHEET_ID
VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
```

`VITE_GOOGLE_SHEET_ID` is preferred. `VITE_GOOGLE_SHEET_URL` is kept as a convenient fallback.

## Spreadsheet requirements

The spreadsheet must be readable without authentication from the browser. For this prototype, use one of these approaches:

1. Share the spreadsheet as **Anyone with the link → Viewer**, or
2. Publish the spreadsheet for web.

Do **not** put a service-account private key, OAuth client secret, or other credentials in `VITE_*` variables.

## Sheet names

The default tabs are:

- `Subjects`
- `Documents`
- `Recordings`
- `Schedule`
- `Announcements`

The names are configured in `src/config/dataConfig.ts`.

## How the adapter works

```text
React
  ↓
GoogleSheetsLearningDataProvider
  ↓
Google Sheets CSV endpoint
  ↓
CSV parser
  ↓
Sheet row objects
  ↓
Model mappers
  ↓
Subject / Document / Recording / Schedule / Announcement
```

The adapter uses `cache: no-store` so a fresh request can observe spreadsheet updates without requiring a frontend rebuild.

## Important limitation

This is intentionally **read-only**. Admin write/update will not use browser-side Google credentials. The future write flow should be:

```text
Admin UI → Vercel API / backend → Google Sheets API → Spreadsheet
```
