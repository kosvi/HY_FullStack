import calculateBmi from './bmiCalculator';
import express, { Request } from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

// https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request

// interface bmiRequest extends Request {
//  weight: string,
//  height: string
//}

app.get('/bmi', (req: Request, res) => {
  console.log(req.query.weight, req.query.height);
  if (isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) {
    res.json({ error: 'malformatted parameters' });
  } else {
    const weight: number = Number(req.query.weight);
    const height: number = Number(req.query.height);
    const bmi: string = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: bmi
    });
  }
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})