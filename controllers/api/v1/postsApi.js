const Post = require('../../../models/Post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req, res){

    let posts = await Post.find({}).populate('user')
        .sort('-createdAt')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    res.status(200).json({
        message: 'List of Posts',
        posts : posts
    });
}


module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id );
    
        // if(post.user == req.user.id)
        // {
            post.remove();
            //console.log('Hii');
            await Comment.deleteMany({post: req.params.id});
           // console.log("check");
            // if(req.xhr){
                
            //     return res.status('200').json({
            //         data:{
            //             post_id:req.params.id,
            //         },message:"Post deleted!"
            //     });

            // }
            // req.flash('success', 'Post deleted!');
            return res.status(200).json({
                message: `post and associated comments deleted successfully ${req.params.id}`
            });
        // }
        // else{
        //     req.flash('error', 'You cannot delete this post!');
        //     return res.redirect('back');
        // }
    }catch(err){
        console.log(`Error in finding the post with id : ${req.params.id} , ${err}`);
        return res.status(500).json({
            message:`Error in finding the post with id : ${req.params.id} , ${err}`
        });
    }
   
}