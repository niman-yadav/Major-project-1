module.exports.users_profile = function(req , res)
{
    return res.render('user_profile.ejs',{
        title:'Profile'
    });
}