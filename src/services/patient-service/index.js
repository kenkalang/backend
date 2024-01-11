const PatientRepository = require('../../repositories/patient-repository');
const TTVRepository = require('../../repositories/ttv-repository');

class PatientService {
    static async createPatient(patient) {
        const createdPatient = await PatientRepository.createPatient(patient);
        return {
            message: 'Patient created successfully',
            patient: createdPatient,
        };
    }

    static async getPatientById(id) {
        const patient = await PatientRepository.getPatientById(id);
        const recordPatient = await TTVRepository.getTTVByPatientId(id);
        if (recordPatient) {
            return {
                message: 'Patient retrieved successfully',
                data: {
                    patient,
                    recordPatient,
                },
            };
        }
        return {
            message: 'Patient retrieved successfully',
            patient,
        };
    }

    static async getAllPatients(query) {
        const patients = await PatientRepository.getAllPatients(query);
        return {
            message: 'Patients retrieved successfully',
            patients,
        };
    }
}

module.exports = PatientService;
