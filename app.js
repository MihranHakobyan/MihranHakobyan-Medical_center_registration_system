const express = require('express');
const bodyParser = require('body-parser');
const configs = require('./config/configs');
const sequelize = require('./db/connection');
const PORT = configs.PORT || 3000;
const errorMiddleware = require('./middlewares/errorMidleware');
const routes=require('./routes/index')



const app = express();


app.use(bodyParser.json());
app.use(errorMiddleware);

//BASE URL
app.use('/api/v1/',routes)


async function start() {
    try {
        app.listen(PORT, async () => {
            console.log('server runing...');
        });
        await sequelize.authenticate();
        console.log(`databes seqsesfuly contacted`);
    } catch (err) {
        console.log(err.message);
    }
}

start();