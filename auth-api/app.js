import express from "express"

import * as db from './src/config/initialData.js';
import UserRoute from "./src/modules/routes/UserRoute.js"

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

db.createInicialData();

app.get('/api/status', (req, res) => {
    return res.status(200).json({
        service: 'Auth-API', 
        status: "up-up",
        httpStatus:200
    });
});

app.use(express.json());
app.use(UserRoute);


app.listen(PORT, () => {
    console.info(`Server sarted sucessfully at port ${PORT}`);
});