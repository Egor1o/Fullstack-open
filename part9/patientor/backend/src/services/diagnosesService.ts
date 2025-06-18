import diagnoses from "../../data/diagnoses";
import {Diagnosis} from "../types";

const getEntries = (): Diagnosis[] => {
    return diagnoses;
};

const getAllDiagnoses = () => {
    return getEntries();
};

export default {
    getAllDiagnoses
};