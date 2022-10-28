"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _communityAPI = require("../controller/communityAPI");
var _middleware = require("../middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
커뮤니티 게시글 정보에 대한 create, read, update, delete를 수행한다.
크게 게시글 /post 와 댓글 /comment 로 나뉘며, 각각의 route는 crud를 수행한다.
*/

var router = _express["default"].Router({
  mergeParams: true
});

//테스트용 임시 라우팅
router.get("/getAllPosts", _communityAPI.getAllPosts);
router.get("/getAllComments", _communityAPI.getAllComments);
router.get("/main", _communityAPI.getCommunityMain);
router.get("/post/renderRootPage", _communityAPI.renderPostRootPage);
router.get("/post/:id/renderEditPage", _communityAPI.renderPostEditPage);

// mongoose의 _id 값을 파라미터로 보내 crud를 진행한다.
router.get("/post/:id", _communityAPI.getPostById);
router.route("/post/:id").all(_middleware.checkOwnerMiddleware).put(_communityAPI.updatePost) // owner 권한 확인 필요
["delete"](_communityAPI.deletePost); // owner 권한 확인 필요

// "좋아요" 버튼을 누르는 기능
router.get("/post/:id/like", _communityAPI.tapLikeButton);

// username을 파라미터로 받아, 특정 User가 게시한 post만 받아 오거나, 새로운 post를 게시한다.
router.get("/user/:username/posts", _communityAPI.getPostsOfUser);
router.post("/user/:username/posts", _middleware.loggedInOnlyMiddleware, _communityAPI.addNewPost);

// 검색어를 입력받아 해당 검색어에 부합하는 post를 찾는다(regexp 이용)
router.route("/posts").get(_communityAPI.searchPosts);

// id를 파라미터로 받아, 댓글의 정보를 crud한다.
router.get("/comments/:id", _communityAPI.getComment);
router.route("/comments/:id").all(_middleware.checkOwnerMiddleware).put(_communityAPI.updateComment) // owner 권한 확인 필요
["delete"](_communityAPI.deleteComment); // owner 권한 확인 필요

// 게시글을 불러온 상태에서, 새로운 댓글을 추가하는 기능을 수행한다.
router.post("/post/:id/comments", _middleware.loggedInOnlyMiddleware, _communityAPI.addNewComment);
var _default = router;
exports["default"] = _default;