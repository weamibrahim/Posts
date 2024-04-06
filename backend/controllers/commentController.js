
const Comment = require('../models/comment');
const auth = require('../controllers/authController');

const commentController = {
// =================================================all comment for one post ===========================================================
    commentsGet: async (postId) => {
        try {

            const comments = await Comment.findOne({ 'postId': postId }).populate('comments.userId');
            console.log("comments",comments)
            return comments.comments;

        }

        catch (error) {

            return error;

        }


    }
    ,

//  =================================================one comment for one post ===========================================================
    commentGet: async (id) => {

        try {

            const comment = await Comment.findOne({ 'comments._id': id });


            console.log(comment)
            return comment.comments.find(c => c._id == id);

        }

        catch (error) {

            return error;
        }
    }
    ,
    createComment: async ({ body, token, postId }) => {

        try {

            const user = await auth(token);
           
            let comment = await Comment.findOne({ 'postId': postId });

          
            if (!comment) {
                comment = await new Comment({ comments: [], postId });
            }
            comment.comments.push({ userId: user.id, body });
            await comment.save();
            
            console.log(comment)
            return "comment created successfully";


        }
        catch (error) {

            return error;
        }
    }

    ,
    updateComment: async ({ commentId, body, token }) => {

        try {
            console.log(commentId, body, token)
            const user = await auth(token);
            const allComments = await Comment.findOne({ 'comments._id': commentId });
            console.log(allComments)

            let comment = allComments.comments.find(c => c._id == commentId);
            console.log(comment)

            if (!comment || comment.userId.toString() !== user.id) {

                console.error('Unauthorized update attempt');
                return "Unauthorized update attempt";
            }
            comment.body = body;
            await allComments.save();
            return "comment updated successfully";


        }
        catch (error) {

            return error;
        }
    }
    , deleteComment: async ({ commentId, token }) => {

        try {
            console.log(commentId, token)
            const user = await auth(token);
            const allComments = await Comment.findOne({ 'comments._id': commentId ,'comments.userId': user.id });

            //console.log(allComments)
            if (!allComments ||  allComments.comments.every(comment => comment.userId.toString() !== user.id)) {
                console.error('Unauthorized delete attempt or user not found');
                return "Unauthorized delete attempt or user not found";
            }
            

            allComments.comments = allComments.comments.filter(c => c._id.toString() !== commentId);

           
            await allComments.save();
            return "comment deleted successfully";




        }
        catch (error) {
            console.error('Error deleting comment:', error);
            return "Error deleting comment";
        }

    }
}
module.exports = commentController