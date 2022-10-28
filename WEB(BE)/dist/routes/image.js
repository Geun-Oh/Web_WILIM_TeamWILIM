"use strict";

var _express = _interopRequireDefault(require("express"));
var _multer = require("../multer.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/upload', function (req, res, next) {
  res.render("multer.ejs");
});
router.post('/upload', _multer.upload.single('image'), function (req, res, next) {
  if (!req.file) return res.status(400).json("cannot find the ImageFile!");
  res.send(req.file);
});
module.exports = router;