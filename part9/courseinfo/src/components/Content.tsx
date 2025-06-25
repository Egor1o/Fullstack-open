interface Props{
    name: string;
    exerciseNumber: number;
}

const Content = ({name, exerciseNumber} : Props) => {
    return (
        <p>
            {name}: {exerciseNumber}
        </p>
    );
}

export default Content