interface CoursePartBase {
  name: string,
  exerciseCount: number,
  type: string
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartBaseWithDesc {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CoursePartWithRequirements extends CoursePartBaseWithDesc {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CoursePartWithRequirements;
