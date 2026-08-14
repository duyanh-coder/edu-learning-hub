# Google Sheets data source

## 1. Spreadsheet structure

Create one Google Spreadsheet for the application. Use these sheet/tab names:

- `Subjects`
- `Documents`
- `Recordings`
- `Schedule`
- `Announcements`

CSV templates in `src/data/sheets/` can be copied into Google Sheets to create the initial columns.

## 2. Configure the spreadsheet URL

Create a local `.env` file from `.env.example` and set:

```env
VITE_DATA_PROVIDER=mock
VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
VITE_GOOGLE_SHEET_ID=YOUR_SPREADSHEET_ID
```

For Prototype 03.6, set `VITE_DATA_PROVIDER=google-sheets` after the spreadsheet is configured as readable from the browser.

## 3. Important security rule

The spreadsheet URL/ID is not a secret. Do **not** put Google service-account private keys, client secrets, database passwords, or other credentials into `VITE_*` variables.

The future write-enabled Admin flow should be:

```text
React Admin
    ↓
Vercel API / backend
    ↓
Google Sheets API
    ↓
Google Spreadsheet
```

## 4. Current Prototype 03.5 scope

Implemented:

- Data model interfaces
- Provider interface
- Mock provider
- Google Sheets provider placeholder
- Provider selection through environment configuration
- Google Sheet URL/ID configuration
- Sheet templates

Prototype 03.6 now implements:

- Read-only browser access through the Google Visualization CSV endpoint
- CSV parsing and row-to-model mapping
- Active-row filtering

Still not implemented:

- Google authentication
- Admin CRUD against Google Sheets
- Google Drive file picker
