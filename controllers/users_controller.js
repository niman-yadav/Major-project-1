const User = require('../models/user.js');
module.exports.users_profile = function(req , res)
{
    return res.render('user_profile.ejs',{
        title:'Profile'
    });
}
//render the signup page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}
// render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get sign up data
module.exports.create = function(req , res){
    //to do later
    console.log('hii');
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
        if(!user)
        {

            User.create(req.body , function(err, user){
                if(err)
                {
                    console.log(`Error in creating user while signing up ${err}`);
                    return;
                }
                console.log('Successful in creating user');
            })
            return res.redirect('/users/sign-in');
        }
        else
        {
            console.log('User found or password mismatch');
            return res.redirect('back');
        }
       
    });


}
// create session
module.exports.createSession = function(req ,res)
{
    //Todo later
}