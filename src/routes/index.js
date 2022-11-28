import { Router } from "express";
import authRouter from "./authRoutes.js";
import wallpaperRouter from "./wallpaperRoutes.js";
import checkoutRouter from "./checkoutRoutes.js";

const router = Router();

router.use(authRouter);
router.use(wallpaperRouter);
router.use(checkoutRouter);

export default router;









