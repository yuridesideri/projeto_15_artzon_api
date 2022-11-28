import { sessionsCol, usersCol } from "../database.js";
import {v4 as uuid} from "uuid";


export async function userSignUpCtrl (req, res) {
    const userData = res.locals.user;
    try{
        await usersCol.insertOne({...userData, artcoins: 0});
        res.sendStatus(201);
    } catch ( err ) {
        console.log( err );
        res.sendStatus(400);
    }
}

export async function userSignInCtrl (req, res) {
    const token = uuid();
    const { _id, email } = res.locals.user;
    const session = {email, token, userId: _id};
    try{
        const userIsInSession = await sessionsCol.findOne({userId: _id});
        if (userIsInSession) {
            await sessionsCol.updateOne({userId: _id, email}, {$set:{token}});
        }
        else {
            await sessionsCol.insertOne(session);
        }
        res.status(200).send(session);
    } catch ( err ) {
        res.status(400).send(err);
    }
}

export async function getUserDataCtrl (req, res) {
    try{
        
        const userData = res.locals.userdata;
        res.status(200).send(userData);
    } catch (err) {
        res.status(400).send("Generic Error");
    }
}