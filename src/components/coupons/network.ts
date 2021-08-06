import "reflect-metadata";
import { answer } from "../../routes/response";
import { couponValidate, emailValidate } from "../../routes/validations";
import {queryCoupon, addCoupon, emailAsigned, notAssigned, allCoupons} from "./controller"

const express = require("express");
const appCoupons = express()

appCoupons.get("/",async function(req, res){
    
    let reqEmail = req.query.email;
    let reqCode = req.query.coupon;

    //Se ingresan ambos queriy string para comprobar correspondencia de un cupon
    if(reqEmail != null && reqCode != null){
        await queryCoupon(reqEmail, reqCode, req, res)
    }else{
        await allCoupons(req, res)
    }

    
})

appCoupons.post("/", async function (req, res){

    let code = req.body.coupon;
    console.log(code)

    
    await couponValidate.validateAsync({code})
        .then(() => {
            addCoupon(code, req, res)
        })
        .catch(e =>{
            answer(req, res, 422, e)
        })

   

})

appCoupons.patch("/", async function (req, res){
    let email = req.body.email
    let code = req.body.coupon

    await emailValidate.validateAsync({email})
        .then(() => {
            emailAsigned(email, code, req, res)
        })
        .catch(e =>{
            answer(req, res, 422, e)
        })

})

appCoupons.delete("/:id", async function (req, res){
    let id = req.params.id;

    // se controla existencia del id y si no tiene mail asignado se elimina
    await notAssigned(id, req, res)
})

export default appCoupons;


