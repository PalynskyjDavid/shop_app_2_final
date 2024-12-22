const Cart = require('../../schemas/CartSchema.js');
const Response = require('../../utilities/response');


async function createOne(req, res) {
    //console.log(`Creating cart with name ${req.body.name}`);
    try {
        const cart = new Cart({ ...req.body });
        const newCart = await cart.save();

        // console.log(cart);
        // console.log(newCart)

        if (!newCart) {
            return new Response(cart, newCart).error400(res);
        }

        return new Response(newCart, 'Cart created successfully').success(res);
        
    } catch (e) {
        return new Response(cart, newCart).error500(res);
    }
}

module.exports = createOne;