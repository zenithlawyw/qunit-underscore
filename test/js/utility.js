$(document).ready(function() {
  QUnit.module('Utility', function() {

    QUnit.test('underscore: uniqueId', function(assert) {
      const ids = [];
      let i = 0;
      while (i++ < 100) ids.push(_.uniqueId());
      assert.equal(_.uniq(ids).length, i-1, 'A list of globally-unique id was generated.');
    });

    QUnit.test('underscore: template', function(assert) {
      const basicTemplate = _.template('<%= thing %> is getting on my noives!');
      let result = basicTemplate({thing : 'This'});
      assert.equal(result, 'This is getting on my noives!', 'The template can be rendered by basic attribute interpolation.');

      const fancyTemplate = _.template('<% for (key in people) { %><li><%= people[key] %></li><% } %>');
      result = fancyTemplate({ people : { moe : 'Moe', larry : 'Larry', curly : 'Curly' } });
      assert.equal(result, '<li>Moe</li><li>Larry</li><li>Curly</li>', 'The template can be rendered with arbitrary javascript object.');
    });

  });
});
