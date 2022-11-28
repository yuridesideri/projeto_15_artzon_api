import { Router } from "express"
import authRouter from "./authRoutes.js"
import wallpaperRouter from "./wallpaperRoutes.js"

const router = Router();

router.use(authRouter);
router.use(wallpaperRouter);


export default router;









