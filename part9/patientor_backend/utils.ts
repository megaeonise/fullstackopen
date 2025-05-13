import { NewPatient } from './types';

const toNewPatient = (object: unknown): NewPatient => {
  const newPatient: NewPatient = {
    // ...
  };

  return newPatient;
};

export default toNewPatient;