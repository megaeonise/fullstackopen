//formula for bmi is kg/m^2

interface bmiValues {
    cm: number;
    kg: number
}

const parseArgumentsBMI = (args: string[]): bmiValues => {
    if (args.length<4) throw new Error('Not enough arguments');
    if (args.length>4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            cm: Number(args[2]),
            kg: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (cm: number, kg:number): string => {
    const bmi = kg/((cm/100)**2);
    if (bmi<16) {
        return "Underweight (Severe thinness)";
    }
    else if (bmi>=16 && bmi<=16.9) {
        return "Underweight (Moderate thinness)";
    }
    else if (bmi>=17 && bmi<=18.4) {
        return "Underweight (Mild thinness)";
    }
    else if (bmi>=18.5 && bmi<=24.9) {
        return "Normal range";
    }
    else if (bmi>=25 && bmi<29.9) {
        return "Overweight (Pre-obese)";
    }
    else if (bmi>=30 && bmi<34.9) {
        return "Obese (Class I)";
    }
    else if (bmi>=35 && bmi<39.9) {
        return "Obese (Class II)";
    }
    else if (bmi>=40) {
        return "Obese (Class III)";
    }
    return "No BMI";
};
if(require.main === module){
    try {
        const { cm, kg } = parseArgumentsBMI(process.argv);
        console.log(calculateBmi(cm, kg));
      } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
      }
}


// console.log(calculateBmi(180, 91))