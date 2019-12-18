import { mergeStyles, Stylesheet, fontFace, keyframes } from '@uifabric/merge-styles';

/**
 * Builds a class names object from a given map.
 *
 * @param styles - Map of unprocessed styles.
 * @returns Map of property name to class name.
 */

function buildClassMap(styles) {
  var classes = {};

  var _loop = function _loop(styleName) {
    if (styles.hasOwnProperty(styleName)) {
      var className;
      Object.defineProperty(classes, styleName, {
        get: function get() {
          if (className === undefined) {
            // tslint:disable-next-line:no-any
            className = mergeStyles(styles[styleName]).toString();
          }

          return className;
        },
        enumerable: true,
        configurable: true
      });
    }
  };

  for (var styleName in styles) {
    _loop(styleName);
  }

  return classes;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var _isSSR = false;
/**
 * Helper to get the document object. Note that in popup window cases, document
 * might be the wrong document, which is why we look at ownerDocument for the
 * truth. Also note that the SSR flag is used to test ssr scenarios even if
 * document is defined (from JSDOM for example.)
 *
 * @public
 */


function getDocument(rootElement) {
  if (_isSSR || typeof document === 'undefined') {
    return undefined;
  } else {
    var el = rootElement;
    return el && el.ownerDocument ? el.ownerDocument : document;
  }
}

var _window; // Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
// hits a memory leak, whereas aliasing it and calling "typeof _window" does not.
// Caching the window value at the file scope lets us minimize the impact.


try {
  _window = window;
} catch (e) {}
/* no-op */

/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11. Note that in popup scenarios the
 * window object won't match the "global" window object, and for these scenarios, you should
 * pass in an element hosted within the popup.
 *
 * @public
 */


function getWindow(rootElement) {
  if (_isSSR || typeof _window === 'undefined') {
    return undefined;
  } else {
    var el = rootElement;
    return el && el.ownerDocument && el.ownerDocument.defaultView ? el.ownerDocument.defaultView : _window;
  }
}

function _typeof$1(obj) {
  if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
    _typeof$1 = function _typeof$1(obj) {
      return _typeof(obj);
    };
  } else {
    _typeof$1 = function _typeof$1(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
    };
  }

  return _typeof$1(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * Simulated enum for keycodes. These will get inlined by uglify when used much like an enum
 *
 * @public
 * {@docCategory KeyCodes}
 */


var KeyCodes = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pauseBreak: 19,
  capslock: 20,
  escape: 27,
  space: 32,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  del: 46,
  zero: 48,
  one: 49,
  two: 50,
  three: 51,
  four: 52,
  five: 53,
  six: 54,
  seven: 55,
  eight: 56,
  nine: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftWindow: 91,
  rightWindow: 92,
  select: 93,
  zero_numpad: 96,
  one_numpad: 97,
  two_numpad: 98,
  three_numpad: 99,
  four_numpad: 100,
  five_numpad: 101,
  six_numpad: 102,
  seven_numpad: 103,
  eight_numpad: 104,
  nine_numpad: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimalPoint: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numlock: 144,
  scrollLock: 145,
  semicolon: 186,
  equalSign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardSlash: 191,
  graveAccent: 192,
  openBracket: 219,
  backSlash: 220,
  closeBracket: 221,
  singleQuote: 222
};
var _memoizedClassNames = 0;
var stylesheet = Stylesheet.getInstance();

if (stylesheet && stylesheet.onReset) {
  stylesheet.onReset(function () {
    return _memoizedClassNames++;
  });
} // Note that because of the caching nature within the classNames memoization,

var _DirectionalKeyCodes;

var DirectionalKeyCodes = (_DirectionalKeyCodes = {}, _defineProperty$1(_DirectionalKeyCodes, KeyCodes.up, 1), _defineProperty$1(_DirectionalKeyCodes, KeyCodes.down, 1), _defineProperty$1(_DirectionalKeyCodes, KeyCodes.left, 1), _defineProperty$1(_DirectionalKeyCodes, KeyCodes.right, 1), _defineProperty$1(_DirectionalKeyCodes, KeyCodes.home, 1), _defineProperty$1(_DirectionalKeyCodes, KeyCodes.end, 1), _defineProperty$1(_DirectionalKeyCodes, KeyCodes.tab, 1), _defineProperty$1(_DirectionalKeyCodes, KeyCodes.pageUp, 1), _defineProperty$1(_DirectionalKeyCodes, KeyCodes.pageDown, 1), _DirectionalKeyCodes);

var IsFocusVisibleClassName = 'ms-Fabric--isFocusVisible';
/**
 * Storing global state in local module variables has issues when more than one copy
 * if the module gets loaded on the page (due to a bundling error or simply by consuming
 * a prebundled script.)
 *
 * This file contains helpers to deal with the getting and setting local state, and allows
 * callers to get called back when it mutates.
 */
// tslint:disable:no-any


var GLOBAL_SETTINGS_PROP_NAME = '__globalSettings__';
var CALLBACK_STATE_PROP_NAME = '__callbacks__';
var _counter = 0;
/**
 * Global settings helper, which stores settings in the global (window) namespace.
 * If window is not provided, it will store settings in module scope. Provides a
 * way to observe changes as well when their values change.
 *
 * @public
 * {@docCategory GlobalSettings}
 */

var GlobalSettings =
/*#__PURE__*/
function () {
  function GlobalSettings() {
    _classCallCheck(this, GlobalSettings);
  }

  _createClass(GlobalSettings, null, [{
    key: "getValue",
    value: function getValue(key, defaultValue) {
      var globalSettings = _getGlobalSettings();

      if (globalSettings[key] === undefined) {
        globalSettings[key] = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      }

      return globalSettings[key];
    }
  }, {
    key: "setValue",
    value: function setValue(key, value) {
      var globalSettings = _getGlobalSettings();

      var callbacks = globalSettings[CALLBACK_STATE_PROP_NAME];
      var oldValue = globalSettings[key];

      if (value !== oldValue) {
        globalSettings[key] = value;
        var changeDescription = {
          oldValue: oldValue,
          value: value,
          key: key
        };

        for (var id in callbacks) {
          if (callbacks.hasOwnProperty(id)) {
            callbacks[id](changeDescription);
          }
        }
      }

      return value;
    }
  }, {
    key: "addChangeListener",
    value: function addChangeListener(cb) {
      // Note: we use generated ids on the callbacks to create a map of the callbacks, which optimizes removal.
      // (It's faster to delete a key than it is to look up the index of an object and splice an array.)
      var id = cb.__id__;

      var callbacks = _getCallbacks();

      if (!id) {
        id = cb.__id__ = String(_counter++);
      }

      callbacks[id] = cb;
    }
  }, {
    key: "removeChangeListener",
    value: function removeChangeListener(cb) {
      var callbacks = _getCallbacks();

      delete callbacks[cb.__id__];
    }
  }]);

  return GlobalSettings;
}();

function _getGlobalSettings() {
  var win = getWindow();
  var globalObj = win || {};

  if (!globalObj[GLOBAL_SETTINGS_PROP_NAME]) {
    globalObj[GLOBAL_SETTINGS_PROP_NAME] = _defineProperty$1({}, CALLBACK_STATE_PROP_NAME, {});
  }

  return globalObj[GLOBAL_SETTINGS_PROP_NAME];
}

function _getCallbacks() {
  var globalSettings = _getGlobalSettings();

  return globalSettings[CALLBACK_STATE_PROP_NAME];
}

var stylesheet$1 = Stylesheet.getInstance();

if (stylesheet$1 && stylesheet$1.onReset) {
  Stylesheet.getInstance().onReset(resetMemoizations);
}

var _resetCounter = 0;
var _emptyObject = {
  empty: true
};
var _dictionary = {};

var _weakMap = typeof WeakMap === 'undefined' ? null : WeakMap;
/**
 * Reset memoizations.
 */


function resetMemoizations() {
  _resetCounter++;
}
/**
 * Memoizes a function; when you pass in the same parameters multiple times, it returns a cached result.
 * Be careful when passing in objects, you need to pass in the same INSTANCE for caching to work. Otherwise
 * it will grow the cache unnecessarily. Also avoid using default values that evaluate functions; passing in
 * undefined for a value and relying on a default function will execute it the first time, but will not
 * re-evaluate subsequent times which may have been unexpected.
 *
 * By default, the cache will reset after 100 permutations, to avoid abuse cases where the function is
 * unintendedly called with unique objects. Without a reset, the cache could grow infinitely, so we safeguard
 * by resetting. To override this behavior, pass a value of 0 to the maxCacheSize parameter.
 *
 * @public
 * @param cb - The function to memoize.
 * @param maxCacheSize - Max results to cache. If the cache exceeds this value, it will reset on the next call.
 * @returns A memoized version of the function.
 */


function memoizeFunction(cb) {
  var maxCacheSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100; // Avoid breaking scenarios which don't have weak map.

  if (!_weakMap) {
    return cb;
  }

  var rootNode;
  var cacheSize = 0;
  var localResetCounter = _resetCounter; // tslint:disable-next-line:no-function-expression

  return function memoizedFunction() {
    var currentNode = rootNode;

    if (rootNode === undefined || localResetCounter !== _resetCounter || maxCacheSize > 0 && cacheSize > maxCacheSize) {
      rootNode = _createNode();
      cacheSize = 0;
      localResetCounter = _resetCounter;
    }

    currentNode = rootNode; // Traverse the tree until we find the match.

    for (var i = 0; i < arguments.length; i++) {
      var arg = _normalizeArg(i < 0 || arguments.length <= i ? undefined : arguments[i]);

      if (!currentNode.map.has(arg)) {
        currentNode.map.set(arg, _createNode());
      }

      currentNode = currentNode.map.get(arg);
    }

    if (!currentNode.hasOwnProperty('value')) {
      // eslint-disable-next-line standard/no-callback-literal
      currentNode.value = cb.apply(void 0, arguments);
      cacheSize++;
    }

    return currentNode.value;
  };
}

function _normalizeArg(val) {
  if (!val) {
    return _emptyObject;
  } else if (_typeof$1(val) === 'object' || typeof val === 'function') {
    return val;
  } else if (!_dictionary[val]) {
    _dictionary[val] = {
      val: val
    };
  }

  return _dictionary[val];
}

function _createNode() {
  return {
    map: _weakMap ? new _weakMap() : null
  };
}
/**
 * Simple deep merge function. Takes all arguments and returns a deep copy of the objects merged
 * together in the order provided. If an object creates a circular reference, it will assign the
 * original reference.
 */


function merge(target) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var arg = _args[_i];

    _merge(target || {}, arg);
  }

  return target;
}
/**
 * The _merge helper iterates through all props on source and assigns them to target.
 * When the value is an object, we will create a deep clone of the object. However if
 * there is a circular reference, the value will not be deep cloned and will persist
 * the reference.
 */
