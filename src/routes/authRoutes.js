import { Router } from "express";
import {authenticateUserMdw, userSignInMdw, userSignUpMdw} from "../middlewares/authMiddlewares.js"
import {getUserDataCtrl, userSignInCtrl, userSignUpCtrl} from "../controllers/authControllers.js"

const authRouter = Router();

authRouter.post('/signup', userSignUpMdw, userSignUpCtrl);
authRouter.post('/signin', userSignInMdw, userSignInCtrl);
authRouter.get('/userdata', authenticateUserMdw, getUserDataCtrl);


export default authRouter;