MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  MathJax.Hub.Register.StartupHook('TeX Jax Ready', function () {
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
        if (MathJax.Arabic.IsArabicPage()) {
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
          fliph: !token.Get('fliph')
        });
      }
    });
  });
});

