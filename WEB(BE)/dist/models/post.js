"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// communityAPI의 게시글을 위한 mongoose model

var postSchema = new _mongoose["default"].Schema({
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  username: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: [String],
  date: {
    type: String,
    "default": Date.now
  },
  hashtags: [{
    type: String
  }],
  likes: {
    type: Number,
    "default": 0
  },
  likedUsers: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});
postSchema["static"]('dateFormatting', function (date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  return "".concat(year).concat(month).concat(day, "-").concat(hours).concat(minutes);
});
var Post = _mongoose["default"].model("Post", postSchema);
var _default = Post;
exports["default"] = _default;