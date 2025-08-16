import type {CoursePart, CoursePartBase} from "../types.ts";
import type {JSX} from "react";

interface Props {
    part: CoursePart
}
export const Part = ({part}: Props): JSX.Element=> {
    switch (part.kind){
        case "basic":
            return (
                <div>
                    <Title name={part.name} exerciseCount={part.exerciseCount}/>
                    <p>{part.description}</p>
                </div>
            )
        case 'group':
            return (
                <div>
                    <Title name={part.name} exerciseCount={part.exerciseCount}/>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            )
        case 'special':
            return (<div>
                <Title name={part.name} exerciseCount={part.exerciseCount}/>
                <p>{part.description}</p>
                <p>required skills: {part.requirements.join(', ')}</p>
            </div>)
        case 'background':
            return (
                <div>
                    <Title name={part.name} exerciseCount={part.exerciseCount}/>
                    <p>{part.description}</p>
                    <p>submit to https {part.backgroundMaterial}</p>
                </div>
            )
        default: {
            assertNever(part)
            return <></>
        }
    }
}

const Title = ({name, exerciseCount}: CoursePartBase) : JSX.Element => {
    return (
        <h3>{name} {exerciseCount}</h3>
    )
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

