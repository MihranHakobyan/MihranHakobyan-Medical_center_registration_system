const express = require('express');
const configs = require('./config/configs');
const sequelize = require('./db/connection');
const PORT = configs.PORT || 3000;
const errorMiddleware = require('./middlewares/error');
const routes = require('./routes/index');
const corn = require('node-cron');
const ReminiscentService = require('./services/reminiscent');

const app = express();


app.use(express.json());
app.use(errorMiddleware);

//BASE URL
app.use('/api/v1/', routes);


async function start() {
    try {
        app.listen(PORT, async () => {
            console.log('server runing...');
        });
        await sequelize.authenticate();
        console.log(`databes seqsesfuly contacted`);
        corn.schedule('0 0 23 * * ', ReminiscentService());

    } catch (err) {
        console.log(err.message);
    }
}

start();