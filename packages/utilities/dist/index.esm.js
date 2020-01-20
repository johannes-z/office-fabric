import { setRTL as setRTL$1, Stylesheet, mergeCssSets, mergeStyles } from '@uifabric/merge-styles';

var _isSSR = false;
/**
 * Helper to set ssr mode to simulate no window object returned from getWindow helper.
 *
 * @public
 */

function setSSR(isEnabled) {
  _isSSR = isEnabled;
}

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

function on(element, eventName, callback, options) {
  element.addEventListener(eventName, callback, options);
  return function () {
    return element.removeEventListener(eventName, callback, options);
  };
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

/**
 * Bugs often appear in async code when stuff gets disposed, but async operations don't get canceled.
 * This Async helper class solves these issues by tying async code to the lifetime of a disposable object.
 *
 * Usage: Anything class extending from BaseModel can access this helper via this.async. Otherwise create a
 * new instance of the class and remember to call dispose() during your code's dispose handler.
 *
 * @public
 */

var Async =
/*#__PURE__*/
function () {
  // tslint:disable-next-line:no-any
  function Async(parent, onError) {
    _classCallCheck(this, Async);

    this._timeoutIds = null;
    this._immediateIds = null;
    this._intervalIds = null;
    this._animationFrameIds = null;
    this._isDisposed = false;
    this._parent = parent || null;
    this._onErrorHandler = onError;

    this._noop = function () {
      /* do nothing */
    };
  }
  /**
   * Dispose function, clears all async operations.
   */


  _createClass(Async, [{
    key: "dispose",
    value: function dispose() {
      var id;
      this._isDisposed = true;
      this._parent = null; // Clear timeouts.

      if (this._timeoutIds) {
        for (id in this._timeoutIds) {
          if (this._timeoutIds.hasOwnProperty(id)) {
            this.clearTimeout(parseInt(id, 10));
          }
        }

        this._timeoutIds = null;
      } // Clear immediates.


      if (this._immediateIds) {
        for (id in this._immediateIds) {
          if (this._immediateIds.hasOwnProperty(id)) {
            this.clearImmediate(parseInt(id, 10));
          }
        }

        this._immediateIds = null;
      } // Clear intervals.


      if (this._intervalIds) {
        for (id in this._intervalIds) {
          if (this._intervalIds.hasOwnProperty(id)) {
            this.clearInterval(parseInt(id, 10));
          }
        }

        this._intervalIds = null;
      } // Clear animation frames.


      if (this._animationFrameIds) {
        for (id in this._animationFrameIds) {
          if (this._animationFrameIds.hasOwnProperty(id)) {
            this.cancelAnimationFrame(parseInt(id, 10));
          }
        }

        this._animationFrameIds = null;
      }
    }
    /**
     * SetTimeout override, which will auto cancel the timeout during dispose.
     * @param callback - Callback to execute.
     * @param duration - Duration in milliseconds.
     * @returns The setTimeout id.
     */

  }, {
    key: "setTimeout",
    value: function (_setTimeout) {
      function setTimeout(_x, _x2) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function (callback, duration) {
      var _this = this;

      var timeoutId = 0;

      if (!this._isDisposed) {
        if (!this._timeoutIds) {
          this._timeoutIds = {};
        }
        /* tslint:disable:ban-native-functions */


        timeoutId = setTimeout(function () {
          // Time to execute the timeout, enqueue it as a foreground task to be executed.
          try {
            // Now delete the record and call the callback.
            if (_this._timeoutIds) {
              delete _this._timeoutIds[timeoutId];
            }

            callback.apply(_this._parent);
          } catch (e) {
            if (_this._onErrorHandler) {
              _this._onErrorHandler(e);
            }
          }
        }, duration);
        /* tslint:enable:ban-native-functions */

        this._timeoutIds[timeoutId] = true;
      }

      return timeoutId;
    })
    /**
     * Clears the timeout.
     * @param id - Id to cancel.
     */

  }, {
    key: "clearTimeout",
    value: function (_clearTimeout) {
      function clearTimeout(_x3) {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function (id) {
      if (this._timeoutIds && this._timeoutIds[id]) {
        /* tslint:disable:ban-native-functions */
        clearTimeout(id);
        delete this._timeoutIds[id];
        /* tslint:enable:ban-native-functions */
      }
    })
    /**
     * SetImmediate override, which will auto cancel the immediate during dispose.
     * @param callback - Callback to execute.
     * @param targetElement - Optional target element to use for identifying the correct window.
     * @returns The setTimeout id.
     */

  }, {
    key: "setImmediate",
    value: function setImmediate(callback, targetElement) {
      var _this2 = this;

      var immediateId = 0;
      var win = getWindow(targetElement);

      if (!this._isDisposed) {
        if (!this._immediateIds) {
          this._immediateIds = {};
        }
        /* tslint:disable:ban-native-functions */


        var setImmediateCallback = function setImmediateCallback() {
          // Time to execute the timeout, enqueue it as a foreground task to be executed.
          try {
            // Now delete the record and call the callback.
            if (_this2._immediateIds) {
              delete _this2._immediateIds[immediateId];
            }

            callback.apply(_this2._parent);
          } catch (e) {
            _this2._logError(e);
          }
        };

        immediateId = win.setTimeout(setImmediateCallback, 0);
        /* tslint:enable:ban-native-functions */

        this._immediateIds[immediateId] = true;
      }

      return immediateId;
    }
    /**
     * Clears the immediate.
     * @param id - Id to cancel.
     * @param targetElement - Optional target element to use for identifying the correct window.
     */

  }, {
    key: "clearImmediate",
    value: function clearImmediate(id, targetElement) {
      var win = getWindow(targetElement);

      if (this._immediateIds && this._immediateIds[id]) {
        /* tslint:disable:ban-native-functions */
        win.clearTimeout(id);
        delete this._immediateIds[id];
        /* tslint:enable:ban-native-functions */
      }
    }
    /**
     * SetInterval override, which will auto cancel the timeout during dispose.
     * @param callback - Callback to execute.
     * @param duration - Duration in milliseconds.
     * @returns The setTimeout id.
     */

  }, {
    key: "setInterval",
    value: function (_setInterval) {
      function setInterval(_x4, _x5) {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function (callback, duration) {
      var _this3 = this;

      var intervalId = 0;

      if (!this._isDisposed) {
        if (!this._intervalIds) {
          this._intervalIds = {};
        }
        /* tslint:disable:ban-native-functions */


        intervalId = setInterval(function () {
          // Time to execute the interval callback, enqueue it as a foreground task to be executed.
          try {
            callback.apply(_this3._parent);
          } catch (e) {
            _this3._logError(e);
          }
        }, duration);
        /* tslint:enable:ban-native-functions */

        this._intervalIds[intervalId] = true;
      }

      return intervalId;
    })
    /**
     * Clears the interval.
     * @param id - Id to cancel.
     */

  }, {
    key: "clearInterval",
    value: function (_clearInterval) {
      function clearInterval(_x6) {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function (id) {
      if (this._intervalIds && this._intervalIds[id]) {
        /* tslint:disable:ban-native-functions */
        clearInterval(id);
        delete this._intervalIds[id];
        /* tslint:enable:ban-native-functions */
      }
    })
    /**
     * Creates a function that, when executed, will only call the func function at most once per
     * every wait milliseconds. Provide an options object to indicate that func should be invoked
     * on the leading and/or trailing edge of the wait timeout. Subsequent calls to the throttled
     * function will return the result of the last func call.
     *
     * Note: If leading and trailing options are true func will be called on the trailing edge of
     * the timeout only if the throttled function is invoked more than once during the wait timeout.
     *
     * @param func - The function to throttle.
     * @param wait - The number of milliseconds to throttle executions to. Defaults to 0.
     * @param options - The options object.
     * @returns The new throttled function.
     */

  }, {
    key: "throttle",
    value: function throttle(func, wait, options) {
      var _this4 = this;

      if (this._isDisposed) {
        return this._noop;
      }

      var waitMS = wait || 0;
      var leading = true;
      var trailing = true;
      var lastExecuteTime = 0;
      var lastResult; // tslint:disable-next-line:no-any

      var lastArgs;
      var timeoutId = null;

      if (options && typeof options.leading === 'boolean') {
        leading = options.leading;
      }

      if (options && typeof options.trailing === 'boolean') {
        trailing = options.trailing;
      }

      var callback = function callback(userCall) {
        var now = new Date().getTime();
        var delta = now - lastExecuteTime;
        var waitLength = leading ? waitMS - delta : waitMS;

        if (delta >= waitMS && (!userCall || leading)) {
          lastExecuteTime = now;

          if (timeoutId) {
            _this4.clearTimeout(timeoutId);

            timeoutId = null;
          }

          lastResult = func.apply(_this4._parent, lastArgs);
        } else if (timeoutId === null && trailing) {
          timeoutId = _this4.setTimeout(callback, waitLength);
        }

        return lastResult;
      }; // tslint:disable-next-line:no-any


      var resultFunction = function resultFunction() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        lastArgs = args;
        return callback(true);
      };

      return resultFunction;
    }
    /**
     * Creates a function that will delay the execution of func until after wait milliseconds have
     * elapsed since the last time it was invoked. Provide an options object to indicate that func
     * should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent calls
     * to the debounced function will return the result of the last func call.
     *
     * Note: If leading and trailing options are true func will be called on the trailing edge of
     * the timeout only if the debounced function is invoked more than once during the wait
     * timeout.
     *
     * @param func - The function to debounce.
     * @param wait - The number of milliseconds to delay.
     * @param options - The options object.
     * @returns The new debounced function.
     */

  }, {
    key: "debounce",
    value: function debounce(func, wait, options) {
      var _this5 = this;

      if (this._isDisposed) {
        var noOpFunction = function noOpFunction() {
          /** Do nothing */
        };

        noOpFunction.cancel = function () {};
        /* tslint:disable:no-any */


        noOpFunction.flush = function () {
          return null;
        };
        /* tslint:enable:no-any */


        noOpFunction.pending = function () {
          return false;
        };

        return noOpFunction;
      }

      var waitMS = wait || 0;
      var leading = false;
      var trailing = true;
      var maxWait = null;
      var lastCallTime = 0;
      var lastExecuteTime = new Date().getTime();
      var lastResult; // tslint:disable-next-line:no-any

      var lastArgs;
      var timeoutId = null;

      if (options && typeof options.leading === 'boolean') {
        leading = options.leading;
      }

      if (options && typeof options.trailing === 'boolean') {
        trailing = options.trailing;
      }

      if (options && typeof options.maxWait === 'number' && !isNaN(options.maxWait)) {
        maxWait = options.maxWait;
      }

      var markExecuted = function markExecuted(time) {
        if (timeoutId) {
          _this5.clearTimeout(timeoutId);

          timeoutId = null;
        }

        lastExecuteTime = time;
      };

      var invokeFunction = function invokeFunction(time) {
        markExecuted(time);
        lastResult = func.apply(_this5._parent, lastArgs);
      };

      var callback = function callback(userCall) {
        var now = new Date().getTime();
        var executeImmediately = false;

        if (userCall) {
          if (leading && now - lastCallTime >= waitMS) {
            executeImmediately = true;
          }

          lastCallTime = now;
        }

        var delta = now - lastCallTime;
        var waitLength = waitMS - delta;
        var maxWaitDelta = now - lastExecuteTime;
        var maxWaitExpired = false;

        if (maxWait !== null) {
          // maxWait only matters when there is a pending callback
          if (maxWaitDelta >= maxWait && timeoutId) {
            maxWaitExpired = true;
          } else {
            waitLength = Math.min(waitLength, maxWait - maxWaitDelta);
          }
        }

        if (delta >= waitMS || maxWaitExpired || executeImmediately) {
          invokeFunction(now);
        } else if ((timeoutId === null || !userCall) && trailing) {
          timeoutId = _this5.setTimeout(callback, waitLength);
        }

        return lastResult;
      };

      var pending = function pending() {
        return !!timeoutId;
      };

      var cancel = function cancel() {
        if (pending()) {
          // Mark the debounced function as having executed
          markExecuted(new Date().getTime());
        }
      };

      var flush = function flush() {
        if (pending()) {
          invokeFunction(new Date().getTime());
        }

        return lastResult;
      }; // tslint:disable-next-line:no-any


      var resultFunction = function resultFunction() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        lastArgs = args;
        return callback(true);
      };

      resultFunction.cancel = cancel;
      resultFunction.flush = flush;
      resultFunction.pending = pending;
      return resultFunction;
    }
  }, {
    key: "requestAnimationFrame",
    value: function requestAnimationFrame(callback, targetElement) {
      var _this6 = this;

      var animationFrameId = 0;
      var win = getWindow(targetElement);

      if (!this._isDisposed) {
        if (!this._animationFrameIds) {
          this._animationFrameIds = {};
        }
        /* tslint:disable:ban-native-functions */


        var animationFrameCallback = function animationFrameCallback() {
          try {
            // Now delete the record and call the callback.
            if (_this6._animationFrameIds) {
              delete _this6._animationFrameIds[animationFrameId];
            }

            callback.apply(_this6._parent);
          } catch (e) {
            _this6._logError(e);
          }
        };

        animationFrameId = win.requestAnimationFrame ? win.requestAnimationFrame(animationFrameCallback) : win.setTimeout(animationFrameCallback, 0);
        /* tslint:enable:ban-native-functions */

        this._animationFrameIds[animationFrameId] = true;
      }

      return animationFrameId;
    }
  }, {
    key: "cancelAnimationFrame",
    value: function cancelAnimationFrame(id, targetElement) {
      var win = getWindow(targetElement);

      if (this._animationFrameIds && this._animationFrameIds[id]) {
        /* tslint:disable:ban-native-functions */
        win.cancelAnimationFrame ? win.cancelAnimationFrame(id) : win.clearTimeout(id);
        /* tslint:enable:ban-native-functions */

        delete this._animationFrameIds[id];
      }
    } // tslint:disable-next-line:no-any

  }, {
    key: "_logError",
    value: function _logError(e) {
      if (this._onErrorHandler) {
        this._onErrorHandler(e);
      }
    }
  }]);

  return Async;
}();

/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @public
 */
function isVirtualElement(element) {
  return element && !!element._virtual;
}

/**
 * Gets the virtual parent given the child element, if it exists.
 *
 * @public
 */

function getVirtualParent(child) {
  var parent;

  if (child && isVirtualElement(child)) {
    parent = child._virtual.parent;
  }

  return parent;
}

/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @public
 */

function getParent(child) {
  var allowVirtualParents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return child && (allowVirtualParents && getVirtualParent(child) || child.parentNode && child.parentNode);
}

/**
 * Finds the first parent element where the matchFunction returns true
 * @param element - element to start searching at
 * @param matchFunction - the function that determines if the element is a match
 * @returns the matched element or null no match was found
 */

function findElementRecursive(element, matchFunction) {
  if (!element || element === document.body) {
    return null;
  }

  return matchFunction(element) ? element : findElementRecursive(getParent(element), matchFunction);
}

/**
 * Determines if an element, or any of its ancestors, contain the given attribute
 * @param element - element to start searching at
 * @param attribute - the attribute to search for
 * @returns the value of the first instance found
 */

function elementContainsAttribute(element, attribute) {
  var elementMatch = findElementRecursive(element, function (testElement) {
    return testElement.hasAttribute(attribute);
  });
  return elementMatch && elementMatch.getAttribute(attribute);
}

/**
 * Determines whether or not a parent element contains a given child element.
 * If `allowVirtualParents` is true, this method may return `true` if the child
 * has the parent in its virtual element hierarchy.
 *
 * @public
 */

function elementContains(parent, child) {
  var allowVirtualParents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var isContained = false;

  if (parent && child) {
    if (allowVirtualParents) {
      isContained = false;

      while (child) {
        var nextParent = getParent(child);

        if (nextParent === parent) {
          isContained = true;
          break;
        }

        child = nextParent;
      }
    } else if (parent.contains) {
      isContained = parent.contains(child);
    }
  }

  return isContained;
}

var IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
var IS_VISIBLE_ATTRIBUTE = 'data-is-visible';
var FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
var FOCUSZONE_SUB_ATTRIBUTE = 'data-is-sub-focuszone';
/**
 * Gets the first focusable element.
 *
 * @public
 */

function getFirstFocusable(rootElement, currentElement, includeElementsInFocusZones) {
  return getNextElement(rootElement, currentElement, true
  /* checkNode */
  , false
  /* suppressParentTraversal */
  , false
  /* suppressChildTraversal */
  , includeElementsInFocusZones);
}
/**
 * Gets the last focusable element.
 *
 * @public
 */

function getLastFocusable(rootElement, currentElement, includeElementsInFocusZones) {
  return getPreviousElement(rootElement, currentElement, true
  /* checkNode */
  , false
  /* suppressParentTraversal */
  , true
  /* traverseChildren */
  , includeElementsInFocusZones);
}
/**
 * Gets the first tabbable element.
 * The difference between focusable and tabbable is that tabbable elements are focusable elements that also have tabIndex != -1.
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues forward.  Typical use passes rootElement.firstChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @param checkNode - Include currentElement in search when true. Defaults to true.
 * @public
 */

function getFirstTabbable(rootElement, currentElement, includeElementsInFocusZones) {
  var checkNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return getNextElement(rootElement, currentElement, checkNode, false
  /* suppressParentTraversal */
  , false
  /* suppressChildTraversal */
  , includeElementsInFocusZones, false
  /* allowFocusRoot */
  , true
  /* tabbable */
  );
}
/**
 * Gets the last tabbable element.
 * The difference between focusable and tabbable is that tabbable elements are focusable elements that also have tabIndex != -1.
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues in reverse.  Typical use passes rootElement.lastChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @param checkNode - Include currentElement in search when true. Defaults to true.
 * @public
 */

function getLastTabbable(rootElement, currentElement, includeElementsInFocusZones) {
  var checkNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return getPreviousElement(rootElement, currentElement, checkNode, false
  /* suppressParentTraversal */
  , true
  /* traverseChildren */
  , includeElementsInFocusZones, false
  /* allowFocusRoot */
  , true
  /* tabbable */
  );
}
/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 *
 * @public
 * @param rootElement - Element to start the search for a focusable child.
 * @returns True if focus was set, false if it was not.
 */

function focusFirstChild(rootElement) {
  var element = getNextElement(rootElement, rootElement, true, false, false, true);

  if (element) {
    focusAsync(element);
    return true;
  }

  return false;
}
/**
 * Traverse to find the previous element.
 * If tabbable is true, the element must have tabIndex != -1.
 *
 * @public
 */

function getPreviousElement(rootElement, currentElement, checkNode, suppressParentTraversal, traverseChildren, includeElementsInFocusZones, allowFocusRoot, tabbable) {
  if (!currentElement || !allowFocusRoot && currentElement === rootElement) {
    return null;
  }

  var isCurrentElementVisible = isElementVisible(currentElement); // Check its children.

  if (traverseChildren && isCurrentElementVisible && (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))) {
    var childMatch = getPreviousElement(rootElement, currentElement.lastElementChild, true, true, true, includeElementsInFocusZones, allowFocusRoot, tabbable);

    if (childMatch) {
      if (tabbable && isElementTabbable(childMatch, true) || !tabbable) {
        return childMatch;
      }

      var childMatchSiblingMatch = getPreviousElement(rootElement, childMatch.previousElementSibling, true, true, true, includeElementsInFocusZones, allowFocusRoot, tabbable);

      if (childMatchSiblingMatch) {
        return childMatchSiblingMatch;
      }

      var childMatchParent = childMatch.parentElement; // At this point if we have not found any potential matches
      // start looking at the rest of the subtree under the currentParent.
      // NOTE: We do not want to recurse here because doing so could
      // cause elements to get skipped.

      while (childMatchParent && childMatchParent !== currentElement) {
        var childMatchParentMatch = getPreviousElement(rootElement, childMatchParent.previousElementSibling, true, true, true, includeElementsInFocusZones, allowFocusRoot, tabbable);

        if (childMatchParentMatch) {
          return childMatchParentMatch;
        }

        childMatchParent = childMatchParent.parentElement;
      }
    }
  } // Check the current node, if it's not the first traversal.


  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement, tabbable)) {
    return currentElement;
  } // Check its previous sibling.


  var siblingMatch = getPreviousElement(rootElement, currentElement.previousElementSibling, true, true, true, includeElementsInFocusZones, allowFocusRoot, tabbable);

  if (siblingMatch) {
    return siblingMatch;
  } // Check its parent.


  if (!suppressParentTraversal) {
    return getPreviousElement(rootElement, currentElement.parentElement, true, false, false, includeElementsInFocusZones, allowFocusRoot, tabbable);
  }

  return null;
}
/**
 * Traverse to find the next focusable element.
 * If tabbable is true, the element must have tabIndex != -1.
 *
 * @public
 * @param checkNode - Include currentElement in search when true.
 */

