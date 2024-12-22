const Cart = require('../../schemas/CartSchema.js');
const Response = require('../../utilities/response');


async function removeOne(req, res) {
    try {
        const id = req.query.id ? req.query.id : req.body.id;
        const cart = await Cart.find({ _id: id });

        //Removing
        cart = await Cart.deleteOne(cart);

        //Check if removed
        if (cart.deletedCount === 0) {
            return new Response(cart, "Cart not found").error404(res);
        }
        else {
            return new Response(cart, 'Cart deleted successfully').success(res);
        }
    }
    catch (err) {
        return new Response(req.query, err.message).error500(res);
    };
}

module.exports = removeOne;