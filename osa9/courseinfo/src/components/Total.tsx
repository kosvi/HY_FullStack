import React from "react";
import { CoursePartBase } from "../utils/types";

const Total = ({ courseParts }: { courseParts: Array<CoursePartBase> }) => {
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