import User from "../model/user.model.js";

export const signup = async (req,res) => {
    const {username, email, password}=req.body;

    if(!username || !email || !password || username==='' || email==='' || password===''){
        return res.status(400).json({message:'all field required'});
    
    }
    const newUser=new User({
        username,
        email,
        password,
    });
    
    await newUser.save();
    res.json('signup successfuly!!')
};