import {Router} from "express";
import appCoupons from "../components/coupons/network";
// import { getCoupon, postCoupon, patchCoupon, deleteCoupon } from "../components/coupons/network";
import appStore from "../components/stores/network"
const router = Router()


router.use("/coupons", appCoupons, function(next){
    next()
})

router.use("/stores", appStore, function(next){
    next()
})

export default router