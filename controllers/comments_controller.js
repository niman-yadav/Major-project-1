const Post = require('../models/Post');
const Comment = require('../models/comment');
const { redirect } = require('express/lib/response');


module.exports.create = async function (req , res) {
    try{
        //console.log(req.body.post);
            let post = await Post.findById(req.body.post );
            //console.log(post);
            
            if(post)
            {
                
                //console.log('hi i am here');
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
                    
                    post.comments.push(comment);
                    post.save();  
                    
                req.flash('success', 'Comment Published!');
                if(req.xhr)
                {
                    console.log('Wait');
                    comment = await comment.populate('user', 'name');
                    return res.status('200').json({
                        data:{
                            comment:comment
                        },message:"comment created!"
                    });

                }

                    
                    res.redirect('/');
            }
        }
        catch(err){
                
            console.log(err);
            req.flash('error', err);
            return;

        }
    
};

module.exports.destroy = async function(req, res)
{
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id)
        {
            let postId = comment.post;
            comment.remove();

            let post = await Post.findByIdAndUpdate(postId , { $pull : {comments: req.params.id}});


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            return res.redirect('back');
        }
        else 
        {
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log(err.responseText);
        return ;
    }
    
}

