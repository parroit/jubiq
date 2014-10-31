/*
 * jubiq
 * https://github.com/parroit/jubiq
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var u = module.exports = {
    mount: require('./mount'),
    render: render
};

var htmlTags = require('./html-tags');
var h = require('virtual-dom/h');
var is = require('is');
var assign = require('object-assign');
var VirtualNode = h('html').constructor;
var createElement = require('virtual-dom/create-element');

function render(vdom) {
    return String(createElement(vdom));
}

function readIdAndClass(arg) {
    var attrs = {};
    var attrName;
    var i = 0;
    var l = arg.length;

    for (; i < l; i++) {
        switch (arg[i]) {
            case '.':
                attrName = 'className';
                attrs.className = '';
                break;
            case '#':
                attrName = 'id';
                attrs.id = '';
                break;
            default:
                attrs[attrName] += arg[i];
        }
    }

    return attrs;
}

htmlTags.forEach(function(tag) {
    u[tag] = function() {
        var attrs = {};
        var children = [];
        var i = 0;
        var le = arguments.length;

        for (; i < le; i++) {

            var arg = arguments[i];
            if (is.regexp(arg)) {

                attrs = assign(attrs, readIdAndClass(arg.source) );

            } else if (is.hash(arg)) {

                attrs = assign(attrs, arg);

            } else if (is.number(arg) || is.string(arg) || arg instanceof VirtualNode) {

                children.push(arg);

            } else {

                throw new TypeError('Unknown value type ' + arg);

            }
        }


        return h(tag, attrs, children);
    };
});
