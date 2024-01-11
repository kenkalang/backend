const { models } = require('../db/index');
const StandardError = require('../utils/standard-error');

class TTVRepository {
    static async createTTV(ttv) {
        try {
            return await models.TTVRecord.create(ttv);
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error creating ttv',
                error,
            );
        }
    }

    static async getTTVByPatientId(patientId) {
        try {
            return await models.TTVRecord.findAll({
                where: {
                    patient_id: patientId,
                },
                attributes: ['id', 'record_date'],
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error getting ttv by patient Id',
                error,
            );
        }
    }

    static async getTTVById(id) {
        try {
            return await models.TTVRecord.findOne({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error getting ttv by id',
                error,
                {
                    id,
                },
            );
        }
    }

    static async getAllTTV() {
        try {
            return await models.TTVRecord.findAll({
                attributes: ['id', 'patientId', 'date'],
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error getting all ttv',
                error,
            );
        }
    }
}

module.exports = TTVRepository;
