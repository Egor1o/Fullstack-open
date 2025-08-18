import { Gender, NewPatientEntry, Patient } from "./types";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.any()),
});

export const toNewPatientEntry = (entry: unknown): Patient => {
  //FIXME at 9.21 error prone since entries can be anything
  const newEntry: NewPatientEntry = NewPatientSchema.parse(entry);
  return { ...newEntry, id: uuidv4() };
};
