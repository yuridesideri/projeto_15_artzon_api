import { wallpapersCol } from "../database.js";

export async function wallpaperGetGenericMdw (req, res, next) {
    try {
        const wallpapers = await wallpapersCol.find({}).toArray();
        res.locals.wallpapers = wallpapers;
        next()
    } catch (err) {
        res.status(400).send("Generic Error");
    }
}