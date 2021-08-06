import "reflect-metadata";
import { getRepository, getConnection} from "typeorm";
import { Coupons } from "../../entity/Coupons";
import moment = require("moment");
import { answer } from "../../routes/response";

const time = require("moment")

async function allCoupons(req, res) {
    await getRepository(Coupons)
    .createQueryBuilder("coupons")
    .getMany()
    .then(data => {
        answer(req, res, 200, {data})
        
    })
    .catch(e => {
        answer(req, res, 404, e)
    })
}

async function queryCoupon(email, code, req, res) {

    await getRepository(Coupons)
    .createQueryBuilder("coupon")
    .where("coupon.email = :email", { email: email })
    .andWhere("coupon.code = :code", {code: code})
    .getOne()
    .then(data =>{
        if(data == null){
            answer(req, res, 404, "no correspondence")
        }
        answer(req, res, 200, data)
    })
    .catch(() => {
        answer(req, res, 404, "Error")
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
    .then(() =>{
        answer(req, res, 201, `coupon ${code} successfully created`)
    })
    .catch(e => {
        answer(req, res, 422, e)
    })
}

async function emailAsigned(email, code, req, res) {
    await getRepository(Coupons)
    .createQueryBuilder("coupon")
    .where("coupon.email = :email", { email: email })
    .getOne()
    .then(data =>{
        if(data.code != null){
            answer(req, res, 422, `el usuario ${data.email} tiene cupon asignado`)
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
        answer(req, res, 201, data)
    })
    .catch(e =>{
        answer(req, res, 422, e)
    })
}

async function notAssigned(id, req, res) {
    await getRepository(Coupons)
    .createQueryBuilder("coupon")
    .where("coupon.id = :id", { id: id })
    .getOne()
    .then(data =>{
        if(data.email != null){
            answer(req, res, 404, "id asingned")
        }else{
            delCoupon(id, req, res)
        }
    })
    .catch(e => {
        answer(req, res, 404, "id no identificado")
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
        if(data.affected == 0){
            answer(req, res, 404, "id non-existent")
        }
        answer(req, res, 201, "cupon eliminado")
    })
    .catch(e => {
        answer(req, res, 404, e)
    })
}

export  {
    allCoupons,
    queryCoupon,
    addCoupon,
    emailAsigned,
    updateCoupon,
    notAssigned
}
