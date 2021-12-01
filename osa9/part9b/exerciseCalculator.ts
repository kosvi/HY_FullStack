type rate = 1 | 2 | 3;

interface trainingStats {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: rate,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exerciseHours: Array<number>, dailyTarget: number): trainingStats => {
  // first make sure we are examining a period of at least 1 day
  if (exerciseHours.length < 1) {
    throw new Error('target period can\'t be shorter than 1 day');
  }
  const sum = exerciseHours.reduce((prev, current) => prev + current, 0);
  const trainingDays = exerciseHours.reduce((prev, current) => {
    if (current > 0) {
      return prev + 1;
    }
    return prev;
  }, 0);
  const average = sum / exerciseHours.length;
  let rating: rate = 1;
  let ratingDescription = 'pick up the pace to reach your goals!';
  if (average > dailyTarget) {
    rating = 3;
    ratingDescription = 'you reached your goal, well done!';
  }
  else if (average > 0.9 * dailyTarget) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  return {
    periodLength: exerciseHours.length,
    trainingDays: trainingDays,
    success: (average >= dailyTarget),
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTarget,
    average: average
  };
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

interface userInput {
  targetValue: number,
  dailyTraining: Array<number>
}

const parseUserInput = (givenInput: Array<string>): userInput => {
  if (givenInput.length < 4) {
    throw new Error('Invalid number of parameters');
  }
  let targetValue: number;
  if (!isNaN(Number(givenInput[2]))) {
    targetValue = Number(givenInput[2]);
  } else {
    throw new Error('Parameters have to be numbers');
  }
  const dailyTraining: Array<number> = givenInput.map((a: string, index: number) => {
    if (index > 2) {
      if (isNaN(Number(a))) {
        throw new Error('Parameters have to be numbers');
      }
      return Number(a);
    }
    return 0
  });
  return {
    targetValue: targetValue,
    dailyTraining: dailyTraining.splice(3)
  }
}

try {
  const parsedInput: userInput = parseUserInput(process.argv);
  console.log(calculateExercises(parsedInput.dailyTraining, parsedInput.targetValue));
} catch (error) {
  console.error('Error', error.message);
}