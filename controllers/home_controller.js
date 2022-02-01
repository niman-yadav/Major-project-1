const Post = require("../models/Post");

module.exports.home = function(req , res){
   
   
    Post.find({}).populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err , posts){
        if(err)
        {
            console.log(`Error in displaying the posts ${err}`);
            return;
        }
        return res.render('home.ejs',{
            title : 'Codeial | Home',
            posts: posts
        })
        
    });
}

