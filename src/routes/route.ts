import {Router} from "express";
import appCoupons from "../components/coupons/network";
import appStats from "../components/stats/network";
import appStore from "../components/stores/network"
const router = Router()


router.use("/coupons", appCoupons, function(next){
    next()
})

router.use("/stores", appStore, function(next){
    next()
})

router.use("/stats", appStats, function(next){
    next()
})

export default router