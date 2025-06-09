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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))