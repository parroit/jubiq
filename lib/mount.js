/*
 * jubiq
 * https://github.com/parroit/jubiq
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

module.exports = mount;

function mount(vdomFactory, elm) {


    var counter = 0;
    var currentDOM = vdomFactory();
    var newDOM = null;
    var rootNode = createElement(currentDOM);
    var changed = false;

    elm.appendChild(rootNode);

    function render() {

        changed = false;
        var patches = diff(currentDOM, newDOM);
        rootNode = patch(rootNode, patches);

        currentDOM = newDOM;
    }

    vdomFactory.on('change', function() {
        newDOM = vdomFactory();
        if (!changed) {
            window.requestAnimationFrame(render);
        }
        changed = true;
    });

}
