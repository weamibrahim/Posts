const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const postSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
  posts:[{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title : {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
}
]
  
})
module.exports = mongoose.model('Post', postSchema)