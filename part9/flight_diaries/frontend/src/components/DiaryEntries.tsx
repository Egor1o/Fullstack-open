import type { JSX } from "react";
import type { DiaryEntry } from "../types.ts";

interface Props {
  diaryEntries: DiaryEntry[];
}
export const DiaryEntries = (props: Props): JSX.Element => {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.diaryEntries.map((diaryEntry, index) => {
        return (
          <div key={`diary-entry-${index}`}>
            <h3>{new Date(diaryEntry.date).toDateString()}</h3>
            <p>visibility: {diaryEntry.visibility}</p>
            <p>weather: {diaryEntry.weather}</p>
          </div>
        );
      })}
    </div>
  );
};
