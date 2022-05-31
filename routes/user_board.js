const express = require("express");
const router = express.Router();
const board_ctrl = require("../controller/board_ctrl");
const multer = require("../middlewares/image");

router.get("/", board_ctrl.output.main);
router.get("/loading/:num", board_ctrl.output.loading);

router.post("/upload", multer.uploadAction.array("images", 10), board_ctrl.process.upload);
router.post("/edit/:num", board_ctrl.process.edit);
router.post("/delete/:num", board_ctrl.process.delete);

module.exports = router;