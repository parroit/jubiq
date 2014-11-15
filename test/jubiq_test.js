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

var h = require('virtual-dom/h');
var createElement = require('virtual-dom/create-element');

var u = require('../lib/jubiq.js');

describe('jubiq', function() {
    it('is defined', function() {
        u.should.be.a('object');
    });

    it('render vdom', function() {
        
        var udom = u.nav(/#navbar.beauty/,
            u.ul(
                u.li( u.a({href:'/a1'},'1') ),
                u.li( u.a({href:'/a2'},'2') ),
                u.li( u.a({href:'/a3'},'3') ),
                null, undefined
            ),42,true,false
        );

        var dom = h('nav', {id: 'navbar',className: 'beauty'},
                     [h('ul',null,
                        [h('li',null,
                            [h('a',{href:'/a1'},['1'])]),
                        h('li',null,
                            [h('a',{href:'/a2'},['2'])]),
                        h('li',null,
                            [h('a',{href:'/a3'},['3'])])
            ]),
            '42truefalse'
        ]);

        var rootNode = createElement(dom);
        u.render(udom).should.be.equal(String(rootNode));


    });

});
