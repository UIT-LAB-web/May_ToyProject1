
const express = require("express");
const router = express.Router();
const board_ctrl = require("../controller/board_ctrl");
const multer = require("../middlewares/image");

router.get("/", board_ctrl.output.main);
router.get("/upload", board_ctrl.output.upload);
router.get("/edit/:num", board_ctrl.output.edit);
router.get("/loading/:num", board_ctrl.output.loading);

router.post("/", board_ctrl.output.main);
router.post("/upload", multer.uploadAction.array("images", 10), board_ctrl.process.upload);
router.post("/edit/:num", board_ctrl.process.edit);
router.post("/loading/:num", board_ctrl.process.loading);

module.exports = router;