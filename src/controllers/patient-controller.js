const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const handleRequest = require('../utils/handle-request');
const buildResponse = require('../utils/build-response');
const patientService = require('../services/patient-service');
const JWTMiddleware = require('../middlewares/jwt');
const patientRouter = require('express').Router();

module.exports = () => {
    patientRouter.post(
        '/',
        [JWTMiddleware.verifyToken],
        validator.body(
            Joi.object({
                name: Joi.string().required(),
            }),
        ),
        handleRequest(
            async (req) => await patientService.createPatient(req.body),
        ),
        buildResponse(),
    );
    patientRouter.get(
        '/:id',
        [JWTMiddleware.verifyToken],
        handleRequest(
            async (req) => await patientService.getPatientById(req.params.id),
        ),
        buildResponse(),
    );
    patientRouter.get(
        '/',
        [JWTMiddleware.verifyToken],
        validator.query(
            Joi.object({
                q: Joi.string().required().allow(''),
            }),
        ),
        handleRequest(
            async (req) => await patientService.getAllPatients(req.query.q),
        ),
        buildResponse(),
    );
    return patientRouter;
};
