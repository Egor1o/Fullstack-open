import express, {Request} from 'express';
import calculateBmi from "./bmiCalculator";
const app = express();

interface QueryParams {
    weight?: string,
    height?: string
}

app.get('/bmi', (req: Request<object, object, object, QueryParams>, res) => {
    const params = req.query;
    if(!params || !params.weight || !params.height || isNaN(Number(params.weight)) || isNaN(Number(params.weight))){
        res.status(400).json({error: "malformatted parameters"});
    }
    try{
        const bmiValue = calculateBmi(Number(params.height), Number(params.weight));
        res.status(200).json({
            weight: params.weight,
            height: params.height,
            bmi: bmiValue
        });
    } catch (_err) {
        res.status(400).json({error: "malformatted parameters"});
    }
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});