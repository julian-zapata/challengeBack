import "reflect-metadata";
import { getRepository, getConnection, IsNull} from "typeorm";
import { Coupons } from "../../entity/Coupons";
import moment = require("moment");
import { answer } from "../../routes/response";
import { ENOTEMPTY } from "constants";

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
            let response = "no correspondence"
            answer(req, res, 404, {response, data})
        }
        answer(req, res, 200, data)
    })
    .catch(e => {
        let error = "Error"
        answer(req, res, 404, {error, e})
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
        let response = `coupon ${code} successfully created`
        answer(req, res, 201, {response, data} )
    })
    .catch(e => {
        let response = "invalid coupon"
        answer(req, res, 422, {response, e})
    })
}

async function emailAsigned(email, code, req, res) {
    await getRepository(Coupons)
    .createQueryBuilder("coupon")
    .where("coupon.email = :email", { email: email })
    .getOne()
    .then(data =>{
        if(data.code != null){
            let response = `user ${data.email} has a coupon assigned`
            answer(req, res, 422, {response, data})
        }
    })
    .catch(e =>{
        updateCoupon(email, code, req, res)
    })
}

async function updateCoupon(email, code, req, res){
    //npm moment para formatear fecha
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
        if(data.affected == 0){
            let response = "invalid or not registered coupon"
            answer(req, res, 422, {response, data})
        }
        let response = "updated successfully"
        answer(req, res, 201, {response, data})
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
            let response = "id asingned, cannot be deleted"
            answer(req, res, 404, {response, data} )
        }else{
            delCoupon(id, req, res)
        }
    })
    .catch(e => {
        let response = "id nonexistent"
        answer(req, res, 404, { response, e})
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
            let response = "id non-existent"
            answer(req, res, 404, {response, data} )
        }
        let response = "coupon deleted"
        answer(req, res, 201, {response, data} )
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
