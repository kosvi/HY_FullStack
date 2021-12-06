import React from "react";
import { CoursePart } from "../utils/types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
  case "normal":
    return (<p><b>{part.name} {part.exerciseCount}</b><br /><i>{part.description}</i></p>);
    break;
  case "groupProject":
    return (<p><b>{part.name} {part.exerciseCount}</b><br />project exercises {part.groupProjectCount}</p>);
    break;
  case "submission":
    return (<p><b>{part.name} {part.exerciseCount}</b><br /><i>{part.description}</i><br />submit to {part.exerciseSubmissionLink}</p>);
    break;
  default:
    return (<div>DEFAULT</div>);
  }
};

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
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