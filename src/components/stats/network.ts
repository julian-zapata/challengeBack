import "reflect-metadata";
import { answer } from "../../routes/response";
import { couponAsigned, couponAsignedPerDay, couponCreatedPerDay, couponExists, couponNotAsigned } from "./controller";

const express = require("express");
const appStats = express()


appStats.get("/", async function(req, res){

   
    let numberCouponsExisting = await couponExists()
    let numberCouponsAsigned = await couponAsigned()
    let numberCouponsNotAsigned = await couponNotAsigned()
    let numberCouponsAsignedPerDay = await couponAsignedPerDay()
    let numberCouponsCreatedPerDay = await couponCreatedPerDay()

    answer(req, res, 201, {
        numberCouponsExisting,
        numberCouponsAsigned,
        numberCouponsNotAsigned,
        numberCouponsAsignedPerDay,
        numberCouponsCreatedPerDay
    })

})

export default appStats; 