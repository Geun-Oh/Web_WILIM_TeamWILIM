"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// communityAPI의 게시글에 달린 댓글들을 위한 model

var commentSchema = new _mongoose["default"].Schema({
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  username: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    "default": Date.now
  },
  post: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Post'
  }
});
commentSchema["static"]('dateFormatting', function (date) {
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  return "".concat(year).concat(month).concat(day, "-").concat(hours).concat(minutes);
});
var Comment = _mongoose["default"].model("Comment", commentSchema);
var _default = Comment;
exports["default"] = _default;