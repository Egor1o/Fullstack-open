import type { CoursePart } from '../types.ts';
import type { JSX } from 'react';
import Content from './Content.tsx';

interface Props {
  part: CoursePart;
}
export const Part = ({ part }: Props): JSX.Element => {
  switch (part.kind) {
    case 'basic':
      return (
        <Content
          name={part.name}
          exerciseCount={part.exerciseCount}
          description={part.description}
        />
      );
    case 'group':
      return (
        <Content
          name={part.name}
          exerciseCount={part.exerciseCount}
          groupProjectCount={part.groupProjectCount}
        />
      );
    case 'special':
      return (
        <Content
          name={part.name}
          exerciseCount={part.exerciseCount}
          description={part.description}
          requirements={part.requirements}
        />
      );
    case 'background':
      return (
        <Content
          name={part.name}
          exerciseCount={part.exerciseCount}
          description={part.description}
          backgroundMaterial={part.backgroundMaterial}
        />
      );
    default: {
      assertNever(part);
      return <></>;
    }
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};