function getNextElement(rootElement, currentElement, checkNode, suppressParentTraversal, suppressChildTraversal, includeElementsInFocusZones, allowFocusRoot, tabbable) {
  if (!currentElement || currentElement === rootElement && suppressChildTraversal && !allowFocusRoot) {
    return null;
  }

  var isCurrentElementVisible = isElementVisible(currentElement); // Check the current node, if it's not the first traversal.

  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement, tabbable)) {
    return currentElement;
  } // Check its children.


  if (!suppressChildTraversal && isCurrentElementVisible && (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))) {
    var childMatch = getNextElement(rootElement, currentElement.firstElementChild, true, true, false, includeElementsInFocusZones, allowFocusRoot, tabbable);

    if (childMatch) {
      return childMatch;
    }
  }

  if (currentElement === rootElement) {
    return null;
  } // Check its sibling.


  var siblingMatch = getNextElement(rootElement, currentElement.nextElementSibling, true, true, false, includeElementsInFocusZones, allowFocusRoot, tabbable);

  if (siblingMatch) {
    return siblingMatch;
  }

  if (!suppressParentTraversal) {
    return getNextElement(rootElement, currentElement.parentElement, false, false, true, includeElementsInFocusZones, allowFocusRoot, tabbable);
  }

  return null;
}
/**
 * Determines if an element is visible.
 *
 * @public
 */

