import { NewPatient, Gender } from '../types';

const parseString = (text: unknown): string => {
  if (!text || !(typeof text === 'string' || text instanceof String)) {
    throw new Error('Incorrect or missing string');
  } else {
    if (text instanceof String) {
      return text.toString();
    }
    return text;
  }
};

const parseDate = (date: unknown): string => {
  try {
    const dateString: string = parseString(date);
    if (Date.parse(dateString)) {
      return dateString;
    }
    throw new Error(`Incorrect date: ${date}`);
  } catch (error) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };
  return newPatient;
};

export default toNewPatient;
