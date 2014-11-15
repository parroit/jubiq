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

require('./html-tags').forEach(exportTag);

var h = require('virtual-dom/h');
var is = require('is');
var VirtualNode = h('html').constructor;
var stringify = require('virtual-dom-stringify');

function isThunk(t) {
    return t && t.type === 'Thunk';
}

function render(vdom) {
    return stringify(vdom);
}

function exportTag(tag) {
    u[tag] = function() {
        var attrs = {dataset : {}};
        var children = [];
        var i = 0;
        var le = arguments.length;
        var name;
        var selector = tag;

        for (; i < le; i++) {

            var arg = arguments[i];
            if (is.regexp(arg)) {
                selector += arg.source;

            } else if (is.hash(arg)) {
                for (name in arg) {
                    if (arg.hasOwnProperty(name)) {
                        if (name.slice(0,5) === 'data-') {
                            attrs.dataset[name.slice(5)] = arg[name];    
                        } else {
                            attrs[name] = arg[name];
                        }
                        
                    }
                }

            } else if (is.number(arg) || is.string(arg) || is.boolean(arg)) {

                children.push(String(arg));

            } else if (arg instanceof VirtualNode || isThunk(arg)) {

                children.push(arg);

            } else if (arg === null || arg === undefined) {

                children.push('');

            } else {

                throw new TypeError('Unknown value type ' + arg);

            }
        }


        return h(selector, attrs, children);
    };
}
