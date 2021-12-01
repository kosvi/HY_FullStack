import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import express, { Request } from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request

// interface bmiRequest extends Request {
//  weight: string,
//  height: string
//}

app.get('/bmi', (req: Request, res) => {
  if (isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) {
    res.json({ error: 'malformatted parameters' });
  } else {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi: string = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: bmi
    });
  }
});

interface exerciseRequest extends Request {
  body: {
    daily_exercises: Array<number>,
    target: number
  }
}

app.post('/exercises', (req: exerciseRequest, res) => {
  const { daily_exercises, target } = req.body;
  const trainingData = calculateExercises(daily_exercises, target);
  res.json(trainingData);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
