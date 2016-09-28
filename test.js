let assert = require('assert');
let hello = require('./public/funcs').hello;
let plural = require('./public/funcs').plural;
let filter = require('./public/funcs').filter;

assert.equal(hello('Test'), 'Привет, Test');

assert.equal(plural(0), 'Здравствуй, дух');
assert.equal(plural(1), 'Рады приветствовать на нашем курсе!');
assert.equal(plural(2), 'Кликай дальше!! Еще осталось 13 раз(а)');
assert.equal(plural(13), 'Кликай дальше!! Еще осталось 2 раз(а)');
assert.equal(plural(15), `01001000 01101001 00101100
00100000 01100010 01110010 01101111`);
assert.equal(plural(100), `01001000 01101001 00101100
00100000 01100010 01110010 01101111`);

// Filter tests

global.window = {
  rules: ['orange', 'apple']
};

assert.equal(filter('orange'), '******');
assert.equal(filter('orange orange'), '****** ******');
assert.equal(filter('orange sdasadsd'), '****** sdasadsd');
assert.equal(filter('sdasadsd orange'), 'sdasadsd ******');
assert.equal(filter('sdasadsd orange sdasadsd'), 'sdasadsd ****** sdasadsd');
assert.equal(filter('sdasadsdorange'), 'sdasadsdorange');
assert.equal(filter('orangesdasadsd'), 'orangesdasadsd');

assert.equal(filter(function() {
  return 'orange';
}), "function () { return '******' }");

global.window = {
  rules: null
};

assert.equal(filter('orange'), 'orange');
