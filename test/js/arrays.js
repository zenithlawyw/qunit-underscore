$(document).ready(function() {
  QUnit.module('Arrays', function() {

    const default_list = [1, 2, 3];

    QUnit.test('underscore: first', function(assert) {
      const result = _.first(default_list);
      assert.equal(result, 1, 'The first element of the array [' + default_list + '] was extracted.');
    });

    QUnit.test('underscore: last', function(assert) {
      const result = _.last(default_list);
      assert.equal(result, 3, 'The last element of the array [' + default_list + '] was extracted.');
    });

    QUnit.test('underscore: compact', function(assert) {
      const input = [0, 1, false, 2, false, 3];
      const result = _.compact(input);
      assert.equal(result.length, 3, 'All zero and false values in the array [' + input + '] were trimmmed out to return [' + result + '].');
    });

    QUnit.test('underscore: flatten', function(assert) {
      const input = [1, [2], [3, [[[4]]]]];
      const result = _.flatten(input);
      assert.equal(result.join(', '), '1, 2, 3, 4', 'The nested array ' + JSON.stringify(input) + ' was flattened to return [' + result + '].');
    });

    QUnit.test('underscore: without', function(assert) {
      const input = [1, 2, 1, 4, 0, 3, 1];
      const result = _.without(input, 0, 1);
      assert.equal(result.join(', '), '2, 4, 3', '"0" and "1" in the array ' + JSON.stringify(input) + ' were removed to return [' + result + '].');
    });

    QUnit.test('underscore: intersect/intersection', function(assert) {
      const input1 = ['moe', 'curly', 'larry'], input2 = ['moe', 'groucho'];
      const result = _.intersect(input1, input2);
      assert.equal(result.join(''), 'moe', JSON.stringify(result) + ' is the set intersection of two arrays ' + JSON.stringify(input1) + ' and ' + JSON.stringify(input2)); 
    });

    QUnit.test('underscore: uniq', function(assert) {
      let input = [1, 2, 1, 3, 1, 4];
      let result = _.uniq(input);
      assert.equal(result.join(', '), '1, 2, 3, 4', 'The unique elements ' + JSON.stringify(result) + ' were extracted from the unsorted list ' + JSON.stringify(input) + '.');

      input = [1, 1, 1, 2, 2, 3];
      result = _.uniq(input, true);
      assert.equal(result.join(', '), '1, 2, 3', 'The unique elements ' + JSON.stringify(result) + ' were extracted from the sorted list ' + JSON.stringify(input) + '.');
    });

    QUnit.test('underscore: indexOf', function(assert) {
      assert.equal(_.indexOf(default_list, 2), 1, 'The index of "2" in the array ' + JSON.stringify(default_list) + ' is 1.');
    });

    QUnit.test('understore: sortedIndex', function(assert) {
      let list = [10, 20, 30, 40, 50];
      let search = 35;
      let result = _.sortedIndex(list, function(a, b) { return a < b ? -1 : a > b ? 1 : 0; }, search);
      assert.equal(result, 3, search + ' should be inserted at index ' + result + ' of the array ' + JSON.stringify(list));
    });

    QUnit.test('underscore: zip', function(assert) {
      const names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];
      const result = _.zip(names, ages, leaders);
      assert.equal(_.toString(result), 'moe,30,true,larry,40,,curly,50,', 'All given arrays ' + JSON.stringify(names) + ', ' + JSON.stringify(ages) + ', ' + JSON.stringify(leaders) + ' were merged together to return ' + JSON.stringify(result) + '.');
    });

  });
});
