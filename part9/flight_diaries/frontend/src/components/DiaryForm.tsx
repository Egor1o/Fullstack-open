import { type Dispatch, type JSX, type SetStateAction, useState } from "react";
import {
  type DiaryEntry,
  NewDiaryEntry,
  Visibility,
  Weather,
} from "../types.ts";
import * as React from "react";
import { createDiary } from "../diaryService.ts";
import axios from "axios";

type DiaryFormProps = {
  setDiaryEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  alignItems: "center",
};

export const DiaryForm = ({ setDiaryEntries }: DiaryFormProps): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [weather, setWeather] = useState<NewDiaryEntry["weather"]>(
    "sunny" as Weather,
  );
  const [visibility, setVisibility] = useState<NewDiaryEntry["visibility"]>(
    "great" as Visibility,
  );
  const [date, setDate] = useState<string>(new Date().toDateString());
  const [comment, setComment] = useState<string>("");

  const createNewEntry = (): NewDiaryEntry => {
    return {
      weather,
      visibility,
      date: new Date(date),
      comment,
    };
  };

  const parseNewEntry = (newEntry: NewDiaryEntry) => {
    return NewDiaryEntry.safeParse(newEntry);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry = createNewEntry();
    const parsedEntry = parseNewEntry(newEntry);

    //if you want to test with incorrect data, comment lines 53-57
    if (!parsedEntry.success) {
      setErrors(parsedEntry.error.issues.map((er) => er.message));
      return;
    }
    setErrors([]);

    createDiary(newEntry)
      .then((data) => {
        setErrors([]);
        setDiaryEntries((value) => [...value, data]);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrors(error.response ? [error.response.data] : []);
          return;
        }

        if (error instanceof Error) {
          setErrors([error.message]);
          return;
        }

        setErrors(["An unknown error occurred"]);
      });
  };

  return (
    <div>
      <h2>Add new diary entry</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        {errors.length > 0 ? <InputErrors errors={errors} /> : null}
        <TextInput value={date} setValue={setDate} title={"date"} />
        <SelectInput
          options={Weather}
          value={weather}
          stateChange={setWeather}
          title={"weather"}
        />
        <SelectInput
          options={Visibility}
          value={visibility}
          stateChange={setVisibility}
          title={"visibility"}
        />
        <TextInput value={comment} setValue={setComment} title={"comment"} />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

const InputErrors = ({ errors }: { errors: string[] }): JSX.Element => {
  return (
    <div>
      {errors.map((error) => (
        <p style={{ color: "red ", fontSize: "medium" }}>{error}</p>
      ))}
    </div>
  );
};

type TextInputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
};

const TextInput = ({ value, setValue, title }: TextInputProps) => {
  return (
    <div style={fieldStyle}>
      <p>{title}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

type EnumLike = Record<string, string | number>;

type SelectInputProps<T extends EnumLike> = {
  options: T;
  value: T[keyof T];
  stateChange: React.Dispatch<React.SetStateAction<T[keyof T]>>;
  title: string;
};

//generic select for weather and visibility
const SelectInput = <T extends EnumLike>({
  options,
  value,
  stateChange,
  title,
}: SelectInputProps<T>): JSX.Element => {
  return (
    <div style={{ ...fieldStyle, gap: "0.3rem" }}>
      <p>{title}: </p>
      {getEnumKeys(options).map((key, index) => (
        <div key={key + index}>
          <label>{key}</label>
          <input
            type="radio"
            value={options[key]}
            name={"enum" + title}
            defaultChecked={value === options[key]}
            onChange={(event) => stateChange(event.target.value as T[keyof T])}
            style={{
              height: "50%",
            }}
          />
        </div>
      ))}
    </div>
  );
};

// inspiration from here https://stackoverflow.com/questions/69160507/typescript-generic-function-with-enums
const getEnumKeys = <T extends EnumLike>(e: T): Array<keyof T & string> => {
  //object keys will return strings only
  return Object.keys(e) as Array<keyof T & string>;
};
