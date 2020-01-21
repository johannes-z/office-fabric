import 'core-js/modules/es.symbol';
import 'core-js/modules/es.array.filter';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.array.index-of';
import 'core-js/modules/es.object.get-own-property-descriptor';
import 'core-js/modules/es.object.get-own-property-descriptors';
import 'core-js/modules/es.object.keys';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.regexp.to-string';
import 'core-js/modules/web.dom-collections.for-each';
import _defineProperty from '../../../node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/defineProperty';
import { concatStyleSetsWithProps, keyframes, concatStyleSets, mergeStyleSets, mergeStyles } from '@uifabric/merge-styles';
import Vue from 'vue';
import _classCallCheck from '../../../node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '../../../node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass';
import _possibleConstructorReturn from '../../../node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '../../../node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf';
import _inherits from '../../../node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/inherits';
import { __decorate, __metadata } from 'tslib';
import { Prop, Component, Vue as Vue$1, Model, Watch } from 'vue-property-decorator';
import { css, classNamesFunction, memoizeFunction, IsFocusVisibleClassName, getWindow, getScrollbarWidth, Rectangle as Rectangle$1, getRTL, assign, isIE11, RectangleEdge as RectangleEdge$1, Async, getDocument, on, doesElementContainFocus, KeyCodes, getInitials } from '@uifabric-vue/utilities';
import { getTheme, getGlobalClassNames, HighContrastSelector, PulsingBeaconAnimationStyles, getIcon, getFocusStyle, hiddenContentStyle, FontWeights, getScreenSelector, ScreenWidthMaxSmall, ScreenWidthMinMedium, ScreenWidthMaxMedium, ZIndexes, AnimationClassNames, focusClear, getPlaceholderStyles, HighContrastSelectorWhite, normalize, IconFontSizes, ScreenWidthMinLarge, ScreenWidthMinXLarge, ScreenWidthMinUhfMobile, ScreenWidthMinXXLarge, AnimationVariables, HighContrastSelectorBlack, noWrap, createTheme, loadTheme as loadTheme$1 } from '@uifabric/styling';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.mjs';
import 'core-js/modules/es.string.small';
import 'core-js/modules/es.symbol.description';
import 'core-js/modules/es.string.link';
import { MountingPortal } from 'portal-vue';
import 'core-js/modules/es.array.splice';
import 'core-js/modules/es.array.map';
import 'core-js/modules/es.function.name';
import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.number.constructor';
import _objectWithoutProperties from '../../../node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties';
import 'core-js/modules/es.number.to-fixed';
import 'regenerator-runtime/runtime';
import _asyncToGenerator from '../../../node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator';
import 'core-js/modules/es.regexp.exec';
import 'core-js/modules/es.string.replace';
import 'core-js/modules/es.symbol.iterator';
import 'core-js/modules/es.array.slice';
import 'core-js/modules/es.string.iterator';
import 'core-js/modules/web.dom-collections.iterator';
import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';
import 'core-js/modules/es.array.join';
import 'core-js/modules/es.array.find-index';
import 'core-js/modules/es.array.fill';
import 'core-js/modules/es.parse-float';
import { HighContrastSelector as HighContrastSelector$1, getFocusStyle as getFocusStyle$1, FontWeights as FontWeights$1 } from '@uifabric/styling/';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function styled(Component, baseStyles, getProps, customizable, pure) {
  var _styles;

  return Vue.extend({
    functional: true,
    render: function render(h, context) {
      if (!_styles || context.props.styles !== _styles.__cachedInputs__[1] || !!context.props.styles) {
        _styles = function _styles(styleProps) {
          return concatStyleSetsWithProps(styleProps, baseStyles, context.props.styles);
        };

        _styles.__cachedInputs__ = [baseStyles, context.props.styles];
      }

      var additionalProps = getProps ? getProps(this) : undefined;
      return h(Component, _objectSpread({}, context.data, {
        props: _objectSpread({}, additionalProps, {}, context.props, {
          className: context.props.className || context.data.class,
          styles: _styles
        })
      }), context.children);
    }
  });
}

var BaseComponent =
/*#__PURE__*/
function (_Vue) {
  _inherits(BaseComponent, _Vue);

  function BaseComponent() {
    var _this;

    _classCallCheck(this, BaseComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseComponent).apply(this, arguments));
    _this.componentRef = null;
    _this.css = css;
    return _this;
  }

  _createClass(BaseComponent, [{
    key: "mounted",
    value: function mounted() {
      this.componentRef = this.$el;
    }
  }, {
    key: "classNames",
    get: function get() {
      return {};
    }
  }]);

  return BaseComponent;
}(Vue);

__decorate([Prop({
  default: ''
}), __metadata("design:type", String)], BaseComponent.prototype, "className", void 0);

__decorate([Prop({
  type: [Object, Function],
  default: function _default() {}
}), __metadata("design:type", Object)], BaseComponent.prototype, "styles", void 0);

__decorate([Prop({
  type: Object,
  default: function _default() {
    return getTheme();
  }
}), __metadata("design:type", Object)], BaseComponent.prototype, "theme", void 0);

BaseComponent = __decorate([Component], BaseComponent);
var BaseComponent$1 = BaseComponent;

var getClassNames = classNamesFunction();

var Overlay =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Overlay, _BaseComponent);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, _getPrototypeOf(Overlay).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          dark = this.dark;
      return getClassNames(this.styles, {
        theme: theme,
        className: className,
        isDark: dark
      });
    }
  }]);

  return Overlay;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Overlay.prototype, "dark", void 0);

Overlay = __decorate([Component], Overlay);
var script = Overlay;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var GlobalClassNames = {
  root: 'ms-Overlay',
  rootDark: 'ms-Overlay--dark'
};
var getStyles = function getStyles(props) {
  var className = props.className,
      theme = props.theme,
      isNone = props.isNone,
      isDark = props.isDark;
  var palette = theme.palette;
  var classNames = getGlobalClassNames(GlobalClassNames, theme);
  return {
    root: [classNames.root, theme.fonts.medium, {
      backgroundColor: palette.whiteTranslucent40,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      position: 'absolute',
      selectors: _defineProperty({}, HighContrastSelector, {
        border: '1px solid WindowText',
        opacity: 0
      })
    }, isNone && {
      visibility: 'hidden'
    }, isDark && [classNames.rootDark, {
      backgroundColor: palette.blackTranslucent40
    }], className]
  };
};

var Overlay$1 = styled(__vue_component__, getStyles, undefined);

var DEFAULT_PERSONA_SIZE = '32px';
var COMPACT_PERSONA_SIZE = '16px';
var DEFAULT_ICON_SIZE = '16px';
var COMPACT_ICON_SIZE = '13px';
var ANIMATION_INNER_DIMENSION = '4px';
var ANIMATION_OUTER_DIMENSION = '28px';
var ANIMATION_BORDER_WIDTH = '4px';
var getStyles$1 = memoizeFunction(function () {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getTheme();
  var customStyles = arguments.length > 1 ? arguments[1] : undefined;
  var animateBeaconSignal = arguments.length > 2 ? arguments[2] : undefined;
  var beaconColorOne = arguments.length > 3 ? arguments[3] : undefined;
  var beaconColorTwo = arguments.length > 4 ? arguments[4] : undefined;
  var isCompact = arguments.length > 5 ? arguments[5] : undefined;
  var continuousPulse = PulsingBeaconAnimationStyles.continuousPulseAnimationSingle(beaconColorOne || theme.palette.themePrimary, beaconColorTwo || theme.palette.themeTertiary, ANIMATION_INNER_DIMENSION, ANIMATION_OUTER_DIMENSION, ANIMATION_BORDER_WIDTH);
  var fadeIn = keyframes({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });
  var slideIn = keyframes({
    from: {
      transform: 'translateX(-10px)'
    },
    to: {
      transform: 'translateX(0)'
    }
  });
  var continuousPulseAnimation = {
    animationName: continuousPulse,
    animationIterationCount: '1',
    animationDuration: '.8s',
    zIndex: 1
  };
  var slideInAnimation = {
    animationName: slideIn,
    animationIterationCount: '1',
    animationDuration: '.5s'
  };
  var fadeInAnimation = {
    animationName: fadeIn,
    animationIterationCount: '1',
    animationDuration: '.5s'
  };
  var ActivityItemStyles = {
    root: [theme.fonts.small, {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      boxSizing: 'border-box',
      color: theme.palette.neutralSecondary
    }, isCompact && animateBeaconSignal && fadeInAnimation],
    pulsingBeacon: [{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '0px',
      height: '0px',
      borderRadius: '225px',
      borderStyle: 'solid',
      opacity: 0
    }, isCompact && animateBeaconSignal && continuousPulseAnimation],
    isCompactRoot: {
      alignItems: 'center'
    },
    personaContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: DEFAULT_PERSONA_SIZE,
      width: DEFAULT_PERSONA_SIZE,
      height: DEFAULT_PERSONA_SIZE
    },
    isCompactPersonaContainer: {
      display: 'inline-flex',
      flexWrap: 'nowrap',
      flexBasis: 'auto',
      height: COMPACT_PERSONA_SIZE,
      width: 'auto',
      minWidth: '0',
      paddingRight: '6px'
    },
    activityTypeIcon: {
      height: DEFAULT_PERSONA_SIZE,
      fontSize: DEFAULT_ICON_SIZE,
      lineHeight: DEFAULT_ICON_SIZE,
      marginTop: '3px'
    },
    isCompactIcon: {
      height: COMPACT_PERSONA_SIZE,
      minWidth: COMPACT_PERSONA_SIZE,
      fontSize: COMPACT_ICON_SIZE,
      lineHeight: COMPACT_ICON_SIZE,
      color: theme.palette.themePrimary,
      marginTop: '1px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      selectors: {
        '.ms-Persona-imageArea': {
          margin: '-2px 0 0 -2px',
          border: '2px solid' + theme.palette.white,
          borderRadius: '50%',
          selectors: _defineProperty({}, HighContrastSelector, {
            border: 'none',
            margin: '0'
          })
        }
      }
    },
    activityPersona: {
      display: 'block'
    },
    doublePersona: {
      selectors: {
        ':first-child': {
          alignSelf: 'flex-end'
        }
      }
    },
    isCompactPersona: {
      display: 'inline-block',
      width: '8px',
      minWidth: '8px',
      overflow: 'visible'
    },
    activityContent: [{
      padding: '0 8px'
    }, isCompact && animateBeaconSignal && slideInAnimation],
    activityText: {
      display: 'inline'
    },
    isCompactContent: {
      flex: '1',
      padding: '0 4px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflowX: 'hidden'
    },
    commentText: {
      color: theme.palette.neutralPrimary
    },
    timeStamp: [theme.fonts.tiny, {
      fontWeight: 400,
      color: theme.palette.neutralSecondary
    }],
    isCompactTimeStamp: {
      display: 'inline-block',
      paddingLeft: '0.3em',
      fontSize: '1em'
    }
  };
  return concatStyleSets(ActivityItemStyles, customStyles);
});

var getClassNames$1 = classNamesFunction();

var ActivityItem =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ActivityItem, _BaseComponent);

  function ActivityItem() {
    _classCallCheck(this, ActivityItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActivityItem).apply(this, arguments));
  }

  _createClass(ActivityItem, [{
    key: "classNames",
    get: function get() {
      var className = this.className,
          activityPersonas = this.activityPersonas,
          animateBeaconSignal = this.animateBeaconSignal,
          beaconColorOne = this.beaconColorOne,
          beaconColorTwo = this.beaconColorTwo,
          isCompact = this.isCompact;
      return getClassNames$1(function () {
        return getStyles$1(undefined, undefined, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact);
      }, {});
    }
  }]);

  return ActivityItem;
}(BaseComponent$1);

__decorate([Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), __metadata("design:type", Array)], ActivityItem.prototype, "activityPersonas", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], ActivityItem.prototype, "animateBeaconSignal", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], ActivityItem.prototype, "beaconColorOne", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], ActivityItem.prototype, "beaconColorTwo", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], ActivityItem.prototype, "isCompact", void 0);

ActivityItem = __decorate([Component], ActivityItem);
var script$1 = ActivityItem;

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.activityTypeIcon
  }, [_vm._t("icon")], 2), _vm._v(" "), _c('div', {
    class: _vm.classNames.activityContent
  }, [_c('span', {
    class: _vm.classNames.activityText
  }, [_vm._t("description")], 2), _vm._v(" "), _c('div', {
    class: _vm.classNames.commentText
  }, [_vm._t("comments")], 2), _vm._v(" "), _c('div', {
    class: _vm.classNames.timeStamp
  }, [_vm._t("timeStamp")], 2)])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = __vue_normalize__({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var ButtonGlobalClassNames = {
  msButton: 'ms-Button',
  msButtonHasMenu: 'ms-Button--hasMenu',
  msButtonIcon: 'ms-Button-icon',
  msButtonMenuIcon: 'ms-Button-menuIcon',
  msButtonLabel: 'ms-Button-label',
  msButtonDescription: 'ms-Button-description',
  msButtonScreenReaderText: 'ms-Button-screenReaderText',
  msButtonFlexContainer: 'ms-Button-flexContainer',
  msButtonTextContainer: 'ms-Button-textContainer'
};
var getBaseButtonClassNames = memoizeFunction(function (theme, styles, className, variantClassName, iconClassName, menuIconClassName, disabled, hasMenu, checked, expanded, isSplit) {
  var _selectors, _selectors2;

  var classNames = getGlobalClassNames(ButtonGlobalClassNames, theme || {});
  var isExpanded = expanded && !isSplit;
  return mergeStyleSets({
    root: [classNames.msButton, styles.root, variantClassName, checked && ['is-checked', styles.rootChecked], isExpanded && ['is-expanded', styles.rootExpanded, {
      selectors: (_selectors = {}, _defineProperty(_selectors, ":hover .".concat(classNames.msButtonIcon), styles.iconExpandedHovered), _defineProperty(_selectors, ":hover .".concat(classNames.msButtonMenuIcon), styles.menuIconExpandedHovered || styles.rootExpandedHovered), _defineProperty(_selectors, ':hover', styles.rootExpandedHovered), _selectors)
    }], hasMenu && [ButtonGlobalClassNames.msButtonHasMenu, styles.rootHasMenu], disabled && ['is-disabled', styles.rootDisabled], !disabled && !isExpanded && !checked && {
      selectors: (_selectors2 = {
        ':hover': styles.rootHovered
      }, _defineProperty(_selectors2, ":hover .".concat(classNames.msButtonLabel), styles.labelHovered), _defineProperty(_selectors2, ":hover .".concat(classNames.msButtonIcon), styles.iconHovered), _defineProperty(_selectors2, ":hover .".concat(classNames.msButtonDescription), styles.descriptionHovered), _defineProperty(_selectors2, ":hover .".concat(classNames.msButtonMenuIcon), styles.menuIconHovered), _defineProperty(_selectors2, ':focus', styles.rootFocused), _defineProperty(_selectors2, ':active', styles.rootPressed), _defineProperty(_selectors2, ":active .".concat(classNames.msButtonIcon), styles.iconPressed), _defineProperty(_selectors2, ":active .".concat(classNames.msButtonDescription), styles.descriptionPressed), _defineProperty(_selectors2, ":active .".concat(classNames.msButtonMenuIcon), styles.menuIconPressed), _selectors2)
    }, disabled && checked && [styles.rootCheckedDisabled], !disabled && checked && {
      selectors: {
        ':hover': styles.rootCheckedHovered,
        ':active': styles.rootCheckedPressed
      }
    }, className],
    flexContainer: [classNames.msButtonFlexContainer, styles.flexContainer],
    textContainer: [classNames.msButtonTextContainer, styles.textContainer],
    icon: [classNames.msButtonIcon, iconClassName, styles.icon, isExpanded && styles.iconExpanded, checked && styles.iconChecked, disabled && styles.iconDisabled],
    label: [classNames.msButtonLabel, styles.label, checked && styles.labelChecked, disabled && styles.labelDisabled],
    menuIcon: [classNames.msButtonMenuIcon, menuIconClassName, styles.menuIcon, checked && styles.menuIconChecked, disabled && !isSplit && styles.menuIconDisabled, !disabled && !isExpanded && !checked && {
      selectors: {
        ':hover': styles.menuIconHovered,
        ':active': styles.menuIconPressed
      }
    }, isExpanded && ['is-expanded', styles.menuIconExpanded]],
    description: [classNames.msButtonDescription, styles.description, checked && styles.descriptionChecked, disabled && styles.descriptionDisabled],
    screenReaderText: [classNames.msButtonScreenReaderText, styles.screenReaderText]
  });
});

var StatelessComponent =
/*#__PURE__*/
function (_Vue) {
  _inherits(StatelessComponent, _Vue);

  function StatelessComponent() {
    var _this;

    _classCallCheck(this, StatelessComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StatelessComponent).apply(this, arguments));
    _this.css = css;
    return _this;
  }

  return StatelessComponent;
}(Vue);

__decorate([Prop({
  default: ''
}), __metadata("design:type", String)], StatelessComponent.prototype, "className", void 0);

__decorate([Prop({
  type: [Object, Function],
  default: function _default() {}
}), __metadata("design:type", Object)], StatelessComponent.prototype, "styles", void 0);

__decorate([Prop({
  type: Object,
  default: function _default() {
    return getTheme();
  }
}), __metadata("design:type", Object)], StatelessComponent.prototype, "theme", void 0);

StatelessComponent = __decorate([Component({
  // @ts-ignore
  functional: true
})], StatelessComponent);
var StatelessComponent$1 = StatelessComponent;

var getIconContent = memoizeFunction(function (iconName) {
  var _ref = getIcon(iconName) || {
    subset: {},
    code: undefined
  },
      code = _ref.code,
      subset = _ref.subset;

  if (!code) {
    return null;
  }

  return {
    children: code,
    iconClassName: subset.className,
    fontFamily: subset.fontFace && subset.fontFace.fontFamily
  };
}, undefined, // @ts-ignore
true);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var getClassNames$2 = classNamesFunction({
  disableCaching: true
});

var Icon =
/*#__PURE__*/
function (_StatelessComponent) {
  _inherits(Icon, _StatelessComponent);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, _getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: "render",
    value: function render(h, context) {
      var _context$props = context.props,
          className = _context$props.className,
          iconName = _context$props.iconName,
          theme = _context$props.theme,
          styles = _context$props.styles;
      var isPlaceholder = typeof iconName === 'string' && iconName.length === 0;
      var isImage = !!context.props.imageProps;
      var iconContent = getIconContent(iconName) || {};
      var iconClassName = iconContent.iconClassName,
          children = iconContent.children;
      var classNames = getClassNames$2(styles, {
        theme: theme,
        className: className,
        iconClassName: iconClassName,
        isImage: isImage,
        isPlaceholder: isPlaceholder
      });
      var RootType = isImage ? 'span' : 'i';
      return h(RootType, _objectSpread$1({}, context.data, {
        class: classNames.root,
        attrs: {
          'aria-hidden': 'true',
          'data-icon-name': iconName
        }
      }), children);
    }
  }]);

  return Icon;
}(StatelessComponent$1);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Icon.prototype, "iconName", void 0);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], Icon.prototype, "imageProps", void 0);

Icon = __decorate([Component], Icon);
var IconBase = Icon;

/** Class names used in themeable and non-themeable Icon components */

var classNames = mergeStyleSets({
  root: {
    display: 'inline-block'
  },
  placeholder: ['ms-Icon-placeHolder', {
    width: '1em'
  }],
  image: ['ms-Icon-imageContainer', {
    overflow: 'hidden'
  }]
});
var getStyles$2 = function getStyles(props) {
  var className = props.className,
      iconClassName = props.iconClassName,
      isPlaceholder = props.isPlaceholder,
      isImage = props.isImage,
      styles = props.styles;
  return {
    root: [isPlaceholder && classNames.placeholder, classNames.root, isImage && classNames.image, iconClassName, className, styles && styles.root, styles && styles.imageContainer]
  };
};

var Icon$1 = styled(IconBase, getStyles$2, undefined);

/* ms */

var BaseButton =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(BaseButton, _BaseComponent);

  function BaseButton() {
    _classCallCheck(this, BaseButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(BaseButton).apply(this, arguments));
  }

  _createClass(BaseButton, [{
    key: "component",
    get: function get() {
      var disabled = this.disabled,
          href = this.href;
      var renderAsAnchor = !disabled && !!href;
      return renderAsAnchor ? 'a' : 'button';
    }
  }, {
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          styles = this.styles,
          className = this.className,
          iconProps = this.iconProps,
          variantClassName = this.variantClassName,
          disabled = this.disabled,
          checked = this.checked;
      return getBaseButtonClassNames(theme, styles, className, variantClassName, iconProps && iconProps.className, undefined, disabled, false, checked, false, false);
    }
  }]);

  return BaseButton;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], BaseButton.prototype, "href", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], BaseButton.prototype, "checked", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], BaseButton.prototype, "disabled", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], BaseButton.prototype, "variantClassName", void 0);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], BaseButton.prototype, "iconProps", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], BaseButton.prototype, "secondaryText", void 0);

BaseButton = __decorate([Component({
  components: {
    Icon: Icon$1
  }
})], BaseButton);
var script$2 = BaseButton;

var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.component, {
    tag: "component",
    class: _vm.classNames.root,
    attrs: {
      "href": _vm.href
    }
  }, [_c('span', {
    class: _vm.classNames.flexContainer
  }, [_vm.iconProps ? _c('Icon', _vm._b({
    class: _vm.css(_vm.classNames.icon, _vm.className)
  }, 'Icon', _vm.iconProps, false)) : _vm._e(), _vm._v(" "), _vm.$slots.default ? _c('span', {
    class: _vm.classNames.textContainer
  }, [_c('span', {
    class: _vm.classNames.label
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.secondaryText ? _c('span', {
    class: _vm.classNames.description
  }, [_vm._v("\n        " + _vm._s(_vm.secondaryText) + "\n      ")]) : _vm._e()]) : _vm._e()], 1)]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = __vue_normalize__({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

var noOutline = {
  outline: 0
};

var iconStyle = function iconStyle(fontSize) {
  return {
    fontSize: fontSize,
    margin: '0 4px',
    height: '16px',
    lineHeight: '16px',
    textAlign: 'center',
    verticalAlign: 'middle',
    flexShrink: 0
  };
};
/**
 * Gets the base button styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */


var getStyles$3 = memoizeFunction(function (theme) {
  var semanticColors = theme.semanticColors,
      effects = theme.effects,
      fonts = theme.fonts;
  var border = semanticColors.buttonBorder;
  var disabledBackground = semanticColors.disabledBackground;
  var disabledText = semanticColors.disabledText;
  var buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    border: 'none',
    outlineColor: 'ButtonText'
  };
  return {
    root: [getFocusStyle(theme, {
      inset: 1,
      highContrastStyle: buttonHighContrastFocus,
      borderColor: 'transparent'
    }), theme.fonts.medium, {
      boxSizing: 'border-box',
      border: '1px solid ' + border,
      userSelect: 'none',
      display: 'inline-block',
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      verticalAlign: 'top',
      padding: '0 16px',
      borderRadius: effects.roundedCorner2,
      selectors: {
        // IE11 workaround for preventing shift of child elements of a button when active.
        ':active > *': {
          position: 'relative',
          left: 0,
          top: 0
        }
      }
    }],
    rootDisabled: [getFocusStyle(theme, {
      inset: 1,
      highContrastStyle: buttonHighContrastFocus,
      borderColor: 'transparent'
    }), {
      backgroundColor: disabledBackground,
      borderColor: disabledBackground,
      color: disabledText,
      cursor: 'default',
      pointerEvents: 'none',
      selectors: _defineProperty({
        ':hover': noOutline,
        ':focus': noOutline
      }, HighContrastSelector, {
        color: 'grayText',
        borderColor: 'grayText'
      })
    }],
    iconDisabled: {
      color: disabledText
    },
    menuIconDisabled: {
      color: disabledText
    },
    flexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    description: {
      display: 'block'
    },
    textContainer: {
      flexGrow: 1,
      display: 'block'
    },
    icon: iconStyle(fonts.mediumPlus.fontSize),
    menuIcon: iconStyle(fonts.small.fontSize),
    label: {
      margin: '0 4px',
      lineHeight: '100%',
      display: 'block'
    },
    screenReaderText: hiddenContentStyle
  };
});

var DEFAULT_BUTTON_HEIGHT = '40px';
var DEFAULT_PADDING = '0 4px';
var getStyles$4 = memoizeFunction(function (theme, customStyles) {
  var baseButtonStyles = getStyles$3(theme);
  var actionButtonStyles = {
    root: {
      padding: DEFAULT_PADDING,
      height: DEFAULT_BUTTON_HEIGHT,
      color: theme.palette.neutralPrimary,
      backgroundColor: 'transparent',
      border: '1px solid transparent'
    },
    rootHovered: {
      color: theme.palette.themePrimary,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'Highlight',
        color: 'Highlight'
      })
    },
    iconHovered: {
      color: theme.palette.themePrimary
    },
    rootPressed: {
      color: theme.palette.black
    },
    rootExpanded: {
      color: theme.palette.themePrimary
    },
    iconPressed: {
      color: theme.palette.themeDarker
    },
    rootDisabled: {
      color: theme.palette.neutralTertiary,
      backgroundColor: 'transparent',
      borderColor: 'transparent'
    },
    rootChecked: {
      color: theme.palette.black
    },
    iconChecked: {
      color: theme.palette.themeDarker
    },
    flexContainer: {
      justifyContent: 'flex-start'
    },
    icon: {
      color: theme.palette.themeDarkAlt
    },
    iconDisabled: {
      color: 'inherit'
    },
    menuIcon: {
      color: theme.palette.neutralSecondary
    },
    textContainer: {
      flexGrow: 0
    }
  };
  return concatStyleSets(baseButtonStyles, actionButtonStyles, customStyles);
});

var ActionButton =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ActionButton, _BaseComponent);

  function ActionButton() {
    _classCallCheck(this, ActionButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActionButton).apply(this, arguments));
  }

  _createClass(ActionButton, [{
    key: "internalStyles",
    get: function get() {
      var theme = this.theme;
      var styles = {};
      return getStyles$4(theme, styles);
    }
  }]);

  return ActionButton;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], ActionButton.prototype, "href", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], ActionButton.prototype, "disabled", void 0);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], ActionButton.prototype, "iconProps", void 0);

ActionButton = __decorate([Component({
  components: {
    BaseButton: __vue_component__$2
  }
})], ActionButton);
var script$3 = ActionButton;

/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('BaseButton', _vm._b({
    attrs: {
      "variant-class-name": "ms-Button--action ms-Button--command",
      "styles": _vm.internalStyles
    }
  }, 'BaseButton', [_vm.$attrs, _vm.$listeners, _vm.$props], false), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = __vue_normalize__({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

var getStyles$5 = memoizeFunction(function (theme, customStyles, focusInset, focusColor) {
  var _selectors2, _selectors3, _selectors4, _selectors5, _selectors6, _selectors9;

  var baseButtonStyles = getStyles$3(theme);
  var baseSplitButtonStyles = {}; // getSplitButtonStyles(theme)

  var p = theme.palette,
      semanticColors = theme.semanticColors;
  var commandButtonHighContrastFocus = {
    left: 4,
    top: 4,
    bottom: 4,
    right: 4,
    border: 'none'
  };
  var commandButtonStyles = {
    root: [getFocusStyle(theme, {
      inset: 2,
      highContrastStyle: commandButtonHighContrastFocus,
      borderColor: 'transparent'
    }), theme.fonts.medium, {
      minWidth: '40px',
      backgroundColor: p.white,
      color: p.neutralPrimary,
      padding: '0 4px',
      border: 'none',
      borderRadius: 0,
      selectors: _defineProperty({}, HighContrastSelector, {
        border: 'none'
      })
    }],
    rootHovered: {
      backgroundColor: p.neutralLighter,
      color: p.neutralDark,
      selectors: (_selectors2 = {}, _defineProperty(_selectors2, HighContrastSelector, {
        color: 'Highlight'
      }), _defineProperty(_selectors2, ".".concat(ButtonGlobalClassNames.msButtonIcon), {
        color: p.themeDarkAlt
      }), _defineProperty(_selectors2, ".".concat(ButtonGlobalClassNames.msButtonMenuIcon), {
        color: p.neutralPrimary
      }), _selectors2)
    },
    rootPressed: {
      backgroundColor: p.neutralLight,
      color: p.neutralDark,
      selectors: (_selectors3 = {}, _defineProperty(_selectors3, ".".concat(ButtonGlobalClassNames.msButtonIcon), {
        color: p.themeDark
      }), _defineProperty(_selectors3, ".".concat(ButtonGlobalClassNames.msButtonMenuIcon), {
        color: p.neutralPrimary
      }), _selectors3)
    },
    rootChecked: {
      backgroundColor: p.neutralLight,
      color: p.neutralDark,
      selectors: (_selectors4 = {}, _defineProperty(_selectors4, ".".concat(ButtonGlobalClassNames.msButtonIcon), {
        color: p.themeDark
      }), _defineProperty(_selectors4, ".".concat(ButtonGlobalClassNames.msButtonMenuIcon), {
        color: p.neutralPrimary
      }), _selectors4)
    },
    rootCheckedHovered: {
      backgroundColor: p.neutralQuaternaryAlt,
      selectors: (_selectors5 = {}, _defineProperty(_selectors5, ".".concat(ButtonGlobalClassNames.msButtonIcon), {
        color: p.themeDark
      }), _defineProperty(_selectors5, ".".concat(ButtonGlobalClassNames.msButtonMenuIcon), {
        color: p.neutralPrimary
      }), _selectors5)
    },
    rootExpanded: {
      backgroundColor: p.neutralLight,
      color: p.neutralDark,
      selectors: (_selectors6 = {}, _defineProperty(_selectors6, ".".concat(ButtonGlobalClassNames.msButtonIcon), {
        color: p.themeDark
      }), _defineProperty(_selectors6, ".".concat(ButtonGlobalClassNames.msButtonMenuIcon), {
        color: p.neutralPrimary
      }), _selectors6)
    },
    rootExpandedHovered: {
      backgroundColor: p.neutralQuaternaryAlt
    },
    rootDisabled: {
      backgroundColor: p.white,
      selectors: _defineProperty({}, ".".concat(ButtonGlobalClassNames.msButtonIcon), {
        color: semanticColors.disabledBodySubtext
      })
    },
    // Split button styles
    splitButtonContainer: {
      height: '100%',
      selectors: _defineProperty({}, HighContrastSelector, {
        border: 'none'
      })
    },
    splitButtonDivider: {
      backgroundColor: p.neutralTertiaryAlt
    },
    splitButtonMenuButton: {
      backgroundColor: p.white,
      border: 'none',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      color: p.neutralSecondary,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralLighter,
          color: p.neutralDark,
          selectors: (_selectors9 = {}, _defineProperty(_selectors9, HighContrastSelector, {
            color: 'Highlight'
          }), _defineProperty(_selectors9, ".".concat(ButtonGlobalClassNames.msButtonIcon), {
            color: p.neutralPrimary
          }), _selectors9)
        },
        ':active': {
          backgroundColor: p.neutralLight,
          selectors: _defineProperty({}, ".".concat(ButtonGlobalClassNames.msButtonIcon), {
            color: p.neutralPrimary
          })
        }
      }
    },
    splitButtonMenuButtonDisabled: {
      backgroundColor: p.white
    },
    splitButtonMenuButtonChecked: {
      backgroundColor: p.neutralLight,
      color: p.neutralDark,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralQuaternaryAlt
        }
      }
    },
    splitButtonMenuButtonExpanded: {
      backgroundColor: p.neutralLight,
      color: p.black,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralQuaternaryAlt
        }
      }
    },
    splitButtonMenuIcon: {
      color: p.neutralPrimary
    },
    splitButtonMenuIconDisabled: {
      color: p.neutralTertiary
    },
    label: {
      fontWeight: 'normal'
    },
    icon: {
      color: p.themePrimary
    },
    menuIcon: {
      color: p.neutralSecondary
    }
  };
  return concatStyleSets(baseButtonStyles, baseSplitButtonStyles, commandButtonStyles, customStyles);
});

var CommandBarButton =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(CommandBarButton, _BaseComponent);

  function CommandBarButton() {
    _classCallCheck(this, CommandBarButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(CommandBarButton).apply(this, arguments));
  }

  _createClass(CommandBarButton, [{
    key: "internalStyles",
    get: function get() {
      var theme = this.theme;
      var styles = {};
      return getStyles$5(theme, styles);
    }
  }]);

  return CommandBarButton;
}(BaseComponent$1);

CommandBarButton = __decorate([Component({
  components: {
    BaseButton: __vue_component__$2
  }
})], CommandBarButton);
var script$4 = CommandBarButton;

/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('BaseButton', _vm._b({
    attrs: {
      "variant-class-name": "ms-Button--commandBar",
      "styles": _vm.internalStyles
    }
  }, 'BaseButton', [_vm.$attrs, _vm.$props], false), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = __vue_normalize__({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var splitButtonDividerBaseStyles = function splitButtonDividerBaseStyles() {
  return {
    position: 'absolute',
    width: 1,
    right: 31,
    top: 8,
    bottom: 8
  };
};

function standardStyles(theme) {
  var s = theme.semanticColors,
      p = theme.palette;
  var buttonBackground = s.buttonBackground;
  var buttonBackgroundPressed = s.buttonBackgroundPressed;
  var buttonBackgroundHovered = s.buttonBackgroundHovered;
  var buttonText = s.buttonText;
  var buttonTextHovered = s.buttonTextHovered;
  var buttonTextChecked = s.buttonTextChecked;
  var buttonTextCheckedHovered = s.buttonTextCheckedHovered;
  return {
    root: {
      backgroundColor: buttonBackground,
      color: buttonText
    },
    rootHovered: {
      backgroundColor: buttonBackgroundHovered,
      color: buttonTextHovered,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'Highlight',
        color: 'Highlight'
      })
    },
    rootPressed: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked
    },
    rootExpanded: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked
    },
    rootChecked: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked
    },
    rootCheckedHovered: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextCheckedHovered
    },
    rootDisabled: {
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'GrayText',
        borderColor: 'GrayText',
        backgroundColor: 'Window'
      })
    },
    // Split button styles
    splitButtonContainer: {
      selectors: _defineProperty({}, HighContrastSelector, {
        border: 'none'
      })
    },
    splitButtonMenuButton: {
      color: p.white,
      backgroundColor: 'transparent',
      selectors: {
        ':hover': {
          backgroundColor: p.neutralLight,
          selectors: _defineProperty({}, HighContrastSelector, {
            color: 'Highlight'
          })
        }
      }
    },
    splitButtonMenuButtonDisabled: {
      backgroundColor: s.buttonBackgroundDisabled,
      selectors: {
        ':hover': {
          backgroundColor: s.buttonBackgroundDisabled
        }
      }
    },
    splitButtonDivider: _objectSpread$2({}, splitButtonDividerBaseStyles(), {
      backgroundColor: p.neutralTertiaryAlt,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'WindowText'
      })
    }),
    splitButtonDividerDisabled: {
      backgroundColor: theme.palette.neutralTertiaryAlt
    },
    splitButtonMenuButtonChecked: {
      backgroundColor: p.neutralQuaternaryAlt,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralQuaternaryAlt
        }
      }
    },
    splitButtonMenuButtonExpanded: {
      backgroundColor: p.neutralQuaternaryAlt,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralQuaternaryAlt
        }
      }
    },
    splitButtonMenuIcon: {
      color: s.buttonText
    },
    splitButtonMenuIconDisabled: {
      color: s.buttonTextDisabled
    }
  };
}
function primaryStyles(theme) {
  var _selectors6, _selectors13;

  var p = theme.palette,
      s = theme.semanticColors;
  return {
    root: {
      backgroundColor: s.primaryButtonBackground,
      color: s.primaryButtonText,
      border: "1px solid ".concat(s.primaryButtonBackground),
      selectors: (_selectors6 = {}, _defineProperty(_selectors6, HighContrastSelector, {
        color: 'Window',
        backgroundColor: 'WindowText',
        MsHighContrastAdjust: 'none'
      }), _defineProperty(_selectors6, ".".concat(IsFocusVisibleClassName, " &:focus"), {
        selectors: {
          ':after': {
            border: "none",
            outlineColor: p.white
          }
        }
      }), _selectors6)
    },
    rootHovered: {
      backgroundColor: s.primaryButtonBackgroundHovered,
      color: s.primaryButtonTextHovered,
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'Window',
        backgroundColor: 'Highlight'
      })
    },
    rootPressed: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed,
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'Window',
        backgroundColor: 'WindowText',
        MsHighContrastAdjust: 'none'
      })
    },
    rootExpanded: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed
    },
    rootChecked: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed
    },
    rootCheckedHovered: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed
    },
    rootDisabled: {
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'GrayText',
        borderColor: 'GrayText',
        backgroundColor: 'Window'
      })
    },
    // Split button styles
    splitButtonContainer: {
      selectors: _defineProperty({}, HighContrastSelector, {
        border: 'none'
      })
    },
    splitButtonDivider: _objectSpread$2({}, splitButtonDividerBaseStyles(), {
      backgroundColor: p.white,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'Window'
      })
    }),
    splitButtonMenuButton: {
      backgroundColor: s.primaryButtonBackground,
      color: s.primaryButtonText,
      selectors: (_selectors13 = {}, _defineProperty(_selectors13, HighContrastSelector, {
        backgroundColor: 'WindowText'
      }), _defineProperty(_selectors13, ':hover', {
        backgroundColor: s.primaryButtonBackgroundHovered,
        selectors: _defineProperty({}, HighContrastSelector, {
          color: 'Highlight'
        })
      }), _selectors13)
    },
    splitButtonMenuButtonDisabled: {
      backgroundColor: s.primaryButtonBackgroundDisabled,
      selectors: {
        ':hover': {
          backgroundColor: s.primaryButtonBackgroundDisabled
        }
      }
    },
    splitButtonMenuButtonChecked: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      selectors: {
        ':hover': {
          backgroundColor: s.primaryButtonBackgroundPressed
        }
      }
    },
    splitButtonMenuButtonExpanded: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      selectors: {
        ':hover': {
          backgroundColor: s.primaryButtonBackgroundPressed
        }
      }
    },
    splitButtonMenuIcon: {
      color: s.primaryButtonText
    },
    splitButtonMenuIconDisabled: {
      color: p.neutralTertiary,
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'GrayText'
      })
    }
  };
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var getStyles$6 = memoizeFunction(function (theme, customStyles) {
  var effects = theme.effects,
      palette = theme.palette;
  var buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    border: 'none'
  };
  var splitButtonDividerBaseStyles = {
    position: 'absolute',
    width: 1,
    right: 31,
    top: 8,
    bottom: 8
  };
  var splitButtonStyles = {
    splitButtonContainer: [getFocusStyle(theme, {
      highContrastStyle: buttonHighContrastFocus,
      inset: 2
    }), {
      display: 'inline-flex',
      selectors: {
        '.ms-Button--default': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
          borderRight: 'none'
        },
        '.ms-Button--primary': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
          border: 'none',
          selectors: _defineProperty({}, HighContrastSelector, {
            color: 'Window',
            backgroundColor: 'WindowText',
            MsHighContrastAdjust: 'none'
          })
        },
        '.ms-Button--primary + .ms-Button': {
          border: 'none'
        }
      }
    }],
    splitButtonContainerHovered: {
      selectors: {
        '.ms-Button--primary': {
          selectors: _defineProperty({}, HighContrastSelector, {
            color: 'Window',
            backgroundColor: 'Highlight'
          })
        },
        '.ms-Button.is-disabled': {
          selectors: _defineProperty({}, HighContrastSelector, {
            color: 'GrayText',
            borderColor: 'GrayText',
            backgroundColor: 'Window'
          })
        }
      }
    },
    splitButtonContainerChecked: {
      selectors: {
        '.ms-Button--primary': {
          selectors: _defineProperty({}, HighContrastSelector, {
            color: 'Window',
            backgroundColor: 'WindowText',
            MsHighContrastAdjust: 'none'
          })
        }
      }
    },
    splitButtonContainerCheckedHovered: {
      selectors: {
        '.ms-Button--primary': {
          selectors: _defineProperty({}, HighContrastSelector, {
            color: 'Window',
            backgroundColor: 'WindowText',
            MsHighContrastAdjust: 'none'
          })
        }
      }
    },
    splitButtonContainerFocused: {
      outline: 'none!important'
    },
    splitButtonMenuButton: {
      padding: 6,
      height: 'auto',
      boxSizing: 'border-box',
      borderRadius: 0,
      borderTopRightRadius: effects.roundedCorner2,
      borderBottomRightRadius: effects.roundedCorner2,
      border: "1px solid ".concat(palette.neutralSecondaryAlt),
      borderLeft: 'none',
      outline: 'transparent',
      userSelect: 'none',
      display: 'inline-block',
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      verticalAlign: 'top',
      width: 32,
      marginLeft: -1,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0
    },
    splitButtonDivider: _objectSpread$3({}, splitButtonDividerBaseStyles, {
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'WindowText'
      })
    }),
    splitButtonDividerDisabled: _objectSpread$3({}, splitButtonDividerBaseStyles, {
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'GrayText'
      })
    }),
    splitButtonMenuButtonDisabled: {
      pointerEvents: 'none',
      border: 'none',
      selectors: _defineProperty({
        ':hover': {
          cursor: 'default'
        },
        '.ms-Button--primary': {
          selectors: _defineProperty({}, HighContrastSelector, {
            color: 'GrayText',
            borderColor: 'GrayText',
            backgroundColor: 'Window'
          })
        }
      }, HighContrastSelector, {
        border: "1px solid GrayText",
        color: 'GrayText',
        backgroundColor: 'Window'
      })
    },
    splitButtonFlexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    splitButtonContainerDisabled: {
      outline: 'none',
      border: 'none',
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'GrayText',
        borderColor: 'GrayText',
        backgroundColor: 'Window'
      })
    }
  };
  return concatStyleSets(splitButtonStyles, customStyles);
});

var getStyles$7 = memoizeFunction(function (theme, customStyles, primary) {
  var fonts = theme.fonts,
      palette = theme.palette;
  var baseButtonStyles = getStyles$3(theme);
  var splitButtonStyles = getStyles$6(theme);
  var compoundButtonStyles = {
    root: {
      maxWidth: '280px',
      minHeight: '72px',
      height: 'auto',
      padding: '16px 12px'
    },
    flexContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      minWidth: '100%',
      margin: ''
    },
    textContainer: {
      textAlign: 'left'
    },
    icon: {
      fontSize: '2em',
      lineHeight: '1em',
      height: '1em',
      margin: '0px 8px 0px 0px',
      flexBasis: '1em',
      flexShrink: '0'
    },
    label: {
      margin: '0 0 5px',
      lineHeight: '100%',
      fontWeight: FontWeights.semibold
    },
    description: [fonts.small, {
      lineHeight: '100%'
    }]
  };
  var standardCompoundTheme = {
    description: {
      color: palette.neutralSecondary
    },
    descriptionHovered: {
      color: palette.neutralDark
    },
    descriptionPressed: {
      color: 'inherit'
    },
    descriptionChecked: {
      color: 'inherit'
    },
    descriptionDisabled: {
      color: 'inherit'
    }
  };
  var primaryCompoundTheme = {
    description: {
      color: palette.white,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'WindowText',
        color: 'Window',
        MsHighContrastAdjust: 'none'
      })
    },
    descriptionHovered: {
      color: palette.white,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'Highlight',
        color: 'Window'
      })
    },
    descriptionPressed: {
      color: 'inherit',
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'Window',
        backgroundColor: 'WindowText',
        MsHighContrastAdjust: 'none'
      })
    },
    descriptionChecked: {
      color: 'inherit',
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'Window',
        backgroundColor: 'WindowText',
        MsHighContrastAdjust: 'none'
      })
    },
    descriptionDisabled: {
      color: 'inherit',
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'inherit'
      })
    }
  }; // @ts-ignore

  return concatStyleSets(baseButtonStyles, compoundButtonStyles, primary ? primaryStyles(theme) : standardStyles(theme), primary ? primaryCompoundTheme : standardCompoundTheme, splitButtonStyles, customStyles);
});

var CompoundButton =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(CompoundButton, _BaseComponent);

  function CompoundButton() {
    _classCallCheck(this, CompoundButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(CompoundButton).apply(this, arguments));
  }

  _createClass(CompoundButton, [{
    key: "internalStyles",
    get: function get() {
      var _this$primary = this.primary,
          primary = _this$primary === void 0 ? false : _this$primary,
          theme = this.theme;
      var styles = {};
      return getStyles$7(theme, styles, primary);
    }
  }]);

  return CompoundButton;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], CompoundButton.prototype, "primary", void 0);

CompoundButton = __decorate([Component({
  components: {
    BaseButton: __vue_component__$2
  }
})], CompoundButton);
var script$5 = CompoundButton;

/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('BaseButton', _vm._b({
    attrs: {
      "variant-class-name": _vm.primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
      "styles": _vm.internalStyles
    }
  }, 'BaseButton', [_vm.$attrs, _vm.$props], false), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = "data-v-4650eb6b";
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = __vue_normalize__({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

// import { IButtonStyles } from '../Button.types'
var DEFAULT_BUTTON_HEIGHT$1 = '32px';
var DEFAULT_BUTTON_MIN_WIDTH = '80px';
var getStyles$8 = memoizeFunction(function (theme, customStyles, primary) {
  var baseButtonStyles = getStyles$3(theme);
  var splitButtonStyles = getStyles$6(theme);
  var defaultButtonStyles = {
    root: {
      minWidth: DEFAULT_BUTTON_MIN_WIDTH,
      height: DEFAULT_BUTTON_HEIGHT$1
    },
    label: {
      fontWeight: FontWeights.semibold
    }
  };
  return concatStyleSets(baseButtonStyles, defaultButtonStyles, primary ? primaryStyles(theme) : standardStyles(theme), splitButtonStyles, customStyles);
});

var DefaultButton =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(DefaultButton, _BaseComponent);

  function DefaultButton() {
    _classCallCheck(this, DefaultButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(DefaultButton).apply(this, arguments));
  }

  _createClass(DefaultButton, [{
    key: "internalStyles",
    get: function get() {
      var _this$primary = this.primary,
          primary = _this$primary === void 0 ? false : _this$primary,
          theme = this.theme;
      return getStyles$8(theme, this.styles, primary);
    }
  }]);

  return DefaultButton;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], DefaultButton.prototype, "text", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], DefaultButton.prototype, "primary", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], DefaultButton.prototype, "disabled", void 0);

DefaultButton = __decorate([Component({
  components: {
    BaseButton: __vue_component__$2
  }
})], DefaultButton);
var script$6 = DefaultButton;

/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('BaseButton', _vm._b({
    attrs: {
      "variant-class-name": _vm.primary ? 'ms-Button--primary' : 'ms-Button--default',
      "styles": _vm.internalStyles
    }
  }, 'BaseButton', [_vm.$attrs, _vm.$props], false), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = __vue_normalize__({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

var getStyles$9 = memoizeFunction(function (theme, customStyles) {
  var baseButtonStyles = getStyles$3(theme);
  var splitButtonStyles = {}; // getSplitButtonStyles(theme)

  var palette = theme.palette,
      semanticColors = theme.semanticColors;
  var iconButtonStyles = {
    root: {
      padding: '0 4px',
      width: '32px',
      height: '32px',
      backgroundColor: 'transparent',
      border: 'none',
      color: semanticColors.link
    },
    rootHovered: {
      color: palette.themeDarkAlt,
      backgroundColor: palette.neutralLighter,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'Highlight',
        color: 'Highlight'
      })
    },
    rootHasMenu: {
      width: 'auto'
    },
    rootPressed: {
      color: palette.themeDark,
      backgroundColor: palette.neutralLight
    },
    rootExpanded: {
      color: palette.themeDark,
      backgroundColor: palette.neutralLight
    },
    rootChecked: {
      color: palette.themeDark,
      backgroundColor: palette.neutralLight
    },
    rootCheckedHovered: {
      color: palette.themeDark,
      backgroundColor: palette.neutralQuaternaryAlt
    },
    rootDisabled: {
      color: palette.neutralTertiaryAlt
    }
  };
  return concatStyleSets(baseButtonStyles, iconButtonStyles, splitButtonStyles, customStyles);
});

var IconButton =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(IconButton, _BaseComponent);

  function IconButton() {
    _classCallCheck(this, IconButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(IconButton).apply(this, arguments));
  }

  _createClass(IconButton, [{
    key: "internalStyles",
    get: function get() {
      var theme = this.theme;
      return getStyles$9(theme, this.styles);
    }
  }]);

  return IconButton;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], IconButton.prototype, "disabled", void 0);

IconButton = __decorate([Component({
  components: {
    BaseButton: __vue_component__$2
  },
  inheritAttrs: false
})], IconButton);
var script$7 = IconButton;

/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('BaseButton', _vm._b({
    attrs: {
      "variant-class-name": "ms-Button--icon",
      "styles": _vm.internalStyles
    }
  }, 'BaseButton', [_vm.$attrs, _vm.$props], false), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = __vue_normalize__({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

var getStyles$a = memoizeFunction(function (theme, customStyles, focusInset, focusColor) {
  var baseButtonStyles = getStyles$3(theme);
  var messageBarButtonStyles = {
    root: [getFocusStyle(theme, {
      inset: 1,
      highContrastStyle: {
        outlineOffset: '-4px',
        outlineColor: 'ActiveBorder'
      },
      borderColor: 'transparent'
    }), {
      height: 24,
      borderColor: theme.palette.neutralTertiaryAlt
    }]
  };
  return concatStyleSets(baseButtonStyles, messageBarButtonStyles, customStyles);
});

var MessageBarButton =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(MessageBarButton, _BaseComponent);

  function MessageBarButton() {
    _classCallCheck(this, MessageBarButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(MessageBarButton).apply(this, arguments));
  }

  _createClass(MessageBarButton, [{
    key: "customStyles",
    get: function get() {
      return getStyles$a(this.theme, this.styles);
    }
  }]);

  return MessageBarButton;
}(BaseComponent$1);

MessageBarButton = __decorate([Component({
  components: {
    DefaultButton: __vue_component__$6
  }
})], MessageBarButton);
var script$8 = MessageBarButton;

/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('DefaultButton', {
    attrs: {
      "styles": _vm.customStyles
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = __vue_normalize__({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

var PrimaryButton =
/*#__PURE__*/
function (_DefaultButton) {
  _inherits(PrimaryButton, _DefaultButton);

  function PrimaryButton() {
    _classCallCheck(this, PrimaryButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(PrimaryButton).apply(this, arguments));
  }

  return PrimaryButton;
}(__vue_component__$6);

__decorate([Prop({
  type: Boolean,
  default: true
}), __metadata("design:type", Boolean)], PrimaryButton.prototype, "primary", void 0);

PrimaryButton = __decorate([Component], PrimaryButton);
var script$9 = PrimaryButton;

/* script */
var __vue_script__$9 = script$9;
/* template */

/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = __vue_normalize__({}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var GlobalClassNames$1 = {
  root: 'ms-Breadcrumb',
  list: 'ms-Breadcrumb-list',
  listItem: 'ms-Breadcrumb-listItem',
  chevron: 'ms-Breadcrumb-chevron',
  overflow: 'ms-Breadcrumb-overflow',
  overflowButton: 'ms-Breadcrumb-overflowButton',
  itemLink: 'ms-Breadcrumb-itemLink',
  item: 'ms-Breadcrumb-item'
};
var SingleLineTextStyle = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
};
var overflowButtonFontSize = 16;
var chevronSmallFontSize = 8;
var itemLineHeight = 36;
var itemFontSize = 18;
var MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
var MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);
var getStyles$b = function getStyles(props) {
  var _selectors2, _objectSpread2;

  var className = props.className,
      theme = props.theme;
  var palette = theme.palette,
      semanticColors = theme.semanticColors,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(GlobalClassNames$1, theme); // Tokens

  var itemBackgroundHoveredColor = semanticColors.menuItemBackgroundHovered;
  var itemBackgroundPressedColor = semanticColors.menuItemBackgroundPressed;
  var itemTextColor = palette.neutralSecondary;
  var itemTextFontWeight = FontWeights.regular;
  var itemTextHoveredOrPressedColor = palette.neutralPrimary;
  var itemLastChildTextColor = palette.neutralPrimary;
  var itemLastChildTextFontWeight = FontWeights.semibold;
  var chevronButtonColor = palette.neutralSecondary;
  var overflowButtonColor = palette.neutralSecondary;
  var lastChildItemStyles = {
    fontWeight: itemLastChildTextFontWeight,
    color: itemLastChildTextColor
  };
  var itemStateSelectors = {
    ':hover': {
      color: itemTextHoveredOrPressedColor,
      backgroundColor: itemBackgroundHoveredColor,
      cursor: 'pointer',
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'Highlight'
      })
    },
    ':active': {
      backgroundColor: itemBackgroundPressedColor,
      color: itemTextHoveredOrPressedColor
    },
    '&:active:hover': {
      color: itemTextHoveredOrPressedColor,
      backgroundColor: itemBackgroundPressedColor
    },
    '&:active, &:hover, &:active:hover': {
      textDecoration: 'none'
    }
  };
  var commonItemStyles = {
    color: itemTextColor,
    padding: '0 8px',
    lineHeight: itemLineHeight,
    fontSize: itemFontSize,
    fontWeight: itemTextFontWeight
  };
  return {
    root: [classNames.root, fonts.medium, {
      margin: '11px 0 1px'
    }, className],
    list: [classNames.list, {
      whiteSpace: 'nowrap',
      padding: 0,
      margin: 0,
      display: 'flex',
      alignItems: 'stretch'
    }],
    listItem: [classNames.listItem, {
      listStyleType: 'none',
      margin: '0',
      padding: '0',
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      selectors: {
        '&:last-child .ms-Breadcrumb-itemLink': lastChildItemStyles,
        '&:last-child .ms-Breadcrumb-item': lastChildItemStyles
      }
    }],
    chevron: [classNames.chevron, {
      color: chevronButtonColor,
      fontSize: fonts.small.fontSize,
      selectors: (_selectors2 = {}, _defineProperty(_selectors2, HighContrastSelector, {
        color: 'WindowText',
        MsHighContrastAdjust: 'none'
      }), _defineProperty(_selectors2, MediumScreenSelector, {
        fontSize: chevronSmallFontSize
      }), _defineProperty(_selectors2, MinimumScreenSelector, {
        fontSize: chevronSmallFontSize
      }), _selectors2)
    }],
    overflow: [classNames.overflow, {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }],
    overflowButton: [classNames.overflowButton, getFocusStyle(theme), SingleLineTextStyle, {
      fontSize: overflowButtonFontSize,
      color: overflowButtonColor,
      height: '100%',
      cursor: 'pointer',
      selectors: _objectSpread$4({}, itemStateSelectors, (_objectSpread2 = {}, _defineProperty(_objectSpread2, MinimumScreenSelector, {
        padding: '4px 6px'
      }), _defineProperty(_objectSpread2, MediumScreenSelector, {
        fontSize: fonts.mediumPlus.fontSize
      }), _objectSpread2))
    }],
    itemLink: [classNames.itemLink, getFocusStyle(theme), SingleLineTextStyle, _objectSpread$4({}, commonItemStyles, {
      selectors: _objectSpread$4(_defineProperty({
        ':focus': {
          color: palette.neutralDark
        }
      }, ".".concat(IsFocusVisibleClassName, " &:focus"), {
        outline: "none"
      }), itemStateSelectors)
    })],
    item: [classNames.item, _objectSpread$4({}, commonItemStyles, {
      selectors: {
        ':hover': {
          cursor: 'default'
        }
      }
    })]
  };
};

var getClassNames$3 = classNamesFunction();

var Breadcrumb =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Breadcrumb, _BaseComponent);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    return _possibleConstructorReturn(this, _getPrototypeOf(Breadcrumb).apply(this, arguments));
  }

  _createClass(Breadcrumb, [{
    key: "onBreadcrumbClicked",
    value: function onBreadcrumbClicked(event, item) {
      if (item.onClick) {
        item.onClick(event, item);
      }
    }
  }, {
    key: "classNames",
    get: function get() {
      var className = this.className,
          theme = this.theme;
      return getClassNames$3(getStyles$b, {
        theme: theme,
        className: className
      });
    }
  }]);

  return Breadcrumb;
}(BaseComponent$1);

__decorate([Prop({
  type: Array,
  required: true
}), __metadata("design:type", Array)], Breadcrumb.prototype, "items", void 0);

Breadcrumb = __decorate([Component({
  components: {}
})], Breadcrumb);
var script$a = Breadcrumb;

/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root,
    attrs: {
      "role": "navigation"
    }
  }, [_c('ol', {
    class: _vm.classNames.list
  }, _vm._l(_vm.items, function (item, index) {
    return _c('li', {
      key: index,
      class: _vm.classNames.listItem
    }, [item.onClick || item.href ? _c('o-link', {
      class: _vm.classNames.itemLink,
      attrs: {
        "href": item.href
      },
      on: {
        "click": function click($event) {
          return _vm.onBreadcrumbClicked($event, item);
        }
      }
    }, [_vm._v("\n        " + _vm._s(item.text) + "\n      ")]) : _c('span', {
      class: _vm.classNames.item,
      on: {
        "click": function click($event) {
          return _vm.onBreadcrumbClicked($event, item);
        }
      }
    }, [_vm._v("\n        " + _vm._s(item.text) + "\n      ")]), _vm._v(" "), index !== _vm.items.length - 1 ? _c('o-icon', {
      key: "icon-" + index,
      class: _vm.classNames.chevron,
      attrs: {
        "icon-name": "ChevronRight"
      }
    }) : _vm._e()], 1);
  }), 0)]);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = undefined;
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = __vue_normalize__({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

var _layersByHostId = {};

var _defaultHostSelector;
/**
 * Register a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */


function registerLayer(hostId, callback) {
  if (!_layersByHostId[hostId]) {
    _layersByHostId[hostId] = [];
  }

  _layersByHostId[hostId].push(callback);
}
/**
 * Unregister a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */

function unregisterLayer(hostId, callback) {
  if (_layersByHostId[hostId]) {
    var idx = _layersByHostId[hostId].indexOf(callback);

    if (idx >= 0) {
      _layersByHostId[hostId].splice(idx, 1);

      if (_layersByHostId[hostId].length === 0) {
        delete _layersByHostId[hostId];
      }
    }
  }
}
/**
 * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
 * care about the specific host.
 */

function notifyHostChanged(id) {
  if (_layersByHostId[id]) {
    _layersByHostId[id].forEach(function (callback) {
      return callback();
    });
  }
}
/**
 * Get the default target selector when determining a host
 */

function getDefaultTarget() {
  return _defaultHostSelector;
}

var GlobalClassNames$2 = {
  root: 'ms-Layer',
  rootNoHost: 'ms-Layer--fixed',
  content: 'ms-Layer-content'
};
var getStyles$c = function getStyles(props) {
  var className = props.className,
      isNotHost = props.isNotHost,
      theme = props.theme;
  var classNames = getGlobalClassNames(GlobalClassNames$2, theme);
  return {
    root: [classNames.root, theme.fonts.medium, isNotHost && [classNames.rootNoHost, {
      position: 'fixed',
      zIndex: ZIndexes.Layer,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      visibility: 'hidden'
    }], className],
    content: [classNames.content, {
      visibility: 'visible'
    }]
  };
};

var getClassNames$4 = classNamesFunction();

var Layer =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Layer, _BaseComponent);

  function Layer() {
    var _this;

    _classCallCheck(this, Layer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layer).apply(this, arguments));
    _this.hasTarget = false;
    return _this;
  }

  _createClass(Layer, [{
    key: "mounted",
    value: function mounted() {
      this.createElement();

      if (this.hostId) {
        registerLayer(this.hostId, this.createElement);
      }
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      var hostId = this.hostId;

      if (this.hostId) {
        unregisterLayer(this.hostId, this.createElement);
      }
    }
  }, {
    key: "createElement",
    value: function createElement() {
      var doc = this.$el.ownerDocument;
      var host = this.getHost();

      if (!doc || !host) {
        this.hasTarget = false;
        return;
      }

      this.hasTarget = true;
    }
  }, {
    key: "getHost",
    value: function getHost() {
      var doc = this.$el.ownerDocument;

      if (!doc) {
        return undefined;
      }

      if (this.hostId) {
        return doc.getElementById(this.hostId);
      } else {
        var defaultHostSelector = getDefaultTarget();
        return defaultHostSelector ? doc.querySelector(defaultHostSelector) : doc.body;
      }
    }
  }, {
    key: "classNames",
    get: function get() {
      var className = this.className,
          theme = this.theme;
      return getClassNames$4(getStyles$c, {
        theme: theme,
        className: className,
        isNotHost: !this.hostId
      });
    }
  }]);

  return Layer;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Layer.prototype, "hostId", void 0);

__decorate([Prop({
  type: Boolean,
  default: true
}), __metadata("design:type", Boolean)], Layer.prototype, "append", void 0);

Layer = __decorate([Component({
  components: {
    MountingPortal: MountingPortal
  }
})], Layer);
var script$b = Layer;

/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.hasTarget ? _c('MountingPortal', {
    attrs: {
      "mount-to": _vm.hostId ? "#" + _vm.hostId : 'body',
      "append": _vm.append
    }
  }, [_c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.content
  }, [_vm._t("default")], 2)])]) : _vm._e();
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = undefined;
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = __vue_normalize__({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

var LayerHost =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(LayerHost, _BaseComponent);

  function LayerHost() {
    _classCallCheck(this, LayerHost);

    return _possibleConstructorReturn(this, _getPrototypeOf(LayerHost).apply(this, arguments));
  }

  _createClass(LayerHost, [{
    key: "mounted",
    value: function mounted() {
      notifyHostChanged(this.id);
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      notifyHostChanged(this.id);
    }
  }]);

  return LayerHost;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], LayerHost.prototype, "id", void 0);

LayerHost = __decorate([Component({
  components: {}
})], LayerHost);
var script$c = LayerHost;

/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "LayerHost",
    attrs: {
      "id": _vm.id
    }
  });
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$c = undefined;
/* scoped */

var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = undefined;
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = __vue_normalize__({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);

var Dialog =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Dialog, _BaseComponent);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dialog).apply(this, arguments));
  }

  return Dialog;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Dialog.prototype, "dark", void 0);

Dialog = __decorate([Component({
  components: {
    Layer: __vue_component__$b
  }
})], Dialog);
var script$d = Dialog;

/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._b({}, 'div', _vm.css.root, false), [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$d = undefined;
/* scoped */

var __vue_scope_id__$d = undefined;
/* module identifier */

var __vue_module_identifier__$d = undefined;
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = __vue_normalize__({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var getClassNames$5 = classNamesFunction(); // The number pixels per indentation level for Nav links.

var INDENTATION_SIZE = 14; // The number of pixels of left margin

var BASE_INDENT = 3;

var Nav =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Nav, _BaseComponent);

  function Nav() {
    var _this;

    _classCallCheck(this, Nav);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Nav).apply(this, arguments));
    _this.isGroupCollapsed = {};
    _this.internalSelectedKey = '';
    return _this;
  }

  _createClass(Nav, [{
    key: "render",
    value: function render(h) {
      var theme = this.theme,
          className = this.className,
          isOnTop = this.isOnTop,
          groups = this.groups;

      if (!groups) {
        return null;
      }

      var groupElements = this.groups.map(this.renderGroup);
      var classNames = getClassNames$5(this.styles, {
        theme: theme,
        className: className,
        isOnTop: isOnTop,
        groups: groups
      });
      return h("nav", {
        "attrs": {
          "role": "navigation"
        },
        "class": classNames.root
      }, [groupElements]);
    }
  }, {
    key: "renderGroup",
    value: function renderGroup(group, groupIndex) {
      var h = this.$createElement;
      var groups = this.groups,
          theme = this.theme;
      var classNames = getClassNames$5(this.styles, {
        theme: theme,
        isGroup: true,
        isExpanded: this.isGroupExpanded(group),
        groups: groups
      });
      return h("div", {
        "key": groupIndex
      }, [h("div", {
        "class": classNames.groupContent
      }, [this.renderLinks(group.links, 0)])]);
    }
  }, {
    key: "renderLinks",
    value: function renderLinks(links, nestingLevel) {
      var _this2 = this;

      var h = this.$createElement;
      if (!links || !links.length) return null;
      var linkElements = links.map(function (link, linkIndex) {
        return _this2.renderLink(link, linkIndex, nestingLevel);
      });
      var groups = this.groups,
          theme = this.theme;
      var classNames = getClassNames$5(this.styles, {
        theme: theme,
        groups: groups
      });
      return h("ul", {
        "attrs": {
          "role": "list"
        },
        "class": classNames.navItems
      }, [linkElements]);
    }
  }, {
    key: "renderLink",
    value: function renderLink(link, linkIndex, nestingLevel) {
      var h = this.$createElement;
      var groups = this.groups,
          theme = this.theme;
      var classNames = getClassNames$5(this.styles, {
        theme: theme,
        groups: groups
      });
      return h("li", {
        "key": linkIndex,
        "attrs": {
          "role": "listitem"
        },
        "class": classNames.navItem
      }, [this.renderCompositeLink(link, linkIndex, nestingLevel), link.isExpanded ? this.renderLinks(link.links, ++nestingLevel) : null]);
    }
  }, {
    key: "renderCompositeLink",
    value: function renderCompositeLink(link, linkIndex, nestingLevel) {
      var h = this.$createElement;
      var styles = this.styles,
          groups = this.groups,
          theme = this.theme;
      var classNames = getClassNames$5(this.styles, {
        theme: theme,
        isExpanded: !!link.isExpanded,
        isSelected: false,
        isLink: true,
        isDisabled: link.disabled,
        position: INDENTATION_SIZE * nestingLevel + 1,
        groups: groups
      });
      return h("div", {
        "key": linkIndex,
        "class": classNames.compositeLink
      }, [link.links && link.links.length > 0 ? h("button", {
        "on": {
          "click": this.onLinkExpandClicked.bind(this, link)
        },
        "class": classNames.chevronButton
      }, [h("o-icon", {
        "class": classNames.chevronIcon,
        "style": link.isExpanded && {
          transform: 'rotate(-180deg)'
        },
        "attrs": {
          "icon-name": "ChevronDown"
        }
      })]) : null, this.renderNavLink(link, linkIndex, nestingLevel)]);
    }
  }, {
    key: "onLinkExpandClicked",
    value: function onLinkExpandClicked(link) {
      link.isExpanded = !link.isExpanded;
    }
  }, {
    key: "renderNavLink",
    value: function renderNavLink(link, linkIndex, nestingLevel) {
      var h = this.$createElement;
      var isSelected = '' + linkIndex === this.internalSelectedKey;
      var isLinkWithIcon = link.icon || link.iconProps;
      var groups = this.groups,
          theme = this.theme;
      var classNames = getClassNames$5(this.styles, {
        theme: theme,
        isSelected: isSelected,
        isDisabled: link.disabled,
        isButtonEntry: link.onClick && !link.forceAnchor,
        leftPadding: INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24),
        groups: groups
      });
      return h(__vue_component__$3, {
        "attrs": {
          "href": link.href || (link.forceAnchor ? '#' : undefined),
          "title": link.title || link.name,
          "target": link.target,
          "disabled": link.disabled
        },
        "nativeOn": {
          "click": this.onNavLinkClicked.bind(this, link, linkIndex)
        },
        "class": [classNames.link, isSelected && classNames.selected],
        "style": {
          paddingLeft: "".concat(INDENTATION_SIZE * nestingLevel + BASE_INDENT + (isLinkWithIcon ? 0 : 24), "px")
        }
      }, [link.name]);
    }
  }, {
    key: "onNavLinkClicked",
    value: function onNavLinkClicked(link, linkIndex) {
      if (link.onClick) link.onClick(link);

      if (!link.url && link.links && link.links.length > 0) {
        link.isExpanded = !link.isExpanded;
      }

      this.internalSelectedKey = link.key;
    }
  }, {
    key: "preventBounce",
    value: function preventBounce(link, ev) {
      if (!link.href && link.forceAnchor) ev.preventDefault();
    }
  }, {
    key: "isGroupExpanded",
    value: function isGroupExpanded(group) {
      if (group.name && this.isGroupCollapsed.hasOwnProperty(group.name)) {
        return !this.isGroupCollapsed[group.name];
      }

      if (group.collapseByDefault !== undefined) {
        return !group.collapseByDefault;
      }

      return true;
    }
  }, {
    key: "toggleCollapsed",
    value: function toggleCollapsed(group) {
      if (group.name) {
        var newGroupCollapsed = _objectSpread$5({}, this.isGroupCollapsed, _defineProperty({}, group.name, this.isGroupExpanded(group)));

        this.$set(this, 'isGroupCollapsed', newGroupCollapsed);
      }
    }
  }]);

  return Nav;
}(BaseComponent$1);

__decorate([Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), __metadata("design:type", Array)], Nav.prototype, "groups", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Nav.prototype, "selectedKey", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Nav.prototype, "isOnTop", void 0);

Nav = __decorate([Component({
  components: {
    ActionButton: __vue_component__$3,
    Icon: Icon$1
  }
})], Nav);
var NavBase = Nav;

var GlobalClassNames$3 = {
  root: 'ms-Nav',
  linkText: 'ms-Nav-linkText',
  compositeLink: 'ms-Nav-compositeLink',
  link: 'ms-Nav-link',
  chevronButton: 'ms-Nav-chevronButton',
  chevronIcon: 'ms-Nav-chevron',
  navItem: 'ms-Nav-navItem',
  navItems: 'ms-Nav-navItems',
  group: 'ms-Nav-group',
  groupContent: 'ms-Nav-groupContent'
};
var getStyles$d = function getStyles(props) {
  var className = props.className,
      theme = props.theme,
      isOnTop = props.isOnTop,
      isExpanded = props.isExpanded,
      isGroup = props.isGroup,
      isLink = props.isLink,
      isSelected = props.isSelected,
      isDisabled = props.isDisabled,
      isButtonEntry = props.isButtonEntry,
      _props$navHeight = props.navHeight,
      navHeight = _props$navHeight === void 0 ? 44 : _props$navHeight,
      position = props.position,
      _props$leftPadding = props.leftPadding,
      leftPadding = _props$leftPadding === void 0 ? 20 : _props$leftPadding,
      _props$leftPaddingExp = props.leftPaddingExpanded,
      leftPaddingExpanded = _props$leftPaddingExp === void 0 ? 28 : _props$leftPaddingExp,
      _props$rightPadding = props.rightPadding,
      rightPadding = _props$rightPadding === void 0 ? 20 : _props$rightPadding;
  var palette = theme.palette,
      semanticColors = theme.semanticColors,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(GlobalClassNames$3, theme);
  return {
    root: [classNames.root, className, fonts.medium, {
      overflowY: 'auto',
      userSelect: 'none',
      WebkitOverflowScrolling: 'touch'
    }, isOnTop && [{
      position: 'absolute'
    }, AnimationClassNames.slideRightIn40]],
    linkText: [classNames.linkText, {
      margin: '0 4px',
      overflow: 'hidden',
      verticalAlign: 'middle',
      textAlign: 'left',
      textOverflow: 'ellipsis'
    }],
    compositeLink: [classNames.compositeLink, {
      display: 'block',
      position: 'relative',
      color: semanticColors.bodyText
    }, isExpanded && 'is-expanded', isSelected && 'is-selected', isDisabled && 'is-disabled', isDisabled && {
      color: semanticColors.disabledText
    }],
    link: [classNames.link, getFocusStyle(theme), {
      display: 'block',
      position: 'relative',
      height: navHeight,
      width: '100%',
      lineHeight: "".concat(navHeight, "px"),
      textDecoration: 'none',
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      paddingLeft: leftPadding,
      paddingRight: rightPadding,
      color: semanticColors.bodyText,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'transparent',
        selectors: {
          ':focus': {
            borderColor: 'WindowText'
          }
        }
      })
    }, !isDisabled && {
      selectors: {
        '.ms-Nav-compositeLink:hover &': {
          backgroundColor: semanticColors.bodyBackgroundHovered
        }
      }
    }, isSelected && {
      color: semanticColors.bodyTextChecked,
      fontWeight: FontWeights.semibold,
      backgroundColor: semanticColors.bodyBackgroundChecked,
      selectors: {
        '&:after': {
          borderLeft: "2px solid ".concat(palette.themePrimary),
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          pointerEvents: 'none'
        }
      }
    }, isDisabled && {
      color: semanticColors.disabledText
    }, isButtonEntry && {
      color: palette.themePrimary
    }],
    chevronButton: [classNames.chevronButton, getFocusStyle(theme), fonts.small, {
      display: 'block',
      textAlign: 'left',
      lineHeight: "".concat(navHeight, "px"),
      margin: '5px 0',
      padding: "0px, ".concat(rightPadding, "px, 0px, ").concat(leftPaddingExpanded, "px"),
      border: 'none',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      cursor: 'pointer',
      color: semanticColors.bodyText,
      backgroundColor: 'transparent',
      selectors: {
        '&:visited': {
          color: semanticColors.bodyText
        }
      }
    }, isGroup && {
      fontSize: fonts.large.fontSize,
      width: '100%',
      height: navHeight,
      borderBottom: "1px solid ".concat(semanticColors.bodyDivider)
    }, isLink && {
      display: 'block',
      width: leftPaddingExpanded - 2,
      height: navHeight - 2,
      position: 'absolute',
      top: '1px',
      left: "".concat(position, "px"),
      zIndex: ZIndexes.Nav,
      padding: 0,
      margin: 0
    }, isSelected && {
      color: palette.themePrimary,
      backgroundColor: palette.neutralLighterAlt,
      selectors: {
        '&:after': {
          borderLeft: "2px solid ".concat(palette.themePrimary),
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          pointerEvents: 'none'
        }
      }
    }],
    chevronIcon: [classNames.chevronIcon, {
      position: 'absolute',
      left: '8px',
      height: navHeight,
      lineHeight: "".concat(navHeight, "px"),
      fontSize: fonts.small.fontSize,
      transition: 'transform .1s linear'
    }, isExpanded && {
      transform: 'rotate(-180deg)'
    }, isLink && {
      top: 0
    }],
    navItem: [classNames.navItem, {
      padding: 0
    }],
    navItems: [classNames.navItems, {
      listStyleType: 'none',
      padding: 0,
      margin: 0
    }],
    group: [classNames.group, isExpanded && 'is-expanded'],
    groupContent: [classNames.groupContent, {
      display: 'none',
      marginBottom: '40px'
    }, AnimationClassNames.slideDownIn20, isExpanded && {
      display: 'block'
    }]
  };
};

var Nav$1 = styled(NavBase, getStyles$d, undefined);

var ImageFit;

(function (ImageFit) {
  /**
   * The image is not scaled. The image is centered and cropped within the content box.
   */
  ImageFit[ImageFit["center"] = 0] = "center";
  /**
   * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
   * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
   * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
   */

  ImageFit[ImageFit["contain"] = 1] = "contain";
  /**
   * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped from
   * the top and bottom, or from the sides, depending on the difference in aspect ratio between the image and the frame.
   */

  ImageFit[ImageFit["cover"] = 2] = "cover";
  /**
   * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
   * frame will have empty space.
   */

  ImageFit[ImageFit["none"] = 3] = "none";
  /**
   * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
   * behave as ImageFit.center if the image's natural height or width is less than the Image frame's height or width,
   * but if both natural height and width are larger than the frame it will behave as ImageFit.cover.
   */

  ImageFit[ImageFit["centerCover"] = 4] = "centerCover";
  /**
   * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
   * behave as ImageFit.center if the image's natural height and width is less than the Image frame's height and width,
   * but if either natural height or width are larger than the frame it will behave as ImageFit.contain.
   */

  ImageFit[ImageFit["centerContain"] = 5] = "centerContain";
})(ImageFit || (ImageFit = {}));

var ImageLoadState;

(function (ImageLoadState) {
  /**
   * The image has not yet been loaded, and there is no error yet.
   */
  ImageLoadState[ImageLoadState["notLoaded"] = 0] = "notLoaded";
  /**
   * The image has been loaded successfully.
   */

  ImageLoadState[ImageLoadState["loaded"] = 1] = "loaded";
  /**
   * An error has been encountered while loading the image.
   */

  ImageLoadState[ImageLoadState["error"] = 2] = "error";
  /**
   * Deprecated at v1.3.6, to replace the src in case of errors, use `onLoadingStateChange` instead
   * and rerender the Image with a difference src.
   * @deprecated Use `onLoadingStateChange` instead
   * and rerender the Image with a difference src.
   */

  ImageLoadState[ImageLoadState["errorLoaded"] = 3] = "errorLoaded";
})(ImageLoadState || (ImageLoadState = {}));

var ImageCoverStyle;

(function (ImageCoverStyle) {
  /**
   * The image will be shown at 100% height of container and the width will be scaled accordingly
   */
  ImageCoverStyle[ImageCoverStyle["landscape"] = 0] = "landscape";
  /**
   * The image will be shown at 100% width of container and the height will be scaled accordingly
   */

  ImageCoverStyle[ImageCoverStyle["portrait"] = 1] = "portrait";
})(ImageCoverStyle || (ImageCoverStyle = {}));

var getClassNames$6 = classNamesFunction();

var Image =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Image, _BaseComponent);

  function Image() {
    var _this;

    _classCallCheck(this, Image);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Image).apply(this, arguments));
    _this.loadState = ImageLoadState.notLoaded;
    return _this;
  }

  _createClass(Image, [{
    key: "onImageLoaded",
    value: function onImageLoaded() {
      this.loadState = ImageLoadState.loaded;
    }
  }, {
    key: "onImageError",
    value: function onImageError() {
      this.loadState = ImageLoadState.error;
    }
  }, {
    key: "classNames",
    get: function get() {
      var styles = this.styles,
          loadState = this.loadState,
          coverStyle = this.coverStyle,
          imageFit = this.imageFit,
          theme = this.theme,
          className = this.className,
          width = this.width,
          height = this.height,
          maximizeFrame = this.maximizeFrame,
          shouldFadeIn = this.shouldFadeIn,
          shouldStartVisible = this.shouldStartVisible;
      return getClassNames$6(styles, {
        theme: theme,
        className: className,
        width: width,
        height: height,
        maximizeFrame: maximizeFrame,
        shouldFadeIn: shouldFadeIn,
        shouldStartVisible: shouldStartVisible,
        isLoaded: loadState === ImageLoadState.loaded || loadState === ImageLoadState.notLoaded && shouldStartVisible,
        isLandscape: coverStyle === ImageCoverStyle.landscape,
        isCenter: imageFit === ImageFit.center,
        isCenterContain: imageFit === ImageFit.centerContain,
        isCenterCover: imageFit === ImageFit.centerCover,
        isContain: imageFit === ImageFit.contain,
        isCover: imageFit === ImageFit.cover,
        isNone: imageFit === ImageFit.none,
        isError: loadState === ImageLoadState.error,
        isNotImageFit: imageFit === undefined
      });
    }
  }]);

  return Image;
}(BaseComponent$1);

Image.svgRegex = /\.svg$/i;

__decorate([Prop({
  type: String,
  required: true
}), __metadata("design:type", String)], Image.prototype, "src", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Image.prototype, "alt", void 0);

__decorate([Prop({
  type: [String, Number],
  default: ''
}), __metadata("design:type", Object)], Image.prototype, "width", void 0);

__decorate([Prop({
  type: [String, Number],
  default: ''
}), __metadata("design:type", Object)], Image.prototype, "height", void 0);

__decorate([Prop({
  type: Number,
  default: null
}), __metadata("design:type", Number)], Image.prototype, "imageFit", void 0);

__decorate([Prop({
  type: Boolean,
  default: null
}), __metadata("design:type", Boolean)], Image.prototype, "maximizeFrame", void 0);

__decorate([Prop({
  type: Boolean,
  default: null
}), __metadata("design:type", Boolean)], Image.prototype, "shouldFadeIn", void 0);

__decorate([Prop({
  type: Boolean,
  default: null
}), __metadata("design:type", Boolean)], Image.prototype, "shouldStartVisible", void 0);

__decorate([Prop({
  type: Number,
  default: ImageCoverStyle.portrait
}), __metadata("design:type", Number)], Image.prototype, "coverStyle", void 0);

Image = __decorate([Component({
  inheritAttrs: false
})], Image);
var script$e = Image;

/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root,
    style: {
      width: _vm.width + 'px',
      height: _vm.height + 'px'
    }
  }, [_c('img', _vm._b({
    class: _vm.classNames.image,
    attrs: {
      "src": _vm.src,
      "alt": ""
    },
    on: {
      "load": _vm.onImageLoaded,
      "error": _vm.onImageError
    }
  }, 'img', _vm.$attrs, false))]);
};

var __vue_staticRenderFns__$d = [];
/* style */

var __vue_inject_styles__$e = undefined;
/* scoped */

var __vue_scope_id__$e = undefined;
/* module identifier */

var __vue_module_identifier__$e = undefined;
/* functional template */

var __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$e = __vue_normalize__({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);

var GlobalClassNames$4 = {
  root: 'ms-Image',
  rootMaximizeFrame: 'ms-Image--maximizeFrame',
  image: 'ms-Image-image',
  imageCenter: 'ms-Image-image--center',
  imageContain: 'ms-Image-image--contain',
  imageCover: 'ms-Image-image--cover',
  imageCenterContain: 'ms-Image-image--centerContain',
  imageCenterCover: 'ms-Image-image--centerCover',
  imageNone: 'ms-Image-image--none',
  imageLandscape: 'ms-Image-image--landscape',
  imagePortrait: 'ms-Image-image--portrait'
};
var getStyles$e = function getStyles(props) {
  var className = props.className,
      width = props.width,
      height = props.height,
      maximizeFrame = props.maximizeFrame,
      isLoaded = props.isLoaded,
      shouldFadeIn = props.shouldFadeIn,
      shouldStartVisible = props.shouldStartVisible,
      isLandscape = props.isLandscape,
      isCenter = props.isCenter,
      isContain = props.isContain,
      isCover = props.isCover,
      isCenterContain = props.isCenterContain,
      isCenterCover = props.isCenterCover,
      isNone = props.isNone,
      isError = props.isError,
      isNotImageFit = props.isNotImageFit,
      theme = props.theme;
  var classNames = getGlobalClassNames(GlobalClassNames$4, theme);
  var ImageFitStyles = {
    position: 'absolute',
    left: '50% /* @noflip */',
    top: '50%',
    transform: 'translate(-50%,-50%)'
  }; // Cut the mustard using msMaxTouchPoints to detect IE11 which does not support CSS object-fit

  var window = getWindow();
  var supportsObjectFit = window !== undefined && window.navigator.msMaxTouchPoints === undefined;
  var fallbackObjectFitStyles = isContain && isLandscape || isCover && !isLandscape ? {
    width: '100%',
    height: 'auto'
  } : {
    width: 'auto',
    height: '100%'
  };
  return {
    root: [classNames.root, theme.fonts.medium, {
      overflow: 'hidden'
    }, maximizeFrame && [classNames.rootMaximizeFrame, {
      height: '100%',
      width: '100%'
    }], isLoaded && shouldFadeIn && !shouldStartVisible && AnimationClassNames.fadeIn400, (isCenter || isContain || isCover || isCenterContain || isCenterCover) && {
      position: 'relative'
    }, className],
    image: [classNames.image, {
      display: 'block',
      opacity: 0
    }, isLoaded && ['is-loaded', {
      opacity: 1
    }], isCenter && [classNames.imageCenter, ImageFitStyles], isContain && [classNames.imageContain, supportsObjectFit && {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }, !supportsObjectFit && fallbackObjectFitStyles, ImageFitStyles], isCover && [classNames.imageCover, supportsObjectFit && {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }, !supportsObjectFit && fallbackObjectFitStyles, ImageFitStyles], isCenterContain && [classNames.imageCenterContain, isLandscape && {
      maxWidth: '100%'
    }, !isLandscape && {
      maxHeight: '100%'
    }, ImageFitStyles], isCenterCover && [classNames.imageCenterCover, isLandscape && {
      maxHeight: '100%'
    }, !isLandscape && {
      maxWidth: '100%'
    }, ImageFitStyles], isNone && [classNames.imageNone, {
      width: 'auto',
      height: 'auto'
    }], isNotImageFit && [!!width && !height && {
      height: 'auto',
      width: '100%'
    }, !width && !!height && {
      height: '100%',
      width: 'auto'
    }, !!width && !!height && {
      height: '100%',
      width: '100%'
    }], isLandscape && classNames.imageLandscape, !isLandscape && classNames.imagePortrait, !isLoaded && 'is-notLoaded', shouldFadeIn && 'is-fadeIn', isError && 'is-error']
  };
};

var Image$1 = styled(__vue_component__$e, getStyles$e, undefined);

function getBeakStyle(beakWidth) {
  return {
    height: beakWidth,
    width: beakWidth
  };
}

var GlobalClassNames$5 = {
  container: 'ms-Callout-container',
  root: 'ms-Callout',
  beak: 'ms-Callout-beak',
  beakCurtain: 'ms-Callout-beakCurtain',
  calloutMain: 'ms-Callout-main'
};
var getStyles$f = function getStyles(props) {
  var theme = props.theme,
      className = props.className,
      overflowYHidden = props.overflowYHidden,
      calloutWidth = props.calloutWidth,
      beakWidth = props.beakWidth,
      backgroundColor = props.backgroundColor,
      calloutMaxWidth = props.calloutMaxWidth;
  var classNames = getGlobalClassNames(GlobalClassNames$5, theme);
  var semanticColors = theme.semanticColors,
      effects = theme.effects;
  return {
    container: [classNames.container, {
      position: 'relative'
    }],
    root: [classNames.root, theme.fonts.medium, {
      position: 'absolute',
      boxSizing: 'border-box',
      borderRadius: effects.roundedCorner2,
      boxShadow: effects.elevation16,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'WindowText'
      })
    }, focusClear(), className, !!calloutWidth && {
      width: calloutWidth
    }, !!calloutMaxWidth && {
      maxWidth: calloutMaxWidth
    }],
    beak: [classNames.beak, {
      position: 'absolute',
      backgroundColor: semanticColors.menuBackground,
      boxShadow: 'inherit',
      border: 'inherit',
      boxSizing: 'border-box',
      transform: 'rotate(45deg)'
    }, getBeakStyle(beakWidth), backgroundColor && {
      backgroundColor: backgroundColor
    }],
    beakCurtain: [classNames.beakCurtain, {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: semanticColors.menuBackground,
      borderRadius: effects.roundedCorner2
    }],
    calloutMain: [classNames.calloutMain, {
      backgroundColor: semanticColors.menuBackground,
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'relative',
      borderRadius: effects.roundedCorner2
    }, overflowYHidden && {
      overflowY: 'hidden'
    }, backgroundColor && {
      backgroundColor: backgroundColor
    }]
  };
};

function clickedOutside(e, src) {
  return !src.contains(e.target);
}

var toKebabCase = function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
};

var DirectionalHint = {
  /**
   * Appear above the target element, with the left edges of the callout and target aligning.
   */
  topLeftEdge: 0,

  /**
   * Appear above the target element, with the centers of the callout and target aligning.
   */
  topCenter: 1,

  /**
   * Appear above the target element, with the right edges of the callout and target aligning.
   */
  topRightEdge: 2,

  /**
   * Appear above the target element, aligning with the target element such that the callout tends toward the center of the screen.
   */
  topAutoEdge: 3,

  /**
   * Appear below the target element, with the left edges of the callout and target aligning.
   */
  bottomLeftEdge: 4,

  /**
   * Appear below the target element, with the centers of the callout and target aligning.
   */
  bottomCenter: 5,

  /**
   * Appear below the target element, with the right edges of the callout and target aligning.
   */
  bottomRightEdge: 6,

  /**
   * Appear below the target element, aligning with the target element such that the callout tends toward the center of the screen.
   */
  bottomAutoEdge: 7,

  /**
   * Appear to the left of the target element, with the top edges of the callout and target aligning.
   */
  leftTopEdge: 8,

  /**
   * Appear to the left of the target element, with the centers of the callout and target aligning.
   */
  leftCenter: 9,

  /**
   * Appear to the left of the target element, with the bottom edges of the callout and target aligning.
   */
  leftBottomEdge: 10,

  /**
   * Appear to the right of the target element, with the top edges of the callout and target aligning.
   */
  rightTopEdge: 11,

  /**
   * Appear to the right of the target element, with the centers of the callout and target aligning.
   */
  rightCenter: 12,

  /**
   * Appear to the right of the target element, with the bottom edges of the callout and target aligning.
   */
  rightBottomEdge: 13
};

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

var _DirectionalDictionar;

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Rectangle =
/*#__PURE__*/
function (_FullRectangle) {
  _inherits(Rectangle, _FullRectangle);

  function Rectangle() {
    _classCallCheck(this, Rectangle);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).apply(this, arguments));
  }

  return Rectangle;
}(Rectangle$1);

function _createPositionData(targetEdge, alignmentEdge, isAuto) {
  return {
    targetEdge: targetEdge,
    alignmentEdge: alignmentEdge,
    isAuto: isAuto
  };
} // Currently the beakPercent is set to 50 for all positions meaning that it should tend to the center of the target


var DirectionalDictionary = (_DirectionalDictionar = {}, _defineProperty(_DirectionalDictionar, DirectionalHint.topLeftEdge, _createPositionData(RectangleEdge.top, RectangleEdge.left)), _defineProperty(_DirectionalDictionar, DirectionalHint.topCenter, _createPositionData(RectangleEdge.top)), _defineProperty(_DirectionalDictionar, DirectionalHint.topRightEdge, _createPositionData(RectangleEdge.top, RectangleEdge.right)), _defineProperty(_DirectionalDictionar, DirectionalHint.topAutoEdge, _createPositionData(RectangleEdge.top, undefined, true)), _defineProperty(_DirectionalDictionar, DirectionalHint.bottomLeftEdge, _createPositionData(RectangleEdge.bottom, RectangleEdge.left)), _defineProperty(_DirectionalDictionar, DirectionalHint.bottomCenter, _createPositionData(RectangleEdge.bottom)), _defineProperty(_DirectionalDictionar, DirectionalHint.bottomRightEdge, _createPositionData(RectangleEdge.bottom, RectangleEdge.right)), _defineProperty(_DirectionalDictionar, DirectionalHint.bottomAutoEdge, _createPositionData(RectangleEdge.bottom, undefined, true)), _defineProperty(_DirectionalDictionar, DirectionalHint.leftTopEdge, _createPositionData(RectangleEdge.left, RectangleEdge.top)), _defineProperty(_DirectionalDictionar, DirectionalHint.leftCenter, _createPositionData(RectangleEdge.left)), _defineProperty(_DirectionalDictionar, DirectionalHint.leftBottomEdge, _createPositionData(RectangleEdge.left, RectangleEdge.bottom)), _defineProperty(_DirectionalDictionar, DirectionalHint.rightTopEdge, _createPositionData(RectangleEdge.right, RectangleEdge.top)), _defineProperty(_DirectionalDictionar, DirectionalHint.rightCenter, _createPositionData(RectangleEdge.right)), _defineProperty(_DirectionalDictionar, DirectionalHint.rightBottomEdge, _createPositionData(RectangleEdge.right, RectangleEdge.bottom)), _DirectionalDictionar);

function _isRectangleWithinBounds(rect, boundingRect) {
  if (rect.top < boundingRect.top) {
    return false;
  }

  if (rect.bottom > boundingRect.bottom) {
    return false;
  }

  if (rect.left < boundingRect.left) {
    return false;
  }

  if (rect.right > boundingRect.right) {
    return false;
  }

  return true;
}
/**
 * Gets all of the edges of a rectangle that are outside of the given bounds.
 * If there are no out of bounds edges it returns an empty array.
 */


function _getOutOfBoundsEdges(rect, boundingRect) {
  var outOfBounds = [];

  if (rect.top < boundingRect.top) {
    outOfBounds.push(RectangleEdge.top);
  }

  if (rect.bottom > boundingRect.bottom) {
    outOfBounds.push(RectangleEdge.bottom);
  }

  if (rect.left < boundingRect.left) {
    outOfBounds.push(RectangleEdge.left);
  }

  if (rect.right > boundingRect.right) {
    outOfBounds.push(RectangleEdge.right);
  }

  return outOfBounds;
}

function _getEdgeValue(rect, edge) {
  return rect[RectangleEdge[edge]];
}

function _setEdgeValue(rect, edge, value) {
  rect[RectangleEdge[edge]] = value;
  return rect;
}
/**
 * Returns the middle value of an edge. Only returns 1 value rather than xy coordinates as
 * the itself already contains the other coordinate.
 * For instance, a bottom edge's current value is it's y coordinate, so the number returned is the x.
 *
 * @param {Rectangle} rect
 * @param {RectangleEdge} edge
 * @returns {number}
 */


function _getCenterValue(rect, edge) {
  var edges = _getFlankingEdges(edge);

  return (_getEdgeValue(rect, edges.positiveEdge) + _getEdgeValue(rect, edges.negativeEdge)) / 2;
}
/**
 * Flips the value depending on the edge.
 * If the edge is a "positive" edge, Top or Left, then the value should stay as it is.
 * If the edge is a "negative" edge, Bottom or Right, then the value should be flipped.
 * This is to account for the fact that the coordinates are effectively reveserved in certain cases for the "negative" edges.
 * For example, when testing to see if a bottom edge 1 is within the bounds of another bottom edge 2.
 * If edge 1 is greater than edge 2 then it is out of bounds. This is reversed for top edge 1 and top edge 2.
 * If top edge 1 is less than edge 2 then it is out of bounds.
 *
 *
 * @param {RectangleEdge} edge
 * @param {number} value
 * @returns {number}
 */


function _getRelativeEdgeValue(edge, value) {
  if (edge > 0) {
    return value;
  } else {
    return value * -1;
  }
}

function _getRelativeRectEdgeValue(edge, rect) {
  return _getRelativeEdgeValue(edge, _getEdgeValue(rect, edge));
}

function _getRelativeEdgeDifference(rect, hostRect, edge) {
  var edgeDifference = _getEdgeValue(rect, edge) - _getEdgeValue(hostRect, edge);

  return _getRelativeEdgeValue(edge, edgeDifference);
}
/**
 * Moves the edge of a rectangle to the value given. It only moves the edge in a linear direction based on that edge.
 * For example, if it's a bottom edge it will only change y coordinates.
 *
 * @param {Rectangle} rect
 * @param {RectangleEdge} edge
 * @param {number} newValue
 * @returns {Rectangle}
 */


function _moveEdge(rect, edge, newValue) {
  var difference = _getEdgeValue(rect, edge) - newValue;
  rect = _setEdgeValue(rect, edge, newValue);
  rect = _setEdgeValue(rect, edge * -1, _getEdgeValue(rect, edge * -1) - difference);
  return rect;
}
/**
 * Aligns the edge on the passed in rect to the target. If there is a gap then it will have that space between the two.
 *
 * @param {Rectangle} rect
 * @param {Rectangle} target
 * @param {RectangleEdge} edge
 * @param {number} [gap=0]
 * @returns {Rectangle}
 */


function _alignEdges(rect, target, edge) {
  var gap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return _moveEdge(rect, edge, _getEdgeValue(target, edge) + _getRelativeEdgeValue(edge, gap));
}
/**
 * Aligns the targetEdge on the passed in target to the rects corresponding opposite edge.
 * For instance if targetEdge is bottom, then the rects top will be moved to match it.
 *
 * @param {Rectangle} rect
 * @param {Rectangle} target
 * @param {RectangleEdge} targetEdge
 * @param {number} [gap=0]
 * @returns {Rectangle}
 */


function _alignOppositeEdges(rect, target, targetEdge) {
  var gap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var oppositeEdge = targetEdge * -1;

  var adjustedGap = _getRelativeEdgeValue(oppositeEdge, gap);

  return _moveEdge(rect, targetEdge * -1, _getEdgeValue(target, targetEdge) + adjustedGap);
}
/**
 * Tests to see if the given edge is within the bounds of the given rectangle.
 *
 * @param {Rectangle} rect
 * @param {Rectangle} bounds
 * @param {RectangleEdge} edge
 * @returns {boolean}
 */


function _isEdgeInBounds(rect, bounds, edge) {
  var adjustedRectValue = _getRelativeRectEdgeValue(edge, rect);

  return adjustedRectValue > _getRelativeRectEdgeValue(edge, bounds);
}
/**
 * Attempts to move the rectangle through various sides of the target to find a place to fit.
 * If no fit is found, the original position should be returned.
 *
 * @param {Rectangle} rect
 * @param {Rectangle} target
 * @param {Rectangle} bounding
 * @param {IPositionDirectionalHintData} positionData
 * @param {number} [gap=0]
 * @returns {IElementPosition}
 */


function _flipToFit(rect, target, bounding, positionData) {
  var gap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var directions = [RectangleEdge.left, RectangleEdge.right, RectangleEdge.bottom, RectangleEdge.top]; // In RTL page, RectangleEdge.right has a higher priority than RectangleEdge.left, therefore the order should be updated.

  if (getRTL()) {
    directions[0] *= -1;
    directions[1] *= -1;
  }

  var currentEstimate = rect;
  var currentEdge = positionData.targetEdge;
  var currentAlignment = positionData.alignmentEdge; // Keep switching sides until one is found with enough space. If all sides don't fit then return the unmodified element.

  for (var i = 0; i < 4; i++) {
    if (!_isEdgeInBounds(currentEstimate, bounding, currentEdge)) {
      directions.splice(directions.indexOf(currentEdge), 1);

      if (directions.length > 0) {
        if (directions.indexOf(currentEdge * -1) > -1) {
          currentEdge = currentEdge * -1;
        } else {
          currentAlignment = currentEdge;
          currentEdge = directions.slice(-1)[0];
        }

        currentEstimate = _estimatePosition(rect, target, {
          targetEdge: currentEdge,
          alignmentEdge: currentAlignment
        }, gap);
      }
    } else {
      return {
        elementRectangle: currentEstimate,
        targetEdge: currentEdge,
        alignmentEdge: currentAlignment
      };
    }
  }

  return {
    elementRectangle: rect,
    targetEdge: positionData.targetEdge,
    alignmentEdge: currentAlignment
  };
}
/**
 * Flips only the alignment edge of an element rectangle. This is used instead of nudging the alignment edges into position,
 * when alignTargetEdge is specified.
 * @param elementEstimate
 * @param target
 * @param bounding
 * @param gap
 */


function _flipAlignmentEdge(elementEstimate, target, gap, coverTarget) {
  var alignmentEdge = elementEstimate.alignmentEdge,
      targetEdge = elementEstimate.targetEdge,
      elementRectangle = elementEstimate.elementRectangle;
  var oppositeEdge = alignmentEdge * -1;

  var newEstimate = _estimatePosition(elementRectangle, target, {
    targetEdge: targetEdge,
    alignmentEdge: oppositeEdge
  }, gap, coverTarget);

  return {
    elementRectangle: newEstimate,
    targetEdge: targetEdge,
    alignmentEdge: oppositeEdge
  };
}
/**
 * Adjusts a element rectangle to fit within the bounds given. If directionalHintFixed or covertarget is passed in
 * then the element will not flip sides on the target. They will, however, be nudged to fit within the bounds given.
 *
 * @param {Rectangle} element
 * @param {Rectangle} target
 * @param {Rectangle} bounding
 * @param {IPositionDirectionalHintData} positionData
 * @param {number} [gap=0]
 * @param {boolean} [directionalHintFixed]
 * @param {boolean} [coverTarget]
 * @returns {IElementPosition}
 */


function _adjustFitWithinBounds(element, target, bounding, positionData) {
  var gap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var directionalHintFixed = arguments.length > 5 ? arguments[5] : undefined;
  var coverTarget = arguments.length > 6 ? arguments[6] : undefined;
  var alignmentEdge = positionData.alignmentEdge,
      alignTargetEdge = positionData.alignTargetEdge;
  var elementEstimate = {
    elementRectangle: element,
    targetEdge: positionData.targetEdge,
    alignmentEdge: alignmentEdge
  };

  if (!directionalHintFixed && !coverTarget) {
    elementEstimate = _flipToFit(element, target, bounding, positionData, gap);
  }

  var outOfBounds = _getOutOfBoundsEdges(element, bounding);

  if (alignTargetEdge) {
    // The edge opposite to the alignment edge might be out of bounds. Flip alignment to see if we can get it within bounds.
    if (elementEstimate.alignmentEdge && outOfBounds.indexOf(elementEstimate.alignmentEdge * -1) > -1) {
      var flippedElementEstimate = _flipAlignmentEdge(elementEstimate, target, gap, coverTarget);

      if (_isRectangleWithinBounds(flippedElementEstimate.elementRectangle, bounding)) {
        return flippedElementEstimate;
      } else {
        // If the flipped elements edges are still out of bounds, try nudging it.
        elementEstimate = _alignOutOfBoundsEdges(_getOutOfBoundsEdges(flippedElementEstimate.elementRectangle, bounding), elementEstimate, bounding);
      }
    }
  } else {
    elementEstimate = _alignOutOfBoundsEdges(outOfBounds, elementEstimate, bounding);
  }

  return elementEstimate;
}
/**
 * Iterates through a list of out of bounds edges and tries to nudge and align them.
 * @param outOfBoundsEdges Array of edges that are out of bounds
 * @param elementEstimate The current element positioning estimate
 * @param bounding The current bounds
 */


function _alignOutOfBoundsEdges(outOfBoundsEdges, elementEstimate, bounding) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = outOfBoundsEdges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var direction = _step.value;
      elementEstimate.elementRectangle = _alignEdges(elementEstimate.elementRectangle, bounding, direction);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return elementEstimate;
}
/**
 * Moves the middle point on an edge to the point given.
 * Only moves in one direction. For instance if a bottom edge is passed in, then
 * the bottom edge will be moved in the x axis to match the point.
 *
 * @param {Rectangle} rect
 * @param {RectangleEdge} edge
 * @param {number} point
 * @returns {Rectangle}
 */


function _centerEdgeToPoint(rect, edge, point) {
  var _getFlankingEdges2 = _getFlankingEdges(edge),
      positiveEdge = _getFlankingEdges2.positiveEdge;

  var elementMiddle = _getCenterValue(rect, edge);

  var distanceToMiddle = elementMiddle - _getEdgeValue(rect, positiveEdge);

  return _moveEdge(rect, positiveEdge, point - distanceToMiddle);
}
/**
 * Moves the element rectangle to be appropriately positioned relative to a given target.
 * Does not flip or adjust the element.
 *
 * @param {Rectangle} elementToPosition
 * @param {Rectangle} target
 * @param {IPositionDirectionalHintData} positionData
 * @param {number} [gap=0]
 * @param {boolean} [coverTarget]
 * @returns {Rectangle}
 */


function _estimatePosition(elementToPosition, target, positionData) {
  var gap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var coverTarget = arguments.length > 4 ? arguments[4] : undefined;
  var estimatedElementPosition;
  var alignmentEdge = positionData.alignmentEdge,
      targetEdge = positionData.targetEdge;
  var elementEdge = coverTarget ? targetEdge : targetEdge * -1;
  estimatedElementPosition = coverTarget ? _alignEdges(elementToPosition, target, targetEdge, gap) : _alignOppositeEdges(elementToPosition, target, targetEdge, gap); // if no alignment edge is provided it's supposed to be centered.

  if (!alignmentEdge) {
    var targetMiddlePoint = _getCenterValue(target, targetEdge);

    estimatedElementPosition = _centerEdgeToPoint(estimatedElementPosition, elementEdge, targetMiddlePoint);
  } else {
    estimatedElementPosition = _alignEdges(estimatedElementPosition, target, alignmentEdge);
  }

  return estimatedElementPosition;
}
/**
 * Returns the non-opposite edges of the target edge.
 * For instance if bottom is passed in then left and right will be returned.
 *
 * @param {RectangleEdge} edge
 * @returns {{ firstEdge: RectangleEdge, secondEdge: RectangleEdge }}
 */


function _getFlankingEdges(edge) {
  if (edge === RectangleEdge.top || edge === RectangleEdge.bottom) {
    return {
      positiveEdge: RectangleEdge.left,
      negativeEdge: RectangleEdge.right
    };
  } else {
    return {
      positiveEdge: RectangleEdge.top,
      negativeEdge: RectangleEdge.bottom
    };
  }
}
/**
 * Retrieve the final value for the return edge of elementRectangle.
 * If the elementRectangle is closer to one side of the bounds versus the other, the return edge is flipped to grow inward.
 *
 * @param elementRectangle
 * @param targetEdge
 * @param bounds
 */


function _finalizeReturnEdge(elementRectangle, returnEdge, bounds) {
  if (bounds && Math.abs(_getRelativeEdgeDifference(elementRectangle, bounds, returnEdge)) > Math.abs(_getRelativeEdgeDifference(elementRectangle, bounds, returnEdge * -1))) {
    return returnEdge * -1;
  }

  return returnEdge;
}
/**
 * Finalizes the element positon based on the hostElement. Only returns the
 * rectangle values to position such that they are anchored to the target.
 * This helps prevent resizing from looking very strange.
 * For instance, if the target edge is top and aligned with the left side then
 * the bottom and left values are returned so as the callou shrinks it shrinks towards that corner.
 *
 * @param {Rectangle} elementRectangle
 * @param {HTMLElement} hostElement
 * @param {RectangleEdge} targetEdge
 * @param {RectangleEdge} bounds
 * @param {RectangleEdge} [alignmentEdge]
 * @param {boolean} coverTarget
 * @param {boolean} doNotFinalizeReturnEdge
 * @returns {IPartialIRectangle}
 */


function _finalizeElementPosition(elementRectangle, hostElement, targetEdge, bounds, alignmentEdge, coverTarget, doNotFinalizeReturnEdge) {
  var returnValue = {};

  var hostRect = _getRectangleFromElement(hostElement);

  var elementEdge = coverTarget ? targetEdge : targetEdge * -1;
  var elementEdgeString = RectangleEdge[elementEdge];

  var returnEdge = alignmentEdge || _getFlankingEdges(targetEdge).positiveEdge;

  if (!doNotFinalizeReturnEdge) {
    returnEdge = _finalizeReturnEdge(elementRectangle, returnEdge, bounds);
  }

  returnValue[elementEdgeString] = _getRelativeEdgeDifference(elementRectangle, hostRect, elementEdge);
  returnValue[RectangleEdge[returnEdge]] = _getRelativeEdgeDifference(elementRectangle, hostRect, returnEdge);
  return returnValue;
} // Since the beak is rotated 45 degrees the actual height/width is the length of the diagonal.
// We still want to position the beak based on it's midpoint which does not change. It will
// be at (beakwidth / 2, beakwidth / 2)


function _calculateActualBeakWidthInPixels(beakWidth) {
  return Math.sqrt(beakWidth * beakWidth * 2);
}
/**
 * Returns the appropriate IPositionData based on the props altered for RTL.
 * If directionalHintForRTL is passed in that is used if the page is RTL.
 * If a directionalHint is specified and no directionalHintForRTL is available and the page is RTL the hint will be flipped.
 * For instance bottomLeftEdge would become bottomRightEdge.
 * If there is no directionalHint passed in bottomAutoEdge is chosen automatically.
 *
 * @param {IPositionProps} props
 * @returns {IPositionDirectionalHintData}
 */


function _getPositionData() {
  var directionalHint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DirectionalHint.bottomAutoEdge;
  var directionalHintForRTL = arguments.length > 1 ? arguments[1] : undefined;
  var previousPositions = arguments.length > 2 ? arguments[2] : undefined;

  if (previousPositions) {
    return {
      alignmentEdge: previousPositions.alignmentEdge,
      isAuto: previousPositions.isAuto,
      targetEdge: previousPositions.targetEdge
    };
  }

  var positionInformation = _objectSpread$6({}, DirectionalDictionary[directionalHint]);

  if (getRTL()) {
    // If alignment edge exists and that alignment edge is -2 or 2, right or left, then flip it.
    if (positionInformation.alignmentEdge && positionInformation.alignmentEdge % 2 === 0) {
      positionInformation.alignmentEdge = positionInformation.alignmentEdge * -1;
    }

    return directionalHintForRTL !== undefined ? DirectionalDictionary[directionalHintForRTL] : positionInformation;
  }

  return positionInformation;
}
/**
 * Get's the alignment data for the given information. This only really matters if the positioning is Auto.
 * If it is auto then the alignmentEdge should be chosen based on the target edge's position relative to
 * the center of the page.
 *
 * @param {IPositionDirectionalHintData} positionData
 * @param {Rectangle} target
 * @param {Rectangle} boundingRect
 * @param {boolean} [coverTarget]
 * @returns {IPositionDirectionalHintData}
 */


function _getAlignmentData(positionData, target, boundingRect, coverTarget, alignTargetEdge) {
  if (positionData.isAuto) {
    positionData.alignmentEdge = getClosestEdge(positionData.targetEdge, target, boundingRect);
  }

  positionData.alignTargetEdge = alignTargetEdge;
  return positionData;
}

function getClosestEdge(targetEdge, target, boundingRect) {
  var targetCenter = _getCenterValue(target, targetEdge);

  var boundingCenter = _getCenterValue(boundingRect, targetEdge);

  var _getFlankingEdges3 = _getFlankingEdges(targetEdge),
      positiveEdge = _getFlankingEdges3.positiveEdge,
      negativeEdge = _getFlankingEdges3.negativeEdge;

  if (targetCenter <= boundingCenter) {
    return positiveEdge;
  } else {
    return negativeEdge;
  }
}

function _positionElementWithinBounds(elementToPosition, target, bounding, positionData, gap, directionalHintFixed, coverTarget) {
  var estimatedElementPosition = _estimatePosition(elementToPosition, target, positionData, gap, coverTarget);

  if (_isRectangleWithinBounds(estimatedElementPosition, bounding)) {
    return {
      elementRectangle: estimatedElementPosition,
      targetEdge: positionData.targetEdge,
      alignmentEdge: positionData.alignmentEdge
    };
  } else {
    return _adjustFitWithinBounds(elementToPosition, target, bounding, positionData, gap, directionalHintFixed, coverTarget);
  }
}

function _finalizeBeakPosition(elementPosition, positionedBeak, bounds) {
  var targetEdge = elementPosition.targetEdge * -1; // The "host" element that we will use to help position the beak.

  var actualElement = new Rectangle(0, elementPosition.elementRectangle.width, 0, elementPosition.elementRectangle.height);
  var returnValue = {};

  var returnEdge = _finalizeReturnEdge(elementPosition.elementRectangle, elementPosition.alignmentEdge ? elementPosition.alignmentEdge : _getFlankingEdges(targetEdge).positiveEdge, bounds);

  returnValue[RectangleEdge[targetEdge]] = _getEdgeValue(positionedBeak, targetEdge);
  returnValue[RectangleEdge[returnEdge]] = _getRelativeEdgeDifference(positionedBeak, actualElement, returnEdge);
  return {
    elementPosition: _objectSpread$6({}, returnValue),
    closestEdge: getClosestEdge(elementPosition.targetEdge, positionedBeak, actualElement),
    targetEdge: targetEdge
  };
}

function _positionBeak(beakWidth, elementPosition) {
  var target = elementPosition.targetRectangle;
  /**
   * Note about beak positioning: The actual beak width only matters for getting the gap between the callout and
   * target, it does not impact the beak placement within the callout. For example example, if the beakWidth is 8,
   * then the actual beakWidth is sqrroot(8^2 + 8^2) = 11.31x11.31. So the callout will need to be an extra 3 pixels
   * away from its target. While the beak is being positioned in the callout it still acts as though it were 8x8.
   * */

  var _getFlankingEdges4 = _getFlankingEdges(elementPosition.targetEdge),
      positiveEdge = _getFlankingEdges4.positiveEdge,
      negativeEdge = _getFlankingEdges4.negativeEdge;

  var beakTargetPoint = _getCenterValue(target, elementPosition.targetEdge);

  var elementBounds = new Rectangle(beakWidth / 2, elementPosition.elementRectangle.width - beakWidth / 2, beakWidth / 2, elementPosition.elementRectangle.height - beakWidth / 2);
  var beakPosition = new Rectangle(0, beakWidth, 0, beakWidth);
  beakPosition = _moveEdge(beakPosition, elementPosition.targetEdge * -1, -beakWidth / 2);
  beakPosition = _centerEdgeToPoint(beakPosition, elementPosition.targetEdge * -1, beakTargetPoint - _getRelativeRectEdgeValue(positiveEdge, elementPosition.elementRectangle));

  if (!_isEdgeInBounds(beakPosition, elementBounds, positiveEdge)) {
    beakPosition = _alignEdges(beakPosition, elementBounds, positiveEdge);
  } else if (!_isEdgeInBounds(beakPosition, elementBounds, negativeEdge)) {
    beakPosition = _alignEdges(beakPosition, elementBounds, negativeEdge);
  }

  return beakPosition;
}

function _getRectangleFromElement(element) {
  var clientRect = element.getBoundingClientRect();
  return new Rectangle(clientRect.left, clientRect.right, clientRect.top, clientRect.bottom);
}

function _getRectangleFromIRect(rect) {
  return new Rectangle(rect.left, rect.right, rect.top, rect.bottom);
}

function _getTargetRect(bounds, target) {
  var targetRectangle;

  if (target) {
    // @ts-ignore
    if (target.preventDefault) {
      var ev = target;
      targetRectangle = new Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY); // @ts-ignore
    } else if (target.getBoundingClientRect) {
      targetRectangle = _getRectangleFromElement(target); // HTMLImgElements can have x and y values. The check for it being a point must go last.
    } else {
      var point = target;
      targetRectangle = new Rectangle(point.x, point.x, point.y, point.y);
    }

    if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
      var outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = outOfBounds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var direction = _step2.value;
          targetRectangle[RectangleEdge[direction]] = bounds[RectangleEdge[direction]];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } else {
    targetRectangle = new Rectangle(0, 0, 0, 0);
  }

  return targetRectangle;
}

function _positionElementRelative(props, elementToPosition, boundingRect, previousPositions) {
  var gap = props.gapSpace ? props.gapSpace : 0;

  var targetRect = _getTargetRect(boundingRect, props.target);

  var positionData = _getAlignmentData(_getPositionData(props.directionalHint, props.directionalHintForRTL, previousPositions), targetRect, boundingRect, props.coverTarget, props.alignTargetEdge);

  var positionedElement = _positionElementWithinBounds(_getRectangleFromElement(elementToPosition), targetRect, boundingRect, positionData, gap, props.directionalHintFixed, props.coverTarget);

  return _objectSpread$6({}, positionedElement, {
    targetRectangle: targetRect
  });
}

function _finalizePositionData(positionedElement, hostElement, bounds, coverTarget, doNotFinalizeReturnEdge) {
  var finalizedElement = _finalizeElementPosition(positionedElement.elementRectangle, hostElement, positionedElement.targetEdge, bounds, positionedElement.alignmentEdge, coverTarget, doNotFinalizeReturnEdge);

  return {
    elementPosition: finalizedElement,
    targetEdge: positionedElement.targetEdge,
    alignmentEdge: positionedElement.alignmentEdge
  };
}

function _positionCallout(props, hostElement, callout, previousPositions, doNotFinalizeReturnEdge) {
  var beakWidth = props.isBeakVisible ? props.beakWidth || 0 : 0;
  var gap = _calculateActualBeakWidthInPixels(beakWidth) / 2 + (props.gapSpace ? props.gapSpace : 0);
  var positionProps = props;
  positionProps.gapSpace = gap;
  var boundingRect = props.bounds ? _getRectangleFromIRect(props.bounds) : new Rectangle(0, window.innerWidth - getScrollbarWidth(), 0, window.innerHeight);

  var positionedElement = _positionElementRelative(positionProps, callout, boundingRect, previousPositions);

  var beakPositioned = _positionBeak(beakWidth, positionedElement);

  var finalizedBeakPosition = _finalizeBeakPosition(positionedElement, beakPositioned, boundingRect);

  return _objectSpread$6({}, _finalizePositionData(positionedElement, hostElement, boundingRect, props.coverTarget, doNotFinalizeReturnEdge), {
    beakPosition: finalizedBeakPosition
  });
}
function positionCallout(props, hostElement, elementToPosition, previousPositions) {
  return _positionCallout(props, hostElement, elementToPosition, previousPositions);
}

var getClassNames$7 = classNamesFunction();

var CalloutContent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(CalloutContent, _BaseComponent);

  function CalloutContent() {
    var _this;

    _classCallCheck(this, CalloutContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CalloutContent).apply(this, arguments));
    _this.internalKey = new Date();
    _this.positions = null;
    _this.positionAttempts = 0;
    return _this;
  }

  _createClass(CalloutContent, [{
    key: "created",
    value: function created() {
      window.addEventListener('click', this.onGlobalClick, true);
      window.addEventListener('scroll', this.onGlobalScroll, true);
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      window.removeEventListener('click', this.onGlobalClick, true);
      window.removeEventListener('scroll', this.onGlobalScroll, true);
    }
  }, {
    key: "updated",
    value: function updated() {
      this.internalKey = new Date();
    }
  }, {
    key: "mounted",
    value: function () {
      var _mounted = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.updatePosition();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mounted() {
        return _mounted.apply(this, arguments);
      }

      return mounted;
    }()
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var positions = this.positions;
      var currentProps;
      currentProps = assign(currentProps, this.$props);
      currentProps.bounds = this.bounds;
      currentProps.target = this.target;
      var newPositions = positionCallout(currentProps, this.$refs.hostElement, this.$refs.calloutElement, this.positions);

      if (!positions && newPositions || positions && newPositions && !this._arePositionsEqual(positions, newPositions) && this.positionAttempts < 5) {
        this.positionAttempts++;
        this.positions = newPositions;
      } else if (this.positionAttempts > 0) {
        this.positionAttempts = 0;
        this.$emit('positioned', this.positions);
      }
    }
  }, {
    key: "onGlobalClick",
    value: function onGlobalClick(e) {
      var outside = clickedOutside(e, this.$refs.calloutElement);
      if (outside) this.$emit('dismiss', true);
    }
  }, {
    key: "onGlobalScroll",
    value: function onGlobalScroll(e) {
      this.$emit('dismiss', true);
    }
  }, {
    key: "_arePositionsEqual",
    value: function _arePositionsEqual(positions, newPosition) {
      return this._comparePositions(positions.elementPosition, newPosition.elementPosition) && this._comparePositions(positions.beakPosition.elementPosition, newPosition.beakPosition.elementPosition);
    }
  }, {
    key: "_comparePositions",
    value: function _comparePositions(oldPositions, newPositions) {
      for (var key in newPositions) {
        // This needs to be checked here and below because there is a linting error if for in does not immediately have an if statement
        if (newPositions.hasOwnProperty(key)) {
          var oldPositionEdge = oldPositions[key];
          var newPositionEdge = newPositions[key];

          if (oldPositionEdge !== undefined && newPositionEdge !== undefined) {
            if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
              return false;
            }
          } else {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          positions = this.positions,
          styles = this.styles,
          calloutWidth = this.calloutWidth,
          beakWidth = this.beakWidth;
      return getClassNames$7(concatStyleSetsWithProps({
        theme: theme,
        className: className,
        overflowYHidden: false,
        calloutWidth: calloutWidth,
        beakWidth: beakWidth,
        backgroundColor: '#fff',
        calloutMaxWidth: '100%'
      }, getStyles$f, styles));
    }
  }, {
    key: "actualBeakWidth",
    get: function get() {
      return Math.sqrt(this.beakWidth * this.beakWidth * 2);
    }
  }, {
    key: "positionCss",
    get: function get() {
      if (!this.positions) return null;
      var positionCss = this.positions;

      for (var key in positionCss.elementPosition) {
        positionCss.elementPosition[key] = "".concat(positionCss.elementPosition[key], "px");
      }

      for (var _key in positionCss.beakPosition.elementPosition) {
        positionCss.beakPosition.elementPosition[_key] = "".concat(positionCss.beakPosition.elementPosition[_key], "px");
      }

      return positionCss;
    }
  }, {
    key: "bounds",
    get: function get() {
      return {
        top: 0 + this.minPagePadding,
        left: 0 + this.minPagePadding,
        right: window.innerWidth - this.minPagePadding,
        bottom: window.innerHeight - this.minPagePadding,
        width: window.innerWidth - this.minPagePadding * 2,
        height: window.innerHeight - this.minPagePadding * 2
      };
    }
  }]);

  return CalloutContent;
}(BaseComponent$1);

__decorate([Prop({
  type: HTMLElement,
  required: true
}), __metadata("design:type", HTMLElement)], CalloutContent.prototype, "target", void 0);

__decorate([Prop({
  type: Number,
  default: null
}), __metadata("design:type", Number)], CalloutContent.prototype, "calloutWidth", void 0);

__decorate([Prop({
  type: Number,
  default: 16
}), __metadata("design:type", Number)], CalloutContent.prototype, "beakWidth", void 0);

__decorate([Prop({
  type: Number,
  default: 8
}), __metadata("design:type", Number)], CalloutContent.prototype, "minPagePadding", void 0);

__decorate([Prop({
  type: Boolean,
  default: true
}), __metadata("design:type", Boolean)], CalloutContent.prototype, "isBeakVisible", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], CalloutContent.prototype, "coverTarget", void 0);

__decorate([Prop({
  type: Number,
  default: 0
}), __metadata("design:type", Number)], CalloutContent.prototype, "gapSpace", void 0);

CalloutContent = __decorate([Component({
  components: {}
})], CalloutContent);
var script$f = CalloutContent;

/* script */
var __vue_script__$f = script$f;
/* template */

var __vue_render__$e = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "hostElement",
    class: _vm.classNames.container
  }, [_c('div', {
    ref: "calloutElement",
    class: _vm.classNames.root,
    style: _vm.positionCss ? _vm.positionCss.elementPosition : null
  }, [_vm.isBeakVisible ? _c('div', {
    class: _vm.classNames.beak,
    style: _vm.positionCss && _vm.positionCss.beakPosition ? _vm.positionCss.beakPosition.elementPosition : null
  }) : _vm._e(), _vm._v(" "), _vm.isBeakVisible ? _c('div', {
    class: _vm.classNames.beakCurtain
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.classNames.calloutMain
  }, [_vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__$e = [];
/* style */

var __vue_inject_styles__$f = undefined;
/* scoped */

var __vue_scope_id__$f = undefined;
/* module identifier */

var __vue_module_identifier__$f = undefined;
/* functional template */

var __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$f = __vue_normalize__({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, undefined, undefined);

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Callout =
/*#__PURE__*/
function (_StatelessComponent) {
  _inherits(Callout, _StatelessComponent);

  function Callout() {
    _classCallCheck(this, Callout);

    return _possibleConstructorReturn(this, _getPrototypeOf(Callout).apply(this, arguments));
  }

  _createClass(Callout, [{
    key: "render",
    value: function render(h, context) {
      if (!(context.props.target instanceof Node)) return;

      var _context$props = context.props,
          layerProps = _context$props.layerProps,
          rest = _objectWithoutProperties(_context$props, ["layerProps"]);

      var content = h(__vue_component__$f, _objectSpread$7({}, context.data, {
        props: _objectSpread$7({}, rest, {}, context.data.attrs)
      }), context.children);
      return context.props.doNotLayer ? content : h(__vue_component__$b, _objectSpread$7({}, context.data, {
        props: _objectSpread$7({}, layerProps)
      }), [content]);
    }
  }]);

  return Callout;
}(StatelessComponent$1);

__decorate([Prop({
  type: HTMLElement,
  required: true
}), __metadata("design:type", Object)], Callout.prototype, "target", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Callout.prototype, "doNotLayer", void 0);

Callout = __decorate([Component], Callout);
var script$g = Callout;

/* script */
var __vue_script__$g = script$g;
/* template */

/* style */

var __vue_inject_styles__$g = undefined;
/* scoped */

var __vue_scope_id__$g = "data-v-5b84899e";
/* module identifier */

var __vue_module_identifier__$g = undefined;
/* functional template */

var __vue_is_functional_template__$g = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$g = __vue_normalize__({}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, undefined, undefined);

var ComboBoxHeight = 32;
var ComboBoxLineHeight = 30;
var ComboBoxCaretDownWidth = 32;
var ComboBoxOptionHeight = 36;
var getDisabledStyles = memoizeFunction(function (theme) {
  var semanticColors = theme.semanticColors;
  return {
    backgroundColor: semanticColors.disabledBackground,
    borderColor: semanticColors.disabledBackground,
    color: semanticColors.disabledText,
    cursor: 'default',
    selectors: _defineProperty({}, HighContrastSelector, {
      borderColor: 'GrayText',
      color: 'GrayText'
    })
  };
});
var listOptionHighContrastStyles = {
  selectors: _defineProperty({}, HighContrastSelector, {
    backgroundColor: 'Highlight',
    borderColor: 'Highlight',
    color: 'HighlightText',
    MsHighContrastAdjust: 'none'
  })
};
var inputHighContrastStyles = {
  selectors: _defineProperty({}, HighContrastSelector, {
    color: 'WindowText',
    backgroundColor: 'Window',
    MsHighContrastAdjust: 'none'
  })
};
var getOptionStyles = memoizeFunction(function (theme, customStylesForAllOptions, customOptionStylesForCurrentOption, isPending, isHidden) {
  var _selectors4;

  var palette = theme.palette,
      semanticColors = theme.semanticColors;
  var option = {
    textHoveredColor: semanticColors.menuItemTextHovered,
    textSelectedColor: palette.neutralDark,
    textDisabledColor: semanticColors.disabledText,
    backgroundHoveredColor: semanticColors.menuItemBackgroundHovered,
    backgroundPressedColor: semanticColors.menuItemBackgroundPressed
  };
  var optionStyles = {
    root: [theme.fonts.medium, {
      backgroundColor: isPending ? option.backgroundHoveredColor : 'transparent',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: isHidden ? 'none' : 'block',
      width: '100%',
      height: 'auto',
      minHeight: ComboBoxOptionHeight,
      lineHeight: '20px',
      padding: '0 8px',
      position: 'relative',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 0,
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      textAlign: 'left',
      selectors: (_selectors4 = {}, _defineProperty(_selectors4, HighContrastSelector, {
        borderColor: 'Background'
      }), _defineProperty(_selectors4, '&.ms-Checkbox', {
        display: 'flex',
        alignItems: 'center'
      }), _defineProperty(_selectors4, '&.ms-Button--command:hover:active', {
        backgroundColor: option.backgroundPressedColor
      }), _defineProperty(_selectors4, '.ms-Checkbox-label', {
        width: '100%'
      }), _selectors4)
    }],
    rootHovered: {
      backgroundColor: option.backgroundHoveredColor,
      color: option.textHoveredColor
    },
    rootFocused: {
      backgroundColor: option.backgroundHoveredColor
    },
    rootChecked: [{
      backgroundColor: 'transparent',
      color: option.textSelectedColor,
      selectors: {
        ':hover': [{
          backgroundColor: option.backgroundHoveredColor
        }, listOptionHighContrastStyles]
      }
    }, getFocusStyle(theme, {
      inset: -1,
      isFocusedOnly: false
    }), listOptionHighContrastStyles],
    rootDisabled: {
      color: option.textDisabledColor,
      cursor: 'default'
    },
    optionText: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      minWidth: '0px',
      maxWidth: '100%',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      display: 'inline-block'
    },
    optionTextWrapper: {
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'center'
    }
  };
  return concatStyleSets(optionStyles, customStylesForAllOptions, customOptionStylesForCurrentOption);
});
var getCaretDownButtonStyles = memoizeFunction(function (theme, customStyles) {
  var semanticColors = theme.semanticColors,
      fonts = theme.fonts;
  var caret = {
    buttonTextColor: semanticColors.bodySubtext,
    buttonTextHoveredCheckedColor: semanticColors.buttonTextChecked,
    buttonBackgroundHoveredColor: semanticColors.listItemBackgroundHovered,
    buttonBackgroundCheckedColor: semanticColors.listItemBackgroundChecked,
    buttonBackgroundCheckedHoveredColor: semanticColors.listItemBackgroundCheckedHovered
  };
  var buttonHighContrastStyles = {
    selectors: _defineProperty({}, HighContrastSelector, {
      backgroundColor: 'Highlight',
      borderColor: 'Highlight',
      color: 'HighlightText',
      MsHighContrastAdjust: 'none'
    })
  };
  var styles = {
    root: {
      color: caret.buttonTextColor,
      fontSize: fonts.small.fontSize,
      position: 'absolute',
      height: ComboBoxHeight,
      lineHeight: ComboBoxLineHeight,
      width: ComboBoxCaretDownWidth,
      textAlign: 'center',
      cursor: 'default',
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'ButtonFace',
        borderColor: 'ButtonText',
        color: 'ButtonText',
        MsHighContrastAdjust: 'none'
      })
    },
    icon: {
      fontSize: fonts.small.fontSize
    },
    rootHovered: [{
      backgroundColor: caret.buttonBackgroundHoveredColor,
      color: caret.buttonTextHoveredCheckedColor,
      cursor: 'pointer'
    }, buttonHighContrastStyles],
    rootPressed: [{
      backgroundColor: caret.buttonBackgroundCheckedColor,
      color: caret.buttonTextHoveredCheckedColor
    }, buttonHighContrastStyles],
    rootChecked: [{
      backgroundColor: caret.buttonBackgroundCheckedColor,
      color: caret.buttonTextHoveredCheckedColor
    }, buttonHighContrastStyles],
    rootCheckedHovered: [{
      backgroundColor: caret.buttonBackgroundCheckedHoveredColor,
      color: caret.buttonTextHoveredCheckedColor
    }, buttonHighContrastStyles],
    rootDisabled: [getDisabledStyles(theme), {
      position: 'absolute'
    }]
  };
  return concatStyleSets(styles, customStyles);
});
var getStyles$g = memoizeFunction(function (theme, customStyles, comboBoxOptionWidth) {
  var semanticColors = theme.semanticColors,
      fonts = theme.fonts,
      effects = theme.effects;
  var root = {
    textColor: semanticColors.bodyText,
    borderColor: semanticColors.inputBorder,
    borderHoveredColor: semanticColors.inputBorderHovered,
    borderPressedColor: semanticColors.inputFocusBorderAlt,
    borderFocusedColor: semanticColors.inputFocusBorderAlt,
    backgroundColor: semanticColors.bodyBackground,
    erroredColor: semanticColors.errorText
  };
  var option = {
    headerTextColor: semanticColors.menuHeader,
    dividerBorderColor: semanticColors.bodyDivider
  }; // placeholder style variables

  var placeholderHighContrastStyles = {
    selectors: _defineProperty({}, HighContrastSelector, {
      color: 'GrayText'
    })
  };
  var placeholderStyles = [{
    color: semanticColors.inputPlaceholderText
  }, placeholderHighContrastStyles];
  var placeholderStylesHovered = [{
    color: semanticColors.inputTextHovered
  }, placeholderHighContrastStyles];
  var disabledPlaceholderStyles = [{
    color: semanticColors.disabledText
  }, placeholderHighContrastStyles];
  var ComboBoxRootHighContrastFocused = {
    color: 'HighlightText',
    borderColor: 'Highlight',
    backgroundColor: 'Window',
    MsHighContrastAdjust: 'none'
  };

  var getFocusBorder = function getFocusBorder(color) {
    return {
      borderColor: color,
      selectors: {
        ':after': {
          pointerEvents: 'none',
          content: "''",
          position: 'absolute',
          left: -1,
          top: -1,
          bottom: -1,
          right: -1,
          border: '2px solid ' + color,
          borderRadius: effects.roundedCorner2,
          selectors: _defineProperty({}, HighContrastSelector, {
            borderColor: 'Highlight'
          })
        }
      }
    };
  };

  var styles = {
    container: {},
    label: {},
    labelDisabled: {},
    root: [theme.fonts.medium, {
      boxShadow: 'none',
      marginLeft: '0',
      paddingTop: 1,
      paddingBottom: 1,
      paddingRight: ComboBoxCaretDownWidth,
      paddingLeft: 8,
      color: root.textColor,
      position: 'relative',
      outline: '0',
      userSelect: 'none',
      backgroundColor: root.backgroundColor,
      cursor: 'text',
      display: 'block',
      height: ComboBoxHeight,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      boxSizing: 'border-box',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: root.borderColor,
      borderRadius: effects.roundedCorner2,
      selectors: {
        '.ms-Label': {
          display: 'inline-block',
          marginBottom: '8px'
        },
        '&.is-open': {
          borderColor: root.borderColor,
          selectors: _defineProperty({}, HighContrastSelector, ComboBoxRootHighContrastFocused)
        }
      }
    }],
    rootHovered: {
      borderColor: root.borderHoveredColor,
      selectors: _defineProperty({
        '.ms-ComboBox-Input': [{
          color: semanticColors.inputTextHovered
        }, getPlaceholderStyles(placeholderStylesHovered), inputHighContrastStyles]
      }, HighContrastSelector, {
        color: 'HighlightText',
        backgroundColor: 'Window',
        MsHighContrastAdjust: 'none',
        borderColor: 'Highlight'
      })
    },
    rootPressed: [{
      position: 'relative',
      selectors: _defineProperty({}, HighContrastSelector, ComboBoxRootHighContrastFocused)
    }, getFocusBorder(root.borderPressedColor)],
    rootFocused: [{
      selectors: _defineProperty({
        '.ms-ComboBox-Input': [{
          color: semanticColors.inputTextHovered
        }, inputHighContrastStyles]
      }, HighContrastSelector, ComboBoxRootHighContrastFocused)
    }, getFocusBorder(root.borderFocusedColor)],
    rootDisabled: getDisabledStyles(theme),
    rootError: {
      borderColor: root.erroredColor,
      selectors: {
        ':hover': {
          borderColor: semanticColors.inputBorderHovered
        }
      }
    },
    rootDisallowFreeForm: {},
    input: [getPlaceholderStyles(placeholderStyles), {
      backgroundColor: root.backgroundColor,
      color: root.textColor,
      boxSizing: 'border-box',
      width: '100%',
      height: '28px',
      borderStyle: 'none',
      outline: 'none',
      font: 'inherit',
      textOverflow: 'ellipsis',
      padding: '0',
      selectors: {
        '::-ms-clear': {
          display: 'none'
        }
      }
    }, inputHighContrastStyles],
    inputDisabled: [getDisabledStyles(theme), getPlaceholderStyles(disabledPlaceholderStyles)],
    errorMessage: [theme.fonts.small, {
      color: root.erroredColor,
      marginTop: '5px'
    }],
    callout: {
      boxShadow: effects.elevation8
    },
    optionsContainerWrapper: {
      width: comboBoxOptionWidth
    },
    optionsContainer: {
      display: 'block'
    },
    header: [fonts.medium, {
      fontWeight: FontWeights.semibold,
      color: option.headerTextColor,
      backgroundColor: 'none',
      borderStyle: 'none',
      height: ComboBoxOptionHeight,
      lineHeight: ComboBoxOptionHeight,
      cursor: 'default',
      padding: '0 8px',
      userSelect: 'none',
      textAlign: 'left'
    }],
    divider: {
      height: 1,
      backgroundColor: option.dividerBorderColor
    }
  };
  return concatStyleSets(styles, customStyles);
});

var getClassNames$8 = classNamesFunction({
  disableCaching: true
});

var Label =
/*#__PURE__*/
function (_StatelessComponent) {
  _inherits(Label, _StatelessComponent);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, _getPrototypeOf(Label).apply(this, arguments));
  }

  _createClass(Label, [{
    key: "render",
    value: function render(h, context) {
      var _context$props = context.props,
          theme = _context$props.theme,
          className = _context$props.className,
          disabled = _context$props.disabled,
          required = _context$props.required;
      var classNames = getClassNames$8(context.props.styles, {
        className: className,
        disabled: disabled,
        required: required,
        theme: theme
      });
      return h("label", _mergeJSXProps([{
        "class": classNames.root
      }, context.data]), [context.children]);
    }
  }]);

  return Label;
}(StatelessComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Label.prototype, "disabled", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Label.prototype, "required", void 0);

Label = __decorate([Component], Label);
var LabelBase = Label;

var getStyles$h = function getStyles(props) {
  var theme = props.theme,
      className = props.className,
      disabled = props.disabled,
      required = props.required;
  var semanticColors = theme.semanticColors; // Tokens

  var labelFontWeight = FontWeights.semibold;
  var labelColor = semanticColors.bodyText;
  var labelDisabledColor = semanticColors.disabledBodyText;
  var labelRequiredStarColor = semanticColors.errorText;
  return {
    root: ['ms-Label', theme.fonts.medium, {
      fontWeight: labelFontWeight,
      color: labelColor,
      boxSizing: 'border-box',
      boxShadow: 'none',
      margin: 0,
      display: 'block',
      padding: '5px 0',
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    }, disabled && {
      color: labelDisabledColor,
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'GrayText'
      })
    }, required && {
      selectors: {
        '::after': {
          content: "' *'",
          color: labelRequiredStarColor,
          paddingRight: 12
        }
      }
    }, className]
  };
};

var Label$1 = styled(LabelBase, getStyles$h, undefined);

var SELECTION_FORWARD = 'forward';

var Autofill =
/*#__PURE__*/
function (_Vue) {
  _inherits(Autofill, _Vue);

  function Autofill() {
    var _this;

    _classCallCheck(this, Autofill);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Autofill).apply(this, arguments));
    _this._autoFillEnabled = false;
    _this._isComposing = false;
    _this._value = _this.defaultVisibleValue || '';
    _this.displayValue = _this.defaultVisibleValue || '';

    _this._onInputChanged = function (ev) {
      var value = _this._getCurrentInputValue(ev);

      if (!_this._isComposing) {
        _this._tryEnableAutofill(value, _this._value, ev.composed);
      } // If it is not IE11 and currently composing, update the value


      if (!(isIE11() && _this._isComposing)) {
        var nativeEventComposing = ev.composed;
        var isComposing = nativeEventComposing === undefined ? _this._isComposing : nativeEventComposing;

        _this._updateValue(value, isComposing);
      }
    };

    return _this;
  }

  _createClass(Autofill, [{
    key: "_getCurrentInputValue",
    value: function _getCurrentInputValue(ev) {
      if (ev && ev.target && ev.target.value) {
        return ev.target.value;
      } else if (this.$refs.inputElement && this.$refs.inputElement.value) {
        return this.$refs.inputElement.value;
      } else {
        return '';
      }
    }
    /**
     * Updates the current input value as well as getting a new display value.
     * @param newValue - The new value from the input
     */

  }, {
    key: "_updateValue",
    value: function _updateValue(newValue, composing) {
      // Only proceed if the value is nonempty and is different from the old value
      // This is to work around the fact that, in IE 11, inputs with a placeholder fire an onInput event on focus
      if (!newValue && newValue === this._value) {
        return;
      }

      this._value = this.onInputChange ? this.onInputChange(newValue, composing) : newValue;
      this.displayValue = this._getDisplayValue(this._value, this.suggestedDisplayValue);
    }
  }, {
    key: "_getDisplayValue",
    value: function _getDisplayValue(inputValue, suggestedDisplayValue) {
      var displayValue = inputValue;

      if (suggestedDisplayValue && inputValue && this._doesTextStartWith(suggestedDisplayValue, displayValue) && this._autoFillEnabled) {
        displayValue = suggestedDisplayValue;
      }

      return displayValue;
    }
  }, {
    key: "_doesTextStartWith",
    value: function _doesTextStartWith(text, startWith) {
      if (!text || !startWith) {
        return false;
      }

      return text.toLocaleLowerCase().indexOf(startWith.toLocaleLowerCase()) === 0;
    }
    /**
     * Attempts to enable autofill. Whether or not autofill is enabled depends on the input value,
     * whether or not any text is selected, and only if the new input value is longer than the old input value.
     * Autofill should never be set to true if the value is composing. Once compositionEnd is called, then
     * it should be completed.
     * See https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent for more information on composition.
     * @param newValue - new input value
     * @param oldValue - old input value
     * @param isComposing - if true then the text is actively being composed and it has not completed.
     * @param isComposed - if the text is a composed text value.
     */

  }, {
    key: "_tryEnableAutofill",
    value: function _tryEnableAutofill(newValue, oldValue, isComposing, isComposed) {
      if (!isComposing && newValue && this.$refs.inputElement && this.$refs.inputElement.selectionStart === newValue.length && !this._autoFillEnabled && (newValue.length > oldValue.length || isComposed)) {
        this._autoFillEnabled = true;
      }
    }
  }, {
    key: "cursorLocation",
    get: function get() {
      if (this.$refs.inputElement) {
        var inputElement = this.$refs.inputElement;

        if (inputElement.selectionDirection !== SELECTION_FORWARD) {
          return inputElement.selectionEnd;
        } else {
          return inputElement.selectionStart;
        }
      } else {
        return -1;
      }
    }
  }]);

  return Autofill;
}(Vue$1);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Autofill.prototype, "defaultVisibleValue", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Autofill.prototype, "suggestedDisplayValue", void 0);

__decorate([Prop({
  type: Function,
  default: null
}), __metadata("design:type", Function)], Autofill.prototype, "onInputChange", void 0);

Autofill = __decorate([Component({
  components: {}
})], Autofill);
var script$h = Autofill;

/* script */
var __vue_script__$h = script$h;
/* template */

var __vue_render__$f = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('input', {
    ref: "inputElement",
    attrs: {
      "autocomplete": "off",
      "autocapitalize": "off"
    },
    domProps: {
      "value": _vm.displayValue
    }
  });
};

var __vue_staticRenderFns__$f = [];
/* style */

var __vue_inject_styles__$h = undefined;
/* scoped */

var __vue_scope_id__$h = "data-v-13e004f6";
/* module identifier */

var __vue_module_identifier__$h = undefined;
/* functional template */

var __vue_is_functional_template__$h = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$h = __vue_normalize__({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, undefined, undefined, undefined);

var getClassNames$9 = classNamesFunction();

var ComboBox =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ComboBox, _BaseComponent);

  function ComboBox() {
    _classCallCheck(this, ComboBox);

    return _possibleConstructorReturn(this, _getPrototypeOf(ComboBox).apply(this, arguments));
  }

  _createClass(ComboBox, [{
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className;
      return getClassNames$9(getStyles$g(theme, {}), {
        theme: theme,
        className: className
      });
    }
  }]);

  return ComboBox;
}(BaseComponent$1);

ComboBox = __decorate([Component({
  components: {
    Autofill: __vue_component__$h,
    Label: Label$1,
    IconButton: __vue_component__$7
  }
})], ComboBox);
var script$i = ComboBox;

/* script */
var __vue_script__$i = script$i;
/* template */

var __vue_render__$g = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.container
  }, [_c('Label', {
    class: _vm.classNames.label,
    attrs: {
      "for": "ComboBox" + _vm._uid
    }
  }, [_vm._v("Label")]), _vm._v(" "), _c('div', {
    class: _vm.classNames.root
  }, [_c('Autofill', {
    class: _vm.classNames.input,
    attrs: {
      "id": "ComboBox" + _vm._uid,
      "type": "text",
      "role": "combobox"
    }
  }), _vm._v(" "), _c('IconButton', {
    staticClass: "ms-ComboBox-CaretDown-button",
    attrs: {
      "icon-props": {
        iconName: 'ChevronDown'
      }
    }
  })], 1)], 1);
};

var __vue_staticRenderFns__$g = [];
/* style */

var __vue_inject_styles__$i = undefined;
/* scoped */

var __vue_scope_id__$i = undefined;
/* module identifier */

var __vue_module_identifier__$i = undefined;
/* functional template */

var __vue_is_functional_template__$i = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$i = __vue_normalize__({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, undefined, undefined);

var getClassNames$a = classNamesFunction();

var ChoiceGroupOption =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ChoiceGroupOption, _BaseComponent);

  function ChoiceGroupOption() {
    _classCallCheck(this, ChoiceGroupOption);

    return _possibleConstructorReturn(this, _getPrototypeOf(ChoiceGroupOption).apply(this, arguments));
  }

  _createClass(ChoiceGroupOption, [{
    key: "classNames",
    get: function get() {
      var styles = this.styles,
          theme = this.theme,
          iconProps = this.iconProps,
          imageSrc = this.imageSrc,
          checked = this.checked,
          disabled = this.disabled,
          imageSize = this.imageSize,
          focused = this.focused;
      return getClassNames$a(styles, {
        theme: theme,
        hasIcon: !!iconProps,
        hasImage: !!imageSrc,
        checked: checked,
        disabled: disabled,
        imageIsLarge: !!imageSrc && (imageSize.width > 71 || imageSize.height > 71),
        imageSize: imageSize,
        focused: focused
      });
    }
  }]);

  return ChoiceGroupOption;
}(BaseComponent$1);

__decorate([Prop(), __metadata("design:type", String)], ChoiceGroupOption.prototype, "id", void 0);

__decorate([Prop(), __metadata("design:type", String)], ChoiceGroupOption.prototype, "text", void 0);

__decorate([Prop(), __metadata("design:type", Object)], ChoiceGroupOption.prototype, "iconProps", void 0);

__decorate([Prop(), __metadata("design:type", Object)], ChoiceGroupOption.prototype, "imageSrc", void 0);

__decorate([Prop(), __metadata("design:type", Boolean)], ChoiceGroupOption.prototype, "checked", void 0);

__decorate([Prop(), __metadata("design:type", Boolean)], ChoiceGroupOption.prototype, "disabled", void 0);

__decorate([Prop({
  default: function _default() {
    return {
      width: 32,
      height: 32
    };
  }
}), __metadata("design:type", Object)], ChoiceGroupOption.prototype, "imageSize", void 0);

__decorate([Prop(), __metadata("design:type", Boolean)], ChoiceGroupOption.prototype, "focused", void 0);

ChoiceGroupOption = __decorate([Component({
  components: {
    Icon: Icon$1,
    Label: Label$1
  }
})], ChoiceGroupOption);
var script$j = ChoiceGroupOption;

/* script */
var __vue_script__$j = script$j;
/* template */

var __vue_render__$h = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.wrapper
  }, [_c('input', {
    class: _vm.classNames.input,
    attrs: {
      "id": "ChoiceGroup" + _vm._uid + "-" + _vm.id,
      "name": "ChoiceGroup" + _vm._uid,
      "disabled": _vm.disabled,
      "type": "radio"
    }
  }), _vm._v(" "), _c('label', {
    class: _vm.classNames.field,
    attrs: {
      "for": "ChoiceGroup" + _vm._uid + "-" + _vm.id
    }
  }, [_vm.imageSrc ? void 0 : _vm.iconProps ? [_c('div', {
    class: _vm.classNames.innerField
  }, [_c('div', {
    class: _vm.classNames.iconWrapper
  }, [_c('Icon', _vm._b({}, 'Icon', _vm.iconProps, false))], 1)])] : _vm._e(), _vm._v(" "), _vm.imageSrc || _vm.iconProps ? _c('div', {
    class: _vm.classNames.labelWrapper
  }, [_c('span', {
    staticClass: "ms-ChoiceFieldLabel"
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)]) : _c('span', {
    staticClass: "ms-ChoiceFieldLabel"
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)], 2)])]);
};

var __vue_staticRenderFns__$h = [];
/* style */

var __vue_inject_styles__$j = undefined;
/* scoped */

var __vue_scope_id__$j = "data-v-6117dfd3";
/* module identifier */

var __vue_module_identifier__$j = undefined;
/* functional template */

var __vue_is_functional_template__$j = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$j = __vue_normalize__({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, undefined, undefined);

var GlobalClassNames$6 = {
  root: 'ms-ChoiceField',
  choiceFieldWrapper: 'ms-ChoiceField-wrapper',
  input: 'ms-ChoiceField-input',
  field: 'ms-ChoiceField-field',
  innerField: 'ms-ChoiceField-innerField',
  imageWrapper: 'ms-ChoiceField-imageWrapper',
  iconWrapper: 'ms-ChoiceField-iconWrapper',
  labelWrapper: 'ms-ChoiceField-labelWrapper',
  checked: 'is-checked'
};
var labelWrapperLineHeight = 15;
var iconSize = 32;
var choiceFieldSize = 20;
var choiceFieldTransitionDuration = '200ms';
var choiceFieldTransitionTiming = 'cubic-bezier(.4, 0, .23, 1)';
var radioButtonSpacing = 3;
var radioButtonInnerSize = 5;

function getChoiceGroupFocusStyle(focusBorderColor, hasIconOrImage) {
  return ['is-inFocus', {
    selectors: _defineProperty({}, ".".concat(IsFocusVisibleClassName, " &"), {
      position: 'relative',
      outline: 'transparent',
      selectors: {
        '::-moz-focus-inner': {
          border: 0
        },
        ':after': {
          content: '""',
          top: -2,
          right: -2,
          bottom: -2,
          left: -2,
          pointerEvents: 'none',
          border: "1px solid ".concat(focusBorderColor),
          position: 'absolute',
          selectors: _defineProperty({}, HighContrastSelector, {
            borderColor: 'WindowText',
            borderWidth: hasIconOrImage ? 1 : 2
          })
        }
      }
    })
  }];
}

function getImageWrapperStyle(isSelectedImageWrapper, className, checked) {
  return [className, {
    paddingBottom: 2,
    transitionProperty: 'opacity',
    transitionDuration: choiceFieldTransitionDuration,
    transitionTimingFunction: 'ease',
    selectors: {
      '.ms-Image': {
        display: 'inline-block',
        borderStyle: 'none'
      }
    }
  }, (checked ? !isSelectedImageWrapper : isSelectedImageWrapper) && ['is-hidden', {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    opacity: 0
  }]];
}

var getStyles$i = function getStyles(props) {
  var theme = props.theme,
      hasIcon = props.hasIcon,
      hasImage = props.hasImage,
      checked = props.checked,
      disabled = props.disabled,
      imageIsLarge = props.imageIsLarge,
      focused = props.focused,
      imageSize = props.imageSize;
  var palette = theme.palette,
      semanticColors = theme.semanticColors,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(GlobalClassNames$6, theme); // Tokens
  // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.smallInputBorder

  var circleBorderColor = palette.neutralPrimary;
  var circleHoveredBorderColor = semanticColors.inputBorderHovered;
  var circleCheckedBorderColor = semanticColors.inputBackgroundChecked; // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBackgroundCheckedHovered

  var circleCheckedHoveredBorderColor = palette.themeDark;
  var circleDisabledBorderColor = semanticColors.disabledBodySubtext;
  var circleBackgroundColor = semanticColors.bodyBackground;
  var dotUncheckedHoveredColor = palette.neutralSecondary;
  var dotCheckedColor = semanticColors.inputBackgroundChecked; // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBackgroundCheckedHovered

  var dotCheckedHoveredColor = palette.themeDark;
  var dotDisabledColor = semanticColors.disabledBodySubtext; // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.bodyTextChecked

  var labelHoverFocusColor = palette.neutralDark;
  var focusBorderColor = semanticColors.focusBorder;
  var iconOrImageChoiceBorderUncheckedHoveredColor = semanticColors.inputBorderHovered; // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBackgroundCheckedHovered

  var iconOrImageChoiceBorderCheckedColor = semanticColors.inputBackgroundChecked;
  var iconOrImageChoiceBorderCheckedHoveredColor = palette.themeDark;
  var iconOrImageChoiceBackgroundColor = palette.neutralLighter;
  var fieldHoverOrFocusProperties = {
    selectors: {
      '.ms-ChoiceFieldLabel': {
        color: labelHoverFocusColor
      },
      ':before': {
        borderColor: checked ? circleCheckedHoveredBorderColor : circleHoveredBorderColor
      },
      ':after': [!hasIcon && !hasImage && !checked && {
        content: '""',
        transitionProperty: 'background-color',
        left: 5,
        top: 5,
        width: 10,
        height: 10,
        backgroundColor: dotUncheckedHoveredColor
      }, checked && {
        borderColor: dotCheckedHoveredColor
      }]
    }
  };
  var enabledFieldWithImageHoverOrFocusProperties = {
    borderColor: checked ? iconOrImageChoiceBorderCheckedHoveredColor : iconOrImageChoiceBorderUncheckedHoveredColor,
    selectors: {
      ':before': {
        opacity: 1,
        borderColor: checked ? circleCheckedHoveredBorderColor : circleHoveredBorderColor
      }
    }
  };
  var circleAreaProperties = [{
    content: '""',
    display: 'inline-block',
    backgroundColor: circleBackgroundColor,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: circleBorderColor,
    width: choiceFieldSize,
    height: choiceFieldSize,
    fontWeight: 'normal',
    position: 'absolute',
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    transitionProperty: 'border-color',
    transitionDuration: choiceFieldTransitionDuration,
    transitionTimingFunction: choiceFieldTransitionTiming,
    borderRadius: '50%'
  }, disabled && {
    borderColor: circleDisabledBorderColor,
    selectors: _defineProperty({}, HighContrastSelector, {
      color: 'GrayText'
    })
  }, checked && {
    borderColor: disabled ? circleDisabledBorderColor : circleCheckedBorderColor,
    selectors: _defineProperty({}, HighContrastSelector, {
      borderColor: 'Highlight'
    })
  }, (hasIcon || hasImage) && {
    top: radioButtonSpacing,
    right: radioButtonSpacing,
    left: 'auto',
    opacity: checked ? 1 : 0
  }];
  var dotAreaProperties = [{
    content: '""',
    width: 0,
    height: 0,
    borderRadius: '50%',
    position: 'absolute',
    left: choiceFieldSize / 2,
    right: 0,
    transitionProperty: 'border-width',
    transitionDuration: choiceFieldTransitionDuration,
    transitionTimingFunction: choiceFieldTransitionTiming,
    boxSizing: 'border-box'
  }, checked && {
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: disabled ? dotDisabledColor : dotCheckedColor,
    left: 5,
    top: 5,
    width: 10,
    height: 10,
    selectors: _defineProperty({}, HighContrastSelector, {
      borderColor: 'Highlight'
    })
  }, checked && (hasIcon || hasImage) && {
    top: radioButtonSpacing + radioButtonInnerSize,
    right: radioButtonSpacing + radioButtonInnerSize,
    left: 'auto'
  }];
  return {
    root: [classNames.root, theme.fonts.medium, {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      color: semanticColors.bodyText,
      minHeight: 26,
      border: 'none',
      position: 'relative',
      marginTop: 8,
      selectors: {
        '.ms-ChoiceFieldLabel': {
          display: 'inline-block'
        }
      }
    }, !hasIcon && !hasImage && {
      selectors: {
        '.ms-ChoiceFieldLabel': {
          paddingLeft: '26px'
        }
      }
    }, hasImage && 'ms-ChoiceField--image', hasIcon && 'ms-ChoiceField--icon', (hasIcon || hasImage) && {
      display: 'inline-flex',
      fontSize: 0,
      margin: '0 4px 4px 0',
      paddingLeft: 0,
      backgroundColor: iconOrImageChoiceBackgroundColor,
      height: '100%'
    }],
    choiceFieldWrapper: [classNames.choiceFieldWrapper, focused && getChoiceGroupFocusStyle(focusBorderColor, hasIcon || hasImage)],
    // The hidden input
    input: [classNames.input, {
      position: 'absolute',
      opacity: 0,
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      margin: 0
    }, disabled && 'is-disabled'],
    field: [classNames.field, checked && classNames.checked, {
      display: 'inline-block',
      cursor: 'pointer',
      marginTop: 0,
      position: 'relative',
      verticalAlign: 'top',
      userSelect: 'none',
      minHeight: 20,
      selectors: {
        ':hover': !disabled && fieldHoverOrFocusProperties,
        ':focus': !disabled && fieldHoverOrFocusProperties,
        // The circle
        ':before': circleAreaProperties,
        // The dot
        ':after': dotAreaProperties
      }
    }, hasIcon && 'ms-ChoiceField--icon', hasImage && 'ms-ChoiceField-field--image', (hasIcon || hasImage) && {
      boxSizing: 'content-box',
      cursor: 'pointer',
      paddingTop: 22,
      margin: 0,
      textAlign: 'center',
      transitionProperty: 'all',
      transitionDuration: choiceFieldTransitionDuration,
      transitionTimingFunction: 'ease',
      border: '1px solid transparent',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column'
    }, checked && {
      borderColor: iconOrImageChoiceBorderCheckedColor
    }, (hasIcon || hasImage) && !disabled && {
      selectors: {
        ':hover': enabledFieldWithImageHoverOrFocusProperties,
        ':focus': enabledFieldWithImageHoverOrFocusProperties
      }
    }, disabled && {
      cursor: 'default',
      selectors: _defineProperty({
        '.ms-ChoiceFieldLabel': {
          color: semanticColors.disabledBodyText
        }
      }, HighContrastSelector, {
        color: 'GrayText'
      })
    }, checked && disabled && {
      borderColor: iconOrImageChoiceBackgroundColor
    }],
    innerField: [classNames.innerField, hasImage && {
      height: imageSize.height,
      width: imageSize.width
    }, (hasIcon || hasImage) && {
      position: 'relative',
      display: 'inline-block',
      paddingLeft: 30,
      paddingRight: 30
    }, (hasIcon || hasImage) && imageIsLarge && {
      paddingLeft: 24,
      paddingRight: 24
    }, (hasIcon || hasImage) && disabled && {
      opacity: 0.25,
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'GrayText',
        opacity: 1
      })
    }],
    imageWrapper: getImageWrapperStyle(false, classNames.imageWrapper, checked),
    selectedImageWrapper: getImageWrapperStyle(true, classNames.imageWrapper, checked),
    iconWrapper: [classNames.iconWrapper, {
      fontSize: iconSize,
      lineHeight: iconSize,
      height: iconSize
    }],
    labelWrapper: [classNames.labelWrapper, fonts.medium, (hasIcon || hasImage) && {
      display: 'block',
      position: 'relative',
      margin: '4px 8px',
      height: labelWrapperLineHeight * 2,
      lineHeight: labelWrapperLineHeight,
      maxWidth: imageSize.width * 2,
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      textOverflow: 'ellipsis'
    }]
  };
};

var ChoiceGroupOption$1 = styled(__vue_component__$j, getStyles$i, undefined);

var getClassNames$b = classNamesFunction();

var ChoiceGroup =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ChoiceGroup, _BaseComponent);

  function ChoiceGroup() {
    var _this;

    _classCallCheck(this, ChoiceGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChoiceGroup).apply(this, arguments));
    _this.selectedOption = {};
    return _this;
  }

  _createClass(ChoiceGroup, [{
    key: "onClick",
    value: function onClick(option) {
      if (option.disabled) return;
      this.selectedOption = option;
    }
  }, {
    key: "classNames",
    get: function get() {
      var styles = this.styles,
          theme = this.theme,
          className = this.className;
      return getClassNames$b(styles, {
        theme: theme,
        className: className,
        optionsContainIconOrImage: false
      });
    }
  }]);

  return ChoiceGroup;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], ChoiceGroup.prototype, "label", void 0);

__decorate([Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), __metadata("design:type", Array)], ChoiceGroup.prototype, "options", void 0);

__decorate([Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), __metadata("design:type", Array)], ChoiceGroup.prototype, "value", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], ChoiceGroup.prototype, "disabled", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], ChoiceGroup.prototype, "required", void 0);

ChoiceGroup = __decorate([Component({
  components: {
    ChoiceGroupOption: ChoiceGroupOption$1,
    Label: Label$1
  }
})], ChoiceGroup);
var script$k = ChoiceGroup;

/* script */
var __vue_script__$k = script$k;
/* template */

var __vue_render__$i = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.applicationRole
  }, [_c('div', {
    class: _vm.classNames.root
  }, [_vm.label ? _c('Label', {
    class: _vm.classNames.label,
    attrs: {
      "required": _vm.required,
      "disabled": _vm.disabled
    }
  }, [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")]) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.classNames.flexContainer
  }, _vm._l(_vm.options, function (option) {
    return _c('ChoiceGroupOption', _vm._b({
      key: option.key,
      attrs: {
        "id": option.key,
        "checked": _vm.selectedOption.key === option.key
      },
      nativeOn: {
        "click": function click($event) {
          return _vm.onClick(option);
        }
      }
    }, 'ChoiceGroupOption', option, false), [_vm._v("\n        " + _vm._s(option.text) + "\n      ")]);
  }), 1)], 1)]);
};

var __vue_staticRenderFns__$i = [];
/* style */

var __vue_inject_styles__$k = undefined;
/* scoped */

var __vue_scope_id__$k = undefined;
/* module identifier */

var __vue_module_identifier__$k = undefined;
/* functional template */

var __vue_is_functional_template__$k = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$k = __vue_normalize__({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, undefined, undefined, undefined);

var GlobalClassNames$7 = {
  root: 'ms-ChoiceFieldGroup',
  flexContainer: 'ms-ChoiceFieldGroup-flexContainer'
};
var getStyles$j = function getStyles(props) {
  var className = props.className,
      optionsContainIconOrImage = props.optionsContainIconOrImage,
      theme = props.theme;
  var classNames = getGlobalClassNames(GlobalClassNames$7, theme);
  return {
    // TODO (Fabric 8?) - merge className back into `root` and apply root style to
    // the actual root role=application element
    applicationRole: className,
    root: [classNames.root, theme.fonts.medium, {
      display: 'block'
    }],
    flexContainer: [classNames.flexContainer, optionsContainIconOrImage && {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }]
  };
};

var ChoiceGroup$1 = styled(__vue_component__$k, getStyles$j, undefined);

var getClassNames$c = classNamesFunction();

var Checkbox =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Checkbox, _BaseComponent);

  function Checkbox() {
    var _this;

    _classCallCheck(this, Checkbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).apply(this, arguments));
    _this.internalValue = _this.checked;
    return _this;
  }

  _createClass(Checkbox, [{
    key: "onValueChanged",
    value: function onValueChanged(value) {
      this.$emit('input', value);
    }
  }, {
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          disabled = this.disabled,
          indeterminate = this.indeterminate,
          internalValue = this.internalValue,
          boxSide = this.boxSide;
      return getClassNames$c(this.styles, {
        theme: theme,
        className: className,
        disabled: disabled,
        indeterminate: indeterminate,
        checked: internalValue,
        reversed: boxSide !== 'start',
        isUsingCustomLabelRender: true
      });
    }
  }]);

  return Checkbox;
}(BaseComponent$1);

__decorate([Model('input', {
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Checkbox.prototype, "checked", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Checkbox.prototype, "disabled", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Checkbox.prototype, "indeterminate", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Checkbox.prototype, "required", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Checkbox.prototype, "label", void 0);

__decorate([Prop({
  type: String,
  default: 'start',
  validator: function validator(v) {
    return ['start', 'end'].indexOf(v) > -1;
  }
}), __metadata("design:type", String)], Checkbox.prototype, "boxSide", void 0);

__decorate([Watch('internalValue'), __metadata("design:type", Function), __metadata("design:paramtypes", [Boolean]), __metadata("design:returntype", void 0)], Checkbox.prototype, "onValueChanged", null);

Checkbox = __decorate([Component({
  components: {
    Label: Label$1,
    Icon: Icon$1
  },
  inheritAttrs: false
})], Checkbox);
var script$l = Checkbox;

/* script */
var __vue_script__$l = script$l;
/* template */

var __vue_render__$j = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('input', _vm._b({
    class: _vm.classNames.input,
    attrs: {
      "id": "Checkbox" + _vm._uid,
      "type": "checkbox"
    },
    on: {
      "input": function input($event) {
        _vm.internalValue = !_vm.internalValue;
      }
    }
  }, 'input', _vm.$attrs, false)), _vm._v(" "), _c('Label', {
    class: _vm.classNames.label,
    attrs: {
      "for": "Checkbox" + _vm._uid
    }
  }, [_c('div', {
    class: _vm.classNames.checkbox
  }, [_c('Icon', {
    class: _vm.classNames.checkmark,
    attrs: {
      "icon-name": "CheckMark"
    }
  })], 1), _vm._v(" "), _vm.label || _vm.$slots.default ? _c('span', {
    class: _vm.classNames.text
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()])], 1);
};

var __vue_staticRenderFns__$j = [];
/* style */

var __vue_inject_styles__$l = undefined;
/* scoped */

var __vue_scope_id__$l = undefined;
/* module identifier */

var __vue_module_identifier__$l = undefined;
/* functional template */

var __vue_is_functional_template__$l = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$l = __vue_normalize__({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, undefined, undefined, undefined);

var GlobalClassNames$8 = {
  root: 'ms-Checkbox',
  label: 'ms-Checkbox-label',
  checkbox: 'ms-Checkbox-checkbox',
  checkmark: 'ms-Checkbox-checkmark',
  text: 'ms-Checkbox-text'
};
var MS_CHECKBOX_LABEL_SIZE = '20px';
var MS_CHECKBOX_TRANSITION_DURATION = '200ms';
var MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';
var getStyles$k = function getStyles(props) {
  var _selectors3, _selectors4, _selectors5, _selectors6, _selectors7;

  var className = props.className,
      theme = props.theme,
      reversed = props.reversed,
      checked = props.checked,
      disabled = props.disabled,
      isUsingCustomLabelRender = props.isUsingCustomLabelRender,
      indeterminate = props.indeterminate;
  var semanticColors = theme.semanticColors,
      effects = theme.effects,
      palette = theme.palette,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(GlobalClassNames$8, theme);
  var checkmarkFontColor = semanticColors.inputForegroundChecked; // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBorder

  var checkmarkFontColorHovered = palette.neutralSecondary; // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.smallInputBorder

  var checkboxBorderColor = palette.neutralPrimary;
  var checkboxBorderIndeterminateColor = semanticColors.inputBackgroundChecked;
  var checkboxBorderColorChecked = semanticColors.inputBackgroundChecked;
  var checkboxBorderColorDisabled = semanticColors.disabledBodySubtext;
  var checkboxBorderHoveredColor = semanticColors.inputBorderHovered;
  var checkboxBorderIndeterminateHoveredColor = semanticColors.inputBackgroundCheckedHovered;
  var checkboxBackgroundChecked = semanticColors.inputBackgroundChecked; // TODO: after updating the semanticColors slots mapping following 2 tokens need to be semanticColors.inputBackgroundCheckedHovered

  var checkboxBackgroundCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  var checkboxBorderColorCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  var checkboxHoveredTextColor = semanticColors.inputTextHovered;
  var checkboxBackgroundDisabledChecked = semanticColors.disabledBodySubtext;
  var checkboxTextColor = semanticColors.bodyText;
  var checkboxTextColorDisabled = semanticColors.disabledText;
  var indeterminateDotStyles = [{
    content: '""',
    borderRadius: effects.roundedCorner2,
    position: 'absolute',
    width: 10,
    height: 10,
    top: 4,
    left: 4,
    boxSizing: 'border-box',
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: disabled ? checkboxBorderColorDisabled : checkboxBorderIndeterminateColor,
    transitionProperty: 'border-width, border, border-color',
    transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
    transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING
  }];
  return {
    root: [classNames.root, {
      position: 'relative',
      display: 'flex'
    }, reversed && 'reversed', checked && 'is-checked', !disabled && 'is-enabled', disabled && 'is-disabled', !disabled && [!checked && {
      selectors: (_selectors3 = {}, _defineProperty(_selectors3, ":hover .".concat(classNames.checkbox), {
        borderColor: checkboxBorderHoveredColor,
        selectors: _defineProperty({}, HighContrastSelector, {
          borderColor: 'Highlight'
        })
      }), _defineProperty(_selectors3, ":focus .".concat(classNames.checkbox), {
        borderColor: checkboxBorderHoveredColor
      }), _defineProperty(_selectors3, ":hover .".concat(classNames.checkmark), {
        color: checkmarkFontColorHovered,
        opacity: '1',
        selectors: _defineProperty({}, HighContrastSelector, {
          color: 'Highlight'
        })
      }), _selectors3)
    }, checked && !indeterminate && {
      selectors: (_selectors5 = {}, _defineProperty(_selectors5, ":hover .".concat(classNames.checkbox), {
        background: checkboxBackgroundCheckedHovered,
        borderColor: checkboxBorderColorCheckedHovered
      }), _defineProperty(_selectors5, ":focus .".concat(classNames.checkbox), {
        background: checkboxBackgroundCheckedHovered,
        borderColor: checkboxBorderColorCheckedHovered
      }), _defineProperty(_selectors5, ".".concat(classNames.checkbox), {
        background: checkboxBorderColorChecked,
        borderColor: checkboxBorderColorChecked
      }), _defineProperty(_selectors5, HighContrastSelector, {
        selectors: (_selectors4 = {}, _defineProperty(_selectors4, ":hover .".concat(classNames.checkbox), {
          background: 'Window',
          borderColor: 'Highlight'
        }), _defineProperty(_selectors4, ":focus .".concat(classNames.checkbox), {
          background: 'Highlight'
        }), _defineProperty(_selectors4, ":focus:hover .".concat(classNames.checkbox), {
          background: 'Highlight'
        }), _defineProperty(_selectors4, ":focus:hover .".concat(classNames.checkmark), {
          color: 'Window'
        }), _defineProperty(_selectors4, ":hover .".concat(classNames.checkmark), {
          color: 'Highlight'
        }), _selectors4)
      }), _selectors5)
    }, indeterminate && {
      selectors: (_selectors6 = {}, _defineProperty(_selectors6, ":hover .".concat(classNames.checkbox, ", :hover .").concat(classNames.checkbox, ":after"), {
        borderColor: checkboxBorderIndeterminateHoveredColor
      }), _defineProperty(_selectors6, ":focus .".concat(classNames.checkbox), {
        borderColor: checkboxBorderIndeterminateHoveredColor
      }), _defineProperty(_selectors6, ":hover .".concat(classNames.checkmark), {
        opacity: '0'
      }), _selectors6)
    }, {
      selectors: (_selectors7 = {}, _defineProperty(_selectors7, ":hover .".concat(classNames.text), {
        color: checkboxHoveredTextColor
      }), _defineProperty(_selectors7, ":focus .".concat(classNames.text), {
        color: checkboxHoveredTextColor
      }), _selectors7)
    }], className],
    input: {
      position: 'absolute',
      background: 'none',
      opacity: 0,
      selectors: _defineProperty({}, ".".concat(IsFocusVisibleClassName, " &:focus + label::before"), {
        outline: '1px solid ' + theme.palette.neutralSecondary,
        outlineOffset: '2px',
        selectors: _defineProperty({}, HighContrastSelector, {
          outline: '1px solid ActiveBorder'
        })
      })
    },
    label: [classNames.label, theme.fonts.medium, {
      display: 'flex',
      alignItems: isUsingCustomLabelRender ? 'center' : 'flex-start',
      cursor: disabled ? 'default' : 'pointer',
      position: 'relative',
      userSelect: 'none',
      textAlign: 'left'
    }, reversed && {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    }, {
      selectors: {
        '&::before': {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          content: '""',
          pointerEvents: 'none'
        }
      }
    }],
    checkbox: [classNames.checkbox, {
      position: 'relative',
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      height: MS_CHECKBOX_LABEL_SIZE,
      width: MS_CHECKBOX_LABEL_SIZE,
      border: "1px solid ".concat(checkboxBorderColor),
      borderRadius: effects.roundedCorner2,
      boxSizing: 'border-box',
      transitionProperty: 'background, border, border-color',
      transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
      transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING,

      /* in case the icon is bigger than the box */
      overflow: 'hidden',
      selectors: {
        ':after': indeterminate ? indeterminateDotStyles : null
      }
    }, indeterminate && {
      borderColor: checkboxBorderIndeterminateColor
    }, !reversed ? {
      marginRight: 4
    } : {
      marginLeft: 4
    }, !disabled && !indeterminate && checked && {
      background: checkboxBackgroundChecked,
      borderColor: checkboxBorderColorChecked,
      selectors: _defineProperty({}, HighContrastSelector, {
        background: 'Highlight',
        borderColor: 'Highlight'
      })
    }, disabled && {
      borderColor: checkboxBorderColorDisabled,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'InactiveBorder'
      })
    }, checked && disabled && {
      background: checkboxBackgroundDisabledChecked,
      borderColor: checkboxBorderColorDisabled
    }],
    checkmark: [classNames.checkmark, {
      opacity: checked ? '1' : '0',
      color: checkmarkFontColor,
      selectors: _defineProperty({}, HighContrastSelector, {
        color: disabled ? 'InactiveBorder' : 'Window',
        MsHighContrastAdjust: 'none'
      })
    }],
    text: [classNames.text, {
      color: disabled ? checkboxTextColorDisabled : checkboxTextColor,
      fontSize: fonts.medium.fontSize,
      lineHeight: '20px'
    }, !reversed ? {
      marginLeft: 4
    } : {
      marginRight: 4
    }, disabled && {
      selectors: _defineProperty({}, HighContrastSelector, {
        // backwards compat for the color of the text when the checkbox was rendered
        // using a Button.
        color: 'InactiveBorder'
      })
    }]
  };
};

var Checkbox$1 = styled(__vue_component__$l, getStyles$k, undefined);

var getClassNames$d = classNamesFunction();

var Dropdown =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Dropdown, _BaseComponent);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).apply(this, arguments));
    _this.isOpen = false;
    _this.calloutRenderEdge = null;
    return _this;
  }

  _createClass(Dropdown, [{
    key: "created",
    value: function created() {
      var _this2 = this;

      this.options.forEach(function (option) {
        _this2.$set(option, 'isItemSelected', false);
      });
    }
  }, {
    key: "select",
    value: function select(option) {
      if (option.disabled) return;
      var index = this.selectedOptions.findIndex(function (o) {
        return o.key === option.key;
      });

      if (index > -1) {
        this.selectedOptions[index].isItemSelected = false;
        this.selectedOptions.splice(index, 1);
      } else {
        if (!this.multiSelect) {
          this.selectedOptions.splice(0, this.selectedOptions.length);
          this.isOpen = false;
        }

        option.isItemSelected = true;
        this.selectedOptions.push(option);
      }
    }
  }, {
    key: "onPositioned",
    value: function onPositioned(positions) {
      if (!this.calloutRenderEdge || this.calloutRenderEdge !== positions.targetEdge) {
        this.calloutRenderEdge = positions.targetEdge;
      }
    }
  }, {
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          errorMessage = this.errorMessage,
          label = this.label,
          required = this.required,
          disabled = this.disabled,
          panelProps = this.panelProps,
          calloutProps = this.calloutProps;
      var isOpen = this.isOpen,
          calloutRenderEdge = this.calloutRenderEdge;
      var selectedOptions = this.selectedOptions;
      return getClassNames$d(this.styles, {
        theme: theme,
        className: className,
        hasError: !!(errorMessage && errorMessage.length > 0),
        hasLabel: !!label,
        isOpen: isOpen,
        required: required,
        disabled: disabled,
        isRenderingPlaceholder: !selectedOptions.length,
        panelClassName: panelProps ? panelProps.className : undefined,
        calloutClassName: calloutProps ? calloutProps.className : undefined,
        calloutRenderEdge: calloutRenderEdge
      });
    }
  }, {
    key: "multiSelectItemStyles",
    get: function get() {
      return this.classNames.subComponentStyles ? this.classNames.subComponentStyles.multiSelectItem : undefined;
    }
  }, {
    key: "hasErrorMessage",
    get: function get() {
      return this.errorMessage && this.errorMessage.length > 0;
    }
  }]);

  return Dropdown;
}(BaseComponent$1);

__decorate([Prop({
  type: Array,
  required: true
}), __metadata("design:type", Array)], Dropdown.prototype, "options", void 0);

__decorate([Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), __metadata("design:type", Array)], Dropdown.prototype, "selectedOptions", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Dropdown.prototype, "label", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Dropdown.prototype, "placeholder", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Dropdown.prototype, "errorMessage", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Dropdown.prototype, "required", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Dropdown.prototype, "disabled", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Dropdown.prototype, "multiSelect", void 0);

__decorate([Prop({
  type: String,
  default: ', '
}), __metadata("design:type", String)], Dropdown.prototype, "multiSelectDelimiter", void 0);

__decorate([Prop({
  type: Number,
  default: 0
}), __metadata("design:type", Number)], Dropdown.prototype, "dropdownWidth", void 0);

__decorate([Prop({
  type: Object,
  default: function _default() {}
}), __metadata("design:type", Object)], Dropdown.prototype, "panelProps", void 0);

__decorate([Prop({
  type: Object,
  default: function _default() {}
}), __metadata("design:type", Object)], Dropdown.prototype, "calloutProps", void 0);

Dropdown = __decorate([Component({
  components: {
    Callout: __vue_component__$g,
    ActionButton: __vue_component__$3,
    Checkbox: Checkbox$1,
    Icon: Icon$1,
    Label: Label$1
  }
})], Dropdown);
var script$m = Dropdown;

var __vue_script__$m = script$m;
/* template */

var __vue_render__$k = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('Label', {
    class: _vm.classNames.label,
    attrs: {
      "required": _vm.required,
      "disabled": _vm.disabled
    }
  }, [_vm._v("\n    " + _vm._s(_vm.label) + "\n  ")]), _vm._v(" "), _c('div', {
    ref: "dropdown",
    class: _vm.classNames.dropdown,
    on: {
      "click": function click($event) {
        _vm.isOpen = true;
      }
    }
  }, [_c('span', {
    class: _vm.classNames.title
  }, [_vm.selectedOptions.length ? [_vm._v("\n        " + _vm._s(_vm.selectedOptions.map(function (i) {
    return i.text;
  }).join(_vm.multiSelectDelimiter)) + "\n      ")] : [_vm._v("\n        " + _vm._s(_vm.placeholder) + "\n      ")]], 2), _vm._v(" "), _c('span', {
    class: _vm.classNames.caretDownWrapper
  }, [_c('Icon', {
    class: _vm.classNames.caretDown,
    attrs: {
      "icon-name": "ChevronDown"
    }
  })], 1)]), _vm._v(" "), _vm.isOpen ? _c('div', [_c('Callout', {
    attrs: {
      "target": _vm.$refs.dropdown,
      "is-beak-visible": false,
      "callout-width": _vm.dropdownWidth || (_vm.$refs.dropdown ? _vm.$refs.dropdown.clientWidth : 0)
    },
    on: {
      "dismiss": function dismiss($event) {
        _vm.isOpen = false;
      },
      "positioned": _vm.onPositioned
    }
  }, [_c('div', {
    class: _vm.classNames.dropdownItemsWrapper,
    attrs: {
      "tabindex": "0"
    }
  }, _vm._l(_vm.options, function (option, index) {
    return _c(_vm.multiSelect ? 'Checkbox' : 'ActionButton', {
      key: index,
      tag: "components",
      class: option.hidden ? _vm.classNames.dropdownItemHidden : option.isItemSelected && option.disabled === true ? _vm.classNames.dropdownItemSelectedAndDisabled : option.isItemSelected ? _vm.classNames.dropdownItemSelected : option.disabled === true ? _vm.classNames.dropdownItemDisabled : _vm.classNames.dropdownItem,
      attrs: {
        "disabled": option.disabled,
        "title": option.text,
        "checked": option.isItemSelected,
        "styles": _vm.multiSelect ? _vm.multiSelectItemStyles : null,
        "role": "option"
      },
      on: {
        "input": function input($event) {
          _vm.multiSelect && _vm.select(option);
        }
      },
      nativeOn: {
        "click": function click($event) {
          !_vm.multiSelect && _vm.select(option);
        }
      }
    }, [_vm._v("\n          " + _vm._s(option.text) + "\n        ")]);
  }), 1)])], 1) : _vm._e(), _vm._v(" "), _vm.hasErrorMessage ? _c('div', {
    class: _vm.classNames.errorMessage,
    attrs: {
      "role": "alert"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.errorMessage) + "\n  ")]) : _vm._e()], 1);
};

var __vue_staticRenderFns__$k = [];
/* style */

var __vue_inject_styles__$m = undefined;
/* scoped */

var __vue_scope_id__$m = undefined;
/* module identifier */

var __vue_module_identifier__$m = undefined;
/* functional template */

var __vue_is_functional_template__$m = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$m = __vue_normalize__({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, undefined, undefined);

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var GlobalClassNames$9 = {
  root: 'ms-Dropdown-container',
  label: 'ms-Dropdown-label',
  dropdown: 'ms-Dropdown',
  title: 'ms-Dropdown-title',
  caretDownWrapper: 'ms-Dropdown-caretDownWrapper',
  caretDown: 'ms-Dropdown-caretDown',
  callout: 'ms-Dropdown-callout',
  panel: 'ms-Dropdown-panel',
  dropdownItems: 'ms-Dropdown-items',
  dropdownItem: 'ms-Dropdown-item',
  dropdownDivider: 'ms-Dropdown-divider',
  dropdownOptionText: 'ms-Dropdown-optionText',
  dropdownItemHeader: 'ms-Dropdown-header',
  titleIsPlaceHolder: 'ms-Dropdown-titleIsPlaceHolder',
  titleHasError: 'ms-Dropdown-title--hasError'
};
var DROPDOWN_HEIGHT = 32;
var DROPDOWN_ITEM_HEIGHT = 36;

var highContrastAdjustMixin = _defineProperty({}, "".concat(HighContrastSelector, ", ").concat(HighContrastSelectorWhite.replace('@media ', '')), {
  MsHighContrastAdjust: 'none'
});

var highContrastItemAndTitleStateMixin = {
  selectors: _objectSpread$8(_defineProperty({}, HighContrastSelector, {
    backgroundColor: 'Highlight',
    borderColor: 'Highlight',
    color: 'HighlightText'
  }), highContrastAdjustMixin)
};
var highContrastBorderState = {
  selectors: _defineProperty({}, HighContrastSelector, {
    borderColor: 'Highlight'
  })
};
var MinimumScreenSelector$1 = getScreenSelector(0, ScreenWidthMinMedium);
var getStyles$l = function getStyles(props) {
  var _selectors3;

  var theme = props.theme,
      hasError = props.hasError,
      hasLabel = props.hasLabel,
      className = props.className,
      isOpen = props.isOpen,
      disabled = props.disabled,
      required = props.required,
      isRenderingPlaceholder = props.isRenderingPlaceholder,
      panelClassName = props.panelClassName,
      calloutClassName = props.calloutClassName,
      calloutRenderEdge = props.calloutRenderEdge;

  if (!theme) {
    throw new Error('theme is undefined or null in base Dropdown getStyles function.');
  }

  var globalClassnames = getGlobalClassNames(GlobalClassNames$9, theme);
  var palette = theme.palette,
      semanticColors = theme.semanticColors,
      effects = theme.effects,
      fonts = theme.fonts;
  var rootHoverFocusActiveSelectorNeutralDarkMixin = {
    color: semanticColors.menuItemTextHovered
  };
  var rootHoverFocusActiveSelectorNeutralPrimaryMixin = {
    color: palette.neutralPrimary
  };
  var borderColorError = {
    borderColor: semanticColors.errorText
  };
  var dropdownItemStyle = [globalClassnames.dropdownItem, {
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    width: '100%',
    minHeight: DROPDOWN_ITEM_HEIGHT,
    lineHeight: 20,
    height: 0,
    position: 'relative',
    border: '1px solid transparent',
    borderRadius: 0,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    textAlign: 'left'
  }];

  var itemSelectors = function itemSelectors() {
    var _selectors2;

    var isSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return {
      selectors: (_selectors2 = {
        '&:hover:focus': [{
          color: palette.neutralDark,
          backgroundColor: !isSelected ? palette.neutralLighter : palette.neutralLight
        }, highContrastItemAndTitleStateMixin],
        '&:focus': [{
          backgroundColor: !isSelected ? 'transparent' : palette.neutralLight
        }, highContrastItemAndTitleStateMixin],
        '&:active': [{
          color: palette.neutralDark,
          backgroundColor: !isSelected ? palette.neutralLighter : palette.neutralLight
        }, highContrastItemAndTitleStateMixin]
      }, _defineProperty(_selectors2, HighContrastSelector, {
        borderColor: 'Window'
      }), _defineProperty(_selectors2, ".".concat(IsFocusVisibleClassName, " &:focus:after"), {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      }), _selectors2)
    };
  };

  var dropdownItemSelected = [].concat(dropdownItemStyle, [{
    backgroundColor: palette.neutralLight,
    color: palette.neutralDark
  }, itemSelectors(true), highContrastItemAndTitleStateMixin]);
  var dropdownItemDisabled = [].concat(dropdownItemStyle, [{
    color: semanticColors.disabledText,
    cursor: 'default'
  }]);
  var titleOpenBorderRadius = calloutRenderEdge === RectangleEdge$1.bottom ? "".concat(effects.roundedCorner2, " ").concat(effects.roundedCorner2, " 0 0") : "0 0 ".concat(effects.roundedCorner2, " ").concat(effects.roundedCorner2);
  var calloutOpenBorderRadius = calloutRenderEdge === RectangleEdge$1.bottom ? "0 0 ".concat(effects.roundedCorner2, " ").concat(effects.roundedCorner2) : "".concat(effects.roundedCorner2, " ").concat(effects.roundedCorner2, " 0 0");
  return {
    root: [globalClassnames.root, className],
    label: globalClassnames.label,
    dropdown: [globalClassnames.dropdown, normalize, fonts.medium, {
      color: palette.neutralPrimary,
      borderColor: palette.neutralSecondary,
      position: 'relative',
      outline: 0,
      userSelect: 'none',
      selectors: (_selectors3 = {}, _defineProperty(_selectors3, '&:hover .' + globalClassnames.title, [!disabled && rootHoverFocusActiveSelectorNeutralDarkMixin, {
        borderColor: !isOpen ? palette.neutralPrimary : palette.themePrimary
      }, highContrastBorderState]), _defineProperty(_selectors3, '&:focus .' + globalClassnames.title, [!disabled && rootHoverFocusActiveSelectorNeutralDarkMixin]), _defineProperty(_selectors3, '&:focus:after', [{
        pointerEvents: 'none',
        content: "''",
        position: 'absolute',
        boxSizing: 'border-box',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        // see https://github.com/OfficeDev/office-ui-fabric-react/pull/9182 for semantic color disc
        border: !disabled ? "2px solid ".concat(palette.themePrimary) : 'none',
        borderRadius: '2px'
      }, highContrastItemAndTitleStateMixin]), _defineProperty(_selectors3, '&:active .' + globalClassnames.title, [!disabled && rootHoverFocusActiveSelectorNeutralDarkMixin, {
        borderColor: palette.themePrimary
      }, highContrastBorderState]), _defineProperty(_selectors3, '&:hover .' + globalClassnames.caretDown, !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin), _defineProperty(_selectors3, '&:focus .' + globalClassnames.caretDown, [!disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin, {
        selectors: _objectSpread$8(_defineProperty({}, HighContrastSelector, {
          color: 'HighlightText'
        }), highContrastAdjustMixin)
      }]), _defineProperty(_selectors3, '&:active .' + globalClassnames.caretDown, !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin), _defineProperty(_selectors3, '&:hover .' + globalClassnames.titleIsPlaceHolder, !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin), _defineProperty(_selectors3, '&:focus .' + globalClassnames.titleIsPlaceHolder, !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin), _defineProperty(_selectors3, '&:active .' + globalClassnames.titleIsPlaceHolder, !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin), _defineProperty(_selectors3, '&:hover .' + globalClassnames.titleHasError, borderColorError), _defineProperty(_selectors3, '&:active .' + globalClassnames.titleHasError, borderColorError), _selectors3)
    }, isOpen && 'is-open', disabled && 'is-disabled', required && 'is-required', required && !hasLabel && {
      selectors: _defineProperty({
        ':after': {
          content: "'*'",
          color: semanticColors.errorText,
          position: 'absolute',
          top: -5,
          right: -10
        }
      }, HighContrastSelector, {
        selectors: {
          ':after': {
            right: -14
          }
        }
      })
    }],
    title: [globalClassnames.title, normalize, {
      backgroundColor: semanticColors.inputBackground,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: semanticColors.inputBorder,
      borderRadius: isOpen ? titleOpenBorderRadius : effects.roundedCorner2,
      cursor: 'pointer',
      display: 'block',
      height: DROPDOWN_HEIGHT,
      lineHeight: DROPDOWN_HEIGHT - 2,
      padding: "0 28px 0 8px",
      position: 'relative',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }, isRenderingPlaceholder && [globalClassnames.titleIsPlaceHolder, {
      color: semanticColors.inputPlaceholderText
    }], hasError && [globalClassnames.titleHasError, borderColorError], disabled && {
      backgroundColor: semanticColors.disabledBackground,
      border: 'none',
      color: semanticColors.disabledText,
      cursor: 'default',
      selectors: _defineProperty({}, HighContrastSelector, {
        border: '1px solid GrayText',
        color: 'GrayText'
      })
    }],
    caretDownWrapper: [globalClassnames.caretDownWrapper, {
      position: 'absolute',
      top: 1,
      right: 8,
      height: DROPDOWN_HEIGHT,
      lineHeight: DROPDOWN_HEIGHT - 2
    }, !disabled && {
      cursor: 'pointer'
    }],
    caretDown: [globalClassnames.caretDown, {
      color: palette.neutralSecondary,
      fontSize: fonts.small.fontSize,
      pointerEvents: 'none'
    }, disabled && {
      color: semanticColors.disabledText,
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'GrayText'
      })
    }],
    errorMessage: _objectSpread$8({
      color: semanticColors.errorText
    }, theme.fonts.small, {
      paddingTop: 5
    }),
    callout: [globalClassnames.callout, {
      boxShadow: effects.elevation8,
      borderRadius: calloutOpenBorderRadius,
      selectors: {
        '.ms-Callout-main': {
          borderRadius: calloutOpenBorderRadius
        }
      }
    }, calloutClassName],
    dropdownItemsWrapper: {
      selectors: {
        '&:focus': {
          outline: 0
        }
      }
    },
    dropdownItems: [globalClassnames.dropdownItems, {
      display: 'block'
    }],
    dropdownItem: [].concat(dropdownItemStyle, [itemSelectors()]),
    dropdownItemSelected: dropdownItemSelected,
    dropdownItemDisabled: dropdownItemDisabled,
    dropdownItemSelectedAndDisabled: [dropdownItemSelected, dropdownItemDisabled, {
      backgroundColor: 'transparent'
    }],
    dropdownItemHidden: [].concat(dropdownItemStyle, [{
      display: 'none'
    }]),
    dropdownDivider: [globalClassnames.dropdownDivider, {
      height: 1,
      backgroundColor: semanticColors.bodyDivider
    }],
    dropdownOptionText: [globalClassnames.dropdownOptionText, {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      minWidth: 0,
      maxWidth: '100%',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      margin: '1px'
    }],
    dropdownItemHeader: [globalClassnames.dropdownItemHeader, _objectSpread$8({}, fonts.medium, {
      fontWeight: FontWeights.semibold,
      color: semanticColors.menuHeader,
      background: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      height: DROPDOWN_ITEM_HEIGHT,
      lineHeight: DROPDOWN_ITEM_HEIGHT,
      cursor: 'default',
      padding: '0 8px',
      userSelect: 'none',
      textAlign: 'left'
    })],
    subComponentStyles: {
      label: {
        root: {
          display: 'inline-block'
        }
      },
      multiSelectItem: {
        root: {
          padding: 0
        },
        label: {
          alignSelf: 'stretch',
          padding: '0 8px',
          width: '100%'
        }
      },
      panel: {
        root: [panelClassName],
        main: {
          selectors: _defineProperty({}, MinimumScreenSelector$1, {
            // panelWidth xs
            width: 272
          })
        },
        contentInner: {
          padding: '0 0 20px'
        }
      }
    }
  };
};

var Dropdown$1 = styled(__vue_component__$m, getStyles$l, undefined);

var MessageBarType;

(function (MessageBarType) {
  /** Info styled MessageBar */
  MessageBarType[MessageBarType["info"] = 0] = "info";
  /** Error styled MessageBar */

  MessageBarType[MessageBarType["error"] = 1] = "error";
  /** Blocked styled MessageBar */

  MessageBarType[MessageBarType["blocked"] = 2] = "blocked";
  /** SevereWarning styled MessageBar */

  MessageBarType[MessageBarType["severeWarning"] = 3] = "severeWarning";
  /** Success styled MessageBar */

  MessageBarType[MessageBarType["success"] = 4] = "success";
  /** Warning styled MessageBar */

  MessageBarType[MessageBarType["warning"] = 5] = "warning";
  /**
   * Deprecated at v0.48.0, to be removed at \>= v1.0.0. Use `blocked` instead.
   * @deprecated Use `blocked` instead.
   */

  MessageBarType[MessageBarType["remove"] = 90000] = "remove";
})(MessageBarType || (MessageBarType = {}));

var getClassNames$e = classNamesFunction();

var MessageBar =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(MessageBar, _BaseComponent);

  function MessageBar() {
    var _this$ICON_MAP;

    var _this;

    _classCallCheck(this, MessageBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageBar).apply(this, arguments));
    _this.state = {
      expandSingleLine: _this.expandSingleLine
    };
    _this.ICON_MAP = (_this$ICON_MAP = {}, _defineProperty(_this$ICON_MAP, MessageBarType.info, 'Info'), _defineProperty(_this$ICON_MAP, MessageBarType.warning, 'Info'), _defineProperty(_this$ICON_MAP, MessageBarType.error, 'ErrorBadge'), _defineProperty(_this$ICON_MAP, MessageBarType.blocked, 'Blocked2'), _defineProperty(_this$ICON_MAP, MessageBarType.severeWarning, 'Warning'), _defineProperty(_this$ICON_MAP, MessageBarType.success, 'Completed'), _this$ICON_MAP);
    return _this;
  }

  _createClass(MessageBar, [{
    key: "onExpandSingleLine",
    value: function onExpandSingleLine(value) {
      this.state.expandSingleLine = value;
    }
  }, {
    key: "onClick",
    value: function onClick() {
      this.state.expandSingleLine = !this.state.expandSingleLine;
    }
  }, {
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          messageBarType = this.messageBarType,
          actions = this.actions,
          truncated = this.truncated,
          isMultiline = this.isMultiline;
      var expandSingleLine = this.state.expandSingleLine;
      return getClassNames$e(this.styles, {
        theme: theme,
        messageBarType: messageBarType || MessageBarType.info,
        onDismiss: this.$listeners.dismiss !== undefined,
        actions: actions !== undefined,
        truncated: truncated,
        isMultiline: isMultiline,
        expandSingleLine: expandSingleLine,
        className: className
      });
    }
  }]);

  return MessageBar;
}(BaseComponent$1);

__decorate([Prop({
  type: Number,
  default: MessageBarType.info
}), __metadata("design:type", Number)], MessageBar.prototype, "messageBarType", void 0);

__decorate([Prop({
  type: Boolean,
  default: true
}), __metadata("design:type", Boolean)], MessageBar.prototype, "isMultiline", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], MessageBar.prototype, "actions", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], MessageBar.prototype, "truncated", void 0);

__decorate([Prop({
  type: Boolean,
  default: true
}), __metadata("design:type", Boolean)], MessageBar.prototype, "expandSingleLine", void 0);

__decorate([Watch('expandSingleLine'), __metadata("design:type", Function), __metadata("design:paramtypes", [Boolean]), __metadata("design:returntype", void 0)], MessageBar.prototype, "onExpandSingleLine", null);

MessageBar = __decorate([Component({
  components: {
    Icon: Icon$1,
    IconButton: __vue_component__$7
  }
})], MessageBar);
var script$n = MessageBar;

/* script */
var __vue_script__$n = script$n;
/* template */

var __vue_render__$l = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    style: {
      background: _vm.theme.semanticColors.bodyBackground
    }
  }, [_c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.content
  }, [_c('div', {
    class: _vm.classNames.iconContainer
  }, [_c('Icon', {
    class: _vm.classNames.icon,
    attrs: {
      "icon-name": _vm.ICON_MAP[_vm.messageBarType]
    }
  })], 1), _vm._v(" "), _c('div', {
    class: _vm.classNames.text,
    attrs: {
      "role": "status"
    }
  }, [_c('span', {
    class: _vm.classNames.innerText
  }, [_c('span', [_vm._t("default")], 2)])]), _vm._v(" "), !_vm.actions && _vm.truncated ? _c('div', {
    class: _vm.classNames.expandSingleLine
  }, [_c('IconButton', {
    class: _vm.classNames.expand,
    attrs: {
      "icon-props": {
        iconName: _vm.state.expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown'
      }
    },
    nativeOn: {
      "click": function click($event) {
        return _vm.onClick($event);
      }
    }
  })], 1) : _vm._e(), _vm._v(" "), !_vm.isMultiline && _vm.$slots.actions ? _c('div', {
    class: _vm.classNames.actions
  }, [_vm._t("actions")], 2) : _vm._e(), _vm._v(" "), _vm.$listeners.dismiss ? [_vm.isMultiline ? _c('IconButton', {
    class: _vm.classNames.dismissal,
    attrs: {
      "icon-props": {
        iconName: 'Clear'
      }
    }
  }) : _c('div', {
    class: _vm.classNames.dismissSingleLine
  }, [_c('IconButton', {
    class: _vm.classNames.dismissal,
    attrs: {
      "icon-props": {
        iconName: 'Clear'
      }
    }
  })], 1)] : _vm._e()], 2), _vm._v(" "), _vm.isMultiline && _vm.$slots.actions ? _c('div', {
    class: _vm.classNames.actions
  }, [_vm._t("actions")], 2) : _vm._e()])]);
};

var __vue_staticRenderFns__$l = [];
/* style */

var __vue_inject_styles__$n = undefined;
/* scoped */

var __vue_scope_id__$n = undefined;
/* module identifier */

var __vue_module_identifier__$n = undefined;
/* functional template */

var __vue_is_functional_template__$n = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$n = __vue_normalize__({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, undefined, undefined, undefined);

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var GlobalClassNames$a = {
  root: 'ms-MessageBar',
  error: 'ms-MessageBar--error',
  blocked: 'ms-MessageBar--blocked',
  severeWarning: 'ms-MessageBar--severeWarning',
  success: 'ms-MessageBar--success',
  warning: 'ms-MessageBar--warning',
  multiline: 'ms-MessageBar-multiline',
  singleline: 'ms-MessageBar-singleline',
  dismissalSingleLine: 'ms-MessageBar-dismissalSingleLine',
  expandingSingleLine: 'ms-MessageBar-expandingSingleLine',
  content: 'ms-MessageBar-content',
  iconContainer: 'ms-MessageBar-icon',
  text: 'ms-MessageBar-text',
  innerText: 'ms-MessageBar-innerText',
  dismissSingleLine: 'ms-MessageBar-dismissSingleLine',
  expandSingleLine: 'ms-MessageBar-expandSingleLine',
  dismissal: 'ms-MessageBar-dismissal',
  expand: 'ms-MessageBar-expand',
  actions: 'ms-MessageBar-actions',
  actionsSingleline: 'ms-MessageBar-actionsSingleLine'
}; // Returns the background color of the MessageBar root element based on the type of MessageBar.

var getRootBackground = function getRootBackground(messageBarType, palette, semanticColors) {
  switch (messageBarType) {
    case MessageBarType.error:
    case MessageBarType.blocked:
      return semanticColors.errorBackground;

    case MessageBarType.severeWarning:
      return semanticColors.blockingBackground;

    case MessageBarType.success:
      return semanticColors.successBackground;

    case MessageBarType.warning:
      return semanticColors.warningBackground;
  }

  return palette.neutralLighter;
}; // Returns the icon color based on the type of MessageBar.


var getIconColor = function getIconColor(messageBarType, palette, semanticColors) {
  switch (messageBarType) {
    case MessageBarType.error:
    case MessageBarType.blocked:
    case MessageBarType.severeWarning:
      return semanticColors.errorText;

    case MessageBarType.success:
      return palette.green;

    case MessageBarType.warning:
      return semanticColors.warningText;
  }

  return palette.neutralSecondary;
};

var getStyles$m = function getStyles(props) {
  var theme = props.theme,
      className = props.className,
      messageBarType = props.messageBarType,
      onDismiss = props.onDismiss,
      truncated = props.truncated,
      isMultiline = props.isMultiline,
      expandSingleLine = props.expandSingleLine;
  var semanticColors = theme.semanticColors,
      palette = theme.palette,
      fonts = theme.fonts;
  var SmallScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
  var classNames = getGlobalClassNames(GlobalClassNames$a, theme);
  var dismissalAndExpandIconStyle = {
    fontSize: IconFontSizes.xSmall,
    height: 10,
    lineHeight: '10px',
    color: palette.neutralPrimary,
    selectors: _defineProperty({}, HighContrastSelector, {
      MsHighContrastAdjust: 'none',
      color: 'Window'
    })
  };
  var dismissalAndExpandStyle = [getFocusStyle(theme, {
    inset: 1,
    highContrastStyle: {
      outlineOffset: '-4px',
      outlineColor: 'Window'
    },
    borderColor: 'transparent'
  }), {
    flexShrink: 0,
    width: 32,
    height: 32,
    padding: '8px 12px',
    selectors: {
      '& .ms-Button-icon': dismissalAndExpandIconStyle,
      ':hover': {
        backgroundColor: 'transparent'
      },
      ':active': {
        backgroundColor: 'transparent'
      }
    }
  }];
  return {
    root: [classNames.root, theme.fonts.medium, messageBarType === MessageBarType.error && classNames.error, messageBarType === MessageBarType.blocked && classNames.blocked, messageBarType === MessageBarType.severeWarning && classNames.severeWarning, messageBarType === MessageBarType.success && classNames.success, messageBarType === MessageBarType.warning && classNames.warning, isMultiline ? classNames.multiline : classNames.singleline, !isMultiline && onDismiss && classNames.dismissalSingleLine, !isMultiline && truncated && classNames.expandingSingleLine, {
      background: getRootBackground(messageBarType, palette, semanticColors),
      color: palette.neutralPrimary,
      minHeight: 32,
      width: '100%',
      display: 'flex',
      wordBreak: 'break-word',
      selectors: _defineProperty({
        '& .ms-Link': _objectSpread$9({
          color: palette.themeDark
        }, fonts.small)
      }, HighContrastSelector, {
        background: 'WindowText',
        color: 'Window'
      })
    }, isMultiline && {
      flexDirection: 'column'
    }, className],
    content: [classNames.content, {
      display: 'flex',
      width: '100%',
      lineHeight: 'normal'
    }],
    iconContainer: [classNames.iconContainer, {
      fontSize: IconFontSizes.medium,
      minWidth: 16,
      minHeight: 16,
      display: 'flex',
      flexShrink: 0,
      margin: '8px 0 8px 12px'
    }],
    icon: {
      color: getIconColor(messageBarType, palette, semanticColors),
      selectors: _defineProperty({}, HighContrastSelector, {
        MsHighContrastAdjust: 'none',
        color: 'Window'
      })
    },
    text: [classNames.text, _objectSpread$9({
      minWidth: 0,
      display: 'flex',
      flexGrow: 1,
      margin: 8
    }, fonts.small, {
      selectors: _defineProperty({}, HighContrastSelector, {
        MsHighContrastAdjust: 'none'
      })
    }), !onDismiss && {
      marginRight: 12
    }],
    innerText: [classNames.innerText, {
      lineHeight: 16,
      selectors: {
        '& span a': {
          paddingLeft: 4
        }
      }
    }, truncated && {
      overflow: 'visible',
      whiteSpace: 'pre-wrap'
    }, !isMultiline && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }, !isMultiline && !truncated && {
      selectors: _defineProperty({}, SmallScreenSelector, {
        overflow: 'visible',
        whiteSpace: 'pre-wrap'
      })
    }, expandSingleLine && {
      overflow: 'visible',
      whiteSpace: 'pre-wrap'
    }],
    dismissSingleLine: [classNames.dismissSingleLine],
    expandSingleLine: [classNames.expandSingleLine],
    dismissal: [classNames.dismissal, dismissalAndExpandStyle],
    expand: [classNames.expand, dismissalAndExpandStyle],
    actions: [isMultiline ? classNames.actions : classNames.actionsSingleline, {
      display: 'flex',
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      margin: '0 12px 0 8px',
      selectors: {
        '& button:nth-child(n+2)': {
          marginLeft: 8
        }
      }
    }, isMultiline && {
      marginBottom: 8
    }, onDismiss && !isMultiline && {
      marginRight: 0
    }]
  };
};

var MessageBar$1 = styled(__vue_component__$n, getStyles$m, undefined);

var Popup =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Popup, _BaseComponent);

  function Popup() {
    var _this;

    _classCallCheck(this, Popup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Popup).apply(this, arguments));
    _this.needsVerticalScrollBar = false;
    _this._containsFocus = false;
    _this._disposables = [];

    _this._onKeyDown = function (ev) {
      console.log(ev); // switch (ev.which) {
      //   case KeyCodes.escape:
      //     if (this.onDismiss) {
      //       this.onDismiss(ev)
      //       ev.preventDefault()
      //       ev.stopPropagation()
      //     }
      //     break
      // }
    };

    _this._onFocus = function () {
      _this._containsFocus = true;
    };

    _this._onBlur = function (ev) {
      if (_this.$refs.current && _this.$refs.current.contains(ev.relatedTarget)) {
        _this._containsFocus = false;
      }
    };

    return _this;
  }

  _createClass(Popup, [{
    key: "created",
    value: function created() {
      this._async = new Async(this);
      this._originalFocusedElement = getDocument().activeElement;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      if (this.$refs.current) {
        // @ts-ignore
        this._disposables.push(on(this.$refs.current, 'focus', this._onFocus, true), on(this.$refs.current, 'blur', this._onBlur, true));

        var currentWindow = getWindow(this.$refs.current);

        if (currentWindow) {
          this._disposables.push(on(currentWindow, 'keydown', this._onKeyDown));
        }

        if (doesElementContainFocus(this.$refs.current)) {
          this._containsFocus = true;
        }
      }

      this._updateScrollBarAsync();
    }
  }, {
    key: "updated",
    value: function updated() {
      this._updateScrollBarAsync();

      this._async.dispose();
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      this._disposables.forEach(function (dispose) {
        return dispose();
      });

      if (this.shouldRestoreFocus && this._originalFocusedElement && this._containsFocus && this._originalFocusedElement !== window) {
        // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
        // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
        // to reset the focus back to the thing it thinks should have been focused.
        if (this._originalFocusedElement) {
          this._originalFocusedElement.focus();
        }
      }
    }
  }, {
    key: "render",
    value: function render(h, context) {
      var className = this.className;
      return h("div", {
        "ref": "current",
        "attrs": {
          "className": className
        },
        "on": {
          "keyDown": this._onKeyDown
        },
        "style": {
          overflowY: this.needsVerticalScrollBar ? 'scroll' : undefined,
          outline: 'none'
        }
      }, [this.$slots.default]);
    }
  }, {
    key: "_updateScrollBarAsync",
    value: function _updateScrollBarAsync() {
      var _this2 = this;

      this._async.requestAnimationFrame(function () {
        _this2._getScrollBar();
      });
    }
  }, {
    key: "_getScrollBar",
    value: function _getScrollBar() {
      // If overflowY is overriden, don't waste time calculating whether the scrollbar is necessary.
      if (this.style && this.style.overflowY) {
        return;
      }

      var needsVerticalScrollBar = false;

      if (this.$refs.current && this.$refs.current.firstElementChild) {
        // ClientHeight returns the client height of an element rounded to an
        // integer. On some browsers at different zoom levels this rounding
        // can generate different results for the root container and child even
        // though they are the same height. This causes us to show a scroll bar
        // when not needed. Ideally we would use BoundingClientRect().height
        // instead however seems that the API is 90% slower than using ClientHeight.
        // Therefore instead we will calculate the difference between heights and
        // allow for a 1px difference to still be considered ok and not show the
        // scroll bar.
        var rootHeight = this.$refs.current.clientHeight;
        var firstChildHeight = this.$refs.current.firstElementChild.clientHeight;

        if (rootHeight > 0 && firstChildHeight > rootHeight) {
          needsVerticalScrollBar = firstChildHeight - rootHeight > 1;
        }
      }

      if (this.needsVerticalScrollBar !== needsVerticalScrollBar) {
        this.needsVerticalScrollBar = needsVerticalScrollBar;
      }
    }
  }]);

  return Popup;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: true
}), __metadata("design:type", Boolean)], Popup.prototype, "shouldRestoreFocus", void 0);

__decorate([Prop({
  type: Object,
  default: function _default() {}
}), __metadata("design:type", Object)], Popup.prototype, "style", void 0);

Popup = __decorate([Component({
  components: {}
})], Popup);
var script$o = Popup;

/* script */
var __vue_script__$o = script$o;
/* template */

/* style */

var __vue_inject_styles__$o = undefined;
/* scoped */

var __vue_scope_id__$o = "data-v-28f77748";
/* module identifier */

var __vue_module_identifier__$o = undefined;
/* functional template */

var __vue_is_functional_template__$o = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$o = __vue_normalize__({}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, undefined, undefined, undefined);

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var getStyles$n = memoizeFunction(function (theme, className, customStyles) {
  var baseButtonStyles = getStyles$3(theme);
  var customButtonStyles = concatStyleSets(baseButtonStyles, customStyles);
  return _objectSpread$a({}, customButtonStyles, {
    root: [baseButtonStyles.root, className, theme.fonts.medium, customStyles && customStyles.root]
  });
});

var FacepileButton =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(FacepileButton, _BaseComponent);

  function FacepileButton() {
    _classCallCheck(this, FacepileButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(FacepileButton).apply(this, arguments));
  }

  _createClass(FacepileButton, [{
    key: "customStyles",
    get: function get() {
      return getStyles$n(this.theme, this.className, this.styles);
    }
  }]);

  return FacepileButton;
}(BaseComponent$1);

FacepileButton = __decorate([Component({
  components: {
    BaseButton: __vue_component__$2
  }
})], FacepileButton);
var script$p = FacepileButton;

/* script */
var __vue_script__$p = script$p;
/* template */

var __vue_render__$m = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('BaseButton', {
    attrs: {
      "variant-class-name": "ms-Button--facepile",
      "styles": _vm.customStyles
    }
  }, [_vm._v("FacepileButton")]);
};

var __vue_staticRenderFns__$m = [];
/* style */

var __vue_inject_styles__$p = undefined;
/* scoped */

var __vue_scope_id__$p = undefined;
/* module identifier */

var __vue_module_identifier__$p = undefined;
/* functional template */

var __vue_is_functional_template__$p = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$p = __vue_normalize__({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, false, undefined, undefined, undefined);

var getClassNames$f = classNamesFunction();

var Facepile =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Facepile, _BaseComponent);

  function Facepile() {
    _classCallCheck(this, Facepile);

    return _possibleConstructorReturn(this, _getPrototypeOf(Facepile).apply(this, arguments));
  }

  _createClass(Facepile, [{
    key: "singlePersona",
    get: function get() {
      return this.personas.length === 1;
    }
  }, {
    key: "classNames",
    get: function get() {
      return getClassNames$f(this.styles, {
        theme: this.theme,
        className: this.className
      });
    }
  }]);

  return Facepile;
}(BaseComponent$1);

__decorate([Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), __metadata("design:type", Array)], Facepile.prototype, "personas", void 0);

Facepile = __decorate([Component({
  components: {
    FacepileButton: __vue_component__$p
  }
})], Facepile);
var script$q = Facepile;

/* script */
var __vue_script__$q = script$q;
/* template */

var __vue_render__$n = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.itemContainer
  }, [_c('ul', {
    class: _vm.classNames.members,
    attrs: {
      "role": "listbox"
    }
  }, _vm._l(_vm.personas, function (persona, index) {
    return _c('li', {
      key: _vm.singlePersona ? 'persona' : "personaCoin-" + index,
      attrs: {
        "role": "option"
      }
    }, [_c('FacepileButton')], 1);
  }), 0)])]);
};

var __vue_staticRenderFns__$n = [];
/* style */

var __vue_inject_styles__$q = undefined;
/* scoped */

var __vue_scope_id__$q = undefined;
/* module identifier */

var __vue_module_identifier__$q = undefined;
/* functional template */

var __vue_is_functional_template__$q = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$q = __vue_normalize__({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, false, undefined, undefined, undefined);

var GlobalClassNames$b = {
  root: 'ms-Facepile',
  addButton: 'ms-Facepile-addButton ms-Facepile-itemButton',
  descriptiveOverflowButton: 'ms-Facepile-descriptiveOverflowButton ms-Facepile-itemButton',
  itemButton: 'ms-Facepile-itemButton ms-Facepile-person',
  itemContainer: 'ms-Facepile-itemContainer',
  members: 'ms-Facepile-members',
  member: 'ms-Facepile-member',
  overflowButton: 'ms-Facepile-overflowButton ms-Facepile-itemButton'
};
var getStyles$o = function getStyles(props) {
  var className = props.className,
      theme = props.theme,
      _props$spacingAroundI = props.spacingAroundItemButton,
      spacingAroundItemButton = _props$spacingAroundI === void 0 ? 2 : _props$spacingAroundI;
  var palette = theme.palette,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(GlobalClassNames$b, theme);
  var ItemButtonStyles = {
    textAlign: 'center',
    padding: 0,
    borderRadius: '50%',
    verticalAlign: 'top',
    display: 'inline',
    backgroundColor: 'transparent',
    border: 'none',
    selectors: {
      '&::-moz-focus-inner': {
        padding: 0,
        border: 0
      }
    }
  };
  return {
    root: [classNames.root, theme.fonts.medium, {
      width: 'auto'
    }, className],
    addButton: [classNames.addButton, getFocusStyle(theme, {
      inset: -1
    }), ItemButtonStyles, {
      fontSize: fonts.medium.fontSize,
      color: palette.white,
      backgroundColor: palette.themePrimary,
      marginRight: spacingAroundItemButton * 2 + 'px',
      selectors: {
        '&:hover': {
          backgroundColor: palette.themeDark
        },
        '&:focus': {
          backgroundColor: palette.themeDark
        },
        '&:active': {
          backgroundColor: palette.themeDarker
        },
        '&:disabled': {
          backgroundColor: palette.neutralTertiaryAlt
        }
      }
    }],
    descriptiveOverflowButton: [classNames.descriptiveOverflowButton, getFocusStyle(theme, {
      inset: -1
    }), ItemButtonStyles, {
      fontSize: fonts.small.fontSize,
      color: palette.neutralSecondary,
      backgroundColor: palette.neutralLighter,
      marginLeft: "".concat(spacingAroundItemButton * 2, "px")
    }],
    itemButton: [classNames.itemButton, ItemButtonStyles],
    itemContainer: [classNames.itemContainer, {
      display: 'flex'
    }],
    members: [classNames.members, {
      display: 'flex',
      overflow: 'hidden',
      listStyleType: 'none',
      padding: 0,
      margin: "-".concat(spacingAroundItemButton, "px")
    }],
    member: [classNames.member, {
      display: 'inline-flex',
      flex: '0 0 auto',
      margin: "".concat(spacingAroundItemButton, "px")
    }],
    overflowButton: [classNames.overflowButton, getFocusStyle(theme, {
      inset: -1
    }), ItemButtonStyles, {
      fontSize: fonts.medium.fontSize,
      color: palette.neutralSecondary,
      backgroundColor: palette.neutralLighter,
      marginLeft: "".concat(spacingAroundItemButton * 2, "px")
    }],
    overflowInitialsIcon: [{
      color: palette.neutralPrimary
    }],
    screenReaderOnly: hiddenContentStyle
  };
};

var Facepile$1 = styled(__vue_component__$q, getStyles$o, undefined);

var getClassNames$g = classNamesFunction();
var PanelVisibilityState;

(function (PanelVisibilityState) {
  PanelVisibilityState[PanelVisibilityState["closed"] = 0] = "closed";
  PanelVisibilityState[PanelVisibilityState["animatingOpen"] = 1] = "animatingOpen";
  PanelVisibilityState[PanelVisibilityState["open"] = 2] = "open";
  PanelVisibilityState[PanelVisibilityState["animatingClosed"] = 3] = "animatingClosed";
})(PanelVisibilityState || (PanelVisibilityState = {}));

var Panel =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Panel, _BaseComponent);

  function Panel() {
    var _this;

    _classCallCheck(this, Panel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Panel).apply(this, arguments));
    _this.IconFontSizes = IconFontSizes;
    _this.visibility = PanelVisibilityState.closed;
    return _this;
  }

  _createClass(Panel, [{
    key: "classNames",
    get: function get() {
      var styles = this.styles,
          theme = this.theme,
          _this$className = this.className,
          className = _this$className === void 0 ? '' : _this$className,
          focusTrapZoneProps = this.focusTrapZoneProps,
          hasCloseButton = this.hasCloseButton,
          _this$headerClassName = this.headerClassName,
          headerClassName = _this$headerClassName === void 0 ? '' : _this$headerClassName,
          isFooterSticky = this.isFooterSticky,
          isFooterAtBottom = this.isFooterAtBottom,
          isOnRightSide = this.isOnRightSide,
          isOpen = this.isOpen,
          isHiddenOnDismiss = this.isHiddenOnDismiss,
          type = this.type;
      var visibility = this.visibility;
      var isAnimating = visibility === PanelVisibilityState.animatingClosed || visibility === PanelVisibilityState.animatingOpen;
      return getClassNames$g(styles, {
        theme: theme,
        className: className,
        focusTrapZoneClassName: focusTrapZoneProps ? focusTrapZoneProps.className : undefined,
        hasCloseButton: hasCloseButton,
        headerClassName: headerClassName,
        isAnimating: isAnimating,
        isFooterSticky: isFooterSticky,
        isFooterAtBottom: isFooterAtBottom,
        isOnRightSide: isOnRightSide,
        isOpen: isOpen,
        isHiddenOnDismiss: isHiddenOnDismiss,
        type: type
      });
    }
  }]);

  return Panel;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Panel.prototype, "headerText", void 0);

__decorate([Prop(), __metadata("design:type", Object)], Panel.prototype, "focusTrapZoneProps", void 0);

__decorate([Prop(), __metadata("design:type", Object)], Panel.prototype, "headerClassName", void 0);

__decorate([Prop(), __metadata("design:type", Object)], Panel.prototype, "type", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Panel.prototype, "hasCloseButton", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Panel.prototype, "isFooterSticky", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Panel.prototype, "isFooterAtBottom", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Panel.prototype, "isOnRightSide", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Panel.prototype, "isOpen", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Panel.prototype, "isHiddenOnDismiss", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Panel.prototype, "isBlocking", void 0);

Panel = __decorate([Component({
  components: {
    Layer: __vue_component__$b,
    Overlay: Overlay$1,
    IconButton: __vue_component__$7
  }
})], Panel);
var script$r = Panel;

/* script */
var __vue_script__$r = script$r;
/* template */

var __vue_render__$o = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('Layer', [_c('div', {
    class: _vm.classNames.root
  }, [_vm.isBlocking && _vm.isOpen ? _c('Overlay', {
    class: _vm.classNames.overlay
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.classNames.main
  }, [_c('div', {
    class: _vm.classNames.commands
  }, [_c('div', {
    class: _vm.classNames.navigation
  }, [_c('IconButton', {
    class: _vm.classNames.closeButton,
    attrs: {
      "styles": {
        root: {
          height: 'auto',
          width: '44px',
          color: _vm.theme.palette.neutralSecondary,
          fontSize: _vm.IconFontSizes.large
        },
        rootHovered: {
          color: _vm.theme.palette.neutralPrimary
        }
      },
      "icon-props": {
        iconName: 'Cancel'
      }
    },
    nativeOn: {
      "click": function click($event) {
        return _vm.$emit('close');
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    class: _vm.classNames.contentInner
  }, [_c('div', {
    class: _vm.classNames.header
  }, [_c('p', {
    class: _vm.classNames.headerText
  }, [_vm._v("\n            " + _vm._s(_vm.headerText) + "\n          ")])]), _vm._v(" "), _c('div', {
    class: _vm.classNames.scrollableContent
  }, [_c('div', {
    class: _vm.classNames.content
  }, [_vm._t("default")], 2)])])])], 1)]);
};

var __vue_staticRenderFns__$o = [];
/* style */

var __vue_inject_styles__$r = undefined;
/* scoped */

var __vue_scope_id__$r = undefined;
/* module identifier */

var __vue_module_identifier__$r = undefined;
/* functional template */

var __vue_is_functional_template__$r = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$r = __vue_normalize__({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, false, undefined, undefined, undefined);

/**
 * {@docCategory Panel}
 */
var PanelType;

(function (PanelType) {
  /**
   * Renders the Panel with a `fluid` (full screen) width.
   * Recommended for use on small screen breakpoints.
   * - Small (320-479): full screen width, 16px left/right padding
   * - Medium (480-639): full screen width, 16px left/right padding
   * - Large (640-1023): full screen width, 32px left/right padding
   * - XLarge (1024-1365): full screen width, 32px left/right padding
   * - XXLarge (1366-up): full screen width, 40px left/right padding
   */
  PanelType[PanelType["smallFluid"] = 0] = "smallFluid";
  /**
   * Renders the Panel in fixed-width `small` size, anchored to the far side (right in LTR mode).
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639): 340px width, 16px left/right padding
   * - Large (640-1023): 340px width, 32px left/right padding
   * - XLarge (1024-1365): 340px width, 32px left/right padding
   * - XXLarge (1366-up): 340px width, 40px left/right padding
   */

  PanelType[PanelType["smallFixedFar"] = 1] = "smallFixedFar";
  /**
   * Renders the Panel in fixed-width `small` size, anchored to the near side (left in LTR mode).
   * - Small (320-479): 272px width, 16px left/right padding
   * - Medium (480-639): 272px width, 16px left/right padding
   * - Large (640-1023): 272px width, 32px left/right padding
   * - XLarge (1024-1365): 272px width, 32px left/right padding
   * - XXLarge (1366-up): 272px width, 40px left/right padding
   */

  PanelType[PanelType["smallFixedNear"] = 2] = "smallFixedNear";
  /**
   * Renders the Panel in `medium` size, anchored to the far side (right in LTR mode).
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
   * - Large (640-1023): 592px width, 32px left/right padding
   * - XLarge (1024-1365): 644px width, 32px left/right padding
   * - XXLarge (1366-up): 644px width, 40px left/right padding
   */

  PanelType[PanelType["medium"] = 3] = "medium";
  /**
   * Renders the Panel in `large` size, anchored to the far side (right in LTR mode).
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639):  adapts to `PanelType.smallFixedFar` at this breakpoint
   * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
   * - XLarge (1024-1365): 48px fixed left margin, fluid width, 32px left/right padding
   * - XXLarge (1366-up): 428px fixed left margin, fluid width, 40px left/right padding
   */

  PanelType[PanelType["large"] = 4] = "large";
  /**
   * Renders the Panel in `large` size, anchored to the far side (right in LTR mode), with a fixed width at XX-Large breakpoint.
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
   * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
   * - XLarge (1024-1365): 48px fixed left margin, fluid width, 32px left/right padding
   * - XXLarge (1366-up): 940px width, 40px left/right padding
   */

  PanelType[PanelType["largeFixed"] = 5] = "largeFixed";
  /**
   * Renders the Panel in `extra large` size, anchored to the far side (right in LTR mode).
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
   * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
   * - XLarge (1024-1365): adapts to `PanelType.large` at this breakpoint
   * - XXLarge (1366-1919): 176px fixed left margin, fluid width, 40px left/right padding
   * - XXXLarge (1920-up): 176px fixed left margin, fluid width, 40px left/right padding
   */

  PanelType[PanelType["extraLarge"] = 6] = "extraLarge";
  /**
   * Renders the Panel in `custom` size using `customWidth`, anchored to the far side (right in LTR mode).
   * - Has a fixed width provided by the `customWidth` prop
   * - When screen width reaches the `customWidth` value it will behave like a fluid width Panel
   * taking up 100% of the viewport width
   */

  PanelType[PanelType["custom"] = 7] = "custom";
  /**
   * Renders the Panel in `custom` size using `customWidth`, anchored to the near side (left in LTR mode).
   * - Has a fixed width provided by the `customWidth` prop
   * - When screen width reaches the `customWidth` value it will behave like a fluid width Panel
   * taking up 100% of the viewport width
   */

  PanelType[PanelType["customNear"] = 8] = "customNear";
})(PanelType || (PanelType = {}));

var _mediumPanelSelectors, _largePanelSelectors;

function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$b(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
// import { IStyleFunctionOrObject } from '../../Utilities';
// import { IButtonStyles, IButtonStyleProps } from '../../Button';

var GlobalClassNames$c = {
  root: 'ms-Panel',
  main: 'ms-Panel-main',
  commands: 'ms-Panel-commands',
  contentInner: 'ms-Panel-contentInner',
  scrollableContent: 'ms-Panel-scrollableContent',
  navigation: 'ms-Panel-navigation',
  closeButton: 'ms-Panel-closeButton ms-PanelAction-close',
  header: 'ms-Panel-header',
  headerText: 'ms-Panel-headerText',
  content: 'ms-Panel-content',
  footer: 'ms-Panel-footer',
  footerInner: 'ms-Panel-footerInner',
  isOpen: 'is-open',
  hasCloseButton: 'ms-Panel--hasCloseButton',
  smallFluid: 'ms-Panel--smFluid',
  smallFixedNear: 'ms-Panel--smLeft',
  smallFixedFar: 'ms-Panel--sm',
  medium: 'ms-Panel--md',
  large: 'ms-Panel--lg',
  largeFixed: 'ms-Panel--fixed',
  extraLarge: 'ms-Panel--xl',
  custom: 'ms-Panel--custom',
  customNear: 'ms-Panel--customLeft'
};
var panelWidth = {
  full: '100%',
  auto: 'auto',
  xs: 272,
  sm: 340,
  md1: 592,
  md2: 644,
  lg: 940
};
var panelMargin = {
  auto: 'auto',
  none: 0,
  md: 48,
  lg: 428,
  xl: 176
}; // Following consts are used below in `getPanelBreakpoints()` function to provide
// necessary fallbacks for different types of Panel in different breakpoints.

var smallPanelSelectors = _defineProperty({}, "@media (min-width: ".concat(ScreenWidthMinMedium, "px)"), {
  width: panelWidth.sm
});

var mediumPanelSelectors = (_mediumPanelSelectors = {}, _defineProperty(_mediumPanelSelectors, "@media (min-width: ".concat(ScreenWidthMinLarge, "px)"), {
  width: panelWidth.md1
}), _defineProperty(_mediumPanelSelectors, "@media (min-width: ".concat(ScreenWidthMinXLarge, "px)"), {
  width: panelWidth.md2
}), _mediumPanelSelectors);
var largePanelSelectors = (_largePanelSelectors = {}, _defineProperty(_largePanelSelectors, "@media (min-width: ".concat(ScreenWidthMinUhfMobile, "px)"), {
  left: panelMargin.md,
  width: panelWidth.auto
}), _defineProperty(_largePanelSelectors, "@media (min-width: ".concat(ScreenWidthMinXXLarge, "px)"), {
  left: panelMargin.lg
}), _largePanelSelectors);

var largeFixedPanelSelectors = _defineProperty({}, "@media (min-width: ".concat(ScreenWidthMinXXLarge, "px)"), {
  left: panelMargin.auto,
  width: panelWidth.lg
});

var extraLargePanelSelectors = _defineProperty({}, "@media (min-width: ".concat(ScreenWidthMinXXLarge, "px)"), {
  left: panelMargin.xl
}); // Make sure Panels have fallbacks to different breakpoints by reusing same selectors.
// This is done in the effort to follow design redlines.


var getPanelBreakpoints = function getPanelBreakpoints(type) {
  var selectors; // Panel types `smallFluid`, `smallFixedNear`, `custom` and `customNear`
  // are not checked in here because they render the same in all the breakpoints
  // and have the checks done separately in the `getStyles` function below.

  switch (type) {
    case PanelType.smallFixedFar:
      selectors = _objectSpread$b({}, smallPanelSelectors);
      break;

    case PanelType.medium:
      selectors = _objectSpread$b({}, smallPanelSelectors, {}, mediumPanelSelectors);
      break;

    case PanelType.large:
      selectors = _objectSpread$b({}, smallPanelSelectors, {}, mediumPanelSelectors, {}, largePanelSelectors);
      break;

    case PanelType.largeFixed:
      selectors = _objectSpread$b({}, smallPanelSelectors, {}, mediumPanelSelectors, {}, largePanelSelectors, {}, largeFixedPanelSelectors);
      break;

    case PanelType.extraLarge:
      selectors = _objectSpread$b({}, smallPanelSelectors, {}, mediumPanelSelectors, {}, largePanelSelectors, {}, extraLargePanelSelectors);
      break;
  }

  return selectors;
};

var commandBarHeight = '44px';
var sharedPaddingStyles = {
  paddingLeft: '16px',
  paddingRight: '16px'
}; // // TODO -Issue #5689: Comment in once Button is converted to mergeStyles
// function getIconButtonStyles(props: any): IStyleFunctionOrObject<IButtonStyleProps, IButtonStyles> {
//   const { theme } = props;
//   return () => ({
//     root: {
//       height: 'auto',
//       width: '44px',
//       color: theme.palette.neutralSecondary,
//       fontSize: IconFontSizes.large
//     },
//     rootHovered: {
//       color: theme.palette.neutralPrimary
//     }
//   });
// }

var getStyles$p = function getStyles(props) {
  var className = props.className,
      focusTrapZoneClassName = props.focusTrapZoneClassName,
      hasCloseButton = props.hasCloseButton,
      headerClassName = props.headerClassName,
      isAnimating = props.isAnimating,
      isFooterSticky = props.isFooterSticky,
      isFooterAtBottom = props.isFooterAtBottom,
      isOnRightSide = props.isOnRightSide,
      isOpen = props.isOpen,
      isHiddenOnDismiss = props.isHiddenOnDismiss,
      theme = props.theme,
      _props$type = props.type,
      type = _props$type === void 0 ? PanelType.smallFixedFar : _props$type;
  var effects = theme.effects,
      fonts = theme.fonts,
      semanticColors = theme.semanticColors;
  var classNames = getGlobalClassNames(GlobalClassNames$c, theme);
  var isCustomPanel = type === PanelType.custom || type === PanelType.customNear;
  return {
    root: [classNames.root, theme.fonts.medium, isOpen && classNames.isOpen, hasCloseButton && classNames.hasCloseButton, {
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }, isCustomPanel && isOnRightSide && classNames.custom, isCustomPanel && !isOnRightSide && classNames.customNear, className],
    overlay: [{
      pointerEvents: 'auto',
      cursor: 'pointer'
    }, isOpen && isAnimating && AnimationClassNames.fadeIn100, !isOpen && isAnimating && AnimationClassNames.fadeOut100],
    hiddenPanel: [!isOpen && !isAnimating && isHiddenOnDismiss && {
      visibility: 'hidden'
    }],
    main: [classNames.main, {
      backgroundColor: semanticColors.bodyBackground,
      boxShadow: effects.elevation64,
      pointerEvents: 'auto',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      bottom: 0,
      top: 0,
      // (left, right, width) - Properties to be overridden depending on the type of the Panel and the screen breakpoint.
      left: panelMargin.auto,
      right: panelMargin.none,
      width: panelWidth.full,
      selectors: _objectSpread$b(_defineProperty({}, HighContrastSelector, {
        borderLeft: "3px solid ".concat(semanticColors.variantBorder),
        borderRight: "3px solid ".concat(semanticColors.variantBorder)
      }), getPanelBreakpoints(type))
    }, type === PanelType.smallFluid && {
      left: panelMargin.none
    }, type === PanelType.smallFixedNear && {
      left: panelMargin.none,
      right: panelMargin.auto,
      width: panelWidth.xs
    }, type === PanelType.customNear && {
      right: 'auto',
      left: 0
    }, isCustomPanel && {
      maxWidth: '100vw'
    }, isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideRightIn40, isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideLeftIn40, !isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideLeftOut40, !isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideRightOut40, focusTrapZoneClassName],
    commands: [classNames.commands],
    navigation: [classNames.navigation, {
      padding: '0 5px',
      height: commandBarHeight,
      display: 'flex',
      justifyContent: 'flex-end'
    }],
    closeButton: [classNames.closeButton],
    contentInner: [classNames.contentInner, {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflowY: 'hidden'
    }],
    header: [classNames.header, sharedPaddingStyles, {
      margin: '14px 0',
      // Ensure that title doesn't shrink if screen is too small
      flexShrink: 0,
      selectors: _defineProperty({}, "@media (min-width: ".concat(ScreenWidthMinXLarge, "px)"), {
        marginTop: '30px'
      })
    }],
    headerText: [classNames.headerText, fonts.xLarge, {
      color: semanticColors.bodyText,
      lineHeight: '27px',
      margin: 0,
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
      hyphens: 'auto'
    }, headerClassName],
    scrollableContent: [classNames.scrollableContent, {
      overflowY: 'auto'
    }, isFooterAtBottom && {
      flexGrow: 1
    }],
    content: [classNames.content, sharedPaddingStyles, {
      marginBottom: 0,
      paddingBottom: 20
    }],
    footer: [classNames.footer, {
      // Ensure that footer doesn't shrink if screen is too small
      flexShrink: 0,
      borderTop: '1px solid transparent',
      transition: "opacity ".concat(AnimationVariables.durationValue3, " ").concat(AnimationVariables.easeFunction2)
    }, isFooterSticky && {
      background: semanticColors.bodyBackground,
      borderTopColor: semanticColors.variantBorder
    }],
    footerInner: [classNames.footerInner, sharedPaddingStyles, {
      paddingBottom: 16,
      paddingTop: 16
    }]
  };
};

var Panel$1 = styled(__vue_component__$r, getStyles$p, undefined);

function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$c(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var getClassNames$h = classNamesFunction();

var Link =
/*#__PURE__*/
function (_StatelessComponent) {
  _inherits(Link, _StatelessComponent);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, _getPrototypeOf(Link).apply(this, arguments));
  }

  _createClass(Link, [{
    key: "render",
    value: function render(h, context) {
      var _context$props = context.props,
          theme = _context$props.theme,
          className = _context$props.className,
          styles = _context$props.styles,
          href = _context$props.href,
          disabled = _context$props.disabled;
      var classNames = getClassNames$h(styles, {
        theme: theme,
        className: className,
        isButton: !href,
        isDisabled: disabled
      });
      var component = href ? 'a' : 'button';
      return h(component, _objectSpread$c({}, context.data, {
        class: classNames.root,
        attrs: _objectSpread$c({}, context.data.attrs, {}, href && {
          href: href
        }, {}, !href && {
          type: 'button'
        })
      }), context.children);
    }
  }]);

  return Link;
}(StatelessComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Link.prototype, "disabled", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Link.prototype, "href", void 0);

Link = __decorate([Component], Link);
var LinkBase = Link;

var GlobalClassNames$d = {
  root: 'ms-Link'
};
var getStyles$q = function getStyles(props) {
  var _selectors3;

  var className = props.className,
      isButton = props.isButton,
      isDisabled = props.isDisabled,
      theme = props.theme;
  var semanticColors = theme.semanticColors; // Tokens

  var linkColor = semanticColors.link;
  var linkInteractedColor = semanticColors.linkHovered;
  var linkDisabledColor = semanticColors.disabledText;
  var focusBorderColor = semanticColors.focusBorder;
  var classNames = getGlobalClassNames(GlobalClassNames$d, theme);
  return {
    root: [classNames.root, theme.fonts.medium, {
      color: linkColor,
      outline: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      selectors: _defineProperty({
        '.ms-Fabric--isFocusVisible &:focus': {
          // Can't use getFocusStyle because it doesn't support wrapping links
          // https://github.com/OfficeDev/office-ui-fabric-react/issues/4883#issuecomment-406743543
          // A box-shadow allows the focus rect to wrap links that span multiple lines
          // and helps the focus rect avoid getting clipped.
          boxShadow: "0 0 0 1px ".concat(focusBorderColor, " inset"),
          selectors: _defineProperty({}, HighContrastSelector, {
            outline: '1px solid WindowText'
          })
        }
      }, HighContrastSelector, {
        // For IE high contrast mode
        borderBottom: 'none'
      })
    }, isButton && {
      background: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline',
      margin: 0,
      overflow: 'inherit',
      padding: 0,
      textAlign: 'left',
      textOverflow: 'inherit',
      userSelect: 'text',
      borderBottom: '1px solid transparent',
      selectors: (_selectors3 = {}, _defineProperty(_selectors3, HighContrastSelectorBlack, {
        color: '#FFFF00'
      }), _defineProperty(_selectors3, HighContrastSelectorWhite, {
        color: '#00009F'
      }), _selectors3)
    }, !isButton && {
      textDecoration: 'none'
    }, isDisabled && ['is-disabled', {
      color: linkDisabledColor,
      cursor: 'default'
    }, {
      selectors: {
        '&:link, &:visited': {
          pointerEvents: 'none'
        }
      }
    }], !isDisabled && {
      selectors: {
        '&:active, &:hover, &:active:hover': {
          color: linkInteractedColor,
          textDecoration: 'underline'
        },
        '&:focus': {
          color: linkColor
        }
      }
    }, classNames.root, className]
  };
};

var Link$1 = styled(LinkBase, getStyles$q, undefined);

var getClassNames$i = classNamesFunction(); // if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios

var ZERO_THRESHOLD = 0.01;

var ProgressIndicator =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ProgressIndicator, _BaseComponent);

  function ProgressIndicator() {
    _classCallCheck(this, ProgressIndicator);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProgressIndicator).apply(this, arguments));
  }

  _createClass(ProgressIndicator, [{
    key: "classNames",
    get: function get() {
      var className = this.className,
          indeterminate = this.indeterminate,
          theme = this.theme,
          barHeight = this.barHeight;
      return getClassNames$i(this.styles, {
        className: className,
        indeterminate: indeterminate,
        theme: theme,
        barHeight: barHeight
      });
    }
  }, {
    key: "progressBarStyles",
    get: function get() {
      var percentComplete = this.percentComplete;
      return {
        width: percentComplete !== undefined ? percentComplete + '%' : undefined,
        transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined
      };
    }
  }]);

  return ProgressIndicator;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], ProgressIndicator.prototype, "progressHidden", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], ProgressIndicator.prototype, "indeterminate", void 0);

__decorate([Prop({
  type: Number,
  default: 0
}), __metadata("design:type", Number)], ProgressIndicator.prototype, "percentComplete", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], ProgressIndicator.prototype, "label", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], ProgressIndicator.prototype, "description", void 0);

__decorate([Prop({
  type: Number,
  default: 2
}), __metadata("design:type", Number)], ProgressIndicator.prototype, "barHeight", void 0);

ProgressIndicator = __decorate([Component], ProgressIndicator);
var script$s = ProgressIndicator;

var __vue_script__$s = script$s;
/* template */

var __vue_render__$p = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_vm.label ? _c('div', {
    class: _vm.classNames.itemName
  }, [_vm._v("\n    " + _vm._s(_vm.label) + "\n  ")]) : _vm._e(), _vm._v(" "), !_vm.progressHidden ? _c('div', {
    class: _vm.classNames.itemProgress
  }, [_c('div', {
    class: _vm.classNames.progressTrack
  }), _vm._v(" "), _c('div', {
    class: _vm.classNames.progressBar,
    style: _vm.progressBarStyles
  })]) : _vm._e(), _vm._v(" "), _vm.description ? _c('div', {
    class: _vm.classNames.itemDescription
  }, [_vm._v("\n    " + _vm._s(_vm.description) + "\n  ")]) : _vm._e()]);
};

var __vue_staticRenderFns__$p = [];
/* style */

var __vue_inject_styles__$s = undefined;
/* scoped */

var __vue_scope_id__$s = undefined;
/* module identifier */

var __vue_module_identifier__$s = undefined;
/* functional template */

var __vue_is_functional_template__$s = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$s = __vue_normalize__({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, false, undefined, undefined, undefined);

var GlobalClassNames$e = {
  root: 'ms-ProgressIndicator',
  itemName: 'ms-ProgressIndicator-itemName',
  itemDescription: 'ms-ProgressIndicator-itemDescription',
  itemProgress: 'ms-ProgressIndicator-itemProgress',
  progressTrack: 'ms-ProgressIndicator-progressTrack',
  progressBar: 'ms-ProgressIndicator-progressBar'
};
var IndeterminateProgress = keyframes({
  '0%': {
    left: '-30%'
  },
  '100%': {
    left: '100%'
  }
});
var IndeterminateProgressRTL = keyframes({
  '100%': {
    right: '-30%'
  },
  '0%': {
    right: '100%'
  }
});
var getStyles$r = function getStyles(props) {
  var isRTL = getRTL();
  var className = props.className,
      indeterminate = props.indeterminate,
      theme = props.theme,
      _props$barHeight = props.barHeight,
      barHeight = _props$barHeight === void 0 ? 2 : _props$barHeight;
  var palette = theme.palette,
      semanticColors = theme.semanticColors,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(GlobalClassNames$e, theme);
  var marginBetweenText = 8;
  var textHeight = 18;
  var progressTrackColor = palette.neutralLight;
  return {
    root: [classNames.root, fonts.medium, className],
    itemName: [classNames.itemName, noWrap, {
      color: semanticColors.bodyText,
      paddingTop: marginBetweenText / 2,
      lineHeight: textHeight + 2
    }],
    itemDescription: [classNames.itemDescription, {
      color: semanticColors.bodySubtext,
      fontSize: fonts.small.fontSize,
      lineHeight: textHeight
    }],
    itemProgress: [classNames.itemProgress, {
      position: 'relative',
      overflow: 'hidden',
      height: barHeight,
      padding: "".concat(marginBetweenText, "px 0")
    }],
    progressTrack: [classNames.progressTrack, {
      position: 'absolute',
      width: '100%',
      height: barHeight,
      backgroundColor: progressTrackColor,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderBottom: '1px solid WindowText'
      })
    }],
    progressBar: [{
      backgroundColor: palette.themePrimary,
      height: barHeight,
      position: 'absolute',
      transition: 'width .3s ease',
      width: 0,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'WindowText'
      })
    }, indeterminate ? {
      position: 'absolute',
      minWidth: '33%',
      background: "linear-gradient(to right, ".concat(progressTrackColor, " 0%, ").concat(palette.themePrimary, " 50%, ").concat(progressTrackColor, " 100%)"),
      animation: "".concat(isRTL ? IndeterminateProgressRTL : IndeterminateProgress, " 3s infinite")
    } : {
      transition: 'width .15s linear'
    }, classNames.progressBar]
  };
};

var ProgressIndicator$1 = styled(__vue_component__$s, getStyles$r, undefined);

var getClassNames$j = classNamesFunction();

var Rating =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Rating, _BaseComponent);

  function Rating() {
    var _this;

    _classCallCheck(this, Rating);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rating).apply(this, arguments));
    _this.internalValue = _this.rating;
    return _this;
  }

  _createClass(Rating, [{
    key: "getRatingIconName",
    value: function getRatingIconName(ratingLevel) {
      return this.internalValue >= ratingLevel ? this.iconName : this.unselectedIconName;
    }
  }, {
    key: "getRatingFillPercentage",
    value: function getRatingFillPercentage(ratingLevel) {
      if (ratingLevel - this.internalValue <= 0) return '100%';
      if (ratingLevel - this.internalValue > 1) return '0%';
      if (ratingLevel - this.internalValue > 0) return "".concat((1 - (ratingLevel - this.internalValue)) * 100, "%");
    }
  }, {
    key: "setRating",
    value: function setRating(rating) {
      this.internalValue = rating;
    }
  }, {
    key: "onPropValueChanged",
    value: function onPropValueChanged(newValue) {
      this.internalValue = newValue;
    }
  }, {
    key: "onValueChanged",
    value: function onValueChanged(value) {
      this.$emit('input', value);
    }
  }, {
    key: "classNames",
    get: function get() {
      var disabled = this.disabled,
          readonly = this.readonly,
          theme = this.theme;
      return getClassNames$j(this.styles, {
        disabled: disabled,
        readonly: readonly,
        theme: theme
      });
    }
  }, {
    key: "ratingLevels",
    get: function get() {
      var min = this.min,
          max = this.max;
      if (min < 0 || max <= min) return [];
      var i = min + 1;
      return Array(max - min).fill(undefined).map(function () {
        return i++;
      });
    }
  }, {
    key: "areaLabel",
    get: function get() {
      if (!this.ariaLabelFormat) return '';
      return this.ariaLabelFormat.replace('{0}', "".concat(this.internalValue)).replace('{1}', "".concat(this.max));
    }
  }]);

  return Rating;
}(BaseComponent$1);

__decorate([Prop({
  type: Number,
  default: 16
}), __metadata("design:type", Number)], Rating.prototype, "size", void 0);

__decorate([Prop({
  type: Number,
  default: 0
}), __metadata("design:type", Number)], Rating.prototype, "min", void 0);

__decorate([Prop({
  type: Number,
  default: 10
}), __metadata("design:type", Number)], Rating.prototype, "max", void 0);

__decorate([Prop({
  type: Number,
  default: 0
}), __metadata("design:type", Number)], Rating.prototype, "rating", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Rating.prototype, "ariaLabelFormat", void 0);

__decorate([Prop({
  type: String,
  default: 'FavoriteStarFill'
}), __metadata("design:type", String)], Rating.prototype, "iconName", void 0);

__decorate([Prop({
  type: String,
  default: 'FavoriteStar'
}), __metadata("design:type", String)], Rating.prototype, "unselectedIconName", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Rating.prototype, "disabled", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Rating.prototype, "readonly", void 0);

__decorate([Watch('rating'), __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], Rating.prototype, "onPropValueChanged", null);

__decorate([Watch('internalValue'), __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], Rating.prototype, "onValueChanged", null);

Rating = __decorate([Component({
  components: {
    Icon: Icon$1,
    IconButton: __vue_component__$7
  },
  inheritAttrs: false
})], Rating);
var script$t = Rating;

/* script */
var __vue_script__$t = script$t;
/* template */

var __vue_render__$q = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root,
    style: {
      '--size': _vm.size + "px"
    },
    attrs: {
      "area-label": _vm.areaLabel
    }
  }, [_c('div', {
    class: _vm.classNames.ratingFocusZone
  }, _vm._l(_vm.ratingLevels, function (ratingLevel) {
    return _c('button', _vm._b({
      key: ratingLevel,
      class: _vm.classNames.ratingButton,
      attrs: {
        "disabled": _vm.disabled
      },
      on: {
        "click": function click($event) {
          !_vm.disabled && !_vm.readonly && _vm.setRating(ratingLevel);
        }
      }
    }, 'button', _vm.$attrs, false), [_c('span', {
      class: _vm.classNames.labelText
    }, [_vm._v(_vm._s("Select " + ratingLevel + " of " + _vm.max))]), _vm._v(" "), _c('div', {
      class: _vm.classNames.ratingStar
    }, [_c('Icon', {
      class: _vm.classNames.ratingStarBack,
      attrs: {
        "icon-name": _vm.getRatingIconName(ratingLevel)
      }
    }), _vm._v(" "), _c('Icon', {
      class: _vm.classNames.ratingStarFront,
      style: {
        width: _vm.getRatingFillPercentage(ratingLevel)
      },
      attrs: {
        "icon-name": _vm.iconName
      }
    })], 1)]);
  }), 0)]);
};

var __vue_staticRenderFns__$q = [];
/* style */

var __vue_inject_styles__$t = undefined;
/* scoped */

var __vue_scope_id__$t = undefined;
/* module identifier */

var __vue_module_identifier__$t = undefined;
/* functional template */

var __vue_is_functional_template__$t = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$t = __vue_normalize__({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, false, undefined, undefined, undefined);

var GlobalClassNames$f = {
  root: 'ms-RatingStar-root',
  rootIsSmall: 'ms-RatingStar-root--small',
  rootIsLarge: 'ms-RatingStar-root--large',
  ratingStar: 'ms-RatingStar-container',
  ratingStarBack: 'ms-RatingStar-back',
  ratingStarFront: 'ms-RatingStar-front',
  ratingButton: 'ms-Rating-button',
  ratingStarIsSmall: 'ms-Rating--small',
  ratingStartIsLarge: 'ms-Rating--large',
  labelText: 'ms-Rating-labelText',
  ratingFocusZone: 'ms-Rating-focuszone'
};

function _getColorWithHighContrast(color, highContrastColor) {
  return {
    color: color,
    selectors: _defineProperty({}, HighContrastSelector, {
      color: highContrastColor
    })
  };
}

function getStyles$s(props) {
  var disabled = props.disabled,
      readOnly = props.readOnly,
      theme = props.theme;
  var semanticColors = theme.semanticColors,
      palette = theme.palette;
  var classNames = getGlobalClassNames(GlobalClassNames$f, theme);
  var ratingSmallIconSize = 16;
  var ratingLargeIconSize = 20;
  var ratingVerticalPadding = 8;
  var ratingHorizontalPadding = 2;
  var ratingStarUncheckedColor = palette.neutralSecondary;
  var ratingStarUncheckedHoverColor = palette.themePrimary;
  var ratingStarUncheckedHoverSelectedColor = palette.themeDark;
  var ratingStarCheckedColor = palette.neutralPrimary;
  var ratingStarDisabledColor = semanticColors.disabledBodySubtext;
  return {
    root: [classNames.root, theme.fonts.medium, !disabled && !readOnly && {
      selectors: {
        // This is part 1 of highlighting all stars up to the one the user is hovering over
        '&:hover': {
          selectors: {
            '.ms-RatingStar-back': _getColorWithHighContrast(ratingStarCheckedColor, 'Highlight')
          }
        }
      }
    }],
    rootIsSmall: [classNames.rootIsSmall, {
      height: ratingSmallIconSize + ratingVerticalPadding * 2 + 'px'
    }],
    rootIsLarge: [classNames.rootIsLarge, {
      height: ratingLargeIconSize + ratingVerticalPadding * 2 + 'px'
    }],
    ratingStar: [classNames.ratingStar, {
      display: 'inline-block',
      position: 'relative',
      height: 'inherit'
    }],
    ratingStarBack: [classNames.ratingStarBack, {
      // TODO: Use a proper semantic color for this
      color: ratingStarUncheckedColor,
      width: '100%'
    }, disabled && _getColorWithHighContrast(ratingStarDisabledColor, 'GrayText')],
    ratingStarFront: [classNames.ratingStarFront, {
      position: 'absolute',
      height: '100 %',
      left: '0',
      top: '0',
      textAlign: 'center',
      verticalAlign: 'middle',
      overflow: 'hidden'
    }, _getColorWithHighContrast(ratingStarCheckedColor, 'Highlight')],
    ratingButton: [getFocusStyle(theme), classNames.ratingButton, {
      fontSize: "var(--size)",
      lineHeight: "var(--size)",
      height: "var(--size)",
      backgroundColor: 'transparent',
      padding: "".concat(ratingVerticalPadding, "px ").concat(ratingHorizontalPadding, "px"),
      boxSizing: 'content-box',
      margin: '0px',
      border: 'none',
      cursor: 'pointer',
      selectors: {
        '&:disabled': {
          cursor: 'default'
        },
        '&[disabled]': {
          cursor: 'default'
        }
      }
    }, !disabled && !readOnly && {
      selectors: {
        // This is part 2 of highlighting all stars up to the one the user is hovering over
        '&:hover ~ .ms-Rating-button': {
          selectors: {
            '.ms-RatingStar-back': _getColorWithHighContrast(ratingStarUncheckedColor, 'WindowText'),
            '.ms-RatingStar-front': _getColorWithHighContrast(ratingStarUncheckedColor, 'WindowText')
          }
        },
        '&:hover': {
          selectors: {
            '.ms-RatingStar-back': {
              color: ratingStarUncheckedHoverColor
            },
            '.ms-RatingStar-front': {
              color: ratingStarUncheckedHoverSelectedColor
            }
          }
        }
      }
    }, disabled && {
      cursor: 'default'
    }],
    ratingStarIsSmall: [classNames.ratingStarIsSmall, {
      fontSize: ratingSmallIconSize + 'px',
      lineHeight: ratingSmallIconSize + 'px',
      height: ratingSmallIconSize + 'px'
    }],
    ratingStarIsLarge: [classNames.ratingStartIsLarge, {
      fontSize: ratingLargeIconSize + 'px',
      lineHeight: ratingLargeIconSize + 'px',
      height: ratingLargeIconSize + 'px'
    }],
    labelText: [classNames.labelText, hiddenContentStyle],
    ratingFocusZone: [getFocusStyle(theme), classNames.ratingFocusZone, {
      display: 'inline-block'
    }]
  };
}

var Rating$1 = styled(__vue_component__$t, getStyles$s, undefined);

var getClassNames$k = classNamesFunction();

var SearchBox =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(SearchBox, _BaseComponent);

  function SearchBox() {
    var _this;

    _classCallCheck(this, SearchBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchBox).apply(this, arguments));
    _this.isActive = false;
    _this.internalValue = _this.value;
    return _this;
  }

  _createClass(SearchBox, [{
    key: "onPropValueChanged",
    value: function onPropValueChanged(newValue) {
      this.internalValue = newValue;
    }
  }, {
    key: "onValueChanged",
    value: function onValueChanged(value) {
      this.$emit('input', value);
    }
  }, {
    key: "submit",
    value: function submit() {
      this.$emit('submit', this.internalValue);
    }
  }, {
    key: "clearInput",
    value: function clearInput() {
      this.internalValue = '';
      this.$refs.input.focus();
    }
  }, {
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          underlined = this.underlined,
          disabled = this.disabled,
          isActive = this.isActive,
          className = this.className,
          disableAnimation = this.disableAnimation,
          internalValue = this.internalValue;
      return getClassNames$k(this.styles, {
        theme: theme,
        className: className,
        underlined: underlined,
        hasFocus: isActive,
        disabled: disabled,
        hasInput: internalValue == null ? false : internalValue.length > 0,
        disableAnimation: disableAnimation
      });
    }
  }]);

  return SearchBox;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], SearchBox.prototype, "underlined", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], SearchBox.prototype, "defaultValue", void 0);

__decorate([Prop({
  type: String,
  default: 'Search'
}), __metadata("design:type", String)], SearchBox.prototype, "placeholder", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], SearchBox.prototype, "value", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], SearchBox.prototype, "disableAnimation", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], SearchBox.prototype, "disabled", void 0);

__decorate([Prop({
  type: String,
  default: 'Search'
}), __metadata("design:type", String)], SearchBox.prototype, "iconName", void 0);

__decorate([Watch('value'), __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], SearchBox.prototype, "onPropValueChanged", null);

__decorate([Watch('internalValue'), __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], SearchBox.prototype, "onValueChanged", null);

SearchBox = __decorate([Component({
  components: {
    Icon: Icon$1,
    IconButton: __vue_component__$7
  },
  inheritAttrs: false
})], SearchBox);
var script$u = SearchBox;

var __vue_script__$u = script$u;
/* template */

var __vue_render__$r = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.iconContainer,
    attrs: {
      "role": "search"
    }
  }, [_c('Icon', {
    class: _vm.classNames.icon,
    attrs: {
      "icon-name": _vm.iconName
    }
  })], 1), _vm._v(" "), _c('input', _vm._b({
    ref: "input",
    class: _vm.classNames.field,
    attrs: {
      "disabled": _vm.disabled,
      "area-label": _vm.placeholder,
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm.internalValue
    },
    on: {
      "input": function input($event) {
        _vm.internalValue = $event.target.value;
      },
      "focus": function focus($event) {
        _vm.isActive = true;
      },
      "blur": function blur($event) {
        _vm.isActive = false;
      },
      "keydown": [function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.submit($event);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }

        return _vm.clearInput($event);
      }]
    }
  }, 'input', _vm.$attrs, false)), _vm._v(" "), _vm.internalValue ? _c('div', {
    class: _vm.classNames.clearButton
  }, [_c('IconButton', {
    attrs: {
      "icon-name": "Clear"
    },
    nativeOn: {
      "click": function click($event) {
        return _vm.clearInput($event);
      }
    }
  })], 1) : _vm._e()]);
};

var __vue_staticRenderFns__$r = [];
/* style */

var __vue_inject_styles__$u = undefined;
/* scoped */

var __vue_scope_id__$u = undefined;
/* module identifier */

var __vue_module_identifier__$u = undefined;
/* functional template */

var __vue_is_functional_template__$u = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$u = __vue_normalize__({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, false, undefined, undefined, undefined);

var GlobalClassNames$g = {
  root: 'ms-SearchBox',
  iconContainer: 'ms-SearchBox-iconContainer',
  icon: 'ms-SearchBox-icon',
  clearButton: 'ms-SearchBox-clearButton',
  field: 'ms-SearchBox-field'
};
function getStyles$t(props) {
  var _selectors2, _selectors3;

  var theme = props.theme,
      underlined = props.underlined,
      disabled = props.disabled,
      hasFocus = props.hasFocus,
      className = props.className,
      hasInput = props.hasInput,
      disableAnimation = props.disableAnimation;
  var palette = theme.palette,
      fonts = theme.fonts,
      semanticColors = theme.semanticColors,
      effects = theme.effects;
  var classNames = getGlobalClassNames(GlobalClassNames$g, theme); // placeholder style constants

  var placeholderStyles = {
    color: semanticColors.inputPlaceholderText,
    opacity: 1
  };
  var inputIconAlt = palette.neutralSecondary;
  var inputIconAltHovered = palette.neutralPrimary;
  var inputBorderDisabled = palette.neutralLighter;
  var inputBackgroundHovered = palette.neutralLighter;
  var inputBackgroundDisabled = palette.neutralLighter;
  return {
    root: [classNames.root, fonts.medium, normalize, {
      color: semanticColors.inputText,
      backgroundColor: semanticColors.inputBackground,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'stretch',
      // The 1px top and bottom padding ensure the input field does not overlap the border
      padding: '1px 0 1px 4px',
      borderRadius: effects.roundedCorner2,
      border: "1px solid ".concat(semanticColors.inputBorder),
      height: 32,
      selectors: (_selectors2 = {}, _defineProperty(_selectors2, HighContrastSelector, {
        border: '1px solid WindowText'
      }), _defineProperty(_selectors2, ':hover', {
        borderColor: semanticColors.inputBorderHovered,
        selectors: _defineProperty({}, HighContrastSelector, {
          borderColor: 'Highlight'
        })
      }), _defineProperty(_selectors2, ":hover .".concat(classNames.iconContainer), {
        color: semanticColors.inputIconHovered
      }), _selectors2)
    }, !hasFocus && hasInput && {
      selectors: (_selectors3 = {}, _defineProperty(_selectors3, ":hover .".concat(classNames.iconContainer), {
        width: 4
      }), _defineProperty(_selectors3, ":hover .".concat(classNames.icon), {
        opacity: 0
      }), _selectors3)
    }, hasFocus && ['is-active', {
      borderColor: semanticColors.inputFocusBorderAlt,
      selectors: _defineProperty({
        ':hover': {
          borderColor: semanticColors.inputFocusBorderAlt
        }
      }, HighContrastSelector, {
        borderColor: 'Highlight'
      })
    }], disabled && ['is-disabled', {
      borderColor: inputBorderDisabled,
      backgroundColor: inputBackgroundDisabled,
      pointerEvents: 'none',
      cursor: 'default',
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'GrayText'
      })
    }], underlined && ['is-underlined', {
      borderWidth: '0 0 1px 0',
      borderRadius: 0,
      // Underlined SearchBox has a larger padding left to vertically align with the waffle in product
      padding: '1px 0 1px 8px'
    }], underlined && disabled && {
      backgroundColor: 'transparent'
    }, hasInput && 'can-clear', className],
    iconContainer: [classNames.iconContainer, {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flexShrink: 0,
      fontSize: 16,
      width: 32,
      textAlign: 'center',
      color: semanticColors.inputIcon,
      cursor: 'text'
    }, hasFocus && {
      width: 4
    }, disabled && {
      color: semanticColors.inputIconDisabled
    }, !disableAnimation && {
      transition: "width ".concat(AnimationVariables.durationValue1)
    }],
    icon: [classNames.icon, {
      opacity: 1
    }, hasFocus && {
      opacity: 0
    }, !disableAnimation && {
      transition: "opacity ".concat(AnimationVariables.durationValue1, " 0s")
    }],
    clearButton: [classNames.clearButton, {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      cursor: 'pointer',
      flexBasis: '32px',
      flexShrink: 0,
      padding: 0,
      margin: '-1px 0px',
      selectors: {
        '&:hover .ms-Button': {
          backgroundColor: inputBackgroundHovered
        },
        '&:hover .ms-Button-icon': {
          color: inputIconAltHovered
        },
        '.ms-Button': {
          borderRadius: getRTL() ? '1px 0 0 1px' : '0 1px 1px 0'
        },
        '.ms-Button-icon': {
          color: inputIconAlt
        }
      }
    }],
    field: [classNames.field, normalize, getPlaceholderStyles(placeholderStyles), {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      fontWeight: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      color: semanticColors.inputText,
      flex: '1 1 0px',
      // The default implicit value of 'auto' prevents the input from shrinking. Setting min-width to
      // 0px allows the input element to shrink to fit the container.
      minWidth: '0px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      // This padding forces the text placement to round up.
      paddingBottom: 0.5,
      // This removes the IE specific clear button in the input since we implimented our own
      selectors: {
        '::-ms-clear': {
          display: 'none'
        }
      }
    }, disabled && {
      color: semanticColors.disabledText
    }]
  };
}

var SearchBox$1 = styled(__vue_component__$u, getStyles$t, undefined);

var getClassNames$l = classNamesFunction();

var Separator =
/*#__PURE__*/
function (_StatelessComponent) {
  _inherits(Separator, _StatelessComponent);

  function Separator() {
    _classCallCheck(this, Separator);

    return _possibleConstructorReturn(this, _getPrototypeOf(Separator).apply(this, arguments));
  }

  _createClass(Separator, [{
    key: "render",
    value: function render(h, context) {
      var classNames = getClassNames$l(context.props.styles, {
        theme: context.props.theme,
        className: context.data.attrs ? context.data.attrs.class : '',
        alignContent: context.props.alignContent,
        vertical: context.props.vertical
      });
      return h("div", {
        "class": classNames.root
      }, [h("div", {
        "class": classNames.content
      }, [context.children])]);
    }
  }]);

  return Separator;
}(StatelessComponent$1);

__decorate([Prop({
  type: String,
  default: 'center'
}), __metadata("design:type", String)], Separator.prototype, "alignContent", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Separator.prototype, "vertical", void 0);

Separator = __decorate([Component], Separator);
var script$v = Separator;

/* script */
var __vue_script__$v = script$v;
/* template */

/* style */

var __vue_inject_styles__$v = undefined;
/* scoped */

var __vue_scope_id__$v = undefined;
/* module identifier */

var __vue_module_identifier__$v = undefined;
/* functional template */

var __vue_is_functional_template__$v = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$v = __vue_normalize__({}, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, false, undefined, undefined, undefined);

var getStyles$u = function getStyles(props) {
  var theme = props.theme,
      alignContent = props.alignContent,
      vertical = props.vertical,
      className = props.className;
  var alignStart = alignContent === 'start';
  var alignCenter = alignContent === 'center';
  var alignEnd = alignContent === 'end';
  return {
    root: [// theme.fonts.medium,
    {
      position: 'relative'
    }, alignContent && {
      textAlign: alignContent
    }, !alignContent && {
      textAlign: 'center'
    }, vertical && (alignCenter || !alignContent) && {
      verticalAlign: 'middle'
    }, vertical && alignStart && {
      verticalAlign: 'top'
    }, vertical && alignEnd && {
      verticalAlign: 'bottom'
    }, vertical && {
      padding: '0 4px',
      height: 'inherit',
      display: 'table-cell',
      zIndex: 1,
      selectors: {
        ':after': {
          backgroundColor: theme.palette.neutralLighter,
          width: '1px',
          content: '""',
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '50%',
          right: '0',
          zIndex: -1
        }
      }
    }, !vertical && {
      padding: '4px 0',
      selectors: {
        ':before': {
          backgroundColor: theme.palette.neutralLighter,
          height: '1px',
          content: '""',
          display: 'block',
          position: 'absolute',
          top: '50%',
          bottom: '0',
          left: '0',
          right: '0'
        }
      }
    }, className],
    content: [{
      position: 'relative',
      display: 'inline-block',
      padding: '0 12px',
      color: theme.semanticColors.bodyText,
      background: theme.semanticColors.bodyBackground
    }, vertical && {
      padding: '12px 0'
    }]
  };
};

var Separator$1 = styled(__vue_component__$v, getStyles$u, undefined);

var getClassNames$m = classNamesFunction();
var ONKEYDOWN_TIMEOUT_DURATION = 1000;

var Slider =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Slider, _BaseComponent);

  function Slider() {
    var _this;

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).apply(this, arguments));
    _this.internalValue = _this.value || _this.defaultValue || _this.min;
    _this.renderedValue = _this.value || _this.defaultValue || _this.min;
    _this.onKeyDownTimer = -1;
    return _this;
  }

  _createClass(Slider, [{
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (this.disabled) return;

      if (event.type === 'mousedown') {
        window.addEventListener('mousemove', this.onMove, true);
        window.addEventListener('mouseup', this.onMouseUp, true);
      } else if (event.type === 'touchstart') {
        window.addEventListener('touchmove', this.onMove, true);
        window.addEventListener('touchend', this.onMouseUp, true);
      }

      this.onMove(event);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(event) {
      if (this.disabled) return;
      this.renderedValue = this.internalValue;
      window.removeEventListener('mousemove', this.onMove, true);
      window.removeEventListener('mouseup', this.onMouseUp, true);
      window.removeEventListener('touchmove', this.onMove, true);
      window.removeEventListener('touchend', this.onMouseUp, true);
    }
  }, {
    key: "onMove",
    value: function onMove(event) {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        var max = _this2.max,
            min = _this2.min,
            step = _this2.step,
            vertical = _this2.vertical;
        var steps = (max - min) / step;

        var sliderPositionRect = _this2.$refs.sliderLine.getBoundingClientRect();

        var sliderLength = !vertical ? sliderPositionRect.width : sliderPositionRect.height;
        var stepLength = sliderLength / steps;
        var currentSteps;
        var distance;

        if (!vertical) {
          var left = _this2.getPosition(event, vertical);

          distance = left - sliderPositionRect.left;
          currentSteps = distance / stepLength;
        } else {
          var bottom = _this2.getPosition(event, vertical);

          distance = sliderPositionRect.bottom - bottom;
          currentSteps = distance / stepLength;
        }

        var internalValue;
        var renderedValue; // The value shouldn't be bigger than max or be smaller than min.

        if (currentSteps > Math.floor(steps)) {
          renderedValue = internalValue = max;
        } else if (currentSteps < 0) {
          renderedValue = internalValue = min;
        } else {
          renderedValue = min + step * currentSteps;
          internalValue = min + step * Math.round(currentSteps);
        }

        _this2.updateValue(internalValue, renderedValue);
      });
    }
  }, {
    key: "getPosition",
    value: function getPosition(event, vertical) {
      var currentPosition;

      switch (event.type) {
        case 'mousedown':
        case 'mousemove':
          currentPosition = !vertical ? event.clientX : event.clientY;
          break;

        case 'touchstart':
        case 'touchmove':
          currentPosition = !vertical ? event.touches[0].clientX : event.touches[0].clientY;
          break;
      }

      return currentPosition;
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, renderedValue) {
      var step = this.step,
          snapToStep = this.snapToStep;
      var numDec = 0;

      if (isFinite(step)) {
        while (Math.round(step * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step) {
          numDec++;
        }
      } // Make sure value has correct number of decimal places based on number of decimals in step


      var roundedValue = parseFloat(value.toFixed(numDec));
      var valueChanged = roundedValue !== this.internalValue;

      if (snapToStep) {
        renderedValue = roundedValue;
      }

      this.internalValue = roundedValue;
      this.renderedValue = renderedValue;
      this.$emit('input', roundedValue);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var value = this.internalValue;
      var max = this.max,
          min = this.min,
          step = this.step;
      var diff = 0;

      switch (event.which) {
        case KeyCodes.left:
        case KeyCodes.down:
          diff = -step;
          this.clearOnKeyDownTimer();
          this.setOnKeyDownTimer(event);
          break;

        case KeyCodes.right:
        case KeyCodes.up:
          diff = step;
          this.clearOnKeyDownTimer();
          this.setOnKeyDownTimer(event);
          break;

        case KeyCodes.home:
          value = min;
          break;

        case KeyCodes.end:
          value = max;
          break;

        default:
          return;
      }

      var newValue = Math.min(max, Math.max(min, value + diff));
      this.updateValue(newValue, newValue);
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "clearOnKeyDownTimer",
    value: function clearOnKeyDownTimer() {
      clearTimeout(this.onKeyDownTimer);
    }
  }, {
    key: "setOnKeyDownTimer",
    value: function setOnKeyDownTimer(event) {
      this.onKeyDownTimer = setTimeout(function () {}, ONKEYDOWN_TIMEOUT_DURATION);
    }
  }, {
    key: "classNames",
    get: function get() {
      var className = this.className,
          disabled = this.disabled,
          vertical = this.vertical,
          renderedValue = this.renderedValue,
          internalValue = this.internalValue,
          showValue = this.showValue,
          theme = this.theme;
      return getClassNames$m(this.styles, {
        className: className,
        disabled: disabled,
        vertical: vertical,
        showTransitions: renderedValue === internalValue,
        showValue: showValue,
        theme: theme
      });
    }
  }, {
    key: "thumbOffsetPercent",
    get: function get() {
      var min = this.min,
          max = this.max,
          renderedValue = this.renderedValue;
      return min === max ? 0 : (renderedValue - min) / (max - min) * 100;
    }
  }, {
    key: "zeroOffsetPercent",
    get: function get() {
      var min = this.min,
          max = this.max;
      return min >= 0 ? 0 : -min / (max - min) * 100;
    }
  }, {
    key: "lengthString",
    get: function get() {
      return this.vertical ? 'height' : 'width';
    }
  }]);

  return Slider;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Slider.prototype, "label", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Slider.prototype, "disabled", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Slider.prototype, "vertical", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Slider.prototype, "snapToStep", void 0);

__decorate([Prop({
  type: Number,
  default: 0
}), __metadata("design:type", Number)], Slider.prototype, "min", void 0);

__decorate([Prop({
  type: Number,
  default: 10
}), __metadata("design:type", Number)], Slider.prototype, "max", void 0);

__decorate([Prop({
  type: Number,
  default: 1
}), __metadata("design:type", Number)], Slider.prototype, "step", void 0);

__decorate([Prop({
  type: Number,
  default: null
}), __metadata("design:type", Number)], Slider.prototype, "value", void 0);

__decorate([Prop({
  type: Number,
  default: null
}), __metadata("design:type", Number)], Slider.prototype, "defaultValue", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Slider.prototype, "showValue", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Slider.prototype, "originFromZero", void 0);

Slider = __decorate([Component({
  components: {
    Label: Label$1
  }
})], Slider);
var script$w = Slider;

/* script */
var __vue_script__$w = script$w;
/* template */

var __vue_render__$s = function __vue_render__() {
  var _obj, _obj$1, _obj$2, _obj$3, _obj$4, _obj$5, _obj$6;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('Label', {
    class: _vm.classNames.titleLabel,
    domProps: {
      "textContent": _vm._s(_vm.label)
    }
  }), _vm._v(" "), _c('div', {
    class: _vm.classNames.container
  }, [_c('div', {
    class: _vm.classNames.slideBox,
    attrs: {
      "tabindex": _vm.disabled ? void 0 : 0
    },
    on: {
      "mousedown": _vm.onMouseDown,
      "keydown": _vm.onKeyDown
    }
  }, [_c('div', {
    ref: "sliderLine",
    class: _vm.classNames.line
  }, [_vm.originFromZero ? _c('span', {
    class: _vm.classNames.zeroTick,
    style: (_obj = {}, _obj[_vm.vertical ? 'bottom' : 'left'] = _vm.zeroOffsetPercent + "%", _obj)
  }) : _vm._e(), _vm._v(" "), _c('span', {
    class: _vm.classNames.thumb,
    style: (_obj$1 = {}, _obj$1[_vm.vertical ? 'bottom' : 'left'] = _vm.thumbOffsetPercent + "%", _obj$1)
  }), _vm._v(" "), _vm.originFromZero ? [_c('span', {
    class: _vm.css(_vm.classNames.lineContainer, _vm.classNames.inactiveSection),
    style: (_obj$2 = {}, _obj$2[_vm.lengthString] = Math.min(_vm.thumbOffsetPercent, _vm.zeroOffsetPercent) + "%", _obj$2)
  }), _vm._v(" "), _c('span', {
    class: _vm.css(_vm.classNames.lineContainer, _vm.classNames.activeSection),
    style: (_obj$3 = {}, _obj$3[_vm.lengthString] = Math.abs(_vm.zeroOffsetPercent - _vm.thumbOffsetPercent) + "%", _obj$3)
  }), _vm._v(" "), _c('span', {
    class: _vm.css(_vm.classNames.lineContainer, _vm.classNames.inactiveSection),
    style: (_obj$4 = {}, _obj$4[_vm.lengthString] = Math.min(100 - _vm.thumbOffsetPercent, 100 - _vm.zeroOffsetPercent) + "%", _obj$4)
  })] : [_c('span', {
    class: _vm.css(_vm.classNames.lineContainer, _vm.classNames.activeSection),
    style: (_obj$5 = {}, _obj$5[_vm.lengthString] = _vm.thumbOffsetPercent + "%", _obj$5)
  }), _vm._v(" "), _c('span', {
    class: _vm.css(_vm.classNames.lineContainer, _vm.classNames.inactiveSection),
    style: (_obj$6 = {}, _obj$6[_vm.lengthString] = 100 - _vm.thumbOffsetPercent + "%", _obj$6)
  })]], 2)]), _vm._v(" "), _c('Label', {
    class: _vm.classNames.valueLabel
  }, [_vm._t("value", [_vm._v("\n        " + _vm._s(_vm.internalValue) + "\n      ")], {
    "value": _vm.internalValue
  })], 2)], 1)], 1);
};

var __vue_staticRenderFns__$s = [];
/* style */

var __vue_inject_styles__$w = undefined;
/* scoped */

var __vue_scope_id__$w = undefined;
/* module identifier */

var __vue_module_identifier__$w = undefined;
/* functional template */

var __vue_is_functional_template__$w = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$w = __vue_normalize__({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, false, undefined, undefined, undefined);

var GlobalClassNames$h = {
  root: 'ms-Slider',
  enabled: 'ms-Slider-enabled',
  disabled: 'ms-Slider-disabled',
  row: 'ms-Slider-row',
  column: 'ms-Slider-column',
  container: 'ms-Slider-container',
  slideBox: 'ms-Slider-slideBox',
  line: 'ms-Slider-line',
  thumb: 'ms-Slider-thumb',
  activeSection: 'ms-Slider-active',
  inactiveSection: 'ms-Slider-inactive',
  valueLabel: 'ms-Slider-value',
  showValue: 'ms-Slider-showValue',
  showTransitions: 'ms-Slider-showTransitions',
  zeroTick: 'ms-Slider-zeroTick'
};
var getStyles$v = function getStyles(props) {
  var _selectors6;

  var className = props.className,
      titleLabelClassName = props.titleLabelClassName,
      theme = props.theme,
      vertical = props.vertical,
      disabled = props.disabled,
      showTransitions = props.showTransitions,
      showValue = props.showValue;
  var semanticColors = theme.semanticColors;
  var classNames = getGlobalClassNames(GlobalClassNames$h, theme);
  /** Tokens:
   *   The word "active" in the token refers to the selected section of the slider
   *   The word "inactive" in the token refers to the unselected section of the slider */

  var pressedActiveSectionColor = semanticColors.inputBackgroundCheckedHovered;
  var hoveredActiveSectionColor = semanticColors.inputBackgroundChecked;
  var hoveredPressedinactiveSectionColor = semanticColors.inputPlaceholderBackgroundChecked;
  var restActiveSectionColor = semanticColors.smallInputBorder;
  var restInactiveSectionColor = semanticColors.disabledBorder;
  var disabledActiveSectionColor = semanticColors.disabledText;
  var disabledInactiveSectionColor = semanticColors.disabledBackground;
  var thumbBackgroundColor = semanticColors.inputBackground;
  var thumbBorderColor = semanticColors.smallInputBorder;
  var thumbDisabledBorderColor = semanticColors.disabledBorder;
  var slideBoxActiveSectionStyles = !disabled && {
    backgroundColor: pressedActiveSectionColor,
    selectors: _defineProperty({}, HighContrastSelector, {
      backgroundColor: 'Highlight'
    })
  };
  var slideBoxInactiveSectionStyles = !disabled && {
    backgroundColor: hoveredPressedinactiveSectionColor,
    selectors: _defineProperty({}, HighContrastSelector, {
      borderColor: 'Highlight'
    })
  };
  var slideHoverSectionStyles = !disabled && {
    backgroundColor: hoveredActiveSectionColor,
    selectors: _defineProperty({}, HighContrastSelector, {
      backgroundColor: 'Highlight'
    })
  };
  var slideBoxActiveThumbStyles = !disabled && {
    border: "2px solid ".concat(pressedActiveSectionColor),
    selectors: _defineProperty({}, HighContrastSelector, {
      borderColor: 'Highlight'
    })
  };
  var slideBoxActiveZeroTickStyles = !props.disabled && {
    backgroundColor: semanticColors.inputPlaceholderBackgroundChecked,
    selectors: _defineProperty({}, HighContrastSelector, {
      backgroundColor: 'Highlight'
    })
  };
  return {
    root: [classNames.root, // theme.fonts.medium,
    {
      userSelect: 'none'
    }, vertical && {
      marginRight: 8
    }].concat([!disabled ? classNames.enabled : undefined], [disabled ? classNames.disabled : undefined], [!vertical ? classNames.row : undefined], [vertical ? classNames.column : undefined], [className]),
    titleLabel: [{
      padding: 0
    }, titleLabelClassName],
    container: [classNames.container, {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center'
    }, vertical && {
      flexDirection: 'column',
      height: '100%',
      textAlign: 'center',
      margin: '8px 0'
    }],
    slideBox: [classNames.slideBox, getFocusStyle(theme), {
      background: 'transparent',
      border: 'none',
      flexGrow: 1,
      lineHeight: 28,
      display: 'flex',
      alignItems: 'center',
      selectors: (_selectors6 = {}, _defineProperty(_selectors6, ":active .".concat(classNames.activeSection), slideBoxActiveSectionStyles), _defineProperty(_selectors6, ":hover .".concat(classNames.activeSection), slideHoverSectionStyles), _defineProperty(_selectors6, ":active .".concat(classNames.inactiveSection), slideBoxInactiveSectionStyles), _defineProperty(_selectors6, ":hover .".concat(classNames.inactiveSection), slideBoxInactiveSectionStyles), _defineProperty(_selectors6, ":active .".concat(classNames.thumb), slideBoxActiveThumbStyles), _defineProperty(_selectors6, ":hover .".concat(classNames.thumb), slideBoxActiveThumbStyles), _defineProperty(_selectors6, ":active .".concat(classNames.zeroTick), slideBoxActiveZeroTickStyles), _defineProperty(_selectors6, ":hover .".concat(classNames.zeroTick), slideBoxActiveZeroTickStyles), _selectors6)
    }, vertical ? {
      height: '100%',
      width: 28,
      padding: '8px 0'
    } : {
      height: 28,
      width: 'auto',
      padding: '0 8px'
    }].concat([showValue ? classNames.showValue : undefined], [showTransitions ? classNames.showTransitions : undefined]),
    thumb: [classNames.thumb, {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: thumbBorderColor,
      borderRadius: 10,
      boxSizing: 'border-box',
      background: thumbBackgroundColor,
      display: 'block',
      width: 16,
      height: 16,
      position: 'absolute'
    }, vertical ? {
      left: -6,
      margin: '0 auto',
      transform: 'translateY(8px)'
    } : {
      top: -6,
      transform: getRTL() ? 'translateX(50%)' : 'translateX(-50%)'
    }, showTransitions && {
      transition: "left ".concat(AnimationVariables.durationValue3, " ").concat(AnimationVariables.easeFunction1)
    }, disabled && {
      borderColor: thumbDisabledBorderColor,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'GrayText'
      })
    }],
    line: [classNames.line, {
      display: 'flex',
      position: 'relative'
    }, vertical ? {
      height: '100%',
      width: 4,
      margin: '0 auto',
      flexDirection: 'column-reverse'
    } : {
      width: '100%'
    }],
    lineContainer: [{
      borderRadius: 4,
      boxSizing: 'border-box'
    }, vertical ? {
      width: 4,
      height: '100%'
    } : {
      height: 4,
      width: '100%'
    }],
    activeSection: [classNames.activeSection, {
      background: restActiveSectionColor,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'WindowText'
      })
    }, showTransitions && {
      transition: "width ".concat(AnimationVariables.durationValue3, " ").concat(AnimationVariables.easeFunction1)
    }, disabled && {
      background: disabledActiveSectionColor,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'GrayText',
        borderColor: 'GrayText'
      })
    }],
    inactiveSection: [classNames.inactiveSection, {
      background: restInactiveSectionColor,
      selectors: _defineProperty({}, HighContrastSelector, {
        border: '1px solid WindowText'
      })
    }, showTransitions && {
      transition: "width ".concat(AnimationVariables.durationValue3, " ").concat(AnimationVariables.easeFunction1)
    }, disabled && {
      background: disabledInactiveSectionColor,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'GrayText'
      })
    }],
    zeroTick: [classNames.zeroTick, {
      position: 'absolute',
      background: semanticColors.disabledBorder,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'WindowText'
      })
    }, props.disabled && {
      background: semanticColors.disabledBackground,
      selectors: _defineProperty({}, HighContrastSelector, {
        backgroundColor: 'GrayText'
      })
    }, props.vertical ? {
      width: '16px',
      height: '1px',
      transform: getRTL() ? 'translateX(6px)' : 'translateX(-6px)'
    } : {
      width: '1px',
      height: '16px',
      transform: 'translateY(-6px)'
    }],
    valueLabel: [classNames.valueLabel, {
      flexShrink: 1,
      width: 30,
      lineHeight: '1'
    }, vertical ? {
      margin: '0 auto',
      whiteSpace: 'nowrap',
      width: 40
    } : {
      margin: '0 8px',
      whiteSpace: 'nowrap',
      width: 40
    }]
  };
};

var Slider$1 = styled(__vue_component__$w, getStyles$v, undefined);

var getClassNames$n = classNamesFunction();

var Spinner =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Spinner, _BaseComponent);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, _getPrototypeOf(Spinner).apply(this, arguments));
  }

  _createClass(Spinner, [{
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          size = this.size,
          labelPosition = this.labelPosition;
      return getClassNames$n(this.styles, {
        theme: theme,
        size: size,
        className: className,
        labelPosition: labelPosition
      });
    }
  }]);

  return Spinner;
}(BaseComponent$1);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Spinner.prototype, "label", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Spinner.prototype, "labelPosition", void 0);

__decorate([Prop({
  type: Number,
  default: 20
}), __metadata("design:type", Number)], Spinner.prototype, "size", void 0);

Spinner = __decorate([Component], Spinner);
var script$x = Spinner;

/* script */
var __vue_script__$x = script$x;
/* template */

var __vue_render__$t = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.circle
  }), _vm._v(" "), _vm.$slots.default || _vm.label ? _c('div', {
    class: _vm.classNames.label
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$t = [];
/* style */

var __vue_inject_styles__$x = undefined;
/* scoped */

var __vue_scope_id__$x = undefined;
/* module identifier */

var __vue_module_identifier__$x = undefined;
/* functional template */

var __vue_is_functional_template__$x = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$x = __vue_normalize__({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, false, undefined, undefined, undefined);

var GlobalClassNames$i = {
  root: 'ms-Spinner',
  circle: 'ms-Spinner-circle',
  label: 'ms-Spinner-label'
};
var spinAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
});
var getStyles$w = function getStyles(props) {
  var theme = props.theme,
      size = props.size,
      className = props.className,
      labelPosition = props.labelPosition;
  var palette = theme.palette;
  var classNames = getGlobalClassNames(GlobalClassNames$i, theme);
  return {
    root: [classNames.root, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }, labelPosition === 'top' && {
      flexDirection: 'column-reverse'
    }, labelPosition === 'right' && {
      flexDirection: 'row'
    }, labelPosition === 'left' && {
      flexDirection: 'row-reverse'
    }, className],
    circle: [classNames.circle, {
      boxSizing: 'border-box',
      borderRadius: '50%',
      border: '1.5px solid ' + palette.themeLight,
      borderTopColor: palette.themePrimary,
      animationName: spinAnimation,
      animationDuration: '1.3s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(.53,.21,.29,.67)',
      selectors: _defineProperty({}, HighContrastSelector, {
        borderTopColor: 'Highlight'
      })
    }, {
      width: size,
      height: size
    }],
    label: [classNames.label, // theme.fonts.small,
    {
      color: palette.themePrimary,
      margin: '8px 0 0',
      textAlign: 'center'
    }, labelPosition === 'top' && {
      margin: '0 0 8px'
    }, labelPosition === 'right' && {
      margin: '0 0 0 8px'
    }, labelPosition === 'left' && {
      margin: '0 8px 0 0'
    }],
    screenReaderText: hiddenContentStyle
  };
};

var Spinner$1 = styled(__vue_component__$x, getStyles$w, undefined);

var getClassNames$o = classNamesFunction();

var Text =
/*#__PURE__*/
function (_StatelessComponent) {
  _inherits(Text, _StatelessComponent);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, _getPrototypeOf(Text).apply(this, arguments));
  }

  _createClass(Text, [{
    key: "render",
    value: function render(h, context) {
      var _context$props = context.props,
          theme = _context$props.theme,
          styles = _context$props.styles,
          block = _context$props.block,
          nowrap = _context$props.nowrap,
          variant = _context$props.variant;
      var classNames = getClassNames$o(styles, {
        theme: theme,
        block: block,
        nowrap: nowrap,
        variant: variant
      });
      return h("span", {
        "class": classNames.root
      }, [context.children]);
    }
  }]);

  return Text;
}(StatelessComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Text.prototype, "nowrap", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Text.prototype, "block", void 0);

__decorate([Prop({
  type: String,
  default: 'medium'
}), __metadata("design:type", String)], Text.prototype, "variant", void 0);

Text = __decorate([Component], Text);
var TextBase = Text;

var getStyles$x = function getStyles(props) {
  var theme = props.theme,
      as = props.as,
      className = props.className,
      block = props.block,
      nowrap = props.nowrap,
      variant = props.variant,
      fontSize = props.fontSize;
  var fonts = theme.fonts;
  var variantObject = fonts[variant || 'medium'];
  return {
    root: [theme.fonts.medium, {
      display: block || nowrap ? as === 'td' ? 'table-cell' : 'block' : 'inline',
      fontFamily: variantObject && variantObject.fontFamily || 'inherit',
      fontSize: fontSize || variantObject && variantObject.fontSize || 'inherit',
      fontWeight: variantObject && variantObject.fontWeight || 'inherit',
      color: variantObject && variantObject.color || 'inherit',
      mozOsxFontSmoothing: variantObject && variantObject.MozOsxFontSmoothing,
      webkitFontSmoothing: variantObject && variantObject.WebkitFontSmoothing
    }, nowrap && {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }, className]
  };
};

var Text$1 = styled(TextBase, getStyles$x, undefined);

var getClassNames$p = classNamesFunction();

var TextField =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(TextField, _BaseComponent);

  function TextField() {
    var _this;

    _classCallCheck(this, TextField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextField).apply(this, arguments));
    _this.isActive = false;
    _this.internalValue = _this.value;
    return _this;
  }

  _createClass(TextField, [{
    key: "mounted",
    value: function mounted() {
      this.adjustInputHeight();
    }
  }, {
    key: "updated",
    value: function updated() {
      this.adjustInputHeight();
    }
  }, {
    key: "onPropValueChanged",
    value: function onPropValueChanged(newValue) {
      this.internalValue = newValue;
    }
  }, {
    key: "onValueChanged",
    value: function onValueChanged(value) {
      this.$emit('input', value);
    }
  }, {
    key: "onMultilineChanged",
    value: function () {
      var _onMultilineChanged = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(newValue, oldValue) {
        var textElement, start, end;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                textElement = this.$refs.textElement;
                start = textElement.selectionStart || 0;
                end = textElement.selectionEnd || 0;

                if (!(newValue !== oldValue && this.isActive)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return this.$nextTick();

              case 6:
                this.$refs.textElement.focus();
                this.$refs.textElement.setSelectionRange(start, end);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onMultilineChanged(_x, _x2) {
        return _onMultilineChanged.apply(this, arguments);
      }

      return onMultilineChanged;
    }()
  }, {
    key: "adjustInputHeight",
    value: function adjustInputHeight() {
      if (this.$refs.textElement && this.autoAdjustHeight && this.multiline) {
        var textField = this.$refs.textElement;
        textField.style.height = '';
        textField.style.height = textField.scrollHeight + 'px';
      }
    }
  }, {
    key: "onFocus",
    value: function () {
      var _onFocus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.isActive = true;
                this.$refs.textElement.setSelectionRange(this.internalValue.length, this.internalValue.length);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onFocus() {
        return _onFocus.apply(this, arguments);
      }

      return onFocus;
    }()
  }, {
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          disabled = this.disabled,
          focused = this.isActive,
          required = this.required,
          multiline = this.multiline,
          label = this.label,
          borderless = this.borderless,
          underlined = this.underlined,
          resizable = this.resizable,
          autoAdjustHeight = this.autoAdjustHeight;
      return getClassNames$p(this.styles, {
        theme: theme,
        className: className,
        disabled: disabled,
        focused: focused,
        required: required,
        multiline: multiline,
        hasLabel: !!label,
        borderless: borderless,
        underlined: underlined,
        hasIcon: false,
        resizable: resizable !== false,
        hasErrorMessage: !!this.errorMessage,
        inputClassName: '',
        autoAdjustHeight: autoAdjustHeight
      });
    }
  }]);

  return TextField;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], TextField.prototype, "multiline", void 0);

__decorate([Prop({
  type: Boolean,
  default: null
}), __metadata("design:type", Boolean)], TextField.prototype, "resizable", void 0);

__decorate([Prop({
  type: Boolean,
  default: null
}), __metadata("design:type", Boolean)], TextField.prototype, "autoAdjustHeight", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], TextField.prototype, "borderless", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], TextField.prototype, "disabled", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], TextField.prototype, "underlined", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], TextField.prototype, "readonly", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], TextField.prototype, "required", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], TextField.prototype, "label", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], TextField.prototype, "value", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], TextField.prototype, "errorMessage", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], TextField.prototype, "placeholder", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], TextField.prototype, "description", void 0);

__decorate([Watch('value'), __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], TextField.prototype, "onPropValueChanged", null);

__decorate([Watch('internalValue'), __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], TextField.prototype, "onValueChanged", null);

__decorate([Watch('multiline'), __metadata("design:type", Function), __metadata("design:paramtypes", [Boolean, Boolean]), __metadata("design:returntype", Promise)], TextField.prototype, "onMultilineChanged", null);

TextField = __decorate([Component({
  components: {
    Label: Label$1
  },
  inheritAttrs: false
})], TextField);
var script$y = TextField;

var __vue_script__$y = script$y;
/* template */

var __vue_render__$u = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.wrapper
  }, [_vm.label ? _c('Label', {
    class: _vm.classNames.label,
    attrs: {
      "styles": _vm.classNames.subComponentStyles.label,
      "for": "TextField" + _vm._uid,
      "required": _vm.required
    },
    domProps: {
      "textContent": _vm._s(_vm.label)
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.classNames.fieldGroup
  }, [_c(_vm.multiline ? 'textarea' : 'input', _vm._b({
    ref: "textElement",
    tag: "component",
    class: _vm.classNames.field,
    style: {
      resize: _vm.resizable === false && 'none'
    },
    attrs: {
      "id": _vm.$attrs.id || "TextField" + _vm._uid,
      "value": _vm.internalValue,
      "disabled": _vm.disabled,
      "readonly": _vm.readonly,
      "required": _vm.required,
      "placeholder": _vm.placeholder,
      "rows": _vm.$attrs.rows || 1,
      "type": "text",
      "autocomplete": "off"
    },
    domProps: {
      "textContent": _vm._s(_vm.internalValue)
    },
    on: {
      "focus": _vm.onFocus,
      "blur": function blur($event) {
        _vm.isActive = false;
      },
      "input": function input($event) {
        _vm.internalValue = $event.target.value;
      }
    }
  }, 'component', _vm.$attrs, false))], 1)], 1), _vm._v(" "), _vm.errorMessage ? _c('div', {
    class: _vm.classNames.description
  }, [_c('div', {
    attrs: {
      "role": "alert"
    }
  }, [_c('p', {
    class: _vm.classNames.errorMessage
  }, [_c('span', [_vm._v(_vm._s(_vm.errorMessage))])])])]) : _vm._e()]);
};

var __vue_staticRenderFns__$u = [];
/* style */

var __vue_inject_styles__$y = undefined;
/* scoped */

var __vue_scope_id__$y = undefined;
/* module identifier */

var __vue_module_identifier__$y = undefined;
/* functional template */

var __vue_is_functional_template__$y = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$y = __vue_normalize__({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, false, undefined, undefined, undefined);

var globalClassNames = {
  root: 'ms-TextField',
  description: 'ms-TextField-description',
  errorMessage: 'ms-TextField-errorMessage',
  field: 'ms-TextField-field',
  fieldGroup: 'ms-TextField-fieldGroup',
  prefix: 'ms-TextField-prefix',
  suffix: 'ms-TextField-suffix',
  wrapper: 'ms-TextField-wrapper',
  multiline: 'ms-TextField--multiline',
  borderless: 'ms-TextField--borderless',
  underlined: 'ms-TextField--underlined',
  unresizable: 'ms-TextField--unresizable',
  required: 'is-required',
  disabled: 'is-disabled',
  active: 'is-active'
};

function getLabelStyles(props) {
  var underlined = props.underlined,
      disabled = props.disabled,
      focused = props.focused,
      theme = props.theme;
  var palette = theme.palette,
      fonts = theme.fonts;
  return function () {
    return {
      root: [underlined && disabled && {
        color: palette.neutralTertiary
      }, underlined && {
        fontSize: fonts.medium.fontSize,
        marginRight: 8,
        paddingLeft: 12,
        paddingRight: 0,
        lineHeight: '22px',
        height: 32
      }, underlined && focused && {
        selectors: _defineProperty({}, HighContrastSelector, {
          height: 31
        })
      }]
    };
  };
}

function getStyles$y(props) {
  var theme = props.theme,
      className = props.className,
      disabled = props.disabled,
      focused = props.focused,
      required = props.required,
      multiline = props.multiline,
      hasLabel = props.hasLabel,
      borderless = props.borderless,
      underlined = props.underlined,
      hasIcon = props.hasIcon,
      resizable = props.resizable,
      hasErrorMessage = props.hasErrorMessage,
      inputClassName = props.inputClassName,
      autoAdjustHeight = props.autoAdjustHeight;
  var semanticColors = theme.semanticColors,
      effects = theme.effects,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(globalClassNames, theme);
  var fieldPrefixSuffix = {
    background: semanticColors.disabledBackground,
    color: !disabled ? semanticColors.inputPlaceholderText : semanticColors.disabledText,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    flexShrink: 0
  }; // placeholder style constants

  var placeholderStyles = [fonts.medium, {
    color: semanticColors.inputPlaceholderText,
    opacity: 1
  }];
  var disabledPlaceholderStyles = {
    color: semanticColors.disabledText
  };

  var getFocusBorder = function getFocusBorder(color) {
    var _after;

    var borderType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'border';
    return {
      borderColor: color,
      selectors: {
        ':after': (_after = {
          pointerEvents: 'none',
          content: "''",
          position: 'absolute',
          left: -1,
          top: -1,
          bottom: -1,
          right: -1
        }, _defineProperty(_after, borderType, '2px solid ' + color), _defineProperty(_after, "borderRadius", effects.roundedCorner2), _defineProperty(_after, "width", borderType === 'borderBottom' ? '100%' : undefined), _defineProperty(_after, "selectors", _defineProperty({}, HighContrastSelector, _defineProperty({}, borderType === 'border' ? 'borderColor' : 'borderBottomColor', 'Highlight'))), _after)
      }
    };
  };

  return {
    root: [classNames.root, fonts.medium, required && classNames.required, disabled && classNames.disabled, focused && classNames.active, multiline && classNames.multiline, borderless && classNames.borderless, underlined && classNames.underlined, normalize, {
      position: 'relative'
    }, className],
    wrapper: [classNames.wrapper, underlined && [{
      display: 'flex',
      borderBottom: "1px solid ".concat(!hasErrorMessage ? semanticColors.inputBorder : semanticColors.errorText),
      width: '100%'
    }, disabled && {
      borderBottomColor: semanticColors.disabledBackground,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'GrayText'
      })
    }, !disabled && {
      selectors: {
        ':hover': {
          borderBottomColor: !hasErrorMessage ? semanticColors.inputBorderHovered : semanticColors.errorText,
          selectors: _defineProperty({}, HighContrastSelector, {
            borderBottomColor: 'Highlight'
          })
        }
      }
    }, focused && getFocusBorder(!hasErrorMessage ? semanticColors.inputFocusBorderAlt : semanticColors.errorText, 'borderBottom')]],
    fieldGroup: [classNames.fieldGroup, normalize, {
      border: "1px solid ".concat(semanticColors.inputBorder),
      borderRadius: effects.roundedCorner2,
      background: semanticColors.inputBackground,
      cursor: 'text',
      height: 32,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      position: 'relative'
    }, multiline && {
      minHeight: '60px',
      height: 'auto',
      display: 'flex'
    }, !focused && !disabled && {
      selectors: {
        ':hover': {
          borderColor: semanticColors.inputBorderHovered,
          selectors: _defineProperty({}, HighContrastSelector, {
            borderColor: 'Highlight'
          })
        }
      }
    }, focused && !underlined && getFocusBorder(!hasErrorMessage ? semanticColors.inputFocusBorderAlt : semanticColors.errorText), disabled && {
      borderColor: semanticColors.disabledBackground,
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'GrayText'
      }),
      cursor: 'default'
    }, borderless && {
      border: 'none'
    }, borderless && focused && {
      border: 'none',
      selectors: {
        ':after': {
          border: 'none'
        }
      }
    }, underlined && {
      flex: '1 1 0px',
      border: 'none',
      textAlign: 'left'
    }, underlined && disabled && {
      backgroundColor: 'transparent'
    }, hasErrorMessage && !underlined && {
      borderColor: semanticColors.errorText,
      selectors: {
        '&:hover': {
          borderColor: semanticColors.errorText
        }
      }
    }, !hasLabel && required && {
      selectors: _defineProperty({
        ':before': {
          content: "'*'",
          color: semanticColors.errorText,
          position: 'absolute',
          top: -5,
          right: -10
        }
      }, HighContrastSelector, {
        selectors: {
          ':before': {
            right: -14
          }
        }
      })
    }],
    field: [fonts.medium, classNames.field, normalize, {
      borderRadius: 0,
      border: 'none',
      background: 'none',
      backgroundColor: 'transparent',
      color: semanticColors.inputText,
      padding: '0 8px',
      width: '100%',
      minWidth: 0,
      textOverflow: 'ellipsis',
      outline: 0,
      selectors: {
        '&:active, &:focus, &:hover': {
          outline: 0
        },
        '::-ms-clear': {
          display: 'none'
        }
      }
    }, getPlaceholderStyles(placeholderStyles), multiline && !resizable && [classNames.unresizable, {
      resize: 'none'
    }], multiline && {
      minHeight: 'inherit',
      lineHeight: 17,
      flexGrow: 1,
      paddingTop: 6,
      paddingBottom: 6,
      overflow: 'auto',
      width: '100%'
    }, multiline && autoAdjustHeight && {
      overflow: 'hidden'
    }, hasIcon && {
      paddingRight: 24
    }, multiline && hasIcon && {
      paddingRight: 40
    }, disabled && [{
      backgroundColor: semanticColors.disabledBackground,
      color: semanticColors.disabledText,
      borderColor: semanticColors.disabledBackground
    }, getPlaceholderStyles(disabledPlaceholderStyles)], underlined && {
      textAlign: 'left'
    }, focused && !borderless && {
      selectors: _defineProperty({}, HighContrastSelector, {
        paddingLeft: 11,
        paddingRight: 11
      })
    }, focused && multiline && !borderless && {
      selectors: _defineProperty({}, HighContrastSelector, {
        paddingTop: 4
      })
    }, inputClassName],
    icon: [multiline && {
      paddingRight: 24,
      alignItems: 'flex-end'
    }, {
      pointerEvents: 'none',
      position: 'absolute',
      bottom: 6,
      right: 8,
      top: 'auto',
      fontSize: IconFontSizes.medium,
      lineHeight: 18
    }, disabled && {
      color: semanticColors.disabledText
    }],
    description: [classNames.description, {
      color: semanticColors.bodySubtext,
      fontSize: fonts.xSmall.fontSize
    }],
    errorMessage: [classNames.errorMessage, AnimationClassNames.slideDownIn20, fonts.small, {
      color: semanticColors.errorText,
      margin: 0,
      paddingTop: 5,
      display: 'flex',
      alignItems: 'center'
    }],
    prefix: [classNames.prefix, fieldPrefixSuffix],
    suffix: [classNames.suffix, fieldPrefixSuffix],
    // @ts-ignore
    subComponentStyles: {
      label: getLabelStyles(props)
    }
  };
}

var TextField$1 = styled(__vue_component__$y, getStyles$y, undefined);

var getClassNames$q = classNamesFunction();

var Toggle =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Toggle, _BaseComponent);

  function Toggle() {
    var _this;

    _classCallCheck(this, Toggle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toggle).apply(this, arguments));
    _this.internalChecked = _this.defaultChecked || _this.checked;
    return _this;
  }

  _createClass(Toggle, [{
    key: "onCheckedChanged",
    value: function onCheckedChanged(checked) {
      this.$emit('input', checked);
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if (this.disabled) return;
      this.internalChecked = !this.internalChecked;
    }
  }, {
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          disabled = this.disabled,
          internalChecked = this.internalChecked,
          inlineLabel = this.inlineLabel,
          onText = this.onText,
          offText = this.offText;
      return getClassNames$q(this.styles, {
        theme: theme,
        className: className,
        disabled: disabled,
        checked: internalChecked,
        inlineLabel: inlineLabel,
        onOffMissing: !onText && !offText
      });
    }
  }]);

  return Toggle;
}(BaseComponent$1);

__decorate([Model('input', {
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Toggle.prototype, "checked", void 0);

__decorate([Prop({
  type: String,
  default: ''
}), __metadata("design:type", String)], Toggle.prototype, "label", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Toggle.prototype, "defaultChecked", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Toggle.prototype, "disabled", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Toggle.prototype, "inlineLabel", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Toggle.prototype, "onText", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Toggle.prototype, "offText", void 0);

__decorate([Watch('internalChecked'), __metadata("design:type", Function), __metadata("design:paramtypes", [Boolean]), __metadata("design:returntype", void 0)], Toggle.prototype, "onCheckedChanged", null);

Toggle = __decorate([Component({
  components: {
    Label: Label$1
  }
})], Toggle);
var script$z = Toggle;

/* script */
var __vue_script__$z = script$z;
/* template */

var __vue_render__$v = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root,
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("label", [_c('Label', {
    class: _vm.classNames.label,
    domProps: {
      "textContent": _vm._s(_vm.label)
    }
  })], {
    "checked": _vm.internalChecked,
    "disabled": _vm.disabled,
    "label": _vm.label
  }), _vm._v(" "), _c('div', {
    class: _vm.classNames.container
  }, [_c('button', {
    class: _vm.classNames.pill,
    attrs: {
      "id": "Toggle" + _vm._uid
    }
  }, [_c('div', {
    class: _vm.classNames.thumb
  })]), _vm._v(" "), _vm.internalChecked && _vm.onText || !_vm.internalChecked && _vm.offText ? _c('Label', {
    class: _vm.classNames.text,
    attrs: {
      "for": "Toggle" + _vm._uid
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.internalChecked ? _vm.onText : _vm.offText) + "\n    ")]) : _vm._e()], 1)], 2);
};

var __vue_staticRenderFns__$v = [];
/* style */

var __vue_inject_styles__$z = undefined;
/* scoped */

var __vue_scope_id__$z = undefined;
/* module identifier */

var __vue_module_identifier__$z = undefined;
/* functional template */

var __vue_is_functional_template__$z = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$z = __vue_normalize__({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, false, undefined, undefined, undefined);

var DEFAULT_PILL_WIDTH = 40;
var DEFAULT_PILL_HEIGHT = 20;
var DEFAULT_THUMB_SIZE = 12;
var getStyles$z = function getStyles(props) {
  var theme = props.theme,
      className = props.className,
      disabled = props.disabled,
      checked = props.checked,
      inlineLabel = props.inlineLabel,
      onOffMissing = props.onOffMissing;
  var semanticColors = theme.semanticColors,
      palette = theme.palette; // Tokens

  var pillUncheckedBackground = semanticColors.bodyBackground;
  var pillCheckedBackground = semanticColors.inputBackgroundChecked; // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBackgroundCheckedHovered

  var pillCheckedHoveredBackground = palette.themeDark;
  var thumbUncheckedHoveredBackground = palette.neutralDark;
  var pillCheckedDisabledBackground = semanticColors.disabledBodySubtext;
  var thumbBackground = semanticColors.smallInputBorder;
  var thumbCheckedBackground = semanticColors.inputForegroundChecked;
  var thumbDisabledBackground = semanticColors.disabledBodySubtext;
  var thumbCheckedDisabledBackground = semanticColors.disabledBackground;
  var pillBorderColor = semanticColors.smallInputBorder;
  var pillBorderHoveredColor = semanticColors.inputBorderHovered;
  var pillBorderDisabledColor = semanticColors.disabledBodySubtext;
  var textDisabledColor = semanticColors.disabledText;
  return {
    root: ['ms-Toggle', checked && 'is-checked', !disabled && 'is-enabled', disabled && 'is-disabled', theme.fonts.medium, {
      marginBottom: '8px'
    }, inlineLabel && {
      display: 'flex',
      alignItems: 'center'
    }, className],
    label: ['ms-Toggle-label', disabled && {
      color: textDisabledColor,
      selectors: _defineProperty({}, HighContrastSelector$1, {
        color: 'GrayText'
      })
    }, inlineLabel && !onOffMissing && {
      marginRight: 16
    }, onOffMissing && inlineLabel && {
      order: 1,
      marginLeft: 16
    }, inlineLabel && {
      wordBreak: 'break-all'
    }],
    container: ['ms-Toggle-innerContainer', {
      display: 'inline-flex',
      position: 'relative'
    }],
    pill: ['ms-Toggle-background', getFocusStyle$1(theme, {
      inset: -3
    }), {
      fontSize: '20px',
      boxSizing: 'border-box',
      width: DEFAULT_PILL_WIDTH,
      height: DEFAULT_PILL_HEIGHT,
      borderRadius: DEFAULT_PILL_HEIGHT / 2,
      transition: 'all 0.1s ease',
      border: "1px solid ".concat(pillBorderColor),
      background: pillUncheckedBackground,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      padding: '0 3px'
    }, !disabled && [!checked && {
      selectors: {
        ':hover': [{
          borderColor: pillBorderHoveredColor
        }],
        ':hover .ms-Toggle-thumb': [{
          backgroundColor: thumbUncheckedHoveredBackground,
          selectors: _defineProperty({}, HighContrastSelector$1, {
            borderColor: 'Highlight'
          })
        }]
      }
    }, checked && [{
      background: pillCheckedBackground,
      borderColor: 'transparent',
      justifyContent: 'flex-end'
    }, {
      selectors: _defineProperty({
        ':hover': [{
          backgroundColor: pillCheckedHoveredBackground,
          borderColor: 'transparent',
          selectors: _defineProperty({}, HighContrastSelector$1, {
            backgroundColor: 'Highlight'
          })
        }]
      }, HighContrastSelector$1, {
        backgroundColor: 'WindowText'
      })
    }]], disabled && [{
      cursor: 'default'
    }, !checked && [{
      borderColor: pillBorderDisabledColor
    }], checked && [{
      backgroundColor: pillCheckedDisabledBackground,
      borderColor: 'transparent',
      justifyContent: 'flex-end'
    }]], !disabled && {
      selectors: {
        '&:hover': {
          selectors: _defineProperty({}, HighContrastSelector$1, {
            borderColor: 'Highlight'
          })
        }
      }
    }],
    thumb: ['ms-Toggle-thumb', {
      width: DEFAULT_THUMB_SIZE,
      height: DEFAULT_THUMB_SIZE,
      borderRadius: '50%',
      transition: 'all 0.1s ease',
      backgroundColor: thumbBackground,

      /* Border is added to handle high contrast mode for Firefox */
      borderColor: 'transparent',
      borderWidth: '.28em',
      borderStyle: 'solid',
      boxSizing: 'border-box'
    }, !disabled && checked && [{
      backgroundColor: thumbCheckedBackground,
      selectors: _defineProperty({}, HighContrastSelector$1, {
        backgroundColor: 'Window',
        borderColor: 'Window'
      })
    }], disabled && [!checked && [{
      backgroundColor: thumbDisabledBackground
    }], checked && [{
      backgroundColor: thumbCheckedDisabledBackground
    }]]],
    // @ts-ignore
    text: ['ms-Toggle-stateText', {
      selectors: {
        // Workaround: make rules more specific than Label rules.
        '&&': {
          padding: '0',
          margin: '0 8px',
          userSelect: 'none',
          fontWeight: FontWeights$1.regular
        }
      }
    }, disabled && {
      selectors: {
        '&&': {
          color: textDisabledColor,
          selectors: _defineProperty({}, HighContrastSelector$1, {
            color: 'GrayText'
          })
        }
      }
    }]
  };
};

var Toggle$1 = styled(__vue_component__$z, getStyles$z, undefined);

var PersonaSize;

(function (PersonaSize) {
  /**
   * `tiny` size has been deprecated in favor of standardized numeric sizing. Use `size8` instead.
   * @deprecated Use `size8` instead.
   */
  PersonaSize[PersonaSize["tiny"] = 0] = "tiny";
  /**
   *
   * `extraExtraSmall` size has been deprecated in favor of standardized numeric sizing. Use `size24` instead.
   * @deprecated Use `size24` instead.
   */

  PersonaSize[PersonaSize["extraExtraSmall"] = 1] = "extraExtraSmall";
  /**
   * `extraSmall` size has been deprecated in favor of standardized numeric sizing. Use `size32` instead.
   * @deprecated Use `size32` instead.
   */

  PersonaSize[PersonaSize["extraSmall"] = 2] = "extraSmall";
  /**
   * `small` size has been deprecated in favor of standardized numeric sizing. Use `size40` instead.
   * @deprecated Use `size40` instead.
   */

  PersonaSize[PersonaSize["small"] = 3] = "small";
  /**
   * `regular` size has been deprecated in favor of standardized numeric sizing. Use `size48` instead.
   * @deprecated Use `size48` instead.
   */

  PersonaSize[PersonaSize["regular"] = 4] = "regular";
  /**
   * `large` size has been deprecated in favor of standardized numeric sizing. Use `size72` instead.
   * @deprecated Use `size72` instead.
   */

  PersonaSize[PersonaSize["large"] = 5] = "large";
  /**
   * `extraLarge` size has been deprecated in favor of standardized numeric sizing. Use `size100` instead.
   * @deprecated Use `size100` instead.
   */

  PersonaSize[PersonaSize["extraLarge"] = 6] = "extraLarge";
  /**
   * No `PersonaCoin` is rendered.
   */

  PersonaSize[PersonaSize["size8"] = 17] = "size8";
  /**
   * No `PersonaCoin` is rendered. Deprecated in favor of `size8` to align with design specifications.
   * @deprecated Use `size8` instead. Will be removed in a future major release.
   */

  PersonaSize[PersonaSize["size10"] = 9] = "size10";
  /**
   * Renders a 16px `PersonaCoin`. Deprecated due to not being in the design specification.
   * @deprecated Will be removed in a future major release.
   */

  PersonaSize[PersonaSize["size16"] = 8] = "size16";
  /**
   * Renders a 24px `PersonaCoin`.
   */

  PersonaSize[PersonaSize["size24"] = 10] = "size24";
  /**
   * Renders a 28px `PersonaCoin`. Deprecated due to not being in the design specification.
   * @deprecated Will be removed in a future major release.
   */

  PersonaSize[PersonaSize["size28"] = 7] = "size28";
  /**
   * Renders a 32px `PersonaCoin`.
   */

  PersonaSize[PersonaSize["size32"] = 11] = "size32";
  /**
   * Renders a 40px `PersonaCoin`.
   */

  PersonaSize[PersonaSize["size40"] = 12] = "size40";
  /**
   * Renders a 48px `PersonaCoin`.
   */

  PersonaSize[PersonaSize["size48"] = 13] = "size48";
  /**
   * Renders a 56px `PersonaCoin`.
   */

  PersonaSize[PersonaSize["size56"] = 16] = "size56";
  /**
   * Renders a 72px `PersonaCoin`.
   */

  PersonaSize[PersonaSize["size72"] = 14] = "size72";
  /**
   * Renders a 100px `PersonaCoin`.
   */

  PersonaSize[PersonaSize["size100"] = 15] = "size100";
  /**
   * Renders a 120px `PersonaCoin`.
   */

  PersonaSize[PersonaSize["size120"] = 18] = "size120";
})(PersonaSize || (PersonaSize = {}));
/**
 * {@docCategory Persona}
 */


var PersonaPresence;

(function (PersonaPresence) {
  PersonaPresence[PersonaPresence["none"] = 0] = "none";
  PersonaPresence[PersonaPresence["offline"] = 1] = "offline";
  PersonaPresence[PersonaPresence["online"] = 2] = "online";
  PersonaPresence[PersonaPresence["away"] = 3] = "away";
  PersonaPresence[PersonaPresence["dnd"] = 4] = "dnd";
  PersonaPresence[PersonaPresence["blocked"] = 5] = "blocked";
  PersonaPresence[PersonaPresence["busy"] = 6] = "busy";
})(PersonaPresence || (PersonaPresence = {}));
/**
 * {@docCategory Persona}
 */


var PersonaInitialsColor;

(function (PersonaInitialsColor) {
  PersonaInitialsColor[PersonaInitialsColor["lightBlue"] = 0] = "lightBlue";
  PersonaInitialsColor[PersonaInitialsColor["blue"] = 1] = "blue";
  PersonaInitialsColor[PersonaInitialsColor["darkBlue"] = 2] = "darkBlue";
  PersonaInitialsColor[PersonaInitialsColor["teal"] = 3] = "teal";
  PersonaInitialsColor[PersonaInitialsColor["lightGreen"] = 4] = "lightGreen";
  PersonaInitialsColor[PersonaInitialsColor["green"] = 5] = "green";
  PersonaInitialsColor[PersonaInitialsColor["darkGreen"] = 6] = "darkGreen";
  PersonaInitialsColor[PersonaInitialsColor["lightPink"] = 7] = "lightPink";
  PersonaInitialsColor[PersonaInitialsColor["pink"] = 8] = "pink";
  PersonaInitialsColor[PersonaInitialsColor["magenta"] = 9] = "magenta";
  PersonaInitialsColor[PersonaInitialsColor["purple"] = 10] = "purple";
  /**
   * `black` is a color that can result in offensive persona coins with some initials combinations, so it can only be set with overrides.
   * @deprecated will be removed in a future major release.
   */

  PersonaInitialsColor[PersonaInitialsColor["black"] = 11] = "black";
  PersonaInitialsColor[PersonaInitialsColor["orange"] = 12] = "orange";
  /**
   * `red` is a color that often has a special meaning, so it is considered a reserved color and can only be set with overrides
   * @deprecated will be removed in a future major release.
   */

  PersonaInitialsColor[PersonaInitialsColor["red"] = 13] = "red";
  PersonaInitialsColor[PersonaInitialsColor["darkRed"] = 14] = "darkRed";
  /**
   * Transparent is not intended to be used with typical initials due to accessibility issues.
   * Its primary use is for overflow buttons, so it is considered a reserved color and can only be set with overrides.
   */

  PersonaInitialsColor[PersonaInitialsColor["transparent"] = 15] = "transparent";
  PersonaInitialsColor[PersonaInitialsColor["violet"] = 16] = "violet";
  PersonaInitialsColor[PersonaInitialsColor["lightRed"] = 17] = "lightRed";
  PersonaInitialsColor[PersonaInitialsColor["gold"] = 18] = "gold";
  PersonaInitialsColor[PersonaInitialsColor["burgundy"] = 19] = "burgundy";
  PersonaInitialsColor[PersonaInitialsColor["warmGray"] = 20] = "warmGray";
  PersonaInitialsColor[PersonaInitialsColor["coolGray"] = 21] = "coolGray";
  /**
   * `gray` is a color that can result in offensive persona coins with some initials combinations, so it can only be set with overrides
   */

  PersonaInitialsColor[PersonaInitialsColor["gray"] = 22] = "gray";
  PersonaInitialsColor[PersonaInitialsColor["cyan"] = 23] = "cyan";
  PersonaInitialsColor[PersonaInitialsColor["rust"] = 24] = "rust";
})(PersonaInitialsColor || (PersonaInitialsColor = {}));

var _sizeToPixels;

var personaSize;

(function (personaSize) {
  personaSize.size8 = '20px'; // TODO: remove in a future major release as it's deprecated.

  personaSize.size10 = '20px'; // TODO: remove in a future major release as it's deprecated.

  personaSize.size16 = '16px';
  personaSize.size24 = '24px'; // TODO: remove in a future major release as it's deprecated.

  personaSize.size28 = '28px';
  personaSize.size32 = '32px';
  personaSize.size40 = '40px';
  personaSize.size48 = '48px';
  personaSize.size56 = '56px';
  personaSize.size72 = '72px';
  personaSize.size100 = '100px';
  personaSize.size120 = '120px';
})(personaSize || (personaSize = {})); // Persona Presence Sizes


var personaPresenceSize;

(function (personaPresenceSize) {
  personaPresenceSize.size6 = '6px';
  personaPresenceSize.size8 = '8px';
  personaPresenceSize.size12 = '12px';
  personaPresenceSize.size16 = '16px';
  personaPresenceSize.size20 = '20px';
  personaPresenceSize.size28 = '28px';
  personaPresenceSize.size32 = '32px';
  /**
   * @deprecated This is now unused
   */

  personaPresenceSize.border = '2px';
})(personaPresenceSize || (personaPresenceSize = {})); // TODO: remove the deprecated parts in a future major release.


var sizeBoolean = function sizeBoolean(size) {
  return {
    isSize8: size === PersonaSize.size8,
    isSize10: size === PersonaSize.size10 || size === PersonaSize.tiny,
    isSize16: size === PersonaSize.size16,
    isSize24: size === PersonaSize.size24 || size === PersonaSize.extraExtraSmall,
    isSize28: size === PersonaSize.size28 || size === PersonaSize.extraSmall,
    isSize32: size === PersonaSize.size32,
    isSize40: size === PersonaSize.size40 || size === PersonaSize.small,
    isSize48: size === PersonaSize.size48 || size === PersonaSize.regular,
    isSize56: size === PersonaSize.size56,
    isSize72: size === PersonaSize.size72 || size === PersonaSize.large,
    isSize100: size === PersonaSize.size100 || size === PersonaSize.extraLarge,
    isSize120: size === PersonaSize.size120
  };
};
var sizeToPixels = (_sizeToPixels = {}, _defineProperty(_sizeToPixels, PersonaSize.tiny, 10), _defineProperty(_sizeToPixels, PersonaSize.extraExtraSmall, 24), _defineProperty(_sizeToPixels, PersonaSize.extraSmall, 28), _defineProperty(_sizeToPixels, PersonaSize.small, 40), _defineProperty(_sizeToPixels, PersonaSize.regular, 48), _defineProperty(_sizeToPixels, PersonaSize.large, 72), _defineProperty(_sizeToPixels, PersonaSize.extraLarge, 100), _defineProperty(_sizeToPixels, PersonaSize.size8, 8), _defineProperty(_sizeToPixels, PersonaSize.size10, 10), _defineProperty(_sizeToPixels, PersonaSize.size16, 16), _defineProperty(_sizeToPixels, PersonaSize.size24, 24), _defineProperty(_sizeToPixels, PersonaSize.size28, 28), _defineProperty(_sizeToPixels, PersonaSize.size32, 32), _defineProperty(_sizeToPixels, PersonaSize.size40, 40), _defineProperty(_sizeToPixels, PersonaSize.size48, 48), _defineProperty(_sizeToPixels, PersonaSize.size56, 56), _defineProperty(_sizeToPixels, PersonaSize.size72, 72), _defineProperty(_sizeToPixels, PersonaSize.size100, 100), _defineProperty(_sizeToPixels, PersonaSize.size120, 120), _sizeToPixels);
var presenceBoolean = function presenceBoolean(presence) {
  return {
    isAvailable: presence === PersonaPresence.online,
    isAway: presence === PersonaPresence.away,
    isBlocked: presence === PersonaPresence.blocked,
    isBusy: presence === PersonaPresence.busy,
    isDoNotDisturb: presence === PersonaPresence.dnd,
    isOffline: presence === PersonaPresence.offline
  };
};

var GlobalClassNames$j = {
  root: 'ms-Persona',
  size8: 'ms-Persona--size8',
  size10: 'ms-Persona--size10',
  size16: 'ms-Persona--size16',
  size24: 'ms-Persona--size24',
  size28: 'ms-Persona--size28',
  size32: 'ms-Persona--size32',
  size40: 'ms-Persona--size40',
  size48: 'ms-Persona--size48',
  size56: 'ms-Persona--size56',
  size72: 'ms-Persona--size72',
  size100: 'ms-Persona--size100',
  size120: 'ms-Persona--size120',
  available: 'ms-Persona--online',
  away: 'ms-Persona--away',
  blocked: 'ms-Persona--blocked',
  busy: 'ms-Persona--busy',
  doNotDisturb: 'ms-Persona--donotdisturb',
  offline: 'ms-Persona--offline',
  details: 'ms-Persona-details',
  primaryText: 'ms-Persona-primaryText',
  secondaryText: 'ms-Persona-secondaryText',
  tertiaryText: 'ms-Persona-tertiaryText',
  optionalText: 'ms-Persona-optionalText',
  textContent: 'ms-Persona-textContent'
};
var getStyles$A = function getStyles(props) {
  var className = props.className,
      showSecondaryText = props.showSecondaryText,
      theme = props.theme;
  var palette = theme.palette,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(GlobalClassNames$j, theme);
  var size = sizeBoolean(props.size);
  var presence = presenceBoolean(props.presence);
  var showSecondaryTextDefaultHeight = '16px';
  var sharedTextStyles = {
    color: palette.neutralSecondary,
    fontWeight: FontWeights.regular,
    fontSize: fonts.small.fontSize
  };
  return {
    root: [classNames.root, theme.fonts.medium, normalize, {
      color: palette.neutralPrimary,
      position: 'relative',
      height: personaSize.size48,
      minWidth: personaSize.size48,
      display: 'flex',
      alignItems: 'center',
      selectors: {
        '.contextualHost': {
          display: 'none'
        }
      }
    }, size.isSize8 && [classNames.size8, {
      height: personaSize.size8,
      minWidth: personaSize.size8
    }], // TODO: Deprecated size and needs to be removed in a future major release.
    size.isSize10 && [classNames.size10, {
      height: personaSize.size10,
      minWidth: personaSize.size10
    }], // TODO: Deprecated size and needs to be removed in a future major release.
    size.isSize16 && [classNames.size16, {
      height: personaSize.size16,
      minWidth: personaSize.size16
    }], size.isSize24 && [classNames.size24, {
      height: personaSize.size24,
      minWidth: personaSize.size24
    }], size.isSize24 && showSecondaryText && {
      height: '36px'
    }, // TODO: Deprecated size and needs to be removed in a future major release.
    size.isSize28 && [classNames.size28, {
      height: personaSize.size28,
      minWidth: personaSize.size28
    }], size.isSize28 && showSecondaryText && {
      height: '32px'
    }, size.isSize32 && [classNames.size32, {
      height: personaSize.size32,
      minWidth: personaSize.size32
    }], size.isSize40 && [classNames.size40, {
      height: personaSize.size40,
      minWidth: personaSize.size40
    }], size.isSize48 && classNames.size48, size.isSize56 && [classNames.size56, {
      height: personaSize.size56,
      minWidth: personaSize.size56
    }], size.isSize72 && [classNames.size72, {
      height: personaSize.size72,
      minWidth: personaSize.size72
    }], size.isSize100 && [classNames.size100, {
      height: personaSize.size100,
      minWidth: personaSize.size100
    }], size.isSize120 && [classNames.size120, {
      height: personaSize.size120,
      minWidth: personaSize.size120
    }],
    /**
     * Modifiers: presence
     */
    presence.isAvailable && classNames.available, presence.isAway && classNames.away, presence.isBlocked && classNames.blocked, presence.isBusy && classNames.busy, presence.isDoNotDisturb && classNames.doNotDisturb, presence.isOffline && classNames.offline, className],
    details: [classNames.details, {
      padding: '0 24px 0 16px',
      minWidth: 0,
      width: '100%',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    }, (size.isSize8 || size.isSize10) && {
      paddingLeft: 17
    }, (size.isSize24 || size.isSize28 || size.isSize32) && {
      padding: '0 8px'
    }, (size.isSize40 || size.isSize48) && {
      padding: '0 12px'
    }],
    primaryText: [classNames.primaryText, noWrap, {
      color: palette.neutralPrimary,
      fontWeight: FontWeights.regular,
      fontSize: fonts.medium.fontSize,
      selectors: {
        ':hover': {
          color: palette.neutralDark
        }
      }
    }, showSecondaryText && {
      height: showSecondaryTextDefaultHeight,
      lineHeight: showSecondaryTextDefaultHeight,
      overflowX: 'hidden'
    }, (size.isSize8 || size.isSize10) && {
      fontSize: fonts.small.fontSize,
      lineHeight: personaSize.size8
    }, size.isSize16 && {
      lineHeight: personaSize.size28
    }, (size.isSize24 || size.isSize28 || size.isSize32 || size.isSize40 || size.isSize48) && showSecondaryText && {
      height: 18
    }, (size.isSize56 || size.isSize72 || size.isSize100 || size.isSize120) && {
      fontSize: fonts.xLarge.fontSize
    }, (size.isSize56 || size.isSize72 || size.isSize100 || size.isSize120) && showSecondaryText && {
      height: 22
    }],
    secondaryText: [classNames.secondaryText, noWrap, sharedTextStyles, (size.isSize8 || size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && {
      display: 'none'
    }, showSecondaryText && {
      display: 'block',
      height: showSecondaryTextDefaultHeight,
      lineHeight: showSecondaryTextDefaultHeight,
      overflowX: 'hidden'
    }, size.isSize24 && showSecondaryText && {
      height: 18
    }, (size.isSize56 || size.isSize72 || size.isSize100 || size.isSize120) && {
      fontSize: fonts.medium.fontSize
    }, (size.isSize56 || size.isSize72 || size.isSize100 || size.isSize120) && showSecondaryText && {
      height: 18
    }],
    tertiaryText: [classNames.tertiaryText, noWrap, sharedTextStyles, {
      display: 'none',
      fontSize: fonts.medium.fontSize
    }, (size.isSize72 || size.isSize100 || size.isSize120) && {
      display: 'block'
    }],
    optionalText: [classNames.optionalText, noWrap, sharedTextStyles, {
      display: 'none',
      fontSize: fonts.medium.fontSize
    }, (size.isSize100 || size.isSize120) && {
      display: 'block'
    }],
    textContent: [classNames.textContent, noWrap]
  };
};

/**
 * Following colors are considered reserved colors and can only be set with overrides, so they are excluded from this set:
 * - `gray` and `black` are colors that can result in offensive persona coins with some initials combinations,
 *   so it can only be set with overrides.
 * - `red` is a color that often has a special meaning, so it is considered a reserved color and can only be set with overrides.
 * - `transparent` is not intended to be used with typical initials due to accessibility issues,
 *   its primary use is for Facepile overflow buttons.
 */

var COLOR_SWATCHES_LOOKUP = [PersonaInitialsColor.lightBlue, PersonaInitialsColor.blue, PersonaInitialsColor.darkBlue, PersonaInitialsColor.teal, PersonaInitialsColor.green, PersonaInitialsColor.darkGreen, PersonaInitialsColor.lightPink, PersonaInitialsColor.pink, PersonaInitialsColor.magenta, PersonaInitialsColor.purple, PersonaInitialsColor.orange, PersonaInitialsColor.lightRed, PersonaInitialsColor.darkRed, PersonaInitialsColor.violet, PersonaInitialsColor.gold, PersonaInitialsColor.burgundy, PersonaInitialsColor.warmGray, PersonaInitialsColor.cyan, PersonaInitialsColor.rust, PersonaInitialsColor.coolGray];
var COLOR_SWATCHES_NUM_ENTRIES = COLOR_SWATCHES_LOOKUP.length;

function getInitialsColorFromName(displayName) {
  var color = PersonaInitialsColor.blue;

  if (!displayName) {
    return color;
  }

  var hashCode = 0;

  for (var iLen = displayName.length - 1; iLen >= 0; iLen--) {
    var ch = displayName.charCodeAt(iLen);
    var shift = iLen % 8; // tslint:disable-next-line:no-bitwise

    hashCode ^= (ch << shift) + (ch >> 8 - shift);
  }

  color = COLOR_SWATCHES_LOOKUP[hashCode % COLOR_SWATCHES_NUM_ENTRIES];
  return color;
}

function personaInitialsColorToHexCode(personaInitialsColor) {
  switch (personaInitialsColor) {
    case PersonaInitialsColor.lightBlue:
      return '#4F6BED';

    case PersonaInitialsColor.blue:
      return '#0078D4';

    case PersonaInitialsColor.darkBlue:
      return '#004E8C';

    case PersonaInitialsColor.teal:
      return '#038387';

    case PersonaInitialsColor.lightGreen:
    case PersonaInitialsColor.green:
      return '#498205';

    case PersonaInitialsColor.darkGreen:
      return '#0B6A0B';

    case PersonaInitialsColor.lightPink:
      return '#C239B3';

    case PersonaInitialsColor.pink:
      return '#E3008C';

    case PersonaInitialsColor.magenta:
      return '#881798';

    case PersonaInitialsColor.purple:
      return '#5C2E91';

    case PersonaInitialsColor.orange:
      return '#CA5010';

    case PersonaInitialsColor.red:
      return '#EE1111';

    case PersonaInitialsColor.lightRed:
      return '#D13438';

    case PersonaInitialsColor.darkRed:
      return '#A4262C';

    case PersonaInitialsColor.transparent:
      return 'transparent';

    case PersonaInitialsColor.violet:
      return '#8764B8';

    case PersonaInitialsColor.gold:
      return '#986F0B';

    case PersonaInitialsColor.burgundy:
      return '#750B1C';

    case PersonaInitialsColor.warmGray:
      return '#7A7574';

    case PersonaInitialsColor.cyan:
      return '#005B70';

    case PersonaInitialsColor.rust:
      return '#8E562E';

    case PersonaInitialsColor.coolGray:
      return '#69797E';

    case PersonaInitialsColor.black:
      return '#1D1D1D';

    case PersonaInitialsColor.gray:
      return '#393939';
  }
}
/**
 * Gets the hex color string (prefixed with #) for the given persona props.
 * This is the logic used internally by the Persona control.
 * @param props - Current persona props
 * @returns Hex color string prefixed with #
 */

function getPersonaInitialsColor(props) {
  var primaryText = props.primaryText,
      text = props.text;
  var initialsColor = props.initialsColor;
  var initialsColorCode;

  if (typeof initialsColor === 'string') {
    initialsColorCode = initialsColor;
  } else {
    initialsColor = initialsColor !== undefined ? initialsColor : getInitialsColorFromName(text || primaryText);
    initialsColorCode = personaInitialsColorToHexCode(initialsColor);
  }

  return initialsColorCode;
}

var coinSizeFontScaleFactor = 6;
var coinSizePresenceScaleFactor = 3;
var presenceMaxSize = 40;
var presenceFontMaxSize = 20;
var getClassNames$r = classNamesFunction();

var PersonaPresence$1 =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(PersonaPresence$1, _BaseComponent);

  function PersonaPresence$1() {
    var _this;

    _classCallCheck(this, PersonaPresence$1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PersonaPresence$1).apply(this, arguments));
    _this.PersonaPresenceEnum = PersonaPresence;
    return _this;
  }

  _createClass(PersonaPresence$1, [{
    key: "renderIcon",
    get: function get() {
      var coinSize = this.coinSize;
      var size = sizeBoolean(this.size);
      return !(size.isSize8 || size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && (coinSize ? coinSize > 32 : true);
    }
  }, {
    key: "presenceHeightWidth",
    get: function get() {
      var coinSize = this.coinSize;
      var presenceHeightWidth = coinSize ? coinSize / coinSizePresenceScaleFactor < presenceMaxSize ? coinSize / coinSizePresenceScaleFactor + 'px' : presenceMaxSize + 'px' : '';
      return presenceHeightWidth;
    }
  }, {
    key: "coinSizeWithPresenceStyle",
    get: function get() {
      var coinSize = this.coinSize,
          presenceHeightWidth = this.presenceHeightWidth;
      return coinSize ? {
        width: presenceHeightWidth,
        height: presenceHeightWidth
      } : undefined;
    }
  }, {
    key: "coinSizeWithPresenceIconStyle",
    get: function get() {
      var coinSize = this.coinSize,
          isOutOfOffice = this.isOutOfOffice,
          styles = this.styles,
          presence = this.presence,
          presenceTitle = this.presenceTitle,
          presenceHeightWidth = this.presenceHeightWidth;
      var size = sizeBoolean(this.size);
      var presenceFontSize = coinSize ? coinSize / coinSizeFontScaleFactor < presenceFontMaxSize ? coinSize / coinSizeFontScaleFactor + 'px' : presenceFontMaxSize + 'px' : '';
      return coinSize ? {
        fontSize: presenceFontSize,
        lineHeight: presenceHeightWidth
      } : undefined;
    }
  }, {
    key: "classNames",
    get: function get() {
      var styles = this.styles,
          theme = this.theme,
          presence = this.presence,
          size = this.size,
          isOutOfOffice = this.isOutOfOffice;
      return getClassNames$r(styles, {
        theme: theme,
        presence: presence,
        size: size,
        isOutOfOffice: isOutOfOffice
      });
    }
  }, {
    key: "icon",
    get: function get() {
      var presence = this.presence,
          isOutOfOffice = this.isOutOfOffice;

      if (!presence) {
        return undefined;
      }

      var oofIcon = 'SkypeArrow';

      switch (PersonaPresence[presence]) {
        case 'online':
          return 'SkypeCheck';

        case 'away':
          return isOutOfOffice ? oofIcon : 'SkypeClock';

        case 'dnd':
          return 'SkypeMinus';

        case 'offline':
          return isOutOfOffice ? oofIcon : '';
      }

      return '';
    }
  }]);

  return PersonaPresence$1;
}(BaseComponent$1);

__decorate([Prop(), __metadata("design:type", Object)], PersonaPresence$1.prototype, "presence", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaPresence$1.prototype, "size", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaPresence$1.prototype, "isOutOfOffice", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaPresence$1.prototype, "coinSize", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaPresence$1.prototype, "presenceTitle", void 0);

PersonaPresence$1 = __decorate([Component({
  components: {
    Icon: Icon$1
  }
})], PersonaPresence$1);
var script$A = PersonaPresence$1;

/* script */
var __vue_script__$A = script$A;
/* template */

var __vue_render__$w = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.presence !== _vm.PersonaPresenceEnum.none ? _c('div', {
    class: _vm.classNames.presence,
    style: _vm.coinSizeWithPresenceStyle,
    attrs: {
      "title": _vm.presenceTitle
    }
  }, [_vm.renderIcon ? _c('Icon', {
    class: _vm.classNames.presenceIcon,
    style: _vm.coinSizeWithPresenceIconStyle,
    attrs: {
      "icon-name": _vm.icon
    }
  }) : _vm._e()], 1) : _vm._e();
};

var __vue_staticRenderFns__$w = [];
/* style */

var __vue_inject_styles__$A = undefined;
/* scoped */

var __vue_scope_id__$A = undefined;
/* module identifier */

var __vue_module_identifier__$A = undefined;
/* functional template */

var __vue_is_functional_template__$A = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$A = __vue_normalize__({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, false, undefined, undefined, undefined);

var GlobalClassNames$k = {
  presence: 'ms-Persona-presence',
  presenceIcon: 'ms-Persona-presenceIcon'
};
var getStyles$B = function getStyles(props) {
  var theme = props.theme;
  var semanticColors = theme.semanticColors,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(GlobalClassNames$k, theme);
  var size = sizeBoolean(props.size);
  var presence = presenceBoolean(props.presence); // Presence colors

  var presenceColorAvailable = '#6BB700';
  var presenceColorAway = '#FFAA44';
  var presenceColorBusy = '#C43148';
  var presenceColorDnd = '#C50F1F';
  var presenceColorOffline = '#8A8886';
  var presenceColorOof = '#B4009E';
  var isOpenCirclePresence = presence.isOffline || props.isOutOfOffice && (presence.isAvailable || presence.isBusy || presence.isAway || presence.isDoNotDisturb);
  var borderSizeForSmallPersonas = '1px';
  var borderSizeForLargePersonas = '2px';
  var borderSize = size.isSize72 || size.isSize100 ? borderSizeForLargePersonas : borderSizeForSmallPersonas;
  return {
    presence: [classNames.presence, {
      position: 'absolute',
      height: personaPresenceSize.size12,
      width: personaPresenceSize.size12,
      borderRadius: '50%',
      top: 'auto',
      right: '-2px',
      bottom: '-2px',
      border: "2px solid ".concat(semanticColors.bodyBackground),
      textAlign: 'center',
      boxSizing: 'content-box',
      backgroundClip: 'content-box',
      MsHighContrastAdjust: 'none',
      selectors: _defineProperty({}, HighContrastSelector, {
        borderColor: 'Window',
        backgroundColor: 'WindowText'
      })
    }, (size.isSize8 || size.isSize10) && {
      right: 'auto',
      top: '7px',
      left: 0,
      border: 0,
      selectors: _defineProperty({}, HighContrastSelector, {
        top: '9px',
        border: '1px solid WindowText'
      })
    }, (size.isSize8 || size.isSize10 || size.isSize24 || size.isSize28 || size.isSize32) && makeSizeStyle(personaPresenceSize.size8), (size.isSize40 || size.isSize48) && makeSizeStyle(personaPresenceSize.size12), size.isSize16 && {
      height: personaPresenceSize.size6,
      width: personaPresenceSize.size6,
      borderWidth: '1.5px'
    }, size.isSize56 && makeSizeStyle(personaPresenceSize.size16), size.isSize72 && makeSizeStyle(personaPresenceSize.size20), size.isSize100 && makeSizeStyle(personaPresenceSize.size28), size.isSize120 && makeSizeStyle(personaPresenceSize.size32), presence.isAvailable && {
      backgroundColor: presenceColorAvailable,
      selectors: _defineProperty({}, HighContrastSelector, backgroundColor('Highlight'))
    }, presence.isAway && backgroundColor(presenceColorAway), presence.isBlocked && [{
      selectors: _defineProperty({
        // Only show :after at larger sizes
        ':after': size.isSize40 || size.isSize48 || size.isSize72 || size.isSize100 ? {
          content: '""',
          width: '100%',
          height: borderSize,
          backgroundColor: presenceColorBusy,
          transform: 'translateY(-50%) rotate(-45deg)',
          position: 'absolute',
          top: '50%',
          left: 0
        } : undefined
      }, HighContrastSelector, {
        selectors: {
          ':after': {
            width: "calc(100% - 4px)",
            left: '2px',
            backgroundColor: 'Window'
          }
        }
      })
    }], presence.isBusy && backgroundColor(presenceColorBusy), presence.isDoNotDisturb && backgroundColor(presenceColorDnd), presence.isOffline && backgroundColor(presenceColorOffline), (isOpenCirclePresence || presence.isBlocked) && [{
      backgroundColor: semanticColors.bodyBackground,
      selectors: _defineProperty({
        ':before': {
          content: '""',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          border: "".concat(borderSize, " solid ").concat(presenceColorBusy),
          borderRadius: '50%',
          boxSizing: 'border-box'
        }
      }, HighContrastSelector, {
        backgroundColor: 'WindowText',
        selectors: {
          ':before': {
            width: "calc(100% - 2px)",
            height: "calc(100% - 2px)",
            top: '1px',
            left: '1px',
            borderColor: 'Window'
          }
        }
      })
    }], isOpenCirclePresence && presence.isAvailable && makeBeforeBorderStyle(borderSize, presenceColorAvailable), isOpenCirclePresence && presence.isBusy && makeBeforeBorderStyle(borderSize, presenceColorBusy), isOpenCirclePresence && presence.isAway && makeBeforeBorderStyle(borderSize, presenceColorOof), isOpenCirclePresence && presence.isDoNotDisturb && makeBeforeBorderStyle(borderSize, presenceColorDnd), isOpenCirclePresence && presence.isOffline && makeBeforeBorderStyle(borderSize, presenceColorOffline), isOpenCirclePresence && presence.isOffline && props.isOutOfOffice && makeBeforeBorderStyle(borderSize, presenceColorOof)],
    presenceIcon: [classNames.presenceIcon, {
      color: semanticColors.bodyBackground,
      fontSize: '6px',
      lineHeight: personaPresenceSize.size12,
      verticalAlign: 'top',
      selectors: _defineProperty({}, HighContrastSelector, {
        color: 'Window'
      })
    }, size.isSize56 && {
      fontSize: '8px',
      lineHeight: personaPresenceSize.size16
    }, size.isSize72 && {
      fontSize: fonts.small.fontSize,
      lineHeight: personaPresenceSize.size20
    }, size.isSize100 && {
      fontSize: fonts.medium.fontSize,
      lineHeight: personaPresenceSize.size28
    }, size.isSize120 && {
      fontSize: fonts.medium.fontSize,
      lineHeight: personaPresenceSize.size32
    }, presence.isAway && {
      position: 'relative',
      left: isOpenCirclePresence ? undefined : '1px'
    }, isOpenCirclePresence && presence.isAvailable && makeOpenCircleIconStyle(presenceColorAvailable), isOpenCirclePresence && presence.isBusy && makeOpenCircleIconStyle(presenceColorBusy), isOpenCirclePresence && presence.isAway && makeOpenCircleIconStyle(presenceColorOof), isOpenCirclePresence && presence.isDoNotDisturb && makeOpenCircleIconStyle(presenceColorDnd), isOpenCirclePresence && presence.isOffline && makeOpenCircleIconStyle(presenceColorOffline), isOpenCirclePresence && presence.isOffline && props.isOutOfOffice && makeOpenCircleIconStyle(presenceColorOof)]
  };
};

function makeOpenCircleIconStyle(color) {
  return {
    color: color,
    borderColor: color
  };
}

function makeBeforeBorderStyle(borderSize, color) {
  return {
    selectors: {
      ':before': {
        border: "".concat(borderSize, " solid ").concat(color)
      }
    }
  };
}

function makeSizeStyle(size) {
  return {
    height: size,
    width: size
  };
}

function backgroundColor(color) {
  return {
    backgroundColor: color
  };
}

function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$d(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function styled$1(Component, baseStyles, getProps, customizable, pure) {
  var _styles;

  return Vue.extend({
    functional: true,
    render: function render(h, context) {
      if (!_styles || context.props.styles !== _styles.__cachedInputs__[1] || !!context.props.styles) {
        _styles = function _styles(styleProps) {
          return concatStyleSetsWithProps(styleProps, baseStyles, context.props.styles);
        };

        _styles.__cachedInputs__ = [baseStyles, context.props.styles];
      }

      var additionalProps = getProps ? getProps(this) : undefined;
      return h(Component, _objectSpread$d({}, context.data, {
        props: _objectSpread$d({}, additionalProps, {}, context.props, {
          className: context.props.className || context.data.class,
          styles: _styles
        })
      }), context.children);
    }
  });
}

var PersonaPresence$2 = styled$1(__vue_component__$A, getStyles$B, undefined);

var getClassNames$s = classNamesFunction();

var PersonaCoin =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(PersonaCoin, _BaseComponent);

  function PersonaCoin() {
    var _this;

    _classCallCheck(this, PersonaCoin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PersonaCoin).apply(this, arguments));
    _this.mergeStyles = mergeStyles;
    _this.getPersonaInitialsColor = getPersonaInitialsColor;
    _this.PersonaSize = PersonaSize;
    _this.ImageFit = ImageFit;
    return _this;
  }

  _createClass(PersonaCoin, [{
    key: "initials",
    get: function get() {
      var imageInitials = this.imageInitials,
          allowPhoneInitials = this.allowPhoneInitials,
          showUnknownPersonaCoin = this.showUnknownPersonaCoin;
      var isRTL = getRTL(this.theme);
      return imageInitials || getInitials(this.text, isRTL, allowPhoneInitials);
    }
  }, {
    key: "dimension",
    get: function get() {
      var coinSize = this.coinSize,
          size = this.size;
      return coinSize || sizeToPixels[size];
    }
  }, {
    key: "personaPresenceProps",
    get: function get() {
      var coinSize = this.coinSize,
          theme = this.theme,
          isOutOfOffice = this.isOutOfOffice,
          presence = this.presence,
          presenceTitle = this.presenceTitle,
          size = this.size;
      return {
        coinSize: coinSize,
        isOutOfOffice: isOutOfOffice,
        presence: presence,
        presenceTitle: presenceTitle,
        size: size,
        theme: theme
      };
    }
  }, {
    key: "shouldRenderInitials",
    get: function get() {
      return !this.imageUrl;
    }
  }, {
    key: "coinSizeStyle",
    get: function get() {
      var coinSize = this.coinSize;
      return coinSize ? {
        width: coinSize,
        height: coinSize
      } : undefined;
    }
  }, {
    key: "classNames",
    get: function get() {
      var styles = this.styles,
          theme = this.theme,
          className = this.className,
          coinProps = this.coinProps,
          size = this.size,
          coinSize = this.coinSize,
          showUnknownPersonaCoin = this.showUnknownPersonaCoin;
      return getClassNames$s(styles, {
        theme: theme,
        className: coinProps && coinProps.className ? coinProps.className : className,
        size: size,
        coinSize: coinSize,
        showUnknownPersonaCoin: showUnknownPersonaCoin
      });
    }
  }]);

  return PersonaCoin;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  required: true
}), __metadata("design:type", Boolean)], PersonaCoin.prototype, "allowPhoneInitials", void 0);

__decorate([Prop({
  type: Number,
  required: true
}), __metadata("design:type", Number)], PersonaCoin.prototype, "presence", void 0);

__decorate([Prop({
  type: Number,
  required: true
}), __metadata("design:type", Number)], PersonaCoin.prototype, "size", void 0);

__decorate([Prop({
  type: Number,
  required: true
}), __metadata("design:type", Number)], PersonaCoin.prototype, "coinSize", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaCoin.prototype, "coinProps", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaCoin.prototype, "showUnknownPersonaCoin", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaCoin.prototype, "isOutOfOffice", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaCoin.prototype, "presenceTitle", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaCoin.prototype, "imageUrl", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaCoin.prototype, "imageInitials", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaCoin.prototype, "text", void 0);

__decorate([Prop(), __metadata("design:type", Object)], PersonaCoin.prototype, "initialsColor", void 0);

PersonaCoin = __decorate([Component({
  inheritAttrs: false,
  components: {
    Icon: Icon$1,
    OImage: Image$1,
    PersonaPresence: PersonaPresence$2
  }
})], PersonaCoin);
var script$B = PersonaCoin;

/* script */
var __vue_script__$B = script$B;
/* template */

var __vue_render__$x = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.coin,
    attrs: {
      "role": "presentation"
    }
  }, [_vm.size !== _vm.PersonaSize.size8 && _vm.size !== _vm.PersonaSize.size10 && _vm.size !== _vm.PersonaSize.tiny ? _c('div', {
    class: _vm.classNames.imageArea,
    style: _vm.coinSizeStyle,
    attrs: {
      "role": "presentation"
    }
  }, [_vm.shouldRenderInitials ? _c('div', {
    class: _vm.mergeStyles(_vm.classNames.initials, !_vm.showUnknownPersonaCoin && {
      backgroundColor: _vm.getPersonaInitialsColor(_vm.$props)
    }),
    style: _vm.coinSizeStyle,
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm.initials ? _c('span', [_vm._v(_vm._s(_vm.initials))]) : _c('Icon', {
    attrs: {
      "icon-name": "Contact"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.imageUrl ? _c('OImage', {
    class: _vm.classNames.image,
    attrs: {
      "image-fit": _vm.ImageFit.cover,
      "src": _vm.imageUrl,
      "width": _vm.dimension,
      "height": _vm.dimension
    }
  }) : _vm._e(), _vm._v(" "), _c('PersonaPresence', _vm._b({}, 'PersonaPresence', _vm.personaPresenceProps, false))], 1) : [_vm.presence ? _c('PersonaPresence', _vm._b({}, 'PersonaPresence', _vm.personaPresenceProps, false)) : _c('Icon', {
    class: _vm.classNames.size10WithoutPresenceIcon,
    attrs: {
      "icon-name": "Contact"
    }
  })], _vm._v(" "), _vm._t("default")], 2);
};

var __vue_staticRenderFns__$x = [];
/* style */

var __vue_inject_styles__$B = undefined;
/* scoped */

var __vue_scope_id__$B = undefined;
/* module identifier */

var __vue_module_identifier__$B = undefined;
/* functional template */

var __vue_is_functional_template__$B = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$B = __vue_normalize__({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, false, undefined, undefined, undefined);

var GlobalClassNames$l = {
  coin: 'ms-Persona-coin',
  imageArea: 'ms-Persona-imageArea',
  image: 'ms-Persona-image',
  initials: 'ms-Persona-initials',
  size8: 'ms-Persona--size8',
  size10: 'ms-Persona--size10',
  size16: 'ms-Persona--size16',
  size24: 'ms-Persona--size24',
  size28: 'ms-Persona--size28',
  size32: 'ms-Persona--size32',
  size40: 'ms-Persona--size40',
  size48: 'ms-Persona--size48',
  size56: 'ms-Persona--size56',
  size72: 'ms-Persona--size72',
  size100: 'ms-Persona--size100',
  size120: 'ms-Persona--size120'
};
var getStyles$C = function getStyles(props) {
  var _selectors;

  var className = props.className,
      theme = props.theme,
      coinSize = props.coinSize;
  var palette = theme.palette,
      fonts = theme.fonts;
  var size = sizeBoolean(props.size);
  var classNames = getGlobalClassNames(GlobalClassNames$l, theme); // Static colors used when displaying 'unknown persona' coin

  var unknownPersonaBackgroundColor = 'rgb(234, 234, 234)';
  var unknownPersonaFontColor = 'rgb(168, 0, 0)';
  var dimension = coinSize || props.size && sizeToPixels[props.size] || 48;
  return {
    coin: [classNames.coin, fonts.medium, size.isSize8 && classNames.size8, size.isSize10 && classNames.size10, size.isSize16 && classNames.size16, size.isSize24 && classNames.size24, size.isSize28 && classNames.size28, size.isSize32 && classNames.size32, size.isSize40 && classNames.size40, size.isSize48 && classNames.size48, size.isSize56 && classNames.size56, size.isSize72 && classNames.size72, size.isSize100 && classNames.size100, size.isSize120 && classNames.size120, className],
    size10WithoutPresenceIcon: {
      fontSize: fonts.xSmall.fontSize,
      position: 'absolute',
      top: '5px',
      right: 'auto',
      left: 0
    },
    imageArea: [classNames.imageArea, {
      position: 'relative',
      textAlign: 'center',
      flex: '0 0 auto',
      height: dimension,
      width: dimension
    }, dimension <= 10 && {
      overflow: 'visible',
      background: 'transparent',
      height: 0,
      width: 0
    }],
    image: [classNames.image, {
      marginRight: '10px',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 0,
      borderRadius: '50%',
      perspective: '1px'
    }, dimension <= 10 && {
      overflow: 'visible',
      background: 'transparent',
      height: 0,
      width: 0
    }, dimension > 10 && {
      height: dimension,
      width: dimension
    }],
    initials: [classNames.initials, {
      borderRadius: '50%',
      color: props.showUnknownPersonaCoin ? unknownPersonaFontColor : palette.white,
      fontSize: fonts.large.fontSize,
      fontWeight: FontWeights.semibold,
      lineHeight: dimension === 48 ? 46 : dimension,
      height: dimension,
      selectors: (_selectors = {}, _defineProperty(_selectors, HighContrastSelector, {
        border: '1px solid WindowText',
        MsHighContrastAdjust: 'none',
        color: 'WindowText',
        boxSizing: 'border-box',
        backgroundColor: 'Window !important'
      }), _defineProperty(_selectors, "i", {
        fontWeight: FontWeights.semibold
      }), _selectors)
    }, props.showUnknownPersonaCoin && {
      backgroundColor: unknownPersonaBackgroundColor
    }, dimension < 32 && {
      fontSize: fonts.xSmall.fontSize
    }, dimension >= 32 && dimension < 40 && {
      fontSize: fonts.medium.fontSize
    }, dimension >= 40 && dimension < 56 && {
      fontSize: fonts.mediumPlus.fontSize
    }, dimension >= 56 && dimension < 72 && {
      fontSize: fonts.xLarge.fontSize
    }, dimension >= 72 && dimension < 100 && {
      fontSize: fonts.xxLarge.fontSize
    }, dimension >= 100 && {
      fontSize: fonts.superLarge.fontSize
    }]
  };
};

var PersonaCoin$1 = styled$1(__vue_component__$B, getStyles$C, undefined);

var getClassNames$t = classNamesFunction();

var Persona =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Persona, _BaseComponent);

  function Persona() {
    var _this;

    _classCallCheck(this, Persona);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Persona).apply(this, arguments));
    _this.PersonaSize = PersonaSize;
    return _this;
  }

  _createClass(Persona, [{
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          showSecondaryText = this.showSecondaryText,
          presence = this.presence,
          size = this.size;
      return getClassNames$t(getStyles$A, {
        theme: theme,
        className: className,
        showSecondaryText: showSecondaryText,
        presence: presence,
        size: size
      });
    }
  }]);

  return Persona;
}(BaseComponent$1);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Persona.prototype, "allowPhoneInitials", void 0);

__decorate([Prop({
  type: Number,
  default: PersonaPresence.none
}), __metadata("design:type", Number)], Persona.prototype, "presence", void 0);

__decorate([Prop({
  type: Number,
  default: PersonaSize.size48
}), __metadata("design:type", Number)], Persona.prototype, "size", void 0);

__decorate([Prop({
  type: Number,
  default: 0
}), __metadata("design:type", Number)], Persona.prototype, "coinSize", void 0);

__decorate([Prop({
  type: [Number, String],
  default: undefined
}), __metadata("design:type", Number)], Persona.prototype, "initialsColor", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Persona.prototype, "hidePersonaDetails", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Persona.prototype, "text", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Persona.prototype, "secondaryText", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Persona.prototype, "tertiaryText", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Persona.prototype, "optionalText", void 0);

__decorate([Prop({
  type: String,
  default: undefined
}), __metadata("design:type", String)], Persona.prototype, "imageUrl", void 0);

__decorate([Prop({
  type: String,
  default: 'online'
}), __metadata("design:type", String)], Persona.prototype, "status", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Persona.prototype, "isOutOfOffice", void 0);

__decorate([Prop({
  type: Boolean,
  default: false
}), __metadata("design:type", Boolean)], Persona.prototype, "showSecondaryText", void 0);

Persona = __decorate([Component({
  name: 'OPersona',
  components: {
    Icon: Icon$1,
    PersonaCoin: PersonaCoin$1
  }
})], Persona);
var script$C = Persona;

/* script */
var __vue_script__$C = script$C;
/* template */

var __vue_render__$y = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root,
    style: _vm.coinSize ? {
      height: _vm.coinSize + "px",
      minWidth: _vm.coinSize + "px"
    } : undefined
  }, [_c('PersonaCoin', _vm._b({}, 'PersonaCoin', _vm.$props, false)), _vm._v(" "), !_vm.hidePersonaDetails || _vm.size === _vm.PersonaSize.size8 || _vm.size === _vm.PersonaSize.size10 || _vm.size === _vm.PersonaSize.tiny ? _c('div', {
    class: _vm.classNames.details
  }, [_c('div', {
    class: _vm.classNames.primaryText,
    attrs: {
      "dir": "auto"
    }
  }, [_c('div', {
    class: _vm.classNames.tooltipHostRoot
  }, [_vm._v(_vm._s(_vm.text))])]), _vm._v(" "), _c('div', {
    class: _vm.classNames.secondaryText,
    attrs: {
      "dir": "auto"
    }
  }, [_c('div', {
    class: _vm.classNames.tooltipHostRoot
  }, [_vm._v(_vm._s(_vm.secondaryText))])]), _vm._v(" "), _c('div', {
    class: _vm.classNames.tertiaryText,
    attrs: {
      "dir": "auto"
    }
  }, [_c('div', {
    class: _vm.classNames.tooltipHostRoot
  }, [_vm._v(_vm._s(_vm.tertiaryText))])]), _vm._v(" "), _c('div', {
    class: _vm.classNames.optionalText,
    attrs: {
      "dir": "auto"
    }
  }, [_c('div', {
    class: _vm.classNames.tooltipHostRoot
  }, [_vm._v(_vm._s(_vm.optionalText))])])]) : _vm._e()], 1);
};

var __vue_staticRenderFns__$y = [];
/* style */

var __vue_inject_styles__$C = undefined;
/* scoped */

var __vue_scope_id__$C = undefined;
/* module identifier */

var __vue_module_identifier__$C = undefined;
/* functional template */

var __vue_is_functional_template__$C = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$C = __vue_normalize__({
  render: __vue_render__$y,
  staticRenderFns: __vue_staticRenderFns__$y
}, __vue_inject_styles__$C, __vue_script__$C, __vue_scope_id__$C, __vue_is_functional_template__$C, __vue_module_identifier__$C, false, undefined, undefined, undefined);

var Persona$1 = styled(__vue_component__$C, getStyles$A, undefined);

var GlobalClassNames$m = {
  root: 'ms-Shimmer-container',
  shimmerWrapper: 'ms-Shimmer-shimmerWrapper',
  shimmerGradient: 'ms-Shimmer-shimmerGradient',
  dataWrapper: 'ms-Shimmer-dataWrapper'
};
var BACKGROUND_OFF_SCREEN_POSITION = '100%';
var shimmerAnimation = keyframes({
  '0%': {
    transform: "translateX(-".concat(BACKGROUND_OFF_SCREEN_POSITION, ")")
  },
  '100%': {
    transform: "translateX(".concat(BACKGROUND_OFF_SCREEN_POSITION, ")")
  }
});
var shimmerAnimationRTL = keyframes({
  '100%': {
    transform: "translateX(-".concat(BACKGROUND_OFF_SCREEN_POSITION, ")")
  },
  '0%': {
    transform: "translateX(".concat(BACKGROUND_OFF_SCREEN_POSITION, ")")
  }
});
function getStyles$D(props) {
  var isDataLoaded = props.isDataLoaded,
      className = props.className,
      theme = props.theme,
      transitionAnimationInterval = props.transitionAnimationInterval,
      shimmerColor = props.shimmerColor,
      shimmerWaveColor = props.shimmerWaveColor;
  var semanticColors = theme.semanticColors;
  var classNames = getGlobalClassNames(GlobalClassNames$m, theme);
  var isRTL = getRTL();
  return {
    root: [classNames.root, theme.fonts.medium, {
      position: 'relative',
      height: 'auto'
    }, className],
    shimmerWrapper: [classNames.shimmerWrapper, {
      position: 'relative',
      overflow: 'hidden',
      transform: 'translateZ(0)',
      backgroundColor: shimmerColor || semanticColors.disabledBackground,
      transition: "opacity ".concat(transitionAnimationInterval, "ms"),
      selectors: _defineProperty({
        '> *': {
          transform: 'translateZ(0)'
        }
      }, HighContrastSelector, {
        background: "WindowText\n                        linear-gradient(\n                          to right,\n                          transparent 0%,\n                          Window 50%,\n                          transparent 100%)\n                        0 0 / 90% 100%\n                        no-repeat"
      })
    }, isDataLoaded && {
      opacity: '0',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0'
    }],
    shimmerGradient: [classNames.shimmerGradient, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: "".concat(shimmerColor || semanticColors.disabledBackground, "\n                      linear-gradient(\n                        to right,\n                        ").concat(shimmerColor || semanticColors.disabledBackground, " 0%,\n                        ").concat(shimmerWaveColor || semanticColors.bodyDivider, " 50%,\n                        ").concat(shimmerColor || semanticColors.disabledBackground, " 100%)\n                      0 0 / 90% 100%\n                      no-repeat"),
      transform: "translateX(-".concat(BACKGROUND_OFF_SCREEN_POSITION, ")"),
      animationDuration: '2s',
      animationTimingFunction: 'ease-in-out',
      animationDirection: 'normal',
      animationIterationCount: 'infinite',
      animationName: isRTL ? shimmerAnimationRTL : shimmerAnimation
    }],
    dataWrapper: [classNames.dataWrapper, {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      opacity: '0',
      background: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      transition: "opacity ".concat(transitionAnimationInterval, "ms")
    }, isDataLoaded && {
      opacity: '1',
      position: 'static'
    }],
    screenReaderText: hiddenContentStyle
  };
}

var getClassNames$u = classNamesFunction();
var TRANSITION_ANIMATION_INTERVAL = 200;
/* ms */

var Shimmer =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Shimmer, _BaseComponent);

  function Shimmer() {
    _classCallCheck(this, Shimmer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Shimmer).apply(this, arguments));
  }

  _createClass(Shimmer, [{
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          shimmerColors = this.shimmerColors;
      return getClassNames$u(getStyles$D, {
        theme: theme,
        isDataLoaded: false,
        className: className,
        transitionAnimationInterval: TRANSITION_ANIMATION_INTERVAL,
        shimmerColor: shimmerColors && shimmerColors.shimmer,
        shimmerWaveColor: shimmerColors && shimmerColors.shimmerWave
      });
    }
  }]);

  return Shimmer;
}(BaseComponent$1);

__decorate([Prop({
  default: null
}), __metadata("design:type", Object)], Shimmer.prototype, "shimmerColors", void 0);

Shimmer = __decorate([Component({})], Shimmer);
var script$D = Shimmer;

/* script */
var __vue_script__$D = script$D;
/* template */

var __vue_render__$z = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.shimmerWrapper
  }, [_c('div', {
    class: _vm.classNames.shimmerGradient
  })])]);
};

var __vue_staticRenderFns__$z = [];
/* style */

var __vue_inject_styles__$D = undefined;
/* scoped */

var __vue_scope_id__$D = undefined;
/* module identifier */

var __vue_module_identifier__$D = undefined;
/* functional template */

var __vue_is_functional_template__$D = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$D = __vue_normalize__({
  render: __vue_render__$z,
  staticRenderFns: __vue_staticRenderFns__$z
}, __vue_inject_styles__$D, __vue_script__$D, __vue_scope_id__$D, __vue_is_functional_template__$D, __vue_module_identifier__$D, false, undefined, undefined, undefined);



var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Overlay: Overlay$1,
  ActivityItem: __vue_component__$1,
  BaseButton: __vue_component__$2,
  ActionButton: __vue_component__$3,
  CommandBarButton: __vue_component__$4,
  CompoundButton: __vue_component__$5,
  DefaultButton: __vue_component__$6,
  IconButton: __vue_component__$7,
  MessageBarButton: __vue_component__$8,
  PrimaryButton: __vue_component__$9,
  Breadcrumb: __vue_component__$a,
  Modal: __vue_component__$E,
  Dialog: __vue_component__$d,
  Nav: Nav$1,
  Image: Image$1,
  get ImageFit () { return ImageFit; },
  get ImageLoadState () { return ImageLoadState; },
  get ImageCoverStyle () { return ImageCoverStyle; },
  Callout: __vue_component__$g,
  ComboBox: __vue_component__$i,
  ChoiceGroup: ChoiceGroup$1,
  Dropdown: Dropdown$1,
  MessageBar: MessageBar$1,
  get MessageBarType () { return MessageBarType; },
  Popup: __vue_component__$o,
  Facepile: Facepile$1,
  Panel: Panel$1,
  get PanelType () { return PanelType; },
  Checkbox: Checkbox$1,
  Icon: Icon$1,
  Label: Label$1,
  Layer: __vue_component__$b,
  LayerHost: __vue_component__$c,
  Link: Link$1,
  ProgressIndicator: ProgressIndicator$1,
  Rating: Rating$1,
  SearchBox: SearchBox$1,
  Separator: Separator$1,
  Slider: Slider$1,
  Spinner: Spinner$1,
  Text: Text$1,
  TextField: TextField$1,
  Toggle: Toggle$1,
  Persona: Persona$1,
  getPersonaInitialsColor: getPersonaInitialsColor,
  get PersonaSize () { return PersonaSize; },
  get PersonaPresence () { return PersonaPresence; },
  get PersonaInitialsColor () { return PersonaInitialsColor; },
  get personaSize () { return personaSize; },
  get personaPresenceSize () { return personaPresenceSize; },
  sizeBoolean: sizeBoolean,
  sizeToPixels: sizeToPixels,
  presenceBoolean: presenceBoolean,
  Shimmer: __vue_component__$D
});

var animationDuration = AnimationVariables.durationValue2;
var globalClassNames$1 = {
  root: 'ms-Modal',
  main: 'ms-Dialog-main',
  scrollableContent: 'ms-Modal-scrollableContent',
  isOpen: 'is-open',
  layer: 'ms-Modal-Layer'
};
var getStyles$E = function getStyles(props) {
  var className = props.className,
      containerClassName = props.containerClassName,
      scrollableContentClassName = props.scrollableContentClassName,
      isOpen = props.isOpen,
      isVisible = props.isVisible,
      hasBeenOpened = props.hasBeenOpened,
      modalRectangleTop = props.modalRectangleTop,
      theme = props.theme,
      topOffsetFixed = props.topOffsetFixed,
      isModeless = props.isModeless,
      layerClassName = props.layerClassName,
      isDefaultDragHandle = props.isDefaultDragHandle;
  var palette = theme.palette,
      effects = theme.effects,
      fonts = theme.fonts;
  var classNames = getGlobalClassNames(globalClassNames$1, theme);
  return {
    root: [classNames.root, fonts.medium, {
      backgroundColor: 'transparent',
      position: isModeless ? 'absolute' : 'fixed',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
      pointerEvents: 'none',
      transition: "opacity ".concat(animationDuration)
    }, topOffsetFixed && hasBeenOpened && {
      alignItems: 'flex-start'
    }, isOpen && classNames.isOpen, isVisible && {
      opacity: 1,
      pointerEvents: 'auto'
    }, className],
    main: [classNames.main, {
      boxShadow: effects.elevation64,
      borderRadius: effects.roundedCorner2,
      backgroundColor: palette.white,
      boxSizing: 'border-box',
      position: 'relative',
      textAlign: 'left',
      outline: '3px solid transparent',
      maxHeight: 'calc(100% - 32px)',
      maxWidth: 'calc(100% - 32px)',
      minHeight: '176px',
      minWidth: '288px',
      overflowY: 'auto',
      zIndex: isModeless ? ZIndexes.Layer : undefined
    }, topOffsetFixed && hasBeenOpened && {
      top: modalRectangleTop
    }, isDefaultDragHandle && {
      cursor: 'move'
    }, containerClassName],
    scrollableContent: [classNames.scrollableContent, {
      overflowY: 'auto',
      flexGrow: 1,
      maxHeight: '100vh',
      selectors: {
        '@supports (-webkit-overflow-scrolling: touch)': {
          maxHeight: window.innerHeight
        }
      }
    }, scrollableContentClassName],
    layer: isModeless && [layerClassName, classNames.layer, {
      position: 'static',
      width: 'unset',
      height: 'unset'
    }],
    keyboardMoveIconContainer: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: '3px 0px'
    },
    keyboardMoveIcon: {
      fontSize: fonts.xLargePlus.fontSize,
      width: '24px'
    }
  };
};

var getClassNames$v = classNamesFunction();

var Modal =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Modal, _BaseComponent);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, _getPrototypeOf(Modal).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: "classNames",
    get: function get() {
      var theme = this.theme,
          className = this.className,
          layerProps = this.layerProps,
          containerClassName = this.containerClassName,
          scrollableContentClassName = this.scrollableContentClassName,
          isVisible = this.isVisible,
          hasBeenOpened = this.hasBeenOpened,
          modalRectangleTop = this.modalRectangleTop,
          topOffsetFixed = this.topOffsetFixed,
          isModeless = this.isModeless,
          dragOptions = this.dragOptions;
      var layerClassName = layerProps === undefined ? '' : layerProps.className;
      return getClassNames$v(getStyles$E, {
        theme: theme,
        className: className,
        containerClassName: containerClassName,
        scrollableContentClassName: scrollableContentClassName,
        isOpen: true,
        isVisible: isVisible,
        hasBeenOpened: hasBeenOpened,
        modalRectangleTop: modalRectangleTop,
        topOffsetFixed: topOffsetFixed,
        isModeless: isModeless,
        layerClassName: layerClassName,
        isDefaultDragHandle: dragOptions && !dragOptions.dragHandleSelector
      });
    }
  }]);

  return Modal;
}(BaseComponent$1);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], Modal.prototype, "layerProps", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Modal.prototype, "containerClassName", void 0);

__decorate([Prop({
  type: String,
  default: null
}), __metadata("design:type", String)], Modal.prototype, "scrollableContentClassName", void 0);

__decorate([Prop({
  default: true
}), __metadata("design:type", Boolean)], Modal.prototype, "isVisible", void 0);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], Modal.prototype, "hasBeenOpened", void 0);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], Modal.prototype, "modalRectangleTop", void 0);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], Modal.prototype, "topOffsetFixed", void 0);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], Modal.prototype, "isModeless", void 0);

__decorate([Prop({
  type: Object,
  default: null
}), __metadata("design:type", Object)], Modal.prototype, "dragOptions", void 0);

Modal = __decorate([Component({
  components: {
    Layer: __vue_component__$b
  }
})], Modal);
var script$E = Modal;

/* script */
var __vue_script__$E = script$E;
/* template */

var __vue_render__$A = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('Layer', [_c('div', {
    class: _vm.classNames.root
  }, [_c('div', {
    class: _vm.classNames.container
  }, [_vm._v("\n      Modal\n      asfd\n      asdf\n      asdf\n    ")])])]);
};

var __vue_staticRenderFns__$A = [];
/* style */

var __vue_inject_styles__$E = undefined;
/* scoped */

var __vue_scope_id__$E = undefined;
/* module identifier */

var __vue_module_identifier__$E = undefined;
/* functional template */

var __vue_is_functional_template__$E = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$E = __vue_normalize__({
  render: __vue_render__$A,
  staticRenderFns: __vue_staticRenderFns__$A
}, __vue_inject_styles__$E, __vue_script__$E, __vue_scope_id__$E, __vue_is_functional_template__$E, __vue_module_identifier__$E, false, undefined, undefined, undefined);



var Components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Overlay: Overlay$1,
  ActivityItem: __vue_component__$1,
  BaseButton: __vue_component__$2,
  ActionButton: __vue_component__$3,
  CommandBarButton: __vue_component__$4,
  CompoundButton: __vue_component__$5,
  DefaultButton: __vue_component__$6,
  IconButton: __vue_component__$7,
  MessageBarButton: __vue_component__$8,
  PrimaryButton: __vue_component__$9,
  Breadcrumb: __vue_component__$a,
  Modal: __vue_component__$E,
  Dialog: __vue_component__$d,
  Nav: Nav$1,
  Image: Image$1,
  get ImageFit () { return ImageFit; },
  get ImageLoadState () { return ImageLoadState; },
  get ImageCoverStyle () { return ImageCoverStyle; },
  Callout: __vue_component__$g,
  ComboBox: __vue_component__$i,
  ChoiceGroup: ChoiceGroup$1,
  Dropdown: Dropdown$1,
  MessageBar: MessageBar$1,
  get MessageBarType () { return MessageBarType; },
  Popup: __vue_component__$o,
  Facepile: Facepile$1,
  Panel: Panel$1,
  get PanelType () { return PanelType; },
  Checkbox: Checkbox$1,
  Icon: Icon$1,
  Label: Label$1,
  Layer: __vue_component__$b,
  LayerHost: __vue_component__$c,
  Link: Link$1,
  ProgressIndicator: ProgressIndicator$1,
  Rating: Rating$1,
  SearchBox: SearchBox$1,
  Separator: Separator$1,
  Slider: Slider$1,
  Spinner: Spinner$1,
  Text: Text$1,
  TextField: TextField$1,
  Toggle: Toggle$1,
  Persona: Persona$1,
  getPersonaInitialsColor: getPersonaInitialsColor,
  get PersonaSize () { return PersonaSize; },
  get PersonaPresence () { return PersonaPresence; },
  get PersonaInitialsColor () { return PersonaInitialsColor; },
  get personaSize () { return personaSize; },
  get personaPresenceSize () { return personaPresenceSize; },
  sizeBoolean: sizeBoolean,
  sizeToPixels: sizeToPixels,
  presenceBoolean: presenceBoolean,
  Shimmer: __vue_component__$D
});

var STYLE_PREFIX = '__fabric__';
function registerCSSVars(key, obj) {
  var document = getDocument();
  if (!document) return obj;
  var id = "".concat(STYLE_PREFIX).concat(key);
  var style = document.getElementById(id);

  if (!style) {
    style = document.createElement('style');
    style.id = "".concat(STYLE_PREFIX).concat(key);
    document.head.appendChild(style);
  }

  var properties = {};
  var css = [];

  for (var _key in obj) {
    var value = obj[_key];
    properties[_key] = "var(--fabric-".concat(_key, ")");
    css.push("--fabric-".concat(_key, ": ").concat(value, ";"));
  }

  style.innerHTML = "\n  :root {\n    ".concat(css.join('\n'), "\n  }");
  return properties;
}

function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$e(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function loadTheme(theme) {
  var useCSSVars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // get latest theme
  var _theme = loadTheme$1(theme);

  if (useCSSVars) {
    var _theme2 = _theme,
        palette = _theme2.palette,
        semanticColors = _theme2.semanticColors; // generate new css vars

    palette = registerCSSVars('palette', palette);
    semanticColors = registerCSSVars('semanticColors', semanticColors); // update theme

    _theme = loadTheme$1(_objectSpread$e({}, theme, {
      palette: palette,
      semanticColors: semanticColors
    }));
  }

  return _theme;
}
function install(Vue) {
  var theme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var useCSSVars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  for (var _ in Components) {
    var Component = Components[_];
    if (Component.toString().indexOf('VueComponent') === -1) continue;
    var name = "o-".concat(toKebabCase(_));
    Vue.component(name, Component);
  }

  var _theme = createTheme(theme);

  _theme = loadTheme(theme, useCSSVars);
  Vue.prototype.$fabricTheme = _theme;
}
/*

============================
    CSS Vars
--neutralLight: #eaeaea;
--bodyFrameBackground: var(--neutralLight)

{
  neutralLight: 'var(--neutralLight)'
}
{
  bodyFrameBackground: 'var(--neutralLight)'
}

======================================
    No CSS Vars
{
  neutralLight: '#eaeaea'
}
{
  bodyFrameBackground: '#eaeaea'
}

 */

export default install;
export { __vue_component__$3 as ActionButton, __vue_component__$1 as ActivityItem, __vue_component__$2 as BaseButton, __vue_component__$a as Breadcrumb, __vue_component__$g as Callout, Checkbox$1 as Checkbox, ChoiceGroup$1 as ChoiceGroup, __vue_component__$i as ComboBox, __vue_component__$4 as CommandBarButton, __vue_component__$5 as CompoundButton, __vue_component__$6 as DefaultButton, __vue_component__$d as Dialog, Dropdown$1 as Dropdown, index as FabricComponents, Facepile$1 as Facepile, Icon$1 as Icon, __vue_component__$7 as IconButton, Image$1 as Image, ImageCoverStyle, ImageFit, ImageLoadState, Label$1 as Label, __vue_component__$b as Layer, __vue_component__$c as LayerHost, Link$1 as Link, MessageBar$1 as MessageBar, __vue_component__$8 as MessageBarButton, MessageBarType, __vue_component__$E as Modal, Nav$1 as Nav, Overlay$1 as Overlay, Panel$1 as Panel, PanelType, Persona$1 as Persona, PersonaInitialsColor, PersonaPresence, PersonaSize, __vue_component__$o as Popup, __vue_component__$9 as PrimaryButton, ProgressIndicator$1 as ProgressIndicator, Rating$1 as Rating, SearchBox$1 as SearchBox, Separator$1 as Separator, __vue_component__$D as Shimmer, Slider$1 as Slider, Spinner$1 as Spinner, Text$1 as Text, TextField$1 as TextField, Toggle$1 as Toggle, getPersonaInitialsColor, loadTheme, personaPresenceSize, personaSize, presenceBoolean, sizeBoolean, sizeToPixels };
