export interface AcademicTerm {
  id: string;
  academicYear: string;
  semester: string;
  label: string;
  isCurrent: boolean;
  active: boolean;
}

export interface AcademicTermFilter {
  academicYear: string;
  semester: string;
}
