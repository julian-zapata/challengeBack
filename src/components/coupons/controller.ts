import "reflect-metadata";
import { getRepository, getConnection} from "typeorm";
import { Coupons } from "../../entity/Coupons";
import moment = require("moment");
const response = require("../../routes/response")
const time = require("moment")

async function queryCoupon(email, code, req, res) {

    await getRepository(Coupons)
    .createQueryBuilder("coupon")
    .where("coupon.email = :email", { email: email })
    .andWhere("coupon.code = :code", {code: code})
    .getOne()
    .then(data =>{
        if(data == null){
            response.answer(req, res, 422, "No existe correspondencia")
        }
        response.answer(req, res, 200, data)
    })
    .catch(e => {
        response.answer(req, res, 422, "Error", e)
    })
}

async function addCoupon(code, req, res){
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Coupons)
    .values([
        { code: code }, 
    ])
    .execute()
    .then(data =>{
        response.answer(req, res, 201, `creado con exito, ${code}`)
    })
    .catch(e => {
        response.answer(req, res, 422, e)
    })
}

async function emailAsigned(email, code, req, res) {
    await getRepository(Coupons)
    .createQueryBuilder("coupon")
    .where("coupon.email = :email", { email: email })
    .getOne()
    .then(data =>{
        if(data.code != null){
            response.answer(req, res, 422, `el usuario ${data.email} tiene cupon asignado`)
        }
    })
    .catch(e =>{
        updateCoupon(email, code, req, res)
    })
}

async function updateCoupon(email, code, req, res){
    let time = moment() 

    await getConnection()
    .createQueryBuilder()
    .update(Coupons)
    .set({ 
        email: email,
        assigned: time.format("YYYY-MM-DD HH:mm:ss"),
    })
    .where("code = :code", { code: code })
    .execute()
    .then(data => {
        response.answer(req, res, 201, data)
    })
    .catch(e =>{
        response.answer(req, res, 422, e)
    })
}

async function notAssigned(id, req, res) {
    await getRepository(Coupons)
    .createQueryBuilder("coupon")
    .where("coupon.id = :id", { id: id })
    .getOne()
    .then(data =>{
        if(data.email != null){
            response.answer(req, res, 404, "el id del cupon está asignado")
        }
        
        delCoupon(id, req, res)

    })
    .catch(e => {
        response.answer(req, res, 404, "id no identificado", e)
    })
}

async function delCoupon(id, req, res){
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Coupons)
    .where("id = :id", { id: id })
    .execute()
    .then(data => {
        response.answer(req, res, 201, "cupon eliminado")
    })
    .catch(e => {
        response.answer(req, res, 422, e)
    })
}

module.exports = {
    queryCoupon,
    addCoupon,
    emailAsigned,
    notAssigned
}
