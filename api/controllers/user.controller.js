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
        }}
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
    
};

export const deleteUser = async(req,res,next)=>{
    if(!req.user.isAdmin && req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You Are Not Authorized To Delete This Account'))
    }

    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('Account Has Been Deleted');
    }catch(error){
        next(error);
    }
}

export const signout =(req,res,next)=>{
    try{
        res.clearCookie('access_token').status(200).json('User Has Been Signed Out');
    }catch(error){next(error)}
}

export const getUsers = async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not permitted'))
    }
    try{
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.sort === 'asc' ? 1 : -1

        const users = await User.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit)

        const usersWithoutPassword = users.map((user=>{
            const{password,...rest} = user._doc;
            return rest;
        }))

        const totalUsers = await User.countDocuments()

        const now = new Date()

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthUsers = await User.countDocuments({
            createdAt: {$gte: oneMonthAgo}
        })

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers
        })
    }catch(error){
        next(error);
    }
}

export const getUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.userId);
        if (!user){
            return next(errorHandler(404, 'User Not Found'))
        }
        const {password, ...rest} = user._doc
        res.status(200).json(rest);
    }catch(error){
        next(error);
    }
}