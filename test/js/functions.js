$(document).ready(function() {
  QUnit.module('Functions', function() {

    QUnit.test('underscore: bind', function(assert) {
      const context = { name: 'moe' };
      const func = function() { return 'name: ' + this.name; };
      const bound = _.bind(func, context);
      assert.equal(bound(), 'name: moe', 'A function can be bound to a context.');
    });

    QUnit.test('underscore: bindAll', function(assert) {
      const curly = { name : 'curly' };
      const moe = {
        name    : 'moe',
        getName : function() { return 'name: ' + this.name; },
        sayHi   : function() { return 'hi: ' + this.name; }
      };
      curly.getName = moe.getName;
      _.bindAll('getName', 'sayHi', moe);
      curly.sayHi = moe.sayHi;
      assert.equal(curly.getName(), 'name: curly', 'Unbound function is bound to current object.');
      assert.equal(curly.sayHi(), 'hi: moe', 'Bound function is still bound to original object.');
    });

  });
});