// tslint:disable-next-line:no-any


function _merge(target, source) {
  var circularReferences = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  circularReferences.push(source);

  for (var name in source) {
    if (source.hasOwnProperty(name)) {
      var value = source[name];

      if (_typeof$1(value) === 'object') {
        var isCircularReference = circularReferences.indexOf(value) > -1;
        target[name] = isCircularReference ? value : _merge(target[name] || {}, value, circularReferences);
      } else {
        target[name] = value;
      }
    }
  }

  circularReferences.pop();
  return target;
}
/**
 * Fetches an item from local storage without throwing an exception
 * @param key The key of the item to fetch from local storage
 */


function getItem$1(key) {
  var result = null;

  try {
    var win = getWindow();
    result = win ? win.localStorage.getItem(key) : null;
  } catch (e) {
    /* Eat the exception */
  }

  return result;
}

var _language;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 *
 * @public
 */


function getLanguage() {
  if (_language === undefined) {
    var doc = getDocument();
    var savedLanguage = getItem$1('language');

    if (savedLanguage !== null) {
      _language = savedLanguage;
    }

    if (_language === undefined && doc) {
      _language = doc.documentElement.getAttribute('lang');
    }

    if (_language === undefined) {
      _language = 'en';
    }
  }

  return _language;
}

var CURRENT_ID_PROPERTY = '__currentId__';

var _global = getWindow() || {};

if (_global[CURRENT_ID_PROPERTY] === undefined) {
  _global[CURRENT_ID_PROPERTY] = 0;
}
/**
 * Resets id counter to an (optional) number.
 *
 * @public
 */


function resetIds() {
  var counter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  _global[CURRENT_ID_PROPERTY] = counter;
}


var stylesheet$2 = Stylesheet.getInstance();

if (stylesheet$2 && stylesheet$2.onReset) {
  stylesheet$2.onReset(resetIds);
}
var DisabledScrollClassName = mergeStyles({
  overflow: 'hidden !important'
});

var _warningCallback;
/**
 * Sends a warning to console, if the api is present.
 *
 * @public
 * @param message - Warning message.
 */


function warn(message) {
  if (_warningCallback && "production" !== 'production') {
    _warningCallback(message);
  } else if (console && console.warn) {
    console.warn(message);
  }
}

var RectangleEdge;

(function (RectangleEdge) {
  RectangleEdge[RectangleEdge["top"] = 1] = "top";
  RectangleEdge[RectangleEdge["bottom"] = -1] = "bottom";
  RectangleEdge[RectangleEdge["left"] = 2] = "left";
  RectangleEdge[RectangleEdge["right"] = -2] = "right";
})(RectangleEdge || (RectangleEdge = {}));

var Position;

(function (Position) {
  Position[Position["top"] = 0] = "top";
  Position[Position["bottom"] = 1] = "bottom";
  Position[Position["start"] = 2] = "start";
  Position[Position["end"] = 3] = "end";
})(Position || (Position = {}));

var ICON_SETTING_NAME = 'icons';

var _iconSettings = GlobalSettings.getValue(ICON_SETTING_NAME, {
  __options: {
    disableWarnings: false,
    warnOnMissingIcons: true
  },
  __remapped: {}
}); // Reset icon registration on stylesheet resets.


var stylesheet$3 = Stylesheet.getInstance();

if (stylesheet$3 && stylesheet$3.onReset) {
  stylesheet$3.onReset(function () {
    for (var name in _iconSettings) {
      if (_iconSettings.hasOwnProperty(name) && !!_iconSettings[name].subset) {
        _iconSettings[name].subset.className = undefined;
      }
    }
  });
}
/**
 * Normalizes an icon name for consistent mapping.
 * Current implementation is to convert the icon name to lower case.
 *
 * @param name - Icon name to normalize.
 * @returns {string} Normalized icon name to use for indexing and mapping.
 */


var normalizeIconName = function normalizeIconName(name) {
  return name.toLowerCase();
};
/**
 * Registers a given subset of icons.
 *
 * @param iconSubset - the icon subset definition.
 */


function registerIcons(iconSubset, options) {
  var subset = Object.assign({}, iconSubset, {
    isRegistered: false,
    className: undefined
  });
  var icons = iconSubset.icons; // Grab options, optionally mix user provided ones on top.

  options = options ? Object.assign({}, _iconSettings.__options, {}, options) : _iconSettings.__options;

  for (var iconName in icons) {
    if (icons.hasOwnProperty(iconName)) {
      var code = icons[iconName];
      var normalizedIconName = normalizeIconName(iconName);

      if (_iconSettings[normalizedIconName]) {
        _warnDuplicateIcon(iconName);
      } else {
        _iconSettings[normalizedIconName] = {
          code: code,
          subset: subset
        };
      }
    }
  }
}
/**
 * Unregisters icons by name.
 *
 * @param iconNames - List of icons to unregister.
 */

