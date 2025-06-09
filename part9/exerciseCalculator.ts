type RatingDescription = "Try harder next time" | "not too bad but could be better" | "Good job! Keep going"

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: RatingDescription,
    target: number,
    average: number
}

interface ExerciseParams {
    weekHours: number[]
    target: number
}

const parseArgs = (args: string[]): ExerciseParams => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const weekHours: number[] = []

    const allArgs = args.slice(2)
    allArgs.forEach((arg) => {
        if(isNaN(Number(arg))){
            throw new Error('Provided values were not numbers!');
        }
        weekHours.push(Number(arg))
    })

    const target: number = weekHours.shift()

    return <ExerciseParams>{
        weekHours,
        target
    }
}

const calculateExercises = (weekHours: number[], target: number): Result => {
    const periodLength = weekHours.length
    const trainingDays = weekHours.filter(number => {return number > 0.0}).length
    const average = weekHours.reduce((value, sum) => {return sum + value},0) / periodLength

    // rating breakpoint for - 2. If average is at most 25% less then target
    const middleRating: number = target - (target*0.25)
    const rating = average >= target ? 3 : average > middleRating ? 2 : 1
    const ratingDescription = rating === 3 ? "Good job! Keep going" : rating === 2 ? "not too bad but could be better" : "Try harder next time"


    return <Result>{
        periodLength,
        trainingDays,
        success: rating === 3,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const {weekHours, target} = parseArgs(process.argv)
    console.log(calculateExercises(weekHours, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}