/*
 * jubiq
 * https://github.com/parroit/jubiq
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var EventEmitter = require('node-event-emitter');
var mainLoop = require('main-loop');


module.exports = mount;

function mount(view, elm, rootModel) {

    var component = new EventEmitter();
    component.root = rootModel;
    
    var loop = mainLoop(component, view);
    elm.parentNode.replaceChild(loop.target, elm);

    component.on('changed',  function handleChanges() {
        loop.update(component);
    });

}
