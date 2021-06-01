const express = require('express');
const teamController = require("../controllers/teamController");
// eslint-disable-next-line import/order
const fs = require('fs');

const router = express.Router();









router.route("/")
.get(teamController.getAllTeams)
.post(teamController.checkBody, teamController.createTeam);

router.route("/:id")
.get(teamController.getTeam)
.patch(teamController.updateTeam)
.delete(teamController.deleteTeam);   

module.exports = router;