import {Gender, NewPatientEntry, Patient} from "./types";
import {v4 as uuidv4} from 'uuid';
import {z} from 'zod';

export const NewPatientSchema  = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

export const toNewPatientEntry = (entry: unknown): Patient => {
    const newEntry: NewPatientEntry = NewPatientSchema.parse(entry);
    return {...newEntry, id: uuidv4()};
};