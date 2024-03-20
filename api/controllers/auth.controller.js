import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
// import { errorHandler } from "../utils/error.js";

// import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    console.log('REQ BODY ON SIGNUP', req.body)

    const {userName, email, password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({userName, email, password: hashedPassword});

    await newUser.save().then(() => {
        res.status(201).json('User Created successfully!')
    }).catch((err) => {

        next(err)
    
    });

    // res.status(201).json('User Created successfully!')

   
}