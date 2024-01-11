const {
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
} = process.env;
const { Sequelize, Op } = require('sequelize');
const UserModel = require('./models/user-model');
const PatientModel = require('./models/patient-model');
const TTVRecordModel = require('./models/ttvrecord-model');

const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        logging: false,
    },
);

const models = {
    User: UserModel(sequelize, Sequelize),
    Patient: PatientModel(sequelize, Sequelize),
    TTVRecord: TTVRecordModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

module.exports = {
    sequelize,
    models,
    Op,
};
