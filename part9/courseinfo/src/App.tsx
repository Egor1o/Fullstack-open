import Header from "./components/Header.tsx";
import Content from "./components/Content.tsx";
import Total from "./components/Total.tsx";

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts = [
        {
            name: "Fundamentals",
            exerciseCount: 10
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14
        }
    ];

    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <div>
            <Header name={courseName}/>
            <Content name={courseParts[0].name} exerciseNumber={courseParts[0].exerciseCount}/>
            <Content name={courseParts[1].name} exerciseNumber={courseParts[1].exerciseCount}/>
            <Content name={courseParts[2].name} exerciseNumber={courseParts[2].exerciseCount}/>
            <Total totalExerciseNumber={totalExercises}/>
        </div>
    );
};

export default App;