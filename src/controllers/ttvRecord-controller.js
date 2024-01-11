const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const handleRequest = require('../utils/handle-request');
const buildResponse = require('../utils/build-response');
const TTVService = require('../services/ttv-service');
const JWTMiddleware = require('../middlewares/jwt');

const ttvRouter = require('express').Router();

module.exports = () => {
    ttvRouter.post(
        '/',
        [JWTMiddleware.verifyToken],
        validator.body(
            Joi.object({
                patient_id: Joi.number().required(),
                temperature: Joi.number().required(),
                pulse: Joi.number().required(),
                respiration: Joi.number().required(),
                systolic_bp: Joi.number().required(),
                diastolic_bp: Joi.number().required(),
            }),
        ),
        handleRequest(async (req) => await TTVService.createTTV(req.body)),
        buildResponse(),
    );
    ttvRouter.get(
        '/:id',
        [JWTMiddleware.verifyToken],
        handleRequest(
            async (req) => await TTVService.getTTVById(req.params.id),
        ),
        buildResponse(),
    );
    ttvRouter.get(
        '/',
        [JWTMiddleware.verifyToken],
        handleRequest(async () => await TTVService.getAllTTV()),
        buildResponse(),
    );
    return ttvRouter;
};
