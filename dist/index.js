'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @usage:
                                                                                                                                                                                                                                                                   * Active:
                                                                                                                                                                                                                                                                   * Transforms.setNodes(editor, { type:'list-item' })
                                                                                                                                                                                                                                                                   * Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] })
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * https://github.com/GitbookIO/slate-edit-list
                                                                                                                                                                                                                                                                   * https://gitbookio.github.io/slate-edit-list/
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * indent: 缩进一个单位
                                                                                                                                                                                                                                                                   Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] })
                                                                                                                                                                                                                                                                   Transforms.setNodes(editor, { type:'list-item' })
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                   * dedent: 反向缩进一个单位
                                                                                                                                                                                                                                                                   Transforms.unwrapNodes(editor, {
                                                                                                                                                                                                                                                                      match: n => n.type === 'bulleted-list' || n.type === 'numbered-list' ,
                                                                                                                                                                                                                                                                      split: true,
                                                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _slateHyperscript = require('slate-hyperscript');

var _slateReact = require('slate-react');

var _nextSlatePlugin = require('@jswork/next-slate-plugin');

var _nextSlatePlugin2 = _interopRequireDefault(_nextSlatePlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _nextSlatePlugin2.default.define({
  id: 'bulleted-list',
  serialize: {
    input: function input(_ref, children) {
      var el = _ref.el;

      var nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'ul') {
        return (0, _slateHyperscript.jsx)('element', { type: 'bulleted-list' }, children);
      }
    },
    output: function output(node, children) {
      return '<ul>' + children + '</ul>';
    }
  },
  render: function render(inContext, _ref2) {
    var attributes = _ref2.attributes,
        children = _ref2.children,
        element = _ref2.element;

    var path = _slateReact.ReactEditor.findPath(inContext.editor, element);
    return _react2.default.createElement(
      'ul',
      _extends({ 'data-depth': path.length }, attributes),
      children
    );
  }
});