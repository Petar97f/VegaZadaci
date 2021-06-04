const express = require('express');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
// eslint-disable-next-line import/order
const fs = require('fs');

const router = express.Router();

router.param('id', userController.checkID);


router.post("/signup", authController.signup);
router.post("/login", authController.login);




router.route("/")
.get(authController.protect,authController.restrictTo("USER"),userController.getAllUsers)
.post(userController.checkBody, userController.createUser);

router.route("/:id")
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);   
router.route("/:id/:idTeam")
.patch(userController.addToTeam);



module.exports = router;