function isElementVisible(element) {
  // If the element is not valid, return false.
  if (!element || !element.getAttribute) {
    return false;
  }

  var visibilityAttribute = element.getAttribute(IS_VISIBLE_ATTRIBUTE); // If the element is explicitly marked with the visibility attribute, return that value as boolean.

  if (visibilityAttribute !== null && visibilityAttribute !== undefined) {
    return visibilityAttribute === 'true';
  } // Fallback to other methods of determining actual visibility.


  return element.offsetHeight !== 0 || element.offsetParent !== null || // tslint:disable-next-line:no-any
  element.isVisible === true; // used as a workaround for testing.
}
/**
 * Determines if an element can receive focus programmatically or via a mouse click.
 * If checkTabIndex is true, additionally checks to ensure the element can be focused with the tab key, meaning tabIndex != -1.
 *
 * @public
 */

function isElementTabbable(element, checkTabIndex) {
  // If this element is null or is disabled, it is not considered tabbable.
  if (!element || element.disabled) {
    return false;
  }

  var tabIndex = 0;
  var tabIndexAttributeValue = null;

  if (element && element.getAttribute) {
    tabIndexAttributeValue = element.getAttribute('tabIndex');

    if (tabIndexAttributeValue) {
      tabIndex = parseInt(tabIndexAttributeValue, 10);
    }
  }

  var isFocusableAttribute = element.getAttribute ? element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) : null;
  var isTabIndexSet = tabIndexAttributeValue !== null && tabIndex >= 0;
  var result = !!element && isFocusableAttribute !== 'false' && (element.tagName === 'A' || element.tagName === 'BUTTON' || element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || isFocusableAttribute === 'true' || isTabIndexSet);
  return checkTabIndex ? tabIndex !== -1 && result : result;
}
/**
 * Determines if a given element is a focus zone.
 *
 * @public
 */

function isElementFocusZone(element) {
  return !!(element && element.getAttribute && !!element.getAttribute(FOCUSZONE_ID_ATTRIBUTE));
}
/**
 * Determines if a given element is a focus sub zone.
 *
 * @public
 */

function isElementFocusSubZone(element) {
  return !!(element && element.getAttribute && element.getAttribute(FOCUSZONE_SUB_ATTRIBUTE) === 'true');
}
/**
 * Determines if an element, or any of its children, contain focus.
 *
 * @public
 */

function doesElementContainFocus(element) {
  var document = getDocument(element);
  var currentActiveElement = document && document.activeElement;

  if (currentActiveElement && elementContains(element, currentActiveElement)) {
    return true;
  }

  return false;
}
/**
 * Determines if an, or any of its ancestors, sepcificies that it doesn't want focus to wrap
 * @param element - element to start searching from
 * @param noWrapDataAttribute - the no wrap data attribute to match (either)
 * @returns true if focus should wrap, false otherwise
 */

function shouldWrapFocus(element, noWrapDataAttribute) {
  return elementContainsAttribute(element, noWrapDataAttribute) !== 'true';
}
var targetToFocusOnNextRepaint;
/**
 * Sets focus to an element asynchronously. The focus will be set at the next browser repaint,
 * meaning it won't cause any extra recalculations. If more than one focusAsync is called during one frame,
 * only the latest called focusAsync element will actually be focused
 * @param element - The element to focus
 */

function focusAsync(element) {
  if (element) {
    // An element was already queued to be focused, so replace that one with the new element
    if (targetToFocusOnNextRepaint) {
      targetToFocusOnNextRepaint = element;
      return;
    }

    targetToFocusOnNextRepaint = element;
    var win = getWindow(element);

    if (win) {
      // element.focus() is a no-op if the element is no longer in the DOM, meaning this is always safe
      win.requestAnimationFrame(function () {
        targetToFocusOnNextRepaint && targetToFocusOnNextRepaint.focus(); // We are done focusing for this frame, so reset the queued focus element

        targetToFocusOnNextRepaint = undefined;
      });
    }
  }
}
/**
 * Finds the closest focusable element via an index path from a parent. See
 * `getElementIndexPath` for getting an index path from an element to a child.
 */

