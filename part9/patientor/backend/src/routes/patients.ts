import express from 'express';
import patientsService from "../services/patientsService";
import {toNewPatientEntry} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientsService.getAllPatients());
});

router.post("/", (req, res) => {

    if(!req.body){
        return void res.status(400).send('Body is missing');
    }

    try {
        const newPatient = toNewPatientEntry(req.body);
        patientsService.addNewPatient(newPatient);
        const nonSensitivePatient = patientsService.getPatient(newPatient.id);

        return void res.status(200).json(nonSensitivePatient);
    } catch (error: unknown) {
        let errorMessage = "Request body is corrupted. ";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        return void res.status(400).send(errorMessage);
    }
});


export default router;