MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  MathJax.Hub.Register.StartupHook('TeX Jax Ready', function () {
    var dict = MathJax.Hub.config.Arabic.dict;

    MathJax.InputJax.TeX.Definitions.Add({
      macros: function () {
        var definitions = {};

        Object.keys(dict).forEach(function (key) {
          var texCommand = dict[key][0];
          definitions[texCommand] = key;
        });

        return definitions;
      }()
    });

    MathJax.InputJax.TeX.Parse.Augment(function () {
      var parsers = {};

      Object.keys(dict).forEach(function (key) {
        parsers[key] = dict[key][1]; // Parser function
      });

      return parsers;
    }());

    MathJax.Hub.Startup.signal.Post('Arabic TeX Ready');
  });
});