function unregisterIcons(iconNames) {
  var options = _iconSettings.__options;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var iconName = _step.value;
      var normalizedIconName = normalizeIconName(iconName);

      if (_iconSettings[normalizedIconName]) {
        delete _iconSettings[normalizedIconName];
      } else {
        // Warn that we are trying to delete an icon that doesn't exist
        if (!options.disableWarnings) {
          warn("The icon \"".concat(iconName, "\" tried to unregister but was not registered."));
        }
      } // Delete any aliases for this iconName


      if (_iconSettings.__remapped[normalizedIconName]) {
        delete _iconSettings.__remapped[normalizedIconName];
      } // Delete any items that were an alias for this iconName


      Object.keys(_iconSettings.__remapped).forEach(function (key) {
        if (_iconSettings.__remapped[key] === normalizedIconName) {
          delete _iconSettings.__remapped[key];
        }
      });
    };

    for (var _iterator = iconNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
/**
 * Remaps one icon name to another.
 */

function registerIconAlias(iconName, mappedToName) {
  _iconSettings.__remapped[normalizeIconName(iconName)] = normalizeIconName(mappedToName);
}
/**
 * Gets an icon definition. If an icon is requested but the subset has yet to be registered,
 * it will get registered immediately.
 *
 * @public
 * @param name - Name of icon.
 */

function getIcon(name) {
  var icon;
  var options = _iconSettings.__options;
  name = name ? normalizeIconName(name) : '';
  name = _iconSettings.__remapped[name] || name;

  if (name) {
    icon = _iconSettings[name];

    if (icon) {
      var _icon = icon,
          subset = _icon.subset;

      if (subset && subset.fontFace) {
        if (!subset.isRegistered) {
          fontFace(subset.fontFace);
          subset.isRegistered = true;
        }

        if (!subset.className) {
          subset.className = mergeStyles(subset.style, {
            fontFamily: subset.fontFace.fontFamily,
            fontWeight: subset.fontFace.fontWeight || 'normal',
            fontStyle: subset.fontFace.fontStyle || 'normal'
          });
        }
      }
    } else {
      if (!options.disableWarnings && options.warnOnMissingIcons) {
        warn("The icon \"".concat(name, "\" was used but not registered. See http://aka.ms/fabric-icon-usage for more information."));
      }
    }
  }

  return icon;
}
/**
 * Sets the icon options.
 *
 * @public
 */

function setIconOptions(options) {
  _iconSettings.__options = Object.assign({}, _iconSettings.__options, {}, options);
}
var _missingIcons = [];

var _missingIconsTimer;

function _warnDuplicateIcon(iconName) {
  var options = _iconSettings.__options;
  var warningDelay = 2000;
  var maxIconsInMessage = 10;

  if (!options.disableWarnings) {
    _missingIcons.push(iconName);

    if (_missingIconsTimer === undefined) {
      _missingIconsTimer = setTimeout(function () {
        warn("Some icons were re-registered. Applications should only call registerIcons for any given " + "icon once. Redefining what an icon is may have unintended consequences. Duplicates " + "include: \n" + _missingIcons.slice(0, maxIconsInMessage).join(', ') + (_missingIcons.length > maxIconsInMessage ? " (+ ".concat(_missingIcons.length - maxIconsInMessage, " more)") : ''));
        _missingIconsTimer = undefined;
        _missingIcons = [];
      }, warningDelay);
    }
  }
}

var defaultIconStyles = {
  display: 'inline-block'
};
/**
 * Gets an icon classname. You should be able to add this classname to an I tag with no
 * additional classnames, and render the icon.
 *
 * @public
 */

function getIconClassName(name) {
  var className = '';
  var icon = getIcon(name);

  if (icon) {
    className = mergeStyles(icon.subset.className, defaultIconStyles, {
      selectors: {
        '::before': {
          content: "\"".concat(icon.code, "\"")
        }
      }
    });
  }

  return className;
}

/* Register the keyframes */

var EASING_FUNCTION_1 = 'cubic-bezier(.1,.9,.2,1)';
var EASING_FUNCTION_2 = 'cubic-bezier(.1,.25,.75,.9)';
var DURATION_1 = '0.167s';
var DURATION_2 = '0.267s';
var DURATION_3 = '0.367s';
var DURATION_4 = '0.467s';
var FADE_IN = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});
var FADE_OUT = keyframes({
  from: {
    opacity: 1
  },
  to: {
    opacity: 0,
    visibility: 'hidden'
  }
});

var SLIDE_RIGHT_IN10 = _createSlideInX(-10);

var SLIDE_RIGHT_IN20 = _createSlideInX(-20);

var SLIDE_RIGHT_IN40 = _createSlideInX(-40);

var SLIDE_RIGHT_IN400 = _createSlideInX(-400);

var SLIDE_LEFT_IN10 = _createSlideInX(10);

var SLIDE_LEFT_IN20 = _createSlideInX(20);

var SLIDE_LEFT_IN40 = _createSlideInX(40);

var SLIDE_LEFT_IN400 = _createSlideInX(400);

var SLIDE_UP_IN10 = _createSlideInY(10);

var SLIDE_UP_IN20 = _createSlideInY(20);

var SLIDE_DOWN_IN10 = _createSlideInY(-10);

var SLIDE_DOWN_IN20 = _createSlideInY(-20);

var SLIDE_RIGHT_OUT10 = _createSlideOutX(10);

var SLIDE_RIGHT_OUT20 = _createSlideOutX(20);

var SLIDE_RIGHT_OUT40 = _createSlideOutX(40);

var SLIDE_RIGHT_OUT400 = _createSlideOutX(400);

var SLIDE_LEFT_OUT10 = _createSlideOutX(-10);

var SLIDE_LEFT_OUT20 = _createSlideOutX(-20);

var SLIDE_LEFT_OUT40 = _createSlideOutX(-40);

var SLIDE_LEFT_OUT400 = _createSlideOutX(-400);

var SLIDE_UP_OUT10 = _createSlideOutY(-10);

var SLIDE_UP_OUT20 = _createSlideOutY(-20);

var SLIDE_DOWN_OUT10 = _createSlideOutY(10);

var SLIDE_DOWN_OUT20 = _createSlideOutY(20);

var SCALE_UP100 = keyframes({
  from: {
    transform: 'scale3d(.98,.98,1)'
  },
  to: {
    transform: 'scale3d(1,1,1)'
  }
});
var SCALE_DOWN98 = keyframes({
  from: {
    transform: 'scale3d(1,1,1)'
  },
  to: {
    transform: 'scale3d(.98,.98,1)'
  }
});
var SCALE_DOWN100 = keyframes({
  from: {
    transform: 'scale3d(1.03,1.03,1)'
  },
  to: {
    transform: 'scale3d(1,1,1)'
  }
});
var SCALE_UP103 = keyframes({
  from: {
    transform: 'scale3d(1,1,1)'
  },
  to: {
    transform: 'scale3d(1.03,1.03,1)'
  }
});
var ROTATE90 = keyframes({
  from: {
    transform: 'rotateZ(0deg)'
  },
  to: {
    transform: 'rotateZ(90deg)'
  }
});
var ROTATE_N90 = keyframes({
  from: {
    transform: 'rotateZ(0deg)'
  },
  to: {
    transform: 'rotateZ(-90deg)'
  }
});
/**
 * Exporting raw duraction values and easing functions to be used in custom animations
 */

var AnimationVariables = {
  easeFunction1: EASING_FUNCTION_1,
  easeFunction2: EASING_FUNCTION_2,
  durationValue1: DURATION_1,
  durationValue2: DURATION_2,
  durationValue3: DURATION_3,
  durationValue4: DURATION_4
};
/**
 * All Fabric standard animations, exposed as json objects referencing predefined
 * keyframes. These objects can be mixed in with other class definitions.
 */

