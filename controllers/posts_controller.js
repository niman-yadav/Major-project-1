const Post = require('../models/Post');
const Comment = require('../models/comment');
module.exports.create = function (req , res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err) {
        if(err)
        {
            console.log('Error in creating post entry in database');
            return;
        }
        return res.redirect('back');
    });
    
};

module.exports.destroy = function(req,res){
    Post.findById(req.params.id , function(err , post){
        if(err)
        {
            console.log(`Error in finding the post with id : ${req.params.id}`);
            return;
        }

        //console.log(req.user.id);
        //console.log(post.user );
       
        if(post.user == req.user.id)
        {
            post.remove();
            console.log('Hii');
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}
