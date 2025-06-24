import data from "../../data/patients";
import {NewPatientEntry, NonSensitivePatient, Patient} from "../types";
import {v4 as uuidv4} from 'uuid';

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

const addNewPatient = (patient: NewPatientEntry): Patient => {
    const newPatient: Patient = {...patient, id: uuidv4()};
    data.push(newPatient);
    return newPatient;
};

export default {
    getAllPatients,
    addNewPatient,
    getPatient
};