var AnimationStyles = {
  slideRightIn10: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_RIGHT_IN10), DURATION_3, EASING_FUNCTION_1),
  slideRightIn20: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_RIGHT_IN20), DURATION_3, EASING_FUNCTION_1),
  slideRightIn40: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_RIGHT_IN40), DURATION_3, EASING_FUNCTION_1),
  slideRightIn400: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_RIGHT_IN400), DURATION_3, EASING_FUNCTION_1),
  slideLeftIn10: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_LEFT_IN10), DURATION_3, EASING_FUNCTION_1),
  slideLeftIn20: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_LEFT_IN20), DURATION_3, EASING_FUNCTION_1),
  slideLeftIn40: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_LEFT_IN40), DURATION_3, EASING_FUNCTION_1),
  slideLeftIn400: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_LEFT_IN400), DURATION_3, EASING_FUNCTION_1),
  slideUpIn10: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_UP_IN10), DURATION_3, EASING_FUNCTION_1),
  slideUpIn20: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_UP_IN20), DURATION_3, EASING_FUNCTION_1),
  slideDownIn10: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_DOWN_IN10), DURATION_3, EASING_FUNCTION_1),
  slideDownIn20: _createAnimation("".concat(FADE_IN, ",").concat(SLIDE_DOWN_IN20), DURATION_3, EASING_FUNCTION_1),
  slideRightOut10: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_RIGHT_OUT10), DURATION_3, EASING_FUNCTION_1),
  slideRightOut20: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_RIGHT_OUT20), DURATION_3, EASING_FUNCTION_1),
  slideRightOut40: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_RIGHT_OUT40), DURATION_3, EASING_FUNCTION_1),
  slideRightOut400: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_RIGHT_OUT400), DURATION_3, EASING_FUNCTION_1),
  slideLeftOut10: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_LEFT_OUT10), DURATION_3, EASING_FUNCTION_1),
  slideLeftOut20: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_LEFT_OUT20), DURATION_3, EASING_FUNCTION_1),
  slideLeftOut40: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_LEFT_OUT40), DURATION_3, EASING_FUNCTION_1),
  slideLeftOut400: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_LEFT_OUT400), DURATION_3, EASING_FUNCTION_1),
  slideUpOut10: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_UP_OUT10), DURATION_3, EASING_FUNCTION_1),
  slideUpOut20: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_UP_OUT20), DURATION_3, EASING_FUNCTION_1),
  slideDownOut10: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_DOWN_OUT10), DURATION_3, EASING_FUNCTION_1),
  slideDownOut20: _createAnimation("".concat(FADE_OUT, ",").concat(SLIDE_DOWN_OUT20), DURATION_3, EASING_FUNCTION_1),
  scaleUpIn100: _createAnimation("".concat(FADE_IN, ",").concat(SCALE_UP100), DURATION_3, EASING_FUNCTION_1),
  scaleDownIn100: _createAnimation("".concat(FADE_IN, ",").concat(SCALE_DOWN100), DURATION_3, EASING_FUNCTION_1),
  scaleUpOut103: _createAnimation("".concat(FADE_OUT, ",").concat(SCALE_UP103), DURATION_1, EASING_FUNCTION_2),
  scaleDownOut98: _createAnimation("".concat(FADE_OUT, ",").concat(SCALE_DOWN98), DURATION_1, EASING_FUNCTION_2),
  fadeIn100: _createAnimation(FADE_IN, DURATION_1, EASING_FUNCTION_2),
  fadeIn200: _createAnimation(FADE_IN, DURATION_2, EASING_FUNCTION_2),
  fadeIn400: _createAnimation(FADE_IN, DURATION_3, EASING_FUNCTION_2),
  fadeIn500: _createAnimation(FADE_IN, DURATION_4, EASING_FUNCTION_2),
  fadeOut100: _createAnimation(FADE_OUT, DURATION_1, EASING_FUNCTION_2),
  fadeOut200: _createAnimation(FADE_OUT, DURATION_2, EASING_FUNCTION_2),
  fadeOut400: _createAnimation(FADE_OUT, DURATION_3, EASING_FUNCTION_2),
  fadeOut500: _createAnimation(FADE_OUT, DURATION_4, EASING_FUNCTION_2),
  rotate90deg: _createAnimation(ROTATE90, '0.1s', EASING_FUNCTION_2),
  rotateN90deg: _createAnimation(ROTATE_N90, '0.1s', EASING_FUNCTION_2)
};

function _createAnimation(animationName, animationDuration, animationTimingFunction) {
  return {
    animationName: animationName,
    animationDuration: animationDuration,
    animationTimingFunction: animationTimingFunction,
    animationFillMode: 'both'
  };
}

function _createSlideInX(fromX) {
  return keyframes({
    from: {
      transform: "translate3d(".concat(fromX, "px,0,0)")
    },
    to: {
      transform: "translate3d(0,0,0)"
    }
  });
}

function _createSlideInY(fromY) {
  return keyframes({
    from: {
      transform: "translate3d(0,".concat(fromY, "px,0)")
    },
    to: {
      transform: "translate3d(0,0,0)"
    }
  });
}

function _createSlideOutX(toX) {
  return keyframes({
    from: {
      transform: "translate3d(0,0,0)"
    },
    to: {
      transform: "translate3d(".concat(toX, "px,0,0)")
    }
  });
}

function _createSlideOutY(toY) {
  return keyframes({
    from: {
      transform: "translate3d(0,0,0)"
    },
    to: {
      transform: "translate3d(0,".concat(toY, "px,0)")
    }
  });
}

// When adding or removing a color, make sure you keep this consistent with IColorClassNames by adding the color variants.
var DefaultPalette = {
  themeDarker: '#004578',
  themeDark: '#005a9e',
  themeDarkAlt: '#106ebe',
  themePrimary: '#0078d4',
  themeSecondary: '#2b88d8',
  themeTertiary: '#71afe5',
  themeLight: '#c7e0f4',
  themeLighter: '#deecf9',
  themeLighterAlt: '#eff6fc',
  black: '#000000',
  blackTranslucent40: 'rgba(0,0,0,.4)',
  neutralDark: '#201f1e',
  neutralPrimary: '#323130',
  neutralPrimaryAlt: '#3b3a39',
  neutralSecondary: '#605e5c',
  neutralSecondaryAlt: '#8a8886',
  neutralTertiary: '#a19f9d',
  neutralTertiaryAlt: '#c8c6c4',
  neutralQuaternary: '#d2d0ce',
  neutralQuaternaryAlt: '#e1dfdd',
  neutralLight: '#edebe9',
  neutralLighter: '#f3f2f1',
  neutralLighterAlt: '#faf9f8',
  accent: '#0078d4',
  white: '#ffffff',
  whiteTranslucent40: 'rgba(255,255,255,.4)',
  yellowDark: '#d29200',
  yellow: '#ffb900',
  yellowLight: '#fff100',
  orange: '#d83b01',
  orangeLight: '#ea4300',
  orangeLighter: '#ff8c00',
  redDark: '#a4262c',
  red: '#e81123',
  magentaDark: '#5c005c',
  magenta: '#b4009e',
  magentaLight: '#e3008c',
  purpleDark: '#32145a',
  purple: '#5c2d91',
  purpleLight: '#b4a0ff',
  blueDark: '#002050',
  blueMid: '#00188f',
  blue: '#0078d4',
  blueLight: '#00bcf2',
  tealDark: '#004b50',
  teal: '#008272',
  tealLight: '#00b294',
  greenDark: '#004b1c',
  green: '#107c10',
  greenLight: '#bad80a'
};

var DefaultEffects = {
  // commented values are the defaults for Fluent
  elevation4: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  elevation8: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)',
  elevation16: '0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132), 0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108)',
  elevation64: '0 25.6px 57.6px 0 rgba(0, 0, 0, 0.22), 0 4.8px 14.4px 0 rgba(0, 0, 0, 0.18)',
  roundedCorner2: '2px'
};

var DefaultSpacing = {
  s2: '4px',
  s1: '8px',
  m: '16px',
  l1: '20px',
  l2: '32px'
};

// Fallback fonts, if specified system or web fonts are unavailable.
var FontFamilyFallbacks = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif"; // Font face names to be registered.

var LocalizedFontNames;

(function (LocalizedFontNames) {
  LocalizedFontNames.Arabic = 'Segoe UI Web (Arabic)';
  LocalizedFontNames.Cyrillic = 'Segoe UI Web (Cyrillic)';
  LocalizedFontNames.EastEuropean = 'Segoe UI Web (East European)';
  LocalizedFontNames.Greek = 'Segoe UI Web (Greek)';
  LocalizedFontNames.Hebrew = 'Segoe UI Web (Hebrew)';
  LocalizedFontNames.Thai = 'Leelawadee UI Web';
  LocalizedFontNames.Vietnamese = 'Segoe UI Web (Vietnamese)';
  LocalizedFontNames.WestEuropean = 'Segoe UI Web (West European)';
  LocalizedFontNames.Selawik = 'Selawik Web';
  LocalizedFontNames.Armenian = 'Segoe UI Web (Armenian)';
  LocalizedFontNames.Georgian = 'Segoe UI Web (Georgian)';
})(LocalizedFontNames || (LocalizedFontNames = {})); // Font families with fallbacks, for the general regions.


var LocalizedFontFamilies;

(function (LocalizedFontFamilies) {
  LocalizedFontFamilies.Arabic = "'".concat(LocalizedFontNames.Arabic, "'");
  LocalizedFontFamilies.ChineseSimplified = "'Microsoft Yahei UI', Verdana, Simsun";
  LocalizedFontFamilies.ChineseTraditional = "'Microsoft Jhenghei UI', Pmingliu";
  LocalizedFontFamilies.Cyrillic = "'".concat(LocalizedFontNames.Cyrillic, "'");
  LocalizedFontFamilies.EastEuropean = "'".concat(LocalizedFontNames.EastEuropean, "'");
  LocalizedFontFamilies.Greek = "'".concat(LocalizedFontNames.Greek, "'");
  LocalizedFontFamilies.Hebrew = "'".concat(LocalizedFontNames.Hebrew, "'");
  LocalizedFontFamilies.Hindi = "'Nirmala UI'";
  LocalizedFontFamilies.Japanese = "'Yu Gothic UI', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka";
  LocalizedFontFamilies.Korean = "'Malgun Gothic', Gulim";
  LocalizedFontFamilies.Selawik = "'".concat(LocalizedFontNames.Selawik, "'");
  LocalizedFontFamilies.Thai = "'Leelawadee UI Web', 'Kmer UI'";
  LocalizedFontFamilies.Vietnamese = "'".concat(LocalizedFontNames.Vietnamese, "'");
  LocalizedFontFamilies.WestEuropean = "'".concat(LocalizedFontNames.WestEuropean, "'");
  LocalizedFontFamilies.Armenian = "'".concat(LocalizedFontNames.Armenian, "'");
  LocalizedFontFamilies.Georgian = "'".concat(LocalizedFontNames.Georgian, "'");
})(LocalizedFontFamilies || (LocalizedFontFamilies = {})); // By default, we favor system fonts for the default.
// All localized fonts use a web font and never use the system font.


