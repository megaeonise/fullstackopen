import { z } from 'zod';
import { newPatientSchema } from './utils';

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}


export enum HealthCheckRating {
  "Healthy" = 0, //green
  "LowRisk" = 1, //yellow
  "HighRisk" = 2, //orange
  "CriticalRisk" = 3 //red
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

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
    occupation: string,
    entries: Entry[]
}

export type NonSsnPatient = Omit<Patient, "ssn">;
export type NewPatient = z.infer<typeof newPatientSchema>; 
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// type EntryWithoutId = UnionOmit<Entry, 'id'>;