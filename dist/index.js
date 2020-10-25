"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//$=>selector
//$$=>element
//$(*)=>selectorAll
var _$ = function _$(query, arg) {
  var self = {
    __init__: function __init__(query, arg) {
      var _this = this;

      this.__proto__.name = "abqueryObject";
      this.__proto__.constructor = this.__init__;
      if (typeof query === 'function') return _$.ready(query);
      this.num = 1;
      this.__query__ = document;
      if (!!arg && typeof arg === 'number') this.num = arg;else if (!!arg && _$.is_html(arg)) this.__query__ = arg;
      this.query = query || document;
      this["new"] = typeof query === 'string' && _$.is_new(query);

      if (!this["new"] && !_$.is_html(this.query)) {
        var queryer,
            _$$clean = _$.clean(this.query, true),
            _$$clean2 = _slicedToArray(_$$clean, 2),
            _query = _$$clean2[0],
            all = _$$clean2[1];

        if (all) {
          queryer = function queryer(q) {
            return _this.__query__.querySelectorAll(q);
          };

          this.many = true;
        } else queryer = function queryer(q) {
          return _this.__query__.querySelector(q);
        }; //if query is list it will query the list items


        if (_$.is_array(_query)) {
          this.$$ = _query.reduce(function (arr, q) {
            if (all) return [].concat(_toConsumableArray(arr), _toConsumableArray(queryer(q)));
            return [].concat(_toConsumableArray(arr), [queryer(q)]);
          }, []);
          this.many = true;
        } else this.$$ = queryer(_query);
      } else {
        if (this.num > 1 || _$.is_array(this.query)) this.many = true;
        if (_$.is_html(this.query)) this.$$ = this.query;else {
          this.$$ = _toConsumableArray(Array(this.num).keys()).reduce(function (arr) {
            return [].concat(_toConsumableArray(arr), [document.createElement(_this.query.slice(1, -1))]);
          }, []);
          if (this.num === 1) this.$$ = this.$$[0];
        }
      }

      this.arr = Array.from(this.many ? this.$$ : [this.$$]);
      return this;
    },
    //methods
    show: function show() {
      var _this2 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$cls = _ref.cls,
          cls = _ref$cls === void 0 ? '' : _ref$cls,
          _ref$animate = _ref.animate,
          animate = _ref$animate === void 0 ? 'abquery-show' : _ref$animate,
          _ref$delay = _ref.delay,
          delay = _ref$delay === void 0 ? 600 : _ref$delay,
          _ref$keep = _ref.keep,
          keep = _ref$keep === void 0 ? false : _ref$keep;

      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      if (!cls) this.rmClass('abquery-d-none, d-none').rmCss('display');else this.addClass(cls);
      this.addClass(animate);
      setTimeout(function () {
        if (!keep) _this2.rmClass(animate);
      }, delay);
      func();
      return this;
    },
    hide: function hide() {
      var _this3 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$cls = _ref2.cls,
          cls = _ref2$cls === void 0 ? '' : _ref2$cls,
          _ref2$animate = _ref2.animate,
          animate = _ref2$animate === void 0 ? "abquery-hide" : _ref2$animate,
          _ref2$delay = _ref2.delay,
          delay = _ref2$delay === void 0 ? 600 : _ref2$delay,
          _ref2$keep = _ref2.keep,
          keep = _ref2$keep === void 0 ? false : _ref2$keep;

      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      this.addClass(animate);
      setTimeout(function () {
        if (!cls) _this3.addClass('abquery-d-none');else _this3.rmClass(cls);
        if (!keep) _this3.rmClass(animate);
      }, delay);
      func();
      return this;
    },
    toggleDisplay: function toggleDisplay() {
      var _this4 = this;

      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$cls = _ref3.cls,
          cls = _ref3$cls === void 0 ? '' : _ref3$cls;

      return this.run(function (el) {
        if (_$(el).hasClass(!cls ? ['abquery-d-none', 'd-none'] : cls, {
          someClass: true
        })) {
          _this4.show({
            cls: cls
          });
        } else {
          _this4.hide({
            cls: cls
          });
        }
      });
    },
    addClass: function addClass(cls) {
      return this.$run(function (e, c) {
        if (!!c.trim()) e.classList.add(c);
      }, cls);
    },
    hasClass: function hasClass(cls) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref4$someClass = _ref4.someClass,
          someClass = _ref4$someClass === void 0 ? false : _ref4$someClass,
          _ref4$someEl = _ref4.someEl,
          someEl = _ref4$someEl === void 0 ? false : _ref4$someEl;

      var check = function check(e, cl) {
        return e.classList.contains(cl);
      };

      return this.$runBool(check, cls, {
        someArr: someClass,
        someEl: someEl
      });
    },
    rmClass: function rmClass(cls) {
      return this.$run(function (e, c) {
        if (!!c.trim()) e.classList.remove(c);
      }, cls);
    },
    toggleClass: function toggleClass(cls) {
      return this.$run(function (e, c) {
        e.classList.toggle(c);
      }, cls);
    },
    on: function on(events, func) {
      return this.$run(function (e, event) {
        _$.on(event, func, e);
      }, events);
    },
    css: function css(props, value) {
      var imp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var split = function split(v) {
        var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '!';
        return [v.split(s)[0].trim(), imp ? imp : !!v.split(s)[1]];
      };

      return this.$set(function (e, prop, val) {
        if (_$.is_array(_$.clean(props)) || val === undefined) return e.style.getPropertyValue(prop); //e.style.cssText=$.obj_text(props,e.style.cssText);
        else {
            var _ref5 = typeof val === 'number' ? [val, false] : split(val),
                _ref6 = _slicedToArray(_ref5, 2),
                v = _ref6[0],
                _imp = _ref6[1];

            e.style.setProperty(prop, v, _imp ? 'important' : '');
          }
      }, props, value);
    },
    rmCss: function rmCss(props) {
      return this.$run(function (e, prop) {
        e.style.removeProperty(prop);
      }, props);
    },
    attr: function attr(props, value) {
      return this.$set(function (e, prop, val) {
        if (_$.is_array(_$.clean(props)) || val === undefined) return e.getAttribute(prop);
        e.setAttribute(prop, val);
      }, props, value);
    },
    rmAttr: function rmAttr(props) {
      return this.$run(function (e, prop) {
        e.removeAttribute(prop);
      }, props);
    },
    appendParent: function appendParent(nodes) {
      return this.$run(function (e, node) {
        node.appendChild(e);
      }, nodes);
    },
    detachParent: function detachParent() {
      return this.run(function (e) {
        e.parentNode.removeChild(e);
      });
    },
    append: function append(nodes) {
      return this.$run(function (e, node) {
        e.appendChild(node);
      }, nodes);
    },
    detach: function detach(nodes) {
      return this.$run(function (e, node) {
        e.removeChild(node);
      }, nodes);
    },
    index: function index(e) {
      if (_$.is_proto(e)) return this.arr.indexOf(e.$$);else if (_$.is_html(e)) return this.arr.indexOf(e);
      console.error("cannot find index of arg");
    },
    // useful methods
    run: function run(func) {
      var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref7$delay = _ref7.delay,
          delay = _ref7$delay === void 0 ? 0 : _ref7$delay,
          _ref7$every = _ref7.every,
          every = _ref7$every === void 0 ? 0 : _ref7$every;

      var arr = this.arr;
      if (!!every) setInterval(function () {
        return arr.forEach(func);
      }, every);else if (!!delay) setTimeout(function () {
        return arr.forEach(func);
      }, delay);else arr.forEach(func);
      return this;
    },
    $run: function $run(func, arr) {
      var _this5 = this;

      arr = _$.clean(arr);
      if (!_$.is_array(arr)) arr = [arr];
      arr.forEach(function (i) {
        return _this5.run(function (e) {
          return func(e, i);
        });
      });
      return this;
    },
    $runBool: function $runBool(func, arr) {
      var _this6 = this;

      var _ref8 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref8$someArr = _ref8.someArr,
          someArr = _ref8$someArr === void 0 ? false : _ref8$someArr,
          _ref8$someEl = _ref8.someEl,
          someEl = _ref8$someEl === void 0 ? false : _ref8$someEl;

      // returns a boolean
      if (!_$.is_array(arr)) arr = [arr];

      var to_run = function to_run(i) {
        return someEl ? _this6.arr.some(function (e) {
          return func(e, i);
        }) : _this6.arr.every(function (e) {
          return func(e, i);
        });
      };

      return someArr ? arr.some(to_run) : arr.every(to_run);
    },
    $set: function $set(func, props, value) {
      var attrs = [];
      props = _$.clean(props);
      var propsIsStr = typeof props === 'string';
      this.run(function (e) {
        if (_$.is_dict(props)) for (var key in props) {
          func(e, key, props[key]);
        } else if (_$.is_array(props) || value === undefined) {
          if (propsIsStr) props = [props];
          attrs = [].concat(_toConsumableArray(attrs), _toConsumableArray(props.reduce(function (arr, key) {
            return [].concat(_toConsumableArray(arr), [func(e, key)]);
          }, [])));
        } else func(e, props, value);
      });
      if ((_$.is_array(props) || propsIsStr) && value === undefined) return this.arr.length === 1 && propsIsStr ? attrs[0] : attrs;
      return this;
    },
    prop: function prop(props, value) {
      return this.$set(function (e, prop, val) {
        if (_$.is_array(_$.clean(props)) || val === undefined) return e[prop];

        try {
          e[prop] = val;
        } catch (err) {
          console.error(err);
        }
      }, props, value);
    },

    //end
    //property getters & setters
    get class() {
      return this.prop('className');
    },

    get parent() {
      //returns first child parent
      return _$(this.arr[0].parentNode);
    },

    get parents() {
      var arr = Array.from(this.arr.reduce(function (set, e) {
        return set.add(e.parentNode);
      }, new Set()));
      ;
      return _$(arr);
    },

    get child() {
      //needs improvement
      return _$(this.arr[0].firstElementChild);
    },

    get children() {
      var children = this.arr.reduce(function (arr, e) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(Array.from(e.children)));
      }, []);
      return _$(children);
    },

    get len() {
      return this.arr.length;
    },

    get html() {
      return this.prop('innerHTML');
    },

    get text() {
      return this.prop('textContent');
    },

    get val() {
      var data = _$.form_data(this.$$);

      var keys = Object.keys(data);
      if (keys.length === 1) return data[keys[0]];else return data;
    },

    set class(className) {
      this.prop('className', className);
    },

    set html(html) {
      this.prop('innerHTML', html);
    },

    set text(text) {
      this.prop('textContent', text);
    },

    set val(value) {
      this.run(function (e) {
        var prop = _$.form_value(e, true);

        e[prop] = value;
      });
    },

    //end
    //new init 
    $: function $(query, num_for_new) {
      if (_$.is_new(query)) return this.$new(query, num_for_new);
      var els = Array.from(this.arr.reduce(function (set, e) {
        return new Set([].concat(_toConsumableArray(set), _toConsumableArray(_$(query, e).arr)));
      }, new Set())).filter(function (e) {
        return e !== null;
      });
      if (!els) throw Error("query:".concat(query, " is not in parent/s"));
      return els.length === 1 ? _$(els[0]) : _$(els);
    },
    $new: function $new(tag, num) {
      var _new = _$(tag, num);

      this.append(_new.$$);
      return _new;
    } //end

  };
  return self.__init__(query, arg);
}; //static methods


