import patientData from '../data/patients'

import { NonSsnPatient, Patient, NewPatient, EntryWithoutId, Entry } from '../types'
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
    if (!newPatient.entries){
        newPatient.entries = []
    }
    patientData.push(newPatient as Patient);
    return newPatient as Patient;
}

const getAllPatientData = (): Patient[] => {
    return patientData;
}

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
    const patient = patientData.filter((p) => p.id === id)[0]
    const entryId = uuid();
    const newEntry = {
        id: entryId,
        ...entry
    }
    patient.entries.push(newEntry as Entry)
    return newEntry as Entry
}

export default {
    getPatient,
    getAllPatientData,
    addPatient,
    getOnePatient,
    addEntry
}