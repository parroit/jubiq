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
var toVDom = require('virtual-html');

module.exports = mount;

function mount(vdomFactory, elm, keepDOM, onRendered) {


    var counter = 0;
    var currentDOM = null;
    var newDOM = null;
    var rootNode = null;
    var changed = false;
    if (keepDOM) {
        toVDom(elm.innerHTML, function(error, dom) {
            if (error) {
                throw error;
            }

            currentDOM = dom;
            rootNode = elm.children[0];

            waitChanges();
            handleChanges();
        });
    } else {
        currentDOM = vdomFactory();
        rootNode = createElement(currentDOM);
        elm.innerHTML = '';
        elm.appendChild(rootNode);
        waitChanges();
        handleChanges();
    }




    function render() {

        changed = false;
        var patches = diff(currentDOM, newDOM);
        rootNode = patch(rootNode, patches);

        currentDOM = newDOM;

        if (onRendered) {
            onRendered();
        }
    }

    function handleChanges() {
        newDOM = vdomFactory();
        if (!changed) {
            window.requestAnimationFrame(render);
        }
        changed = true;
    }

    function waitChanges() {
        vdomFactory.on('changed', handleChanges);
    }


}
