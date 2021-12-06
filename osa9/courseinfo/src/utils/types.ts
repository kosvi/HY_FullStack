export interface CoursePartBase {
  name: string,
  exerciseCount: number,
  type: string
}

export interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string
}

export interface CourseNormalPart extends CoursePartBaseWithDesc {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBaseWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;
