const { redirect } = require('express/lib/response');
const User = require('../models/user.js');
const fs = require('fs');
const path = require('path');

module.exports.users_profile = function(req , res)
{
    User.findById(req.params.id, function(err , user){
        return res.render('user_profile.ejs',{
            title:'Profile',
            profile_user: user
        });
    });
    
}
//render the signup page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}
// render the sign in page
module.exports.signIn = function(req,res){


    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get sign up data
module.exports.create = function(req , res){
    //to do later
    
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err , user){
        if(err)
        {
            console.log('error in finding sign up data');
            return;
        }
        //console.log(user);
        if(!user)
        {

            User.create(req.body , function(err, user){
                if(err)
                {
                    console.log(`Error in creating user while signing up ${err}`);
                    return;
                }
                console.log('Successful in creating user');
                return res.redirect('/users/sign-in');
            })
           
        }
        else
        {
            console.log('User found');
            return res.redirect('back');
        }
       
    });


}
// create session
module.exports.createSession = function(req ,res)
{
    //Todo later
    req.flash('success' , 'Logged in successfully');
    return res.redirect('/');
}

module.exports.signOut = function(req, res){

    req.logout();
    req.flash('success' , 'Logged out successfully');
    return res.redirect('/');
}

module.exports.update = async function(req, res)
{
    if(req.user.id == req.params.id){
        try{
        
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res , function(err){
                if(err){
                    console.log(`############# Multer error ###########`);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    user.avatar = User.avatarPath+ '/' +req.file.filename;

                }

                user.save();
                // console.log('ji');
                return res.redirect('back');
            });
            
    
        }
        catch(err)
        {
            console.log(`Error : ${err}`);
            req.flash('error', 'Not Updated Successfully');
            return res.redirect('back');
        }  
    }
    else{
        req.flash('error', 'Not Updated Successfully');
        return res.status('401').send('unauthorized');
    }
    
}