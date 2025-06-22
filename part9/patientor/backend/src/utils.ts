import {Gender,  Patient} from "./types";
import {v4 as uuidv4} from 'uuid';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map((value) => value.toString()).includes(gender);
};

const parseName = (name: unknown) => {
  if(!name || !isString(name)){
      throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseSsn =  (ssn: unknown) => {
    if(!ssn || !isString(ssn)){
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};

const parseOccupation =  (occupation: unknown) => {
    if(!occupation || !isString(occupation)){
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseGender =  (gender: unknown) => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};

export const toNewPatientEntry = (object: unknown): Patient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if("name" in object && "ssn" in object && "dateOfBirth" in object && "gender" in object && "occupation" in object) {
        return {
            name: parseName(object.name),
            ssn: parseSsn(object.ssn),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            id: uuidv4(),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
    }

    throw new Error("incorrect entry");
};

