{
    //console.log('hello world');

    // Method to delete a post from DOM

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(err){
                    console.log(err.responseText);
                }
            })
        });
    };

    //method to submit data of the form using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data)
                {
                    //console.log(data);
                    let newPost = newPostDom(data.data.post);
                    
                    $('#posts-list-container > ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    new PostComments(data.data.post._id);
                    console.log(`in the constructor function`);
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(err){
                    console.log(err.responseText);
                }
    
            });
        });

        
    }

    let newPostDom = function(post){
        //console.log(post);
        return $(`<li id="post-${post._id}">
            <p>
                
                    <small>
                        <a id = "delete-post-button" href="/posts/destroy/${post._id}">X</a>
                    </small>

                    ${post.content}
                <br>
                <small>
                ${post.user.name}
                </small>
            </p>

            <div id = "add-comment-container">
                
                    <form action="/comments/create" id="post-${ post._id }-comments-form" method="post" >
                        <input name="content" id="" placeholder="Type to add comment here" required>
                            
                    
                        <input type="hidden" name = "post" value="${post._id}">
                        <input type="submit" value="Comment">
                    
                    </form>
            

                
            </div>
            <div id="posts-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
        </li>`
        );
    }


    //convert all posts to AJAX (while on the first start of the page)

    let convertPosts = function(){
        console.log(`Hey here`);
        $(`posts-lists-container>ul>li`).each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            let postId = self.prop('id').split("-")[1]
            new PostComments(postId); 
        })
    };

    
    createPost();
    convertPosts();

    
}