import patientData from '../data/patients'

import { NonSsnPatient, Patient, NewPatient } from '../types'
import { v1 as uuid } from 'uuid'

const getPatient = (): NonSsnPatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: []
    }));
}

const getOnePatient = ( id: string ): Patient => {
    const patient = patientData.filter((p) => p.id === id)[0]
    patient.entries = []
    return patient;
}

const addPatient = ( patient: NewPatient ): Patient => {
    const id = uuid();
    const newPatient = {
        id: id,
        entries: [],
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
}

const getAllPatientData = (): Patient[] => {
    return patientData;
}

export default {
    getPatient,
    getAllPatientData,
    addPatient,
    getOnePatient
}