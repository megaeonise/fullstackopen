import patientData from '../data/patients'

import { NonSsnPatient, Patient, NewPatient } from '../types'
import { v1 as uuid } from 'uuid'

const getPatient = (): NonSsnPatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = ( patient: NewPatient ): Patient => {
    const id = uuid();
    const newPatient = {
        id: id,
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
    addPatient
}