import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";

const SingleEntry = ({ entry }: { entry: Entry }) => {

  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map(dc => <li key={dc}>{dc} {diagnoses[dc]['name']}</li>)}
      </ul>
    </div>
  );
};

export default SingleEntry;
