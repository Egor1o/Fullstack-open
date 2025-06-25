interface Props{
    totalExerciseNumber: number;
}

const Total = ({totalExerciseNumber} : Props ) => {
    return (
        <p>
            Number of exercises {totalExerciseNumber}
        </p>
    )
}


export default Total