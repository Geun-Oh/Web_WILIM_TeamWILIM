"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userGoalElementAPI = require("../controller/userGoalElementAPI.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
자격증 정보와 관련된 /ctfInfo
유저의 goal과 관련된 /goal/:username 으로 나눠짐.
*/

var router = _express["default"].Router();
router.route('/ctfInfo').get(_userGoalElementAPI.getAllCtfInfo) // 모든 자격증 정보 가져오기
.post(_userGoalElementAPI.postNewCtfInfo); // 새로운 자격증 추가

router.route('/ctfInfo/:id').get(_userGoalElementAPI.getCtfInfo) //해당 자격증 정보 가져오기
.put(_userGoalElementAPI.updateCtfInfo) //자격증 정보 변경
["delete"](_userGoalElementAPI.deleteCtfInfo); //자격증 삭제

router.route('/goal/:username').get(_userGoalElementAPI.getUserGoal) //해당 유저의 goal에 해당하는 자격증 정보 보여줌(res.render)
.post(_userGoalElementAPI.postNewUserGoal) //기존 goal 있으면 없애고 새로운 유저 goal 생성(goal 변경시에도 사용)
["delete"](_userGoalElementAPI.deleteUserGoal); // 기존 goal 없앰
var _default = router;
exports["default"] = _default;