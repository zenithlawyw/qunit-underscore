$(document).ready(function() {
  QUnit.module('Objects', function() {

    const default_list = [1, 2, 3];

    QUnit.test('underscore: keys', function(assert) {
      const input = { one: 1, two: 2 };
      const result = _.keys(input);
      assert.equal(result.join(', '), 'one, two', 'The keys ' + JSON.stringify(result) + ' were extracted from the object ' + JSON.stringify(input) + '.');
    });

    QUnit.test('underscore: values', function(assert) {
      const input = { one: 1, two: 2 };
      const result = _.values(input);
      assert.equal(result.join(', '), '1, 2', 'The values ' + JSON.stringify(result) + ' were extracted from the object ' + JSON.stringify(input) + '.');
    });

    QUnit.test('underscore: extend', function(assert) {
      const source = {name : 'moe'}, dest = {age : 50};
      _.extend(dest, source);
      assert.equal(dest.name, 'moe', 'can extend an object with the attributes of another');
    });

    QUnit.test('underscore: clone', function(assert) {
      const moe = {name : 'moe', lucky : [10, 20, 40]};
      const clone = _.clone(moe);
      assert.equal(clone.name, 'moe', 'the clone as the attributes of the original');

      clone.name = 'curly';
      assert.ok(clone.name == 'curly' && moe.name == 'moe', 'clones can change shallow attributes without affecting the original');

      clone.lucky.push(101);
      assert.equal(_.last(moe.lucky), 101, 'changes to deep attributes are shared with the original');
    });

    QUnit.test('underscore: isEqual', function(assert) {
      const moe   = {name : 'moe', lucky : default_list};
      const clone = {name : 'moe', lucky : default_list};
      assert.ok(moe != clone, 'basic equality between objects is false');
      assert.ok(_.isEqual(moe, clone), 'deep equality is true');
    });

    QUnit.test('underscore: isElement', function(assert) {
      assert.ok(!_.isElement('div'), 'strings are not DOM elements');
      assert.ok(_.isElement($('html')[0]), 'the HTML tag is a DOM element');
    });

    QUnit.test('underscore: isArray', function(assert) {
      assert.ok(!_.isArray(arguments), 'the arguments object is not an array');
      assert.ok(_.isArray(default_list), 'but arrays are');
    });

    QUnit.test('underscore: isFunction', function(assert) {
      assert.ok(!_.isFunction(default_list), 'array is not function');
      assert.ok(!_.isFunction('moe'), 'strings are not functions');
      assert.ok(_.isFunction(_.isFunction), 'but functions are');
    });

    QUnit.test('underscore: isUndefined', function(assert) {
      assert.ok(!_.isUndefined(1), 'numbers are defined');
      assert.ok(!_.isUndefined(null), 'null is defined');
      assert.ok(!_.isUndefined(false), 'false is defined');
      assert.ok(_.isUndefined(), 'nothing is undefined');
      assert.ok(_.isUndefined(undefined), 'undefined is undefined');
    });

    QUnit.test('underscore: toString', function(assert) {
      const result = _.toString(default_list);
      assert.equal(result, '1,2,3', 'The object ' + JSON.stringify(default_list) + ' was converted to a printable string.');
    });

  });
});
