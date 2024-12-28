export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemester = {
  name: "Autum" | "Summer" | "Fall";
  year: string;
  code: "01" | "02" | "03";
  startMonth: Month;
  endMonth: Month;
};

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
