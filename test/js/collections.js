$(document).ready(function() {
  QUnit.module('Collections', function() {

    const default_list = [1, 2, 3];

    QUnit.test('underscore: each', function(assert) {
      _.each(default_list, function(e, i, list) {
        assert.equal(e, i + 1, 'Iterate over the array [' + default_list + '] and yield ' + e);
      });

      let result = null;
      const break_at = 2;
      _.each(default_list, function(e, i, list) {
        if ((result = e) == break_at) throw '__break__';
      });
      assert.equal(result, break_at, 'Broke out of the loop of the array at ' + break_at);

      result = [];
      _.each(default_list, function(e, i, list) {
        result.push(e * this.multiplier);
      }, { multiplier: 10 });
      assert.equal(result.join(', '), '10, 20, 30', 'context object property accessed');
    });

    QUnit.test('underscore: all/every', function(assert) {
      let input = [];
      let callback = function() {};
      assert.ok(_.all(input, callback), '[' + input + '] is empty.');

      input = [true, true, true];
      callback = function(e) { return e == true; };
      assert.ok(_.all(input, callback), '[' + input + '] contains all true values.');

      input = [true, false, true];
      assert.ok(!_.all(input, callback), '[' + input + '] contains at least one false value.');

      input = [0, 10, 28];
      callback = function (e) { return e % 2 == 0; };
      assert.ok(_.all(input, callback), 'All elements in [' + input + '] are even numbers.');

      input = [0, 11, 28];
      assert.ok(!_.all(input, callback), '[' + input + '] contains at least one odd number.');
    });

    QUnit.test('underscore: any/some', function(assert) {
      let input = [];
      let callback = function() {};
      assert.ok(!_.any(input, callback), '[' + input + '] is empty.');

      input = [false, false, false];
      callback = function(e) { return e == true; };
      assert.ok(!_.any(input, callback), '[' + input + '] contains all false values.');

      input = [false, false, true];
      assert.ok(_.any(input, callback), '[' + input + '] contains at least one true value.');

      input = [1, 11, 29];
      callback = function(e) { return e % 2 == 0; };
      assert.ok(!_.any(input, callback), 'All elements in [' + input + '] are odd numbers.');

      input = [1, 10, 29];
      assert.ok(_.any(input, callback), '[' + input + '] contains at least one even number.');
    });

    QUnit.test('underscore: map', function(assert) {
      const doubled = _.map(default_list, function(e) { return e * 2; });
      assert.equal(doubled.join(', '), '2, 4, 6', 'Numbers in [' + default_list + '] are doubled to be [' + doubled + '].');

      const tripled = _.map(default_list, function(e) { return e * this.multiplier; }, { multiplier: 3 });
      assert.equal(tripled.join(', '), '3, 6, 9', 'Numbers in [' + default_list + '] are tripled to be [' + tripled + '].');
    });

    QUnit.test('underscore: inject/reduce', function(assert) {
      const sum = _.inject(default_list, 0, function(sum, e) { return sum + e; });
      assert.equal(sum, 6, 'Numbers in [' + default_list + '] are summed up to ' + sum + '.');
    });

    QUnit.test('underscore: detect/find', function(assert) {
      let result = _.detect(default_list, function(e) { return e * 2 == 4; });
      assert.equal(result, 2, 'found the first occurrence of the quotient of 4 divided by 2 and broke out of the loop.');
    });

    QUnit.test('underscore: select/filter', function(assert) {
      let input = [1,2,3,4,5,6];
      const evens = _.select(input, function(e) { return e % 2 == 0; });
      assert.equal(evens.join(', '), '2, 4, 6', 'A list of even numbers [' + evens + '] have been selected from the given array [' + input + '].');
    });

    QUnit.test('underscore: reject', function(assert) {
      let input = [1,2,3,4,5,6];
      var odds = _.reject(input, function(e){ return e % 2 == 0; });
      assert.equal(odds.join(', '), '1, 3, 5', 'Even numbers were rejected from the given array [' + input + '] to return [' + odds + '].');
    });

    QUnit.test('underscore: include/contains', function(assert) {
      assert.ok(_.include(default_list, 2), '"2" is included in the given array [' + default_list + '].');

      let input = [1, 3, 9];
      assert.ok(!_.include(input, 2), '"2" is not included in the given array [' + input + '].');

      input = { alpha: 1, beta: 3, gamma: 9 };
      assert.ok(_.include(input, 3), '"3" is included as the value of one of the key-value pairs in the object ' + JSON.stringify(input) + '.');
    });

    QUnit.test('underscore: invoke', function(assert) {
      const input = [[5, 1, 7], [3, 2, 1]];
      const result = _.invoke(input, 'sort');
      assert.equal(result[0].join(', '), '1, 5, 7', 'The first child list [' + input[0] + '] was sorted.');
      assert.equal(result[1].join(', '), '1, 2, 3', 'The second child list [' + input[1] + '] was sorted.');
    });

    QUnit.test('underscore: pluck', function(assert) {
      const input = [{name : 'bar', age : 30}, {name : 'foo', age : 50}];
      const result = _.pluck(input, 'name');
      assert.equal(result.join(', '), 'bar, foo', 'A list of property values [' + result + '] has been extracted from ' + JSON.stringify(input));
    });

    QUnit.test('underscore: max', function(assert) {
      let result = _.max(default_list);
      assert.equal(result, 3, 'max is performed against [' + default_list + '] to return ' + result + '.');

      result = _.max(default_list, function(e) { return -e; });
      assert.equal(result, 1, 'Computation-based max is performed against [' + default_list + '] to return ' + result + '.');

      const input = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      result = _.max(input, function (e) { return e.age; });
      assert.equal(result.name, 'curly', 'max is performed under the criterion by which the age is ranked against ' + JSON.stringify(input) + ' to return ' + JSON.stringify(result));
    });
    
    QUnit.test('underscore: min', function(assert) {
      let result = _.min(default_list);
      assert.equal(result, 1, 'min is performed against [' + default_list + '] to return ' + result + '.');

      result = _.min(default_list, function(e) { return -e; });
      assert.equal(result, 3, 'Computation-based min is performed against [' + default_list + '] to return ' + result + '.');

      const input = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      result = _.min(input, function (e) { return e.age; });
      assert.equal(result.name, 'moe', 'min is performed under the criterion by which the age is ranked against ' + JSON.stringify(input) + ' to return ' + JSON.stringify(result));
    });

    QUnit.test('underscore: sortBy', function(assert) {
      const input = [{name: 'moe', age: 40}, {name: 'larry', age: 30}, {name: 'curly', age: 35}];
      const result = _.sortBy(input, function(e) { return e.age; });
      assert.equal(_.pluck(result, 'name').join(', '), 'larry, curly, moe', 'The list of objects ' + JSON.stringify(input) + ' are sorted by age to return ' + JSON.stringify(result) + '.');
    });

    QUnit.test('underscore: size', function(assert) {
      assert.equal(_.size(default_list), 3, 'The size of the given array [' + default_list + '] is 3.');

      input = {one: 1, two: 2, three: 3};
      assert.equal(_.size(input), 3, 'The size of the given object ' + JSON.stringify(input) + ' is 3.');
    });
    
    QUnit.test('underscore: toArray', function(assert) {
      assert.ok(!_.isArray(arguments), 'arguments object is not an array');
      assert.ok(_.isArray(_.toArray(arguments)), 'arguments object was converted into array');
      var numbers = _.toArray({one : 1, two : 2, three : 3});
      const input = {one: 1, two: 2, three: 3};
      const result = _.toArray(input);
      assert.equal(_.pluck(result, '0').join(', '), 'one, two, three', 'The object ' + JSON.stringify(input) + ' was flattened into an array [' + result + '].');
    });

  });
});
