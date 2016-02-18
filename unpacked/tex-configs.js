;(function () {
  MathJax.Arabic = {
    Dict: {},
    NumbersMap: {
      '0': '٠',
      '1': '١',
      '2': '٢',
      '3': '٣',
      '4': '٤',
      '5': '٥',
      '6': '٦',
      '7': '٧',
      '8': '٨',
      '9': '٩'
    },
    OperatorsMap: {
      // English to Arabic comma
      ',': '،'
    },
    IdentifiersMap: {},
    AugmentObject: function (obj, augments) {
      Object.keys(augments).forEach(function (key) {
        obj[key] = augments[key];
      });
    },
    AugmentDict: function (dict) {
      MathJax.Arabic.AugmentObject(MathJax.Arabic.Dict, dict);
    },
    ArabicTeX: function (english, arabic) {
      return function (name) {
        var TEX = MathJax.InputJax.TeX;

        var tex;
        if ('ar' === this.stack.env.lang) {
          tex = arabic;
        } else {
          tex = english;
        }

        this.Push(TEX.Parse(tex).mml());
      };
    },
    ArabicText: function (english, arabicText) {
      return MathJax.Arabic.ArabicTeX(english, '\\fliph{\\text{' + arabicText + '}}');
    },
    ArabicTextWithSpace: function (english, arabicText) {
      var arabic = '\\ \\fliph{\\text{' + arabicText + '}}';

      return function (name) {
        var TEX = MathJax.InputJax.TeX;

        if ('ar' === this.stack.env.lang) {
          this.Push(TEX.Parse(arabic).mml());
        } else {
          this.Push(TEX.Parse(english).mml());
        }
      };
    },
    ArabicSymbols: function (english, arabicSymbols) {
      var arabicTeX = arabicSymbols.replace(
        /([\u0600-\u06FF]+)/g, // Match Arabic language
        '\\fliph{\\text{$1}}'
      );

      return MathJax.Arabic.ArabicTeX(english, arabicTeX);
    },
    SetArabicDetector: function (arabicDetector) {
      MathJax.Arabic.IsArabicPage = arabicDetector;
    },
    IsArabicPage: function () {
      return document.documentElement.lang === 'ar';
    }
  };

  MathJax.Hub.Post('Arabic Ext Dict Ready');
})();
