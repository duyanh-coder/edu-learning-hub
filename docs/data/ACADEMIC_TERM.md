# Dynamic Academic Term

The user selects `academic_year + semester` from the `AcademicTerms` sheet.

Default priority:
1. Saved local selection
2. `is_current=TRUE`
3. First active term

Content sheets (`Subjects`, `Documents`, `Recordings`, `Schedule`, `Announcements`) use `academic_year` and `semester` to filter content.

The selected term is stored in browser localStorage under `edu-learning-hub:academic-term`.
