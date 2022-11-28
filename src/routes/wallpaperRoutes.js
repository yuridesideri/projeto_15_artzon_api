import { Router } from "express";
import { wallpaperGetGenericCtrl } from "../controllers/wallpaperControllers.js";
import { wallpaperGetGenericMdw } from "../middlewares/wallpapersMiddlewares.js"

const wallpaperRouter = Router();

wallpaperRouter.get("/getwallpapers", wallpaperGetGenericMdw, wallpaperGetGenericCtrl);


export default wallpaperRouter;