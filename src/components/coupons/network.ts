import "reflect-metadata";
import { getRepository, getConnection, createConnection} from "typeorm";
import { Coupons } from "../../entity/Coupons";
import {Request, Response} from "express"
const response = require("../../routes/response")
const controller = require("./controller")


export const getCoupon = async (req: Request, res: Response): Promise<Response> =>{
    
    let reqEmail = req.query.email;
    let reqCode = req.query.coupon;

    //Se ingresan ambos queries en simultaneo para comprobar correspondencia de un cupon
    if(reqEmail != null && reqCode != null){
        await controller.queryCoupon(reqEmail, reqCode, req, res)
    }

    response.answer(req, res, 422, "debe ingresar email y cupon como parametro")
}

export const postCoupon = async  (req: Request, res: Response): Promise<Response> =>{

    let code = req.body.coupon;
    console.log(code)

    //se corrobora que el cupon tengo ocho caracteres
    if(code.length == 8){
        await controller.addCoupon(code, req, res)
    }

    response.answer(req, res, 422, "el codigo debe tener 8 caracteres")

}

export const patchCoupon = async (req: Request, res: Response): Promise<Response> =>{
    
    let emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    let email = req.body.email
    let code = req.body.coupon

    //validacion de email
    if(emailRegExp.test(email)){

        // se valida que el mail no tenga cupon asignado y se procede a asignarle uno
        await controller.emailAsigned(email, code, req, res)

    }else{
        response.answer(req, res, 422, "no es mail")
    }

}

export const deleteCoupon = async (req: Request, res: Response): Promise<Response> =>{
    let id = req.params.id;

    // se controla existencia del id y si no tiene mail asignado se elimina
    await controller.notAssigned(id, req, res)
}

