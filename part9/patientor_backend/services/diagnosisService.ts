import diagnosisData from '../data/diagnoses'

import { Diagnosis } from '../types'

const getDiagnosis = (): Diagnosis[] => {
    return diagnosisData;
}

export default {
    getDiagnosis
}