var defaultFontFamily = "'Segoe UI', '".concat(LocalizedFontNames.WestEuropean, "'"); // Mapping of language prefix to to font family.

var LanguageToFontMap = {
  ar: LocalizedFontFamilies.Arabic,
  bg: LocalizedFontFamilies.Cyrillic,
  cs: LocalizedFontFamilies.EastEuropean,
  el: LocalizedFontFamilies.Greek,
  et: LocalizedFontFamilies.EastEuropean,
  he: LocalizedFontFamilies.Hebrew,
  hi: LocalizedFontFamilies.Hindi,
  hr: LocalizedFontFamilies.EastEuropean,
  hu: LocalizedFontFamilies.EastEuropean,
  ja: LocalizedFontFamilies.Japanese,
  kk: LocalizedFontFamilies.EastEuropean,
  ko: LocalizedFontFamilies.Korean,
  lt: LocalizedFontFamilies.EastEuropean,
  lv: LocalizedFontFamilies.EastEuropean,
  pl: LocalizedFontFamilies.EastEuropean,
  ru: LocalizedFontFamilies.Cyrillic,
  sk: LocalizedFontFamilies.EastEuropean,
  'sr-latn': LocalizedFontFamilies.EastEuropean,
  th: LocalizedFontFamilies.Thai,
  tr: LocalizedFontFamilies.EastEuropean,
  uk: LocalizedFontFamilies.Cyrillic,
  vi: LocalizedFontFamilies.Vietnamese,
  'zh-hans': LocalizedFontFamilies.ChineseSimplified,
  'zh-hant': LocalizedFontFamilies.ChineseTraditional,
  hy: LocalizedFontFamilies.Armenian,
  ka: LocalizedFontFamilies.Georgian
}; // Standard font sizes.

var FontSizes;

(function (FontSizes) {
  FontSizes.mini = '10px';
  FontSizes.xSmall = '10px';
  FontSizes.small = '12px';
  FontSizes.smallPlus = '12px';
  FontSizes.medium = '14px';
  FontSizes.mediumPlus = '16px';
  FontSizes.icon = '16px';
  FontSizes.large = '18px';
  FontSizes.xLarge = '20px';
  FontSizes.xLargePlus = '24px';
  FontSizes.xxLarge = '28px';
  FontSizes.xxLargePlus = '32px';
  FontSizes.superLarge = '42px';
  FontSizes.mega = '68px';
})(FontSizes || (FontSizes = {})); // Standard font weights.


var FontWeights;

(function (FontWeights) {
  FontWeights.light = 100;
  FontWeights.semilight = 300;
  FontWeights.regular = 400;
  FontWeights.semibold = 600;
  FontWeights.bold = 700;
})(FontWeights || (FontWeights = {})); // Standard Icon Sizes.


var IconFontSizes;

(function (IconFontSizes) {
  IconFontSizes.xSmall = '10px';
  IconFontSizes.small = '12px';
  IconFontSizes.medium = '16px';
  IconFontSizes.large = '20px';
})(IconFontSizes || (IconFontSizes = {}));

function _fontFamilyWithFallbacks(fontFamily) {
  return "".concat(fontFamily, ", ").concat(FontFamilyFallbacks);
}

function createFontStyles(localeCode) {
  var localizedFont = _getLocalizedFontFamily(localeCode);

  var fontFamilyWithFallback = _fontFamilyWithFallbacks(localizedFont);

  var fontStyles = {
    tiny: _createFont(FontSizes.mini, FontWeights.regular, fontFamilyWithFallback),
    xSmall: _createFont(FontSizes.xSmall, FontWeights.regular, fontFamilyWithFallback),
    small: _createFont(FontSizes.small, FontWeights.regular, fontFamilyWithFallback),
    smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular, fontFamilyWithFallback),
    medium: _createFont(FontSizes.medium, FontWeights.regular, fontFamilyWithFallback),
    mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular, fontFamilyWithFallback),
    large: _createFont(FontSizes.large, FontWeights.regular, fontFamilyWithFallback),
    xLarge: _createFont(FontSizes.xLarge, FontWeights.semibold, fontFamilyWithFallback),
    xLargePlus: _createFont(FontSizes.xLargePlus, FontWeights.semibold, fontFamilyWithFallback),
    xxLarge: _createFont(FontSizes.xxLarge, FontWeights.semibold, fontFamilyWithFallback),
    xxLargePlus: _createFont(FontSizes.xxLargePlus, FontWeights.semibold, fontFamilyWithFallback),
    superLarge: _createFont(FontSizes.superLarge, FontWeights.semibold, fontFamilyWithFallback),
    mega: _createFont(FontSizes.mega, FontWeights.semibold, fontFamilyWithFallback)
  };
  return fontStyles;
}
/**
 * If there is a localized font for this language, return that. Returns undefined if there is no localized font for that language.
 */

function _getLocalizedFontFamily(language) {
  for (var lang in LanguageToFontMap) {
    if (LanguageToFontMap.hasOwnProperty(lang) && language && lang.indexOf(language) === 0) {
      // tslint:disable-next-line:no-any
      return LanguageToFontMap[lang];
    }
  }

  return defaultFontFamily;
}

function _createFont(size, weight, fontFamily) {
  return {
    fontFamily: fontFamily,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    fontSize: size,
    fontWeight: weight
  };
}

var DefaultBaseUrl = 'https://static2.sharepointonline.com/files/fabric/assets'; // Standard font styling.

var DefaultFontStyles = createFontStyles(getLanguage());

function _registerFontFace(fontFamily, url, fontWeight, localFontName) {
  fontFamily = "'".concat(fontFamily, "'");
  var localFontSrc = localFontName !== undefined ? "local('".concat(localFontName, "'),") : '';
  fontFace({
    fontFamily: fontFamily,
    src: localFontSrc + "url('".concat(url, ".woff2') format('woff2'),") + "url('".concat(url, ".woff') format('woff')"),
    fontWeight: fontWeight,
    fontStyle: 'normal',
    fontDisplay: 'swap'
  });
}

function _registerFontFaceSet(baseUrl, fontFamily, cdnFolder) {
  var cdnFontName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'segoeui';
  var localFontName = arguments.length > 4 ? arguments[4] : undefined;
  var urlBase = "".concat(baseUrl, "/").concat(cdnFolder, "/").concat(cdnFontName);

  _registerFontFace(fontFamily, urlBase + '-light', FontWeights.light, localFontName && localFontName + ' Light');

  _registerFontFace(fontFamily, urlBase + '-semilight', FontWeights.semilight, localFontName && localFontName + ' SemiLight');

  _registerFontFace(fontFamily, urlBase + '-regular', FontWeights.regular, localFontName);

  _registerFontFace(fontFamily, urlBase + '-semibold', FontWeights.semibold, localFontName && localFontName + ' SemiBold');
}

