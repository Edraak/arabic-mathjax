var renderEquations = function () {
  var $ = jQuery;

  var loadTestCases = function (cb) {
    $.get('testcases.yml', function (testcasesYAMLStr) {
      cb(jsyaml.load(testcasesYAMLStr));
    });
  };


  $.get('equations.html', function (template) {
    loadTestCases(function (testCases) {
      var rendered = Mustache.render(template, {
        equations: testCases.equations.reverse()
      });

      $('#equations').html(rendered);


      var render = function () {
        var $scriptTemplate = $('<script type="math/tex; mode=display"><\/script>');
        var equation = $('#dynamic-equation').val();

        $('#dynamic-ar').html(
          $scriptTemplate.clone().html(
            '\\ar{' + equation + '}'
          )
        );

        $('#dynamic-en').html(
          $scriptTemplate.clone().html(
            equation
          )
        );

        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      };

      $('#dynamic-equation').change(render);
      $('#show-dynamic-equation').click(render);

      render();
    });
  });
};
