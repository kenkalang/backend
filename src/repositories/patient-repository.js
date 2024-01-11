const { models, Op } = require('../db/index');
const StandardError = require('../utils/standard-error');

class PatientRepository {
    static async createPatient(patient) {
        try {
            return await models.Patient.create(patient);
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error creating patient',
                error,
            );
        }
    }

    static async getPatientById(id) {
        try {
            return await models.Patient.findOne({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error getting patient by id',
                error,
                {
                    id,
                },
            );
        }
    }

    static async getAllPatients(query) {
        try {
            return await models.Patient.findAll({
                attributes: ['id', 'name'],
                where: {
                    name: {
                        [Op.like]: `%${query}%`,
                    },
                },
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error getting all patients',
                error,
            );
        }
    }
}

module.exports = PatientRepository;
