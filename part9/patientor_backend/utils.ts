import { NewPatient, Gender, HealthCheckRating } from './types';
import { z } from 'zod';

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender).map(v => v.toString()).includes(param);
// };

// const parseName = (name: unknown): string => {
//   if(!isString(name)) {
//     throw new Error('incorrect or missing name');
//   }
//   return name;
// }

// const parseSsn = (ssn: unknown): string => {
//   if(!isString(ssn)) {
//     throw new Error('incorrect or missing ssn');
//   }
//   return ssn;
// }

// const parseOccupation = (occupation: unknown): string => {
//   if(!isString(occupation)) {
//     throw new Error('incorrect or missing occupation');
//   }
//   return occupation;
// }

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//       throw new Error('Incorrect or missing date: ' + date);
//   }
//   return date;
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//       throw new Error('Incorrect or missing visibility: ' + gender);
//   }
//   return gender;
// };

export const newPatientSchema = z.object({
    name: z.string().trim().min(1),
    dateOfBirth: z.string().date().trim().min(1),
    ssn: z.string().trim().min(1),
    gender: z.nativeEnum(Gender),
    occupation: z.string().trim().min(1),
    entries: z.optional(z.array(z.object({
      id: z.string().trim().min(1),
      description: z.string().trim().min(1),
      date: z.string().date().trim().min(1),
      specialist: z.string().trim().min(1),
      diagnosisCodes: z.optional(z.array(z.string().trim().min(1))),
      type: z.enum(["HealthCheck", "OccupationalHealthcare", "Hospital"]),
      healthCheckRating: z.optional(z.nativeEnum(HealthCheckRating)),
      employerName: z.optional(z.string().trim().min(1)),
      sickLeave: z.optional(z.object({
        startDate: z.string().date().trim().min(1),
        endDate: z.string().date().trim().min(1)
      })),
      discharge: z.optional(z.object({
        date: z.string().date().trim().min(1),
        criteria: z.string().trim().min(1)
      }))
    })))
    // entries: z.array(z.object({
    //   type: z.enum(["HealthCheck", "OccupationalHealthcare", "Hospital"]),
    // }))
  })

export const newEntrySchema = z.object({
  description: z.string().trim().min(1),
  date: z.string().date().trim().min(1),
  specialist: z.string().trim().min(1),
  diagnosisCodes: z.optional(z.array(z.string().trim().min(1))),
  type: z.enum(["HealthCheck", "OccupationalHealthcare", "Hospital"]),
  healthCheckRating: z.optional(z.nativeEnum(HealthCheckRating)),
  employerName: z.optional(z.string().trim().min(1)),
  sickLeave: z.optional(z.object({
    startDate: z.string().date().trim().min(1),
    endDate: z.string().date().trim().min(1)
  })),
  discharge: z.optional(z.object({
    date: z.string().date().trim().min(1),
    criteria: z.string().trim().min(1)
  }))
})

const toNewPatient = (object: unknown): NewPatient => {
  // if ( !object || typeof object !== 'object' ) {
  //   throw new Error('Incorrect or missing data');
  // }
  // if ((Object.keys(object).length === 5 || Object.keys(object).length === 6 && 'id' in object) && 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
  //   const newPatient: NewPatient = {
  //   name: parseName(object.name),
  //   dateOfBirth: parseDate(object.dateOfBirth),
  //   ssn: parseSsn(object.ssn),
  //   gender: parseGender(object.gender),
  //   occupation: parseOccupation(object.occupation),
  // };
  // return newPatient;
  // }
  // throw new Error('Incorrect data: some fields are missing');
  return newPatientSchema.passthrough().parse(object);
};

export default toNewPatient;