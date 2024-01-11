const { models } = require('../db/index');
const StandardError = require('../utils/standard-error');

class UserRepository {
    static async createUser(user) {
        try {
            return await models.User.create(user);
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error creating user',
                error,
            );
        }
    }

    static async getUserByUsername(username) {
        try {
            return await models.User.findOne({
                where: {
                    username,
                },
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error getting user by username',
                error,
            );
        }
    }

    static async getUserById(id) {
        try {
            return await models.User.findOne({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error getting user by id',
                error,
                {
                    id,
                },
            );
        }
    }
}

module.exports = UserRepository;
