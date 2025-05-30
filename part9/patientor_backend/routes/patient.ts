import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import {newEntrySchema, newPatientSchema} from '../utils';
import { z } from 'zod';
import { NewPatient, Patient } from '../types';


const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
}

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
      newEntrySchema.parse(req.body);
      next();
    } catch (error: unknown) {
        next(error);
    }
}

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res) => {
    res.send(patientService.getPatient());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    // try {
    //     const newPatient = newPatientSchema.parse(req.body);
    //     const addedPatient = patientService.addPatient(newPatient);
    //     res.send(addedPatient);
    // } catch (error: unknown) {
    //     if (error instanceof z.ZodError) {
    //         res.status(400).send({error: error.issues});
    //     }
    //     else {
    //         res.status(400).send({error: 'unknown error'});
    //     }
    // }
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient)
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  res.send(patientService.getOnePatient(id))
})

router.post('/:id/entries', newEntryParser, (req, res) => {
  const id = req.params.id
  const addedEntry = res.send(patientService.addEntry(id, req.body));
  res.json(addedEntry)
})

router.use(errorMiddleware);

export default router;