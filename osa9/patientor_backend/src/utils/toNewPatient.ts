import { NewPatient } from '../types';

const toNewPatient = (object: unknown): NewPatient => {
  console.log(object);
  const newPatient: NewPatient = {
    name: 'foo',
    dateOfBirth: '123',
    ssn: '123',
    gender: 'unknown',
    occupation: 'bar'
  };
  return newPatient;
};

export default toNewPatient;
