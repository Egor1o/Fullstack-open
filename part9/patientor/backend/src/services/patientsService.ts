import data from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";

const getEntries = (): Patient[] => {
    return data;
};

const getAllPatients = (): NonSensitivePatient[] => {
    const patients = getEntries();
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

export default {
    getAllPatients
};
