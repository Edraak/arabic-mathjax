MathJax.Hub.Register.StartupHook('HTML-CSS Jax Require', function () {
  MathJax.Hub.Config({
    'HTML-CSS': {
      styles: {
        '.MathJax .mfliph': {
          'display': 'inline-block !important',
          '-moz-transform': 'scaleX(-1)',
          '-webkit-transform': 'scaleX(-1)',
          '-o-transform': 'scaleX(-1)',
          'transform': 'scaleX(-1)',
          '-ms-filter': 'fliph',
          'filter': 'fliph'
        },
        '.MathJax .mar': {
          'font-style': 'normal !important'
        },
        '.MathJax .mar > span': {
          'font-style': 'normal !important'
        }
      }
    }
  });
});


MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function () {
  MathJax.Hub.Register.StartupHook('Arabic TeX Ready', function () {
    var MML = MathJax.ElementJax.mml;

    var makeElementFlippable = function (name) {
      var originalToHTML = MML[name].prototype.toHTML;

      MML[name].Augment({
        toHTML: function () {
          var element = originalToHTML.apply(this, arguments);

          if (this.arabicFlipH) {
            var flipElement = document.createElement('span');

            var className = ' mfliph';  // Keep the leading space

            if ('ar' === this.arabicFontLang) {
              className += ' mar';  // Keep the leading space
            }

            flipElement.className = className;

            if (element.firstChild) {
              while (element.firstChild) {
                flipElement.appendChild(element.firstChild);
              }
            }

            element.appendChild(flipElement);
          }

          return element;
        }
      });
    };

    [
      'mn',
      'mo',
      'mi',
      'msubsup',
      'mrow',
      'mfrac',
      'mtext',
      'ms'
    ].forEach(makeElementFlippable);

    MathJax.Hub.Register.StartupHook('HTML-CSS mtable Ready', function () {
      makeElementFlippable('mtable');

      MathJax.Hub.Startup.signal.Post('Arabic mtable Ready');
    });


    MathJax.Hub.Startup.signal.Post('Arabic Ready');
  });
});
