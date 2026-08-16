# Google Sheets templates

## Required sheets
- AcademicTerms
- Subjects
- Documents
- Recordings
- Schedule
- Announcements
- Settings (optional for class/program context)

## Academic term
Add `academic_year` and `semester` to content sheets. The UI selects the active term from `AcademicTerms` and filters content accordingly.

`AcademicTerms` columns:
`id, academic_year, semester, label, is_current, active`

Only one active term should normally have `is_current=TRUE`.
