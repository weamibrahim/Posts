const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    
    postId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comments: [{
        body: {
            type: String,
            required: true
        }
        ,userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }]
    
   
})

module.exports = mongoose.model('Comment', commentSchema)