_$.is_proto = function (e) {
  return _$().constructor === e.constructor;
};

_$.is_array = function (arr) {
  return [].__proto__ === arr.__proto__ || NodeList === arr.__proto__.constructor;
};

_$.is_html = function (el) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!el) return false;

  var is_html = function is_html(e) {
    return e.__proto__.constructor.toString().includes('HTML');
  };

  if (arr) {
    if (!_$.is_array(el)) el = [el];
    return is_html(el[0]);
  } else return is_html(el);
};

_$.is_new = function (query) {
  return /^<[a-z]+>$/.test(query);
};

_$.is_dict = function (dict) {
  var d = {};
  return d.__proto__ === dict.__proto__;
};

_$.obj_text = function (props) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  for (var i in props) {
    str += "".concat(i, ": ").concat(props[i], "; ").trim();
  }

  return str;
};

_$.clean = function (q) {
  var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (typeof q !== "string") return q;
  var all = false;

  if (q[0] === "*") {
    q = q.slice(1);
    all = true;
  }

  ;
  q = q.split(',').reduce(function (arr, q) {
    return [].concat(_toConsumableArray(arr), [q.trim()]);
  }, []);
  q = q.length === 1 ? q[0] : q;
  return m ? [q, all] : q;
};

_$.form_data = function (inputs) {
  if (!_$.is_array(inputs)) inputs = [inputs];
  return inputs.reduce(function (dict, e) {
    var data = _$.form_value(e);

    if (data === null || e.type === "submit") return dict;
    return Object.assign({}, dict, _defineProperty({}, e.name || e.id, data));
  }, {});
};

