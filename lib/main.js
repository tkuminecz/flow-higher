'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var End = exports.End = function End() {
	_classCallCheck(this, End);
};

var t1 = exports.t1 = function t1(a) {
	return { value: a, rest: End };
};
var t2 = exports.t2 = function t2(a, b) {
	return { value: a, rest: t1(b) };
};
var t3 = exports.t3 = function t3(a, b, c) {
	return { value: a, rest: t2(b, c) };
};
var t4 = exports.t4 = function t4(a, b, c, d) {
	return { value: a, rest: t3(b, c, d) };
};
var t5 = exports.t5 = function t5(a, b, c, d, e) {
	return { value: a, rest: t4(b, c, d, e) };
};
var t6 = exports.t6 = function t6(a, b, c, d, e, f) {
	return { value: a, rest: t5(b, c, d, e, f) };
};
var t7 = exports.t7 = function t7(a, b, c, d, e, f, g) {
	return { value: a, rest: t6(b, c, d, e, f, g) };
};
var t8 = exports.t8 = function t8(a, b, c, d, e, f, g, h) {
	return { value: a, rest: t7(b, c, d, e, f, g, h) };
};

var Kind = exports.Kind = function () {
	function Kind(kind, value) {
		_classCallCheck(this, Kind);

		this.value = value;
	}

	/**
  * wrap :: Class k -> t -> Kind k t
  */


	_createClass(Kind, null, [{
		key: 'wrap',
		value: function wrap(kind, value) {
			return new Kind(kind, value);
		}

		/**
   * unwrap :: Kind k t ~> t
   */

	}, {
		key: 'unwrap',
		value: function unwrap(kind, value) {
			return value.value;
		}
	}]);

	return Kind;
}();

var ma = { tag: 'Just', value: 42 };

var ea = { tag: 'Left', value: 42 };
