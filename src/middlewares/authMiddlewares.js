import { sessionsCol, usersCol } from "../database.js";
import bcrypt from "bcrypt";
import { authSignInSchema, authSignUpSchema } from "../models/models.js";



export async function userSignUpMdw (req, res, next){
    try{
        const userData = req.body;
        const validUserData = await authSignUpSchema.validateAsync(userData);
        const {username, password} = validUserData;
        const existUser = await usersCol.findOne( {$or:[
            {username},
            {password}
        ]} );
        if (existUser) throw "User already exists";
        validUserData.password = bcrypt.hashSync(password, 10);
        res.locals.user = validUserData;
        next();
    } catch (err) {
        if (err === "User already exists") res.status(400).send(err);
        else res.status(400).send(err);
    }
}

export async function userSignInMdw (req, res, next){
    const notFoundUserError = "This user does not exist"
    const noMatchPassword = "Passwords don't match";
    try {
        const userData = req.body;
        const validUserData = await authSignInSchema.validateAsync(userData);
        const {email, password} = validUserData;

        const userExists = await usersCol.findOne({email});
        if (!userExists) throw notFoundUserError;

        if (!bcrypt.compareSync(password, userExists.password)) throw noMatchPassword;

        res.locals.user = userExists;

        next();
    } catch ( err ) {
        if (err === notFoundUserError) res.status(400).send(err);
        if (err === noMatchPassword) res.status(400).send(err);
        else res.status(400).send(err);
    }
}

export async function authenticateUserMdw (req, res, next) {
    const sessionError = "Session Expired"
    const token = req.headers?.authentication?.replace('Bearer ', '');
    try {
        const {userId} = await sessionsCol.findOne({token});
        if (!userId) throw sessionError;
        const userData = await usersCol.findOne({_id: userId});
        res.locals.userdata = userData;
        next()
    } catch (err) {
        if ( err === sessionError) res.status(400).send(err);
        else res.status(400).send("Generic Error");
    }
    
}