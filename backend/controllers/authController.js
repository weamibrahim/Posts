const jwt = require('jsonwebtoken');

const auth =async (Token)=>{
    const userId = jwt.verify(Token, process.env.SECRET);

    if (!userId) {
        console.error('Unauthorized update attempt');
        return "Unauthorized update attempt";
    }
   
    return userId;
}
module.exports = auth