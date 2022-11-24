import { usersCol } from "../database.js";
import bcrypt from "bcrypt";
import { authSignInSchema, authSignUpSchema } from "../models/models.js";



export async function userSignUpMdw (req, res, next){
    try{
        const userData = req.body;
        const validUserData = await authSignUpSchema.validateAsync(userData);
        const {username, email, password} = validUserData;
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
    try {
        const userData = req.body;
        const validUserData = await authSignInSchema.validateAsync(userData);
        const {email} = validUserData;
        const userExists = await usersCol.findOne({email});
        if (!userExists) throw notFoundUserError;

        res.locals.user = userExists;

        next();
    } catch ( err ) {
        if (err === notFoundUserError) res.status(400).send(err);
        else res.status(400).send(err);
    }
}
