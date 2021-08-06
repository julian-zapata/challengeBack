import { count } from "console";
import { send } from "process";
import "reflect-metadata";
import { getConnection, getRepository } from "typeorm";
import { resolveModuleName } from "typescript";
import { Coupons } from "../../entity/Coupons";
import { answer } from "../../routes/response";

export async function couponExists(){

    let a = await getConnection()
    .createQueryBuilder()
    .select("code")
    .from(Coupons, "coupons")
    .getCount()
    .then(exist => {
        let all = {exist}
        return all
    })
    .catch(e => {
        return e
    })

    return a
}

export async function couponAsigned() {
    
    let a = await getRepository(Coupons)
    .createQueryBuilder("coupons")
    .where("coupons.email is not null")
    .getCount()
    .then(asigned => {
        let all = {asigned}
        return all
    })
    .catch(e => {
        return e
    })

    return a
}

export async function couponNotAsigned() {
    
    let a = await getRepository(Coupons)
    .createQueryBuilder("coupons")
    .where("coupons.email is null")
    .getCount()
    .then(notAsigned => {
        let all = {notAsigned}
        return all
    })
    .catch(e => {
        return e
    })

    return a
}

export async function couponAsignedPerDay(){
    let a = await getRepository(Coupons)
    .createQueryBuilder("coupons")
    .select('coupons.assigned')
    .addSelect("count(coupons.assigned)")
    .groupBy("convert(coupons.assigned, date)")
    .execute()
    .then(assignedPerDay => {
        let all = {assignedPerDay}
        return all
    })
    .catch(e => {
        return e
    })

    return a
}

export async function couponCreatedPerDay(){
    let a = await getRepository(Coupons)
    .createQueryBuilder("coupons")
    .select('coupons.expired')
    .addSelect("count(coupons.expired)")
    .groupBy("convert(coupons.expired, date)")
    .execute()
    .then(createdPerDay => {
        let all = {createdPerDay}
        return all
    })
    .catch(e => {
        return e
    })

    return a
}

