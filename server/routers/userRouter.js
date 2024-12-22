const express = require("express");
const router = express.Router();

const GetController = require("../controllers/user/getOne.js");
const ListController = require("../controllers/user/getAll.js");
const RemoveController = require("../controllers/user/removeOne.js");
const CreateController = require("../controllers/user/createOne.js");
const UpdateController = require("../controllers/user/updateOne.js");

const userValidation = require('../validations/cart.js');


// router.get("/", GetController);
router.get("/list", ListController);
// router.delete("/remove", RemoveController);
// router.put("/create", CreateController);
// router.put("/update", UpdateController);

module.exports = router;