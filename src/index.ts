import "reflect-metadata";
import { createConnection } from "typeorm";
import router from "./routes/route";
const express = require('express')
const bodyParser = require('body-parser')

const app = express();
createConnection()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(router)

app.listen(3000)
console.log("escuchando puerto 3000")

