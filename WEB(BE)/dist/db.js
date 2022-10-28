"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.session_secret = exports.qnet_key = exports.naver_client_secret = exports.naver_client_id = exports.mail_key = exports.mail_id = exports.kakao_key = exports.db_cstring = void 0;
var db_cstring = process.env.DB_CSTRING;
exports.db_cstring = db_cstring;
var session_secret = process.env.SESSION_SECRET;
exports.session_secret = session_secret;
var kakao_key = process.env.KAKAO_KEY;
exports.kakao_key = kakao_key;
var qnet_key = process.env.QNET_KEY;
exports.qnet_key = qnet_key;
var naver_client_id = process.env.NAVER_CLIENT_ID;
exports.naver_client_id = naver_client_id;
var naver_client_secret = process.env.NAVER_CLIENT_SECRET;
exports.naver_client_secret = naver_client_secret;
var mail_id = process.env.MAIL_ID;
exports.mail_id = mail_id;
var mail_key = process.env.MAIL_KEY;
exports.mail_key = mail_key;