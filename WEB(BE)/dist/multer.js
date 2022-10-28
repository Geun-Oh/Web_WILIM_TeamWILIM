"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;
var _path = _interopRequireDefault(require("path"));
var _multer = _interopRequireDefault(require("multer"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
try {
  _fs["default"].readdirSync('uploads');
} catch (err) {
  console.error('No existing uploads folder, creating uploads folder...');
  _fs["default"].mkdirSync('uploads');
}
var upload = (0, _multer["default"])({
  storage: _multer["default"].diskStorage({
    destination: function destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename: function filename(req, file, done) {
      var ext = _path["default"].extname(file.originalname);
      done(null, _path["default"].basename(file.originalname, ext) + Date.now() + ext);
    },
    fileFilter: function fileFilter(req, file, done) {
      if (file.mimetype.includes("image")) {
        done(null, true);
      } else {
        done(null, false);
      }
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
exports.upload = upload;