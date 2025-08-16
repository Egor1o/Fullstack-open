import Header from "./components/Header.tsx";
import Total from "./components/Total.tsx";
import {courseParts} from "./types.ts";
import {Part} from "./components/Part.tsx";

const App = () => {
    const courseName = "Half Stack application development";

    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <div>
            <Header name={courseName}/>
            {courseParts.map(part => <Part part={part} />)}
            <Total totalExerciseNumber={totalExercises}/>
        </div>
    );
};

export default App;