_$.form_value = function (e) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (e.tagName === "INPUT" || e.tagName === "TEXTAREA") {
    if (['radio', 'checkbox'].includes(e.type)) return key ? 'checked' : e.checked;else if (e.type === "file") {
      if (e.multiple === true) return key ? 'files' : e.files;
      return key ? 'files[0]' : e.files[0];
    } else return key ? 'value' : e.value;
  } else if (e.tagName === "SELECT") return key ? 'select.option.selected' : Array.from(e.options).filter(function (option) {
    return option.selected;
  }).map(function (option) {
    return option.value;
  });else return null;
};

_$.styleElementId = "abquery-stylesheet";

_$.css_prefix = function (rule) {
  return ['', '-webkit-', '-moz-'].reduce(function (str, pre) {
    return str += "".concat(pre).concat(rule.trim(), ";");
  }, '');
};

_$.init_style_defaults = function () {
  if (_$('abquery-init_style_defaults').$$) return;
  var show = "".concat(_$.css_prefix('animation: abquery-keyframe-show .6s cubic-bezier(0, 0.9, 0.3, 1.2) forwards'), "\n        opacity: 0;").concat(_$.css_prefix("transform: translateY(-4rem) scale(.8)"));
  var hidekf = "0% {".concat(_$.css_prefix('transform: scale(1)'), "opacity: 1;}\n        20%{").concat(_$.css_prefix('transform: scale(.9)'), "} 100% {").concat(_$.css_prefix('transform: none'), "opacity: 0;}");

  _$.add_keyframes('abquery-keyframe-show', "100%{opacity: 1;".concat(_$.css_prefix('transform: none'), "}"));

  _$.add_style(".abquery-show", show);

  _$.add_keyframes("abquery-keyframe-hide", hidekf);

  _$.add_style(".abquery-hide", "".concat(_$.css_prefix("animation: abquery-keyframe-hide .6s ease-out")));

  return _$.add_style(".abquery-d-none", "display:none !important").attr('abquery-init_style_defaults', true);
};

