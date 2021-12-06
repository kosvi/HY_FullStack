export interface CoursePartBase {
  name: string,
  exerciseCount: number,
  type: string
}

export interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string
}