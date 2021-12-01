type bmiResult =
  'Underweight (Severe thinness)' |
  'Underweight (Moderate thinness)' |
  'Underweight (Mild thinness)' |
  'Normal (healthy weight)' |
  'Overweight (Pre-obese)' |
  'Obese (Class I)' |
  'Obese (Class II)' |
  'Obese (Class III)';

const calculateBmi = (height: number, weight: number): bmiResult => {
  const bmi = Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  }
  if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  }
  if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  }
  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  }
  if (bmi < 35) {
    return 'Obese (Class I)';
  }
  if (bmi < 40) {
    return 'Obese (Class II)';
  }
  return 'Obese (Class III)';
}

//console.log(calculateBmi(180, 74));


/*
 * NOT A REALLY NICE WAY, BUT WORKS FOR THIS EXERCISE
 */
if (process.argv.length != 4) {
  console.error('Invalid number of parameters');
} else {
  if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) {
    console.error('Parameters have to be numerical');
  } else {
    console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
  }
}

export default calculateBmi;