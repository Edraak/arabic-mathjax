MathJax.Hub.Config({
  Arabic: {
    dict: {},
    isArabicPage: (document.documentElement.lang === 'ar'),
    identifiersMap: {},
    numbersMap: {
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
    operatorsMap: {
      // English to Arabic comma
      ',': '،'
    }
  }
});


MathJax.Arabic = {
  TeX: function (english, arabic) {
    // Creates a translated TeX macro.

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
  Text: function (english, arabicText) {
    // Creates a translated TeX macro, with an Arabic plain text.

    return MathJax.Arabic.TeX(english, '\\fliph{\\text{' + arabicText + '}}');
  },
  TextWithSpace: function (english, arabicText) {
    // Just like `Text` but adds one space before the Arabic text.

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
  Symbols: function (english, arabicSymbols) {
    // Creates a translated TeX macro that converts Arabic symbols into text nodes,
    // and treats everything else as normal TeX.

    var arabicLanguageRegExp = /([\u0600-\u06FF]+)/g;

    var arabic = arabicSymbols.replace(arabicLanguageRegExp, '\\fliph{\\text{$1}}');

    return MathJax.Arabic.TeX(english, arabic);
  }
};


MathJax.Hub.Startup.signal.Post('Arabic TeX Startup');
