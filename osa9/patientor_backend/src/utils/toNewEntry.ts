import { Diagnose, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry, HealthCheckRating } from '../types';
import diagnoses from '../data/diagnoses';

const assertNever = (value: never): never => {
  throw new Error('Error: ' + JSON.stringify(value));
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${healthCheckRating}`);
  }
  return healthCheckRating;
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

const parseDiagnosisCode = (code: string): string => {
  const diagnose = diagnoses.find(d => d.code === code);
  if (diagnose) {
    return diagnose.code;
  }
  throw new Error(`${code} is not a valid diagnose code`);
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnose['code']> => {
  if (!codes) {
    return [];
  }
  if (!(typeof codes === 'object' && codes instanceof Array)) {
    throw new Error('DiagnosisCodes given in incorrect format');
  }
  const validCodes = codes.map(c => parseDiagnosisCode(parseString(c)));
  return validCodes;
};

interface SickLeave {
  startDate: string,
  endDate: string
}

const parseSickLeave = (obj: unknown): { startDate: string, endDate: string } | undefined => {
  if (!obj) {
    return undefined;
  }
  if ((typeof (obj) === 'object'
    && Object.prototype.hasOwnProperty.call(obj, 'startDate')
    && Object.prototype.hasOwnProperty.call(obj, 'endDate'))) {
    const o = obj as SickLeave;
    return {
      startDate: parseDate(o.startDate),
      endDate: parseDate(o.endDate)
    };
  }
  throw new Error('Sickleave given in incorrect format');
};

type healthCheckFields = { type: 'HealthCheck', description: unknown, date: unknown, specialist: unknown, healthCheckRating: unknown, diagnosisCodes: unknown };
const parseHealthCheckEntry = ({ description, date, specialist, healthCheckRating, diagnosisCodes }: healthCheckFields): HealthCheckEntry => {
  // const parseHealthCheckEntry = ({ description, date, specialist, healthCheckRating, diagnosisCodes }: HealthCheckEntry): HealthCheckEntry => {
  const newEntry: HealthCheckEntry = {
    id: 'default',
    type: 'HealthCheck',
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  };
  return newEntry;
};

type dischargeFields = { date: unknown, criteria: unknown };
const parseDischarge = ({ date, criteria }: dischargeFields): { date: string, criteria: string } => {
  return {
    date: parseDate(date),
    criteria: parseString(criteria)
  };
};

type hospitalFields = { type: 'Hospital', description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, discharge: unknown };
const parseHospitalEntry = ({ description, date, specialist, diagnosisCodes, discharge }: hospitalFields): HospitalEntry => {
  // const parseHospitalEntry = (entry: HospitalEntry): HospitalEntry => {
  const d: dischargeFields = discharge as dischargeFields;
  const newEntry: HospitalEntry = {
    id: 'default',
    type: 'Hospital',
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    discharge: parseDischarge(d)
  };
  return newEntry;
};

type occupationalHealthCareFields = { type: 'OccupationalHealthCare', description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, employerName: unknown, sickLeave: unknown };
// const parseOccupationalHealthCareEntry = (entry: OccupationalHealthCareEntry): OccupationalHealthCareEntry => {
const parseOccupationalHealthCareEntry = ({ description, date, specialist, diagnosisCodes, employerName, sickLeave }: occupationalHealthCareFields): OccupationalHealthCareEntry => {
  const newEntry: OccupationalHealthCareEntry = {
    id: 'default',
    type: 'OccupationalHealthcare',
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    employerName: parseString(employerName),
    sickLeave: parseSickLeave(sickLeave)
  };
  return newEntry;
};


const toNewEntry = (entry: healthCheckFields | hospitalFields | occupationalHealthCareFields): Entry => {
  try {
    parseString(entry.type);
  } catch (error) {
    throw new Error('Error identifying entry type: ' + error);
  }
  switch (entry.type) {
    case 'HealthCheck':
      return parseHealthCheckEntry(entry);
    case 'Hospital':
      return parseHospitalEntry(entry);
    case 'OccupationalHealthCare':
      return parseOccupationalHealthCareEntry(entry);
    default:
      return assertNever(entry);
  }
};

export default toNewEntry;