function getFocusableByIndexPath(parent, path) {
  var element = parent;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var index = _step.value;
      var nextChild = element.children[Math.min(index, element.children.length - 1)];

      if (!nextChild) {
        break;
      }

      element = nextChild;
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

  element = isElementTabbable(element) && isElementVisible(element) ? element : getNextElement(parent, element, true) || getPreviousElement(parent, element);
  return element;
}
/**
 * Finds the element index path from a parent element to a child element.
 *
 * If you had this node structure: "A has children [B, C] and C has child D",
 * the index path from A to D would be [1, 0], or `parent.chidren[1].children[0]`.
 */

function getElementIndexPath(fromElement, toElement) {
  var path = []; // eslint-disable-next-line

  while (toElement && fromElement && toElement !== fromElement) {
    var parent = getParent(toElement, true);

    if (parent === null) {
      return [];
    }

    path.unshift(Array.prototype.indexOf.call(parent.children, toElement));
    toElement = parent;
  }

  return path;
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

/**
 * Fetches an item from session storage without throwing an exception
 * @param key The key of the item to fetch from session storage
 */
function getItem(key) {
  var result = null;

  try {
    result = window.sessionStorage.getItem(key);
  } catch (e) {
    /* Eat the exception */
  }

  return result;
}
/**
 * Inserts an item into session storage without throwing an exception
 * @param key The key of the item to add to session storage
 * @param data The data to put into session storage
 */

function setItem(key, data) {
  try {
    window.sessionStorage.setItem(key, data);
  } catch (e) {
    /* Eat the exception */
  }
}

var RTL_LOCAL_STORAGE_KEY = 'isRTL'; // Default to undefined so that we initialize on first read.

var _isRTL;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */


function getRTL() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (theme.rtl !== undefined) {
    return theme.rtl;
  }

  if (_isRTL === undefined) {
    // Fabric supports persisting the RTL setting between page refreshes via session storage
    var savedRTL = getItem(RTL_LOCAL_STORAGE_KEY);

    if (savedRTL !== null) {
      _isRTL = savedRTL === '1';
      setRTL(_isRTL);
    }

    var doc = getDocument();

    if (_isRTL === undefined && doc) {
      _isRTL = (doc.body && doc.body.getAttribute('dir') || doc.documentElement.getAttribute('dir')) === 'rtl';
      setRTL$1(_isRTL);
    }
  }

  return !!_isRTL;
}
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */

function setRTL(isRTL) {
  var persistSetting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var doc = getDocument();

  if (doc) {
    doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }

  if (persistSetting) {
    setItem(RTL_LOCAL_STORAGE_KEY, isRTL ? '1' : '0');
  }

  _isRTL = isRTL;
  setRTL$1(_isRTL);
}
/**
 * Returns the given key, but flips right/left arrows if necessary.
 */

function getRTLSafeKeyCode(key) {
  if (getRTL()) {
    if (key === KeyCodes.left) {
      key = KeyCodes.right;
    } else if (key === KeyCodes.right) {
      key = KeyCodes.left;
    }
  }

  return key;
}

var MAX_CACHE_COUNT = 50;
var _memoizedClassNames = 0;
var stylesheet = Stylesheet.getInstance();

if (stylesheet && stylesheet.onReset) {
  stylesheet.onReset(function () {
    return _memoizedClassNames++;
  });
} // Note that because of the caching nature within the classNames memoization,
// I've disabled this rule to simply be able to work with any types.
// tslint:disable:no-any
// This represents a prop we attach to each Map to indicate the cached return value
// associated with the graph node.


var RetVal = '__retval__';
/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 *
 * Note that the props you pass in on every render should be in the same order and
 * immutable (numbers, strings, and booleans). This will allow the results to be memoized. Violating
 * these will cause extra recalcs to occur.
 */

function classNamesFunction() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // We build a trie where each node is a Map. The map entry key represents an argument
  // value, and the entry value is another node (Map). Each node has a `__retval__`
  // property which is used to hold the cached response.
  // To derive the response, we can simply ensure the arguments are added or already
  // exist in the trie. At the last node, if there is a `__retval__` we return that. Otherwise
  // we call the `getStyles` api to evaluate, cache on the property, and return that.
  var map = new Map();
  var resultCount = 0;
  var currentMemoizedClassNames = _memoizedClassNames;

  var getClassNames = function getClassNames(styleFunctionOrObject) {
    var styleProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var current = map;
    var theme = styleProps.theme;
    var rtl = theme && theme.rtl || getRTL();
    var disableCaching = options.disableCaching; // On reset of our stylesheet, reset memoized cache.

    if (currentMemoizedClassNames !== _memoizedClassNames) {
      currentMemoizedClassNames = _memoizedClassNames;
      map = new Map();
      resultCount = 0;
    }

    if (!options.disableCaching) {
      current = _traverseMap(map, styleFunctionOrObject);
      current = _traverseMap(current, styleProps);
    }

    if (disableCaching || !current[RetVal]) {
      if (styleFunctionOrObject === undefined) {
        current[RetVal] = {};
      } else {
        current[RetVal] = mergeCssSets([typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps) : styleFunctionOrObject], {
          rtl: !!rtl
        });
      }

      if (!disableCaching) {
        resultCount++;
      }
    }

    if (resultCount > MAX_CACHE_COUNT) {
      map.clear();
      resultCount = 0; // Mutate the options passed in, that's all we can do.

      options.disableCaching = true; // Note: this code is great for debugging problems with styles being recaculated, but commenting it out
      // to avoid confusing consumers.
      // if ("production" !== 'production') {
      //  console.log('Styles are being recalculated far too frequently. Something is mutating the class over and over.');
      //  // tslint:disable-next-line:no-console
      //  console.trace();
      // }
    } // Note: the RetVal is an attached property on the Map; not a key in the Map. We use this attached property to
    // cache the return value for this branch of the graph.


    return current[RetVal];
  };

  return getClassNames;
}

function _traverseEdge(current, value) {
  value = _normalizeValue(value);

  if (!current.has(value)) {
    current.set(value, new Map());
  }

  return current.get(value);
}

function _traverseMap(current, inputs) {
  // The styled helper will generate the styles function and will attach the cached
  // inputs (consisting of the default styles, customzied styles, and user provided styles.)
  // These should be used as cache keys for deriving the memoized value.
  if (typeof inputs === 'function' && inputs.__cachedInputs__) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = inputs.__cachedInputs__[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var input = _step.value;
        current = _traverseEdge(current, input);
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
  } else if (_typeof(inputs) === 'object') {
    for (var propName in inputs) {
      if (inputs.hasOwnProperty(propName)) {
        current = _traverseEdge(current, inputs[propName]);
      }
    }
  }

  return current;
}

