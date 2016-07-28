/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	__webpack_require__(10);

	__webpack_require__(13);

	__webpack_require__(14);

	__webpack_require__(15);

	__webpack_require__(16);

	__webpack_require__(17);

	__webpack_require__(18);

	__webpack_require__(19);

	__webpack_require__(20);

	__webpack_require__(21);

	__webpack_require__(23);

	__webpack_require__(24);

	__webpack_require__(25);

	__webpack_require__(26);

	riot.mount('*');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* Riot v2.4.1, @license MIT */

	;(function (window, undefined) {
	  'use strict';

	  var riot = { version: 'v2.4.1', settings: {} },

	  // be aware, internal usage
	  // ATTENTION: prefix the global dynamic variables with `__`

	  // counter to give a unique id to all the Tag instances
	  __uid = 0,

	  // tags instances cache
	  __virtualDom = [],

	  // tags implementation cache
	  __tagImpl = {},


	  /**
	   * Const
	   */
	  GLOBAL_MIXIN = '__global_mixin',


	  // riot specific prefixes
	  RIOT_PREFIX = 'riot-',
	      RIOT_TAG = RIOT_PREFIX + 'tag',
	      RIOT_TAG_IS = 'data-is',


	  // for typeof == '' comparisons
	  T_STRING = 'string',
	      T_OBJECT = 'object',
	      T_UNDEF = 'undefined',
	      T_FUNCTION = 'function',

	  // special native tags that cannot be treated like the others
	  SPECIAL_TAGS_REGEX = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
	      RESERVED_WORDS_BLACKLIST = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,

	  // SVG tags list https://www.w3.org/TR/SVG/attindex.html#PresentationAttributes
	  SVG_TAGS_LIST = ['altGlyph', 'animate', 'animateColor', 'circle', 'clipPath', 'defs', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'font', 'foreignObject', 'g', 'glyph', 'glyphRef', 'image', 'line', 'linearGradient', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use'],


	  // version# for IE 8-11, 0 for others
	  IE_VERSION = (window && window.document || {}).documentMode | 0,


	  // detect firefox to fix #1374
	  FIREFOX = window && !!window.InstallTrigger;
	  /* istanbul ignore next */
	  riot.observable = function (el) {

	    /**
	     * Extend the original object or create a new empty one
	     * @type { Object }
	     */

	    el = el || {};

	    /**
	     * Private variables
	     */
	    var callbacks = {},
	        slice = Array.prototype.slice;

	    /**
	     * Private Methods
	     */

	    /**
	     * Helper function needed to get and loop all the events in a string
	     * @param   { String }   e - event string
	     * @param   {Function}   fn - callback
	     */
	    function onEachEvent(e, fn) {
	      var es = e.split(' '),
	          l = es.length,
	          i = 0,
	          name,
	          indx;
	      for (; i < l; i++) {
	        name = es[i];
	        indx = name.indexOf('.');
	        if (name) fn(~indx ? name.substring(0, indx) : name, i, ~indx ? name.slice(indx + 1) : null);
	      }
	    }

	    /**
	     * Public Api
	     */

	    // extend the el object adding the observable methods
	    Object.defineProperties(el, {
	      /**
	       * Listen to the given space separated list of `events` and
	       * execute the `callback` each time an event is triggered.
	       * @param  { String } events - events ids
	       * @param  { Function } fn - callback function
	       * @returns { Object } el
	       */
	      on: {
	        value: function value(events, fn) {
	          if (typeof fn != 'function') return el;

	          onEachEvent(events, function (name, pos, ns) {
	            (callbacks[name] = callbacks[name] || []).push(fn);
	            fn.typed = pos > 0;
	            fn.ns = ns;
	          });

	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Removes the given space separated list of `events` listeners
	       * @param   { String } events - events ids
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      off: {
	        value: function value(events, fn) {
	          if (events == '*' && !fn) callbacks = {};else {
	            onEachEvent(events, function (name, pos, ns) {
	              if (fn || ns) {
	                var arr = callbacks[name];
	                for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                  if (cb == fn || ns && cb.ns == ns) arr.splice(i--, 1);
	                }
	              } else delete callbacks[name];
	            });
	          }
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Listen to the given space separated list of `events` and
	       * execute the `callback` at most once
	       * @param   { String } events - events ids
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      one: {
	        value: function value(events, fn) {
	          function on() {
	            el.off(events, on);
	            fn.apply(el, arguments);
	          }
	          return el.on(events, on);
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Execute all callback functions that listen to
	       * the given space separated list of `events`
	       * @param   { String } events - events ids
	       * @returns { Object } el
	       */
	      trigger: {
	        value: function value(events) {

	          // getting the arguments
	          var arglen = arguments.length - 1,
	              args = new Array(arglen),
	              fns;

	          for (var i = 0; i < arglen; i++) {
	            args[i] = arguments[i + 1]; // skip first argument
	          }

	          onEachEvent(events, function (name, pos, ns) {

	            fns = slice.call(callbacks[name] || [], 0);

	            for (var i = 0, fn; fn = fns[i]; ++i) {
	              if (fn.busy) continue;
	              fn.busy = 1;
	              if (!ns || fn.ns == ns) fn.apply(el, fn.typed ? [name].concat(args) : args);
	              if (fns[i] !== fn) {
	                i--;
	              }
	              fn.busy = 0;
	            }

	            if (callbacks['*'] && name != '*') el.trigger.apply(el, ['*', name].concat(args));
	          });

	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      }
	    });

	    return el;
	  }
	  /* istanbul ignore next */
	  ;(function (riot) {

	    /**
	     * Simple client-side router
	     * @module riot-route
	     */

	    var RE_ORIGIN = /^.+?\/\/+[^\/]+/,
	        EVENT_LISTENER = 'EventListener',
	        REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
	        ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
	        HAS_ATTRIBUTE = 'hasAttribute',
	        REPLACE = 'replace',
	        POPSTATE = 'popstate',
	        HASHCHANGE = 'hashchange',
	        TRIGGER = 'trigger',
	        MAX_EMIT_STACK_LEVEL = 3,
	        win = typeof window != 'undefined' && window,
	        doc = typeof document != 'undefined' && document,
	        hist = win && history,
	        loc = win && (hist.location || win.location),
	        // see html5-history-api
	    prot = Router.prototype,
	        // to minify more
	    clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
	        started = false,
	        central = riot.observable(),
	        routeFound = false,
	        debouncedEmit,
	        base,
	        current,
	        parser,
	        secondParser,
	        emitStack = [],
	        emitStackLevel = 0;

	    /**
	     * Default parser. You can replace it via router.parser method.
	     * @param {string} path - current path (normalized)
	     * @returns {array} array
	     */
	    function DEFAULT_PARSER(path) {
	      return path.split(/[/?#]/);
	    }

	    /**
	     * Default parser (second). You can replace it via router.parser method.
	     * @param {string} path - current path (normalized)
	     * @param {string} filter - filter string (normalized)
	     * @returns {array} array
	     */
	    function DEFAULT_SECOND_PARSER(path, filter) {
	      var re = new RegExp('^' + filter[REPLACE](/\*/g, '([^/?#]+?)')[REPLACE](/\.\./, '.*') + '$'),
	          args = path.match(re);

	      if (args) return args.slice(1);
	    }

	    /**
	     * Simple/cheap debounce implementation
	     * @param   {function} fn - callback
	     * @param   {number} delay - delay in seconds
	     * @returns {function} debounced function
	     */
	    function debounce(fn, delay) {
	      var t;
	      return function () {
	        clearTimeout(t);
	        t = setTimeout(fn, delay);
	      };
	    }

	    /**
	     * Set the window listeners to trigger the routes
	     * @param {boolean} autoExec - see route.start
	     */
	    function start(autoExec) {
	      debouncedEmit = debounce(emit, 1);
	      win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
	      win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	      doc[ADD_EVENT_LISTENER](clickEvent, click);
	      if (autoExec) emit(true);
	    }

	    /**
	     * Router class
	     */
	    function Router() {
	      this.$ = [];
	      riot.observable(this); // make it observable
	      central.on('stop', this.s.bind(this));
	      central.on('emit', this.e.bind(this));
	    }

	    function normalize(path) {
	      return path[REPLACE](/^\/|\/$/, '');
	    }

	    function isString(str) {
	      return typeof str == 'string';
	    }

	    /**
	     * Get the part after domain name
	     * @param {string} href - fullpath
	     * @returns {string} path from root
	     */
	    function getPathFromRoot(href) {
	      return (href || loc.href)[REPLACE](RE_ORIGIN, '');
	    }

	    /**
	     * Get the part after base
	     * @param {string} href - fullpath
	     * @returns {string} path from base
	     */
	    function getPathFromBase(href) {
	      return base[0] == '#' ? (href || loc.href || '').split(base)[1] || '' : (loc ? getPathFromRoot(href) : href || '')[REPLACE](base, '');
	    }

	    function emit(force) {
	      // the stack is needed for redirections
	      var isRoot = emitStackLevel == 0;
	      if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) return;

	      emitStackLevel++;
	      emitStack.push(function () {
	        var path = getPathFromBase();
	        if (force || path != current) {
	          central[TRIGGER]('emit', path);
	          current = path;
	        }
	      });
	      if (isRoot) {
	        while (emitStack.length) {
	          emitStack[0]();
	          emitStack.shift();
	        }
	        emitStackLevel = 0;
	      }
	    }

	    function click(e) {
	      if (e.which != 1 // not left click
	       || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	       || e.defaultPrevented // or default prevented
	      ) return;

	      var el = e.target;
	      while (el && el.nodeName != 'A') {
	        el = el.parentNode;
	      }if (!el || el.nodeName != 'A' // not A tag
	       || el[HAS_ATTRIBUTE]('download') // has download attr
	       || !el[HAS_ATTRIBUTE]('href') // has no href attr
	       || el.target && el.target != '_self' // another window or frame
	       || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
	      ) return;

	      if (el.href != loc.href) {
	        if (el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
	         || base != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	         || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	        ) return;
	      }

	      e.preventDefault();
	    }

	    /**
	     * Go to the path
	     * @param {string} path - destination path
	     * @param {string} title - page title
	     * @param {boolean} shouldReplace - use replaceState or pushState
	     * @returns {boolean} - route not found flag
	     */
	    function go(path, title, shouldReplace) {
	      if (hist) {
	        // if a browser
	        path = base + normalize(path);
	        title = title || doc.title;
	        // browsers ignores the second parameter `title`
	        shouldReplace ? hist.replaceState(null, title, path) : hist.pushState(null, title, path);
	        // so we need to set it manually
	        doc.title = title;
	        routeFound = false;
	        emit();
	        return routeFound;
	      }

	      // Server-side usage: directly execute handlers for the path
	      return central[TRIGGER]('emit', getPathFromBase(path));
	    }

	    /**
	     * Go to path or set action
	     * a single string:                go there
	     * two strings:                    go there with setting a title
	     * two strings and boolean:        replace history with setting a title
	     * a single function:              set an action on the default route
	     * a string/RegExp and a function: set an action on the route
	     * @param {(string|function)} first - path / action / filter
	     * @param {(string|RegExp|function)} second - title / action
	     * @param {boolean} third - replace flag
	     */
	    prot.m = function (first, second, third) {
	      if (isString(first) && (!second || isString(second))) go(first, second, third || false);else if (second) this.r(first, second);else this.r('@', first);
	    };

	    /**
	     * Stop routing
	     */
	    prot.s = function () {
	      this.off('*');
	      this.$ = [];
	    };

	    /**
	     * Emit
	     * @param {string} path - path
	     */
	    prot.e = function (path) {
	      this.$.concat('@').some(function (filter) {
	        var args = (filter == '@' ? parser : secondParser)(normalize(path), normalize(filter));
	        if (typeof args != 'undefined') {
	          this[TRIGGER].apply(null, [filter].concat(args));
	          return routeFound = true; // exit from loop
	        }
	      }, this);
	    };

	    /**
	     * Register route
	     * @param {string} filter - filter for matching to url
	     * @param {function} action - action to register
	     */
	    prot.r = function (filter, action) {
	      if (filter != '@') {
	        filter = '/' + normalize(filter);
	        this.$.push(filter);
	      }
	      this.on(filter, action);
	    };

	    var mainRouter = new Router();
	    var route = mainRouter.m.bind(mainRouter);

	    /**
	     * Create a sub router
	     * @returns {function} the method of a new Router object
	     */
	    route.create = function () {
	      var newSubRouter = new Router();
	      // assign sub-router's main method
	      var router = newSubRouter.m.bind(newSubRouter);
	      // stop only this sub-router
	      router.stop = newSubRouter.s.bind(newSubRouter);
	      return router;
	    };

	    /**
	     * Set the base of url
	     * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	     */
	    route.base = function (arg) {
	      base = arg || '#';
	      current = getPathFromBase(); // recalculate current path
	    };

	    /** Exec routing right now **/
	    route.exec = function () {
	      emit(true);
	    };

	    /**
	     * Replace the default router to yours
	     * @param {function} fn - your parser function
	     * @param {function} fn2 - your secondParser function
	     */
	    route.parser = function (fn, fn2) {
	      if (!fn && !fn2) {
	        // reset parser for testing...
	        parser = DEFAULT_PARSER;
	        secondParser = DEFAULT_SECOND_PARSER;
	      }
	      if (fn) parser = fn;
	      if (fn2) secondParser = fn2;
	    };

	    /**
	     * Helper function to get url query as an object
	     * @returns {object} parsed query
	     */
	    route.query = function () {
	      var q = {};
	      var href = loc.href || current;
	      href[REPLACE](/[?&](.+?)=([^&]*)/g, function (_, k, v) {
	        q[k] = v;
	      });
	      return q;
	    };

	    /** Stop routing **/
	    route.stop = function () {
	      if (started) {
	        if (win) {
	          win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
	          win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	          doc[REMOVE_EVENT_LISTENER](clickEvent, click);
	        }
	        central[TRIGGER]('stop');
	        started = false;
	      }
	    };

	    /**
	     * Start routing
	     * @param {boolean} autoExec - automatically exec after starting if true
	     */
	    route.start = function (autoExec) {
	      if (!started) {
	        if (win) {
	          if (document.readyState == 'complete') start(autoExec);
	          // the timeout is needed to solve
	          // a weird safari bug https://github.com/riot/route/issues/33
	          else win[ADD_EVENT_LISTENER]('load', function () {
	              setTimeout(function () {
	                start(autoExec);
	              }, 1);
	            });
	        }
	        started = true;
	      }
	    };

	    /** Prepare the router **/
	    route.base();
	    route.parser();

	    riot.route = route;
	  })(riot);
	  /* istanbul ignore next */

	  /**
	   * The riot template engine
	   * @version v2.4.0
	   */
	  /**
	   * riot.util.brackets
	   *
	   * - `brackets    ` - Returns a string or regex based on its parameter
	   * - `brackets.set` - Change the current riot brackets
	   *
	   * @module
	   */

	  var brackets = function (UNDEF) {

	    var REGLOB = 'g',
	        R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
	        R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,
	        S_QBLOCKS = R_STRINGS.source + '|' + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,
	        FINDBRACES = {
	      '(': RegExp('([()])|' + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|' + S_QBLOCKS, REGLOB)
	    },
	        DEFAULT = '{ }';

	    var _pairs = ['{', '}', '{', '}', /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB), DEFAULT, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/];

	    var cachedBrackets = UNDEF,
	        _regex,
	        _cache = [],
	        _settings;

	    function _loopback(re) {
	      return re;
	    }

	    function _rewrite(re, bp) {
	      if (!bp) bp = _cache;
	      return new RegExp(re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : '');
	    }

	    function _create(pair) {
	      if (pair === DEFAULT) return _pairs;

	      var arr = pair.split(' ');

	      if (arr.length !== 2 || /[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(pair)) {
	        // eslint-disable-line
	        throw new Error('Unsupported brackets "' + pair + '"');
	      }
	      arr = arr.concat(pair.replace(/(?=[[\]()*+?.^$|])/g, '\\').split(' '));

	      arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	      arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	      arr[6] = _rewrite(_pairs[6], arr);
	      arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
	      arr[8] = pair;
	      return arr;
	    }

	    function _brackets(reOrIdx) {
	      return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx];
	    }

	    _brackets.split = function split(str, tmpl, _bp) {
	      // istanbul ignore next: _bp is for the compiler
	      if (!_bp) _bp = _cache;

	      var parts = [],
	          match,
	          isexpr,
	          start,
	          pos,
	          re = _bp[6];

	      isexpr = start = re.lastIndex = 0;

	      while (match = re.exec(str)) {

	        pos = match.index;

	        if (isexpr) {

	          if (match[2]) {
	            re.lastIndex = skipBraces(str, match[2], re.lastIndex);
	            continue;
	          }
	          if (!match[3]) {
	            continue;
	          }
	        }

	        if (!match[1]) {
	          unescapeStr(str.slice(start, pos));
	          start = re.lastIndex;
	          re = _bp[6 + (isexpr ^= 1)];
	          re.lastIndex = start;
	        }
	      }

	      if (str && start < str.length) {
	        unescapeStr(str.slice(start));
	      }

	      return parts;

	      function unescapeStr(s) {
	        if (tmpl || isexpr) {
	          parts.push(s && s.replace(_bp[5], '$1'));
	        } else {
	          parts.push(s);
	        }
	      }

	      function skipBraces(s, ch, ix) {
	        var match,
	            recch = FINDBRACES[ch];

	        recch.lastIndex = ix;
	        ix = 1;
	        while (match = recch.exec(s)) {
	          if (match[1] && !(match[1] === ch ? ++ix : --ix)) break;
	        }
	        return ix ? s.length : recch.lastIndex;
	      }
	    };

	    _brackets.hasExpr = function hasExpr(str) {
	      return _cache[4].test(str);
	    };

	    _brackets.loopKeys = function loopKeys(expr) {
	      var m = expr.match(_cache[9]);

	      return m ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] } : { val: expr.trim() };
	    };

	    _brackets.array = function array(pair) {
	      return pair ? _create(pair) : _cache;
	    };

	    function _reset(pair) {
	      if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	        _cache = _create(pair);
	        _regex = pair === DEFAULT ? _loopback : _rewrite;
	        _cache[9] = _regex(_pairs[9]);
	      }
	      cachedBrackets = pair;
	    }

	    function _setSettings(o) {
	      var b;

	      o = o || {};
	      b = o.brackets;
	      Object.defineProperty(o, 'brackets', {
	        set: _reset,
	        get: function get() {
	          return cachedBrackets;
	        },
	        enumerable: true
	      });
	      _settings = o;
	      _reset(b);
	    }

	    Object.defineProperty(_brackets, 'settings', {
	      set: _setSettings,
	      get: function get() {
	        return _settings;
	      }
	    });

	    /* istanbul ignore next: in the browser riot is always in the scope */
	    _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
	    _brackets.set = _reset;

	    _brackets.R_STRINGS = R_STRINGS;
	    _brackets.R_MLCOMMS = R_MLCOMMS;
	    _brackets.S_QBLOCKS = S_QBLOCKS;

	    return _brackets;
	  }();

	  /**
	   * @module tmpl
	   *
	   * tmpl          - Root function, returns the template value, render with data
	   * tmpl.hasExpr  - Test the existence of a expression inside a string
	   * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	   */

	  var tmpl = function () {

	    var _cache = {};

	    function _tmpl(str, data) {
	      if (!str) return str;

	      return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr);
	    }

	    _tmpl.haveRaw = brackets.hasRaw;

	    _tmpl.hasExpr = brackets.hasExpr;

	    _tmpl.loopKeys = brackets.loopKeys;

	    _tmpl.errorHandler = null;

	    function _logErr(err, ctx) {

	      if (_tmpl.errorHandler) {

	        err.riotData = {
	          tagName: ctx && ctx.root && ctx.root.tagName,
	          _riot_id: ctx && ctx._riot_id //eslint-disable-line camelcase
	        };
	        _tmpl.errorHandler(err);
	      }
	    }

	    function _create(str) {
	      var expr = _getTmpl(str);

	      if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr;

	      /* eslint-disable */

	      return new Function('E', expr + ';');
	      /* eslint-enable */
	    }

	    var CH_IDEXPR = '⁗',
	        RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	        RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	        RE_DQUOTE = /\u2057/g,
	        RE_QBMARK = /\u2057(\d+)~/g;

	    function _getTmpl(str) {
	      var qstr = [],
	          expr,
	          parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);

	      if (parts.length > 2 || parts[0]) {
	        var i,
	            j,
	            list = [];

	        for (i = j = 0; i < parts.length; ++i) {

	          expr = parts[i];

	          if (expr && (expr = i & 1 ? _parseExpr(expr, 1, qstr) : '"' + expr.replace(/\\/g, '\\\\').replace(/\r\n?|\n/g, '\\n').replace(/"/g, '\\"') + '"')) list[j++] = expr;
	        }

	        expr = j < 2 ? list[0] : '[' + list.join(',') + '].join("")';
	      } else {

	        expr = _parseExpr(parts[1], 0, qstr);
	      }

	      if (qstr[0]) {
	        expr = expr.replace(RE_QBMARK, function (_, pos) {
	          return qstr[pos].replace(/\r/g, '\\r').replace(/\n/g, '\\n');
	        });
	      }
	      return expr;
	    }

	    var RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };

	    function _parseExpr(expr, asText, qstr) {

	      expr = expr.replace(RE_QBLOCK, function (s, div) {
	        return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s;
	      }).replace(/\s+/g, ' ').trim().replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

	      if (expr) {
	        var list = [],
	            cnt = 0,
	            match;

	        while (expr && (match = expr.match(RE_CSNAME)) && !match.index) {
	          var key,
	              jsb,
	              re = /,|([[{(])|$/g;

	          expr = RegExp.rightContext;
	          key = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

	          while (jsb = (match = re.exec(expr))[1]) {
	            skipBraces(jsb, re);
	          }jsb = expr.slice(0, match.index);
	          expr = RegExp.rightContext;

	          list[cnt++] = _wrapExpr(jsb, 1, key);
	        }

	        expr = !cnt ? _wrapExpr(expr, asText) : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
	      }
	      return expr;

	      function skipBraces(ch, re) {
	        var mm,
	            lv = 1,
	            ir = RE_BREND[ch];

	        ir.lastIndex = re.lastIndex;
	        while (mm = ir.exec(expr)) {
	          if (mm[0] === ch) ++lv;else if (! --lv) break;
	        }
	        re.lastIndex = lv ? expr.length : ir.lastIndex;
	      }
	    }

	    // istanbul ignore next: not both
	    var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' ? 'global' : 'window') + ').',
	        JS_VARNAME = /[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	        JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

	    function _wrapExpr(expr, asText, key) {
	      var tb;

	      expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	        if (mvar) {
	          pos = tb ? 0 : pos + match.length;

	          if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	            match = p + '("' + mvar + JS_CONTEXT + mvar;
	            if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '[';
	          } else if (pos) {
	            tb = !JS_NOPROPS.test(s.slice(pos));
	          }
	        }
	        return match;
	      });

	      if (tb) {
	        expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
	      }

	      if (key) {

	        expr = (tb ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')') + '?"' + key + '":""';
	      } else if (asText) {

	        expr = 'function(v){' + (tb ? expr.replace('return ', 'v=') : 'v=(' + expr + ')') + ';return v||v===0?v:""}.call(this)';
	      }

	      return expr;
	    }

	    // istanbul ignore next: compatibility fix for beta versions
	    _tmpl.parse = function (s) {
	      return s;
	    };

	    _tmpl.version = brackets.version = 'v2.4.0';

	    return _tmpl;
	  }();

	  /*
	    lib/browser/tag/mkdom.js
	  
	    Includes hacks needed for the Internet Explorer version 9 and below
	    See: http://kangax.github.io/compat-table/es5/#ie8
	         http://codeplanet.io/dropping-ie8/
	  */
	  var mkdom = function _mkdom() {
	    var reHasYield = /<yield\b/i,
	        reYieldAll = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
	        reYieldSrc = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
	        reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	    var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
	        tblTags = IE_VERSION && IE_VERSION < 10 ? SPECIAL_TAGS_REGEX : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;

	    /**
	     * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	     * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	     *
	     * @param   {string} templ  - The template coming from the custom tag definition
	     * @param   {string} [html] - HTML content that comes from the DOM element where you
	     *           will mount the tag, mostly the original tag in the page
	     * @returns {HTMLElement} DOM element with _templ_ merged through `YIELD` with the _html_.
	     */
	    function _mkdom(templ, html) {
	      var match = templ && templ.match(/^\s*<([-\w]+)/),
	          tagName = match && match[1].toLowerCase(),
	          el = mkEl('div', isSVGTag(tagName));

	      // replace all the yield tags with the tag inner html
	      templ = replaceYield(templ, html);

	      /* istanbul ignore next */
	      if (tblTags.test(tagName)) el = specialTags(el, templ, tagName);else setInnerHTML(el, templ);

	      el.stub = true;

	      return el;
	    }

	    /*
	      Creates the root element for table or select child elements:
	      tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	    */
	    function specialTags(el, templ, tagName) {
	      var select = tagName[0] === 'o',
	          parent = select ? 'select>' : 'table>';

	      // trim() is important here, this ensures we don't have artifacts,
	      // so we can check if we have only one element inside the parent
	      el.innerHTML = '<' + parent + templ.trim() + '</' + parent;
	      parent = el.firstChild;

	      // returns the immediate parent if tr/th/td/col is the only element, if not
	      // returns the whole tree, as this can include additional elements
	      if (select) {
	        parent.selectedIndex = -1; // for IE9, compatible w/current riot behavior
	      } else {
	          // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	          var tname = rootEls[tagName];
	          if (tname && parent.childElementCount === 1) parent = $(tname, parent);
	        }
	      return parent;
	    }

	    /*
	      Replace the yield tag from any tag template with the innerHTML of the
	      original tag in the page
	    */
	    function replaceYield(templ, html) {
	      // do nothing if no yield
	      if (!reHasYield.test(templ)) return templ;

	      // be careful with #1343 - string on the source having `$1`
	      var src = {};

	      html = html && html.replace(reYieldSrc, function (_, ref, text) {
	        src[ref] = src[ref] || text; // preserve first definition
	        return '';
	      }).trim();

	      return templ.replace(reYieldDest, function (_, ref, def) {
	        // yield with from - to attrs
	        return src[ref] || def || '';
	      }).replace(reYieldAll, function (_, def) {
	        // yield without any "from"
	        return html || def || '';
	      });
	    }

	    return _mkdom;
	  }();

	  /**
	   * Convert the item looped into an object used to extend the child tag properties
	   * @param   { Object } expr - object containing the keys used to extend the children tags
	   * @param   { * } key - value to assign to the new object returned
	   * @param   { * } val - value containing the position of the item in the array
	   * @returns { Object } - new object containing the values of the original item
	   *
	   * The variables 'key' and 'val' are arbitrary.
	   * They depend on the collection type looped (Array, Object)
	   * and on the expression used on the each tag
	   *
	   */
	  function mkitem(expr, key, val) {
	    var item = {};
	    item[expr.key] = key;
	    if (expr.pos) item[expr.pos] = val;
	    return item;
	  }

	  /**
	   * Unmount the redundant tags
	   * @param   { Array } items - array containing the current items to loop
	   * @param   { Array } tags - array containing all the children tags
	   */
	  function unmountRedundant(items, tags) {

	    var i = tags.length,
	        j = items.length,
	        t;

	    while (i > j) {
	      t = tags[--i];
	      tags.splice(i, 1);
	      t.unmount();
	    }
	  }

	  /**
	   * Move the nested custom tags in non custom loop tags
	   * @param   { Object } child - non custom loop tag
	   * @param   { Number } i - current position of the loop tag
	   */
	  function moveNestedTags(child, i) {
	    Object.keys(child.tags).forEach(function (tagName) {
	      var tag = child.tags[tagName];
	      if (isArray(tag)) each(tag, function (t) {
	        moveChildTag(t, tagName, i);
	      });else moveChildTag(tag, tagName, i);
	    });
	  }

	  /**
	   * Adds the elements for a virtual tag
	   * @param { Tag } tag - the tag whose root's children will be inserted or appended
	   * @param { Node } src - the node that will do the inserting or appending
	   * @param { Tag } target - only if inserting, insert before this tag's first child
	   */
	  function addVirtual(tag, src, target) {
	    var el = tag._root,
	        sib;
	    tag._virts = [];
	    while (el) {
	      sib = el.nextSibling;
	      if (target) src.insertBefore(el, target._root);else src.appendChild(el);

	      tag._virts.push(el); // hold for unmounting
	      el = sib;
	    }
	  }

	  /**
	   * Move virtual tag and all child nodes
	   * @param { Tag } tag - first child reference used to start move
	   * @param { Node } src  - the node that will do the inserting
	   * @param { Tag } target - insert before this tag's first child
	   * @param { Number } len - how many child nodes to move
	   */
	  function moveVirtual(tag, src, target, len) {
	    var el = tag._root,
	        sib,
	        i = 0;
	    for (; i < len; i++) {
	      sib = el.nextSibling;
	      src.insertBefore(el, target._root);
	      el = sib;
	    }
	  }

	  /**
	   * Manage tags having the 'each'
	   * @param   { Object } dom - DOM node we need to loop
	   * @param   { Tag } parent - parent tag instance where the dom node is contained
	   * @param   { String } expr - string contained in the 'each' attribute
	   */
	  function _each(dom, parent, expr) {

	    // remove the each property from the original tag
	    remAttr(dom, 'each');

	    var mustReorder = _typeof(getAttr(dom, 'no-reorder')) !== T_STRING || remAttr(dom, 'no-reorder'),
	        tagName = getTagName(dom),
	        impl = __tagImpl[tagName] || { tmpl: getOuterHTML(dom) },
	        useRoot = SPECIAL_TAGS_REGEX.test(tagName),
	        root = dom.parentNode,
	        ref = document.createTextNode(''),
	        child = getTag(dom),
	        isOption = tagName.toLowerCase() === 'option',
	        // the option tags must be treated differently
	    tags = [],
	        oldItems = [],
	        hasKeys,
	        isVirtual = dom.tagName == 'VIRTUAL';

	    // parse the each expression
	    expr = tmpl.loopKeys(expr);

	    // insert a marked where the loop tags will be injected
	    root.insertBefore(ref, dom);

	    // clean template code
	    parent.one('before-mount', function () {

	      // remove the original DOM node
	      dom.parentNode.removeChild(dom);
	      if (root.stub) root = parent.root;
	    }).on('update', function () {
	      // get the new items collection
	      var items = tmpl(expr.val, parent),

	      // create a fragment to hold the new DOM nodes to inject in the parent tag
	      frag = document.createDocumentFragment();

	      // object loop. any changes cause full redraw
	      if (!isArray(items)) {
	        hasKeys = items || false;
	        items = hasKeys ? Object.keys(items).map(function (key) {
	          return mkitem(expr, key, items[key]);
	        }) : [];
	      }

	      // loop all the new items
	      var i = 0,
	          itemsLength = items.length;

	      for (; i < itemsLength; i++) {
	        // reorder only if the items are objects
	        var item = items[i],
	            _mustReorder = mustReorder && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) == T_OBJECT && !hasKeys,
	            oldPos = oldItems.indexOf(item),
	            pos = ~oldPos && _mustReorder ? oldPos : i,

	        // does a tag exist in this position?
	        tag = tags[pos];

	        item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

	        // new tag
	        if (!_mustReorder && !tag // with no-reorder we just update the old tags
	         || _mustReorder && ! ~oldPos || !tag // by default we always try to reorder the DOM elements
	        ) {

	            tag = new Tag(impl, {
	              parent: parent,
	              isLoop: true,
	              hasImpl: !!__tagImpl[tagName],
	              root: useRoot ? root : dom.cloneNode(),
	              item: item
	            }, dom.innerHTML);

	            tag.mount();

	            if (isVirtual) tag._root = tag.root.firstChild; // save reference for further moves or inserts
	            // this tag must be appended
	            if (i == tags.length || !tags[i]) {
	              // fix 1581
	              if (isVirtual) addVirtual(tag, frag);else frag.appendChild(tag.root);
	            }
	            // this tag must be insert
	            else {
	                if (isVirtual) addVirtual(tag, root, tags[i]);else root.insertBefore(tag.root, tags[i].root); // #1374 some browsers reset selected here
	                oldItems.splice(i, 0, item);
	              }

	            tags.splice(i, 0, tag);
	            pos = i; // handled here so no move
	          } else tag.update(item, true);

	        // reorder the tag if it's not located in its previous position
	        if (pos !== i && _mustReorder && tags[i] // fix 1581 unable to reproduce it in a test!
	        ) {
	            // update the DOM
	            if (isVirtual) moveVirtual(tag, root, tags[i], dom.childNodes.length);else root.insertBefore(tag.root, tags[i].root);
	            // update the position attribute if it exists
	            if (expr.pos) tag[expr.pos] = i;
	            // move the old tag instance
	            tags.splice(i, 0, tags.splice(pos, 1)[0]);
	            // move the old item
	            oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	            // if the loop tags are not custom
	            // we need to move all their custom tags into the right position
	            if (!child && tag.tags) moveNestedTags(tag, i);
	          }

	        // cache the original item to use it in the events bound to this node
	        // and its children
	        tag._item = item;
	        // cache the real parent tag internally
	        defineProperty(tag, '_parent', parent);
	      }

	      // remove the redundant tags
	      unmountRedundant(items, tags);

	      // insert the new nodes
	      if (isOption) {
	        root.appendChild(frag);

	        // #1374 FireFox bug in <option selected={expression}>
	        if (FIREFOX && !root.multiple) {
	          for (var n = 0; n < root.length; n++) {
	            if (root[n].__riot1374) {
	              root.selectedIndex = n; // clear other options
	              delete root[n].__riot1374;
	              break;
	            }
	          }
	        }
	      } else root.insertBefore(frag, ref);

	      // set the 'tags' property of the parent tag
	      // if child is 'undefined' it means that we don't need to set this property
	      // for example:
	      // we don't need store the `myTag.tags['div']` property if we are looping a div tag
	      // but we need to track the `myTag.tags['child']` property looping a custom child node named `child`
	      if (child) parent.tags[tagName] = tags;

	      // clone the items array
	      oldItems = items.slice();
	    });
	  }
	  /**
	   * Object that will be used to inject and manage the css of every tag instance
	   */
	  var styleManager = function (_riot) {

	    if (!window) return { // skip injection on the server
	      add: function add() {},
	      inject: function inject() {}
	    };

	    var styleNode = function () {
	      // create a new style element with the correct type
	      var newNode = mkEl('style');
	      setAttr(newNode, 'type', 'text/css');

	      // replace any user node or insert the new one into the head
	      var userNode = $('style[type=riot]');
	      if (userNode) {
	        if (userNode.id) newNode.id = userNode.id;
	        userNode.parentNode.replaceChild(newNode, userNode);
	      } else document.getElementsByTagName('head')[0].appendChild(newNode);

	      return newNode;
	    }();

	    // Create cache and shortcut to the correct property
	    var cssTextProp = styleNode.styleSheet,
	        stylesToInject = '';

	    // Expose the style node in a non-modificable property
	    Object.defineProperty(_riot, 'styleNode', {
	      value: styleNode,
	      writable: true
	    });

	    /**
	     * Public api
	     */
	    return {
	      /**
	       * Save a tag style to be later injected into DOM
	       * @param   { String } css [description]
	       */
	      add: function add(css) {
	        stylesToInject += css;
	      },
	      /**
	       * Inject all previously saved tag styles into DOM
	       * innerHTML seems slow: http://jsperf.com/riot-insert-style
	       */
	      inject: function inject() {
	        if (stylesToInject) {
	          if (cssTextProp) cssTextProp.cssText += stylesToInject;else styleNode.innerHTML += stylesToInject;
	          stylesToInject = '';
	        }
	      }
	    };
	  }(riot);

	  function parseNamedElements(root, tag, childTags, forceParsingNamed) {

	    walk(root, function (dom) {
	      if (dom.nodeType == 1) {
	        dom.isLoop = dom.isLoop || dom.parentNode && dom.parentNode.isLoop || getAttr(dom, 'each') ? 1 : 0;

	        // custom child tag
	        if (childTags) {
	          var child = getTag(dom);

	          if (child && !dom.isLoop) childTags.push(initChildTag(child, { root: dom, parent: tag }, dom.innerHTML, tag));
	        }

	        if (!dom.isLoop || forceParsingNamed) setNamed(dom, tag, []);
	      }
	    });
	  }

	  function parseExpressions(root, tag, expressions) {

	    function addExpr(dom, val, extra) {
	      if (tmpl.hasExpr(val)) {
	        expressions.push(extend({ dom: dom, expr: val }, extra));
	      }
	    }

	    walk(root, function (dom) {
	      var type = dom.nodeType,
	          attr;

	      // text node
	      if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue);
	      if (type != 1) return;

	      /* element */

	      // loop
	      attr = getAttr(dom, 'each');

	      if (attr) {
	        _each(dom, tag, attr);return false;
	      }

	      // attribute expressions
	      each(dom.attributes, function (attr) {
	        var name = attr.name,
	            bool = name.split('__')[1];

	        addExpr(dom, attr.value, { attr: bool || name, bool: bool });
	        if (bool) {
	          remAttr(dom, name);return false;
	        }
	      });

	      // skip custom tags
	      if (getTag(dom)) return false;
	    });
	  }
	  function Tag(impl, conf, innerHTML) {

	    var self = riot.observable(this),
	        opts = inherit(conf.opts) || {},
	        parent = conf.parent,
	        isLoop = conf.isLoop,
	        hasImpl = conf.hasImpl,
	        item = cleanUpData(conf.item),
	        expressions = [],
	        childTags = [],
	        root = conf.root,
	        tagName = root.tagName.toLowerCase(),
	        attr = {},
	        propsInSyncWithParent = [],
	        dom;

	    // only call unmount if we have a valid __tagImpl (has name property)
	    if (impl.name && root._tag) root._tag.unmount(true);

	    // not yet mounted
	    this.isMounted = false;
	    root.isLoop = isLoop;

	    // keep a reference to the tag just created
	    // so we will be able to mount this tag multiple times
	    root._tag = this;

	    // create a unique id to this tag
	    // it could be handy to use it also to improve the virtual dom rendering speed
	    defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id

	    extend(this, { parent: parent, root: root, opts: opts }, item);
	    // protect the "tags" property from being overridden
	    defineProperty(this, 'tags', {});

	    // grab attributes
	    each(root.attributes, function (el) {
	      var val = el.value;
	      // remember attributes with expressions only
	      if (tmpl.hasExpr(val)) attr[el.name] = val;
	    });

	    dom = mkdom(impl.tmpl, innerHTML);

	    // options
	    function updateOpts() {
	      var ctx = hasImpl && isLoop ? self : parent || self;

	      // update opts from current DOM attributes
	      each(root.attributes, function (el) {
	        var val = el.value;
	        opts[toCamel(el.name)] = tmpl.hasExpr(val) ? tmpl(val, ctx) : val;
	      });
	      // recover those with expressions
	      each(Object.keys(attr), function (name) {
	        opts[toCamel(name)] = tmpl(attr[name], ctx);
	      });
	    }

	    function normalizeData(data) {
	      for (var key in item) {
	        if (_typeof(self[key]) !== T_UNDEF && isWritable(self, key)) self[key] = data[key];
	      }
	    }

	    function inheritFromParent() {
	      if (!self.parent || !isLoop) return;
	      each(Object.keys(self.parent), function (k) {
	        // some properties must be always in sync with the parent tag
	        var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k);
	        if (_typeof(self[k]) === T_UNDEF || mustSync) {
	          // track the property to keep in sync
	          // so we can keep it updated
	          if (!mustSync) propsInSyncWithParent.push(k);
	          self[k] = self.parent[k];
	        }
	      });
	    }

	    /**
	     * Update the tag expressions and options
	     * @param   { * }  data - data we want to use to extend the tag properties
	     * @param   { Boolean } isInherited - is this update coming from a parent tag?
	     * @returns { self }
	     */
	    defineProperty(this, 'update', function (data, isInherited) {

	      // make sure the data passed will not override
	      // the component core methods
	      data = cleanUpData(data);
	      // inherit properties from the parent
	      inheritFromParent();
	      // normalize the tag properties in case an item object was initially passed
	      if (data && isObject(item)) {
	        normalizeData(data);
	        item = data;
	      }
	      extend(self, data);
	      updateOpts();
	      self.trigger('update', data);
	      update(expressions, self);

	      // the updated event will be triggered
	      // once the DOM will be ready and all the re-flows are completed
	      // this is useful if you want to get the "real" root properties
	      // 4 ex: root.offsetWidth ...
	      if (isInherited && self.parent)
	        // closes #1599
	        self.parent.one('updated', function () {
	          self.trigger('updated');
	        });else rAF(function () {
	        self.trigger('updated');
	      });

	      return this;
	    });

	    defineProperty(this, 'mixin', function () {
	      each(arguments, function (mix) {
	        var instance;

	        mix = (typeof mix === 'undefined' ? 'undefined' : _typeof(mix)) === T_STRING ? riot.mixin(mix) : mix;

	        // check if the mixin is a function
	        if (isFunction(mix)) {
	          // create the new mixin instance
	          instance = new mix();
	          // save the prototype to loop it afterwards
	          mix = mix.prototype;
	        } else instance = mix;

	        // loop the keys in the function prototype or the all object keys
	        each(Object.getOwnPropertyNames(mix), function (key) {
	          // bind methods to self
	          if (key != 'init') self[key] = isFunction(instance[key]) ? instance[key].bind(self) : instance[key];
	        });

	        // init method will be called automatically
	        if (instance.init) instance.init.bind(self)();
	      });
	      return this;
	    });

	    defineProperty(this, 'mount', function () {

	      updateOpts();

	      // add global mixins
	      var globalMixin = riot.mixin(GLOBAL_MIXIN);
	      if (globalMixin) for (var i in globalMixin) {
	        if (globalMixin.hasOwnProperty(i)) self.mixin(globalMixin[i]);
	      } // initialiation
	      if (impl.fn) impl.fn.call(self, opts);

	      // parse layout after init. fn may calculate args for nested custom tags
	      parseExpressions(dom, self, expressions);

	      // mount the child tags
	      toggle(true);

	      // update the root adding custom attributes coming from the compiler
	      // it fixes also #1087
	      if (impl.attrs) walkAttributes(impl.attrs, function (k, v) {
	        setAttr(root, k, v);
	      });
	      if (impl.attrs || hasImpl) parseExpressions(self.root, self, expressions);

	      if (!self.parent || isLoop) self.update(item);

	      // internal use only, fixes #403
	      self.trigger('before-mount');

	      if (isLoop && !hasImpl) {
	        // update the root attribute for the looped elements
	        root = dom.firstChild;
	      } else {
	        while (dom.firstChild) {
	          root.appendChild(dom.firstChild);
	        }if (root.stub) root = parent.root;
	      }

	      defineProperty(self, 'root', root);

	      // parse the named dom nodes in the looped child
	      // adding them to the parent as well
	      if (isLoop) parseNamedElements(self.root, self.parent, null, true);

	      // if it's not a child tag we can trigger its mount event
	      if (!self.parent || self.parent.isMounted) {
	        self.isMounted = true;
	        self.trigger('mount');
	      }
	      // otherwise we need to wait that the parent event gets triggered
	      else self.parent.one('mount', function () {
	          // avoid to trigger the `mount` event for the tags
	          // not visible included in an if statement
	          if (!isInStub(self.root)) {
	            self.parent.isMounted = self.isMounted = true;
	            self.trigger('mount');
	          }
	        });
	    });

	    defineProperty(this, 'unmount', function (keepRootTag) {
	      var el = root,
	          p = el.parentNode,
	          ptag,
	          tagIndex = __virtualDom.indexOf(self);

	      self.trigger('before-unmount');

	      // remove this tag instance from the global virtualDom variable
	      if (~tagIndex) __virtualDom.splice(tagIndex, 1);

	      if (p) {

	        if (parent) {
	          ptag = getImmediateCustomParentTag(parent);
	          // remove this tag from the parent tags object
	          // if there are multiple nested tags with same name..
	          // remove this element form the array
	          if (isArray(ptag.tags[tagName])) each(ptag.tags[tagName], function (tag, i) {
	            if (tag._riot_id == self._riot_id) ptag.tags[tagName].splice(i, 1);
	          });else
	            // otherwise just delete the tag instance
	            ptag.tags[tagName] = undefined;
	        } else while (el.firstChild) {
	          el.removeChild(el.firstChild);
	        }if (!keepRootTag) p.removeChild(el);else {
	          // the riot-tag and the data-is attributes aren't needed anymore, remove them
	          remAttr(p, RIOT_TAG_IS);
	          remAttr(p, RIOT_TAG); // this will be removed in riot 3.0.0
	        }
	      }

	      if (this._virts) {
	        each(this._virts, function (v) {
	          if (v.parentNode) v.parentNode.removeChild(v);
	        });
	      }

	      self.trigger('unmount');
	      toggle();
	      self.off('*');
	      self.isMounted = false;
	      delete root._tag;
	    });

	    // proxy function to bind updates
	    // dispatched from a parent tag
	    function onChildUpdate(data) {
	      self.update(data, true);
	    }

	    function toggle(isMount) {

	      // mount/unmount children
	      each(childTags, function (child) {
	        child[isMount ? 'mount' : 'unmount']();
	      });

	      // listen/unlisten parent (events flow one way from parent to children)
	      if (!parent) return;
	      var evt = isMount ? 'on' : 'off';

	      // the loop tags will be always in sync with the parent automatically
	      if (isLoop) parent[evt]('unmount', self.unmount);else {
	        parent[evt]('update', onChildUpdate)[evt]('unmount', self.unmount);
	      }
	    }

	    // named elements available for fn
	    parseNamedElements(dom, this, childTags);
	  }
	  /**
	   * Attach an event to a DOM node
	   * @param { String } name - event name
	   * @param { Function } handler - event callback
	   * @param { Object } dom - dom node
	   * @param { Tag } tag - tag instance
	   */
	  function setEventHandler(name, handler, dom, tag) {

	    dom[name] = function (e) {

	      var ptag = tag._parent,
	          item = tag._item,
	          el;

	      if (!item) while (ptag && !item) {
	        item = ptag._item;
	        ptag = ptag._parent;
	      }

	      // cross browser event fix
	      e = e || window.event;

	      // override the event properties
	      if (isWritable(e, 'currentTarget')) e.currentTarget = dom;
	      if (isWritable(e, 'target')) e.target = e.srcElement;
	      if (isWritable(e, 'which')) e.which = e.charCode || e.keyCode;

	      e.item = item;

	      // prevent default behaviour (by default)
	      if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	        if (e.preventDefault) e.preventDefault();
	        e.returnValue = false;
	      }

	      if (!e.preventUpdate) {
	        el = item ? getImmediateCustomParentTag(ptag) : tag;
	        el.update();
	      }
	    };
	  }

	  /**
	   * Insert a DOM node replacing another one (used by if- attribute)
	   * @param   { Object } root - parent node
	   * @param   { Object } node - node replaced
	   * @param   { Object } before - node added
	   */
	  function insertTo(root, node, before) {
	    if (!root) return;
	    root.insertBefore(before, node);
	    root.removeChild(node);
	  }

	  /**
	   * Update the expressions in a Tag instance
	   * @param   { Array } expressions - expression that must be re evaluated
	   * @param   { Tag } tag - tag instance
	   */
	  function update(expressions, tag) {

	    each(expressions, function (expr, i) {

	      var dom = expr.dom,
	          attrName = expr.attr,
	          value = tmpl(expr.expr, tag),
	          parent = expr.dom.parentNode;

	      if (expr.bool) {
	        value = !!value;
	      } else if (value == null) {
	        value = '';
	      }

	      // #1638: regression of #1612, update the dom only if the value of the
	      // expression was changed
	      if (expr.value === value) {
	        return;
	      }
	      expr.value = value;

	      // textarea and text nodes has no attribute name
	      if (!attrName) {
	        // about #815 w/o replace: the browser converts the value to a string,
	        // the comparison by "==" does too, but not in the server
	        value += '';
	        // test for parent avoids error with invalid assignment to nodeValue
	        if (parent) {
	          if (parent.tagName === 'TEXTAREA') {
	            parent.value = value; // #1113
	            if (!IE_VERSION) dom.nodeValue = value; // #1625 IE throws here, nodeValue
	          } // will be available on 'updated'
	          else dom.nodeValue = value;
	        }
	        return;
	      }

	      // ~~#1612: look for changes in dom.value when updating the value~~
	      if (attrName === 'value') {
	        dom.value = value;
	        return;
	      }

	      // remove original attribute
	      remAttr(dom, attrName);

	      // event handler
	      if (isFunction(value)) {
	        setEventHandler(attrName, value, dom, tag);

	        // if- conditional
	      } else if (attrName == 'if') {
	          var stub = expr.stub,
	              add = function add() {
	            insertTo(stub.parentNode, stub, dom);
	          },
	              remove = function remove() {
	            insertTo(dom.parentNode, dom, stub);
	          };

	          // add to DOM
	          if (value) {
	            if (stub) {
	              add();
	              dom.inStub = false;
	              // avoid to trigger the mount event if the tags is not visible yet
	              // maybe we can optimize this avoiding to mount the tag at all
	              if (!isInStub(dom)) {
	                walk(dom, function (el) {
	                  if (el._tag && !el._tag.isMounted) el._tag.isMounted = !!el._tag.trigger('mount');
	                });
	              }
	            }
	            // remove from DOM
	          } else {
	              stub = expr.stub = stub || document.createTextNode('');
	              // if the parentNode is defined we can easily replace the tag
	              if (dom.parentNode) remove();
	              // otherwise we need to wait the updated event
	              else (tag.parent || tag).one('updated', remove);

	              dom.inStub = true;
	            }
	          // show / hide
	        } else if (attrName === 'show') {
	            dom.style.display = value ? '' : 'none';
	          } else if (attrName === 'hide') {
	            dom.style.display = value ? 'none' : '';
	          } else if (expr.bool) {
	            dom[attrName] = value;
	            if (value) setAttr(dom, attrName, attrName);
	            if (FIREFOX && attrName === 'selected' && dom.tagName === 'OPTION') {
	              dom.__riot1374 = value; // #1374
	            }
	          } else if (value === 0 || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== T_OBJECT) {
	              // <img src="{ expr }">
	              if (startsWith(attrName, RIOT_PREFIX) && attrName != RIOT_TAG) {
	                attrName = attrName.slice(RIOT_PREFIX.length);
	              }
	              setAttr(dom, attrName, value);
	            }
	    });
	  }
	  /**
	   * Specialized function for looping an array-like collection with `each={}`
	   * @param   { Array } els - collection of items
	   * @param   {Function} fn - callback function
	   * @returns { Array } the array looped
	   */
	  function each(els, fn) {
	    var len = els ? els.length : 0;

	    for (var i = 0, el; i < len; i++) {
	      el = els[i];
	      // return false -> current item was removed by fn during the loop
	      if (el != null && fn(el, i) === false) i--;
	    }
	    return els;
	  }

	  /**
	   * Detect if the argument passed is a function
	   * @param   { * } v - whatever you want to pass to this function
	   * @returns { Boolean } -
	   */
	  function isFunction(v) {
	    return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === T_FUNCTION || false; // avoid IE problems
	  }

	  /**
	   * Get the outer html of any DOM node SVGs included
	   * @param   { Object } el - DOM node to parse
	   * @returns { String } el.outerHTML
	   */
	  function getOuterHTML(el) {
	    if (el.outerHTML) return el.outerHTML;
	    // some browsers do not support outerHTML on the SVGs tags
	    else {
	        var container = mkEl('div');
	        container.appendChild(el.cloneNode(true));
	        return container.innerHTML;
	      }
	  }

	  /**
	   * Set the inner html of any DOM node SVGs included
	   * @param { Object } container - DOM node where we will inject the new html
	   * @param { String } html - html to inject
	   */
	  function setInnerHTML(container, html) {
	    if (_typeof(container.innerHTML) != T_UNDEF) container.innerHTML = html;
	    // some browsers do not support innerHTML on the SVGs tags
	    else {
	        var doc = new DOMParser().parseFromString(html, 'application/xml');
	        container.appendChild(container.ownerDocument.importNode(doc.documentElement, true));
	      }
	  }

	  /**
	   * Checks wether a DOM node must be considered part of an svg document
	   * @param   { String }  name - tag name
	   * @returns { Boolean } -
	   */
	  function isSVGTag(name) {
	    return ~SVG_TAGS_LIST.indexOf(name);
	  }

	  /**
	   * Detect if the argument passed is an object, exclude null.
	   * NOTE: Use isObject(x) && !isArray(x) to excludes arrays.
	   * @param   { * } v - whatever you want to pass to this function
	   * @returns { Boolean } -
	   */
	  function isObject(v) {
	    return v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === T_OBJECT; // typeof null is 'object'
	  }

	  /**
	   * Remove any DOM attribute from a node
	   * @param   { Object } dom - DOM node we want to update
	   * @param   { String } name - name of the property we want to remove
	   */
	  function remAttr(dom, name) {
	    dom.removeAttribute(name);
	  }

	  /**
	   * Convert a string containing dashes to camel case
	   * @param   { String } string - input string
	   * @returns { String } my-string -> myString
	   */
	  function toCamel(string) {
	    return string.replace(/-(\w)/g, function (_, c) {
	      return c.toUpperCase();
	    });
	  }

	  /**
	   * Get the value of any DOM attribute on a node
	   * @param   { Object } dom - DOM node we want to parse
	   * @param   { String } name - name of the attribute we want to get
	   * @returns { String | undefined } name of the node attribute whether it exists
	   */
	  function getAttr(dom, name) {
	    return dom.getAttribute(name);
	  }

	  /**
	   * Set any DOM attribute
	   * @param { Object } dom - DOM node we want to update
	   * @param { String } name - name of the property we want to set
	   * @param { String } val - value of the property we want to set
	   */
	  function setAttr(dom, name, val) {
	    dom.setAttribute(name, val);
	  }

	  /**
	   * Detect the tag implementation by a DOM node
	   * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	   * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	   */
	  function getTag(dom) {
	    return dom.tagName && __tagImpl[getAttr(dom, RIOT_TAG_IS) || getAttr(dom, RIOT_TAG) || dom.tagName.toLowerCase()];
	  }
	  /**
	   * Add a child tag to its parent into the `tags` object
	   * @param   { Object } tag - child tag instance
	   * @param   { String } tagName - key where the new tag will be stored
	   * @param   { Object } parent - tag instance where the new child tag will be included
	   */
	  function addChildTag(tag, tagName, parent) {
	    var cachedTag = parent.tags[tagName];

	    // if there are multiple children tags having the same name
	    if (cachedTag) {
	      // if the parent tags property is not yet an array
	      // create it adding the first cached tag
	      if (!isArray(cachedTag))
	        // don't add the same tag twice
	        if (cachedTag !== tag) parent.tags[tagName] = [cachedTag];
	      // add the new nested tag to the array
	      if (!contains(parent.tags[tagName], tag)) parent.tags[tagName].push(tag);
	    } else {
	      parent.tags[tagName] = tag;
	    }
	  }

	  /**
	   * Move the position of a custom tag in its parent tag
	   * @param   { Object } tag - child tag instance
	   * @param   { String } tagName - key where the tag was stored
	   * @param   { Number } newPos - index where the new tag will be stored
	   */
	  function moveChildTag(tag, tagName, newPos) {
	    var parent = tag.parent,
	        tags;
	    // no parent no move
	    if (!parent) return;

	    tags = parent.tags[tagName];

	    if (isArray(tags)) tags.splice(newPos, 0, tags.splice(tags.indexOf(tag), 1)[0]);else addChildTag(tag, tagName, parent);
	  }

	  /**
	   * Create a new child tag including it correctly into its parent
	   * @param   { Object } child - child tag implementation
	   * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	   * @param   { String } innerHTML - inner html of the child node
	   * @param   { Object } parent - instance of the parent tag including the child custom tag
	   * @returns { Object } instance of the new child tag just created
	   */
	  function initChildTag(child, opts, innerHTML, parent) {
	    var tag = new Tag(child, opts, innerHTML),
	        tagName = getTagName(opts.root),
	        ptag = getImmediateCustomParentTag(parent);
	    // fix for the parent attribute in the looped elements
	    tag.parent = ptag;
	    // store the real parent tag
	    // in some cases this could be different from the custom parent tag
	    // for example in nested loops
	    tag._parent = parent;

	    // add this tag to the custom parent tag
	    addChildTag(tag, tagName, ptag);
	    // and also to the real parent tag
	    if (ptag !== parent) addChildTag(tag, tagName, parent);
	    // empty the child node once we got its template
	    // to avoid that its children get compiled multiple times
	    opts.root.innerHTML = '';

	    return tag;
	  }

	  /**
	   * Loop backward all the parents tree to detect the first custom parent tag
	   * @param   { Object } tag - a Tag instance
	   * @returns { Object } the instance of the first custom parent tag found
	   */
	  function getImmediateCustomParentTag(tag) {
	    var ptag = tag;
	    while (!getTag(ptag.root)) {
	      if (!ptag.parent) break;
	      ptag = ptag.parent;
	    }
	    return ptag;
	  }

	  /**
	   * Helper function to set an immutable property
	   * @param   { Object } el - object where the new property will be set
	   * @param   { String } key - object key where the new property will be stored
	   * @param   { * } value - value of the new property
	  * @param   { Object } options - set the propery overriding the default options
	   * @returns { Object } - the initial object
	   */
	  function defineProperty(el, key, value, options) {
	    Object.defineProperty(el, key, extend({
	      value: value,
	      enumerable: false,
	      writable: false,
	      configurable: true
	    }, options));
	    return el;
	  }

	  /**
	   * Get the tag name of any DOM node
	   * @param   { Object } dom - DOM node we want to parse
	   * @returns { String } name to identify this dom node in riot
	   */
	  function getTagName(dom) {
	    var child = getTag(dom),
	        namedTag = getAttr(dom, 'name'),
	        tagName = namedTag && !tmpl.hasExpr(namedTag) ? namedTag : child ? child.name : dom.tagName.toLowerCase();

	    return tagName;
	  }

	  /**
	   * Extend any object with other properties
	   * @param   { Object } src - source object
	   * @returns { Object } the resulting extended object
	   *
	   * var obj = { foo: 'baz' }
	   * extend(obj, {bar: 'bar', foo: 'bar'})
	   * console.log(obj) => {bar: 'bar', foo: 'bar'}
	   *
	   */
	  function extend(src) {
	    var obj,
	        args = arguments;
	    for (var i = 1; i < args.length; ++i) {
	      if (obj = args[i]) {
	        for (var key in obj) {
	          // check if this property of the source object could be overridden
	          if (isWritable(src, key)) src[key] = obj[key];
	        }
	      }
	    }
	    return src;
	  }

	  /**
	   * Check whether an array contains an item
	   * @param   { Array } arr - target array
	   * @param   { * } item - item to test
	   * @returns { Boolean } Does 'arr' contain 'item'?
	   */
	  function contains(arr, item) {
	    return ~arr.indexOf(item);
	  }

	  /**
	   * Check whether an object is a kind of array
	   * @param   { * } a - anything
	   * @returns {Boolean} is 'a' an array?
	   */
	  function isArray(a) {
	    return Array.isArray(a) || a instanceof Array;
	  }

	  /**
	   * Detect whether a property of an object could be overridden
	   * @param   { Object }  obj - source object
	   * @param   { String }  key - object property
	   * @returns { Boolean } is this property writable?
	   */
	  function isWritable(obj, key) {
	    var props = Object.getOwnPropertyDescriptor(obj, key);
	    return _typeof(obj[key]) === T_UNDEF || props && props.writable;
	  }

	  /**
	   * With this function we avoid that the internal Tag methods get overridden
	   * @param   { Object } data - options we want to use to extend the tag instance
	   * @returns { Object } clean object without containing the riot internal reserved words
	   */
	  function cleanUpData(data) {
	    if (!(data instanceof Tag) && !(data && _typeof(data.trigger) == T_FUNCTION)) return data;

	    var o = {};
	    for (var key in data) {
	      if (!RESERVED_WORDS_BLACKLIST.test(key)) o[key] = data[key];
	    }
	    return o;
	  }

	  /**
	   * Walk down recursively all the children tags starting dom node
	   * @param   { Object }   dom - starting node where we will start the recursion
	   * @param   { Function } fn - callback to transform the child node just found
	   */
	  function walk(dom, fn) {
	    if (dom) {
	      // stop the recursion
	      if (fn(dom) === false) return;else {
	        dom = dom.firstChild;

	        while (dom) {
	          walk(dom, fn);
	          dom = dom.nextSibling;
	        }
	      }
	    }
	  }

	  /**
	   * Minimize risk: only zero or one _space_ between attr & value
	   * @param   { String }   html - html string we want to parse
	   * @param   { Function } fn - callback function to apply on any attribute found
	   */
	  function walkAttributes(html, fn) {
	    var m,
	        re = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;

	    while (m = re.exec(html)) {
	      fn(m[1].toLowerCase(), m[2] || m[3] || m[4]);
	    }
	  }

	  /**
	   * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	   * @param   { Object }  dom - DOM node we want to parse
	   * @returns { Boolean } -
	   */
	  function isInStub(dom) {
	    while (dom) {
	      if (dom.inStub) return true;
	      dom = dom.parentNode;
	    }
	    return false;
	  }

	  /**
	   * Create a generic DOM node
	   * @param   { String } name - name of the DOM node we want to create
	   * @param   { Boolean } isSvg - should we use a SVG as parent node?
	   * @returns { Object } DOM node just created
	   */
	  function mkEl(name, isSvg) {
	    return isSvg ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(name);
	  }

	  /**
	   * Shorter and fast way to select multiple nodes in the DOM
	   * @param   { String } selector - DOM selector
	   * @param   { Object } ctx - DOM node where the targets of our search will is located
	   * @returns { Object } dom nodes found
	   */
	  function $$(selector, ctx) {
	    return (ctx || document).querySelectorAll(selector);
	  }

	  /**
	   * Shorter and fast way to select a single node in the DOM
	   * @param   { String } selector - unique dom selector
	   * @param   { Object } ctx - DOM node where the target of our search will is located
	   * @returns { Object } dom node found
	   */
	  function $(selector, ctx) {
	    return (ctx || document).querySelector(selector);
	  }

	  /**
	   * Simple object prototypal inheritance
	   * @param   { Object } parent - parent object
	   * @returns { Object } child instance
	   */
	  function inherit(parent) {
	    function Child() {}
	    Child.prototype = parent;
	    return new Child();
	  }

	  /**
	   * Get the name property needed to identify a DOM node in riot
	   * @param   { Object } dom - DOM node we need to parse
	   * @returns { String | undefined } give us back a string to identify this dom node
	   */
	  function getNamedKey(dom) {
	    return getAttr(dom, 'id') || getAttr(dom, 'name');
	  }

	  /**
	   * Set the named properties of a tag element
	   * @param { Object } dom - DOM node we need to parse
	   * @param { Object } parent - tag instance where the named dom element will be eventually added
	   * @param { Array } keys - list of all the tag instance properties
	   */
	  function setNamed(dom, parent, keys) {
	    // get the key value we want to add to the tag instance
	    var key = getNamedKey(dom),
	        isArr,

	    // add the node detected to a tag instance using the named property
	    add = function add(value) {
	      // avoid to override the tag properties already set
	      if (contains(keys, key)) return;
	      // check whether this value is an array
	      isArr = isArray(value);
	      // if the key was never set
	      if (!value)
	        // set it once on the tag instance
	        parent[key] = dom;
	        // if it was an array and not yet set
	      else if (!isArr || isArr && !contains(value, dom)) {
	          // add the dom node into the array
	          if (isArr) value.push(dom);else parent[key] = [value, dom];
	        }
	    };

	    // skip the elements with no named properties
	    if (!key) return;

	    // check whether this key has been already evaluated
	    if (tmpl.hasExpr(key))
	      // wait the first updated event only once
	      parent.one('mount', function () {
	        key = getNamedKey(dom);
	        add(parent[key]);
	      });else add(parent[key]);
	  }

	  /**
	   * Faster String startsWith alternative
	   * @param   { String } src - source string
	   * @param   { String } str - test string
	   * @returns { Boolean } -
	   */
	  function startsWith(src, str) {
	    return src.slice(0, str.length) === str;
	  }

	  /**
	   * requestAnimationFrame function
	   * Adapted from https://gist.github.com/paulirish/1579671, license MIT
	   */
	  var rAF = function (w) {
	    var raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame;

	    if (!raf || /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent)) {
	      // buggy iOS6
	      var lastTime = 0;

	      raf = function raf(cb) {
	        var nowtime = Date.now(),
	            timeout = Math.max(16 - (nowtime - lastTime), 0);
	        setTimeout(function () {
	          cb(lastTime = nowtime + timeout);
	        }, timeout);
	      };
	    }
	    return raf;
	  }(window || {});

	  /**
	   * Mount a tag creating new Tag instance
	   * @param   { Object } root - dom node where the tag will be mounted
	   * @param   { String } tagName - name of the riot tag we want to mount
	   * @param   { Object } opts - options to pass to the Tag instance
	   * @returns { Tag } a new Tag instance
	   */
	  function mountTo(root, tagName, opts) {
	    var tag = __tagImpl[tagName],

	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

	    // clear the inner html
	    root.innerHTML = '';

	    if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML);

	    if (tag && tag.mount) {
	      tag.mount();
	      // add this tag to the virtualDom variable
	      if (!contains(__virtualDom, tag)) __virtualDom.push(tag);
	    }

	    return tag;
	  }
	  /**
	   * Riot public api
	   */

	  // share methods for other riot parts, e.g. compiler
	  riot.util = { brackets: brackets, tmpl: tmpl };

	  /**
	   * Create a mixin that could be globally shared across all the tags
	   */
	  riot.mixin = function () {
	    var mixins = {},
	        globals = mixins[GLOBAL_MIXIN] = {},
	        _id = 0;

	    /**
	     * Create/Return a mixin by its name
	     * @param   { String }  name - mixin name (global mixin if object)
	     * @param   { Object }  mixin - mixin logic
	     * @param   { Boolean } g - is global?
	     * @returns { Object }  the mixin logic
	     */
	    return function (name, mixin, g) {
	      // Unnamed global
	      if (isObject(name)) {
	        riot.mixin('__unnamed_' + _id++, name, true);
	        return;
	      }

	      var store = g ? globals : mixins;

	      // Getter
	      if (!mixin) {
	        if (_typeof(store[name]) === T_UNDEF) {
	          throw new Error('Unregistered mixin: ' + name);
	        }
	        return store[name];
	      }
	      // Setter
	      if (isFunction(mixin)) {
	        extend(mixin.prototype, store[name] || {});
	        store[name] = mixin;
	      } else {
	        store[name] = extend(store[name] || {}, mixin);
	      }
	    };
	  }();

	  /**
	   * Create a new riot tag implementation
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   html - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  riot.tag = function (name, html, css, attrs, fn) {
	    if (isFunction(attrs)) {
	      fn = attrs;
	      if (/^[\w\-]+\s?=/.test(css)) {
	        attrs = css;
	        css = '';
	      } else attrs = '';
	    }
	    if (css) {
	      if (isFunction(css)) fn = css;else styleManager.add(css);
	    }
	    name = name.toLowerCase();
	    __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn };
	    return name;
	  };

	  /**
	   * Create a new riot tag implementation (for use by the compiler)
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   html - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  riot.tag2 = function (name, html, css, attrs, fn) {
	    if (css) styleManager.add(css);
	    //if (bpair) riot.settings.brackets = bpair
	    __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn };
	    return name;
	  };

	  /**
	   * Mount a tag using a specific tag implementation
	   * @param   { String } selector - tag DOM selector
	   * @param   { String } tagName - tag implementation name
	   * @param   { Object } opts - tag logic
	   * @returns { Array } new tags instances
	   */
	  riot.mount = function (selector, tagName, opts) {

	    var els,
	        allTags,
	        tags = [];

	    // helper functions

	    function addRiotTags(arr) {
	      var list = '';
	      each(arr, function (e) {
	        if (!/[^-\w]/.test(e)) {
	          e = e.trim().toLowerCase();
	          list += ',[' + RIOT_TAG_IS + '="' + e + '"],[' + RIOT_TAG + '="' + e + '"]';
	        }
	      });
	      return list;
	    }

	    function selectAllTags() {
	      var keys = Object.keys(__tagImpl);
	      return keys + addRiotTags(keys);
	    }

	    function pushTags(root) {
	      if (root.tagName) {
	        var riotTag = getAttr(root, RIOT_TAG_IS) || getAttr(root, RIOT_TAG);

	        // have tagName? force riot-tag to be the same
	        if (tagName && riotTag !== tagName) {
	          riotTag = tagName;
	          setAttr(root, RIOT_TAG_IS, tagName);
	          setAttr(root, RIOT_TAG, tagName); // this will be removed in riot 3.0.0
	        }
	        var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

	        if (tag) tags.push(tag);
	      } else if (root.length) {
	        each(root, pushTags); // assume nodeList
	      }
	    }

	    // ----- mount code -----

	    // inject styles into DOM
	    styleManager.inject();

	    if (isObject(tagName)) {
	      opts = tagName;
	      tagName = 0;
	    }

	    // crawl the DOM to find the tag
	    if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === T_STRING) {
	      if (selector === '*')
	        // select all the tags registered
	        // and also the tags found with the riot-tag attribute set
	        selector = allTags = selectAllTags();else
	        // or just the ones named like the selector
	        selector += addRiotTags(selector.split(/, */));

	      // make sure to pass always a selector
	      // to the querySelectorAll function
	      els = selector ? $$(selector) : [];
	    } else
	      // probably you have passed already a tag or a NodeList
	      els = selector;

	    // select all the registered and mount them inside their root elements
	    if (tagName === '*') {
	      // get all custom tags
	      tagName = allTags || selectAllTags();
	      // if the root els it's just a single tag
	      if (els.tagName) els = $$(tagName, els);else {
	        // select all the children for all the different root elements
	        var nodeList = [];
	        each(els, function (_el) {
	          nodeList.push($$(tagName, _el));
	        });
	        els = nodeList;
	      }
	      // get rid of the tagName
	      tagName = 0;
	    }

	    pushTags(els);

	    return tags;
	  };

	  /**
	   * Update all the tags instances created
	   * @returns { Array } all the tags instances
	   */
	  riot.update = function () {
	    return each(__virtualDom, function (tag) {
	      tag.update();
	    });
	  };

	  /**
	   * Export the Virtual DOM
	   */
	  riot.vdom = __virtualDom;

	  /**
	   * Export the Tag constructor
	   */
	  riot.Tag = Tag;
	  // support CommonJS, AMD & browser
	  /* istanbul ignore next */
	  if (( false ? 'undefined' : _typeof(exports)) === T_OBJECT) module.exports = riot;else if (( false ? 'undefined' : _typeof(__webpack_require__(11))) === T_FUNCTION && _typeof(__webpack_require__(12)) !== T_UNDEF) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return riot;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else window.riot = riot;
	})(typeof window != 'undefined' ? window : void 0);

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 12 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('app', '<header layout="row" layout-align="space-between center" class="appmenu {activeCard ? \'card-\'+activeCard : \'\'}"> <div if="{activeCard}" layout="row" layout-align="space-around center" flex="70"> <img riot-src="img/card/{activeCard}.png" alt=""> <h2>{cards[activeCard].title}</h2> </div> <a flex="30" onclick="{back}" if="{view!=\'main\'}">back to app</a> </header> <section if="{view == \'main\'}" class="animated" name="menu" layout="row" layout-align="space-between start"> <card card="{card}" key="{key}" onclick="{select}" class="card card-{key}" flex="50" flex-gt-sm="33" each="{key, card in cards}"> <img riot-src="img/card/{key}.png" alt=""> <footer view="card" data-is="{key}"> </footer> </card> </section> <main if="{view==\'card\'}" class="animated" name="content"></main>', '', '', function (opts) {
	    var _this = this;

	    this.cards = {
	        event: { title: 'Events' },
	        guest: { title: 'Guests' },
	        room: { title: 'Rooms' },
	        vendor: { title: 'Vendor' },
	        supporter: { title: 'Supporter' },
	        ludwigsburg: { title: 'Ludwigsburg' },
	        venue: { title: 'Venue' },
	        team: { title: 'Team' },
	        rules: { title: 'Rules' }
	    };

	    this.view = 'main';

	    this.activeCard = false;

	    this.on('mount', function () {
	        console.log(_this);
	        for (var card in _this.cards) {
	            riot.mount(_this.cards[card]);
	        }

	        riot.route.start(true);
	        riot.route(function (name) {
	            if (name == 'main') {
	                _this.view = 'main';
	                _this.activeCard = false;
	                _this.update();
	            } else {
	                _this.activeCard = name;
	                riot.mount(_this.content, name, { view: 'full' });
	            }

	            _this.content.classList.toggle('fadeInUp');
	        });
	    });

	    this.back = function (e) {
	        this.view = 'main';
	        riot.route('main');
	    }.bind(this);

	    this.select = function (e) {
	        riot.route(e.item.key);
	        this.view = 'card';
	    }.bind(this);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('card', '<div class="card-{opts.key}" layout="column" layout-align="center center"> <yield></yield> <header> <h2>{opts.card.title}</h2> </header> </div>', '', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('item', '<div class="item" layout="column" layout-align="space-between center"> <img riot-src="img/item/{opts.key}.png" riot-style="background-color: hsl({opts.item.hue}, 50%, 50%);"> <span>{opts.item.name}</span> </div>', '', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('event', '<div> <section class="scheduler"> <div class="pointer" riot-style="top: {pointerTime}em"></div> <div class="timeAxis"> <div layout="column" each="{hour in timespan}" riot-style="height: {scale}em" class="hour"> <div each="{step in timesteps}"> {pad(hour,2)}:{pad(step,2)} </div> </div> </div> <div class="events" layout="row" layout-align="space-between"> <div layout="column" class="day" each="{day, rooms in schedule}"> <h2>{day}</h2> <div layout="column" each="{room, events in rooms}"> <h3>{room}</h3> <div onclick="{showDetail}" class="event" each="{time, event in events}" riot-style=" background: hsl({event.hue}, 50%, 50%); top: {getTimeSpan(time).offset*scale}em; height: {getTimeSpan(time).height*scale}em"> <h4>{event.title}</h4> {event.description} </div> </div> </div> </div> </section> </div>', '', '', function (opts) {
	    var _this = this;

	    this.showDetail = function (e) {
	        console.log(e);
	    }.bind(this);

	    this.pad = function (n, width) {
	        var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	        n = n + '';
	        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	    };
	    this.modRange = function (start, end) {
	        var step = arguments.length <= 2 || arguments[2] === undefined ? 24 : arguments[2];

	        var array = [];
	        end = end < start ? end + step : end;
	        var c = parseInt(end) - parseInt(start) + 1;
	        while (c--) {
	            array[c] = parseInt(end--) % step;
	        }
	        return array;
	    };
	    this.scale = 6;

	    this.timesteps = [0, 30];

	    this.dayStart = 8;
	    this.dayEnd = 24;
	    this.timespan = this.modRange(this.dayStart, this.dayEnd);
	    this.events = {
	        'opening': {
	            'hue': 210,
	            'title': 'Eröffnungszeremonie',
	            'description': 'Details about the event'
	        },
	        'cosplay': {
	            'hue': 140,
	            'title': 'Cosplay Contest',
	            'description': 'Details about the event'
	        }
	    };

	    this.schedule = {
	        Saturday: {
	            'Schubart Saal': {
	                '9:00-11:00': this.events.opening,
	                '18:00-22:30': this.events.cosplay
	            },
	            'Main Hall': {
	                '11:15-12:00': this.events.cosplay
	            }
	        }
	    };

	    this.getTimeSpan = function (time) {
	        var times = time.split('-');
	        var start = this.timeToInt(times[0]);
	        var end = this.timeToInt(times[1]);
	        return {
	            'offset': start - this.dayStart,
	            'height': end - start
	        };
	    };

	    this.timeToInt = function (time) {
	        var time = time.split(':');
	        if (time.length > 1) {

	            return parseInt(time[0]) + time[1] / 60;
	        }
	        return time[0];
	    };

	    this.refreshPointer = function () {
	        this.pointerTime = this.timeToInt(new Date().toLocaleTimeString());
	        this.pointerTime < this.dayStart ? this.pointerTime += 24 : this.pointerTime;
	        this.pointerTime = this.pointerTime * this.scale - this.dayStart * this.scale;
	    };

	    this.on('mount', function () {
	        setInterval(function () {
	            _this.update();
	        }, 1000);
	    });

	    this.on('update', function () {
	        _this.refreshPointer();
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('guest', '<div each="{guestType,types in guests}"> <h2>{guestType}</h2> <article layout="row"> <div class="guest" each="{guest in types}" flex="50" layout="row" layout-align="space-between"> <div flex="20"> <img riot-src="img/guest/{guest.name.toLowerCase().replace(/\\s/g,\'-\')}.jpg" alt=""> </div> <div flex="75"> <h3>{guest.name}</h3> <span>{guest.position}</span> {guest.description} <div class="social" layout="row"> <p each="{key,social in guest.social}"> <a href="{social}">{key}</a> </p> </div> </div> </div> </article> </div>', '', '', function (opts) {
	    this.guests = {
	        'guests of honor': [{
	            name: 'Brenda Hickey',
	            position: 'Comic artist and writer',
	            social: {
	                web: 'http://crazyary.com/',
	                twitter: 'https://twitter.com/CrazyAry'
	            },
	            description: 'Brenda Hickey is a comic artist and writer from Prince Edward Island, Canada. She’s had an unhealthy obsession with the comics art form from a very young age, and can’t remember a time when she wasn’t drawing. In 2013 she began illustrating for IDW Publishing on the “My Little Pony: Friendship is Magic” comic, her first issue being the Applejack Micro. Since then, she’s done work on the MLP main comic series, MLP Friends Forever, and also the Fiendship is Magic & MLP 2015 Holiday special.'
	        }, {
	            name: 'Rebecca Shoichet',
	            position: 'Actress and singer',
	            social: {
	                twitter: 'https://twitter.com/RebeccaShoichet'
	            },
	            description: 'In these parts we may know Rebecca Shoichet only for voicing Sunset Shimmer and also being the singing voice for Twilight Sparkle in “My Little Pony: Friendship is Magic”. But she has quite an impressive vita in animation voiceover. This includes speaking roles in “Inu Yasha”, “Nana”, “Gundam Seed”, “Kid VS Kat” and “Iron Man: Amored Adventures” amongst many other. She also had acting roles in several movies and TV series. And of course: singing. With her musical education and background, she is able to do a wide ranges of musical styles. Rebecca has been performing on stage with several bands as well as with the Vancouver Symphony Orchestra.'
	        }, {
	            name: 'Amy Keating Rogers',
	            position: 'Script Writer and Story Supervisor',
	            social: {
	                web: 'http://amykeatingrogers.com/',
	                twitter: 'https://twitter.com/KeatingRogers'
	            },
	            description: 'Amy Keating Rogers began her writing career as a playwright.  But while working as a Production Assistant on “The Powerpuff Girls,” creator Craig McCracken offered her the opportunity to write freelance for the show.  By the end of that year, she was Head Writer of Powerpuff.  During her years at Cartoon Network, Amy worked on a number of terrific shows:  “Dexter’s Laboratory,” “Samurai Jack,” and “Foster’s Home for Imaginary Friends” to name a few.  After her time at Cartoon Network, Amy began writing freelance for many shows, when Lauren Faust asked her to write for “My Little Pony: Friendship is Magic,” Amy jumped at the chance and wrote episodes for seasons 1, 2, 4, and 5.   In April of 2015, Amy started working fulltime at Disney as a Story Supervisor for New IP writing on projects such as “Star Darlings” and “Whisker Haven Tales.”'
	        }, {
	            name: 'Anneli Heed',
	            position: 'Voice actress, singer, comedian',
	            social: {
	                web: 'http://www.anneliheed.com/',
	                twitter: 'https://twitter.com/AnneliHeed'
	            },
	            description: 'Anneli Heed is one of Swedens top voice actresses and her roles other then MLP includes Princess Leia from Star Wars, Tigress in DreamWork´s Kung Fu Panda movies, The Biskit twins on Littlest Pet Shop, Wendy on Disney´s Gravity Falls, Asami Sato on Legend of Korra and more. Heed is also a comedian and a singer. On My Little Pony she voices ca 30 ponies in different voices! Spike, Sweetie Belle, Princess Cadence, Spitfire, Queen Chryssalis, and sometimes…Derpy! She is also the singing voice of Pinkie Pie and Rainbow Dash! Annelis first contact with the bronydom was 2012 on the first GalaCon. Because of…that “Äppelpaj incident” in 2012….'
	        }, {
	            name: 'Julia Meynen',
	            position: 'Voice actress, Dubbing director, Dialogue book writer, Singer',
	            social: {
	                twitter: 'https://twitter.com/JuliaMeynen'
	            },
	            description: 'Julia Meynens portfolio as a voice actress sure is impressive, as she spoke numerous live-action as well as anime characters. Current examples would be (Lieutenant) Alisha Granderson in “The Last Ship”, Katie Nolan in “Chicago Fire”, Suguha Kirigaya in “Sword Art Online”, Shinka Nibutani in “Love, Chunibyo & Other Delusions!” and of course: Twilight Sparkle in “My Little Pony: Friendship is Magic”. Starting in the year 2013 Julia not only works behind a microphone in the field of voice-over, as by now she also works as dubbing director and writes the dialogue books for many dubbing productions. As well as that, singing is one of her big passions, which she does professionally. Along with her mother Silvia they form the country-music duo “The Nashville Ladies”.'
	        }],
	        'community guests': [{
	            name: 'Dustykatt',
	            position: 'YouTuber and show host',
	            social: {},
	            description: 'Aside from his epic moustache, Dusty’s life is a manly checklist, for he has done so many manly things. Including being an athlethe in school and college, pro-wrestler, bodyguard, ranch worker and motorcycle mechanic who also builds custom bikes. And he watches a cartoon show intended for little girls. Well, what do you expect from the “Manliest Brony in the World”? Dusty is known primarily for his livestreamed podcast “Stay Brony My Friends”, his YouTube videos which have gone viral, and separating convention-goers from their money at charity auctions. This has also piqued the curiosity of documentary filmmakers, thus explaining why you can see his ugly mug and manly mustache plastered all over movie theaters. And never forget to stay brony, my friends.'
	        }, {
	            name: 'AnimatedJames',
	            position: 'Cartoonist, Musician, Writer, Voice Actor',
	            social: {
	                youtube: 'https://www.youtube.com/user/AnimatedJames',
	                facebook: 'https://www.facebook.com/AnimatedJames/info/?tab=page_info'
	            },
	            description: 'James Barkley better known as “AnimatedJames” is a cartoonist and writer. His most known works in the brony fandom probably are the animations on the “Beat it” PMV from Michelle Creber and BlackGryphon as well as a parody on the “Winter-Wrap-Up” song from “Friendship is Magic”. Besides that, he also produced own works in form of various short animations or the music video “Creative Types” and published them on his YouTube channel. Beyond the animation work, he also writes the original music himself and voicing some of his characters too.'
	        }, {
	            name: 'Vocal Score',
	            position: 'Professional Musician and Singer',
	            social: {
	                youtube: 'http://youtube.com/vocalscorepony'
	            },
	            description: 'Vocal Score is a professional musician who first started out in the fandom by writing little songs to explore our favourite pony’s characters a bit more. He started to get noticed though with his interesting versions of popular fandom songs. Vocal has taken electronic and rap songs and given them his own special twist, a style unlike any other. When he’s not working in his own music, Vocal travels the world, playing music at five star hotels and on board cruise ships. He’s also played several brony conventions, and this will be his second time playing at GalaCon, since we loved his performance so much last year! He actually wants as many people as possible to throw song requests for him to play this year at GalaCon, so head over to his Twitter (@vocalscorepony) and request some songs!'
	        }]
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('room', '', '', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('vendor', '<h2>Vendors</h2> Listing {getVendors().length} vendors <div layout="row" layout-align="space-between" if="{filter.length}" onclick="{clearFilter}"> <div> <span>&times;</span> Clear all filter </div> <div class="items"> Filtering with the following items: <div layout="row"> <item each="{item, key in filter}" item="{item}" key="{key}"></item> </div> </div> </div> <div if="{containsFilter(vendor)}" each="{vendor in vendors}"> <h3>{vendor.name}</h3> <div layout="row" class="items"> <item each="{item, key in vendor.items}" onclick="{setFilter}" item="{item}" key="{key}"></item> </div> </div>', '', '', function (opts) {
	    var _this = this;

	    this.filter = [];

	    this.items = {
	        accessory: {
	            name: 'accessory',
	            hue: 0
	        },
	        art: {
	            name: 'art',
	            hue: 10
	        },
	        beadart: {
	            name: 'beadart',
	            hue: 20
	        },
	        blindbag: {
	            name: 'blindbag',
	            hue: 30
	        },
	        bookmark: {
	            name: 'bookmark',
	            hue: 40
	        },
	        button: {
	            name: 'button',
	            hue: 50
	        },
	        canvas: {
	            name: 'canvas',
	            hue: 60
	        },
	        cloth: {
	            name: 'cloth',
	            hue: 70
	        },
	        coaster: {
	            name: 'coaster',
	            hue: 80
	        },
	        comic: {
	            name: 'comic',
	            hue: 90
	        },
	        comission: {
	            name: 'comission',
	            hue: 100
	        },
	        custom: {
	            name: 'custom',
	            hue: 110
	        },
	        engravedGlass: {
	            name: 'engravedGlass',
	            hue: 120
	        },
	        jewelry: {
	            name: 'jewelry',
	            hue: 130
	        },
	        magnet: {
	            name: 'magnet',
	            hue: 140
	        },
	        mousepad: {
	            name: 'mousepad',
	            hue: 150
	        },
	        mug: {
	            name: 'mug',
	            hue: 160
	        },
	        official: {
	            name: 'official',
	            hue: 170
	        },
	        paper: {
	            name: 'paper',
	            hue: 180
	        },
	        patch: {
	            name: 'patch',
	            hue: 190
	        },
	        pillow: {
	            name: 'pillow',
	            hue: 200
	        },
	        plushie: {
	            name: 'plushie',
	            hue: 210
	        },
	        print: {
	            name: 'print',
	            hue: 220
	        },
	        sculpture: {
	            name: 'sculpture',
	            hue: 230
	        },
	        sewn: {
	            name: 'sewn',
	            hue: 250
	        },
	        sticker: {
	            name: 'sticker',
	            hue: 260
	        },
	        towel: {
	            name: 'towel',
	            hue: 270
	        },
	        tshirt: {
	            name: 'tshirt',
	            hue: 280
	        },
	        tumbler: {
	            name: 'tumbler',
	            hue: 290
	        },
	        woodenCarvings: {
	            name: 'woodenCarvings',
	            hue: 300
	        }
	    };

	    this.vendors = [{
	        table: '1-2',
	        name: "DSC-GRAPHICS/Stable-Tec Studios",
	        items: [this.items.custom, this.items.print, this.items.engravedGlass, this.items.accessory]
	    }, {
	        table: '3',
	        name: 'Mana-Kyusai',
	        items: [this.items.plushie, this.items.button, this.items.print, this.items.sewn]
	    }, {
	        table: '4',
	        name: 'SKUNK412',
	        items: [this.items.print, this.items.tshirt, this.items.cloth, this.items.mousepad]
	    }, {
	        table: '5',
	        name: 'Siora',
	        items: [this.items.plushie, this.items.button, this.items.sewn, this.items.jewelry, this.items.paper, this.items.accessory]
	    }, {
	        table: '6',
	        name: 'Zita',
	        items: [this.items.custom, this.items.button, this.items.print, this.items.tshirt, this.items.paper]
	    }, {
	        table: '7-8',
	        name: 'Yasi',
	        items: [this.items.plushie, this.items.print, this.items.sewn]
	    }, {
	        table: '25',
	        name: 'Salacious Crumb',
	        items: [this.items.jewelry, this.items.accessory]
	    }, {
	        table: '26',
	        name: 'atelok',
	        items: [this.items.custom, this.items.sculpture, this.items.beadart]
	    }, {
	        table: '27-28',
	        name: 'steeph',
	        items: [this.items.tshirt, this.items.sewn, this.items.engravedGlass, this.items.patch]
	    }, {
	        table: '29',
	        name: 'XTorbenx',
	        items: [this.items.button, this.items.print, this.items.tshirt, this.items.woodenCarvings]
	    }, {
	        table: '30',
	        name: 'Manic Sculpture',
	        items: [this.items.custom, this.items.sculpture, this.items.engravedGlass]
	    }, {
	        table: '9-10',
	        name: 'rtry',
	        items: [this.items.plushie, this.items.engravedGlass]
	    }, {
	        table: '11-12',
	        name: 'haselwoelfchen, Shevia, Sakutaro',
	        items: [this.items.plushie, this.items.print, this.items.sewn]
	    }, {
	        table: '13-14',
	        name: 'pro-stoff.de',
	        items: [this.items.custom, this.items.tshirt, this.items.cloth, this.items.sewn, this.items.accessory, this.items.engravedGlass]
	    }, {
	        table: '15',
	        name: 'Casy Nuf',
	        items: [this.items.button, this.items.print, this.items.canvas]
	    }, {
	        table: '16',
	        name: 'Alasou',
	        items: [this.items.print]
	    }, {
	        table: '17-18',
	        name: 'Dealerpony Shop (Zunt)',
	        items: [this.items.button, this.items.blindbag, this.items.official, this.items.sculpture]
	    }, {
	        table: '19',
	        name: 'AngelWarrior',
	        items: [this.items.plushie, this.items.accessory, this.items.patch]
	    }, {
	        table: '20',
	        name: 'Borut Vash',
	        items: [this.items.custom]
	    }, {
	        table: '21',
	        name: 'Alexcited this.items.plushie',
	        items: [this.items.plushie, this.items.sewn]
	    }, {
	        table: '22',
	        name: 'Mangamaus',
	        items: [this.items.plushie, this.items.custom, this.items.accessory]
	    }, {
	        table: '23',
	        name: 'CreepyRiver',
	        items: [this.items.button, this.items.cloth, this.items.sculpture, this.items.jewelry]
	    }, {
	        table: '24',
	        name: 'Perrydotto',
	        items: [this.items.button, this.items.print, this.items.mug]
	    }, {
	        table: '31',
	        name: 'Asukatze',
	        items: [this.items.custom, this.items.blindbag, this.items.canvas]
	    }, {
	        table: '32',
	        name: "Lan's Mad Plush Party",
	        items: [this.items.plushie, this.items.cloth, this.items.sewn]
	    }, {
	        table: '33-34',
	        name: 'Rariedash & Fafatacle',
	        items: [this.items.plushie, this.items.button, this.items.print, this.items.sewn, this.items.sculpture]
	    }, {
	        table: '35-36',
	        name: 'Avitani',
	        items: [this.items.custom, this.items.button, this.items.print, this.items.engravedGlass, this.items.tumbler, this.items.accessory, this.items.art]
	    }, {
	        table: '37',
	        name: 'AnimatedJames',
	        items: [this.items.custom, this.items.comission]
	    }, {
	        table: '38',
	        name: 'Piri',
	        items: [this.items.button, this.items.print, this.items.mug, this.items.accessory, this.items.coaster]
	    }, {
	        table: '39',
	        name: 'HipsterHoof',
	        items: [this.items.plushie, this.items.cloth, this.items.sewn, this.items.pillow, this.items.accessory]
	    }, {
	        table: '40',
	        name: 'DeathPwny',
	        items: [this.items.button, this.items.print, this.items.sculpture]
	    }, {
	        table: '41',
	        name: 'Staphilea',
	        items: [this.items.plushie, this.items.sewn]
	    }, {
	        table: '42',
	        name: 'Brenda Hickey',
	        items: [this.items.button, this.items.print, this.items.official, this.items.comic]
	    }, {
	        table: '43',
	        name: 'VaaChar',
	        items: [this.items.button, this.items.tshirt, this.items.print, this.items.sculpture, this.items.sticker]
	    }, {
	        table: '44',
	        name: "Adlynh's creation",
	        items: [this.items.custom, this.items.button, this.items.print, this.items.sculpture, this.items.accessory]
	    }, {
	        table: '45-46',
	        name: 'PANINI Comics',
	        items: [this.items.comic]
	    }, {
	        table: '47',
	        name: 'Varonya´s Ponyherde',
	        items: [this.items.plushie, this.items.pillow, this.items.towel]
	    }, {
	        table: '48-49',
	        name: 'AnimeShop.de',
	        items: [this.items.official]
	    }, {
	        table: '50-51',
	        name: "Dennyvixen's Art",
	        items: [this.items.button, this.items.print, this.items.cloth, this.items.sticker, this.items.bookmark, this.items.magnet]
	    }, {
	        table: '54-55',
	        name: 'Dori-to',
	        items: [this.items.print, this.items.cloth, this.items.comic, this.items.beadart]
	    }, {
	        table: '56',
	        name: 'Violet Rose',
	        items: [this.items.plushie, this.items.cloth]
	    }];

	    this.clearFilter = function () {
	        this.filter = [];
	    }.bind(this);

	    this.setFilter = function (e) {
	        if (!this.filter.filter(function (item) {
	            return item.name == e.item.item.name;
	        }).length) {
	            this.filter.push(e.item.item);
	        }
	    }.bind(this);

	    this.getVendors = function () {
	        return _this.vendors.filter(function (vendor) {
	            return _this.containsFilter(vendor);
	        });
	    };

	    this.containsFilter = function (vendor) {
	        var goal = _this.filter.length;
	        for (var _iterator = _this.filter, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var item = _ref;

	            goal -= vendor.items.filter(function (vendorItem) {
	                return vendorItem.name == item.name;
	            }).length;
	        }
	        return _this.filter.length ? !goal : true;
	    };

	    this.on('update', function () {
	        console.log('update');
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('supporter', '', '', '', function (opts) {
	    this.supporter = ['Miau'];
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	var _loadGoogleMapsApi = __webpack_require__(22);

	var _loadGoogleMapsApi2 = _interopRequireDefault(_loadGoogleMapsApi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	riot.tag2('ludwigsburg', '<b>Map placeholder</b> <div class="ludwigsburg-map" name="map"> </div>', '', '', function (opts) {
	    var _this = this;

	    this.on('mount', function () {

	        (0, _loadGoogleMapsApi2.default)({
	            key: 'AIzaSyBlfQYujCoZv35nx7jPhHbBUurhJdPyaiA'
	        }).then(function (googleMaps) {
	            _this.googleMaps = googleMaps;
	            _this.trigger('loadedAPI');
	        }).catch(function (err) {
	            console.error(err);
	        });
	    });

	    this.styles = [];

	    this.on('loadedAPI', function () {
	        var map = new _this.googleMaps.Map(_this.map, {
	            styles: _this.styles,
	            center: { lat: 48.8914766, lng: 9.1899888 },
	            scrollwheel: true,
	            zoom: 16
	        });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var client = _ref.client;
	  var key = _ref.key;
	  var language = _ref.language;
	  var _ref$libraries = _ref.libraries;
	  var libraries = _ref$libraries === undefined ? [] : _ref$libraries;
	  var _ref$timeout = _ref.timeout;
	  var timeout = _ref$timeout === undefined ? 10000 : _ref$timeout;
	  var v = _ref.v;

	  var callbackName = '__googleMapsApiOnLoadCallback';

	  return new Promise(function (resolve, reject) {

	    // Exit if not running inside a browser.
	    if (typeof window === 'undefined') {
	      return reject(new Error('Can only load the Google Maps API in the browser'));
	    }

	    // Prepare the `script` tag to be inserted into the page.
	    var scriptElement = document.createElement('script');
	    var params = ['callback=' + callbackName];
	    if (client) params.push('client=' + client);
	    if (key) params.push('key=' + key);
	    if (language) params.push('language=' + language);
	    libraries = [].concat(libraries); // Ensure that `libraries` is an array
	    if (libraries.length) params.push('libraries=' + libraries.join(','));
	    if (v) params.push('v=' + v);
	    scriptElement.src = 'https://maps.googleapis.com/maps/api/js?' + params.join('&');

	    // Timeout if necessary.
	    var timeoutId = null;
	    if (timeout) {
	      timeoutId = setTimeout(function () {
	        window[callbackName] = function () {}; // Set the on load callback to a no-op.
	        reject(new Error('Could not load the Google Maps API'));
	      }, timeout);
	    }

	    // Hook up the on load callback.
	    window[callbackName] = function () {
	      if (timeoutId !== null) {
	        clearTimeout(timeoutId);
	      }
	      resolve(window.google.maps);
	      delete window[callbackName];
	    };

	    // Insert the `script` tag.
	    document.body.appendChild(scriptElement);
	  });
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('venue', '<h2>Venue</h2> <a onclick="{prev}">prev</a> | <a onclick="{next}">next</a> <div style="position: relative"> <img each="{stage in stages}" riot-style="position: absolute; opacity: 0.{\'9\': stage == currentStage, \'2\': stage != currentStage};" riot-src="img/venue/{stage}.svg" alt=""> </div>', '', '', function (opts) {
	    this.stages = [0, 1, 2];
	    this.currentStage = 0;
	    this.next = function (e) {
	        if (this.currentStage < this.stages.length) {
	            this.currentStage += 1;
	        }
	    }.bind(this);

	    this.prev = function (e) {
	        if (this.currentStage > 0) {
	            this.currentStage -= 1;
	        }
	    }.bind(this);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('team', '<h2>Team</h2> <article layout="row"> <div class="team" each="{member in members}" flex="33"> <img riot-src="img/team/{member.name.toLowerCase()}.png" alt=""> <h3>{member.name}</h3> <span>{member.position}</span> <a href="mailto:{member.email}">{member.email}</a> </div> </article>', '', '', function (opts) {
	    this.members = [{
	        name: 'Saij',
	        position: 'Conchair',
	        email: 'vendors@galacon.eu'
	    }, {
	        name: 'Misan',
	        position: 'Webdeveloper + PR',
	        email: 'pr@galacon.eu'
	    }, {
	        name: 'daMatt',
	        position: 'PR',
	        email: 'pr@galacon.eu'
	    }, {
	        name: 'JayJay',
	        position: 'Ticket and order support',
	        email: 'ticket@galacon.eu'
	    }, {
	        name: '404compliant',
	        position: 'Volunteer coordination',
	        email: 'volunteer@galacon.eu'
	    }, {
	        name: 'Bergkamener',
	        position: 'Events and panel coordination',
	        email: 'events@galacon.eu'
	    }, {
	        name: 'Stargaze',
	        position: 'Events and panel coordination',
	        email: 'events@galacon.eu'
	    }, {
	        name: 'Goschi',
	        position: 'Guest relations'
	    }];
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('rules', '<div> rules placeholder </div>', '', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(31)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./main.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./main.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	exports.i(__webpack_require__(29), "");
	exports.i(__webpack_require__(30), "");
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Cuprum:400,700);", ""]);

	// module
	exports.push([module.id, "@-moz-document url-prefix() {\n  [layout-fill] {\n    margin: 0;\n    width: 100%;\n    min-height: 100%;\n    height: 100%;\n  }\n}\n[flex-order=\"0\"],\n[flex-order] {\n  -ms-flex-order: 0;\n  order: 0;\n}\n[flex-order=\"1\"] {\n  -ms-flex-order: 1;\n  order: 1;\n}\n[flex-order=\"2\"] {\n  -ms-flex-order: 2;\n  order: 2;\n}\n[flex-order=\"3\"] {\n  -ms-flex-order: 3;\n  order: 3;\n}\n[flex-order=\"4\"] {\n  -ms-flex-order: 4;\n  order: 4;\n}\n[flex-order=\"5\"] {\n  -ms-flex-order: 5;\n  order: 5;\n}\n[flex-order=\"6\"] {\n  -ms-flex-order: 6;\n  order: 6;\n}\n[flex-order=\"7\"] {\n  -ms-flex-order: 7;\n  order: 7;\n}\n[flex-order=\"8\"] {\n  -ms-flex-order: 8;\n  order: 8;\n}\n[flex-order=\"9\"] {\n  -ms-flex-order: 9;\n  order: 9;\n}\n[flex-order=\"10\"] {\n  -ms-flex-order: 10;\n  order: 10;\n}\n[flex-order=\"11\"] {\n  -ms-flex-order: 11;\n  order: 11;\n}\n[flex-order=\"12\"] {\n  -ms-flex-order: 12;\n  order: 12;\n}\n[flex-order=\"13\"] {\n  -ms-flex-order: 13;\n  order: 13;\n}\n[flex-order=\"14\"] {\n  -ms-flex-order: 14;\n  order: 14;\n}\n[flex-order=\"15\"] {\n  -ms-flex-order: 15;\n  order: 15;\n}\n[flex-order=\"16\"] {\n  -ms-flex-order: 16;\n  order: 16;\n}\n[flex-order=\"17\"] {\n  -ms-flex-order: 17;\n  order: 17;\n}\n[flex-order=\"18\"] {\n  -ms-flex-order: 18;\n  order: 18;\n}\n[flex-order=\"19\"] {\n  -ms-flex-order: 19;\n  order: 19;\n}\n[offset=\"0\"] {\n  margin-left: 0;\n}\n[offset=\"5\"] {\n  margin-left: 5%;\n}\n[offset=\"10\"] {\n  margin-left: 10%;\n}\n[offset=\"15\"] {\n  margin-left: 15%;\n}\n[offset=\"20\"] {\n  margin-left: 20%;\n}\n[offset=\"25\"] {\n  margin-left: 25%;\n}\n[offset=\"30\"] {\n  margin-left: 30%;\n}\n[offset=\"35\"] {\n  margin-left: 35%;\n}\n[offset=\"40\"] {\n  margin-left: 40%;\n}\n[offset=\"45\"] {\n  margin-left: 45%;\n}\n[offset=\"50\"] {\n  margin-left: 50%;\n}\n[offset=\"55\"] {\n  margin-left: 55%;\n}\n[offset=\"60\"] {\n  margin-left: 60%;\n}\n[offset=\"65\"] {\n  margin-left: 65%;\n}\n[offset=\"70\"] {\n  margin-left: 70%;\n}\n[offset=\"75\"] {\n  margin-left: 75%;\n}\n[offset=\"80\"] {\n  margin-left: 80%;\n}\n[offset=\"85\"] {\n  margin-left: 85%;\n}\n[offset=\"90\"] {\n  margin-left: 90%;\n}\n[offset=\"95\"] {\n  margin-left: 95%;\n}\n[offset-=\"33\"],\n[offset-=\"34\"] {\n  margin-left: 33%;\n}\n[offset-=\"66\"],\n[offset-=\"67\"] {\n  margin-left: 67%;\n}\n[layout-align=center],\n[layout-align=\"center center\"],\n[layout-align=\"center start\"],\n[layout-align=\"center end\"] {\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n[layout-align=end],\n[layout-align=\"end center\"],\n[layout-align=\"end start\"],\n[layout-align=\"end end\"] {\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n[layout-align=space-around],\n[layout-align=\"space-around center\"],\n[layout-align=\"space-around start\"],\n[layout-align=\"space-around end\"] {\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n}\n[layout-align=space-between],\n[layout-align=\"space-between center\"],\n[layout-align=\"space-between start\"],\n[layout-align=\"space-between end\"] {\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n[layout-align=\"center start\"],\n[layout-align=\"end start\"],\n[layout-align=\"space-around start\"],\n[layout-align=\"space-between start\"],\n[layout-align=\"start start\"] {\n  -ms-flex-align: start;\n  -ms-grid-row-align: flex-start;\n  align-items: flex-start;\n}\n[layout-align=\"center center\"],\n[layout-align=\"end center\"],\n[layout-align=\"space-around center\"],\n[layout-align=\"space-between center\"],\n[layout-align=\"start center\"] {\n  -ms-flex-align: center;\n  -ms-grid-row-align: center;\n  align-items: center;\n  max-width: 100%;\n}\n[layout-align=\"center end\"],\n[layout-align=\"end end\"],\n[layout-align=\"space-around end\"],\n[layout-align=\"space-between end\"],\n[layout-align=\"start end\"] {\n  -ms-flex-align: end;\n  -ms-grid-row-align: flex-end;\n  align-items: flex-end;\n}\n[flex] {\n  -ms-flex: 1 1 0%;\n  flex: 1 1 0%;\n}\n[flex=initial] {\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n}\n[flex=auto] {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n}\n[flex=none] {\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n}\n[flex=\"5\"] {\n  -ms-flex: 0 0 5%;\n  flex: 0 0 5%;\n}\n[layout=row] > [flex=\"5\"] {\n  max-width: 5%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"5\"] {\n  max-width: 100%;\n  max-height: 5%;\n}\n[flex=\"10\"] {\n  -ms-flex: 0 0 10%;\n  flex: 0 0 10%;\n}\n[layout=row] > [flex=\"10\"] {\n  max-width: 10%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"10\"] {\n  max-width: 100%;\n  max-height: 10%;\n}\n[flex=\"15\"] {\n  -ms-flex: 0 0 15%;\n  flex: 0 0 15%;\n}\n[layout=row] > [flex=\"15\"] {\n  max-width: 15%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"15\"] {\n  max-width: 100%;\n  max-height: 15%;\n}\n[flex=\"20\"] {\n  -ms-flex: 0 0 20%;\n  flex: 0 0 20%;\n}\n[layout=row] > [flex=\"20\"] {\n  max-width: 20%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"20\"] {\n  max-width: 100%;\n  max-height: 20%;\n}\n[flex=\"25\"] {\n  -ms-flex: 0 0 25%;\n  flex: 0 0 25%;\n}\n[layout=row] > [flex=\"25\"] {\n  max-width: 25%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"25\"] {\n  max-width: 100%;\n  max-height: 25%;\n}\n[flex=\"30\"] {\n  -ms-flex: 0 0 30%;\n  flex: 0 0 30%;\n}\n[layout=row] > [flex=\"30\"] {\n  max-width: 30%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"30\"] {\n  max-width: 100%;\n  max-height: 30%;\n}\n[flex=\"35\"] {\n  -ms-flex: 0 0 35%;\n  flex: 0 0 35%;\n}\n[layout=row] > [flex=\"35\"] {\n  max-width: 35%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"35\"] {\n  max-width: 100%;\n  max-height: 35%;\n}\n[flex=\"40\"] {\n  -ms-flex: 0 0 40%;\n  flex: 0 0 40%;\n}\n[layout=row] > [flex=\"40\"] {\n  max-width: 40%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"40\"] {\n  max-width: 100%;\n  max-height: 40%;\n}\n[flex=\"45\"] {\n  -ms-flex: 0 0 45%;\n  flex: 0 0 45%;\n}\n[layout=row] > [flex=\"45\"] {\n  max-width: 45%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"45\"] {\n  max-width: 100%;\n  max-height: 45%;\n}\n[flex=\"50\"] {\n  -ms-flex: 0 0 50%;\n  flex: 0 0 50%;\n}\n[layout=row] > [flex=\"50\"] {\n  max-width: 50%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"50\"] {\n  max-width: 100%;\n  max-height: 50%;\n}\n[flex=\"55\"] {\n  -ms-flex: 0 0 55%;\n  flex: 0 0 55%;\n}\n[layout=row] > [flex=\"55\"] {\n  max-width: 55%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"55\"] {\n  max-width: 100%;\n  max-height: 55%;\n}\n[flex=\"60\"] {\n  -ms-flex: 0 0 60%;\n  flex: 0 0 60%;\n}\n[layout=row] > [flex=\"60\"] {\n  max-width: 60%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"60\"] {\n  max-width: 100%;\n  max-height: 60%;\n}\n[flex=\"65\"] {\n  -ms-flex: 0 0 65%;\n  flex: 0 0 65%;\n}\n[layout=row] > [flex=\"65\"] {\n  max-width: 65%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"65\"] {\n  max-width: 100%;\n  max-height: 65%;\n}\n[flex=\"70\"] {\n  -ms-flex: 0 0 70%;\n  flex: 0 0 70%;\n}\n[layout=row] > [flex=\"70\"] {\n  max-width: 70%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"70\"] {\n  max-width: 100%;\n  max-height: 70%;\n}\n[flex=\"75\"] {\n  -ms-flex: 0 0 75%;\n  flex: 0 0 75%;\n}\n[layout=row] > [flex=\"75\"] {\n  max-width: 75%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"75\"] {\n  max-width: 100%;\n  max-height: 75%;\n}\n[flex=\"80\"] {\n  -ms-flex: 0 0 80%;\n  flex: 0 0 80%;\n}\n[layout=row] > [flex=\"80\"] {\n  max-width: 80%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"80\"] {\n  max-width: 100%;\n  max-height: 80%;\n}\n[flex=\"85\"] {\n  -ms-flex: 0 0 85%;\n  flex: 0 0 85%;\n}\n[layout=row] > [flex=\"85\"] {\n  max-width: 85%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"85\"] {\n  max-width: 100%;\n  max-height: 85%;\n}\n[flex=\"90\"] {\n  -ms-flex: 0 0 90%;\n  flex: 0 0 90%;\n}\n[layout=row] > [flex=\"90\"] {\n  max-width: 90%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"90\"] {\n  max-width: 100%;\n  max-height: 90%;\n}\n[flex=\"95\"] {\n  -ms-flex: 0 0 95%;\n  flex: 0 0 95%;\n}\n[layout=row] > [flex=\"95\"] {\n  max-width: 95%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"95\"] {\n  max-width: 100%;\n  max-height: 95%;\n}\n[flex=\"100\"] {\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n}\n[layout=row] > [flex=\"100\"],\n[layout=column] > [flex=\"100\"] {\n  max-width: 100%;\n  max-height: 100%;\n}\n[flex=\"33\"],\n[flex=\"34\"] {\n  -ms-flex: 1 1 33%;\n  flex: 1 1 33%;\n}\n[flex=\"66\"],\n[flex=\"67\"] {\n  -ms-flex: 1 1 67%;\n  flex: 1 1 67%;\n}\n[layout=row] > [flex=\"33\"],\n[layout=row] > [flex=\"34\"] {\n  max-width: 33%;\n  max-height: 100%;\n}\n[layout=row] > [flex=\"66\"],\n[layout=row] > [flex=\"67\"] {\n  max-width: 67%;\n  max-height: 100%;\n}\n[layout=column] > [flex=\"33\"],\n[layout=column] > [flex=\"34\"] {\n  max-width: 100%;\n  max-height: 33%;\n}\n[layout=column] > [flex=\"66\"],\n[layout=column] > [flex=\"67\"] {\n  max-width: 100%;\n  max-height: 67%;\n}\n[layout-padding] > [flex-lt-md],\n[layout-padding] > [flex-sm] {\n  padding: .25em;\n}\n[layout-padding],\n[layout-padding] > [flex-gt-sm],\n[layout-padding] > [flex-lt-lg],\n[layout-padding] > [flex-md],\n[layout-padding] > [flex] {\n  padding: .5em;\n}\n[layout-padding] > [flex-gt-md],\n[layout-padding] > [flex-lg] {\n  padding: 1em;\n}\n[layout-margin] > [flex-lt-md],\n[layout-margin] > [flex-sm] {\n  margin: .25em;\n}\n[layout-margin],\n[layout-margin] > [flex-gt-sm],\n[layout-margin] > [flex-lt-lg],\n[layout-margin] > [flex-md],\n[layout-margin] > [flex] {\n  margin: .5em;\n}\n[layout-margin] > [flex-gt-md],\n[layout-margin] > [flex-lg] {\n  margin: 1em;\n}\n[layout-wrap] {\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n[layout-nowrap] {\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n}\n[layout-fill] {\n  margin: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100%;\n}\n[layout] {\n  display: -ms-flexbox;\n  display: flex;\n}\n[layout=column] {\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n[layout=row] {\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n@media (max-width: 37.5em) {\n  [hide-sm]:not([show-sm]):not([show]),\n  [hide]:not([show-sm]):not([show]) {\n    display: none;\n  }\n  [flex-order-sm=\"0\"] {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  [flex-order-sm=\"1\"] {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  [flex-order-sm=\"2\"] {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  [flex-order-sm=\"3\"] {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  [flex-order-sm=\"4\"] {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  [flex-order-sm=\"5\"] {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  [flex-order-sm=\"6\"] {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  [flex-order-sm=\"7\"] {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  [flex-order-sm=\"8\"] {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  [flex-order-sm=\"9\"] {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  [flex-order-sm=\"10\"] {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  [flex-order-sm=\"11\"] {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  [flex-order-sm=\"12\"] {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  [flex-order-sm=\"13\"] {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  [flex-order-sm=\"14\"] {\n    -ms-flex-order: 14;\n    order: 14;\n  }\n  [flex-order-sm=\"15\"] {\n    -ms-flex-order: 15;\n    order: 15;\n  }\n  [flex-order-sm=\"16\"] {\n    -ms-flex-order: 16;\n    order: 16;\n  }\n  [flex-order-sm=\"17\"] {\n    -ms-flex-order: 17;\n    order: 17;\n  }\n  [flex-order-sm=\"18\"] {\n    -ms-flex-order: 18;\n    order: 18;\n  }\n  [flex-order-sm=\"19\"] {\n    -ms-flex-order: 19;\n    order: 19;\n  }\n  [offset-sm=\"0\"] {\n    margin-left: 0;\n  }\n  [offset-sm=\"5\"] {\n    margin-left: 5%;\n  }\n  [offset-sm=\"10\"] {\n    margin-left: 10%;\n  }\n  [offset-sm=\"15\"] {\n    margin-left: 15%;\n  }\n  [offset-sm=\"20\"] {\n    margin-left: 20%;\n  }\n  [offset-sm=\"25\"] {\n    margin-left: 25%;\n  }\n  [offset-sm=\"30\"] {\n    margin-left: 30%;\n  }\n  [offset-sm=\"35\"] {\n    margin-left: 35%;\n  }\n  [offset-sm=\"40\"] {\n    margin-left: 40%;\n  }\n  [offset-sm=\"45\"] {\n    margin-left: 45%;\n  }\n  [offset-sm=\"50\"] {\n    margin-left: 50%;\n  }\n  [offset-sm=\"55\"] {\n    margin-left: 55%;\n  }\n  [offset-sm=\"60\"] {\n    margin-left: 60%;\n  }\n  [offset-sm=\"65\"] {\n    margin-left: 65%;\n  }\n  [offset-sm=\"70\"] {\n    margin-left: 70%;\n  }\n  [offset-sm=\"75\"] {\n    margin-left: 75%;\n  }\n  [offset-sm=\"80\"] {\n    margin-left: 80%;\n  }\n  [offset-sm=\"85\"] {\n    margin-left: 85%;\n  }\n  [offset-sm=\"90\"] {\n    margin-left: 90%;\n  }\n  [offset-sm=\"95\"] {\n    margin-left: 95%;\n  }\n  [offset-sm=\"33\"],\n  [offset-sm=\"34\"] {\n    margin-left: 33%;\n  }\n  [offset-sm=\"66\"],\n  [offset-sm=\"67\"] {\n    margin-left: 67%;\n  }\n  [layout-align-sm=center],\n  [layout-align-sm=\"center center\"],\n  [layout-align-sm=\"center start\"],\n  [layout-align-sm=\"center end\"] {\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n  [layout-align-sm=end],\n  [layout-align-sm=\"end center\"],\n  [layout-align-sm=\"end start\"],\n  [layout-align-sm=\"end end\"] {\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n  }\n  [layout-align-sm=space-around],\n  [layout-align-sm=\"space-around center\"],\n  [layout-align-sm=\"space-around start\"],\n  [layout-align-sm=\"space-around end\"] {\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n  [layout-align-sm=space-between],\n  [layout-align-sm=\"space-between center\"],\n  [layout-align-sm=\"space-between start\"],\n  [layout-align-sm=\"space-between end\"] {\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n  [layout-align-sm=\"center start\"],\n  [layout-align-sm=\"end start\"],\n  [layout-align-sm=\"space-around start\"],\n  [layout-align-sm=\"space-between start\"],\n  [layout-align-sm=\"start start\"] {\n    -ms-flex-align: start;\n    -ms-grid-row-align: flex-start;\n    align-items: flex-start;\n  }\n  [layout-align-sm=\"center center\"],\n  [layout-align-sm=\"end center\"],\n  [layout-align-sm=\"space-around center\"],\n  [layout-align-sm=\"space-between center\"],\n  [layout-align-sm=\"start center\"] {\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    max-width: 100%;\n  }\n  [layout-align-sm=\"center end\"],\n  [layout-align-sm=\"end end\"],\n  [layout-align-sm=\"space-around end\"],\n  [layout-align-sm=\"space-between end\"],\n  [layout-align-sm=\"start end\"] {\n    -ms-flex-align: end;\n    -ms-grid-row-align: flex-end;\n    align-items: flex-end;\n  }\n  [flex-sm] {\n    box-sizing: border-box;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n  }\n  [flex-sm=initial] {\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n  }\n  [flex-sm=auto] {\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n  }\n  [flex-sm=none] {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n  }\n  [flex-sm=\"5\"] {\n    -ms-flex: 0 0 5%;\n    flex: 0 0 5%;\n  }\n  [layout=row] > [flex-sm=\"5\"] {\n    max-width: 5%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"5\"] {\n    max-width: 100%;\n    max-height: 5%;\n  }\n  [flex-sm=\"10\"] {\n    -ms-flex: 0 0 10%;\n    flex: 0 0 10%;\n  }\n  [layout=row] > [flex-sm=\"10\"] {\n    max-width: 10%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"10\"] {\n    max-width: 100%;\n    max-height: 10%;\n  }\n  [flex-sm=\"15\"] {\n    -ms-flex: 0 0 15%;\n    flex: 0 0 15%;\n  }\n  [layout=row] > [flex-sm=\"15\"] {\n    max-width: 15%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"15\"] {\n    max-width: 100%;\n    max-height: 15%;\n  }\n  [flex-sm=\"20\"] {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n  }\n  [layout=row] > [flex-sm=\"20\"] {\n    max-width: 20%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"20\"] {\n    max-width: 100%;\n    max-height: 20%;\n  }\n  [flex-sm=\"25\"] {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n  }\n  [layout=row] > [flex-sm=\"25\"] {\n    max-width: 25%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"25\"] {\n    max-width: 100%;\n    max-height: 25%;\n  }\n  [flex-sm=\"30\"] {\n    -ms-flex: 0 0 30%;\n    flex: 0 0 30%;\n  }\n  [layout=row] > [flex-sm=\"30\"] {\n    max-width: 30%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"30\"] {\n    max-width: 100%;\n    max-height: 30%;\n  }\n  [flex-sm=\"35\"] {\n    -ms-flex: 0 0 35%;\n    flex: 0 0 35%;\n  }\n  [layout=row] > [flex-sm=\"35\"] {\n    max-width: 35%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"35\"] {\n    max-width: 100%;\n    max-height: 35%;\n  }\n  [flex-sm=\"40\"] {\n    -ms-flex: 0 0 40%;\n    flex: 0 0 40%;\n  }\n  [layout=row] > [flex-sm=\"40\"] {\n    max-width: 40%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"40\"] {\n    max-width: 100%;\n    max-height: 40%;\n  }\n  [flex-sm=\"45\"] {\n    -ms-flex: 0 0 45%;\n    flex: 0 0 45%;\n  }\n  [layout=row] > [flex-sm=\"45\"] {\n    max-width: 45%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"45\"] {\n    max-width: 100%;\n    max-height: 45%;\n  }\n  [flex-sm=\"50\"] {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n  }\n  [layout=row] > [flex-sm=\"50\"] {\n    max-width: 50%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"50\"] {\n    max-width: 100%;\n    max-height: 50%;\n  }\n  [flex-sm=\"55\"] {\n    -ms-flex: 0 0 55%;\n    flex: 0 0 55%;\n  }\n  [layout=row] > [flex-sm=\"55\"] {\n    max-width: 55%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"55\"] {\n    max-width: 100%;\n    max-height: 55%;\n  }\n  [flex-sm=\"60\"] {\n    -ms-flex: 0 0 60%;\n    flex: 0 0 60%;\n  }\n  [layout=row] > [flex-sm=\"60\"] {\n    max-width: 60%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"60\"] {\n    max-width: 100%;\n    max-height: 60%;\n  }\n  [flex-sm=\"65\"] {\n    -ms-flex: 0 0 65%;\n    flex: 0 0 65%;\n  }\n  [layout=row] > [flex-sm=\"65\"] {\n    max-width: 65%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"65\"] {\n    max-width: 100%;\n    max-height: 65%;\n  }\n  [flex-sm=\"70\"] {\n    -ms-flex: 0 0 70%;\n    flex: 0 0 70%;\n  }\n  [layout=row] > [flex-sm=\"70\"] {\n    max-width: 70%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"70\"] {\n    max-width: 100%;\n    max-height: 70%;\n  }\n  [flex-sm=\"75\"] {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n  }\n  [layout=row] > [flex-sm=\"75\"] {\n    max-width: 75%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"75\"] {\n    max-width: 100%;\n    max-height: 75%;\n  }\n  [flex-sm=\"80\"] {\n    -ms-flex: 0 0 80%;\n    flex: 0 0 80%;\n  }\n  [layout=row] > [flex-sm=\"80\"] {\n    max-width: 80%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"80\"] {\n    max-width: 100%;\n    max-height: 80%;\n  }\n  [flex-sm=\"85\"] {\n    -ms-flex: 0 0 85%;\n    flex: 0 0 85%;\n  }\n  [layout=row] > [flex-sm=\"85\"] {\n    max-width: 85%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"85\"] {\n    max-width: 100%;\n    max-height: 85%;\n  }\n  [flex-sm=\"90\"] {\n    -ms-flex: 0 0 90%;\n    flex: 0 0 90%;\n  }\n  [layout=row] > [flex-sm=\"90\"] {\n    max-width: 90%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"90\"] {\n    max-width: 100%;\n    max-height: 90%;\n  }\n  [flex-sm=\"95\"] {\n    -ms-flex: 0 0 95%;\n    flex: 0 0 95%;\n  }\n  [layout=row] > [flex-sm=\"95\"] {\n    max-width: 95%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"95\"] {\n    max-width: 100%;\n    max-height: 95%;\n  }\n  [flex-sm=\"100\"] {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n  }\n  [layout=row] > [flex-sm=\"100\"],\n  [layout=column] > [flex-sm=\"100\"] {\n    max-width: 100%;\n    max-height: 100%;\n  }\n  [flex-sm=\"33\"],\n  [flex-sm=\"34\"] {\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n  }\n  [flex-sm=\"66\"],\n  [flex-sm=\"67\"] {\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n  }\n  [layout=row] > [flex-sm=\"33\"],\n  [layout=row] > [flex-sm=\"34\"] {\n    max-width: 33%;\n    max-height: 100%;\n  }\n  [layout=row] > [flex-sm=\"66\"],\n  [layout=row] > [flex-sm=\"67\"] {\n    max-width: 67%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-sm=\"33\"],\n  [layout=column] > [flex-sm=\"34\"] {\n    max-width: 100%;\n    max-height: 33%;\n  }\n  [layout=column] > [flex-sm=\"66\"],\n  [layout=column] > [flex-sm=\"67\"] {\n    max-width: 100%;\n    max-height: 67%;\n  }\n}\n@media (min-width: 37.5em) {\n  [flex-order-gt-sm=\"0\"] {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  [flex-order-gt-sm=\"1\"] {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  [flex-order-gt-sm=\"2\"] {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  [flex-order-gt-sm=\"3\"] {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  [flex-order-gt-sm=\"4\"] {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  [flex-order-gt-sm=\"5\"] {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  [flex-order-gt-sm=\"6\"] {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  [flex-order-gt-sm=\"7\"] {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  [flex-order-gt-sm=\"8\"] {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  [flex-order-gt-sm=\"9\"] {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  [flex-order-gt-sm=\"10\"] {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  [flex-order-gt-sm=\"11\"] {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  [flex-order-gt-sm=\"12\"] {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  [flex-order-gt-sm=\"13\"] {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  [flex-order-gt-sm=\"14\"] {\n    -ms-flex-order: 14;\n    order: 14;\n  }\n  [flex-order-gt-sm=\"15\"] {\n    -ms-flex-order: 15;\n    order: 15;\n  }\n  [flex-order-gt-sm=\"16\"] {\n    -ms-flex-order: 16;\n    order: 16;\n  }\n  [flex-order-gt-sm=\"17\"] {\n    -ms-flex-order: 17;\n    order: 17;\n  }\n  [flex-order-gt-sm=\"18\"] {\n    -ms-flex-order: 18;\n    order: 18;\n  }\n  [flex-order-gt-sm=\"19\"] {\n    -ms-flex-order: 19;\n    order: 19;\n  }\n  [offset-gt-sm=\"0\"] {\n    margin-left: 0;\n  }\n  [offset-gt-sm=\"5\"] {\n    margin-left: 5%;\n  }\n  [offset-gt-sm=\"10\"] {\n    margin-left: 10%;\n  }\n  [offset-gt-sm=\"15\"] {\n    margin-left: 15%;\n  }\n  [offset-gt-sm=\"20\"] {\n    margin-left: 20%;\n  }\n  [offset-gt-sm=\"25\"] {\n    margin-left: 25%;\n  }\n  [offset-gt-sm=\"30\"] {\n    margin-left: 30%;\n  }\n  [offset-gt-sm=\"35\"] {\n    margin-left: 35%;\n  }\n  [offset-gt-sm=\"40\"] {\n    margin-left: 40%;\n  }\n  [offset-gt-sm=\"45\"] {\n    margin-left: 45%;\n  }\n  [offset-gt-sm=\"50\"] {\n    margin-left: 50%;\n  }\n  [offset-gt-sm=\"55\"] {\n    margin-left: 55%;\n  }\n  [offset-gt-sm=\"60\"] {\n    margin-left: 60%;\n  }\n  [offset-gt-sm=\"65\"] {\n    margin-left: 65%;\n  }\n  [offset-gt-sm=\"70\"] {\n    margin-left: 70%;\n  }\n  [offset-gt-sm=\"75\"] {\n    margin-left: 75%;\n  }\n  [offset-gt-sm=\"80\"] {\n    margin-left: 80%;\n  }\n  [offset-gt-sm=\"85\"] {\n    margin-left: 85%;\n  }\n  [offset-gt-sm=\"90\"] {\n    margin-left: 90%;\n  }\n  [offset-gt-sm=\"95\"] {\n    margin-left: 95%;\n  }\n  [offset-gt-sm=\"33\"],\n  [offset-gt-sm=\"34\"] {\n    margin-left: 33%;\n  }\n  [offset-gt-sm=\"66\"],\n  [offset-gt-sm=\"67\"] {\n    margin-left: 67%;\n  }\n  [layout-align-gt-sm=center],\n  [layout-align-gt-sm=\"center center\"],\n  [layout-align-gt-sm=\"center start\"],\n  [layout-align-gt-sm=\"center end\"] {\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n  [layout-align-gt-sm=end],\n  [layout-align-gt-sm=\"end center\"],\n  [layout-align-gt-sm=\"end start\"],\n  [layout-align-gt-sm=\"end end\"] {\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n  }\n  [layout-align-gt-sm=space-around],\n  [layout-align-gt-sm=\"space-around center\"],\n  [layout-align-gt-sm=\"space-around start\"],\n  [layout-align-gt-sm=\"space-around end\"] {\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n  [layout-align-gt-sm=space-between],\n  [layout-align-gt-sm=\"space-between center\"],\n  [layout-align-gt-sm=\"space-between start\"],\n  [layout-align-gt-sm=\"space-between end\"] {\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n  [layout-align-gt-sm=\"center start\"],\n  [layout-align-gt-sm=\"end start\"],\n  [layout-align-gt-sm=\"space-around start\"],\n  [layout-align-gt-sm=\"space-between start\"],\n  [layout-align-gt-sm=\"start start\"] {\n    -ms-flex-align: start;\n    -ms-grid-row-align: flex-start;\n    align-items: flex-start;\n  }\n  [layout-align-gt-sm=\"center center\"],\n  [layout-align-gt-sm=\"end center\"],\n  [layout-align-gt-sm=\"space-around center\"],\n  [layout-align-gt-sm=\"space-between center\"],\n  [layout-align-gt-sm=\"start center\"] {\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    max-width: 100%;\n  }\n  [layout-align-gt-sm=\"center end\"],\n  [layout-align-gt-sm=\"end end\"],\n  [layout-align-gt-sm=\"space-around end\"],\n  [layout-align-gt-sm=\"space-between end\"],\n  [layout-align-gt-sm=\"start end\"] {\n    -ms-flex-align: end;\n    -ms-grid-row-align: flex-end;\n    align-items: flex-end;\n  }\n  [flex-gt-sm] {\n    box-sizing: border-box;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n  }\n  [flex-gt-sm=initial] {\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n  }\n  [flex-gt-sm=auto] {\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n  }\n  [flex-gt-sm=none] {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n  }\n  [flex-gt-sm=\"5\"] {\n    -ms-flex: 0 0 5%;\n    flex: 0 0 5%;\n  }\n  [layout=row] > [flex-gt-sm=\"5\"] {\n    max-width: 5%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"5\"] {\n    max-width: 100%;\n    max-height: 5%;\n  }\n  [flex-gt-sm=\"10\"] {\n    -ms-flex: 0 0 10%;\n    flex: 0 0 10%;\n  }\n  [layout=row] > [flex-gt-sm=\"10\"] {\n    max-width: 10%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"10\"] {\n    max-width: 100%;\n    max-height: 10%;\n  }\n  [flex-gt-sm=\"15\"] {\n    -ms-flex: 0 0 15%;\n    flex: 0 0 15%;\n  }\n  [layout=row] > [flex-gt-sm=\"15\"] {\n    max-width: 15%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"15\"] {\n    max-width: 100%;\n    max-height: 15%;\n  }\n  [flex-gt-sm=\"20\"] {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n  }\n  [layout=row] > [flex-gt-sm=\"20\"] {\n    max-width: 20%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"20\"] {\n    max-width: 100%;\n    max-height: 20%;\n  }\n  [flex-gt-sm=\"25\"] {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n  }\n  [layout=row] > [flex-gt-sm=\"25\"] {\n    max-width: 25%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"25\"] {\n    max-width: 100%;\n    max-height: 25%;\n  }\n  [flex-gt-sm=\"30\"] {\n    -ms-flex: 0 0 30%;\n    flex: 0 0 30%;\n  }\n  [layout=row] > [flex-gt-sm=\"30\"] {\n    max-width: 30%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"30\"] {\n    max-width: 100%;\n    max-height: 30%;\n  }\n  [flex-gt-sm=\"35\"] {\n    -ms-flex: 0 0 35%;\n    flex: 0 0 35%;\n  }\n  [layout=row] > [flex-gt-sm=\"35\"] {\n    max-width: 35%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"35\"] {\n    max-width: 100%;\n    max-height: 35%;\n  }\n  [flex-gt-sm=\"40\"] {\n    -ms-flex: 0 0 40%;\n    flex: 0 0 40%;\n  }\n  [layout=row] > [flex-gt-sm=\"40\"] {\n    max-width: 40%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"40\"] {\n    max-width: 100%;\n    max-height: 40%;\n  }\n  [flex-gt-sm=\"45\"] {\n    -ms-flex: 0 0 45%;\n    flex: 0 0 45%;\n  }\n  [layout=row] > [flex-gt-sm=\"45\"] {\n    max-width: 45%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"45\"] {\n    max-width: 100%;\n    max-height: 45%;\n  }\n  [flex-gt-sm=\"50\"] {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n  }\n  [layout=row] > [flex-gt-sm=\"50\"] {\n    max-width: 50%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"50\"] {\n    max-width: 100%;\n    max-height: 50%;\n  }\n  [flex-gt-sm=\"55\"] {\n    -ms-flex: 0 0 55%;\n    flex: 0 0 55%;\n  }\n  [layout=row] > [flex-gt-sm=\"55\"] {\n    max-width: 55%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"55\"] {\n    max-width: 100%;\n    max-height: 55%;\n  }\n  [flex-gt-sm=\"60\"] {\n    -ms-flex: 0 0 60%;\n    flex: 0 0 60%;\n  }\n  [layout=row] > [flex-gt-sm=\"60\"] {\n    max-width: 60%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"60\"] {\n    max-width: 100%;\n    max-height: 60%;\n  }\n  [flex-gt-sm=\"65\"] {\n    -ms-flex: 0 0 65%;\n    flex: 0 0 65%;\n  }\n  [layout=row] > [flex-gt-sm=\"65\"] {\n    max-width: 65%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"65\"] {\n    max-width: 100%;\n    max-height: 65%;\n  }\n  [flex-gt-sm=\"70\"] {\n    -ms-flex: 0 0 70%;\n    flex: 0 0 70%;\n  }\n  [layout=row] > [flex-gt-sm=\"70\"] {\n    max-width: 70%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"70\"] {\n    max-width: 100%;\n    max-height: 70%;\n  }\n  [flex-gt-sm=\"75\"] {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n  }\n  [layout=row] > [flex-gt-sm=\"75\"] {\n    max-width: 75%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"75\"] {\n    max-width: 100%;\n    max-height: 75%;\n  }\n  [flex-gt-sm=\"80\"] {\n    -ms-flex: 0 0 80%;\n    flex: 0 0 80%;\n  }\n  [layout=row] > [flex-gt-sm=\"80\"] {\n    max-width: 80%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"80\"] {\n    max-width: 100%;\n    max-height: 80%;\n  }\n  [flex-gt-sm=\"85\"] {\n    -ms-flex: 0 0 85%;\n    flex: 0 0 85%;\n  }\n  [layout=row] > [flex-gt-sm=\"85\"] {\n    max-width: 85%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"85\"] {\n    max-width: 100%;\n    max-height: 85%;\n  }\n  [flex-gt-sm=\"90\"] {\n    -ms-flex: 0 0 90%;\n    flex: 0 0 90%;\n  }\n  [layout=row] > [flex-gt-sm=\"90\"] {\n    max-width: 90%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"90\"] {\n    max-width: 100%;\n    max-height: 90%;\n  }\n  [flex-gt-sm=\"95\"] {\n    -ms-flex: 0 0 95%;\n    flex: 0 0 95%;\n  }\n  [layout=row] > [flex-gt-sm=\"95\"] {\n    max-width: 95%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"95\"] {\n    max-width: 100%;\n    max-height: 95%;\n  }\n  [flex-gt-sm=\"100\"] {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n  }\n  [layout=row] > [flex-gt-sm=\"100\"],\n  [layout=column] > [flex-gt-sm=\"100\"] {\n    max-width: 100%;\n    max-height: 100%;\n  }\n  [flex-gt-sm=\"33\"],\n  [flex-gt-sm=\"34\"] {\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n  }\n  [flex-gt-sm=\"66\"],\n  [flex-gt-sm=\"67\"] {\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n  }\n  [layout=row] > [flex-gt-sm=\"33\"],\n  [layout=row] > [flex-gt-sm=\"34\"] {\n    max-width: 33%;\n    max-height: 100%;\n  }\n  [layout=row] > [flex-gt-sm=\"66\"],\n  [layout=row] > [flex-gt-sm=\"67\"] {\n    max-width: 67%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-sm=\"33\"],\n  [layout=column] > [flex-gt-sm=\"34\"] {\n    max-width: 100%;\n    max-height: 33%;\n  }\n  [layout=column] > [flex-gt-sm=\"66\"],\n  [layout=column] > [flex-gt-sm=\"67\"] {\n    max-width: 100%;\n    max-height: 67%;\n  }\n}\n@media (min-width: 37.5em) and (max-width: 60em) {\n  [hide-gt-sm]:not([show-gt-sm]):not([show-md]):not([show]),\n  [hide-md]:not([show-md]):not([show]),\n  [hide]:not([show-gt-sm]):not([show-md]):not([show]) {\n    display: none;\n  }\n  [flex-order-md=\"0\"] {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  [flex-order-md=\"1\"] {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  [flex-order-md=\"2\"] {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  [flex-order-md=\"3\"] {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  [flex-order-md=\"4\"] {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  [flex-order-md=\"5\"] {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  [flex-order-md=\"6\"] {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  [flex-order-md=\"7\"] {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  [flex-order-md=\"8\"] {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  [flex-order-md=\"9\"] {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  [flex-order-md=\"10\"] {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  [flex-order-md=\"11\"] {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  [flex-order-md=\"12\"] {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  [flex-order-md=\"13\"] {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  [flex-order-md=\"14\"] {\n    -ms-flex-order: 14;\n    order: 14;\n  }\n  [flex-order-md=\"15\"] {\n    -ms-flex-order: 15;\n    order: 15;\n  }\n  [flex-order-md=\"16\"] {\n    -ms-flex-order: 16;\n    order: 16;\n  }\n  [flex-order-md=\"17\"] {\n    -ms-flex-order: 17;\n    order: 17;\n  }\n  [flex-order-md=\"18\"] {\n    -ms-flex-order: 18;\n    order: 18;\n  }\n  [flex-order-md=\"19\"] {\n    -ms-flex-order: 19;\n    order: 19;\n  }\n  [offset-md=\"0\"] {\n    margin-left: 0;\n  }\n  [offset-md=\"5\"] {\n    margin-left: 5%;\n  }\n  [offset-md=\"10\"] {\n    margin-left: 10%;\n  }\n  [offset-md=\"15\"] {\n    margin-left: 15%;\n  }\n  [offset-md=\"20\"] {\n    margin-left: 20%;\n  }\n  [offset-md=\"25\"] {\n    margin-left: 25%;\n  }\n  [offset-md=\"30\"] {\n    margin-left: 30%;\n  }\n  [offset-md=\"35\"] {\n    margin-left: 35%;\n  }\n  [offset-md=\"40\"] {\n    margin-left: 40%;\n  }\n  [offset-md=\"45\"] {\n    margin-left: 45%;\n  }\n  [offset-md=\"50\"] {\n    margin-left: 50%;\n  }\n  [offset-md=\"55\"] {\n    margin-left: 55%;\n  }\n  [offset-md=\"60\"] {\n    margin-left: 60%;\n  }\n  [offset-md=\"65\"] {\n    margin-left: 65%;\n  }\n  [offset-md=\"70\"] {\n    margin-left: 70%;\n  }\n  [offset-md=\"75\"] {\n    margin-left: 75%;\n  }\n  [offset-md=\"80\"] {\n    margin-left: 80%;\n  }\n  [offset-md=\"85\"] {\n    margin-left: 85%;\n  }\n  [offset-md=\"90\"] {\n    margin-left: 90%;\n  }\n  [offset-md=\"95\"] {\n    margin-left: 95%;\n  }\n  [offset-md=\"33\"],\n  [offset-md=\"34\"] {\n    margin-left: 33%;\n  }\n  [offset-md=\"66\"],\n  [offset-md=\"67\"] {\n    margin-left: 67%;\n  }\n  [layout-align-md=center],\n  [layout-align-md=\"center center\"],\n  [layout-align-md=\"center start\"],\n  [layout-align-md=\"center end\"] {\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n  [layout-align-md=end],\n  [layout-align-md=\"end center\"],\n  [layout-align-md=\"end start\"],\n  [layout-align-md=\"end end\"] {\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n  }\n  [layout-align-md=space-around],\n  [layout-align-md=\"space-around center\"],\n  [layout-align-md=\"space-around start\"],\n  [layout-align-md=\"space-around end\"] {\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n  [layout-align-md=space-between],\n  [layout-align-md=\"space-between center\"],\n  [layout-align-md=\"space-between start\"],\n  [layout-align-md=\"space-between end\"] {\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n  [layout-align-md=\"center start\"],\n  [layout-align-md=\"end start\"],\n  [layout-align-md=\"space-around start\"],\n  [layout-align-md=\"space-between start\"],\n  [layout-align-md=\"start start\"] {\n    -ms-flex-align: start;\n    -ms-grid-row-align: flex-start;\n    align-items: flex-start;\n  }\n  [layout-align-md=\"center center\"],\n  [layout-align-md=\"end center\"],\n  [layout-align-md=\"space-around center\"],\n  [layout-align-md=\"space-between center\"],\n  [layout-align-md=\"start center\"] {\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    max-width: 100%;\n  }\n  [layout-align-md=\"center end\"],\n  [layout-align-md=\"end end\"],\n  [layout-align-md=\"space-around end\"],\n  [layout-align-md=\"space-between end\"],\n  [layout-align-md=\"start end\"] {\n    -ms-flex-align: end;\n    -ms-grid-row-align: flex-end;\n    align-items: flex-end;\n  }\n  [flex-md] {\n    box-sizing: border-box;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n  }\n  [flex-md=initial] {\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n  }\n  [flex-md=auto] {\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n  }\n  [flex-md=none] {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n  }\n  [flex-md=\"5\"] {\n    -ms-flex: 0 0 5%;\n    flex: 0 0 5%;\n  }\n  [layout=row] > [flex-md=\"5\"] {\n    max-width: 5%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"5\"] {\n    max-width: 100%;\n    max-height: 5%;\n  }\n  [flex-md=\"10\"] {\n    -ms-flex: 0 0 10%;\n    flex: 0 0 10%;\n  }\n  [layout=row] > [flex-md=\"10\"] {\n    max-width: 10%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"10\"] {\n    max-width: 100%;\n    max-height: 10%;\n  }\n  [flex-md=\"15\"] {\n    -ms-flex: 0 0 15%;\n    flex: 0 0 15%;\n  }\n  [layout=row] > [flex-md=\"15\"] {\n    max-width: 15%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"15\"] {\n    max-width: 100%;\n    max-height: 15%;\n  }\n  [flex-md=\"20\"] {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n  }\n  [layout=row] > [flex-md=\"20\"] {\n    max-width: 20%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"20\"] {\n    max-width: 100%;\n    max-height: 20%;\n  }\n  [flex-md=\"25\"] {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n  }\n  [layout=row] > [flex-md=\"25\"] {\n    max-width: 25%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"25\"] {\n    max-width: 100%;\n    max-height: 25%;\n  }\n  [flex-md=\"30\"] {\n    -ms-flex: 0 0 30%;\n    flex: 0 0 30%;\n  }\n  [layout=row] > [flex-md=\"30\"] {\n    max-width: 30%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"30\"] {\n    max-width: 100%;\n    max-height: 30%;\n  }\n  [flex-md=\"35\"] {\n    -ms-flex: 0 0 35%;\n    flex: 0 0 35%;\n  }\n  [layout=row] > [flex-md=\"35\"] {\n    max-width: 35%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"35\"] {\n    max-width: 100%;\n    max-height: 35%;\n  }\n  [flex-md=\"40\"] {\n    -ms-flex: 0 0 40%;\n    flex: 0 0 40%;\n  }\n  [layout=row] > [flex-md=\"40\"] {\n    max-width: 40%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"40\"] {\n    max-width: 100%;\n    max-height: 40%;\n  }\n  [flex-md=\"45\"] {\n    -ms-flex: 0 0 45%;\n    flex: 0 0 45%;\n  }\n  [layout=row] > [flex-md=\"45\"] {\n    max-width: 45%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"45\"] {\n    max-width: 100%;\n    max-height: 45%;\n  }\n  [flex-md=\"50\"] {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n  }\n  [layout=row] > [flex-md=\"50\"] {\n    max-width: 50%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"50\"] {\n    max-width: 100%;\n    max-height: 50%;\n  }\n  [flex-md=\"55\"] {\n    -ms-flex: 0 0 55%;\n    flex: 0 0 55%;\n  }\n  [layout=row] > [flex-md=\"55\"] {\n    max-width: 55%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"55\"] {\n    max-width: 100%;\n    max-height: 55%;\n  }\n  [flex-md=\"60\"] {\n    -ms-flex: 0 0 60%;\n    flex: 0 0 60%;\n  }\n  [layout=row] > [flex-md=\"60\"] {\n    max-width: 60%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"60\"] {\n    max-width: 100%;\n    max-height: 60%;\n  }\n  [flex-md=\"65\"] {\n    -ms-flex: 0 0 65%;\n    flex: 0 0 65%;\n  }\n  [layout=row] > [flex-md=\"65\"] {\n    max-width: 65%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"65\"] {\n    max-width: 100%;\n    max-height: 65%;\n  }\n  [flex-md=\"70\"] {\n    -ms-flex: 0 0 70%;\n    flex: 0 0 70%;\n  }\n  [layout=row] > [flex-md=\"70\"] {\n    max-width: 70%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"70\"] {\n    max-width: 100%;\n    max-height: 70%;\n  }\n  [flex-md=\"75\"] {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n  }\n  [layout=row] > [flex-md=\"75\"] {\n    max-width: 75%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"75\"] {\n    max-width: 100%;\n    max-height: 75%;\n  }\n  [flex-md=\"80\"] {\n    -ms-flex: 0 0 80%;\n    flex: 0 0 80%;\n  }\n  [layout=row] > [flex-md=\"80\"] {\n    max-width: 80%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"80\"] {\n    max-width: 100%;\n    max-height: 80%;\n  }\n  [flex-md=\"85\"] {\n    -ms-flex: 0 0 85%;\n    flex: 0 0 85%;\n  }\n  [layout=row] > [flex-md=\"85\"] {\n    max-width: 85%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"85\"] {\n    max-width: 100%;\n    max-height: 85%;\n  }\n  [flex-md=\"90\"] {\n    -ms-flex: 0 0 90%;\n    flex: 0 0 90%;\n  }\n  [layout=row] > [flex-md=\"90\"] {\n    max-width: 90%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"90\"] {\n    max-width: 100%;\n    max-height: 90%;\n  }\n  [flex-md=\"95\"] {\n    -ms-flex: 0 0 95%;\n    flex: 0 0 95%;\n  }\n  [layout=row] > [flex-md=\"95\"] {\n    max-width: 95%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"95\"] {\n    max-width: 100%;\n    max-height: 95%;\n  }\n  [flex-md=\"100\"] {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n  }\n  [layout=row] > [flex-md=\"100\"],\n  [layout=column] > [flex-md=\"100\"] {\n    max-width: 100%;\n    max-height: 100%;\n  }\n  [flex-md=\"33\"],\n  [flex-md=\"34\"] {\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n  }\n  [flex-md=\"66\"],\n  [flex-md=\"67\"] {\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n  }\n  [layout=row] > [flex-md=\"33\"],\n  [layout=row] > [flex-md=\"34\"] {\n    max-width: 33%;\n    max-height: 100%;\n  }\n  [layout=row] > [flex-md=\"66\"],\n  [layout=row] > [flex-md=\"67\"] {\n    max-width: 67%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-md=\"33\"],\n  [layout=column] > [flex-md=\"34\"] {\n    max-width: 100%;\n    max-height: 33%;\n  }\n  [layout=column] > [flex-md=\"66\"],\n  [layout=column] > [flex-md=\"67\"] {\n    max-width: 100%;\n    max-height: 67%;\n  }\n}\n@media (min-width: 60em) {\n  [flex-order-gt-md=\"0\"] {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  [flex-order-gt-md=\"1\"] {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  [flex-order-gt-md=\"2\"] {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  [flex-order-gt-md=\"3\"] {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  [flex-order-gt-md=\"4\"] {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  [flex-order-gt-md=\"5\"] {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  [flex-order-gt-md=\"6\"] {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  [flex-order-gt-md=\"7\"] {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  [flex-order-gt-md=\"8\"] {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  [flex-order-gt-md=\"9\"] {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  [flex-order-gt-md=\"10\"] {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  [flex-order-gt-md=\"11\"] {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  [flex-order-gt-md=\"12\"] {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  [flex-order-gt-md=\"13\"] {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  [flex-order-gt-md=\"14\"] {\n    -ms-flex-order: 14;\n    order: 14;\n  }\n  [flex-order-gt-md=\"15\"] {\n    -ms-flex-order: 15;\n    order: 15;\n  }\n  [flex-order-gt-md=\"16\"] {\n    -ms-flex-order: 16;\n    order: 16;\n  }\n  [flex-order-gt-md=\"17\"] {\n    -ms-flex-order: 17;\n    order: 17;\n  }\n  [flex-order-gt-md=\"18\"] {\n    -ms-flex-order: 18;\n    order: 18;\n  }\n  [flex-order-gt-md=\"19\"] {\n    -ms-flex-order: 19;\n    order: 19;\n  }\n  [offset-gt-md=\"0\"] {\n    margin-left: 0;\n  }\n  [offset-gt-md=\"5\"] {\n    margin-left: 5%;\n  }\n  [offset-gt-md=\"10\"] {\n    margin-left: 10%;\n  }\n  [offset-gt-md=\"15\"] {\n    margin-left: 15%;\n  }\n  [offset-gt-md=\"20\"] {\n    margin-left: 20%;\n  }\n  [offset-gt-md=\"25\"] {\n    margin-left: 25%;\n  }\n  [offset-gt-md=\"30\"] {\n    margin-left: 30%;\n  }\n  [offset-gt-md=\"35\"] {\n    margin-left: 35%;\n  }\n  [offset-gt-md=\"40\"] {\n    margin-left: 40%;\n  }\n  [offset-gt-md=\"45\"] {\n    margin-left: 45%;\n  }\n  [offset-gt-md=\"50\"] {\n    margin-left: 50%;\n  }\n  [offset-gt-md=\"55\"] {\n    margin-left: 55%;\n  }\n  [offset-gt-md=\"60\"] {\n    margin-left: 60%;\n  }\n  [offset-gt-md=\"65\"] {\n    margin-left: 65%;\n  }\n  [offset-gt-md=\"70\"] {\n    margin-left: 70%;\n  }\n  [offset-gt-md=\"75\"] {\n    margin-left: 75%;\n  }\n  [offset-gt-md=\"80\"] {\n    margin-left: 80%;\n  }\n  [offset-gt-md=\"85\"] {\n    margin-left: 85%;\n  }\n  [offset-gt-md=\"90\"] {\n    margin-left: 90%;\n  }\n  [offset-gt-md=\"95\"] {\n    margin-left: 95%;\n  }\n  [offset-gt-md=\"33\"],\n  [offset-gt-md=\"34\"] {\n    margin-left: 33%;\n  }\n  [offset-gt-md=\"66\"],\n  [offset-gt-md=\"67\"] {\n    margin-left: 67%;\n  }\n  [layout-align-gt-md=center],\n  [layout-align-gt-md=\"center center\"],\n  [layout-align-gt-md=\"center start\"],\n  [layout-align-gt-md=\"center end\"] {\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n  [layout-align-gt-md=end],\n  [layout-align-gt-md=\"end center\"],\n  [layout-align-gt-md=\"end start\"],\n  [layout-align-gt-md=\"end end\"] {\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n  }\n  [layout-align-gt-md=space-around],\n  [layout-align-gt-md=\"space-around center\"],\n  [layout-align-gt-md=\"space-around start\"],\n  [layout-align-gt-md=\"space-around end\"] {\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n  [layout-align-gt-md=space-between],\n  [layout-align-gt-md=\"space-between center\"],\n  [layout-align-gt-md=\"space-between start\"],\n  [layout-align-gt-md=\"space-between end\"] {\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n  [layout-align-gt-md=\"center start\"],\n  [layout-align-gt-md=\"end start\"],\n  [layout-align-gt-md=\"space-around start\"],\n  [layout-align-gt-md=\"space-between start\"],\n  [layout-align-gt-md=\"start start\"] {\n    -ms-flex-align: start;\n    -ms-grid-row-align: flex-start;\n    align-items: flex-start;\n  }\n  [layout-align-gt-md=\"center center\"],\n  [layout-align-gt-md=\"end center\"],\n  [layout-align-gt-md=\"space-around center\"],\n  [layout-align-gt-md=\"space-between center\"],\n  [layout-align-gt-md=\"start center\"] {\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    max-width: 100%;\n  }\n  [layout-align-gt-md=\"center end\"],\n  [layout-align-gt-md=\"end end\"],\n  [layout-align-gt-md=\"space-around end\"],\n  [layout-align-gt-md=\"space-between end\"],\n  [layout-align-gt-md=\"start end\"] {\n    -ms-flex-align: end;\n    -ms-grid-row-align: flex-end;\n    align-items: flex-end;\n  }\n  [flex-gt-md] {\n    box-sizing: border-box;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n  }\n  [flex-gt-md=initial] {\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n  }\n  [flex-gt-md=auto] {\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n  }\n  [flex-gt-md=none] {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n  }\n  [flex-gt-md=\"5\"] {\n    -ms-flex: 0 0 5%;\n    flex: 0 0 5%;\n  }\n  [layout=row] > [flex-gt-md=\"5\"] {\n    max-width: 5%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"5\"] {\n    max-width: 100%;\n    max-height: 5%;\n  }\n  [flex-gt-md=\"10\"] {\n    -ms-flex: 0 0 10%;\n    flex: 0 0 10%;\n  }\n  [layout=row] > [flex-gt-md=\"10\"] {\n    max-width: 10%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"10\"] {\n    max-width: 100%;\n    max-height: 10%;\n  }\n  [flex-gt-md=\"15\"] {\n    -ms-flex: 0 0 15%;\n    flex: 0 0 15%;\n  }\n  [layout=row] > [flex-gt-md=\"15\"] {\n    max-width: 15%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"15\"] {\n    max-width: 100%;\n    max-height: 15%;\n  }\n  [flex-gt-md=\"20\"] {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n  }\n  [layout=row] > [flex-gt-md=\"20\"] {\n    max-width: 20%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"20\"] {\n    max-width: 100%;\n    max-height: 20%;\n  }\n  [flex-gt-md=\"25\"] {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n  }\n  [layout=row] > [flex-gt-md=\"25\"] {\n    max-width: 25%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"25\"] {\n    max-width: 100%;\n    max-height: 25%;\n  }\n  [flex-gt-md=\"30\"] {\n    -ms-flex: 0 0 30%;\n    flex: 0 0 30%;\n  }\n  [layout=row] > [flex-gt-md=\"30\"] {\n    max-width: 30%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"30\"] {\n    max-width: 100%;\n    max-height: 30%;\n  }\n  [flex-gt-md=\"35\"] {\n    -ms-flex: 0 0 35%;\n    flex: 0 0 35%;\n  }\n  [layout=row] > [flex-gt-md=\"35\"] {\n    max-width: 35%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"35\"] {\n    max-width: 100%;\n    max-height: 35%;\n  }\n  [flex-gt-md=\"40\"] {\n    -ms-flex: 0 0 40%;\n    flex: 0 0 40%;\n  }\n  [layout=row] > [flex-gt-md=\"40\"] {\n    max-width: 40%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"40\"] {\n    max-width: 100%;\n    max-height: 40%;\n  }\n  [flex-gt-md=\"45\"] {\n    -ms-flex: 0 0 45%;\n    flex: 0 0 45%;\n  }\n  [layout=row] > [flex-gt-md=\"45\"] {\n    max-width: 45%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"45\"] {\n    max-width: 100%;\n    max-height: 45%;\n  }\n  [flex-gt-md=\"50\"] {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n  }\n  [layout=row] > [flex-gt-md=\"50\"] {\n    max-width: 50%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"50\"] {\n    max-width: 100%;\n    max-height: 50%;\n  }\n  [flex-gt-md=\"55\"] {\n    -ms-flex: 0 0 55%;\n    flex: 0 0 55%;\n  }\n  [layout=row] > [flex-gt-md=\"55\"] {\n    max-width: 55%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"55\"] {\n    max-width: 100%;\n    max-height: 55%;\n  }\n  [flex-gt-md=\"60\"] {\n    -ms-flex: 0 0 60%;\n    flex: 0 0 60%;\n  }\n  [layout=row] > [flex-gt-md=\"60\"] {\n    max-width: 60%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"60\"] {\n    max-width: 100%;\n    max-height: 60%;\n  }\n  [flex-gt-md=\"65\"] {\n    -ms-flex: 0 0 65%;\n    flex: 0 0 65%;\n  }\n  [layout=row] > [flex-gt-md=\"65\"] {\n    max-width: 65%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"65\"] {\n    max-width: 100%;\n    max-height: 65%;\n  }\n  [flex-gt-md=\"70\"] {\n    -ms-flex: 0 0 70%;\n    flex: 0 0 70%;\n  }\n  [layout=row] > [flex-gt-md=\"70\"] {\n    max-width: 70%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"70\"] {\n    max-width: 100%;\n    max-height: 70%;\n  }\n  [flex-gt-md=\"75\"] {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n  }\n  [layout=row] > [flex-gt-md=\"75\"] {\n    max-width: 75%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"75\"] {\n    max-width: 100%;\n    max-height: 75%;\n  }\n  [flex-gt-md=\"80\"] {\n    -ms-flex: 0 0 80%;\n    flex: 0 0 80%;\n  }\n  [layout=row] > [flex-gt-md=\"80\"] {\n    max-width: 80%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"80\"] {\n    max-width: 100%;\n    max-height: 80%;\n  }\n  [flex-gt-md=\"85\"] {\n    -ms-flex: 0 0 85%;\n    flex: 0 0 85%;\n  }\n  [layout=row] > [flex-gt-md=\"85\"] {\n    max-width: 85%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"85\"] {\n    max-width: 100%;\n    max-height: 85%;\n  }\n  [flex-gt-md=\"90\"] {\n    -ms-flex: 0 0 90%;\n    flex: 0 0 90%;\n  }\n  [layout=row] > [flex-gt-md=\"90\"] {\n    max-width: 90%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"90\"] {\n    max-width: 100%;\n    max-height: 90%;\n  }\n  [flex-gt-md=\"95\"] {\n    -ms-flex: 0 0 95%;\n    flex: 0 0 95%;\n  }\n  [layout=row] > [flex-gt-md=\"95\"] {\n    max-width: 95%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"95\"] {\n    max-width: 100%;\n    max-height: 95%;\n  }\n  [flex-gt-md=\"100\"] {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n  }\n  [layout=row] > [flex-gt-md=\"100\"],\n  [layout=column] > [flex-gt-md=\"100\"] {\n    max-width: 100%;\n    max-height: 100%;\n  }\n  [flex-gt-md=\"33\"],\n  [flex-gt-md=\"34\"] {\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n  }\n  [flex-gt-md=\"66\"],\n  [flex-gt-md=\"67\"] {\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n  }\n  [layout=row] > [flex-gt-md=\"33\"],\n  [layout=row] > [flex-gt-md=\"34\"] {\n    max-width: 33%;\n    max-height: 100%;\n  }\n  [layout=row] > [flex-gt-md=\"66\"],\n  [layout=row] > [flex-gt-md=\"67\"] {\n    max-width: 67%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-md=\"33\"],\n  [layout=column] > [flex-gt-md=\"34\"] {\n    max-width: 100%;\n    max-height: 33%;\n  }\n  [layout=column] > [flex-gt-md=\"66\"],\n  [layout=column] > [flex-gt-md=\"67\"] {\n    max-width: 100%;\n    max-height: 67%;\n  }\n}\n@media (min-width: 60em) and (max-width: 75em) {\n  [hide-gt-md]:not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]),\n  [hide-gt-sm]:not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]),\n  [hide-lg]:not([show-lg]):not([show]),\n  [hide]:not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]) {\n    display: none;\n  }\n  [flex-order-lg=\"0\"] {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  [flex-order-lg=\"1\"] {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  [flex-order-lg=\"2\"] {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  [flex-order-lg=\"3\"] {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  [flex-order-lg=\"4\"] {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  [flex-order-lg=\"5\"] {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  [flex-order-lg=\"6\"] {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  [flex-order-lg=\"7\"] {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  [flex-order-lg=\"8\"] {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  [flex-order-lg=\"9\"] {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  [flex-order-lg=\"10\"] {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  [flex-order-lg=\"11\"] {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  [flex-order-lg=\"12\"] {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  [flex-order-lg=\"13\"] {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  [flex-order-lg=\"14\"] {\n    -ms-flex-order: 14;\n    order: 14;\n  }\n  [flex-order-lg=\"15\"] {\n    -ms-flex-order: 15;\n    order: 15;\n  }\n  [flex-order-lg=\"16\"] {\n    -ms-flex-order: 16;\n    order: 16;\n  }\n  [flex-order-lg=\"17\"] {\n    -ms-flex-order: 17;\n    order: 17;\n  }\n  [flex-order-lg=\"18\"] {\n    -ms-flex-order: 18;\n    order: 18;\n  }\n  [flex-order-lg=\"19\"] {\n    -ms-flex-order: 19;\n    order: 19;\n  }\n  [offset-lg=\"0\"] {\n    margin-left: 0;\n  }\n  [offset-lg=\"5\"] {\n    margin-left: 5%;\n  }\n  [offset-lg=\"10\"] {\n    margin-left: 10%;\n  }\n  [offset-lg=\"15\"] {\n    margin-left: 15%;\n  }\n  [offset-lg=\"20\"] {\n    margin-left: 20%;\n  }\n  [offset-lg=\"25\"] {\n    margin-left: 25%;\n  }\n  [offset-lg=\"30\"] {\n    margin-left: 30%;\n  }\n  [offset-lg=\"35\"] {\n    margin-left: 35%;\n  }\n  [offset-lg=\"40\"] {\n    margin-left: 40%;\n  }\n  [offset-lg=\"45\"] {\n    margin-left: 45%;\n  }\n  [offset-lg=\"50\"] {\n    margin-left: 50%;\n  }\n  [offset-lg=\"55\"] {\n    margin-left: 55%;\n  }\n  [offset-lg=\"60\"] {\n    margin-left: 60%;\n  }\n  [offset-lg=\"65\"] {\n    margin-left: 65%;\n  }\n  [offset-lg=\"70\"] {\n    margin-left: 70%;\n  }\n  [offset-lg=\"75\"] {\n    margin-left: 75%;\n  }\n  [offset-lg=\"80\"] {\n    margin-left: 80%;\n  }\n  [offset-lg=\"85\"] {\n    margin-left: 85%;\n  }\n  [offset-lg=\"90\"] {\n    margin-left: 90%;\n  }\n  [offset-lg=\"95\"] {\n    margin-left: 95%;\n  }\n  [offset-lg=\"33\"],\n  [offset-lg=\"34\"] {\n    margin-left: 33%;\n  }\n  [offset-lg=\"66\"],\n  [offset-lg=\"67\"] {\n    margin-left: 67%;\n  }\n  [layout-align-lg=center],\n  [layout-align-lg=\"center center\"],\n  [layout-align-lg=\"center start\"],\n  [layout-align-lg=\"center end\"] {\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n  [layout-align-lg=end],\n  [layout-align-lg=\"end center\"],\n  [layout-align-lg=\"end start\"],\n  [layout-align-lg=\"end end\"] {\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n  }\n  [layout-align-lg=space-around],\n  [layout-align-lg=\"space-around center\"],\n  [layout-align-lg=\"space-around start\"],\n  [layout-align-lg=\"space-around end\"] {\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n  [layout-align-lg=space-between],\n  [layout-align-lg=\"space-between center\"],\n  [layout-align-lg=\"space-between start\"],\n  [layout-align-lg=\"space-between end\"] {\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n  [layout-align-lg=\"center start\"],\n  [layout-align-lg=\"end start\"],\n  [layout-align-lg=\"space-around start\"],\n  [layout-align-lg=\"space-between start\"],\n  [layout-align-lg=\"start start\"] {\n    -ms-flex-align: start;\n    -ms-grid-row-align: flex-start;\n    align-items: flex-start;\n  }\n  [layout-align-lg=\"center center\"],\n  [layout-align-lg=\"end center\"],\n  [layout-align-lg=\"space-around center\"],\n  [layout-align-lg=\"space-between center\"],\n  [layout-align-lg=\"start center\"] {\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    max-width: 100%;\n  }\n  [layout-align-lg=\"center end\"],\n  [layout-align-lg=\"end end\"],\n  [layout-align-lg=\"space-around end\"],\n  [layout-align-lg=\"space-between end\"],\n  [layout-align-lg=\"start end\"] {\n    -ms-flex-align: end;\n    -ms-grid-row-align: flex-end;\n    align-items: flex-end;\n  }\n  [flex-lg] {\n    box-sizing: border-box;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n  }\n  [flex-lg=initial] {\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n  }\n  [flex-lg=auto] {\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n  }\n  [flex-lg=none] {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n  }\n  [flex-lg=\"5\"] {\n    -ms-flex: 0 0 5%;\n    flex: 0 0 5%;\n  }\n  [layout=row] > [flex-lg=\"5\"] {\n    max-width: 5%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"5\"] {\n    max-width: 100%;\n    max-height: 5%;\n  }\n  [flex-lg=\"10\"] {\n    -ms-flex: 0 0 10%;\n    flex: 0 0 10%;\n  }\n  [layout=row] > [flex-lg=\"10\"] {\n    max-width: 10%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"10\"] {\n    max-width: 100%;\n    max-height: 10%;\n  }\n  [flex-lg=\"15\"] {\n    -ms-flex: 0 0 15%;\n    flex: 0 0 15%;\n  }\n  [layout=row] > [flex-lg=\"15\"] {\n    max-width: 15%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"15\"] {\n    max-width: 100%;\n    max-height: 15%;\n  }\n  [flex-lg=\"20\"] {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n  }\n  [layout=row] > [flex-lg=\"20\"] {\n    max-width: 20%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"20\"] {\n    max-width: 100%;\n    max-height: 20%;\n  }\n  [flex-lg=\"25\"] {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n  }\n  [layout=row] > [flex-lg=\"25\"] {\n    max-width: 25%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"25\"] {\n    max-width: 100%;\n    max-height: 25%;\n  }\n  [flex-lg=\"30\"] {\n    -ms-flex: 0 0 30%;\n    flex: 0 0 30%;\n  }\n  [layout=row] > [flex-lg=\"30\"] {\n    max-width: 30%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"30\"] {\n    max-width: 100%;\n    max-height: 30%;\n  }\n  [flex-lg=\"35\"] {\n    -ms-flex: 0 0 35%;\n    flex: 0 0 35%;\n  }\n  [layout=row] > [flex-lg=\"35\"] {\n    max-width: 35%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"35\"] {\n    max-width: 100%;\n    max-height: 35%;\n  }\n  [flex-lg=\"40\"] {\n    -ms-flex: 0 0 40%;\n    flex: 0 0 40%;\n  }\n  [layout=row] > [flex-lg=\"40\"] {\n    max-width: 40%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"40\"] {\n    max-width: 100%;\n    max-height: 40%;\n  }\n  [flex-lg=\"45\"] {\n    -ms-flex: 0 0 45%;\n    flex: 0 0 45%;\n  }\n  [layout=row] > [flex-lg=\"45\"] {\n    max-width: 45%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"45\"] {\n    max-width: 100%;\n    max-height: 45%;\n  }\n  [flex-lg=\"50\"] {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n  }\n  [layout=row] > [flex-lg=\"50\"] {\n    max-width: 50%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"50\"] {\n    max-width: 100%;\n    max-height: 50%;\n  }\n  [flex-lg=\"55\"] {\n    -ms-flex: 0 0 55%;\n    flex: 0 0 55%;\n  }\n  [layout=row] > [flex-lg=\"55\"] {\n    max-width: 55%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"55\"] {\n    max-width: 100%;\n    max-height: 55%;\n  }\n  [flex-lg=\"60\"] {\n    -ms-flex: 0 0 60%;\n    flex: 0 0 60%;\n  }\n  [layout=row] > [flex-lg=\"60\"] {\n    max-width: 60%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"60\"] {\n    max-width: 100%;\n    max-height: 60%;\n  }\n  [flex-lg=\"65\"] {\n    -ms-flex: 0 0 65%;\n    flex: 0 0 65%;\n  }\n  [layout=row] > [flex-lg=\"65\"] {\n    max-width: 65%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"65\"] {\n    max-width: 100%;\n    max-height: 65%;\n  }\n  [flex-lg=\"70\"] {\n    -ms-flex: 0 0 70%;\n    flex: 0 0 70%;\n  }\n  [layout=row] > [flex-lg=\"70\"] {\n    max-width: 70%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"70\"] {\n    max-width: 100%;\n    max-height: 70%;\n  }\n  [flex-lg=\"75\"] {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n  }\n  [layout=row] > [flex-lg=\"75\"] {\n    max-width: 75%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"75\"] {\n    max-width: 100%;\n    max-height: 75%;\n  }\n  [flex-lg=\"80\"] {\n    -ms-flex: 0 0 80%;\n    flex: 0 0 80%;\n  }\n  [layout=row] > [flex-lg=\"80\"] {\n    max-width: 80%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"80\"] {\n    max-width: 100%;\n    max-height: 80%;\n  }\n  [flex-lg=\"85\"] {\n    -ms-flex: 0 0 85%;\n    flex: 0 0 85%;\n  }\n  [layout=row] > [flex-lg=\"85\"] {\n    max-width: 85%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"85\"] {\n    max-width: 100%;\n    max-height: 85%;\n  }\n  [flex-lg=\"90\"] {\n    -ms-flex: 0 0 90%;\n    flex: 0 0 90%;\n  }\n  [layout=row] > [flex-lg=\"90\"] {\n    max-width: 90%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"90\"] {\n    max-width: 100%;\n    max-height: 90%;\n  }\n  [flex-lg=\"95\"] {\n    -ms-flex: 0 0 95%;\n    flex: 0 0 95%;\n  }\n  [layout=row] > [flex-lg=\"95\"] {\n    max-width: 95%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"95\"] {\n    max-width: 100%;\n    max-height: 95%;\n  }\n  [flex-lg=\"100\"] {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n  }\n  [layout=row] > [flex-lg=\"100\"],\n  [layout=column] > [flex-lg=\"100\"] {\n    max-width: 100%;\n    max-height: 100%;\n  }\n  [flex-lg=\"33\"],\n  [flex-lg=\"34\"] {\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n  }\n  [flex-lg=\"66\"],\n  [flex-lg=\"67\"] {\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n  }\n  [layout=row] > [flex-lg=\"33\"],\n  [layout=row] > [flex-lg=\"34\"] {\n    max-width: 33%;\n    max-height: 100%;\n  }\n  [layout=row] > [flex-lg=\"66\"],\n  [layout=row] > [flex-lg=\"67\"] {\n    max-width: 67%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-lg=\"33\"],\n  [layout=column] > [flex-lg=\"34\"] {\n    max-width: 100%;\n    max-height: 33%;\n  }\n  [layout=column] > [flex-lg=\"66\"],\n  [layout=column] > [flex-lg=\"67\"] {\n    max-width: 100%;\n    max-height: 67%;\n  }\n}\n@media (min-width: 75em) {\n  [hide-gt-lg]:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),\n  [hide-gt-md]:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),\n  [hide-gt-sm]:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),\n  [hide]:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]) {\n    display: none;\n  }\n  [flex-order-gt-lg=\"0\"] {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  [flex-order-gt-lg=\"1\"] {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  [flex-order-gt-lg=\"2\"] {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  [flex-order-gt-lg=\"3\"] {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  [flex-order-gt-lg=\"4\"] {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  [flex-order-gt-lg=\"5\"] {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  [flex-order-gt-lg=\"6\"] {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  [flex-order-gt-lg=\"7\"] {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  [flex-order-gt-lg=\"8\"] {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  [flex-order-gt-lg=\"9\"] {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  [flex-order-gt-lg=\"10\"] {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  [flex-order-gt-lg=\"11\"] {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  [flex-order-gt-lg=\"12\"] {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  [flex-order-gt-lg=\"13\"] {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  [flex-order-gt-lg=\"14\"] {\n    -ms-flex-order: 14;\n    order: 14;\n  }\n  [flex-order-gt-lg=\"15\"] {\n    -ms-flex-order: 15;\n    order: 15;\n  }\n  [flex-order-gt-lg=\"16\"] {\n    -ms-flex-order: 16;\n    order: 16;\n  }\n  [flex-order-gt-lg=\"17\"] {\n    -ms-flex-order: 17;\n    order: 17;\n  }\n  [flex-order-gt-lg=\"18\"] {\n    -ms-flex-order: 18;\n    order: 18;\n  }\n  [flex-order-gt-lg=\"19\"] {\n    -ms-flex-order: 19;\n    order: 19;\n  }\n  [offset-gt-lg=\"0\"] {\n    margin-left: 0;\n  }\n  [offset-gt-lg=\"5\"] {\n    margin-left: 5%;\n  }\n  [offset-gt-lg=\"10\"] {\n    margin-left: 10%;\n  }\n  [offset-gt-lg=\"15\"] {\n    margin-left: 15%;\n  }\n  [offset-gt-lg=\"20\"] {\n    margin-left: 20%;\n  }\n  [offset-gt-lg=\"25\"] {\n    margin-left: 25%;\n  }\n  [offset-gt-lg=\"30\"] {\n    margin-left: 30%;\n  }\n  [offset-gt-lg=\"35\"] {\n    margin-left: 35%;\n  }\n  [offset-gt-lg=\"40\"] {\n    margin-left: 40%;\n  }\n  [offset-gt-lg=\"45\"] {\n    margin-left: 45%;\n  }\n  [offset-gt-lg=\"50\"] {\n    margin-left: 50%;\n  }\n  [offset-gt-lg=\"55\"] {\n    margin-left: 55%;\n  }\n  [offset-gt-lg=\"60\"] {\n    margin-left: 60%;\n  }\n  [offset-gt-lg=\"65\"] {\n    margin-left: 65%;\n  }\n  [offset-gt-lg=\"70\"] {\n    margin-left: 70%;\n  }\n  [offset-gt-lg=\"75\"] {\n    margin-left: 75%;\n  }\n  [offset-gt-lg=\"80\"] {\n    margin-left: 80%;\n  }\n  [offset-gt-lg=\"85\"] {\n    margin-left: 85%;\n  }\n  [offset-gt-lg=\"90\"] {\n    margin-left: 90%;\n  }\n  [offset-gt-lg=\"95\"] {\n    margin-left: 95%;\n  }\n  [offset-gt-lg=\"33\"],\n  [offset-gt-lg=\"34\"] {\n    margin-left: 33%;\n  }\n  [offset-gt-lg=\"66\"],\n  [offset-gt-lg=\"67\"] {\n    margin-left: 67%;\n  }\n  [layout-align-gt-lg=center],\n  [layout-align-gt-lg=\"center center\"],\n  [layout-align-gt-lg=\"center start\"],\n  [layout-align-gt-lg=\"center end\"] {\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n  [layout-align-gt-lg=end],\n  [layout-align-gt-lg=\"end center\"],\n  [layout-align-gt-lg=\"end start\"],\n  [layout-align-gt-lg=\"end end\"] {\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n  }\n  [layout-align-gt-lg=space-around],\n  [layout-align-gt-lg=\"space-around center\"],\n  [layout-align-gt-lg=\"space-around start\"],\n  [layout-align-gt-lg=\"space-around end\"] {\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n  [layout-align-gt-lg=space-between],\n  [layout-align-gt-lg=\"space-between center\"],\n  [layout-align-gt-lg=\"space-between start\"],\n  [layout-align-gt-lg=\"space-between end\"] {\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n  [layout-align-gt-lg=\"center start\"],\n  [layout-align-gt-lg=\"end start\"],\n  [layout-align-gt-lg=\"space-around start\"],\n  [layout-align-gt-lg=\"space-between start\"],\n  [layout-align-gt-lg=\"start start\"] {\n    -ms-flex-align: start;\n    -ms-grid-row-align: flex-start;\n    align-items: flex-start;\n  }\n  [layout-align-gt-lg=\"center center\"],\n  [layout-align-gt-lg=\"end center\"],\n  [layout-align-gt-lg=\"space-around center\"],\n  [layout-align-gt-lg=\"space-between center\"],\n  [layout-align-gt-lg=\"start center\"] {\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    max-width: 100%;\n  }\n  [layout-align-gt-lg=\"center end\"],\n  [layout-align-gt-lg=\"end end\"],\n  [layout-align-gt-lg=\"space-around end\"],\n  [layout-align-gt-lg=\"space-between end\"],\n  [layout-align-gt-lg=\"start end\"] {\n    -ms-flex-align: end;\n    -ms-grid-row-align: flex-end;\n    align-items: flex-end;\n  }\n  [flex-gt-lg] {\n    box-sizing: border-box;\n    -ms-flex: 1 1 0%;\n    flex: 1 1 0%;\n  }\n  [flex-gt-lg=initial] {\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n  }\n  [flex-gt-lg=auto] {\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n  }\n  [flex-gt-lg=none] {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n  }\n  [flex-gt-lg=\"5\"] {\n    -ms-flex: 0 0 5%;\n    flex: 0 0 5%;\n  }\n  [layout=row] > [flex-gt-lg=\"5\"] {\n    max-width: 5%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"5\"] {\n    max-width: 100%;\n    max-height: 5%;\n  }\n  [flex-gt-lg=\"10\"] {\n    -ms-flex: 0 0 10%;\n    flex: 0 0 10%;\n  }\n  [layout=row] > [flex-gt-lg=\"10\"] {\n    max-width: 10%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"10\"] {\n    max-width: 100%;\n    max-height: 10%;\n  }\n  [flex-gt-lg=\"15\"] {\n    -ms-flex: 0 0 15%;\n    flex: 0 0 15%;\n  }\n  [layout=row] > [flex-gt-lg=\"15\"] {\n    max-width: 15%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"15\"] {\n    max-width: 100%;\n    max-height: 15%;\n  }\n  [flex-gt-lg=\"20\"] {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n  }\n  [layout=row] > [flex-gt-lg=\"20\"] {\n    max-width: 20%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"20\"] {\n    max-width: 100%;\n    max-height: 20%;\n  }\n  [flex-gt-lg=\"25\"] {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n  }\n  [layout=row] > [flex-gt-lg=\"25\"] {\n    max-width: 25%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"25\"] {\n    max-width: 100%;\n    max-height: 25%;\n  }\n  [flex-gt-lg=\"30\"] {\n    -ms-flex: 0 0 30%;\n    flex: 0 0 30%;\n  }\n  [layout=row] > [flex-gt-lg=\"30\"] {\n    max-width: 30%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"30\"] {\n    max-width: 100%;\n    max-height: 30%;\n  }\n  [flex-gt-lg=\"35\"] {\n    -ms-flex: 0 0 35%;\n    flex: 0 0 35%;\n  }\n  [layout=row] > [flex-gt-lg=\"35\"] {\n    max-width: 35%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"35\"] {\n    max-width: 100%;\n    max-height: 35%;\n  }\n  [flex-gt-lg=\"40\"] {\n    -ms-flex: 0 0 40%;\n    flex: 0 0 40%;\n  }\n  [layout=row] > [flex-gt-lg=\"40\"] {\n    max-width: 40%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"40\"] {\n    max-width: 100%;\n    max-height: 40%;\n  }\n  [flex-gt-lg=\"45\"] {\n    -ms-flex: 0 0 45%;\n    flex: 0 0 45%;\n  }\n  [layout=row] > [flex-gt-lg=\"45\"] {\n    max-width: 45%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"45\"] {\n    max-width: 100%;\n    max-height: 45%;\n  }\n  [flex-gt-lg=\"50\"] {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n  }\n  [layout=row] > [flex-gt-lg=\"50\"] {\n    max-width: 50%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"50\"] {\n    max-width: 100%;\n    max-height: 50%;\n  }\n  [flex-gt-lg=\"55\"] {\n    -ms-flex: 0 0 55%;\n    flex: 0 0 55%;\n  }\n  [layout=row] > [flex-gt-lg=\"55\"] {\n    max-width: 55%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"55\"] {\n    max-width: 100%;\n    max-height: 55%;\n  }\n  [flex-gt-lg=\"60\"] {\n    -ms-flex: 0 0 60%;\n    flex: 0 0 60%;\n  }\n  [layout=row] > [flex-gt-lg=\"60\"] {\n    max-width: 60%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"60\"] {\n    max-width: 100%;\n    max-height: 60%;\n  }\n  [flex-gt-lg=\"65\"] {\n    -ms-flex: 0 0 65%;\n    flex: 0 0 65%;\n  }\n  [layout=row] > [flex-gt-lg=\"65\"] {\n    max-width: 65%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"65\"] {\n    max-width: 100%;\n    max-height: 65%;\n  }\n  [flex-gt-lg=\"70\"] {\n    -ms-flex: 0 0 70%;\n    flex: 0 0 70%;\n  }\n  [layout=row] > [flex-gt-lg=\"70\"] {\n    max-width: 70%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"70\"] {\n    max-width: 100%;\n    max-height: 70%;\n  }\n  [flex-gt-lg=\"75\"] {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n  }\n  [layout=row] > [flex-gt-lg=\"75\"] {\n    max-width: 75%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"75\"] {\n    max-width: 100%;\n    max-height: 75%;\n  }\n  [flex-gt-lg=\"80\"] {\n    -ms-flex: 0 0 80%;\n    flex: 0 0 80%;\n  }\n  [layout=row] > [flex-gt-lg=\"80\"] {\n    max-width: 80%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"80\"] {\n    max-width: 100%;\n    max-height: 80%;\n  }\n  [flex-gt-lg=\"85\"] {\n    -ms-flex: 0 0 85%;\n    flex: 0 0 85%;\n  }\n  [layout=row] > [flex-gt-lg=\"85\"] {\n    max-width: 85%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"85\"] {\n    max-width: 100%;\n    max-height: 85%;\n  }\n  [flex-gt-lg=\"90\"] {\n    -ms-flex: 0 0 90%;\n    flex: 0 0 90%;\n  }\n  [layout=row] > [flex-gt-lg=\"90\"] {\n    max-width: 90%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"90\"] {\n    max-width: 100%;\n    max-height: 90%;\n  }\n  [flex-gt-lg=\"95\"] {\n    -ms-flex: 0 0 95%;\n    flex: 0 0 95%;\n  }\n  [layout=row] > [flex-gt-lg=\"95\"] {\n    max-width: 95%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"95\"] {\n    max-width: 100%;\n    max-height: 95%;\n  }\n  [flex-gt-lg=\"100\"] {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n  }\n  [layout=row] > [flex-gt-lg=\"100\"],\n  [layout=column] > [flex-gt-lg=\"100\"] {\n    max-width: 100%;\n    max-height: 100%;\n  }\n  [flex-gt-lg=\"33\"],\n  [flex-gt-lg=\"34\"] {\n    -ms-flex: 1 1 33%;\n    flex: 1 1 33%;\n  }\n  [flex-gt-lg=\"66\"],\n  [flex-gt-lg=\"67\"] {\n    -ms-flex: 1 1 67%;\n    flex: 1 1 67%;\n  }\n  [layout=row] > [flex-gt-lg=\"33\"],\n  [layout=row] > [flex-gt-lg=\"34\"] {\n    max-width: 33%;\n    max-height: 100%;\n  }\n  [layout=row] > [flex-gt-lg=\"66\"],\n  [layout=row] > [flex-gt-lg=\"67\"] {\n    max-width: 67%;\n    max-height: 100%;\n  }\n  [layout=column] > [flex-gt-lg=\"33\"],\n  [layout=column] > [flex-gt-lg=\"34\"] {\n    max-width: 100%;\n    max-height: 33%;\n  }\n  [layout=column] > [flex-gt-lg=\"66\"],\n  [layout=column] > [flex-gt-lg=\"67\"] {\n    max-width: 100%;\n    max-height: 67%;\n  }\n}\n/*  ========================================\n    COLORS\n    ======================================== */\n/*  ========================================\n    FONTS\n    ======================================== */\n/*  ========================================\n    BREAKPOINTS\n    ======================================== */\n/*  ========================================\n    Z-INDEXES\n    ======================================== */\n/*  ========================================\n    DURATIONS\n    ======================================== */\n/*  ========================================\n    INDENTATIONS\n    ======================================== */\n/*  ========================================\n    RADI\n    ======================================== */\n/* ========================================\nMIXINS\n* General Use Mixins to ease up reoccuring styles\n* No Components!\n======================================== */\n.card {\n  padding: .5em;\n}\n.card > div {\n  cursor: pointer;\n  transition: all .5s ease;\n  color: #3b484f;\n  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);\n  background-color: rgba(59, 72, 79, 0.1);\n}\n.card > div img {\n  transition: all .5s ease;\n  transform: scale(0.85);\n}\n.card > div:hover {\n  color: #FFF;\n  text-shadow: 1px 1px 2px rgba(59, 72, 79, 0.5);\n}\n.card > div:hover img {\n  transform: scale(1);\n}\n.card > div:hover.card-event {\n  background: #ae3d48;\n}\n.card > div:hover.card-guest {\n  background: #5069e7;\n}\n.card > div:hover.card-room {\n  background: #18a59c;\n}\n.card > div:hover.card-vendor {\n  background: #b3c440;\n}\n.card > div:hover.card-supporter {\n  background: #f59432;\n}\n.card > div:hover.card-ludwigsburg {\n  background: #271f3d;\n}\n.card > div:hover.card-venue {\n  background: #8dc549;\n}\n.card > div:hover.card-team {\n  background: #b780b6;\n}\n.card > div:hover.card-rules {\n  background: #496c37;\n}\n.card > div header h2 {\n  padding: 0 1em;\n}\n.card > div footer {\n  border-top: 1px solid rgba(59, 72, 79, 0.5);\n}\n.item {\n  margin: .5em;\n  padding: .5em;\n}\n.item img {\n  height: 4em;\n  width: 4em;\n  border-radius: 100%;\n  margin-bottom: 1em;\n}\n.scheduler {\n  background: rgba(59, 72, 79, 0.5);\n  position: relative;\n}\n.pointer {\n  width: 100%;\n  height: .125rem;\n  padding: 0;\n  background: red;\n  position: absolute;\n  z-index: 100;\n}\n.timeAxis {\n  font-size: 1rem;\n  position: absolute;\n  padding: 0;\n  width: 100%;\n}\n.timeAxis .hour {\n  background: linear-gradient(to bottom, transparent 0, transparent 49.5%, black 49.5%, black 50%, transparent 50%);\n  border-top: 1px solid black;\n}\n.timeAxis .hour > * {\n  position: relative;\n  top: -1.25em;\n  height: 100%;\n}\n.events {\n  width: 100%;\n  padding-left: 5em;\n  position: absolute;\n}\n.events .event {\n  padding: .25em;\n  position: absolute;\n}\n.events .day {\n  margin-right: 1em;\n}\n/* ========================================\nSTRIPE COMPONENT\n* Defines a full-width colorful container\n*\n* @padding: small|medium|large|custom(e.g.:5%)\n* @width: small|medium|large|custom(e.g.:300)\n* this value is substracted from the current breakpoint\n* @color: color\n======================================== */\n/* ========================================\nBASE\n* Contains HTML default elements (b,i,u,table...)\n* Does not contain classes, ids\n* Can implement mixins\n======================================== */\n* {\n  box-sizing: border-box;\n}\n/*  ========================================\n    BLOCK ELEMENTS\n    ======================================== */\nbody,\nhtml {\n  background-color: #FFF;\n  overflow-x: hidden;\n  min-width: 320px;\n  font-family: Cuprum;\n  font-weight: normal;\n  font-size: 16px;\n  line-height: 1.5em;\n  color: #3b484f;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  width: 100%;\n}\ntable {\n  margin: 1em 0 2em 0;\n  border-spacing: 0;\n  width: 100%;\n}\ntable thead {\n  background: #f2f2f2;\n}\ntable th {\n  font-family: Cuprum, sans-serif;\n  font-weight: normal;\n  text-align: left;\n  background: #f2f2f2;\n  vertical-align: top;\n}\ntable tr th,\ntable tr td {\n  line-height: 1.5;\n  vertical-align: top;\n  padding: .75em .75em .5em .5em;\n  border-bottom: 1px solid #e6e6e6;\n}\nblockquote {\n  border-left: 0.25em solid #009de0;\n  font-style: italic;\n  padding-left: 1em;\n  margin: 1em 0;\n  padding: .5em;\n  color: #8c8785;\n}\nblockquote p:first-child,\nblockquote p:last-child {\n  margin: 0;\n}\nblockquote cite {\n  display: block;\n  font-style: normal;\n}\n/*  ========================================\n    TEXTUAL/CONTENT ELEMENTS\n    ======================================== */\nhr {\n  margin: 1em 0;\n  border: none;\n  width: 100%;\n  height: .1rem;\n  background-color: #bcc7cd;\n}\np {\n  padding: 0;\n  margin: 1em 0;\n  line-height: 1.5em;\n  word-wrap: break-word;\n}\np:first-child {\n  margin-top: 0;\n}\np:last-child {\n  margin-bottom: 0;\n}\na,\n.anchor {\n  position: relative;\n  transition: all 0.33s ease;\n  color: #009de0;\n  text-decoration: none;\n  cursor: pointer;\n  outline: 0;\n}\na:hover,\n.anchor:hover {\n  color: #009de0;\n}\na img,\n.anchor img {\n  border: none;\n  outline: none;\n}\na p,\n.anchor p,\na span,\n.anchor span {\n  cursor: pointer;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n}\nul {\n  list-style: square;\n}\nul,\nol {\n  padding: 0 0 0 1.15em;\n}\nol {\n  list-style-type: decimal;\n}\nol ol {\n  list-style-type: lower-alpha;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  margin: 1em 0;\n  line-height: 1.25em;\n  text-transform: uppercase;\n  font-family: Cuprum;\n  font-weight: 400;\n}\nh1:first-child,\nh2:first-child,\nh3:first-child,\nh4:first-child,\nh5:first-child,\nh6:first-child {\n  margin-top: 0;\n}\nb,\nstrong {\n  font-weight: normal;\n  font-family: Cuprum, sans-serif;\n}\nh1 {\n  color: #009de0;\n}\nh2 {\n  font-size: 1.5em;\n}\nh3,\nh3 a {\n  font-size: 1.05em;\n  color: #3b484f;\n}\nh4 {\n  font-size: 1rem;\n  font-family: Cuprum, sans-serif;\n  color: #3b484f;\n}\n/*  ========================================\n    FORM ELEMENTS\n    ======================================== */\nfieldset {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n@media screen and (max-width: 960px) {\n  body {\n    font-size: 14px;\n  }\n}\n.appmenu {\n  padding: 2em 0;\n  background-color: #dede3b;\n  width: 100%;\n  color: #3b484f;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  border-bottom: 0.2em solid rgba(59, 72, 79, 0.3);\n  color: #FFF;\n  text-shadow: 1px 0 0 rgba(59, 72, 79, 0.5);\n  transition: all 1s ease;\n}\n.appmenu > * {\n  margin: 0 auto;\n}\n@media screen and (max-width: 600px) {\n  .appmenu > * {\n    padding-left: 5%;\n    padding-right: 5%;\n  }\n}\n@media screen and (min-width: 600px) {\n  .appmenu > * {\n    width: 546.66666667px;\n  }\n}\n@media screen and (min-width: 960px) {\n  .appmenu > * {\n    width: 880px;\n  }\n}\n@media screen and (min-width: 1200px) {\n  .appmenu > * {\n    width: 1040px;\n  }\n}\n.appmenu img {\n  width: 8em;\n}\n.appmenu.card-event {\n  background: #c55964;\n}\n.appmenu.card-guest {\n  background: #7d90ed;\n}\n.appmenu.card-room {\n  background: #1ed2c6;\n}\n.appmenu.card-vendor {\n  background: #c2d067;\n}\n.appmenu.card-supporter {\n  background: #f8ad63;\n}\n.appmenu.card-ludwigsburg {\n  background: #3c305f;\n}\n.appmenu.card-venue {\n  background: #a6d270;\n}\n.appmenu.card-team {\n  background: #caa0c9;\n}\n.appmenu.card-rules {\n  background: #608d49;\n}\n* {\n  box-sizing: border-box;\n}\napp {\n  width: 100%;\n  height: 100%;\n}\nmain {\n  padding: 1em;\n}\n.ludwigsburg-map {\n  height: 50vh;\n}\n.guest {\n  margin-bottom: 2em;\n}\n.guest span {\n  display: block;\n  font-weight: bold;\n}\n.guest .social p {\n  margin: 0;\n  margin-right: .5em;\n}\n.team {\n  margin-bottom: 2em;\n}\n.team span {\n  display: block;\n  font-weight: bold;\n}\n", ""]);

	// exports


/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n", ""]);

	// exports


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n\n/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.5.0\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2016 Daniel Eden\n */\n\n.animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n}\n\n.animated.hinge {\n  -webkit-animation-duration: 2s;\n  animation-duration: 2s;\n}\n\n.animated.flipOutX,\n.animated.flipOutY,\n.animated.bounceIn,\n.animated.bounceOut {\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s;\n}\n\n@-webkit-keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    -webkit-transform: translate3d(0,0,0);\n    transform: translate3d(0,0,0);\n  }\n\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0);\n  }\n\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0,-4px,0);\n    transform: translate3d(0,-4px,0);\n  }\n}\n\n@keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    -webkit-transform: translate3d(0,0,0);\n    transform: translate3d(0,0,0);\n  }\n\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0);\n  }\n\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0,-4px,0);\n    transform: translate3d(0,-4px,0);\n  }\n}\n\n.bounce {\n  -webkit-animation-name: bounce;\n  animation-name: bounce;\n  -webkit-transform-origin: center bottom;\n  transform-origin: center bottom;\n}\n\n@-webkit-keyframes flash {\n  from, 50%, to {\n    opacity: 1;\n  }\n\n  25%, 75% {\n    opacity: 0;\n  }\n}\n\n@keyframes flash {\n  from, 50%, to {\n    opacity: 1;\n  }\n\n  25%, 75% {\n    opacity: 0;\n  }\n}\n\n.flash {\n  -webkit-animation-name: flash;\n  animation-name: flash;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.pulse {\n  -webkit-animation-name: pulse;\n  animation-name: pulse;\n}\n\n@-webkit-keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    -webkit-transform: scale3d(.95, 1.05, 1);\n    transform: scale3d(.95, 1.05, 1);\n  }\n\n  75% {\n    -webkit-transform: scale3d(1.05, .95, 1);\n    transform: scale3d(1.05, .95, 1);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    -webkit-transform: scale3d(.95, 1.05, 1);\n    transform: scale3d(.95, 1.05, 1);\n  }\n\n  75% {\n    -webkit-transform: scale3d(1.05, .95, 1);\n    transform: scale3d(1.05, .95, 1);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.rubberBand {\n  -webkit-animation-name: rubberBand;\n  animation-name: rubberBand;\n}\n\n@-webkit-keyframes shake {\n  from, to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n}\n\n@keyframes shake {\n  from, to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n}\n\n.shake {\n  -webkit-animation-name: shake;\n  animation-name: shake;\n}\n\n@-webkit-keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg);\n  }\n\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg);\n  }\n\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg);\n  }\n\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg);\n  }\n\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg);\n  }\n\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg);\n  }\n\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg);\n  }\n\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg);\n  }\n\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.headShake {\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n  -webkit-animation-name: headShake;\n  animation-name: headShake;\n}\n\n@-webkit-keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg);\n  }\n\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg);\n  }\n\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg);\n  }\n\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg);\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n}\n\n@keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg);\n  }\n\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg);\n  }\n\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg);\n  }\n\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg);\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n}\n\n.swing {\n  -webkit-transform-origin: top center;\n  transform-origin: top center;\n  -webkit-animation-name: swing;\n  animation-name: swing;\n}\n\n@-webkit-keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  10%, 20% {\n    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n  }\n\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  10%, 20% {\n    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n  }\n\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.tada {\n  -webkit-animation-name: tada;\n  animation-name: tada;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes wobble {\n  from {\n    -webkit-transform: none;\n    transform: none;\n  }\n\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n  }\n\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n  }\n\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n  }\n\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes wobble {\n  from {\n    -webkit-transform: none;\n    transform: none;\n  }\n\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n  }\n\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n  }\n\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n  }\n\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.wobble {\n  -webkit-animation-name: wobble;\n  animation-name: wobble;\n}\n\n@-webkit-keyframes jello {\n  from, 11.1%, to {\n    -webkit-transform: none;\n    transform: none;\n  }\n\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg);\n  }\n\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg);\n  }\n\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg);\n  }\n\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg);\n  }\n\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\n  }\n\n  77.7% {\n    -webkit-transform: skewX(0.390625deg) skewY(0.390625deg);\n    transform: skewX(0.390625deg) skewY(0.390625deg);\n  }\n\n  88.8% {\n    -webkit-transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n  }\n}\n\n@keyframes jello {\n  from, 11.1%, to {\n    -webkit-transform: none;\n    transform: none;\n  }\n\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg);\n  }\n\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg);\n  }\n\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg);\n  }\n\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg);\n  }\n\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\n  }\n\n  77.7% {\n    -webkit-transform: skewX(0.390625deg) skewY(0.390625deg);\n    transform: skewX(0.390625deg) skewY(0.390625deg);\n  }\n\n  88.8% {\n    -webkit-transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n  }\n}\n\n.jello {\n  -webkit-animation-name: jello;\n  animation-name: jello;\n  -webkit-transform-origin: center;\n  transform-origin: center;\n}\n\n@-webkit-keyframes bounceIn {\n  from, 20%, 40%, 60%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(.9, .9, .9);\n    transform: scale3d(.9, .9, .9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(.97, .97, .97);\n    transform: scale3d(.97, .97, .97);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceIn {\n  from, 20%, 40%, 60%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(.9, .9, .9);\n    transform: scale3d(.9, .9, .9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(.97, .97, .97);\n    transform: scale3d(.97, .97, .97);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n  animation-name: bounceIn;\n}\n\n@-webkit-keyframes bounceInDown {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0);\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes bounceInDown {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0);\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n  animation-name: bounceInDown;\n}\n\n@-webkit-keyframes bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0);\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0);\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.bounceInLeft {\n  -webkit-animation-name: bounceInLeft;\n  animation-name: bounceInLeft;\n}\n\n@-webkit-keyframes bounceInRight {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0);\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes bounceInRight {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0);\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.bounceInRight {\n  -webkit-animation-name: bounceInRight;\n  animation-name: bounceInRight;\n}\n\n@-webkit-keyframes bounceInUp {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n@keyframes bounceInUp {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n.bounceInUp {\n  -webkit-animation-name: bounceInUp;\n  animation-name: bounceInUp;\n}\n\n@-webkit-keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(.9, .9, .9);\n    transform: scale3d(.9, .9, .9);\n  }\n\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n}\n\n@keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(.9, .9, .9);\n    transform: scale3d(.9, .9, .9);\n  }\n\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n}\n\n.bounceOut {\n  -webkit-animation-name: bounceOut;\n  animation-name: bounceOut;\n}\n\n@-webkit-keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n\n@keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n\n.bounceOutDown {\n  -webkit-animation-name: bounceOutDown;\n  animation-name: bounceOutDown;\n}\n\n@-webkit-keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n\n@keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n\n.bounceOutLeft {\n  -webkit-animation-name: bounceOutLeft;\n  animation-name: bounceOutLeft;\n}\n\n@-webkit-keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n\n@keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n\n.bounceOutRight {\n  -webkit-animation-name: bounceOutRight;\n  animation-name: bounceOutRight;\n}\n\n@-webkit-keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n\n@keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n\n.bounceOutUp {\n  -webkit-animation-name: bounceOutUp;\n  animation-name: bounceOutUp;\n}\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn;\n}\n\n@-webkit-keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInDown {\n  -webkit-animation-name: fadeInDown;\n  animation-name: fadeInDown;\n}\n\n@-webkit-keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInDownBig {\n  -webkit-animation-name: fadeInDownBig;\n  animation-name: fadeInDownBig;\n}\n\n@-webkit-keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInLeft {\n  -webkit-animation-name: fadeInLeft;\n  animation-name: fadeInLeft;\n}\n\n@-webkit-keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInLeftBig {\n  -webkit-animation-name: fadeInLeftBig;\n  animation-name: fadeInLeftBig;\n}\n\n@-webkit-keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInRight {\n  -webkit-animation-name: fadeInRight;\n  animation-name: fadeInRight;\n}\n\n@-webkit-keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInRightBig {\n  -webkit-animation-name: fadeInRightBig;\n  animation-name: fadeInRightBig;\n}\n\n@-webkit-keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n  animation-name: fadeInUp;\n}\n\n@-webkit-keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInUpBig {\n  -webkit-animation-name: fadeInUpBig;\n  animation-name: fadeInUpBig;\n}\n\n@-webkit-keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n\n.fadeOut {\n  -webkit-animation-name: fadeOut;\n  animation-name: fadeOut;\n}\n\n@-webkit-keyframes fadeOutDown {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n\n@keyframes fadeOutDown {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n\n.fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n  animation-name: fadeOutDown;\n}\n\n@-webkit-keyframes fadeOutDownBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n\n@keyframes fadeOutDownBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n\n.fadeOutDownBig {\n  -webkit-animation-name: fadeOutDownBig;\n  animation-name: fadeOutDownBig;\n}\n\n@-webkit-keyframes fadeOutLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n\n@keyframes fadeOutLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n\n.fadeOutLeft {\n  -webkit-animation-name: fadeOutLeft;\n  animation-name: fadeOutLeft;\n}\n\n@-webkit-keyframes fadeOutLeftBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n\n@keyframes fadeOutLeftBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n\n.fadeOutLeftBig {\n  -webkit-animation-name: fadeOutLeftBig;\n  animation-name: fadeOutLeftBig;\n}\n\n@-webkit-keyframes fadeOutRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n\n@keyframes fadeOutRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n\n.fadeOutRight {\n  -webkit-animation-name: fadeOutRight;\n  animation-name: fadeOutRight;\n}\n\n@-webkit-keyframes fadeOutRightBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n\n@keyframes fadeOutRightBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n\n.fadeOutRightBig {\n  -webkit-animation-name: fadeOutRightBig;\n  animation-name: fadeOutRightBig;\n}\n\n@-webkit-keyframes fadeOutUp {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n\n@keyframes fadeOutUp {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n\n.fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n  animation-name: fadeOutUp;\n}\n\n@-webkit-keyframes fadeOutUpBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n\n@keyframes fadeOutUpBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n\n.fadeOutUpBig {\n  -webkit-animation-name: fadeOutUpBig;\n  animation-name: fadeOutUpBig;\n}\n\n@-webkit-keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) scale3d(.95, .95, .95);\n    transform: perspective(400px) scale3d(.95, .95, .95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n}\n\n@keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) scale3d(.95, .95, .95);\n    transform: perspective(400px) scale3d(.95, .95, .95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n}\n\n.animated.flip {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n  -webkit-animation-name: flip;\n  animation-name: flip;\n}\n\n@-webkit-keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n\n@keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n\n.flipInX {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInX;\n  animation-name: flipInX;\n}\n\n@-webkit-keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n\n@keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n\n.flipInY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInY;\n  animation-name: flipInY;\n}\n\n@-webkit-keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }\n}\n\n.flipOutX {\n  -webkit-animation-name: flipOutX;\n  animation-name: flipOutX;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n}\n\n@-webkit-keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0;\n  }\n}\n\n.flipOutY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipOutY;\n  animation-name: flipOutY;\n}\n\n@-webkit-keyframes lightSpeedIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes lightSpeedIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.lightSpeedIn {\n  -webkit-animation-name: lightSpeedIn;\n  animation-name: lightSpeedIn;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out;\n}\n\n@-webkit-keyframes lightSpeedOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n\n@keyframes lightSpeedOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n\n.lightSpeedOut {\n  -webkit-animation-name: lightSpeedOut;\n  animation-name: lightSpeedOut;\n  -webkit-animation-timing-function: ease-in;\n  animation-timing-function: ease-in;\n}\n\n@-webkit-keyframes rotateIn {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateIn {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateIn {\n  -webkit-animation-name: rotateIn;\n  animation-name: rotateIn;\n}\n\n@-webkit-keyframes rotateInDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateInDownLeft {\n  -webkit-animation-name: rotateInDownLeft;\n  animation-name: rotateInDownLeft;\n}\n\n@-webkit-keyframes rotateInDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateInDownRight {\n  -webkit-animation-name: rotateInDownRight;\n  animation-name: rotateInDownRight;\n}\n\n@-webkit-keyframes rotateInUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateInUpLeft {\n  -webkit-animation-name: rotateInUpLeft;\n  animation-name: rotateInUpLeft;\n}\n\n@-webkit-keyframes rotateInUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateInUpRight {\n  -webkit-animation-name: rotateInUpRight;\n  animation-name: rotateInUpRight;\n}\n\n@-webkit-keyframes rotateOut {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOut {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0;\n  }\n}\n\n.rotateOut {\n  -webkit-animation-name: rotateOut;\n  animation-name: rotateOut;\n}\n\n@-webkit-keyframes rotateOutDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutDownLeft {\n  -webkit-animation-name: rotateOutDownLeft;\n  animation-name: rotateOutDownLeft;\n}\n\n@-webkit-keyframes rotateOutDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutDownRight {\n  -webkit-animation-name: rotateOutDownRight;\n  animation-name: rotateOutDownRight;\n}\n\n@-webkit-keyframes rotateOutUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutUpLeft {\n  -webkit-animation-name: rotateOutUpLeft;\n  animation-name: rotateOutUpLeft;\n}\n\n@-webkit-keyframes rotateOutUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutUpRight {\n  -webkit-animation-name: rotateOutUpRight;\n  animation-name: rotateOutUpRight;\n}\n\n@-webkit-keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0;\n  }\n}\n\n@keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0;\n  }\n}\n\n.hinge {\n  -webkit-animation-name: hinge;\n  animation-name: hinge;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n.rollIn {\n  -webkit-animation-name: rollIn;\n  animation-name: rollIn;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes rollOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n  }\n}\n\n@keyframes rollOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n  }\n}\n\n.rollOut {\n  -webkit-animation-name: rollOut;\n  animation-name: rollOut;\n}\n\n@-webkit-keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  50% {\n    opacity: 1;\n  }\n}\n\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  50% {\n    opacity: 1;\n  }\n}\n\n.zoomIn {\n  -webkit-animation-name: zoomIn;\n  animation-name: zoomIn;\n}\n\n@-webkit-keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomInDown {\n  -webkit-animation-name: zoomInDown;\n  animation-name: zoomInDown;\n}\n\n@-webkit-keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomInLeft {\n  -webkit-animation-name: zoomInLeft;\n  animation-name: zoomInLeft;\n}\n\n@-webkit-keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomInRight {\n  -webkit-animation-name: zoomInRight;\n  animation-name: zoomInRight;\n}\n\n@-webkit-keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomInUp {\n  -webkit-animation-name: zoomInUp;\n  animation-name: zoomInUp;\n}\n\n@-webkit-keyframes zoomOut {\n  from {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes zoomOut {\n  from {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n\n.zoomOut {\n  -webkit-animation-name: zoomOut;\n  animation-name: zoomOut;\n}\n\n@-webkit-keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomOutDown {\n  -webkit-animation-name: zoomOutDown;\n  animation-name: zoomOutDown;\n}\n\n@-webkit-keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(.1) translate3d(-2000px, 0, 0);\n    transform: scale(.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center;\n  }\n}\n\n@keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(.1) translate3d(-2000px, 0, 0);\n    transform: scale(.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center;\n  }\n}\n\n.zoomOutLeft {\n  -webkit-animation-name: zoomOutLeft;\n  animation-name: zoomOutLeft;\n}\n\n@-webkit-keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(.1) translate3d(2000px, 0, 0);\n    transform: scale(.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center;\n  }\n}\n\n@keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(.1) translate3d(2000px, 0, 0);\n    transform: scale(.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center;\n  }\n}\n\n.zoomOutRight {\n  -webkit-animation-name: zoomOutRight;\n  animation-name: zoomOutRight;\n}\n\n@-webkit-keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomOutUp {\n  -webkit-animation-name: zoomOutUp;\n  animation-name: zoomOutUp;\n}\n\n@-webkit-keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n@keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n.slideInDown {\n  -webkit-animation-name: slideInDown;\n  animation-name: slideInDown;\n}\n\n@-webkit-keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n@keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n.slideInLeft {\n  -webkit-animation-name: slideInLeft;\n  animation-name: slideInLeft;\n}\n\n@-webkit-keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n@keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n.slideInRight {\n  -webkit-animation-name: slideInRight;\n  animation-name: slideInRight;\n}\n\n@-webkit-keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n@keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n.slideInUp {\n  -webkit-animation-name: slideInUp;\n  animation-name: slideInUp;\n}\n\n@-webkit-keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n\n@keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n\n.slideOutDown {\n  -webkit-animation-name: slideOutDown;\n  animation-name: slideOutDown;\n}\n\n@-webkit-keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n\n@keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n\n.slideOutLeft {\n  -webkit-animation-name: slideOutLeft;\n  animation-name: slideOutLeft;\n}\n\n@-webkit-keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n\n@keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n\n.slideOutRight {\n  -webkit-animation-name: slideOutRight;\n  animation-name: slideOutRight;\n}\n\n@-webkit-keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n\n@keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n\n.slideOutUp {\n  -webkit-animation-name: slideOutUp;\n  animation-name: slideOutUp;\n}\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);