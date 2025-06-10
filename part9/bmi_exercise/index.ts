import express, {Request} from 'express';
import calculateBmi from "./bmiCalculator";
import {parseArray} from "./utils";
import calculateExercises from "./exerciseCalculator";
const app = express();

interface QueryParams {
    weight?: string,
    height?: string
}

app.use(express.json());

app.get('/bmi', (req: Request<object, object, object, QueryParams>, res) => {
    const params = req.query;
    if(!params || !params.weight || !params.height || isNaN(Number(params.weight)) || isNaN(Number(params.weight))){
        return void res.status(400).json({error: "malformatted parameters"});
    }
    try{
        const bmiValue = calculateBmi(Number(params.height), Number(params.weight));
        return void res.status(200).json({
            weight: params.weight,
            height: params.height,
            bmi: bmiValue
        });
    } catch (_err) {
        return void res.status(400).json({error: "malformatted parameters"});
    }
});


app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    // Validation
    if (
        !target ||
        !daily_exercises
    ) {
        return void res.status(400).json({ error: 'parameters missing' });
    }

    if (
        !Array.isArray(daily_exercises) ||
        !daily_exercises.every(item => typeof item === 'number' || typeof item === 'string') ||
        !(typeof target === 'string' || typeof target === 'number')
    ) {
        return void res.status(400).json({ error: 'malformatted parameters' });
    }


    try {
        const {weekHours, target: parsedTarget} = parseArray(daily_exercises, target);
        const calculatedObject = calculateExercises(weekHours, parsedTarget);
        return void res.status(200).json({...calculatedObject});

    } catch (_error) {
        // The only error coming from parseArray is related to inability to convert numbers (parseArray)
        return void res.status(400).json({ error: 'malformatted parameters' });
    }
});

app.get('/hello', (_req, res) => {
    return void res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});