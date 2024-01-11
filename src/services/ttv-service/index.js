const TTVRepository = require('../../repositories/ttv-repository');
const PatientRepository = require('../../repositories/patient-repository');

class TTVService {
    static async createTTV(ttv) {
        ttv.record_date = new Date();
        const createdTTV = await TTVRepository.createTTV(ttv);
        return {
            message: 'TTV created successfully',
            ttv: createdTTV,
        };
    }

    static async getTTVById(id) {
        const ttv = await TTVRepository.getTTVById(id);
        const patient = await PatientRepository.getPatientById(ttv.patient_id);
        return {
            message: 'TTV retrieved successfully',
            ttv,
            patient,
        };
    }

    static async getAllTTV() {
        const ttv = await TTVRepository.getAllTTV();
        return {
            message: 'TTV retrieved successfully',
            ttv,
        };
    }
}

module.exports = TTVService;
