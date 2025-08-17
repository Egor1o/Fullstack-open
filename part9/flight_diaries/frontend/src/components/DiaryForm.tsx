import { type JSX, useEffect, useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types.ts";
import * as React from "react";

export const DiaryForm = (): JSX.Element => {
  const errors = useState<string[]>([]);
  const [weather, setWeather] = useState<NewDiaryEntry["weather"]>(
    "sunny" as Weather,
  );
  const [visibility, setVisibility] = useState<NewDiaryEntry["visibility"]>(
    "ok" as Visibility,
  );
  const [date, setDate] = useState<string>(new Date().toDateString());

  useEffect(() => {
    const parsedEntry = NewDiaryEntry.safeParse({
      weather,
      visibility,
      date,
    });

    console.log(parsedEntry);
  }, [weather, visibility, date]);

  return (
    <div>
      <h2>Add new diary entry</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <SelectInput
          options={Weather}
          value={weather}
          stateChange={setWeather}
        />
        <SelectInput
          options={Visibility}
          value={visibility}
          stateChange={setVisibility}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

const InputErrors = ({ errors }: { errors: string[] }): JSX.Element => {
  return (
    <div>
      {errors.map((error) => (
        <p style={{ color: "red ", fontSize: "large" }}>{error}</p>
      ))}
    </div>
  );
};

type EnumLike = Record<string, string | number>;

type SelectInputProps<T extends EnumLike> = {
  options: T;
  value: T[keyof T];
  stateChange: React.Dispatch<React.SetStateAction<T[keyof T]>>;
};

// inspiration from here https://stackoverflow.com/questions/69160507/typescript-generic-function-with-enums
function getEnumKeys<T extends EnumLike>(e: T): Array<keyof T & string> {
  //object keys will return strings only
  return Object.keys(e) as Array<keyof T & string>;
}

//generic select for weather and visibility
function SelectInput<T extends EnumLike>({
  options,
  value,
  stateChange,
}: SelectInputProps<T>): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    stateChange(e.target.value as T[keyof T]);
  };
  return (
    <select value={value} onChange={handleChange}>
      {getEnumKeys(options).map((key) => (
        <option key={key} value={options[key]}>
          {key}
        </option>
      ))}
    </select>
  );
}
