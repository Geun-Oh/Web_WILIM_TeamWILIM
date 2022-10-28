"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.updateComment = exports.tapLikeButton = exports.searchPosts = exports.renderPostRootPage = exports.renderPostEditPage = exports.getPostsOfUser = exports.getPostById = exports.getCommunityMain = exports.getComment = exports.getAllPosts = exports.getAllComments = exports.deletePost = exports.deleteComment = exports.addNewPost = exports.addNewComment = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _user = _interopRequireDefault(require("../models/user"));
var _post = _interopRequireDefault(require("../models/post"));
var _comment = _interopRequireDefault(require("../models/comment"));
var _goalElement = _interopRequireDefault(require("../models/goalElement"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var renderPostRootPage = function renderPostRootPage(req, res, next) {
  var user = req.user;
  return res.render("communityAPI/postRoot", {
    user: user
  });
};
exports.renderPostRootPage = renderPostRootPage;
var renderPostEditPage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var user, id, post;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user;
            id = req.params.id;
            _context.next = 4;
            return _post["default"].findById(id);
          case 4:
            post = _context.sent;
            return _context.abrupt("return", res.render("communityAPI/postEdit", {
              user: user,
              post: post
            }));
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function renderPostEditPage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.renderPostEditPage = renderPostEditPage;
var getAllPosts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var posts;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _post["default"].find({}).populate("owner").populate("comments");
          case 2:
            posts = _context2.sent;
            ;
            res.status(200).json(posts);
          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getAllPosts(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllPosts = getAllPosts;
var getAllComments = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var comments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _comment["default"].find({});
          case 2:
            comments = _context3.sent;
            res.status(200).json(comments);
          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getAllComments(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllComments = getAllComments;
var getCommunityMain = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var _req$user, _id, goal, goalElement, selfPosts, goalRelatedPosts, allPosts, queryResult;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$user = req.user, _id = _req$user._id, goal = _req$user.goal;
            _context4.next = 3;
            return _goalElement["default"].findById(goal);
          case 3:
            goalElement = _context4.sent;
            _context4.next = 6;
            return _post["default"].find({
              owner: _id
            }).populate("comments");
          case 6:
            selfPosts = _context4.sent;
            _context4.next = 9;
            return _post["default"].find({
              hashtags: "#".concat(goalElement.name)
            }).sort({
              "likes": 1
            });
          case 9:
            goalRelatedPosts = _context4.sent;
            _context4.next = 12;
            return _post["default"].find({}).sort({
              "likes": 1
            });
          case 12:
            allPosts = _context4.sent;
            queryResult = new Object();
            queryResult.selfPosts = selfPosts;
            queryResult.goalRelatedPosts = goalRelatedPosts;
            queryResult.allPosts = allPosts;
            console.log(queryResult);
            return _context4.abrupt("return", res.status(200).json(queryResult));
          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function getCommunityMain(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getCommunityMain = getCommunityMain;
var getPostById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var id, post;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _post["default"].findById(id).populate("comments").populate("owner");
          case 4:
            post = _context5.sent;
            return _context5.abrupt("return", res.status(200).json(post));
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            return _context5.abrupt("return", res.status(404).json({
              message: _context5.t0
            }));
          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function getPostById(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getPostById = getPostById;
var updatePost = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var id, _req$body, title, content, hashtags, updatedPost;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // owner 권한 확인 필요
            id = req.params.id;
            _req$body = req.body, title = _req$body.title, content = _req$body.content, hashtags = _req$body.hashtags;
            _context6.prev = 2;
            _context6.next = 5;
            return _post["default"].findByIdAndUpdate(id, {
              title: title,
              content: content,
              hashtags: hashtags
            }, {
              "new": true
            });
          case 5:
            updatedPost = _context6.sent;
            return _context6.abrupt("return", res.status(200).send(updatedPost));
          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](2);
            return _context6.abrupt("return", res.status(404).json({
              message: _context6.t0
            }));
          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 9]]);
  }));
  return function updatePost(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updatePost = updatePost;
var deletePost = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var id, _req$user2, _id, username, post;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // owner 권한 확인 필요
            id = req.params.id;
            _req$user2 = req.user, _id = _req$user2._id, username = _req$user2.username;
            _context7.prev = 2;
            _context7.next = 5;
            return _post["default"].findById(id);
          case 5:
            post = _context7.sent;
            _context7.next = 8;
            return _comment["default"].deleteMany({
              post: id
            });
          case 8:
            _context7.next = 10;
            return _user["default"].findByIdAndUpdate(_id, {
              $pull: {
                posts: id
              }
            }, {
              "new": true
            });
          case 10:
            _context7.next = 12;
            return _post["default"].findByIdAndDelete(id);
          case 12:
            return _context7.abrupt("return", res.status(200).json(post));
          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](2);
            return _context7.abrupt("return", res.status(404).json({
              message: _context7.t0
            }));
          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 15]]);
  }));
  return function deletePost(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
exports.deletePost = deletePost;
var getPostsOfUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var username, user, posts;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // 얘는 굳이 로그인한 유저의 Posts만 불러올 필요는 없을 듯 ..?
            // 따라서, session의 정보가 아닌, parameter의 username으로 posts를 불러오자.
            username = req.params.username;
            _context8.prev = 1;
            _context8.next = 4;
            return _user["default"].findOne({
              username: username
            }).populate("posts");
          case 4:
            user = _context8.sent;
            posts = user.posts;
            return _context8.abrupt("return", res.status(200).send(posts));
          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](1);
            return _context8.abrupt("return", res.status(404).json({
              message: _context8.t0
            }));
          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 9]]);
  }));
  return function getPostsOfUser(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getPostsOfUser = getPostsOfUser;
var addNewPost = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var _req$body2, title, content, hashtags, date, _req$user3, _id, username, newPost;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            // owner 권한 확인 필요
            _req$body2 = req.body, title = _req$body2.title, content = _req$body2.content, hashtags = _req$body2.hashtags, date = _req$body2.date;
            _req$user3 = req.user, _id = _req$user3._id, username = _req$user3.username;
            _context9.prev = 2;
            newPost = new _post["default"]({
              owner: _id,
              username: username,
              title: title,
              content: content,
              hashtags: hashtags,
              date: date
            });
            _context9.next = 6;
            return newPost.save();
          case 6:
            _context9.next = 8;
            return _user["default"].findByIdAndUpdate(_id, {
              $push: {
                posts: newPost._id
              }
            });
          case 8:
            return _context9.abrupt("return", res.status(201).send(newPost));
          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](2);
            return _context9.abrupt("return", res.status(404).json({
              message: _context9.t0
            }));
          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 11]]);
  }));
  return function addNewPost(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
exports.addNewPost = addNewPost;
var searchPosts = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res, next) {
    var keyword, posts;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            keyword = req.query.keyword;
            _context10.prev = 1;
            posts = [];
            if (!keyword) {
              _context10.next = 8;
              break;
            }
            _context10.next = 6;
            return _post["default"].find({
              title: {
                $regex: new RegExp(keyword, "i")
              }
            }).populate("comments").populate("owner");
          case 6:
            posts = _context10.sent;
            return _context10.abrupt("return", res.status(200).send(posts));
          case 8:
            _context10.next = 13;
            break;
          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](1);
            return _context10.abrupt("return", res.status(404).json({
              message: _context10.t0
            }));
          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 10]]);
  }));
  return function searchPosts(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
exports.searchPosts = searchPosts;
var tapLikeButton = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res, next) {
    var id, _req$user4, _id, likedPosts, isUserAlreadyLikes, i, post;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            // 좋아요를 안 누른 상태 : 좋아요 표시 하도록 !
            // 좋아요를 이미 누른 상태 : 좋아요 취소
            id = req.params.id;
            _req$user4 = req.user, _id = _req$user4._id, likedPosts = _req$user4.likedPosts;
            isUserAlreadyLikes = likedPosts.includes;
            i = 0;
          case 4:
            if (!(i < likedPosts.length)) {
              _context11.next = 12;
              break;
            }
            if (!(likedPosts[i] === id)) {
              _context11.next = 8;
              break;
            }
            true, _readOnlyError("isUserAlreadyLikes");
            return _context11.abrupt("break", 12);
          case 8:
            false, _readOnlyError("isUserAlreadyLikes");
          case 9:
            i++;
            _context11.next = 4;
            break;
          case 12:
            _context11.prev = 12;
            _context11.next = 15;
            return _post["default"].findById(id);
          case 15:
            post = _context11.sent;
            if (isUserAlreadyLikes) {
              _context11.next = 25;
              break;
            }
            post.likes += 1;
            post.likedUsers.push(_id);
            _context11.next = 21;
            return post.save();
          case 21:
            _context11.next = 23;
            return _user["default"].findByIdAndUpdate(_id, {
              $push: {
                likedPosts: id
              }
            });
          case 23:
            _context11.next = 38;
            break;
          case 25:
            post.likes -= 1;
            i = 0;
          case 27:
            if (!(i < post.likedUsers.length)) {
              _context11.next = 34;
              break;
            }
            if (!(post.likedUsers[i] === id)) {
              _context11.next = 31;
              break;
            }
            post.likedUsers.splice(i, 1);
            return _context11.abrupt("break", 34);
          case 31:
            i++;
            _context11.next = 27;
            break;
          case 34:
            _context11.next = 36;
            return post.save();
          case 36:
            _context11.next = 38;
            return _user["default"].findByIdAndUpdate(_id, {
              $pull: {
                likedPosts: id
              }
            });
          case 38:
            return _context11.abrupt("return", res.status(200).send(post));
          case 41:
            _context11.prev = 41;
            _context11.t0 = _context11["catch"](12);
            return _context11.abrupt("return", res.status(404).json({
              message: _context11.t0
            }));
          case 44:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[12, 41]]);
  }));
  return function tapLikeButton(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();
exports.tapLikeButton = tapLikeButton;
var getComment = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res, next) {
    var id, comment;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            id = req.params.id;
            _context12.prev = 1;
            _context12.next = 4;
            return _comment["default"].findById(id);
          case 4:
            comment = _context12.sent;
            return _context12.abrupt("return", res.status(200).send(comment));
          case 8:
            _context12.prev = 8;
            _context12.t0 = _context12["catch"](1);
            return _context12.abrupt("return", res.status(404).json({
              message: _context12.t0
            }));
          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 8]]);
  }));
  return function getComment(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getComment = getComment;
var updateComment = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res, next) {
    var content, id, updatedComment;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            // owner 권한 확인 필요
            content = req.body.content;
            id = req.params.id;
            _context13.prev = 2;
            _context13.next = 5;
            return _comment["default"].findByIdAndUpdate(id, {
              content: content
            }, {
              "new": true
            });
          case 5:
            updatedComment = _context13.sent;
            return _context13.abrupt("return", res.status(200).send(updatedComment));
          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13["catch"](2);
            return _context13.abrupt("return", res.status(404).json({
              message: _context13.t0
            }));
          case 12:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[2, 9]]);
  }));
  return function updateComment(_x37, _x38, _x39) {
    return _ref13.apply(this, arguments);
  };
}();
exports.updateComment = updateComment;
var deleteComment = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res, next) {
    var _id, id, comment, post, updatedPost;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _id = req.user._id;
            id = req.params.id;
            _context14.prev = 2;
            _context14.next = 5;
            return _comment["default"].findById(id);
          case 5:
            comment = _context14.sent;
            _context14.next = 8;
            return _post["default"].findById(comment.post);
          case 8:
            post = _context14.sent;
            _context14.next = 11;
            return _post["default"].findByIdAndUpdate(post._id, {
              $pull: {
                comments: id
              }
            }, {
              "new": true
            });
          case 11:
            updatedPost = _context14.sent;
            _context14.next = 14;
            return _user["default"].findByIdAndUpdate(_id, {
              $pull: {
                comments: id
              }
            });
          case 14:
            _context14.next = 16;
            return _comment["default"].findByIdAndDelete(id);
          case 16:
            return _context14.abrupt("return", res.status(200).send(updatedPost));
          case 19:
            _context14.prev = 19;
            _context14.t0 = _context14["catch"](2);
            return _context14.abrupt("return", res.status(404).json({
              mesage: _context14.t0
            }));
          case 22:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[2, 19]]);
  }));
  return function deleteComment(_x40, _x41, _x42) {
    return _ref14.apply(this, arguments);
  };
}();
exports.deleteComment = deleteComment;
var addNewComment = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res, next) {
    var id, _req$user5, _id, username, _req$body3, content, date, newComment;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            // owner 권한 확인 필요
            id = req.params.id; // post의 id이다.
            _req$user5 = req.user, _id = _req$user5._id, username = _req$user5.username;
            _req$body3 = req.body, content = _req$body3.content, date = _req$body3.date;
            _context15.prev = 3;
            newComment = new _comment["default"]({
              owner: _id,
              username: username,
              content: content,
              post: id,
              date: date
            });
            _context15.next = 7;
            return newComment.save();
          case 7:
            _context15.next = 9;
            return _post["default"].findByIdAndUpdate(id, {
              $push: {
                comments: newComment._id
              }
            });
          case 9:
            _context15.next = 11;
            return _user["default"].findByIdAndUpdate(_id, {
              $push: {
                comments: newComment._id
              }
            });
          case 11:
            return _context15.abrupt("return", res.status(201).send(newComment));
          case 14:
            _context15.prev = 14;
            _context15.t0 = _context15["catch"](3);
            return _context15.abrupt("return", res.status(404).json({
              mesage: _context15.t0
            }));
          case 17:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[3, 14]]);
  }));
  return function addNewComment(_x43, _x44, _x45) {
    return _ref15.apply(this, arguments);
  };
}();
exports.addNewComment = addNewComment;