function _normalizeValue(value) {
  switch (value) {
    case undefined:
      return '__undefined__';

    case null:
      return '__null__';

    default:
      return value;
  }
}

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
function css() {
  var classes = [];

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var arg = _args[_i];

    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else if (arg.hasOwnProperty('toString') && typeof arg.toString === 'function') {
        classes.push(arg.toString());
      } else {
        for (var key in arg) {
          if (arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}

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
    globalObj[GLOBAL_SETTINGS_PROP_NAME] = _defineProperty({}, CALLBACK_STATE_PROP_NAME, {});
  }

  return globalObj[GLOBAL_SETTINGS_PROP_NAME];
}

function _getCallbacks() {
  var globalSettings = _getGlobalSettings();

  return globalSettings[CALLBACK_STATE_PROP_NAME];
}

var CustomizationsGlobalKey = 'customizations';
var NO_CUSTOMIZATIONS = {
  settings: {},
  scopedSettings: {},
  inCustomizerContext: false
};

var _allSettings = GlobalSettings.getValue(CustomizationsGlobalKey, {
  settings: {},
  scopedSettings: {},
  inCustomizerContext: false
});

var _events = [];
var Customizations =
/*#__PURE__*/
function () {
  function Customizations() {
    _classCallCheck(this, Customizations);
  }

  _createClass(Customizations, null, [{
    key: "reset",
    value: function reset() {
      _allSettings.settings = {};
      _allSettings.scopedSettings = {};
    } // tslint:disable-next-line:no-any

  }, {
    key: "applySettings",
    value: function applySettings(settings) {
      _allSettings.settings = Object.assign({}, _allSettings.settings, {}, settings);

      Customizations._raiseChange();
    } // tslint:disable-next-line:no-any

  }, {
    key: "applyScopedSettings",
    value: function applyScopedSettings(scopeName, settings) {
      _allSettings.scopedSettings[scopeName] = Object.assign({}, _allSettings.scopedSettings[scopeName], {}, settings);

      Customizations._raiseChange();
    }
  }, {
    key: "getSettings",
    value: function getSettings(properties, scopeName) // tslint:disable-next-line:no-any
    {
      var localSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NO_CUSTOMIZATIONS;
      // tslint:disable-next-line:no-any
      var settings = {};
      var localScopedSettings = scopeName && localSettings.scopedSettings[scopeName] || {};
      var globalScopedSettings = scopeName && _allSettings.scopedSettings[scopeName] || {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var property = _step.value;
          settings[property] = localScopedSettings[property] || localSettings.settings[property] || globalScopedSettings[property] || _allSettings.settings[property];
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

      return settings;
    }
  }, {
    key: "observe",
    value: function observe(onChange) {
      _events.push(onChange);
    }
  }, {
    key: "unobserve",
    value: function unobserve(onChange) {
      _events = _events.filter(function (cb) {
        return cb !== onChange;
      });
    }
  }, {
    key: "_raiseChange",
    value: function _raiseChange() {
      _events.forEach(function (cb) {
        return cb();
      });
    }
  }]);

  return Customizations;
}();

var _DirectionalKeyCodes;
var DirectionalKeyCodes = (_DirectionalKeyCodes = {}, _defineProperty(_DirectionalKeyCodes, KeyCodes.up, 1), _defineProperty(_DirectionalKeyCodes, KeyCodes.down, 1), _defineProperty(_DirectionalKeyCodes, KeyCodes.left, 1), _defineProperty(_DirectionalKeyCodes, KeyCodes.right, 1), _defineProperty(_DirectionalKeyCodes, KeyCodes.home, 1), _defineProperty(_DirectionalKeyCodes, KeyCodes.end, 1), _defineProperty(_DirectionalKeyCodes, KeyCodes.tab, 1), _defineProperty(_DirectionalKeyCodes, KeyCodes.pageUp, 1), _defineProperty(_DirectionalKeyCodes, KeyCodes.pageDown, 1), _DirectionalKeyCodes);
/**
 * Returns true if the keycode is a directional keyboard key.
 */

function isDirectionalKeyCode(which) {
  return !!DirectionalKeyCodes[which];
}
/**
 * Adds a keycode to the list of keys that, when pressed, should cause the focus outlines to be visible.
 * This can be used to add global shortcut keys that directionally move from section to section within
 * an app or between focus trap zones.
 */

function addDirectionalKeyCode(which) {
  DirectionalKeyCodes[which] = 1;
}

var IsFocusVisibleClassName = 'ms-Fabric--isFocusVisible';
/**
 * Initializes the logic which:
 *
 * 1. Subscribes keydown and mousedown events. (It will only do it once per window,
 *    so it's safe to call this method multiple times.)
 * 2. When the user presses directional keyboard keys, adds the 'ms-Fabric--isFocusVisible' classname
 *    to the document body.
 * 3. When the user clicks a mouse button, we remove the classname if it exists.
 *
 * This logic allows components on the page to conditionally render focus treatments only
 * if the global classname exists, which simplifies logic overall.
 *
 * @param window - the window used to add the event listeners
 */

function initializeFocusRects(window) {
  var win = window || getWindow();

  if (win && !win.__hasInitializeFocusRects__) {
    win.__hasInitializeFocusRects__ = true;
    win.addEventListener('mousedown', _onMouseDown, true);
    win.addEventListener('keydown', _onKeyDown, true);
  }
}

function _onMouseDown(ev) {
  var win = getWindow(ev.target);

  if (win) {
    var classList = win.document.body.classList;

    if (classList.contains(IsFocusVisibleClassName)) {
      classList.remove(IsFocusVisibleClassName);
    }
  }
}

function _onKeyDown(ev) {
  var win = getWindow(ev.target);

  if (win) {
    var classList = win.document.body.classList;

    if (isDirectionalKeyCode(ev.which) && !classList.contains(IsFocusVisibleClassName)) {
      classList.add(IsFocusVisibleClassName);
    }
  }
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
 *  Test utility for providing a custom weakmap.
 *
 * @internal
 * */


function setMemoizeWeakMap(weakMap) {
  _weakMap = weakMap;
}
/**
 * Reset memoizations.
 */

function resetMemoizations() {
  _resetCounter++;
}
/**
 * Memoize decorator to be used on class methods. WARNING: the `this` reference
 * will be inaccessible within a memoized method, given that a cached method's `this`
 * would not be instance-specific.
 *
 * @public
 */

function memoize(target, key, descriptor) {
  // We bind to "null" to prevent people from inadvertently pulling values from "this",
  // rather than passing them in as input values which can be memoized.
  var fn = memoizeFunction(descriptor.value && descriptor.value.bind(null));
  return {
    configurable: true,
    get: function get() {
      return fn;
    }
  };
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
  var maxCacheSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  // Avoid breaking scenarios which don't have weak map.
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
  } else if (_typeof(val) === 'object' || typeof val === 'function') {
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

      if (_typeof(value) === 'object') {
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

var CURRENT_ID_PROPERTY = '__currentId__';
var DEFAULT_ID_STRING = 'id__'; // tslint:disable-next-line:no-any

var _global = getWindow() || {};

if (_global[CURRENT_ID_PROPERTY] === undefined) {
  _global[CURRENT_ID_PROPERTY] = 0;
}
/**
 * Generates a unique id in the global scope (this spans across duplicate copies of the same library.)
 *
 * @public
 */


function getId(prefix) {
  var index = _global[CURRENT_ID_PROPERTY]++;
  return (prefix || DEFAULT_ID_STRING) + index;
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

function checkProperties(a, b) {
  for (var propName in a) {
    if (a.hasOwnProperty(propName)) {
      if (!b.hasOwnProperty(propName) || b[propName] !== a[propName]) {
        return false;
      }
    }
  }

  return true;
}
/**
 * Compares a to b and b to a.
 *
 * @public
 */


function shallowCompare(a, b) {
  return checkProperties(a, b) && checkProperties(b, a);
}
/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for target members.
 *
 * @public
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
// tslint:disable-next-line:no-any

function assign(target) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // @ts-ignore
  return filteredAssign.apply(this, [null, target].concat(args));
}
/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @public
 * @param isAllowed - Callback to determine if the given propName is allowed in the result.
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
// tslint:disable-next-line:no-any

function filteredAssign(isAllowed, target) {
  target = target || {};

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var sourceObject = _args[_i];

    if (sourceObject) {
      for (var propName in sourceObject) {
        if (sourceObject.hasOwnProperty(propName) && (!isAllowed || isAllowed(propName))) {
          target[propName] = sourceObject[propName];
        }
      }
    }
  }

  return target;
} // Configure ids to reset on stylesheet resets.

var stylesheet$2 = Stylesheet.getInstance();

if (stylesheet$2 && stylesheet$2.onReset) {
  stylesheet$2.onReset(resetIds);
}
/* Takes an enum and iterates over each value of the enum (as a string), running the callback on each, returning a mapped array.
 * The callback takes as a first parameter the string that represents the name of the entry, and the second parameter is the
 * value of that entry, which is the value you'd normally use when using the enum (usually a number).
 * */


function mapEnumByName( // tslint:disable-next-line:no-any
theEnum, callback) {
  // map<any> to satisfy compiler since it doesn't realize we strip out undefineds in the .filter() call
  return Object.keys(theEnum).map(function (p) {
    // map on each property name as a string
    if (String(Number(p)) !== p) {
      // if the property is not just a number (because enums in TypeScript will map both ways)
      return callback(p, theEnum[p]);
    }
  }).filter(function (v) {
    return !!v;
  }); // only return elements with values
}
/**
 * Get all values in an object dictionary
 *
 * @param obj - The dictionary to get values for
 */
// tslint:disable-next-line:no-any

function values(obj) {
  return Object.keys(obj).reduce(function (arr, key) {
    arr.push(obj[key]);
    return arr;
  }, []);
}

/**
 * An array of events that are allowed on every html element type.
 *
 * @public
 */

var baseElementEvents = ['onCopy', 'onCut', 'onPaste', 'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate', 'onFocus', 'onFocusCapture', 'onBlur', 'onBlurCapture', 'onChange', 'onInput', 'onSubmit', 'onLoad', 'onError', 'onKeyDown', 'onKeyDownCapture', 'onKeyPress', 'onKeyUp', 'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting', 'onClick', 'onClickCapture', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseDownCapture', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onMouseUpCapture', 'onSelect', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'onScroll', 'onWheel', 'onPointerCancel', 'onPointerDown', 'onPointerEnter', 'onPointerLeave', 'onPointerMove', 'onPointerOut', 'onPointerOver', 'onPointerUp', 'onGotPointerCapture', 'onLostPointerCapture'];
/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */

var baseElementProperties = ['accessKey', 'children', 'className', 'contentEditable', 'dir', 'draggable', 'hidden', 'htmlFor', 'id', 'lang', 'role', 'style', 'tabIndex', 'title', 'translate', 'spellCheck', 'name'];
/**
 * An array of HTML element properties and events.
 *
 * @public
 */

var htmlElementProperties = baseElementProperties.concat(baseElementEvents);
/**
 * An array of LABEL tag properties and events.
 *
 * @public
 */

var labelProperties = htmlElementProperties.concat(['form']);
/**
 * An array of AUDIO tag properties and events.
 *
 * @public
 */

var audioProperties = htmlElementProperties.concat(['height', 'loop', 'muted', 'preload', 'src', 'width']);
/**
 * An array of VIDEO tag properties and events.
 *
 * @public
 */

var videoProperties = audioProperties.concat(['poster']);
/**
 * An array of OL tag properties and events.
 *
 * @public
 */

var olProperties = htmlElementProperties.concat(['start']);
/**
 * An array of LI tag properties and events.
 *
 * @public
 */

var liProperties = htmlElementProperties.concat(['value']);
/**
 * An array of A tag properties and events.
 *
 * @public
 */

var anchorProperties = htmlElementProperties.concat(['download', 'href', 'hrefLang', 'media', 'rel', 'target', 'type']);
/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */

var buttonProperties = htmlElementProperties.concat(['autoFocus', 'disabled', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'type', 'value']);
/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */

var inputProperties = buttonProperties.concat(['accept', 'alt', 'autoComplete', 'checked', 'dirname', 'form', 'height', 'inputMode', 'list', 'max', 'maxLength', 'min', 'multiple', 'pattern', 'placeholder', 'readOnly', 'required', 'src', 'step', 'size', 'type', 'value', 'width']);
/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */

var textAreaProperties = buttonProperties.concat(['cols', 'dirname', 'form', 'maxLength', 'placeholder', 'readOnly', 'required', 'rows', 'wrap']);
/**
 * An array of SELECT tag properties and events.
 *
 * @public
 */

var selectProperties = buttonProperties.concat(['form', 'multiple', 'required']);
var optionProperties = htmlElementProperties.concat(['selected', 'value']);
/**
 * An array of TABLE tag properties and events.
 *
 * @public
 */

var tableProperties = htmlElementProperties.concat(['cellPadding', 'cellSpacing']);
/**
 * An array of TR tag properties and events.
 *
 * @public
 */

var trProperties = htmlElementProperties;
/**
 * An array of TH tag properties and events.
 *
 * @public
 */

var thProperties = htmlElementProperties.concat(['rowSpan', 'scope']);
/**
 * An array of TD tag properties and events.
 *
 * @public
 */

var tdProperties = htmlElementProperties.concat(['colSpan', 'headers', 'rowSpan', 'scope']);
var colGroupProperties = htmlElementProperties.concat(['span']);
var colProperties = htmlElementProperties.concat(['span']);
/**
 * An array of FORM tag properties and events.
 *
 * @public
 */

var formProperties = htmlElementProperties.concat(['acceptCharset', 'action', 'encType', 'encType', 'method', 'noValidate', 'target']);
/**
 * An array of IFRAME tag properties and events.
 *
 * @public
 */

var iframeProperties = htmlElementProperties.concat(['allow', 'allowFullScreen', 'allowPaymentRequest', 'allowTransparency', 'csp', 'height', 'importance', 'referrerPolicy', 'sandbox', 'src', 'srcDoc', 'width']);
/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */

var imgProperties = htmlElementProperties.concat(['alt', 'crossOrigin', 'height', 'src', 'srcSet', 'useMap', 'width']);
/**
 * @deprecated Use imgProperties for img elements.
 */

var imageProperties = imgProperties;
/**
 * An array of DIV tag properties and events.
 *
 * @public
 */

var divProperties = htmlElementProperties;
/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 *
 * @public
 * @param props - The unfiltered input props
 * @param allowedPropsNames-  The array of allowed propnames.
 * @returns The filtered props
 */

function getNativeProps(props, allowedPropNames, excludedPropNames) {
  // It'd be great to properly type this while allowing 'aria-` and 'data-' attributes like TypeScript does for JSX attributes,
  // but that ability is hardcoded into the TS compiler with no analog in TypeScript typings.
  // Then we'd be able to enforce props extends native props (including aria- and data- attributes), and then return native props.
  // We should be able to do this once this PR is merged: https://github.com/microsoft/TypeScript/pull/26797
  return filteredAssign(function (propName) {
    return (!excludedPropNames || excludedPropNames.indexOf(propName) < 0) && (propName.indexOf('data-') === 0 || propName.indexOf('aria-') === 0 || allowedPropNames.indexOf(propName) >= 0);
  }, {}, props);
}

/**
 * Regular expression matching characters to ignore when calculating the initials.
 * The first part matches characters within parenthesis, including the parenthesis.
 * The second part matches special ASCII characters except space, plus some unicode special characters.
 */
// eslint-disable-next-line
var UNWANTED_CHARS_REGEX = /\([^)]*\)|[\0-\u001F\!-/:-@\[-`\{-\u00BF\u0250-\u036F\uD800-\uFFFF]/g;
/**
   * Regular expression matching phone numbers. Applied after chars matching UNWANTED_CHARS_REGEX have been removed
   * and number has been trimmed for whitespaces
   */

var PHONENUMBER_REGEX = /^\d+[\d\s]*(:?ext|x|)\s*\d+$/i;
/** Regular expression matching one or more spaces. */

var MULTIPLE_WHITESPACES_REGEX = /\s+/g;
/**
   * Regular expression matching languages for which we currently don't support initials.
   * Arabic:   Arabic, Arabic Supplement, Arabic Extended-A.
   * Korean:   Hangul Jamo, Hangul Compatibility Jamo, Hangul Jamo Extended-A, Hangul Syllables, Hangul Jamo Extended-B.
   * Japanese: Hiragana, Katakana.
   * CJK:      CJK Unified Ideographs Extension A, CJK Unified Ideographs, CJK Compatibility Ideographs, CJK Unified Ideographs Extension B
   */

/* tslint:disable:max-line-length */

var UNSUPPORTED_TEXT_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD869][\uDC00-\uDED6]/;
/* tslint:enable:max-line-length */

function getInitialsLatin(displayName, isRtl) {
  var initials = '';
  var splits = displayName.split(' ');

  if (splits.length === 2) {
    initials += splits[0].charAt(0).toUpperCase();
    initials += splits[1].charAt(0).toUpperCase();
  } else if (splits.length === 3) {
    initials += splits[0].charAt(0).toUpperCase();
    initials += splits[2].charAt(0).toUpperCase();
  } else if (splits.length !== 0) {
    initials += splits[0].charAt(0).toUpperCase();
  }

  if (isRtl && initials.length > 1) {
    return initials.charAt(1) + initials.charAt(0);
  }

  return initials;
}

function cleanupDisplayName(displayName) {
  displayName = displayName.replace(UNWANTED_CHARS_REGEX, '');
  displayName = displayName.replace(MULTIPLE_WHITESPACES_REGEX, ' ');
  displayName = displayName.trim();
  return displayName;
}
/**
   * Get (up to 2 characters) initials based on display name of the persona.
   *
   * @public
   */


function getInitials(displayName, isRtl, allowPhoneInitials) {
  if (!displayName) {
    return '';
  }

  displayName = cleanupDisplayName(displayName); // For names containing CJK characters, and phone numbers, we don't display initials

  if (UNSUPPORTED_TEXT_REGEX.test(displayName) || !allowPhoneInitials && PHONENUMBER_REGEX.test(displayName)) {
    return '';
  }

  return getInitialsLatin(displayName, isRtl);
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
/**
 * Inserts an item into local storage without throwing an exception
 * @param key The key of the item to add to local storage
 * @param data The data to put into local storage
 */

function setItem$1(key, data) {
  try {
    var win = getWindow();
    win && win.localStorage.setItem(key, data);
  } catch (e) {
    /* Eat the exception */
  }
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
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 *
 * @public
 */

function setLanguage(language) {
  var avoidPersisting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var doc = getDocument();

  if (doc) {
    doc.documentElement.setAttribute('lang', language);
  }

  if (!avoidPersisting) {
    setItem$1('language', language);
  }

  _language = language;
}

var isIE11 = function isIE11() {
  if (typeof window === 'undefined' || !window.navigator || !window.navigator.userAgent) {
    return false;
  }

  return window.navigator.userAgent.indexOf('rv:11.0') > -1;
};

/** An instance of EventGroup allows anything with a handle to it to trigger events on it.
 *  If the target is an HTMLElement, the event will be attached to the element and can be
 *  triggered as usual (like clicking for onclick).
 *  The event can be triggered by calling EventGroup.raise() here. If the target is an
 *  HTMLElement, the event gets raised and is handled by the browser. Otherwise, it gets
 *  handled here in EventGroup, and the handler is called in the context of the parent
 *  (which is passed in in the constructor).
 *
 * @public
 * {@docCategory EventGroup}
 */

var EventGroup =
/*#__PURE__*/
function () {
  /** parent: the context in which events attached to non-HTMLElements are called */
  // tslint:disable-next-line:no-any
  function EventGroup(parent) {
    _classCallCheck(this, EventGroup);

    this._id = EventGroup._uniqueId++;
    this._parent = parent;
    this._eventRecords = [];
  }
  /** For IE8, bubbleEvent is ignored here and must be dealt with by the handler.
   *  Events raised here by default have bubbling set to false and cancelable set to true.
   *  This applies also to built-in events being raised manually here on HTMLElements,
   *  which may lead to unexpected behavior if it differs from the defaults.
   *
   */


  _createClass(EventGroup, [{
    key: "dispose",
    value: function dispose() {
      if (!this._isDisposed) {
        this._isDisposed = true;
        this.off();
        this._parent = null;
      }
    }
    /** On the target, attach a set of events, where the events object is a name to function mapping. */
    // tslint:disable-next-line:no-any

  }, {
    key: "onAll",
    value: function onAll(target, events, useCapture) {
      for (var eventName in events) {
        if (events.hasOwnProperty(eventName)) {
          this.on(target, eventName, events[eventName], useCapture);
        }
      }
    }
    /** On the target, attach an event whose handler will be called in the context of the parent
     * of this instance of EventGroup.
     */
    // tslint:disable-next-line:no-any

  }, {
    key: "on",
    value: function on(target, eventName, callback, options) {
      var _this = this;

      if (eventName.indexOf(',') > -1) {
        var events = eventName.split(/[ ,]+/);

        for (var i = 0; i < events.length; i++) {
          this.on(target, events[i], callback, options);
        }
      } else {
        var parent = this._parent;
        var eventRecord = {
          target: target,
          eventName: eventName,
          parent: parent,
          callback: callback,
          options: options
        }; // Initialize and wire up the record on the target, so that it can call the callback if the event fires.

        var _events = target.__events__ = target.__events__ || {};

        _events[eventName] = _events[eventName] || {
          count: 0
        };
        _events[eventName][this._id] = _events[eventName][this._id] || [];

        _events[eventName][this._id].push(eventRecord);

        _events[eventName].count++;

        if (EventGroup._isElement(target)) {
          // tslint:disable-next-line:no-any
          var processElementEvent = function processElementEvent() {
            if (_this._isDisposed) {
              return;
            }

            var result;

            try {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              // @ts-ignore
              result = callback.apply(parent, args);

              if (result === false && args[0]) {
                var e = args[0];

                if (e.preventDefault) {
                  e.preventDefault();
                }

                if (e.stopPropagation) {
                  e.stopPropagation();
                }

                e.cancelBubble = true;
              }
            } catch (e) {
              /* ErrorHelper.log(e); */
            }

            return result;
          };

          eventRecord.elementCallback = processElementEvent;

          if (target.addEventListener) {
            /* tslint:disable:ban-native-functions */
            target.addEventListener(eventName, processElementEvent, options);
            /* tslint:enable:ban-native-functions */
          } else if (target.attachEvent) {
            // IE8
            target.attachEvent('on' + eventName, processElementEvent);
          }
        } else {
          // tslint:disable-next-line:no-any
          var processObjectEvent = function processObjectEvent() {
            if (_this._isDisposed) {
              return;
            } // @ts-ignore


            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return callback.apply(parent, args);
          };

          eventRecord.objectCallback = processObjectEvent;
        } // Remember the record locally, so that it can be removed.


        this._eventRecords.push(eventRecord);
      }
    } // tslint:disable-next-line:no-any

  }, {
    key: "off",
    value: function off(target, eventName, callback, options) {
      for (var i = 0; i < this._eventRecords.length; i++) {
        var eventRecord = this._eventRecords[i];

        if ((!target || target === eventRecord.target) && (!eventName || eventName === eventRecord.eventName) && (!callback || callback === eventRecord.callback) && (typeof options !== 'boolean' || options === eventRecord.options)) {
          var events = eventRecord.target.__events__;
          var targetArrayLookup = events[eventRecord.eventName];
          var targetArray = targetArrayLookup ? targetArrayLookup[this._id] : null; // We may have already target's entries, so check for null.

          if (targetArray) {
            if (targetArray.length === 1 || !callback) {
              targetArrayLookup.count -= targetArray.length;
              delete events[eventRecord.eventName][this._id];
            } else {
              targetArrayLookup.count--;
              targetArray.splice(targetArray.indexOf(eventRecord), 1);
            }

            if (!targetArrayLookup.count) {
              delete events[eventRecord.eventName];
            }
          }

          if (eventRecord.elementCallback) {
            if (eventRecord.target.removeEventListener) {
              eventRecord.target.removeEventListener(eventRecord.eventName, eventRecord.elementCallback, eventRecord.options);
            } else if (eventRecord.target.detachEvent) {
              // IE8
              eventRecord.target.detachEvent('on' + eventRecord.eventName, eventRecord.elementCallback);
            }
          }

          this._eventRecords.splice(i--, 1);
        }
      }
    }
    /** Trigger the given event in the context of this instance of EventGroup. */
    // tslint:disable-next-line:no-any

  }, {
    key: "raise",
    value: function raise(eventName, eventArgs, bubbleEvent) {
      return EventGroup.raise(this._parent, eventName, eventArgs, bubbleEvent);
    }
    /** Declare an event as being supported by this instance of EventGroup. */

  }, {
    key: "declare",
    value: function declare(event) {
      var declaredEvents = this._parent.__declaredEvents = this._parent.__declaredEvents || {};

      if (typeof event === 'string') {
        declaredEvents[event] = true;
      } else {
        for (var i = 0; i < event.length; i++) {
          declaredEvents[event[i]] = true;
        }
      }
    }
  }], [{
    key: "raise",
    value: function raise( // tslint:disable-next-line:no-any
    target, eventName, // tslint:disable-next-line:no-any
    eventArgs, bubbleEvent) {
      var retVal;

      if (EventGroup._isElement(target)) {
        if (typeof document !== 'undefined' && document.createEvent) {
          var ev = document.createEvent('HTMLEvents');
          ev.initEvent(eventName, bubbleEvent || false, true);
          assign(ev, eventArgs);
          retVal = target.dispatchEvent(ev); // tslint:disable-next-line:no-any
        } else if (typeof document !== 'undefined' && document['createEventObject']) {
          // IE8
          // tslint:disable-next-line:no-any
          var evObj = document['createEventObject'](eventArgs); // cannot set cancelBubble on evObj, fireEvent will overwrite it

          target.fireEvent('on' + eventName, evObj);
        }
      } else {
        while (target && retVal !== false) {
          var events = target.__events__;
          var eventRecords = events ? events[eventName] : null;

          if (eventRecords) {
            for (var id in eventRecords) {
              if (eventRecords.hasOwnProperty(id)) {
                var eventRecordList = eventRecords[id];

                for (var listIndex = 0; retVal !== false && listIndex < eventRecordList.length; listIndex++) {
                  var record = eventRecordList[listIndex];

                  if (record.objectCallback) {
                    retVal = record.objectCallback.call(record.parent, eventArgs);
                  }
                }
              }
            }
          } // If the target has a parent, bubble the event up.


          target = bubbleEvent ? target.parent : null;
        }
      }

      return retVal;
    } // tslint:disable-next-line:no-any

  }, {
    key: "isObserved",
    value: function isObserved(target, eventName) {
      var events = target && target.__events__;
      return !!events && !!events[eventName];
    }
    /** Check to see if the target has declared support of the given event. */
    // tslint:disable-next-line:no-any

  }, {
    key: "isDeclared",
    value: function isDeclared(target, eventName) {
      var declaredEvents = target && target.__declaredEvents;
      return !!declaredEvents && !!declaredEvents[eventName];
    } // tslint:disable-next-line:no-any

  }, {
    key: "stopPropagation",
    value: function stopPropagation(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        // IE8
        event.cancelBubble = true;
      }
    }
  }, {
    key: "_isElement",
    value: function _isElement(target) {
      return !!target && (!!target.addEventListener || typeof HTMLElement !== 'undefined' && target instanceof HTMLElement);
    }
  }]);

  return EventGroup;
}(); // tslint:disable-next-line:no-inferrable-types

EventGroup._uniqueId = 0;

var _scrollbarWidth;

var _bodyScrollDisabledCount = 0;
var DisabledScrollClassName = mergeStyles({
  overflow: 'hidden !important'
});
/**
 * Placing this attribute on scrollable divs optimizes detection to know
 * if the div is scrollable or not (given we can avoid expensive operations
 * like getComputedStyle.)
 *
 * @public
 */

var DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';

var _makeElementScrollAllower = function _makeElementScrollAllower() {
  var _previousClientY = 0;
  var _element = null; // remember the clientY for future calls of _preventOverscrolling

  var _saveClientY = function _saveClientY(event) {
    if (event.targetTouches.length === 1) {
      _previousClientY = event.targetTouches[0].clientY;
    }
  }; // prevent the body from scrolling when the user attempts
  // to scroll past the top or bottom of the element


  var _preventOverscrolling = function _preventOverscrolling(event) {
    // only respond to a single-finger touch
    if (event.targetTouches.length !== 1) {
      return;
    } // prevent the body touchmove handler from firing
    // so that scrolling is allowed within the element


    event.stopPropagation();

    if (!_element) {
      return;
    }

    var clientY = event.targetTouches[0].clientY - _previousClientY;
    var scrollableParent = findScrollableParent(event.target);

    if (scrollableParent) {
      _element = scrollableParent;
    } // if the element is scrolled to the top,
    // prevent the user from scrolling up


    if (_element.scrollTop === 0 && clientY > 0) {
      event.preventDefault();
    } // if the element is scrolled to the bottom,
    // prevent the user from scrolling down


    if (_element.scrollHeight - _element.scrollTop <= _element.clientHeight && clientY < 0) {
      event.preventDefault();
    }
  };

  return function (element, events) {
    if (!element) {
      return;
    }

    events.on(element, 'touchstart', _saveClientY, {
      passive: false
    });
    events.on(element, 'touchmove', _preventOverscrolling, {
      passive: false
    });
    _element = element;
  };
};
/**
 * Allows the user to scroll within a element,
 * while preventing the user from scrolling the body
 */


var allowScrollOnElement = _makeElementScrollAllower();

var _disableIosBodyScroll = function _disableIosBodyScroll(event) {
  event.preventDefault();
};
/**
 * Disables the body scrolling.
 *
 * @public
 */


function disableBodyScroll() {
  var doc = getDocument();

  if (doc && doc.body && !_bodyScrollDisabledCount) {
    doc.body.classList.add(DisabledScrollClassName);
    doc.body.addEventListener('touchmove', _disableIosBodyScroll, {
      passive: false,
      capture: false
    });
  }

  _bodyScrollDisabledCount++;
}
/**
 * Enables the body scrolling.
 *
 * @public
 */

function enableBodyScroll() {
  if (_bodyScrollDisabledCount > 0) {
    var doc = getDocument();

    if (doc && doc.body && _bodyScrollDisabledCount === 1) {
      doc.body.classList.remove(DisabledScrollClassName);
      doc.body.removeEventListener('touchmove', _disableIosBodyScroll);
    }

    _bodyScrollDisabledCount--;
  }
}
/**
 * Calculates the width of a scrollbar for the browser/os.
 *
 * @public
 */

function getScrollbarWidth() {
  if (_scrollbarWidth === undefined) {
    var scrollDiv = document.createElement('div');
    scrollDiv.style.setProperty('width', '100px');
    scrollDiv.style.setProperty('height', '100px');
    scrollDiv.style.setProperty('overflow', 'scroll');
    scrollDiv.style.setProperty('position', 'absolute');
    scrollDiv.style.setProperty('top', '-9999px');
    document.body.appendChild(scrollDiv); // Get the scrollbar width

    _scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth; // Delete the DIV

    document.body.removeChild(scrollDiv);
  }

  return _scrollbarWidth;
}
/**
 * Traverses up the DOM for the element with the data-is-scrollable=true attribute, or returns
 * document.body.
 *
 * @public
 */

function findScrollableParent(startingElement) {
  var el = startingElement;
  var doc = getDocument(startingElement); // First do a quick scan for the scrollable attribute.

  while (el && el !== doc.body) {
    if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
      return el;
    }

    el = el.parentElement;
  } // If we haven't found it, the use the slower method: compute styles to evaluate if overflow is set.


  el = startingElement;

  while (el && el !== doc.body) {
    if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) !== 'false') {
      var computedStyles = getComputedStyle(el);
      var overflowY = computedStyles ? computedStyles.getPropertyValue('overflow-y') : '';

      if (overflowY && (overflowY === 'scroll' || overflowY === 'auto')) {
        return el;
      }
    }

    el = el.parentElement;
  } // Fall back to window scroll.


  if (!el || el === doc.body) {
    // tslint:disable-next-line:no-any
    el = getWindow(startingElement);
  }

  return el;
}

/**
 * Rectangle helper class.
 *
 * @public
 * {@docCategory Rectangle}
 */
var Rectangle =
/*#__PURE__*/
function () {
  function Rectangle() {
    var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var bottom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Rectangle);

    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }
  /**
   * Calculated automatically by subtracting the right from left
   */


  _createClass(Rectangle, [{
    key: "equals",

    /**
     * Tests if another rect is approximately equal to this rect (within 4 decimal places.)
     */
    value: function equals(rect) {
      // I'm fixing it to 4 decimal places because it allows enough precision and will handle cases when something should be rounded,
      // like .999999 should round to 1.
      return parseFloat(this.top.toFixed(4)) === parseFloat(rect.top.toFixed(4)) && parseFloat(this.bottom.toFixed(4)) === parseFloat(rect.bottom.toFixed(4)) && parseFloat(this.left.toFixed(4)) === parseFloat(rect.left.toFixed(4)) && parseFloat(this.right.toFixed(4)) === parseFloat(rect.right.toFixed(4));
    }
  }, {
    key: "width",
    get: function get() {
      return this.right - this.left;
    }
    /**
     * Calculated automatically by subtracting the bottom from top.
     */

  }, {
    key: "height",
    get: function get() {
      return this.bottom - this.top;
    }
  }]);

  return Rectangle;
}();

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
/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @public
 * @param warningCallback - Callback to override the generated warnings.
 */

function setWarningCallback(warningCallback) {
  _warningCallback = warningCallback;
}

/**
 * Warns when props are required if a condition is met.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param requiredProps - The name of the props that are required when the condition is met.
 * @param conditionalPropName - The name of the prop that the condition is based on.
 * @param condition - Whether the condition is met.
 */

function warnConditionallyRequiredProps(componentName, props, requiredProps, conditionalPropName, condition) {
  if (condition === true && "production" !== 'production') {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = requiredProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var requiredPropName = _step.value;

        if (!(requiredPropName in props)) {
          warn("".concat(componentName, " property '").concat(requiredPropName, "' is required when '").concat(conditionalPropName, "' is used.'"));
        }
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
}

/** Reset controlled usage warnings for testing purposes. */


function resetControlledWarnings() {
}
/**
 * Check for and warn on the following error conditions with a form component:
 * - A value prop is provided (indicated it's being used as controlled) without a change handler,
 *    and the component is not read-only
 * - Both the value and defaultValue props are provided
 * - The component is attempting to switch between controlled and uncontrolled
 * - The value or default value are null (unless allowNullValue is set)
 *
 * The messages mimic the warnings React gives for these error conditions on input elements.
 * The warning will only be displayed once per component ID.
 */

function warnControlledUsage(params) {
}

/**
 * Warns when a deprecated props are being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */

function warnDeprecations(componentName, props, deprecationMap) {
}

/**
 * Warns when two props which are mutually exclusive are both being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param exclusiveMap - A map where the key is a parameter, and the value is the other parameter.
 */

function warnMutuallyExclusive(componentName, props, exclusiveMap) {
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

export { Async, Customizations, DATA_IS_SCROLLABLE_ATTRIBUTE, EventGroup, GlobalSettings, IsFocusVisibleClassName, KeyCodes, Position, Rectangle, RectangleEdge, _isSSR, addDirectionalKeyCode, allowScrollOnElement, anchorProperties, assign, audioProperties, baseElementEvents, baseElementProperties, buttonProperties, classNamesFunction, colGroupProperties, colProperties, css, disableBodyScroll, divProperties, doesElementContainFocus, enableBodyScroll, filteredAssign, findScrollableParent, focusAsync, focusFirstChild, formProperties, getDocument, getElementIndexPath, getFirstFocusable, getFirstTabbable, getFocusableByIndexPath, getId, getInitials, getLanguage, getLastFocusable, getLastTabbable, getNativeProps, getNextElement, getPreviousElement, getRTL, getRTLSafeKeyCode, getScrollbarWidth, getWindow, htmlElementProperties, iframeProperties, imageProperties, imgProperties, initializeFocusRects, inputProperties, isDirectionalKeyCode, isElementFocusSubZone, isElementFocusZone, isElementTabbable, isElementVisible, isIE11, labelProperties, liProperties, mapEnumByName, memoize, memoizeFunction, merge, olProperties, on, optionProperties, resetControlledWarnings, resetIds, resetMemoizations, selectProperties, setLanguage, setMemoizeWeakMap, setRTL, setSSR, setWarningCallback, shallowCompare, shouldWrapFocus, tableProperties, tdProperties, textAreaProperties, thProperties, trProperties, values, videoProperties, warn, warnConditionallyRequiredProps, warnControlledUsage, warnDeprecations, warnMutuallyExclusive };
