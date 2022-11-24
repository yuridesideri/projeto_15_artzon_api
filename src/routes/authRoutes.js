import { Router } from "express";
import {userSignInMdw, userSignUpMdw} from "../middlewares/authMiddlewares.js"
import {userSignInCtrl, userSignUpCtrl} from "../controllers/authControllers.js"

const authRouter = Router();

authRouter.post('/signup', userSignUpMdw, userSignUpCtrl);
authRouter.post('/signin', userSignInMdw, userSignInCtrl);


export default authRouter;