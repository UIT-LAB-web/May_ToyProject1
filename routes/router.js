"use strict";

const express = require("express");
const router = express.Router();

const account_ctrl = require("../controller/account_ctrl");

router.get("/", account_ctrl.output.main);
router.get("/login", account_ctrl.output.login);
router.get("/signup", account_ctrl.output.signup);
router.get("/logout", account_ctrl.output.logout);
router.get("/find", account_ctrl.output.find);
router.get("/find_id", account_ctrl.output.find_id);
router.get("/find_pw", account_ctrl.output.find_pw);

router.post("/login", account_ctrl.process.login);
router.post("/signup", account_ctrl.process.signup);
router.post("/find_id", account_ctrl.process.find_id);
router.post("/find_pw", account_ctrl.process.find_pw);
router.post("/change_pw", account_ctrl.process.change_pw);

module.exports = router;