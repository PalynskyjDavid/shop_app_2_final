const { default: mongoose } = require('mongoose');
const Cart = require('../schemas/CartSchema.js')
const User = require('../schemas/UserSchema.js')
const Response = require('../utilities/response.js');


exports.list = async (req, res, next) => {
    next();
}

exports.create = async (req, res, next) => {
    next();
}

exports.remove = async (req, res, next) => {
    try {
        const id = req.query.id ? req.query.id : req.body.id;
        const cart = await Cart.find({ _id: id });

        //Ownership check
        if (cart.owner != id) {
            return new Response(null, `No premission to remove cart '${cart.name}' with user ID '${id}'.`).error401(res);
        }
    }
    catch (err) {
        return new Response(null, err.message).error500(res);
    };
    next()
}

exports.update = async (req, res, next) => {
    try {
        const uid = req.query.uid || req.body.uid;
        const cid = req.query.cid || req.body.cid;
        const cart = await Cart.findOne({ _id: cid });

        // Check if cart exists
        if (!cart) {
            return new Response(null, `No cart with ID '${cid}' found.`).error404(res);
        }

        // Check if the user is the owner
        if (cart.owner.toString() === uid.toString()) {
            return next();
        }

        // Check if the user is a member of the cart
        const isMember = cart.memberList.some(memberId => memberId.toString() === uid);
        if (isMember) {
            return next();
        } else {
            return new Response(null, `No permission to update cart '${cart.name}' with user ID '${uid}'.`).error401(res);
        }
    } catch (err) {
        //console.log("Error:", err);
        return new Response(null, err.message).error500(res);
    }
};