import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import router from './routes';
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(router);
createConnection()
  .then(async (connection) => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
