"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPalButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PayPalButton = /*#__PURE__*/function (_React$Component) {
  _inherits(PayPalButton, _React$Component);

  var _super = _createSuper(PayPalButton);

  function PayPalButton(props) {
    var _this;

    _classCallCheck(this, PayPalButton);

    _this = _super.call(this, props);
    _this.state = {
      isSdkReady: false
    };
    return _this;
  }

  _createClass(PayPalButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== "undefined" && window !== undefined && window.paypal === undefined) {
        this.addPaypalSdk();
      } else if (typeof window !== "undefined" && window !== undefined && window.paypal !== undefined && this.props.onButtonReady) {
        this.props.onButtonReady();
      }
    }
  }, {
    key: "createOrder",
    value: function createOrder(data, actions) {
      var _this$props = this.props,
          currency = _this$props.currency,
          options = _this$props.options,
          amount = _this$props.amount,
          shippingPreference = _this$props.shippingPreference;
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: currency ? currency : options && options.currency ? options.currency : "USD",
            value: amount.toString()
          }
        }],
        application_context: {
          shipping_preference: shippingPreference
        }
      });
    }
  }, {
    key: "onApprove",
    value: function onApprove(data, actions) {
      var _this2 = this;

      return actions.order.capture().then(function (details) {
        if (_this2.props.onSuccess) {
          return _this2.props.onSuccess(details, data);
        }
      })["catch"](function (err) {
        if (_this2.props.catchError) {
          return _this2.props.catchError(err);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          amount = _this$props2.amount,
          onSuccess = _this$props2.onSuccess,
          createOrder = _this$props2.createOrder,
          createSubscription = _this$props2.createSubscription,
          onApprove = _this$props2.onApprove,
          style = _this$props2.style,
          onClick = _this$props2.onClick,
          onCancel = _this$props2.onCancel;
      var isSdkReady = this.state.isSdkReady;

      if (!isSdkReady && (typeof window === "undefined" || window.paypal === undefined)) {
        return null;
      }

      var Button = window.paypal.Buttons.driver("react", {
        React: _react["default"],
        ReactDOM: _reactDom["default"]
      });
      var createOrderFn = amount && !createOrder ? function (data, actions) {
        return _this3.createOrder(data, actions);
      } : function (data, actions) {
        return createOrder(data, actions);
      };
      return /*#__PURE__*/_react["default"].createElement(Button, _extends({}, this.props, {
        createOrder: createSubscription ? undefined : createOrderFn,
        createSubscription: createSubscription,
        onApprove: onSuccess ? function (data, actions) {
          return _this3.onApprove(data, actions);
        } : function (data, actions) {
          return onApprove(data, actions);
        },
        style: style,
        onClick: onClick,
        onCancel: onCancel
      }));
    }
  }, {
    key: "addPaypalSdk",
    value: function addPaypalSdk() {
      var _this4 = this;

      var _this$props3 = this.props,
          options = _this$props3.options,
          onButtonReady = _this$props3.onButtonReady;
      var queryParams = []; // replacing camelCase with dashes

      Object.keys(options).forEach(function (k) {
        var name = k.split(/(?=[A-Z])/).join("-").toLowerCase();
        queryParams.push("".concat(name, "=").concat(options[k]));
      });
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://www.paypal.com/sdk/js?".concat(queryParams.join("&"));
      script.async = true;

      script.onload = function () {
        _this4.setState({
          isSdkReady: true
        });

        if (onButtonReady) {
          onButtonReady();
        }
      };

      script.onerror = function () {
        throw new Error("Paypal SDK could not be loaded.");
      };

      document.body.appendChild(script);
    }
  }]);

  return PayPalButton;
}(_react["default"].Component);

exports.PayPalButton = PayPalButton;

