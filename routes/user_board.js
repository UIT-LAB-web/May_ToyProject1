"use strict";

const express = require("express");
const router = express.Router();
const board_ctrl = require("../controller/board_ctrl");
const { upload } = require("../middlewares/image");

router.get("/board", board_ctrl.output.upload);

router.post("/board",upload.array("images"), board_ctrl.process.upload);

module.exports = router;