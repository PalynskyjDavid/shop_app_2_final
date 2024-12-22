const User = require('../../schemas/UserSchema.js');
const Response = require('../../utilities/response');


async function getAll(req, res) {
    //console.log(`Getting all users`);
    try {
        const users = await User.find()
        return new Response(users).success(res)
    } catch (e) {
        return new Response(null, e.message).error500(res)
    }
}

module.exports = getAll;