_$.gen_frames = function (name, frames) {
  return "\n        @keyframes ".concat(name, " {").concat(frames, "}\n        @-webkit-keyframes ").concat(name, " {").concat(frames, "}\n        ");
};

_$.get_styles = function () {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _$.styleElementId;

  var $styles = _$("#".concat(id));

  if (!$styles.$$) $styles = _$["new"]('style').attr({
    type: "text/css",
    id: "".concat(id)
  });
  return $styles;
};

_$.add_keyframes = function (name, frames) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _$.styleElementId;

  var $styles = _$.get_styles(id);

  $styles.appendParent(document.head).html += _$.gen_frames(name, frames);
  return $styles;
};

_$.add_style = function (selector, rules, id) {
  var $styles = _$.get_styles(id);

  $styles.appendParent(document.head).html += "".concat(selector, " {").concat(rules, "}");
  return $styles;
};

_$.on = function (event, func) {
  var el = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  return el.addEventListener(event, func);
};

_$.ready = function (func) {
  _$.on("DOMContentLoaded", func);
};

_$["new"] = function (tagName, num) {
  return _$("<".concat(tagName, ">"), num);
};

_$.id = function (q) {
  return _$("#".concat(q));
};

_$.cls = function (q) {
  return _$("*.".concat(q));
};

_$.att = function (q) {
  return _$("*[".concat(q, "]"));
};

window.$ = _$;

_$.init_style_defaults();
