"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//id, username, password, email, goal, plan

var passportLocalMongoose = require('passport-local-mongoose');
var userSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    maxLength: 50,
    unique: true,
    required: true
  },
  serviceType: {
    type: String,
    "enum": ['ARMY', 'NAVY', 'AIR_FORCE', 'MARINE', 'OTHER'],
    "default": 'OTHER'
  },
  snsId: {
    type: String
  },
  provider: {
    type: String,
    "default": null
  },
  personalPlanId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    // user의 Plan List의 _id 값
    ref: "PlanList",
    "default": null
  },
  goal: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "goalElement",
    "default": null
  },
  posts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  }],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  likedPosts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  }],
  selectedRound: {
    type: String
  },
  // 여러 시험 회차들 중 유저가 선택한 회차
  id: _mongoose["default"].Schema.Types.ObjectId
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
}); //로그인할때 email,password 사용

var User = _mongoose["default"].model("User", userSchema);
var _default = User;
exports["default"] = _default;