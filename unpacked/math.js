MathJax.Hub.Config({
  Arabic: {
    identifiersMap: {
      // Math functions
      'sin': 'جا',
      'cos': 'جتا',
      'tan': 'ظا'
    }
  }
});

MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  // Better localized Zero
  var TeX = MathJax.Arabic.TeX;

  MathJax.Hub.Config({
    Arabic: {
      dict: {
        // A macros to force English zero in both languages
        "ZeroAr": ["zero", TeX('0', '\\text{0}')]
      }
    }
  });

  MathJax.Hub.Register.StartupHook('Arabic TeX Ready', function () {
    // By default, a lonely Zero is converted into `صفر`
    var TEX = MathJax.InputJax.TeX;
    var texParseArabicNumber = TEX.Parse.prototype.arabicNumber;

    TEX.Parse.Augment({
      arabicNumber: function (token) {
        var text = token.data[0].data[0];
        if ('0' === text) {
          text = 'صفر';

          token.data[0].data[0] = text;
          token = token.With({
            fontLang: 'ar'
          });

          return this.flipHorizontal(token);
        } else {
          return texParseArabicNumber.apply(this, [token]);
        }
      }
    });
  });
});

