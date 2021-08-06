import "reflect-metadata";
import { answer } from "../../routes/response";
import { couponAsigned, couponAsignedPerDay, couponCreatedPerDay, couponExists, couponNotAsigned } from "./controller";

const express = require("express");
const appStats = express()


appStats.get("/", async function(req, res){

    let isExists = await couponExists()
    let isAsigned = await couponAsigned()
    let isNotAsigned = await couponNotAsigned()
    let isAsignedPerDay = await couponAsignedPerDay()
    let isCreatedPerDay = await couponCreatedPerDay()

    answer(req, res, 201, {
        isExists,
        isAsigned,
        isNotAsigned,
        isAsignedPerDay,
        isCreatedPerDay
    })

})

export default appStats; 