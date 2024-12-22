const express = require("express");
const router = express.Router();

const GetController = require("../controllers/cart/getOne.js");
const ListController = require("../controllers/cart/getAll.js");
const RemoveController = require("../controllers/cart/removeOne.js");
const CreateController = require("../controllers/cart/createOne.js");
const UpdateController = require("../controllers/cart/updateOne.js");

const cartValidation = require('../validations/cart.js');

const permission = require('../utilities/permissions.js');


//router.get("/", permission.get, GetController);
router.get("/list", permission.list, ListController);
router.delete("/remove", permission.remove, RemoveController);
router.put("/create", permission.create, cartValidation.create, CreateController);
router.put("/update", permission.update, cartValidation.update, UpdateController);

module.exports = router;