function registerDefaultFontFaces(baseUrl) {
  if (baseUrl) {
    var fontUrl = "".concat(baseUrl, "/fonts"); // Produce @font-face definitions for all supported web fonts.

    _registerFontFaceSet(fontUrl, LocalizedFontNames.Thai, 'leelawadeeui-thai', 'leelawadeeui');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.Arabic, 'segoeui-arabic');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.Cyrillic, 'segoeui-cyrillic');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.EastEuropean, 'segoeui-easteuropean');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.Greek, 'segoeui-greek');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.Hebrew, 'segoeui-hebrew');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.Vietnamese, 'segoeui-vietnamese');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.WestEuropean, 'segoeui-westeuropean', 'segoeui', 'Segoe UI');

    _registerFontFaceSet(fontUrl, LocalizedFontFamilies.Selawik, 'selawik', 'selawik');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.Armenian, 'segoeui-armenian');

    _registerFontFaceSet(fontUrl, LocalizedFontNames.Georgian, 'segoeui-georgian'); // Leelawadee UI (Thai) does not have a 'light' weight, so we override
    // the font-face generated above to use the 'semilight' weight instead.


    _registerFontFace('Leelawadee UI Web', "".concat(fontUrl, "/leelawadeeui-thai/leelawadeeui-semilight"), FontWeights.light); // Leelawadee UI (Thai) does not have a 'semibold' weight, so we override
    // the font-face generated above to use the 'bold' weight instead.


    _registerFontFace('Leelawadee UI Web', "".concat(fontUrl, "/leelawadeeui-thai/leelawadeeui-bold"), FontWeights.semibold);
  }
}
/**
 * Reads the fontBaseUrl from window.FabricConfig.fontBaseUrl or falls back to a default.
 */

function _getFontBaseUrl() {
  var win = getWindow(); // tslint:disable-next-line:no-string-literal no-any

  var fabricConfig = win ? win['FabricConfig'] : undefined;
  return fabricConfig && fabricConfig.fontBaseUrl !== undefined ? fabricConfig.fontBaseUrl : DefaultBaseUrl;
}
/**
 * Register the font faces.
 */


registerDefaultFontFaces(_getFontBaseUrl());

var HighContrastSelector = '@media screen and (-ms-high-contrast: active)';
var HighContrastSelectorWhite = '@media screen and (-ms-high-contrast: black-on-white)';
var HighContrastSelectorBlack = '@media screen and (-ms-high-contrast: white-on-black)';
var ScreenWidthMinSmall = 320;
var ScreenWidthMinMedium = 480;
var ScreenWidthMinLarge = 640;
var ScreenWidthMinXLarge = 1024;
var ScreenWidthMinXXLarge = 1366;
var ScreenWidthMinXXXLarge = 1920;
var ScreenWidthMaxSmall = ScreenWidthMinMedium - 1;
var ScreenWidthMaxMedium = ScreenWidthMinLarge - 1;
var ScreenWidthMaxLarge = ScreenWidthMinXLarge - 1;
var ScreenWidthMaxXLarge = ScreenWidthMinXXLarge - 1;
var ScreenWidthMaxXXLarge = ScreenWidthMinXXXLarge - 1;
var ScreenWidthMinUhfMobile = 768;
function getScreenSelector(min, max) {
  return "@media only screen and (min-width: ".concat(min, "px) and (max-width: ").concat(max, "px)");
}

var ZIndexes;

(function (ZIndexes) {
  ZIndexes.Nav = 1;
  /**
   * @deprecated ScrollablePane
   */

  ZIndexes.ScrollablePane = 1;
  ZIndexes.FocusStyle = 1;
  ZIndexes.Coachmark = 1000;
  ZIndexes.Layer = 1000000;
  ZIndexes.KeytipLayer = 1000001;
})(ZIndexes || (ZIndexes = {}));

function getFocusStyle(theme, insetOrOptions, position, highContrastStyle, borderColor, outlineColor, isFocusedOnly) {
  if (typeof insetOrOptions === 'number' || !insetOrOptions) {
    return _getFocusStyleInternal(theme, {
      inset: insetOrOptions,
      position: position,
      highContrastStyle: highContrastStyle,
      borderColor: borderColor,
      outlineColor: outlineColor,
      isFocusedOnly: isFocusedOnly
    });
  } else {
    return _getFocusStyleInternal(theme, insetOrOptions);
  }
}

function _getFocusStyleInternal(theme) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$inset = options.inset,
      inset = _options$inset === void 0 ? 0 : _options$inset,
      _options$width = options.width,
      width = _options$width === void 0 ? 1 : _options$width,
      _options$position = options.position,
      position = _options$position === void 0 ? 'relative' : _options$position,
      highContrastStyle = options.highContrastStyle,
      _options$borderColor = options.borderColor,
      borderColor = _options$borderColor === void 0 ? theme.palette.white : _options$borderColor,
      _options$outlineColor = options.outlineColor,
      outlineColor = _options$outlineColor === void 0 ? theme.palette.neutralSecondary : _options$outlineColor,
      _options$isFocusedOnl = options.isFocusedOnly,
      isFocusedOnly = _options$isFocusedOnl === void 0 ? true : _options$isFocusedOnl;
  return {
    // Clear browser-specific focus styles and use 'transparent' as placeholder for focus style.
    outline: 'transparent',
    // Requirement because pseudo-element is absolutely positioned.
    position: position,
    selectors: _defineProperty({
      // Clear the focus border in Firefox.
      // Reference: http://stackoverflow.com/a/199319/1436671
      '::-moz-focus-inner': {
        border: '0'
      }
    }, ".".concat(IsFocusVisibleClassName, " &").concat(isFocusedOnly ? ':focus' : '', ":after"), {
      content: '""',
      position: 'absolute',
      left: inset + 1,
      top: inset + 1,
      bottom: inset + 1,
      right: inset + 1,
      border: "".concat(width, "px solid ").concat(borderColor),
      outline: "".concat(width, "px solid ").concat(outlineColor),
      zIndex: ZIndexes.FocusStyle,
      selectors: _defineProperty({}, HighContrastSelector, highContrastStyle)
    })
  };
}
/**
 * Generates style to clear browser specific focus styles.
 */


function focusClear() {
  return {
    selectors: {
      '&::-moz-focus-inner': {
        // Clear the focus border in Firefox. Reference: http://stackoverflow.com/a/199319/1436671
        border: 0
      },
      '&': {
        // Clear browser specific focus styles and use transparent as placeholder for focus style
        outline: 'transparent'
      }
    }
  };
}
/**
 * Generates a style which can be used to set a border on focus.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border (default 0)
 * @param width - The border width in pixels (default 1)
 * @param color - Color of the outline (default `theme.palette.neutralSecondary`)
 * @returns The style object.
 */

function getFocusOutlineStyle(theme) {
  var inset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var color = arguments.length > 3 ? arguments[3] : undefined;
  return {
    selectors: _defineProperty({}, ":global(".concat(IsFocusVisibleClassName, ") &:focus"), {
      outline: "".concat(width, " solid ").concat(color || theme.palette.neutralSecondary),
      outlineOffset: "".concat(-inset, "px")
    })
  };
}

var hiddenContentStyle = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: 'hidden'
};

var DEFAULT_DURATION = '14s';
var DEFAULT_DELAY = '2s';
var DEFAULT_ITERATION_COUNT = '1';

function _continuousPulseStepOne(beaconColorOne, innerDimension) {
  return {
    borderColor: beaconColorOne,
    borderWidth: '0px',
    width: innerDimension,
    height: innerDimension
  };
}

function _continuousPulseStepTwo(borderWidth) {
  return {
    opacity: 1,
    borderWidth: borderWidth
  };
}

function _continuousPulseStepThree() {
  return {
    opacity: 1
  };
}

function _continuousPulseStepFour(beaconColorTwo, outerDimension) {
  return {
    borderWidth: '0',
    width: outerDimension,
    height: outerDimension,
    opacity: 0,
    borderColor: beaconColorTwo
  };
}

function _continuousPulseStepFive(beaconColorOne, innerDimension) {
  return Object.assign({}, _continuousPulseStepOne(beaconColorOne, innerDimension), {}, {
    opacity: 0
  });
}

function _continuousPulseAnimationDouble(beaconColorOne, beaconColorTwo, innerDimension, outerDimension, borderWidth) {
  return keyframes({
    '0%': _continuousPulseStepOne(beaconColorOne, innerDimension),
    '1.42%': _continuousPulseStepTwo(borderWidth),
    '3.57%': _continuousPulseStepThree(),
    '7.14%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
    '8%': _continuousPulseStepFive(beaconColorOne, innerDimension),
    '29.99%': _continuousPulseStepFive(beaconColorOne, innerDimension),
    '30%': _continuousPulseStepOne(beaconColorOne, innerDimension),
    '31.42%': _continuousPulseStepTwo(borderWidth),
    '33.57%': _continuousPulseStepThree(),
    '37.14%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
    '38%': _continuousPulseStepFive(beaconColorOne, innerDimension),
    '79.42%': _continuousPulseStepFive(beaconColorOne, innerDimension),
    '79.43': _continuousPulseStepOne(beaconColorOne, innerDimension),
    '81.85': _continuousPulseStepTwo(borderWidth),
    '83.42': _continuousPulseStepThree(),
    '87%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
    '100%': {}
  });
}

