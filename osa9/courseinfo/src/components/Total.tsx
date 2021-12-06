import React from "react";
import { CoursePart } from "../utils/types";

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;