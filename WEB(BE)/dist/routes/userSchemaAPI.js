"use strict";

var _express = _interopRequireDefault(require("express"));
var _userSchemaAPI = require("../controller/userSchemaAPI.js");
var _middleware = require("../middleware");
var _error = _interopRequireDefault(require("../utils/error.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
기본적인 유저 정보에 대한 create, read, update, delete를 수행한다.
기본 유저 정보는 id, username, password, email, goal, plan으로 구성된다.
위의 구성 요소들을 모두 인자로 받는다.
*/

var passport = require("passport");
var router = _express["default"].Router();
router.route('/').get(_userSchemaAPI.getUsers); // 모든 유저 가져옴

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      throw new _error["default"](404, "오류가 발생했습니다");
    }
    res.send("<script type=\"text/javascript\">alert(\"\uB85C\uADF8\uC544\uC6C3 \uB418\uC5C8\uC2B5\uB2C8\uB2E4.\"); window.location.href = \"https://front.wilimbackend.tk\" </script>");
  });
});
router.route('/register/local').get(_userSchemaAPI.renderRegister).post(_userSchemaAPI.createNewUser); // 새로운 유저 생성 회원가입은 이쪽에서!

router.route('/login/local') //local 로그인 라우터
.get(_userSchemaAPI.renderLogin).post(function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      // const json = JSON.parse(JSON.stringify(user));
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).redirect("/userSchemaAPI/id/".concat(user._id));
      });
    } else {
      res.status(404).json({
        msg: "로그인 실패"
      });
    }
  })(req, res, next);
});
router.route('/register/kakao') //카카오 계정 인증이 되었으나 wilim 데이터에 유저 없을때
.get(_userSchemaAPI.renderRegisterKakao).post(_userSchemaAPI.createNewKakaoUser);
router.get('/login/kakao', passport.authenticate('kakao')); //kakao 로그인 라우터

router.get('/login/kakao/callback', function (req, res, next) {
  //kakao 로그인 콜백 라우터
  passport.authenticate('kakao', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      var id = info.id;
      req.session.joinUser = {
        snsId: id,
        email: info._json.kakao_account.email,
        //info._json && info._json.kakao_account_email
        username: info._json.properties.nickname
      };
      return req.session.save(function () {
        res.redirect('/userSchemaAPI/register/kakao');
      });
    }
    return req.login(user, function (error) {
      if (error) {
        return next(error);
      }
      return res.status(200).redirect("https://front.wilimbackend.tk/main");
    });
  })(req, res, next);
});
router.route('/register/naver') //네이버 계정 인증이 되었으나 wilim 데이터에 유저 없을때
.get(_userSchemaAPI.renderRegisterNaver).post(_userSchemaAPI.createNewNaverUser);
router.get('/login/naver', passport.authenticate('naver', {
  authType: 'reprompt'
})); //네이버 로그인 라우터

router.get('/login/naver/callback', function (req, res, next) {
  //네이버 로그인 콜백 라우터
  passport.authenticate('naver', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      var id = info.id;
      req.session.joinUser = {
        snsId: id,
        email: info._json.response.email
        // username: info._json.nickname,
      };

      return req.session.save(function () {
        res.redirect('/userSchemaAPI/register/naver');
      });
    }
    return req.login(user, function (error) {
      if (error) {
        return next(error);
      }
      return res.status(200).redirect("https://front.wilimbackend.tk/main");
    });
  })(req, res, next);
});
router.route('/loginerror') //로그인실패시
.post(_userSchemaAPI.loginerror);
router.route('/session') //세션에 로그인 정보 있으면 로그인한 유저 정보 반환
.get(_userSchemaAPI.getSessionInfo);
router.route('/resetPassword').get(_userSchemaAPI.renderResetPassword).post(_userSchemaAPI.resetPassword); //password 변경메일 보내는 라우터

router.route('/id/:id').get(_userSchemaAPI.getUserInfoById) //id 일치하는 유저 가져옴
.put(_userSchemaAPI.updateUserById) // 기존유저 update by id
["delete"](_userSchemaAPI.deleteUserById); // 기존 유저 delete by id

module.exports = router;