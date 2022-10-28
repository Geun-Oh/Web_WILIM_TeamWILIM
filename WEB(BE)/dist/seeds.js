"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _mongoose = _interopRequireDefault(require("mongoose"));
var _user = _interopRequireDefault(require("./models/user.js"));
var _goalElement = _interopRequireDefault(require("./models/goalElement"));
require("./env.js");
var _db = require("./db.js");
var _axios = _interopRequireDefault(require("axios"));
var _express = _interopRequireDefault(require("express"));
var _qnetInfo = _interopRequireDefault(require("./seeds/qnetInfo.json"));
var _fs = _interopRequireDefault(require("fs"));
var _description = _interopRequireDefault(require("./seeds/description.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var app = (0, _express["default"])();
_mongoose["default"].connection;
main()["catch"](function (err) {
  return console.log(err);
});
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _mongoose["default"].connect(_db.db_cstring);
          case 2:
            console.log("database connected!");
          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _main.apply(this, arguments);
}
function fillZero(str) {
  return str.length >= 4 ? str : new Array(4 - str.length + 1).join('0') + str;
}
//국가자격시험일정 쿼리 명세 
//serviceKey, 
// numOfRows 한페이지 결과 수, 
// pageNo 페이지 넘버
// dataFormat	json으로
// implYy 시행년도
// qualgbCd 자격구분코드
// jmCd 종목코드값
//&numOfRows=10&pageNo=1&dataFormat=json&implYy=2022&qualgbCd=T&jmCd=7916

// const url ='http://apis.data.go.kr/B490007/qualExamSchd/getQualExamSchdList'
// const items = qnetInfo.response.body.items.item;//시험종목 정보
// const serviceKey = qnet_key;
// let numOfRows = 20;
// let pageNo=1;
// const dataFormat = 'json';
// let implYy = 2022;
// const length = items.length;//시험 종목 갯수
// let obj = [];
// let cnt = 0;

// //<---------axios 로 일정관련 API 하나하나 가져오는방법--------->
// //<---------성능 문제인지 axios 로 get 하는 도중 데이터가 undefined 로 가져와진다...---------->
// // const seedDB = async() =>{
// //     for await (let item of items){
// //         const response = await axios.get(`${url}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataFormat=${dataFormat}&implYy=${implYy}&qualgbCd=${item.qualgbcd}&jmCd=${fillZero(String(item.jmcd))}`);
// //         const totalCount = response.data.body.totalCount;
// //         let objInsideObj = [];
// //         for(let i = 0; i < totalCount; i++){
// //             const data = {
// //                 implYy : response.data.body.items[i].implYy,
// //                 implseq : response.data.body.items[i].implSeq,
// //                 dateDescription : response.data.body.items[i].description,
// //                 docRegStartDt : response.data.body.items[i].docRegStartDt,
// //                 docRegEndDt : response.data.body.items[i].docRegEndDt,
// //                 docExamStartDt : response.data.body.items[i].docExamStartDt,
// //                 docExamEndDt : response.data.body.items[i].docExamEndDt,
// //                 docPassDt : response.data.body.items[i].docPassDt,
// //                 pracRegStartDt : response.data.body.items[i].pracRegStartDt,
// //                 pracRegEndDt : response.data.body.items[i].pracRegEndDt,
// //                 pracExamStartDt : response.data.body.items[i].pracExamStartDt,
// //                 pracExamEndDt : response.data.body.items[i].pracExamEndDt,
// //                 pracPassDt : response.data.body.items[i].pracPassDt
// //             };
// //             objInsideObj.push(data);
// //         } 
// //         obj.push(objInsideObj);
// //     }
// //     console.log(obj);
// // }

//<-------종목 이름, 종류만 DB 에 넣어둔 후 일정에 관련된 API는 URL만 DB에 넣는 방법-------->
//<-------현재 사용중-------->
// const seedDB = (async (items)=>{
//     await GoalElement.deleteMany({});
//     for(const item of items){
//         const dataJson = {
//             name : item.jmfldnm,
//             qualgbnm : item.qualgbnm,
//             description : item.description,
//             seriesnm : item.seriesnm,
//             obligfldnm : item.obligfldnm,
//             mdobligfldnm : item.mdobligfldnm,
//             dateUrl : `${url}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataFormat=${dataFormat}&implYy=${implYy}&qualgbCd=${item.qualgbcd}&jmCd=${fillZero((item.jmcd).toString())}`,
//             isQnet : true
//         }
//         const newData = new GoalElement(dataJson);
//         await newData.save();
//     }
// })

// seedDB(items)
//     .then(()=>{
//         mongoose.connection.close();
//         console.log(length+" seeded done!");
//     })

// // 공개문제 서비스 API 테스트용 코드
// const item = qnetInfo.response.body.items.item;

// const urlEndPoint = `http://apis.data.go.kr/B490007/openQst`;
// const serviceKey = qnet_key;    // 공공데이터포털에서 발급받은 인증키
// let numOfRows = 10;           // 한 페이지 결과 수
// let pageNo = 1;               // 페이지 번호
// const dataFormat = "json"       // 응답 데이터 표준 형식 - xml / json (대소문자 구분 없음)
// let qualgbCd;           // 자격구분코드 - T: 국가기술자격 - C: 과정평가형자격 - W: 일학습병행자격
// let seriesCd;            // 계열코드
// let jmCd;                // 종목코드
// let jmNm;                // 종목명

// const urlOpenQstList = `${urlEndPoint}/getOpenQstList?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataFormat=${dataFormat}&qualgbCd=${item[475].qualgbcd}&seriesCd=${String(item[475].seriescd).padStart(2, '0')}&jmCd=${String(item[475].jmcd).padStart(4, '0')}&jmNm=${encodeURIComponent(item[475].jmfldnm)}`;

// const seedDB = async() => {
//     try {
//         const resList = await axios.get(urlOpenQstList);
//         const listData = resList.data.body.items[0];
//         const listDataJson = {
//             artlSeq: listData.artlSeq,
//             qualgbCd: listData.qualgbCd,
//         };

//         const urlOpenQst = `${urlEndPoint}/getOpenQst?serviceKey=${serviceKey}&dataFormat=${dataFormat}&qualgbCd=${listDataJson.qualgbCd}&artlSeq=${listDataJson.artlSeq}`;
//         const resQst = await axios.get(urlOpenQst);
//         const qstData = resQst.data.body;
//         console.log(qstData);
//     } catch(err) {
//         console.error(err);
//     }
// }

// seedDB();

// 실제 mongoDB에 다운로드 진행했을 때 사용한 코드
// 국가기술자격(qualgbcd: T)까지는 잘 진행됐으나, 국가전문자격(qualgbcd: S)부터 에러 발생 .. 해결 필요
// const urlEndPoint_examSchd ='http://apis.data.go.kr/B490007/qualExamSchd/getQualExamSchdList';  // 시험일정 정보 url 엔드포인트
// const urlEndPoint_openQst = `http://apis.data.go.kr/B490007/openQst`;   // 공개문제 url 엔드포인트
// const items = qnetInfo.response.body.items.item;    // 시험종목 정보
// const serviceKey = qnet_key;    // 공공데이터포털에서 발급받은 인증키
// let numOfRows = 10;           // 한 페이지 결과 수
// let pageNo = 1;               // 페이지 번호
// const dataFormat = "json"       // 응답 데이터 표준 형식 - xml / json (대소문자 구분 없음)
// let implYy = 2022;

// const seedDB = async() => {
//     try {
//         await GoalElement.deleteMany({});

//         for(const item of items) {
//             let fileList;

//             // 1. 국가자격 공개문제 목록 조회
//             const urlOpenQstList = `${urlEndPoint_openQst}/getOpenQstList?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataFormat=${dataFormat}&qualgbCd=${item.qualgbcd}&seriesCd=${String(item.seriescd).padStart(2, '0')}&jmCd=${String(item.jmcd).padStart(4, '0')}&jmNm=${encodeURIComponent(item.jmfldnm)}`;
//             const resQstList = await axios.get(urlOpenQstList);
//             const resData = resQstList.data.body.items;
//             const listData = resData.length !== 0 ? resData[0] : null; 
//             if(listData) {   
//                 // 2. 국가자격 공개문제 상세 조회
//                 const urlOpenQst = `${urlEndPoint_openQst}/getOpenQst?serviceKey=${serviceKey}&dataFormat=${dataFormat}&qualgbCd=${listData.qualgbCd}&artlSeq=${listData.artlSeq}`;
//                 const resQst = await axios.get(urlOpenQst);
//                 fileList = resQst.data.body.fileList;
//             }

//             // 3. 종합해서 mongoDB에 저장
//             const dataJson = {
//                 name : item.jmfldnm,
//                 qualgbnm : item.qualgbnm,
//                 description : item.description,
//                 seriesnm : item.seriesnm,
//                 obligfldnm : item.obligfldnm,
//                 mdobligfldnm : item.mdobligfldnm,
//                 dateUrl : `${urlEndPoint_examSchd}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataFormat=${dataFormat}&implYy=${implYy}&qualgbCd=${item.qualgbcd}&jmCd=${fillZero((item.jmcd).toString())}`,
//                 mockLink: fileList ? fileList : {
//                     fileNm: "공개문제 링크를 찾을 수 없습니다.",
//                     fileSn: null,
//                     fileUrl: "공개문제 링크를 찾을 수 없습니다."
//                 },
//                 isQnet : true
//             }
//             console.log(dataJson);
//             const newData = new GoalElement(dataJson);
//             await newData.save();
//         }
//     } catch(err) {
//         console.error(err);
//     }
// }

// seedDB()
//     .then(()=>{
//         console.log("qnet done!");
//     })

//국가자격

// const gtelp = {
//   name : "지텔프(G-TELP)",
//   isQnet : false,
//   description : "1985년 샌디에이고 주립대학교 산하 연구기관 국제 테스트 연구원(ITSC, International Testing Services Center)이 캘리포니아 주립대학교 로스앤젤레스, 조지타운 대학교 등의 교수진과 언어학자, 평가 전문가와 함께 개발한 외국인을 위한 영어 시험이다. 수준별 문법, 청취, 어휘 및 독해를 평가하기 위한 G-TELP Level Test (Level 1~5)), 말하기와 쓰기 능력을 측정하기 위한 G-TELP Speaking과 G-TELP Writing, 비즈니스 실무 영어 능력을 평가하기 위한 G-TELP Business, 초등학생 및 청소년의 어학 수준을 평가하는 G-TELP Jr. 등으로 구성되어 있다.",
//   isQnetFalseDate : {
//     items : [
//       {
//         implYy : "2022",
//         description : "제486회",
//         docRegStartDt : "20220923",
//         docRegEndDt : "20220930",
//         docExamStartDt : "20221016",
//         docExamEndDt : "20221016",
//         docPassDt : "20221021"
//       },
//       {
//         implYy : "2022",
//         description : "제487회(IBT)",
//         docRegStartDt : "20221005",
//         docRegEndDt : "20221011",
//         docExamStartDt : "20221023",
//         docExamEndDt : "20221023",
//         docPassDt : "20221028"
//       },
//       {
//         implYy : "2022",
//         description : "제488회",
//         docRegStartDt : "20221007",
//         docRegEndDt : "20221014",
//         docExamStartDt : "20221030",
//         docExamEndDt : "20221030",
//         docPassDt : "20221104"
//       },
//       {
//         implYy : "2022",
//         description : "제489회",
//         docRegStartDt : "20221021",
//         docRegEndDt : "20221028",
//         docExamStartDt : "20221113",
//         docExamEndDt : "20221113",
//         docPassDt : "20221118"
//       },
//       {
//         implYy : "2022",
//         description : "제490회",
//         docRegStartDt : "20221104",
//         docRegEndDt : "20221111",
//         docExamStartDt : "20221127",
//         docExamEndDt : "20221127",
//         docPassDt : "20221202"
//       },
//       {
//         implYy : "2022",
//         description : "제491회(IBT)",
//         docRegStartDt : "20221116",
//         docRegEndDt : "20221122",
//         docExamStartDt : "20221204",
//         docExamEndDt : "20221204",
//         docPassDt : "20221209"
//       },
//       {
//         implYy : "2022",
//         description : "제492회",
//         docRegStartDt : "20221118",
//         docRegEndDt : "20221125",
//         docExamStartDt : "20221211",
//         docExamEndDt : "20221211",
//         docPassDt : "20221216"
//       },
//       {
//         implYy : "2022",
//         description : "제493회",
//         docRegStartDt : "20221202",
//         docRegEndDt : "20221209",
//         docExamStartDt : "20221225",
//         docExamEndDt : "20221225",
//         docPassDt : "20221230"
//       },
//     ]
//   }
// }

// const toeic = {isQnetFalseDate:{items:[{implYy:"2022",description:"제472회",docRegStartDt:"20220829",docRegEndDt:"20221003",docExamStartDt:"20221015",docExamEndDt:"20221015",docPassDt:"20221026"},{implYy:"2022",description:"제473회",docRegStartDt:"20220912",docRegEndDt:"20221017",docExamStartDt:"20221030",docExamEndDt:"20221030",docPassDt:"20221109"},{implYy:"2022",description:"제474회",docRegStartDt:"20220926",docRegEndDt:"20221031",docExamStartDt:"20221113",docExamEndDt:"20221113",docPassDt:"20221123"},{implYy:"2022",description:"제475회",docRegStartDt:"20221003",docRegEndDt:"20221107",docExamStartDt:"20221120",docExamEndDt:"20221120",docPassDt:"20221201"},{implYy:"2022",description:"제476회",docRegStartDt:"20221010",docRegEndDt:"20221114",docExamStartDt:"20221127",docExamEndDt:"20221127",docPassDt:"20221207"},{implYy:"2022",description:"제477회",docRegStartDt:"20221024",docRegEndDt:"20221128",docExamStartDt:"20221211",docExamEndDt:"20221211",docPassDt:"20221221"},{implYy:"2022",description:"제478회",docRegStartDt:"20221107",docRegEndDt:"20221212",docExamStartDt:"20221225",docExamEndDt:"20221225",docPassDt:"20230105"}]},name:"토익",description:{"토익(TOEIC)은 국제 의사 소통을 위한 영어 시험(Test Of English for International Communication)의 약자로서, 영어가 모국어가 아닌 사람을 대상으로 일상 생활 및 비즈니스 현장에서 요구되는 실용적인 영어 구사 능력을 갖추었는지 평가하는 시험이다."},isQnet:false}

// const khistory = {isQnetFalseDate : {items : [{implYy:"2022",description:"제61회",docRegStartDt:"20220926",docRegEndDt:"20221004",docExamStartDt:"20221022",docExamEndDt:"20221022",docPassDt:"20221104"},{implYy:"2022",description:"제62회",docRegStartDt:"20221107",docRegEndDt:"20221114",docExamStartDt:"20221203",docExamEndDt:"20221203",docPassDt:"20221216"}]},name:"한국사능력검정시험",description:"한국사 능력을 평가하고 검정하는 시험으로 교육부장관 소속의 국사편찬위원회가 주관한다.",isQnet:false}

// const ksat = {isQnetFalseDate:{items:[{implYy:"2022",description:"6월모의평가",docRegStartDt:"20220404",docRegEndDt:"20220414",docExamStartDt:"20220609",docExamEndDt:"20220609",docPassDt:"20220706"},{implYy:"2022",description:"9월모의평가",docRegStartDt:"20220627",docRegEndDt:"20220707",docExamStartDt:"20220831",docExamEndDt:"20220831",docPassDt:"20220929"},{implYy:"2022",description:"대학수학능력시험",docRegStartDt:"20220818",docRegEndDt:"20220902",docExamStartDt:"20221117",docExamEndDt:"20221117",docPassDt:"20221209"}]},name:"대학수학능력시험",description:"대학 교육에 필요한 수학 능력 측정을 위한 시험이다.",isQnet:false}

// const compCert = {isQnetFalseDate : {items:[{implyYy : "2022", description : "컴퓨터활용능력1급(상시)"},{implYy : "2022", description : "컴퓨터활용능력2급(상시)"}]},name : "컴퓨터활용능력", isQnet : false , description : "대한상공회의소에서 주관하는 스프레드시트와 데이터베이스 관련 국가기술자격. 1급과 2급으로 나뉘어져 있으며, 매일 시험을 실시하고있다."}

// let response = new GoalElement(gtelp);
// response.save();
// response = new GoalElement(toeic);
// response.save();
// response = new GoalElement(ksat);
// response.save();
// response = new GoalElement(khistory);
// response.save();
// response = new GoalElement(compCert);
// response.save()
//     .then(()=>{
//         mongoose.connection.close();
//         console.log("isQnetFalse done!")
//     })

var descriptions = _description["default"].response.body.items.item;
var updateDB = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _iterator, _step, d, descriptionName, changedDB;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iterator = _createForOfIteratorHelper(descriptions);
            _context.prev = 1;
            _iterator.s();
          case 3:
            if ((_step = _iterator.n()).done) {
              _context.next = 12;
              break;
            }
            d = _step.value;
            descriptionName = d.jmNm;
            _context.next = 8;
            return _goalElement["default"].findOneAndUpdate({
              name: descriptionName
            }, {
              description: d
            }, {
              "new": true,
              runValidators: true
            });
          case 8:
            changedDB = _context.sent;
            console.log(changedDB);
          case 10:
            _context.next = 3;
            break;
          case 12:
            _context.next = 17;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            _iterator.e(_context.t0);
          case 17:
            _context.prev = 17;
            _iterator.f();
            return _context.finish(17);
          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 14, 17, 20]]);
  }));
  return function updateDB() {
    return _ref.apply(this, arguments);
  };
}();
updateDB().then(function () {
  _mongoose["default"].connection.close();
  console.log("updateDB Done!");
});