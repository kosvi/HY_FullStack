import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";

import { useStateValue, setFullPatient } from "../state";
import { FullPatient } from "../types";
import SingleEntry from "./SingleEntry";
import AddHospitalEntryForm, { HospitalFormValues } from "./AddHospitalEntryForm";

const FullPatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ fullPatients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<FullPatient>();

  console.log(patient);

  const submitNewEntry = (values: HospitalFormValues) => {
    console.log(values);
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
  // not interested to study icons for now...
  return (
    <div>
      <h2>{patient?.name} (gender: {patient?.gender})</h2>
      ssn: {patient?.ssn}<br />
      occupation: {patient?.occupation}
      <h3>entries</h3>
      {patient?.entries.map(entry => <SingleEntry key={entry.id} entry={entry} />)}
      <AddHospitalEntryForm onSubmit={submitNewEntry} onCancel={() => console.log("cancel")} />
    </div>
  );
};

export default FullPatientInfo;
