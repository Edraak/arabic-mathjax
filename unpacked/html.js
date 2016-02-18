MathJax.Hub.Config({
  'HTML-CSS': {
    undefinedFamily: 'Amiri',
    styles: {
      '.mfliph': {
        'display': 'inline-block !important',
        '-moz-transform': 'scaleX(-1)',
        '-webkit-transform': 'scaleX(-1)',
        '-o-transform': 'scaleX(-1)',
        'transform': 'scaleX(-1)',
        '-ms-filter': 'fliph',
        'filter': 'fliph'
      },
      '.mar': {
        'font-family': 'Amiri !important',
        'font-style': 'normal !important'
      }
    }
  }
});


MathJax.Hub.Register.StartupHook('mml Jax Ready', function () {
  MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function () {
    MathJax.Hub.Register.StartupHook('Arabic Ext TeX Ready', function () {
      var MML = MathJax.ElementJax.mml;

      var flipHorizontalElement = function (token, element) {
        var className = '';

        if ('ar' === token.Get('fontLang')) {
          className += ' ' + 'mar';
        }

        if (token.Get('fliph')) {
          var flipElement = document.createElement('span');
          className += ' ' + 'mfliph';

          flipElement.className += ' ' + className;

          if (Node.TEXT_NODE === element.firstChild.nodeType) {
            flipElement.textContent = element.textContent;
            element.textContent = '';
          } else {
            while (element.childNodes.length) {
              flipElement.appendChild(element.firstChild);
            }
          }

          element.appendChild(flipElement);
        } else {
          element.className += ' ' + className;
        }
      };

      var miToHTML = MML.mi.prototype.toHTML;
      MML.mi.Augment({
        toHTML: function (span) {

          var element = miToHTML.apply(this, [span]);

          if (Node.TEXT_NODE === element.firstChild.nodeType) {
            flipHorizontalElement(this, element);
          } else {
            flipHorizontalElement(this, element.firstChild);
          }

          return element;
        }
      });

      ['mn', 'mo', 'mtext', 'msubsup', 'mrow'].forEach(function (name) {
        var originalToHTML = MML[name].prototype.toHTML;

        MML[name].Augment({
          toHTML: function (span) {
            var element = originalToHTML.apply(this, [span]);
            flipHorizontalElement(this, element);
            return element;
          }
        });
      });
    });
  });
});





