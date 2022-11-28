import fs from "fs";
import path from "path";
import { wallpapersCol } from "./database.js"

const __wallpaperDir = path.normalize("./public/wallpapers/");
const wallpapersFiles = fs.readdirSync(__wallpaperDir);
const MAX_WALLPAPER_PRICE = 25;

function generateWallpaperPrice(max) {
    return Math.floor((Math.random() * max) + 1);
}

for (let i = 0; i < wallpapersFiles.length; i++){
    wallpapersCol.insertOne({wallpaperName: wallpapersFiles[i], wallpaperPrice: generateWallpaperPrice(MAX_WALLPAPER_PRICE), owners: []})
}

