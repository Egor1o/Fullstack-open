import express, {NextFunction, Request, Response} from 'express';
import patientsService from "../services/patientsService";
import {NewPatientSchema} from "../utils";
import {NewPatientEntry} from "../types";
import {z} from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try{
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown){
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.get("/", (_req, res) => {
    res.send(patientsService.getAllPatients());
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res) => {
    const newPatient = patientsService.addNewPatient(req.body);
    const nonSensitivePatient = patientsService.getPatient(newPatient.id);
    return void res.status(200).json(nonSensitivePatient);
});

router.use(errorMiddleware);


export default router;