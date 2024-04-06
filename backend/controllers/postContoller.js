const Post = require('../models/post');
const auth = require('../controllers/authController');

const postController = {

    // =====================================get all posts==================================================
    getPosts: async (token) => {
        try {
            console.log("token",token);
            const user = await auth(token);

            if (!user) {
                console.error('Unauthorized update attempt');
                return "Unauthorized update attempt";

            }
            const posts = await Post.find().populate('posts.userId');
        //    console.log('Found posts:', posts.map(post => post.userId));
        //   console.log(posts.map(post => post.posts));
 
          return   posts.map(post => post.posts).flat(); // flatten the array of arrays
         // return posts;
        
        } catch (error) {

            console.error('Error fetching posts:', error);
            return [];
        }
    },

// =====================================get posts by  id for one user==================================================
         getPostsByUserId: async (userId) => {
            console.log('getPostsByUserId called with Id:', userId);
            try {      
                const post = await Post.findOne({userId});
                console.log('Found post:', post);
                return post ? post.posts : [];
            } catch (error) {
                console.error('Error fetching posts by user ID:', error);
                return [];
            }
        }
    ,

// =====================================get one post by id==================================================
   
    
    getPostById: async (id) => {
        console.log('getPostById called with id:', id);
        try {
           // const post = await Post.findOne({ 'posts._id': id }, { 'posts.$': 1 });
            const post = await Post.findOne({ 'posts._id': id });
            console.log('Found post:', post);
            return post ? post.posts.find(p => p._id == id) : null;
        } catch (error) {
            console.error('Error fetching post by ID:', error);
            return null;
        }
    },
    

// =====================================create post==================================================
    createPost: async ({ title, body,token }) => {

        try {
            const userId = await auth(token);
           // console.log('Create post request received:', { title, body, userId });
            let post = await Post.findOne({ userId :userId.id});
            if (!post) {
                post = new Post({ userId :userId.id, posts: [] });
            }
            post.posts.push({ title, body,userId: userId.id });
            await post.save();
            return "Post created successfully";
        } catch (error) {
            console.error('Error creating post:', error);
            return "Error creating post";
        }
    },

// =====================================update post==================================================
    updatePost: async ({  postId, title, body,token }) => {
        try {
            const user = await auth(token);
            if (!user) {
                console.error('Unauthorized update attempt');
                return "Unauthorized update attempt";
            }
            console.log('Update post request received:', { user, postId, title, body });

            // Check if the user has the right to update the post
            const postToUpdate = await Post.findOne({ 'userId': user.id,'posts._id': postId });
            console.log('Post to update:', postToUpdate);

            if (!postToUpdate || postToUpdate.userId.toString()!== user.id) {
                console.error('Unauthorized update attempt');
                return "Unauthorized update attempt";
            }
              // ========================================first way==========================================

            let post= postToUpdate.posts.find(p => p._id == postId);
           
               post.title = title;
               post.body = body;
               await postToUpdate.save();
            //    ===============================second way=========================================
            // Find the index of the post within the posts array
            // const postIndex = postToUpdate.posts.findIndex(post => post._id.toString() === postId);
            // if (postIndex === -1) {
            //     console.error('Post not found in the array');
            //     return "Post not found in the array";
            // }

            // // Update the specific post within the array
            // postToUpdate.posts[postIndex].title = title;
            // postToUpdate.posts[postIndex].body = body;

            // Save the updated document
           // await postToUpdate.save();
            console.log('Post updated successfully');
            return "Post updated successfully";
        } catch (error) {
            console.error('Error updating post:', error);
            return "Error updating post";
        }
    }
,
// =====================================delete one post==================================================
    deletePost: async ({ token, postId }) => {
        try {
            const user = await auth(token);
            if (!user) {
                console.error('Unauthorized update attempt');
                return "Unauthorized update attempt";

            }
            const post = await Post.findOne({ 'posts._id': postId, 'userId': user.id });
            if (!post || post.userId.toString() !== user.id) {
                console.error('Unauthorized delete attempt');
                return "Unauthorized delete attempt";
            }
            post.posts = post.posts.filter(post => post._id.toString() !== postId);
            await post.save();
            return "Post deleted successfully";
        } catch (error) {
            console.error('Error deleting post:', error);
            return "Error deleting post";
        }
    }

// =====================================delete all posts by id==================================================
    // ,deletePosts: async ({  id,token }) => {

    //     const user = await auth(token);
    //     if (!user) {
    //         console.error('Unauthorized update attempt');
    //         return "Unauthorized update attempt";

    //     }
    //     console.log('deletePostsByUserId called with _id:', id);
    //     try {
    //         const result = await Post.findByIdAndDelete( id  );
    
    //         if (!result) {
    //             console.error('Unauthorized delete attempt or user not found');
    //             return "Unauthorized delete attempt or user not found";
    //         }
    
    //         return "Posts deleted successfully";
    //     } catch (error) {
    //         console.error('Error deleting posts:', error);
    //         return "Error deleting posts";
    //     }
    // }
    
}
module.exports = postController