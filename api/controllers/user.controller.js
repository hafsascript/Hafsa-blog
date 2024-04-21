import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req,res)=>{
    res.json({message: 'API is working'})
}

export const updateUser = async (req,res,next)=>{
    if (req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this user'));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10)
    }
    if (req.body.username) {
        if(req.body.username.length <8|| req.body.username.length>25){
            return next(errorHandler(400, 'Username must be between 8 and 25 characters'));
        }
        if(req.body.username.includes(' ')){
                return next(errorHandler(400, 'Username must have no gaps'));
            }
        if(req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            }, {new: true});
            const {password, ...rest} = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error){next(error)}
    }
};