import type { JSX } from 'react';
import type { CoursePartBase } from '../types.ts';

interface Props extends CoursePartBase {
  requirements?: string[];
  backgroundMaterial?: string;
  description?: string;
  groupProjectCount?: number;
}
const Content = ({
  name,
  exerciseCount,
  requirements,
  backgroundMaterial,
  description,
  groupProjectCount,
}: Props): JSX.Element => {
  return (
    <div>
      <h3>
        {name}: {exerciseCount}
      </h3>
      {description ? (
        <p style={{ fontStyle: 'italic' }}>{description}</p>
      ) : null}
      {groupProjectCount ? <p>project exercises {groupProjectCount}</p> : null}
      {requirements ? <p>required skills: {requirements.join(', ')}</p> : null}
      {backgroundMaterial ? <p>submit to https {backgroundMaterial}</p> : null}
    </div>
  );
};

export default Content;
