import React from "react";
import { CoursePart } from "../utils/types";

const Part = ({ part }: { part: CoursePart }) => {

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

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
  case "special":
    return (<p><b>{part.name} {part.exerciseCount}</b><br /><i>{part.description}</i><br />required skills: {part.requirements.map((req, index) => index>0 ? `, ${req}` : `${req}`)}</p>);
  default:
    return assertNever(part);
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