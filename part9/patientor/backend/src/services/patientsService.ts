import data from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

const getPatientEntries = (): Patient[] => {
  return data;
};

const makeNonSensitivePatient = (patient: Patient): NonSensitivePatient => {
  return {
    name: patient.name,
    occupation: patient.occupation,
    dateOfBirth: patient.dateOfBirth,
    id: patient.id,
    gender: patient.gender,
  };
};

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  const patients = getPatientEntries();
  return patients.map((patient: Patient) => {
    return makeNonSensitivePatient(patient);
  });
};

const findMatchingPatient = (id: string): Patient | null => {
  const matchingPatients = getPatientEntries().filter((patient) => {
    return patient.id === id;
  });
  if (matchingPatients.length === 0) return null;

  return matchingPatients[0];
};

const getNonSensitivePatient = (id: string): NonSensitivePatient | null => {
  const matchingPatient = findMatchingPatient(id);
  if (matchingPatient === null) return null;
  return makeNonSensitivePatient(matchingPatient);
};

const getPatient = (id: string): Patient | null => {
  return findMatchingPatient(id);
};

const addNewPatient = (patient: NewPatientEntry): Patient => {
  const newPatient: Patient = { ...patient, id: uuidv4() };
  data.push(newPatient);
  return newPatient;
};

export default {
  getAllNonSensitivePatients,
  addNewPatient,
  getNonSensitivePatient,
  getPatient,
};
