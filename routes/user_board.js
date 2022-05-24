
const express = require("express");
const router = express.Router();
const board_ctrl = require("../controller/board_ctrl");
const multer = require("../middlewares/image");

router.get("/", board_ctrl.output.upload);

router.post("/", multer.uploadAction.array("images", 10), board_ctrl.process.upload);

module.exports = router;