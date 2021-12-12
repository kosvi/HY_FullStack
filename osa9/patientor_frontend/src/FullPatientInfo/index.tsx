import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";

import { useStateValue, setFullPatient } from "../state";
import { FullPatient } from "../types";
import SingleEntry from "./SingleEntry";
import ErrorMessage from "./ErrorMessage";
import AddHealthCheckEntryForm, { HealthCheckFormValues } from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm, { HospitalFormValues } from "./AddHospitalEntryForm";
import { Button } from "semantic-ui-react";
import AddOccupationalEntryForm, { OccupationalFormValues } from "./AddOccupationalEntryForm";

const FullPatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ fullPatients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<FullPatient>();
  const [entryForm, setEntryForm] = React.useState<boolean>(false);
  const [chosenForm, setChosenForm] = React.useState<string>("HealthCheck");
  const [apiError, setApiError] = React.useState<string | null>(null);

  console.log(patient);

  const closeForm = () => {
    setEntryForm(false);
  };

  const openForm = () => {
    setEntryForm(true);
  };

  type EntryFormValues = HealthCheckFormValues | HospitalFormValues | OccupationalFormValues;

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<FullPatient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setFullPatient(updatedPatient));
      setPatient(updatedPatient);
      closeForm();
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data.error);
      setTimeout(() => {
        setApiError(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (!fullPatients[id]) {
        try {
          const { data: fullPatient } = await axios.get<FullPatient>(`${apiBaseUrl}/patients/${id}`);
          setPatient(fullPatient);
          dispatch(setFullPatient(fullPatient));
        } catch (error) {
          console.error(error);
        }
      } else {
        setPatient(fullPatients[id]);
      }
    };
    void fetchPatient();
  }, [dispatch]);
  if (!patient) {
    return (
      <div></div>
    );
  }
  // not interested to study icons for now...
  return (
    <div>
      <h2>{patient?.name} (gender: {patient?.gender})</h2>
      {apiError !== null && <ErrorMessage message={apiError} />}
      {entryForm && <div>
        <Button onClick={() => setChosenForm("HealthCheck")}>HealthCheck</Button>
        <Button onClick={() => setChosenForm("Hospital")}>Hospital</Button>
        <Button onClick={() => setChosenForm("OccupationalHealthCare")}>OccupationalHealthcare</Button>
      </div>}
      {entryForm && chosenForm === "HealthCheck" && <AddHealthCheckEntryForm onSubmit={submitNewEntry} onCancel={closeForm} />}
      {entryForm && chosenForm === "Hospital" && <AddHospitalEntryForm onSubmit={submitNewEntry} onCancel={closeForm} />}
      {entryForm && chosenForm === "OccupationalHealthCare" && <AddOccupationalEntryForm onSubmit={submitNewEntry} onCancel={closeForm} />}
      {!entryForm && <div><Button onClick={openForm} color="blue">Add entry</Button></div>}
      ssn: {patient?.ssn}<br />
      occupation: {patient?.occupation}
      {patient.entries && <h3>entries</h3>}
      {patient?.entries?.map(entry => <SingleEntry key={entry.id} entry={entry} />)}
    </div>
  );
};

export default FullPatientInfo;
