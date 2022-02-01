const Post = require('../models/Post');

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

