import data from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";

const getEntries = (): Patient[] => {
    return data;
};

const getAllPatients = (): NonSensitivePatient[] => {
    const patients = getEntries();
    //removing ssn from patients
    return patients.map((patient: Patient) => {
        return {
            name: patient.name,
            occupation: patient.occupation,
            dateOfBirth: patient.dateOfBirth,
            id: patient.id,
            gender: patient.gender,
        };
    });
};

const getPatient = (id: string): NonSensitivePatient => {
    const matchingPatients = getEntries().filter((patient) => {
        return patient.id === id;
    });

    //patient without ssn
    if( matchingPatients.length > 0 ){
        const patient = matchingPatients[0];
        return {
            name: patient.name,
            occupation: patient.occupation,
            dateOfBirth: patient.dateOfBirth,
            id: patient.id,
            gender: patient.gender,
        };
    }

    throw new Error("Patient is not found");
};

const addNewPatient = (patient: Patient): void => {
    data.push(patient);
};

export default {
    getAllPatients,
    addNewPatient,
    getPatient
};
