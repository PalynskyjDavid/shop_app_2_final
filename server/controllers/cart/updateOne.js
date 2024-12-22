const Cart = require('../../schemas/CartSchema.js');
const Response = require('../../utilities/response');


async function updateOne(req, res) {
    console.log(`Updating cart ${req.body.name}`);
    try {
        //console.log(req);

        if (!req.body._id) {
            return new Response(cart, 'ID parameter is required.').error400(res);
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            req.body._id,
            { ...req.body },
            { new: true, runValidators: true }
            //!! runValidator- možná není potřeba cartValidation !!
        );

        if (!updatedCart) {
            console.log('updatedd',updatedCart)
            return new Response(updatedCart, `Cart with ID '${req.body._id}' doesn't exist.`).error400(res);
        }

        return new Response(updatedCart, 'Cart updated successfully.').success(res);
    } catch (e) {
        //console.log("fasada", e)
        return new Response(null, e.message).error500(res);
    }
}

module.exports = updateOne;