/*
 * jubiq
 * https://github.com/parroit/jubiq
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var jubiq = require('../lib/jubiq.js');

describe('jubiq', function(){
    it('is defined', function(){
      jubiq.should.be.a('function');
    });

});
