


export async function wallpaperGetGenericCtrl(req, res) {
    try {
        const wallpapers = res.locals.wallpapers;
        wallpapers.forEach(wallpaper => delete wallpaper.owners)
        res.status(200).send(wallpapers);
    } catch (err) {
        res.status(400).send("Generic Error");
    }
}