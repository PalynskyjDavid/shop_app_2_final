const Cart = require('../../schemas/CartSchema.js');
const Response = require('../../utilities/response');


async function getAll(req, res) {
    //console.log(`Getting all carts`);
    try {
        const carts = await Cart.find()
        return new Response(carts).success(res)
    } catch (e) {
        return new Response(cart, e.message).error500(res)
    }
}

module.exports = getAll;