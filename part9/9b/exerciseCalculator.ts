interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface exerciseValues {
    week: number[];
    target: number;
}

export const parseArgumentsExercise = (args: (string|number)[]): exerciseValues => {
    if (args.length<4) throw new Error('Not enough arguments');
    // if (args.length>10) throw new Error('Too many arguments');
    const exerciseValues: exerciseValues = {week: [], target: 0};
    let hours: (string|number)[] = []
    if(require.main === module) {
        hours = args.slice(3);
        if (!isNaN(Number(args[2]))) {
            exerciseValues.target = Number(args[2]);
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    else{
        hours = args.slice(1)
        if (!isNaN(Number(args[0]))) {
            exerciseValues.target = Number(args[0]);
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    hours.forEach((hour) => {
        if(!isNaN(Number(hour))){
            exerciseValues.week.push(Number(hour));
        }
        else {
            throw new Error('Provided values were not numbers!');
        }
    });
    return exerciseValues;
};


export const calculateExercises = (week: number[], target: number): Result => {
    if (week.filter((day)=>day<0).length>0) {
        throw new Error('Provided hours had hours less than 0!');
    }
    interface ratingResults {
        rating: number;
        ratingDescription: string;
    }
    const ratingAlgorithm = (average: number, target: number): ratingResults => {
        const ratingObject = {rating: 0, ratingDescription: ""};
        const fraction = average/target;
        if (fraction<0.5){
            ratingObject.rating = 1;
            ratingObject.ratingDescription = "poor performance";
        }
        else if (fraction<1 && fraction>=0.5) {
            ratingObject.rating = 2;
            ratingObject.ratingDescription = "not bad but could be better";
        }
        else if (fraction<1.1 && fraction>=1) {
            ratingObject.rating = 3;
            ratingObject.ratingDescription = "reached goal";
        }
        else {
            ratingObject.rating = 4;
            ratingObject.ratingDescription = "broke goal";
        }
        return ratingObject;
    };
    const periodLength = week.length;
    const trainingDays = week.filter((day)=>day>0).length;
    const average = week.reduce((total, day)=> total+day, 0)/week.length;
    const success = average>=target ? true : false;
    const {rating, ratingDescription} = ratingAlgorithm(average, target);
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

if(require.main === module) {
    try {
        const { week, target } = parseArgumentsExercise(process.argv);
        console.log(calculateExercises(week, target));
      } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
      }
}


// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))