require('dotenv').config();
const express = require('express');
const cors = require('./middlewares/cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./db/index');
const { PORT } = process.env;
const authController = require('./controllers/auth-controller');
const patientController = require('./controllers/patient-controller');
const ttvController = require('./controllers/ttvRecord-controller');

async function setupRoutes(app) {
    app.use('/', authController());
    app.use('/patients', patientController());
    app.use('/ttv', ttvController());
}

(async () => {
    try {
        const app = express();
        app.use(express.json());
        app.use(cors);
        app.use(morgan('combined'));
        sequelize.sync();

        app.use(bodyParser.urlencoded({ extended: true }));
        await setupRoutes(app);
        app.listen(PORT || 8080, () => {
            console.log(`ttv-app listening at port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();
