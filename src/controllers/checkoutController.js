import { sessionsCol, usersCol } from "../database.js";




export async function updateCoinsCtrl (req,res) {
    try{
        const artcoins = req.body.artcoins;
        const token = req.headers.authentication?.replace("Bearer ", "");
        const {userId} = await sessionsCol.findOne({token});
        if (!userId) throw "Sem userId";
        const response = await usersCol.updateOne({_id: userId}, {$inc:{artcoins: artcoins}});
        res.status(200).send("Ok");
    }  catch (err) {
        res.status(400).send('Generic Error')
    }
}