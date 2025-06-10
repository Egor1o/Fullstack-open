interface ExerciseParams {
    weekHours: number[]
    target: number
}
export const parseArray = (args: (string | number)[], targetParam: string | number): ExerciseParams => {
    // at this point we can be sure, that the first element exists, and it is of type number.
    if(isNaN(Number(targetParam))){
        throw new Error('Provided values were not numbers!');
    }
    const target: number = Number(targetParam);


    const weekHours: number[] = [];
    args.forEach((arg: string | number) => {
        if(isNaN(Number(arg))){
            throw new Error('Provided values were not numbers!');
        }
        weekHours.push(Number(arg));
    });

    return <ExerciseParams>{
        weekHours,
        target
    };
};