function _continuousPulseAnimationSingle(beaconColorOne, beaconColorTwo, innerDimension, outerDimension, borderWidth) {
  return keyframes({
    '0%': _continuousPulseStepOne(beaconColorOne, innerDimension),
    '14.2%': _continuousPulseStepTwo(borderWidth),
    '35.7%': _continuousPulseStepThree(),
    '71.4%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
    '100%': {}
  });
}

function _createDefaultAnimation(animationName, delayLength) {
  return {
    animationName: animationName,
    animationIterationCount: DEFAULT_ITERATION_COUNT,
    animationDuration: DEFAULT_DURATION,
    animationDelay: delayLength || DEFAULT_DELAY
  };
}

var PulsingBeaconAnimationStyles = {
  continuousPulseAnimationDouble: _continuousPulseAnimationDouble,
  continuousPulseAnimationSingle: _continuousPulseAnimationSingle,
  createDefaultAnimation: _createDefaultAnimation
};

/**
 * Internal memoized function which simply takes in the class map and the
 * disable boolean. These immutable values can be memoized.
 */

var _getGlobalClassNames = memoizeFunction(function (classNames, disableGlobalClassNames) {
  var styleSheet = Stylesheet.getInstance();

  if (disableGlobalClassNames) {
    // disable global classnames
    return Object.keys(classNames).reduce(function (acc, className) {
      acc[className] = styleSheet.getClassName(classNames[className]);
      return acc;
    }, {});
  } // use global classnames


  return classNames;
});
/**
 * Checks for the `disableGlobalClassNames` property on the `theme` to determine if it should return `classNames`
 * Note that calls to this function are memoized.
 *
 * @param classNames - The collection of global class names that apply when the flag is false. Make sure to pass in
 * the same instance on each call to benefit from memoization.
 * @param theme - The theme to check the flag on
 * @param disableGlobalClassNames - Optional. Explicitly opt in/out of disabling global classnames. Defaults to false.
 */


function getGlobalClassNames(classNames, theme, disableGlobalClassNames) {
  return _getGlobalClassNames(classNames, disableGlobalClassNames !== undefined ? disableGlobalClassNames : theme.disableGlobalClassNames);
}

var _theme = createTheme({
  palette: DefaultPalette,
  effects: DefaultEffects,
  fonts: DefaultFontStyles,
  semanticColors: _makeSemanticColorsFromPalette(DefaultPalette, false, false),
  isInverted: false,
  disableGlobalClassNames: false
});
/**
 * Gets the theme object
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */

function getTheme() {
  var depComments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (depComments === true) {
    _theme = createTheme({}, depComments);
  }

  return _theme;
}
function loadTheme(theme) {
  var depComments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  _theme = createTheme(theme, depComments);
  return _theme;
}

function createTheme(theme) {
  var depComments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var newPalette = Object.assign({}, DefaultPalette, {}, theme.palette);

  if (!theme.palette || !theme.palette.accent) {
    newPalette.accent = newPalette.themePrimary;
  } // mix in custom overrides with good slots first, since custom overrides might be used in fixing deprecated slots


  var newSemanticColors = Object.assign({}, _makeSemanticColorsFromPalette(newPalette, !!theme.isInverted, depComments), {}, theme.semanticColors);
  var defaultFontStyles = Object.assign({}, DefaultFontStyles);

  if (theme.defaultFontStyle) {
    for (var _i3 = 0, _Object$keys3 = Object.keys(defaultFontStyles); _i3 < _Object$keys3.length; _i3++) {
      var fontStyle = _Object$keys3[_i3];
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.defaultFontStyle);
    }
  }

  if (theme.fonts) {
    for (var _i4 = 0, _Object$keys4 = Object.keys(theme.fonts); _i4 < _Object$keys4.length; _i4++) {
      var _fontStyle = _Object$keys4[_i4];
      defaultFontStyles[_fontStyle] = merge({}, defaultFontStyles[_fontStyle], theme.fonts[_fontStyle]);
    }
  }

  return {
    palette: newPalette,
    fonts: Object.assign({}, defaultFontStyles),
    semanticColors: newSemanticColors,
    isInverted: !!theme.isInverted,
    disableGlobalClassNames: !!theme.disableGlobalClassNames,
    spacing: Object.assign({}, DefaultSpacing, {}, theme.spacing),
    effects: Object.assign({}, DefaultEffects, {}, theme.effects)
  };
} // Generates all the semantic slot colors based on the Fabric palette.
// We'll use these as fallbacks for semantic slots that the passed in theme did not define.

function _makeSemanticColorsFromPalette(p, isInverted, depComments) {
  var toReturn = {
    // DEFAULTS
    bodyBackground: p.white,
    bodyBackgroundHovered: p.neutralLighter,
    bodyBackgroundChecked: p.neutralLight,
    bodyStandoutBackground: p.neutralLighterAlt,
    bodyFrameBackground: p.white,
    bodyFrameDivider: p.neutralLight,
    bodyText: p.neutralPrimary,
    bodyTextChecked: p.black,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralLight,
    disabledBodyText: p.neutralTertiary,
    disabledBodySubtext: p.neutralTertiaryAlt,
    disabledBorder: p.neutralTertiaryAlt,
    focusBorder: p.neutralSecondary,
    variantBorder: p.neutralLight,
    variantBorderHovered: p.neutralTertiary,
    defaultStateBackground: p.neutralLighterAlt,
    // LINKS
    actionLink: p.neutralPrimary,
    actionLinkHovered: p.neutralDark,
    link: p.themePrimary,
    linkHovered: p.themeDarker,
    // BUTTONS
    buttonBackground: p.white,
    buttonBackgroundChecked: p.neutralTertiaryAlt,
    buttonBackgroundHovered: p.neutralLighter,
    buttonBackgroundCheckedHovered: p.neutralLight,
    buttonBackgroundPressed: p.neutralLight,
    buttonBackgroundDisabled: p.neutralLighter,
    buttonBorder: p.neutralSecondaryAlt,
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.neutralDark,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.black,
    buttonTextPressed: p.neutralDark,
    buttonTextDisabled: p.neutralTertiary,
    buttonBorderDisabled: p.neutralLighter,
    primaryButtonBackground: p.themePrimary,
    primaryButtonBackgroundHovered: p.themeDarkAlt,
    primaryButtonBackgroundPressed: p.themeDark,
    primaryButtonBackgroundDisabled: p.neutralLighter,
    primaryButtonBorder: 'transparent',
    primaryButtonText: p.white,
    primaryButtonTextHovered: p.white,
    primaryButtonTextPressed: p.white,
    primaryButtonTextDisabled: p.neutralQuaternary,
    accentButtonBackground: p.accent,
    accentButtonText: p.white,
    // INPUTS
    inputBorder: p.neutralSecondaryAlt,
    inputBorderHovered: p.neutralPrimary,
    inputBackground: p.white,
    inputBackgroundChecked: p.themePrimary,
    inputBackgroundCheckedHovered: p.themeDark,
    inputPlaceholderBackgroundChecked: p.themeLighter,
    inputForegroundChecked: p.white,
    inputIcon: p.themePrimary,
    inputIconHovered: p.themeDark,
    inputIconDisabled: p.neutralTertiary,
    inputFocusBorderAlt: p.themePrimary,
    smallInputBorder: p.neutralSecondary,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,
    disabledBackground: p.neutralLighter,
    disabledText: p.neutralTertiary,
    disabledSubtext: p.neutralQuaternary,
    // LISTS
    listBackground: p.white,
    listText: p.neutralPrimary,
    listItemBackgroundHovered: p.neutralLighter,
    listItemBackgroundChecked: p.neutralLight,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt,
    listHeaderBackgroundHovered: p.neutralLighter,
    listHeaderBackgroundPressed: p.neutralLight,
    // MENUS
    menuBackground: p.white,
    menuDivider: p.neutralTertiaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePrimary,
    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundPressed: p.neutralLight,
    menuItemText: p.neutralPrimary,
    menuItemTextHovered: p.neutralDark,
    errorText: !isInverted ? p.redDark : '#ff5f5f',
    warningText: !isInverted ? '#333333' : '#ffffff',
    successText: !isInverted ? '#107C10' : '#92c353',
    errorBackground: !isInverted ? 'rgba(245, 135, 145, .2)' : 'rgba(232, 17, 35, .5)',
    blockingBackground: !isInverted ? 'rgba(250, 65, 0, .2)' : 'rgba(234, 67, 0, .5)',
    warningBackground: !isInverted ? 'rgba(255, 200, 10, .2)' : 'rgba(255, 251, 0, .6)',
    warningHighlight: !isInverted ? '#ffb900' : '#fff100',
    successBackground: !isInverted ? 'rgba(95, 210, 85, .2)' : 'rgba(186, 216, 10, .4)',
    // Deprecated slots, second pass by _fixDeprecatedSlots() later for self-referential slots
    listTextColor: '',
    menuItemBackgroundChecked: p.neutralLight
  };
  return _fixDeprecatedSlots(toReturn, depComments);
}

