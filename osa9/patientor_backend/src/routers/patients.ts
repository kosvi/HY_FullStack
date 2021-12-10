import express from 'express';
import patientService from '../services/patientService';
import toNewEntry from '../utils/toNewEntry';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatientsWithoutSsn();
  res.json(patients);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getSinglePatient(id);
  if (patient) {
    res.json(patient);
  } else {
    res.json({ error: `no patient found with id ${id}` });
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    res.json(patientService.addPatient(newPatient));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    res.json(patientService.addEntry(id, newEntry));
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

export default router;