_defineProperty(PayPalButton, "propTypes", {
  amount: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  shippingPreference: _propTypes["default"].string,
  onSuccess: _propTypes["default"].func,
  catchError: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  createOrder: _propTypes["default"].func,
  createSubscription: _propTypes["default"].func,
  onApprove: _propTypes["default"].func,
  style: _propTypes["default"].object,
  options: _propTypes["default"].shape({
    clientId: _propTypes["default"].string,
    merchantId: _propTypes["default"].string,
    currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    intent: _propTypes["default"].string,
    commit: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    vault: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    component: _propTypes["default"].string,
    disableFunding: _propTypes["default"].string,
    disableCard: _propTypes["default"].string,
    integrationDate: _propTypes["default"].string,
    locale: _propTypes["default"].string,
    buyerCountry: _propTypes["default"].string,
    debug: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string])
  }),
  onButtonReady: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onCancel: _propTypes["default"].func
});

_defineProperty(PayPalButton, "defaultProps", {
  style: {},
  options: {
    clientId: "sb",
    currency: "USD"
  },
  shippingPreference: "GET_FROM_FILE"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwiZGF0YSIsImFjdGlvbnMiLCJjdXJyZW5jeSIsIm9wdGlvbnMiLCJhbW91bnQiLCJzaGlwcGluZ1ByZWZlcmVuY2UiLCJvcmRlciIsImNyZWF0ZSIsInB1cmNoYXNlX3VuaXRzIiwiY3VycmVuY3lfY29kZSIsInZhbHVlIiwidG9TdHJpbmciLCJhcHBsaWNhdGlvbl9jb250ZXh0Iiwic2hpcHBpbmdfcHJlZmVyZW5jZSIsImNhcHR1cmUiLCJ0aGVuIiwiZGV0YWlscyIsIm9uU3VjY2VzcyIsImVyciIsImNhdGNoRXJyb3IiLCJjcmVhdGVPcmRlciIsImNyZWF0ZVN1YnNjcmlwdGlvbiIsIm9uQXBwcm92ZSIsInN0eWxlIiwib25DbGljayIsIm9uQ2FuY2VsIiwiQnV0dG9uIiwiQnV0dG9ucyIsImRyaXZlciIsIlJlYWN0IiwiUmVhY3RET00iLCJjcmVhdGVPcmRlckZuIiwicXVlcnlQYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiLCJuYW1lIiwic3BsaXQiLCJqb2luIiwidG9Mb3dlckNhc2UiLCJwdXNoIiwic2NyaXB0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsInNyYyIsImFzeW5jIiwib25sb2FkIiwic2V0U3RhdGUiLCJvbmVycm9yIiwiRXJyb3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJzdHJpbmciLCJmdW5jIiwib25FcnJvciIsIm9iamVjdCIsInNoYXBlIiwiY2xpZW50SWQiLCJtZXJjaGFudElkIiwiaW50ZW50IiwiY29tbWl0IiwiYm9vbCIsInZhdWx0IiwiY29tcG9uZW50IiwiZGlzYWJsZUZ1bmRpbmciLCJkaXNhYmxlQ2FyZCIsImludGVncmF0aW9uRGF0ZSIsImxvY2FsZSIsImJ1eWVyQ291bnRyeSIsImRlYnVnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTJDTUEsWTs7Ozs7QUEyREYsd0JBQVlDLEtBQVosRUFBc0M7QUFBQTs7QUFBQTs7QUFDbEMsOEJBQU1BLEtBQU47QUFFQSxVQUFLQyxLQUFMLEdBQWE7QUFDVEMsTUFBQUEsVUFBVSxFQUFFO0FBREgsS0FBYjtBQUhrQztBQU1yQzs7Ozt3Q0FFbUI7QUFDaEIsVUFDSSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLElBQ0FBLE1BQU0sS0FBS0MsU0FEWCxJQUVBRCxNQUFNLENBQUNFLE1BQVAsS0FBa0JELFNBSHRCLEVBSUU7QUFDRSxhQUFLRSxZQUFMO0FBQ0gsT0FORCxNQU9LLElBQ0QsT0FBT0gsTUFBUCxLQUFrQixXQUFsQixJQUNBQSxNQUFNLEtBQUtDLFNBRFgsSUFFQUQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUZsQixJQUdBLEtBQUtKLEtBQUwsQ0FBV08sYUFKVixFQUtIO0FBQ0UsYUFBS1AsS0FBTCxDQUFXTyxhQUFYO0FBQ0g7QUFDSjs7O2dDQUVXQyxJLEVBQVdDLE8sRUFBYztBQUFBLHdCQUV5QixLQUFLVCxLQUY5QjtBQUFBLFVBRXpCVSxRQUZ5QixlQUV6QkEsUUFGeUI7QUFBQSxVQUVmQyxPQUZlLGVBRWZBLE9BRmU7QUFBQSxVQUVOQyxNQUZNLGVBRU5BLE1BRk07QUFBQSxVQUVFQyxrQkFGRixlQUVFQSxrQkFGRjtBQUlqQyxhQUFPSixPQUFPLENBQUNLLEtBQVIsQ0FBY0MsTUFBZCxDQUFxQjtBQUMxQkMsUUFBQUEsY0FBYyxFQUFFLENBQ2Q7QUFDRUosVUFBQUEsTUFBTSxFQUFFO0FBQ05LLFlBQUFBLGFBQWEsRUFBRVAsUUFBUSxHQUNuQkEsUUFEbUIsR0FFbkJDLE9BQU8sSUFBSUEsT0FBTyxDQUFDRCxRQUFuQixH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LElBRGEsRUFFdkJaLHNCQUFVRyxNQUZhLENBQXBCLENBWmM7QUFnQnJCVyxJQUFBQSxTQUFTLEVBQUVkLHNCQUFVRyxNQWhCQTtBQWlCckJZLElBQUFBLGNBQWMsRUFBRWYsc0JBQVVHLE1BakJMO0FBa0JyQmEsSUFBQUEsV0FBVyxFQUFFaEIsc0JBQVVHLE1BbEJGO0FBbUJyQmMsSUFBQUEsZUFBZSxFQUFFakIsc0JBQVVHLE1BbkJOO0FBb0JyQmUsSUFBQUEsTUFBTSxFQUFFbEIsc0JBQVVHLE1BcEJHO0FBcUJyQmdCLElBQUFBLFlBQVksRUFBRW5CLHNCQUFVRyxNQXJCSDtBQXNCckJpQixJQUFBQSxLQUFLLEVBQUVwQixzQkFBVUMsU0FBVixDQUFvQixDQUN2QkQsc0JBQVVZLElBRGEsRUFFdkJaLHNCQUFVRyxNQUZhLENBQXBCO0FBdEJjLEdBQWhCLENBakJNO0FBNENmM0QsRUFBQUEsYUFBYSxFQUFFd0Qsc0JBQVVJLElBNUNWO0FBNkNmbkMsRUFBQUEsT0FBTyxFQUFFK0Isc0JBQVVJLElBN0NKO0FBOENmbEMsRUFBQUEsUUFBUSxFQUFFOEIsc0JBQVVJO0FBOUNMLEM7O2dCQURqQnBFLFksa0JBa0RvQjtBQUNsQmdDLEVBQUFBLEtBQUssRUFBRSxFQURXO0FBRWxCcEIsRUFBQUEsT0FBTyxFQUFFO0FBQ0w0RCxJQUFBQSxRQUFRLEVBQUUsSUFETDtBQUVMN0QsSUFBQUEsUUFBUSxFQUFFO0FBRkwsR0FGUztBQU1sQkcsRUFBQUEsa0JBQWtCLEVBQUU7QUFORixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cgeyBwYXlwYWw6IGFueSB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5UGFsQnV0dG9uUHJvcHMge1xuICAgIGFtb3VudD86IG51bWJlcnxzdHJpbmcsXG4gICAgY3VycmVuY3k/OiBudW1iZXJ8c3RyaW5nLFxuICAgIHNoaXBwaW5nUHJlZmVyZW5jZT86IFwiTk9fU0hJUFBJTkdcIiB8IFwiR0VUX0ZST01fRklMRVwiIHwgXCJTRVRfUFJPVklERURfQUREUkVTU1wiLFxuICAgIG9uU3VjY2Vzcz86IEZ1bmN0aW9uLFxuICAgIGNhdGNoRXJyb3I/OiBGdW5jdGlvbixcbiAgICBvbkVycm9yPzogRnVuY3Rpb24sXG4gICAgY3JlYXRlT3JkZXI/OiBGdW5jdGlvbixcbiAgICBjcmVhdGVTdWJzY3JpcHRpb24/OiBGdW5jdGlvbixcbiAgICBvbkFwcHJvdmU/OiBGdW5jdGlvbixcbiAgICBzdHlsZT86IG9iamVjdCxcbiAgICBvcHRpb25zPzogUGF5cGFsT3B0aW9ucyxcbiAgICBvbkJ1dHRvblJlYWR5PzogRnVuY3Rpb24sXG4gICAgb25DbGljaz86IEZ1bmN0aW9uLFxuICAgIG9uQ2FuY2VsPzogRnVuY3Rpb24sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5UGFsQnV0dG9uU3RhdGUge1xuICAgIGlzU2RrUmVhZHk6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXlwYWxPcHRpb25zIHtcbiAgICBjbGllbnRJZD86IHN0cmluZyxcbiAgICBtZXJjaGFudElkPzogc3RyaW5nLFxuICAgIGN1cnJlbmN5PzogbnVtYmVyfHN0cmluZyxcbiAgICBpbnRlbnQ/OiBzdHJpbmcsXG4gICAgY29tbWl0PzogYm9vbGVhbnxzdHJpbmcsXG4gICAgdmF1bHQ/OiBib29sZWFufHN0cmluZyxcbiAgICBjb21wb25lbnQ/OiBzdHJpbmcsXG4gICAgZGlzYWJsZUZ1bmRpbmc/OiBzdHJpbmcsXG4gICAgZGlzYWJsZUNhcmQ/OiBzdHJpbmcsXG4gICAgaW50ZWdyYXRpb25EYXRlPzogc3RyaW5nLFxuICAgIGxvY2FsZT86IHN0cmluZyxcbiAgICBidXllckNvdW50cnk/OiBzdHJpbmcsXG4gICAgZGVidWc/OiBib29sZWFufHN0cmluZ1xufVxuXG5jbGFzcyBQYXlQYWxCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UGF5UGFsQnV0dG9uUHJvcHMsIFBheVBhbEJ1dHRvblN0YXRlPiB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYW1vdW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBdKSxcbiAgICAgICAgY3VycmVuY3k6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIF0pLFxuICAgICAgICBzaGlwcGluZ1ByZWZlcmVuY2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uU3VjY2VzczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGNhdGNoRXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgY3JlYXRlT3JkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBjcmVhdGVTdWJzY3JpcHRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkFwcHJvdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNsaWVudElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgbWVyY2hhbnRJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGN1cnJlbmN5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGludGVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGNvbW1pdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZ1xuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB2YXVsdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZ1xuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBkaXNhYmxlRnVuZGluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGRpc2FibGVDYXJkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgaW50ZWdyYXRpb25EYXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgYnV5ZXJDb3VudHJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGVidWc6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmdcbiAgICAgICAgICAgIF0pXG4gICAgICAgIH0pLFxuICAgICAgICBvbkJ1dHRvblJlYWR5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBzdHlsZToge30sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNsaWVudElkOiBcInNiXCIsXG4gICAgICAgICAgICBjdXJyZW5jeTogXCJVU0RcIlxuICAgICAgICB9LFxuICAgICAgICBzaGlwcGluZ1ByZWZlcmVuY2U6IFwiR0VUX0ZST01fRklMRVwiLFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBQYXlQYWxCdXR0b25Qcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlzU2RrUmVhZHk6IGZhbHNlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB3aW5kb3cgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgd2luZG93LnBheXBhbCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5hZGRQYXlwYWxTZGsoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHdpbmRvdyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB3aW5kb3cucGF5cGFsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25CdXR0b25SZWFkeVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25CdXR0b25SZWFkeSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlT3JkZXIoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpIHtcblxuICAgICAgICBjb25zdCB7IGN1cnJlbmN5LCBvcHRpb25zLCBhbW91bnQsIHNoaXBwaW5nUHJlZmVyZW5jZSB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gYWN0aW9ucy5vcmRlci5jcmVhdGUoe1xuICAgICAgICAgIHB1cmNoYXNlX3VuaXRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFtb3VudDoge1xuICAgICAgICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGN1cnJlbmN5XG4gICAgICAgICAgICAgICAgICA/IGN1cnJlbmN5XG4gICAgICAgICAgICAgICAgICA6IG9wdGlvbnMgJiYgb3B0aW9ucy5jdXJyZW5jeVxuICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLmN1cnJlbmN5XG4gICAgICAgICAgICAgICAgICA6IFwiVVNEXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGFtb3VudC50b1N0cmluZygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGFwcGxpY2F0aW9uX2NvbnRleHQ6IHtcbiAgICAgICAgICAgIHNoaXBwaW5nX3ByZWZlcmVuY2U6IHNoaXBwaW5nUHJlZmVyZW5jZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25BcHByb3ZlKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSB7XG4gICAgICAgIHJldHVybiBhY3Rpb25zLm9yZGVyXG4gICAgICAgICAgICAuY2FwdHVyZSgpXG4gICAgICAgICAgICAudGhlbigoZGV0YWlscykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vblN1Y2Nlc3MoZGV0YWlscywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2F0Y2hFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jYXRjaEVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICBvblN1Y2Nlc3MsXG4gICAgICAgICAgICBjcmVhdGVPcmRlcixcbiAgICAgICAgICAgIGNyZWF0ZVN1YnNjcmlwdGlvbixcbiAgICAgICAgICAgIG9uQXBwcm92ZSxcbiAgICAgICAgICAgIHN0eWxlLFxuICAgICAgICAgICAgb25DbGljayxcbiAgICAgICAgICAgIG9uQ2FuY2VsLFxuICAgICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBpc1Nka1JlYWR5IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICFpc1Nka1JlYWR5ICYmXG4gICAgICAgICAgICAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB3aW5kb3cucGF5cGFsID09PSB1bmRlZmluZWQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBCdXR0b24gPSB3aW5kb3cucGF5cGFsLkJ1dHRvbnMuZHJpdmVyKFwicmVhY3RcIiwge1xuICAgICAgICAgICAgUmVhY3QsXG4gICAgICAgICAgICBSZWFjdERPTSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlT3JkZXJGbiA9XG4gICAgICAgICAgICBhbW91bnQgJiYgIWNyZWF0ZU9yZGVyXG4gICAgICAgICAgICAgICAgPyAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IHRoaXMuY3JlYXRlT3JkZXIoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgICAgICAgICA6IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gY3JlYXRlT3JkZXIoZGF0YSwgYWN0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBjcmVhdGVPcmRlcj17Y3JlYXRlU3Vic2NyaXB0aW9uID8gdW5kZWZpbmVkIDogY3JlYXRlT3JkZXJGbn1cbiAgICAgICAgICAgICAgICBjcmVhdGVTdWJzY3JpcHRpb249e2NyZWF0ZVN1YnNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICBvbkFwcHJvdmU9e1xuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiB0aGlzLm9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IG9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAgICAgICBvbkNhbmNlbD17b25DYW5jZWx9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkUGF5cGFsU2RrKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnMsIG9uQnV0dG9uUmVhZHkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIC8vIHJlcGxhY2luZyBjYW1lbENhc2Ugd2l0aCBkYXNoZXNcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBrLnNwbGl0KC8oPz1bQS1aXSkvKS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcXVlcnlQYXJhbXMucHVzaChgJHtuYW1lfT0ke29wdGlvbnNba119YCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgICAgc2NyaXB0LnNyYyA9IGBodHRwczovL3d3dy5wYXlwYWwuY29tL3Nkay9qcz8ke3F1ZXJ5UGFyYW1zLmpvaW4oXCImXCIpfWA7XG4gICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNTZGtSZWFkeTogdHJ1ZSB9KTtcblxuICAgICAgICAgICAgaWYgKG9uQnV0dG9uUmVhZHkpIHtcbiAgICAgICAgICAgICAgICBvbkJ1dHRvblJlYWR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGF5cGFsIFNESyBjb3VsZCBub3QgYmUgbG9hZGVkLlwiKTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgUGF5UGFsQnV0dG9uIH07XG4iXX0=