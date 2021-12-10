import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { NewPatient, Patient, PatientWithoutPrivateInfo, Entry } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsWithoutSsn = (): Array<PatientWithoutPrivateInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getSinglePatient = (id: string) : Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    ...patient,
    id
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Patient => {
  const id: string = uuid();
  entry.id = id;
  patients.map(p => {
    if(p.id===patientId){
      p.entries.push(entry);
    }
  });
  const patient = patients.find(p => p.id === patientId);
  if(!patient){
    throw new Error('Patient not found');
  }
  return patient;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  getSinglePatient,
  addPatient,
  addEntry
};