function _fixDeprecatedSlots(s, depComments) {
  // Add @deprecated tag as comment if enabled
  var dep = '';

  if (depComments === true) {
    dep = ' /* @deprecated */';
  }

  s.listTextColor = s.listText + dep;
  s.menuItemBackgroundChecked += dep;
  return s;
}

// This file mimics styles and mixins from _General.Mixins.scss
var normalize = {
  boxShadow: 'none',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box'
};
var noWrap = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

var DEFAULT_HEIGHT = '50%';
var DEFAULT_WIDTH = 20;
/**
 * - Generates a style used to fade out an overflowing content by defining a style for an :after pseudo element.
 * - Apply it to the :after selector for all combination of states the parent of content might have (normal, hover, selected, focus).
 * - Requires the target to have position set to relative and overflow set to hidden.
 *
 * @example
 * ```tsx
 * // Assuming the following DOM structure and the different background colors coming from the parent holding the content.
 * <div className={classNames.parent}>
 *   <span className={classNames.content}>Overflown Content</span>
 * </div>
 * ```
 * ```ts
 * // This is how the style set would look in Component.styles.ts
 * const { bodyBackground } = theme.semanticColors;
 * const { neutralLighter } = theme.palette;
 *
 * // The second argument of getFadedOverflowStyle function is a string representing a key of ISemanticColors or IPalette.
 *
 * const styles = {
 *   parent: [
 *     backgroundColor: bodyBackground,
 *     selectors: {
 *       '&:hover: {
 *         backgroundColor: neutralLighter
 *       },
 *       '$content:after': {
 *         ...getFadedOverflowStyle(theme, 'bodyBackground')
 *       },
 *       '&:hover $content:after': {
 *         ...getFadedOverflowStyle(theme, 'neutralLighter')
 *       }
 *     }
 *   ],
 *   content: [
 *     width: '100%',
 *     display: 'inline-block',
 *     position: 'relative',
 *     overflow: 'hidden'
 *   ]
 * }
 * ```
 * @param theme - The theme object to use.
 * @param color - The background color to fade out to. Accepts only keys of ISemanticColors or IPalette. Defaults to 'bodyBackground'.
 * @param direction - The direction of the overflow. Defaults to horizontal.
 * @param width - The width of the fading overflow. Vertical direction defaults it to 100% vs 20px when horizontal.
 * @param height - The Height of the fading overflow. Vertical direction defaults it to 50% vs 100% when horizontal.
 * @returns The style object.
 */

function getFadedOverflowStyle(theme) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bodyBackground';
  var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'horizontal';
  var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getDefaultValue('width', direction);
  var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : getDefaultValue('height', direction);
  // Get the color value string from the theme semanticColors or palette.
  var colorValue = theme.semanticColors[color] || theme.palette[color]; // Get the red, green, blue values of the colorValue.

  var rgbColor = color2rgb(colorValue); // Apply opacity 0 to serve as a start color of the gradient.

  var rgba = "rgba(".concat(rgbColor.r, ", ").concat(rgbColor.g, ", ").concat(rgbColor.b, ", 0)"); // Get the direction of the gradient.

  var gradientDirection = direction === 'vertical' ? 'to bottom' : 'to right'; // mergeStyles take care of RTL direction.

  return {
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    pointerEvents: 'none',
    backgroundImage: "linear-gradient(".concat(gradientDirection, ", ").concat(rgba, " 0%, ").concat(colorValue, " 100%)")
  };
} // TODO consider moving this to a separate module along with some more color functions from OUFR/utilities.

/**
 * Helper function to convert a string hex color to an RGB object.
 *
 * @param colorValue - Color to be converted from hex to rgba.
 */

function color2rgb(colorValue) {
  if (colorValue[0] === '#') {
    // If it's a hex code
    return {
      r: parseInt(colorValue.slice(1, 3), 16),
      g: parseInt(colorValue.slice(3, 5), 16),
      b: parseInt(colorValue.slice(5, 7), 16)
    };
  } else if (colorValue.indexOf('rgba(') === 0) {
    // If it's an rgba color string
    colorValue = colorValue.match(/rgba\(([^)]+)\)/)[1];
    var parts = colorValue.split(/ *, */).map(Number);
    return {
      r: parts[0],
      g: parts[1],
      b: parts[2]
    };
  } // The only remaining possibility is transparent.


  return {
    r: 255,
    g: 255,
    b: 255
  };
}
/**
 * Helper function to get the default values for parameters of main function.
 *
 * @param style - Which style to get the default value for.
 * @param direction - What direction to take into consideration.
 */


function getDefaultValue(style, direction) {
  if (style === 'width') {
    return direction === 'horizontal' ? DEFAULT_WIDTH : '100%';
  } else {
    return direction === 'vertical' ? DEFAULT_HEIGHT : '100%';
  }
}

/**
 * Generates placeholder style for each of the browsers supported by office-ui-fabric-react.
 * @param styles - The style to use.
 * @returns The placeholder style object for each browser depending on the placeholder directive it uses.
 */
function getPlaceholderStyles(styles) {
  return {
    selectors: {
      '::placeholder': styles,
      ':-ms-input-placeholder': styles,
      '::-ms-input-placeholder': styles
    }
  };
}

/**
 * {@docCategory AnimationClassNames}
 */

var AnimationClassNames = buildClassMap(AnimationStyles);

/**
 * {@docCategory FontClassNames}
 */

var FontClassNames = buildClassMap(DefaultFontStyles);

var ColorClassNames = {};

for (var colorName in DefaultPalette) {
  if (DefaultPalette.hasOwnProperty(colorName)) {
    // Foreground color
    _defineGetter(ColorClassNames, colorName, '', false, 'color'); // Hover color


    _defineGetter(ColorClassNames, colorName, 'Hover', true, 'color'); // Background color


    _defineGetter(ColorClassNames, colorName, 'Background', false, 'background'); // Background hover


    _defineGetter(ColorClassNames, colorName, 'BackgroundHover', true, 'background'); // Border color


    _defineGetter(ColorClassNames, colorName, 'Border', false, 'borderColor'); // Border hover color


    _defineGetter(ColorClassNames, colorName, 'BorderHover', true, 'borderColor');
  }
}
/**
 * Defines a getter for the given class configuration.
 */


function _defineGetter(obj, colorName, suffix, isHover, cssProperty) {
  Object.defineProperty(obj, colorName + suffix, {
    get: function get() {
      // tslint:disable-next-line:no-any
      var style = _defineProperty({}, cssProperty, getTheme().palette[colorName]);

      return mergeStyles(isHover ? {
        selectors: {
          ':hover': style
        }
      } : style).toString();
    },
    enumerable: true,
    configurable: true
  });
}

export { AnimationClassNames, AnimationStyles, AnimationVariables, ColorClassNames, DefaultEffects, DefaultFontStyles, DefaultPalette, DefaultSpacing, FontClassNames, FontSizes, FontWeights, HighContrastSelector, HighContrastSelectorBlack, HighContrastSelectorWhite, IconFontSizes, PulsingBeaconAnimationStyles, ScreenWidthMaxLarge, ScreenWidthMaxMedium, ScreenWidthMaxSmall, ScreenWidthMaxXLarge, ScreenWidthMaxXXLarge, ScreenWidthMinLarge, ScreenWidthMinMedium, ScreenWidthMinSmall, ScreenWidthMinUhfMobile, ScreenWidthMinXLarge, ScreenWidthMinXXLarge, ScreenWidthMinXXXLarge, ZIndexes, buildClassMap, createFontStyles, createTheme, focusClear, getFadedOverflowStyle, getFocusOutlineStyle, getFocusStyle, getGlobalClassNames, getIcon, getIconClassName, getPlaceholderStyles, getScreenSelector, getTheme, hiddenContentStyle, loadTheme, noWrap, normalize, registerDefaultFontFaces, registerIconAlias, registerIcons, setIconOptions, unregisterIcons };
