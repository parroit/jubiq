var u = require('../lib/jubiq.js');
var assign = require('object-assign');
var EventEmitter = require('events');

function range(from, to) {
    var ret = [];
    var i = from;
    for (; i < to; i++) {
        ret[i] = i;
    }
    return ret;
}

var counter = 0;

function udom() {
    return u.nav(/#navbar.beauty/,
        u.ul(
            u.li(u.a({
                href: '/a1'
            }, '1')),
            u.li(u.a({
                href: '/a2'
            }, '2')),
            u.li(u.a({
                href: '/a3'
            }, '3'))

        ),
        u.p.apply(u, range(0, 100).map(function(i) {
            var count;
            if (i < 10) {
                count = u.span(String(counter));
            } else {
                count = u.span('0');
            }
            return u.h1(u.span('This is the counter '), count);
        }))
    );
}

assign(udom, new EventEmitter());

window.onload = function() {

    u.mount(udom, document.body);

    function inc() {
        counter++;
        udom.emit('changed');

        if (counter < 10000) {
            setTimeout(inc);
        }
    }

    inc();
};
