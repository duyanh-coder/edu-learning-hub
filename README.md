# EDU Learning Hub

Prototype 04 — User Subjects + Dynamic Academic Term.

## Stack
- React + TypeScript + Vite
- Ant Design
- SCSS
- React Router
- Google Sheets CSV read adapter

## Dynamic Academic Term
The active academic year/semester is loaded from the `AcademicTerms` sheet.
The UI defaults to `is_current=TRUE`, remembers the user's selection in localStorage, and filters content by `academic_year` + `semester`.

## Google Sheets
Configure in `.env`:

```env
VITE_DATA_PROVIDER=google-sheets
VITE_GOOGLE_SHEET_ID=YOUR_SPREADSHEET_ID
VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
```

Required sheets:
- AcademicTerms
- Subjects
- Documents
- Recordings
- Schedule
- Announcements

`Settings` is optional and stores class/program context such as program, course, class, and training mode.

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run typecheck
npm run build
```
