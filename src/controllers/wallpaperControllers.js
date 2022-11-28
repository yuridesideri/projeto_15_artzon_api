import { usersCol, wallpapersCol } from "../database.js";



export async function wallpaperGetGenericCtrl(req, res) {
    try {
        const wallpapers = res.locals.wallpapers;
        wallpapers.forEach(wallpaper => delete wallpaper.owners)
        res.status(200).send(wallpapers);
    } catch (err) {
        res.status(400).send("Generic Error");
    }
}


export async function buyWallpaperCtrl(req, res) {
    const userData = res.locals.userdata;
    const {wallpaperName} = req.body;
    console.log(wallpaperName)
    try {
        const {wallpaperPrice} = await wallpapersCol.findOne({wallpaperName});
        console.log('passou a')
        if (!wallpaperPrice) throw 'Wallpaper doesnt exist';
        if (userData.artcoins - wallpaperPrice < 0) throw "No credit";
        await usersCol.updateOne({_id:userData._id}, {$inc:{artcoins: wallpaperPrice * -1}});
        await usersCol.updateOne({_id:userData._id}, {$addToSet:{wallpapers: wallpaperName}});
        res.status(200).send("ok");
    } catch (err) {
        if (err === 'No credit') res.status(400).send('No credit');
    }
}




export async function downloadWallpaperCtrl(req,res){
    const userData = res.locals.userdata;
    const wallpaperToDownload = req.body.wallpaperName;
    try {
        console.log(userData)
        if (userData.wallpapers?.find(wallpaper => wallpaper === wallpaperToDownload)) {
            res.status(200).send('OK');
        }
        else throw "Not Bought";
    } catch (err) {
        res.status(400).send(err);
    }
}