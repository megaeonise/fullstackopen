// export type DiagnosisFields = 'code' | 'name' | 'latin'

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type NonSsnPatient = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;