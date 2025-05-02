import { calculateBmi } from "./bmiCalculator";
import express from 'express';
import * as qs from 'qs';
const app = express();
app.use(express.json())
import { exerciseValues, parseArgumentsExercise, calculateExercises } from "./exerciseCalculator";

app.set('query parser', (str: string) => qs.parse(str));


app.get('/', (_req, res ) => {
  const fsString : string = 'Hello Full Stack'; 
  res.send(fsString);
});
app.get('/bmi', (req, res ) => {
    const {height, weight} = req.query;
    if(!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))){
        res.status(400).json('Error: Malformatted parameters');
    }
    else {
      try {
        const result = calculateBmi(Number(height),Number(weight));
        res.status(200).json({weight: Number(weight), height: Number(height), bmi:result});
    }   catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).json(errorMessage);
    }
}});

app.get('/exercises', (req, res) => {
    if(!req.body){
      res.status(400).json('Error: request body missing');
    }
    else {
      const {daily_exercises, target} = req.body;
      if(!daily_exercises || !target ){
        res.status(400).json('Error: parameters missing');
      }
      else {
        try {
          const values: exerciseValues = parseArgumentsExercise([target, ...daily_exercises]);
          const result = calculateExercises(values.week, values.target);
          res.json(result)
        } catch (error: unknown) {
          let errorMessage = 'malformatted parameters';
          res.status(400).json(errorMessage);
        }
      }
    }
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});