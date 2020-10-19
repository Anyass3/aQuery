"use strict";

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Aq = /*#__PURE__*/function () {
  //$=>selector
  //$$=>element
  //$(*)=>selectorAll
  function Aq() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$query = _ref.query,
        query = _ref$query === void 0 ? '' : _ref$query,
        _ref$parent = _ref.parent,
        parent = _ref$parent === void 0 ? document : _ref$parent,
        _ref$el = _ref.el,
        el = _ref$el === void 0 ? '' : _ref$el,
        _ref$num = _ref.num,
        num = _ref$num === void 0 ? 1 : _ref$num;

    _classCallCheck(this, Aq);

    this.query = query;
    if (!Aq.is_html(parent)) parent = document;

    if (!!query) {
      var queryer,
          _Aq$clean = Aq.clean(this.query, true),
          _Aq$clean2 = _slicedToArray(_Aq$clean, 2),
          _query = _Aq$clean2[0],
          all = _Aq$clean2[1];

      if (all) {
        queryer = function queryer(q) {
          return parent.querySelectorAll(q);
        };

        this.many = true;
      } else queryer = function queryer(q) {
        return parent.querySelector(q);
      }; //if query is list it will query the list items


      if (Aq.is_array(_query)) {
        this.$$ = _query.reduce(function (arr, q) {
          if (all) return [].concat(_toConsumableArray(arr), _toConsumableArray(queryer(q)));
          return [].concat(_toConsumableArray(arr), [queryer(q)]);
        }, []);
        this.many = true;
      } else this.$$ = queryer(_query);
    } else {
      if (num > 1 || Aq.is_array(el)) this.many = true;
      if (Aq.is_html(el)) this.$$ = el;else {
        if (num > 1) this.$$ = _toConsumableArray(Array(num).keys()).reduce(function (arr) {
          return [].concat(_toConsumableArray(arr), [document.createElement(el)]);
        }, []);else this.$$ = document.createElement(el);
      }
    }

    this.arr = Array.from(this.many ? this.$$ : [this.$$]);
  } //methods


  _createClass(Aq, [{
    key: "show",
    value: function show() {
      var _this = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$cls = _ref2.cls,
          cls = _ref2$cls === void 0 ? '' : _ref2$cls,
          _ref2$animate = _ref2.animate,
          animate = _ref2$animate === void 0 ? 'abquery-show' : _ref2$animate,
          _ref2$delay = _ref2.delay,
          delay = _ref2$delay === void 0 ? 600 : _ref2$delay,
          _ref2$keep = _ref2.keep,
          keep = _ref2$keep === void 0 ? false : _ref2$keep;

      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      if (!cls) this.rmClass('abquery-d-none, d-none').rmCss('display');else this.addClass(cls);
      this.addClass(animate);
      setTimeout(function () {
        if (!keep) _this.rmClass(animate);
      }, delay);
      func();
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$cls = _ref3.cls,
          cls = _ref3$cls === void 0 ? '' : _ref3$cls,
          _ref3$animate = _ref3.animate,
          animate = _ref3$animate === void 0 ? "abquery-hide" : _ref3$animate,
          _ref3$delay = _ref3.delay,
          delay = _ref3$delay === void 0 ? 600 : _ref3$delay,
          _ref3$keep = _ref3.keep,
          keep = _ref3$keep === void 0 ? false : _ref3$keep;

      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      this.addClass(animate);
      setTimeout(function () {
        if (!cls) _this2.addClass('abquery-d-none');else _this2.rmClass(cls);
        if (!keep) _this2.rmClass(animate);
      }, delay);
      func();
      return this;
    }
  }, {
    key: "toggleDisplay",
    value: function toggleDisplay() {
      var _this3 = this;

      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$cls = _ref4.cls,
          cls = _ref4$cls === void 0 ? '' : _ref4$cls;

      return this.run(function (el) {
        if ($el(el).hasClass(!cls ? ['abquery-d-none', 'd-none'] : cls, {
          someClass: true
        })) {
          _this3.show({
            cls: cls
          });
        } else {
          _this3.hide({
            cls: cls
          });
        }
      });
    }
  }, {
    key: "addClass",
    value: function addClass(cls) {
      return this.$run(function (e, c) {
        if (!!c.trim()) e.classList.add(c);
      }, cls);
    }
  }, {
    key: "hasClass",
    value: function hasClass(cls) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref5$someClass = _ref5.someClass,
          someClass = _ref5$someClass === void 0 ? false : _ref5$someClass,
          _ref5$someEl = _ref5.someEl,
          someEl = _ref5$someEl === void 0 ? false : _ref5$someEl;

      var check = function check(e, cl) {
        return e.classList.contains(cl);
      };

      return this.$runBool(check, cls, {
        someArr: someClass,
        someEl: someEl
      });
    }
  }, {
    key: "rmClass",
    value: function rmClass(cls) {
      return this.$run(function (e, c) {
        if (!!c.trim()) e.classList.remove(c);
      }, cls);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(cls) {
      return this.$run(function (e, c) {
        e.classList.toggle(c);
      }, cls);
    }
  }, {
    key: "on",
    value: function on(events, func) {
      return this.$run(function (e, event) {
        e.addEventListener(event, func);
      }, events);
    }
  }, {
    key: "css",
    value: function css(props, value) {
      var imp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var split = function split(v) {
        var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '!';
        return [v.split(s)[0].trim(), imp ? imp : !!v.split(s)[1]];
      };

      return this.$set(function (e, prop, val) {
        if (Aq.is_array(Aq.clean(props)) || val === undefined) return e.style.getPropertyValue(prop); //e.style.cssText=Aq.obj_text(props,e.style.cssText);
        else {
            var _split = split(val),
                _split2 = _slicedToArray(_split, 2),
                v = _split2[0],
                _imp = _split2[1];

            e.style.setProperty(prop, v, _imp ? 'important' : '');
          }
      }, props, value);
    }
  }, {
    key: "rmCss",
    value: function rmCss(props) {
      return this.$run(function (e, prop) {
        e.style.removeProperty(prop);
      }, props);
    }
  }, {
    key: "attr",
    value: function attr(props, value) {
      return this.$set(function (e, prop, val) {
        if (Aq.is_array(Aq.clean(props)) || val === undefined) return e.getAttribute(prop);
        e.setAttribute(prop, val);
      }, props, value);
    }
  }, {
    key: "rmAttr",
    value: function rmAttr(props) {
      return this.$run(function (e, prop) {
        e.removeAttribute(prop);
      }, props);
    }
  }, {
    key: "appendParent",
    value: function appendParent(nodes) {
      return this.$run(function (e, node) {
        node.appendChild(e);
      }, nodes);
    }
  }, {
    key: "detachParent",
    value: function detachParent() {
      return this.run(function (e) {
        e.parentNode.removeChild(e);
      });
    }
  }, {
    key: "append",
    value: function append(nodes) {
      return this.$run(function (e, node) {
        e.appendChild(node);
      }, nodes);
    }
  }, {
    key: "detach",
    value: function detach(nodes) {
      return this.$run(function (e, node) {
        e.removeChild(node);
      }, nodes);
    } // useful methods

  }, {
    key: "run",
    value: function run(func) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref6$delay = _ref6.delay,
          delay = _ref6$delay === void 0 ? 0 : _ref6$delay,
          _ref6$every = _ref6.every,
          every = _ref6$every === void 0 ? 0 : _ref6$every;

      var arr = this.arr;
      if (!!every) setInterval(function () {
        return arr.forEach(func);
      }, every);else if (!!delay) setTimeout(function () {
        return arr.forEach(func);
      }, delay);else arr.forEach(func);
      return this;
    }
  }, {
    key: "$run",
    value: function $run(func, arr) {
      var _this4 = this;

      arr = Aq.clean(arr);
      if (!Aq.is_array(arr)) arr = [arr];
      arr.forEach(function (i) {
        return _this4.run(function (e) {
          return func(e, i);
        });
      });
      return this;
    }
  }, {
    key: "$runBool",
    value: function $runBool(func, arr) {
      var _this5 = this;

      var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref7$someArr = _ref7.someArr,
          someArr = _ref7$someArr === void 0 ? false : _ref7$someArr,
          _ref7$someEl = _ref7.someEl,
          someEl = _ref7$someEl === void 0 ? false : _ref7$someEl;

      // returns a boolean
      if (!Aq.is_array(arr)) arr = [arr];

      var to_run = function to_run(i) {
        return someEl ? _this5.arr.some(function (e) {
          return func(e, i);
        }) : _this5.arr.every(function (e) {
          return func(e, i);
        });
      };

      return someArr ? arr.some(to_run) : arr.every(to_run);
    }
  }, {
    key: "$set",
    value: function $set(func, props, value) {
      var attrs = [];
      props = Aq.clean(props);
      var propsIsStr = typeof props === 'string';
      this.run(function (e) {
        if (Aq.is_dict(props)) for (var key in props) {
          func(e, key, props[key]);
        } else if (Aq.is_array(props) || value === undefined) {
          if (propsIsStr) props = [props];
          attrs = [].concat(_toConsumableArray(attrs), _toConsumableArray(props.reduce(function (arr, key) {
            return [].concat(_toConsumableArray(arr), [func(e, key)]);
          }, [])));
        } else func(e, props, value);
      });
      if ((Aq.is_array(props) || propsIsStr) && value === undefined) return this.arr.length === 1 && propsIsStr ? attrs[0] : attrs;
      return this;
    }
  }, {
    key: "prop",
    value: function prop(props, value) {
      return this.$set(function (e, prop, val) {
        if (Aq.is_array(Aq.clean(props)) || val === undefined) return e[prop];

        try {
          e[prop] = val;
        } catch (err) {
          console.error(err);
        }
      }, props, value);
    } //end
    //property getters & setters

  }, {
    key: "$",
    //end
    //new init
    value: function $(query) {
      var els = this.arr.reduce(function (arr, e) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(_$(query, e).arr));
      }, []);
      return els.length === 1 ? $el(els[0]) : $el(els);
    }
  }, {
    key: "$new",
    value: function $new(tag, num) {
      var _new = _$new(tag, num);

      this.append(_new.$$);
      return _new;
    } //end
    //static methods

  }, {
    key: "class",
    get: function get() {
      return this.prop('className');
    },
    set: function set(className) {
      this.prop('className', className);
    }
  }, {
    key: "parent",
    get: function get() {
      //returns first child parent
      return $el(this.arr[0].parentNode);
    }
  }, {
    key: "parents",
    get: function get() {
      var arr = Array.from(this.arr.reduce(function (set, e) {
        return set.add(e.parentNode);
      }, new Set()));
      ;
      return $el(arr);
    }
  }, {
    key: "child",
    get: function get() {
      //needs improvement
      return $el(this.arr[0].childNodes[0]);
    }
  }, {
    key: "children",
    get: function get() {
      var children = [];
      this.run(function (e) {
        children = [].concat(_toConsumableArray(children), _toConsumableArray(Array.from(e.childNodes)));
      });
      return $el(children);
    }
  }, {
    key: "html",
    get: function get() {
      return this.prop('innerHTML');
    },
    set: function set(html) {
      this.prop('innerHTML', html);
    }
  }, {
    key: "text",
    get: function get() {
      return this.prop('textContent');
    },
    set: function set(text) {
      this.prop('textContent', text);
    }
  }, {
    key: "val",
    get: function get() {
      var data = Aq.form_data(this.$$);
      var keys = Object.keys(data);
      if (keys.length === 1) return data[keys[0]];else return data;
    },
    set: function set(value) {
      this.run(function (e) {
        var prop = Aq.form_value(e, true);
        e[prop] = value;
      });
    }
  }], [{
    key: "is_array",
    value: function is_array(arr) {
      return [].__proto__ === arr.__proto__ || NodeList === arr.__proto__.constructor;
    }
  }, {
    key: "is_html",
    value: function is_html(el) {
      var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var is_html = function is_html(e) {
        return e.__proto__.constructor.toString().includes('HTML');
      };

      if (arr) {
        if (!Aq.is_array(el)) el = [el];
        return is_html(el[0]);
      } else return is_html(el);
    }
  }, {
    key: "is_dict",
    value: function is_dict(dict) {
      var d = {};
      return d.__proto__ === dict.__proto__;
    }
  }, {
    key: "obj_text",
    value: function obj_text(props) {
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      for (var i in props) {
        str += "".concat(i, ": ").concat(props[i], "; ").trim();
      }

      return str;
    }
  }, {
    key: "clean",
    value: function clean(q) {
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
    }
  }, {
    key: "form_data",
    value: function form_data(inputs) {
      if (!Aq.is_array(inputs)) inputs = [inputs];
      return inputs.reduce(function (dict, e) {
        var data = Aq.form_value(e);
        if (data === null || e.type === "submit") return dict;
        return Object.assign({}, dict, _defineProperty({}, e.name || e.id, data));
      }, {});
    }
  }, {
    key: "form_value",
    value: function form_value(e) {
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
    }
  }, {
    key: "css_prefix",
    value: function css_prefix(rule) {
      return ['', '-webkit-', '-moz-'].reduce(function (str, pre) {
        return str += "".concat(pre).concat(rule.trim(), ";");
      }, '');
    }
  }, {
    key: "init_style_defaults",
    value: function init_style_defaults() {
      if (_$('abquery-init_style_defaults').$$) return;
      var show = "".concat(Aq.css_prefix('animation: abquery-keyframe-show .6s cubic-bezier(0, 0.9, 0.3, 1.2) forwards'), "\n        opacity: 0;").concat(Aq.css_prefix("transform: translateY(-4rem) scale(.8)"));
      var hidekf = "0% {".concat(Aq.css_prefix('transform: scale(1)'), "opacity: 1;}\n        20%{").concat(Aq.css_prefix('transform: scale(.9)'), "} 100% {").concat(Aq.css_prefix('transform: none'), "opacity: 0;}");
      Aq.add_keyframes('abquery-keyframe-show', "100%{opacity: 1;".concat(Aq.css_prefix('transform: none'), "}"));
      Aq.add_style(".abquery-show", show);
      Aq.add_keyframes("abquery-keyframe-hide", hidekf);
      Aq.add_style(".abquery-hide", "".concat(Aq.css_prefix("animation: abquery-keyframe-hide .6s ease-out")));
      return Aq.add_style(".abquery-d-none", "display:none !important").attr('abquery-init_style_defaults', true);
    }
  }, {
    key: "gen_frames",
    value: function gen_frames(name, frames) {
      return "\n        @keyframes ".concat(name, " {").concat(frames, "}\n        @-webkit-keyframes ").concat(name, " {").concat(frames, "}\n        ");
    }
  }, {
    key: "get_styles",
    value: function get_styles() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Aq.styleElementId;

      var aqstyles = _$("#".concat(id));

      if (!aqstyles.$$) aqstyles = _$new('style').attr({
        type: "text/css",
        id: "".concat(id)
      });
      return aqstyles;
    }
  }, {
    key: "add_keyframes",
    value: function add_keyframes(name, frames) {
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Aq.styleElementId;
      var aqstyles = Aq.get_styles(id);
      aqstyles.appendParent(document.head).html += Aq.gen_frames(name, frames);
      return aqstyles;
    }
  }, {
    key: "add_style",
    value: function add_style(selector, rules, id) {
      var aqstyles = Aq.get_styles(id);
      aqstyles.appendParent(document.head).html += "".concat(selector, " {").concat(rules, "}");
      return aqstyles;
    } //end

  }]);

  return Aq;
}();

_defineProperty(Aq, "styleElementId", "abquery-stylesheet");

var _$new = function _$new(tagName, num) {
  return new Aq({
    el: tagName,
    num: num
  });
};

var $el = function $el(el) {
  return new Aq({
    el: el
  });
};

var _$ = function _$(query, element_to_query) {
  return new Aq({
    query: query,
    parent: element_to_query
  });
};

window.$new = _$new;
window.$el = $el;
window.$ = _$;
window.Aq = Aq;