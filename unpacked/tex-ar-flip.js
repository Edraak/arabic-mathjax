MathJax.Hub.Config({
  TeX: {
    // Needed to provide the method `GetArgumentMML`
    extensions: ['HTML.js']
  }
});

MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  MathJax.Hub.Register.StartupHook('TeX HTML Ready', function () {
    var TEX = MathJax.InputJax.TeX;
    var TEXDEF = TEX.Definitions;

    TEXDEF.Add({
      macros: {
        'ar': 'HandleArabic',
        'alwaysar': 'MarkAsArabic',
        'fliph': 'HandleFlipHorizontal'
      }
    });

    TEX.Parse.Augment({
      HandleArabic: function (name) {
        if (MathJax.Hub.config.Arabic.isArabicPage) {
          this.MarkAsArabic(name);
        }
      },
      MarkAsArabic: function (name) {
        this.stack.env.lang = 'ar';

        var arg = this.GetArgumentMML(name);

        this.Push(this.flipHorizontal(arg).With({
          lang: 'ar'
        }));
      },
      HandleFlipHorizontal: function (name) {
        var arg = this.GetArgumentMML(name);
        this.Push(this.flipHorizontal(arg));
      },
      flipHorizontal: function (token) {
        return token.With({
          // Invert the value, because flipping twice means, it is not flipped
          fliph: !token.Get('fliph')
        });
      }
    });
  });
});

