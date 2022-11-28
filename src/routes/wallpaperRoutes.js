import { Router } from "express";
import { wallpaperGetGenericCtrl, buyWallpaperCtrl, downloadWallpaperCtrl } from "../controllers/wallpaperControllers.js";
import { wallpaperGetGenericMdw } from "../middlewares/wallpapersMiddlewares.js"
import { authenticateUserMdw } from "../middlewares/authMiddlewares.js";

const wallpaperRouter = Router();

wallpaperRouter.get("/getwallpapers", wallpaperGetGenericMdw, wallpaperGetGenericCtrl);
wallpaperRouter.post("/buy", authenticateUserMdw, buyWallpaperCtrl);
wallpaperRouter.post("/download", authenticateUserMdw, downloadWallpaperCtrl)

export default wallpaperRouter;