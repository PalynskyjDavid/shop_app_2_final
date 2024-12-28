const User = require('../../schemas/UserSchema.js');
const Response = require('../../utilities/response');


async function getOne(req, res) {
    //console.log(`Getting user with id ${req.query.id}`);
    try {
        //console.log("params",req.query.id);
        if (!req.query.id) {
            return new Response(null, "Missing id query.").error400(res);
        }

        const user = await User.findById(req.query.id);
        return new Response(user).success(res);
    } catch (err) {
        return new Response(null, err.message).error500(res);
    }
}

module.exports = getOne;