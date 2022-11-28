import { Router } from "express";
import { updateCoinsCtrl } from "../controllers/checkoutController.js";

const checkoutRoute = Router();

checkoutRoute.post('/checkout', updateCoinsCtrl);


export default checkoutRoute;