import React from "react";
import { CoursePartBase } from "../utils/types";

const Part = ({ part }: { part: CoursePartBase }) => {
  return (
    <p>{part.name} {part.exerciseCount}</p>
  );
};

const Content = ({ courseParts }: { courseParts: Array<CoursePartBase> }) => {
  return (
    <div>
      {
        courseParts.map(cp => {
          return (<Part key={cp.name} part={cp} />);
        })
      }
    </div>
  );
};

export default Content;