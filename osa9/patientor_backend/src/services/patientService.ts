import patients from '../data/patients';
import { NewPatient, Patient, PatientWithoutSsn } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsWithoutSsn = (): Array<PatientWithoutSsn> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): void => {
  console.log(patient);
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient
};
