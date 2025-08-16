import type {JSX} from "react";

interface Props{
    name: string;
    exerciseNumber: number;
}
const Content = ({name, exerciseNumber} : Props): JSX.Element => {
    return (
        <p>
            {name}: {exerciseNumber}
        </p>
    );
}

export default Content