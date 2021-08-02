import {Router} from "express";
import { getCoupon, postCoupon, patchCoupon, deleteCoupon } from "../components/coupons/network";
const router = Router()

router.get('/coupons', getCoupon )
router.post('/coupons', postCoupon)
router.patch('/coupons', patchCoupon )
router.delete('/coupons/:id', deleteCoupon)


export default router