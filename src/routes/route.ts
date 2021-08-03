import {Router} from "express";
import { getCoupon, postCoupon, patchCoupon, deleteCoupon } from "../components/coupons/network";
import appStore from "../components/stores/network"
const router = Router()

router.get('/coupons', getCoupon )
router.post('/coupons', postCoupon)
router.patch('/coupons', patchCoupon )
router.delete('/coupons/:id', deleteCoupon)

//ruteo optimizado. Se debe optimizar el ruteo de cupones
router.use("/stores", appStore, function(req, res, next){
    next()
})

export default router