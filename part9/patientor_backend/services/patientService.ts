import patientData from '../data/patients'

import { NonSsnPatient, Patient, NewPatient } from '../types'
import { v1 as uuid } from 'uuid'

const getPatient = (): NonSsnPatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation, entries})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
}

const getOnePatient = ( id: string ): Patient => {
    const patient = patientData.filter((p) => p.id === id)[0]
    console.log(patient)
    return patient;
}

const addPatient = ( patient: NewPatient ): Patient => {
    const id = uuid();
    const newPatient = {
        id: id,
        ...patient
    };
    patientData.push(newPatient as Patient);
    return newPatient as Patient;
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