import React from "react";
import { Entry, HealthCheckRating, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import { useStateValue } from "../state";

const assertNever = (value: never): never => {
  throw new Error("Error " + JSON.stringify(value));
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div style={{ "border": "solid 1px black", "marginBottom": "0.5em", "padding": "0.5em" }}>
      <h4>{entry.date} (Health Check)</h4> <i>{entry.description}</i>
      <div><b>Status:</b> {HealthCheckRating[entry.healthCheckRating]}</div>
      <ul>
        {entry.diagnosisCodes?.map(dc => <li key={dc}>{dc} {diagnoses[dc]['name']}</li>)}
      </ul>
    </div>
  );
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div style={{ "border": "solid 1px black", "marginBottom": "0.5em", "padding": "0.5em" }}>
      <h4>{entry.date} (Hospital)</h4> <i>{entry.description}</i>
      <div><b>Discharge:</b> {entry.discharge.date} - {entry.discharge.criteria}</div>
      <ul>
        {entry.diagnosisCodes?.map(dc => <li key={dc}>{dc} {diagnoses[dc]['name']}</li>)}
      </ul>
    </div>
  );
};

const OccupationalHealthCareEntryDetails = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div style={{ "border": "solid 1px black", "marginBottom": "0.5em", "padding": "0.5em" }}>
      <h4>{entry.date} (Occupational Healthcare)</h4> <i>{entry.description}</i>
      {entry.sickLeave && <div><b>Sickleave</b> {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</div>}
      <ul>
        {entry.diagnosisCodes?.map(dc => <li key={dc}>{dc} {diagnoses[dc]['name']}</li>)}
      </ul>
    </div>
  );
};

const SingleEntry = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default SingleEntry;
