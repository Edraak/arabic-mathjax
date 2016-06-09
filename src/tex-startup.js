MathJax.Extension.Arabic = {
  version: '1.0.0',
  config: MathJax.Hub.CombineConfig("Arabic", {
    dict: {
      // A macros to force English zero in both languages
      'Zero': ['zero', Text('0', 'صفر')],  // Better localized Zero
      'Radius': ['radius', Text('r', 'نق')],  // Circle radius
      'Area': ['Area', Text('A', 'م')]  // Area of circles and other stuff
    },
    identifiersMap: {
      // Variable names
      'a': 'أ',
      'b': 'ب',  // TODO: Consider using Arabic letter dotless beh 0x66e instead
      'c': 'جـ',  // Suffixed with Unicode Arabic Tatweel 0x0640
      'x': 'س',
      'y': 'ص',
      'z': 'ع',
      'n': 'ن',

      // Function names
      'f': 'ق',  // TODO: Consider using dotless qaf (ٯ) instead
      'g': 'جـ',  // With Unicode Arabic Tatweel 0x0640
      'h': 'هـ',  // With Unicode Arabic Tatweel 0x0640

      // Mixed use
      'k': 'ك',
      'r': 'ر',
      't': 'ت',
      'd': 'د',  // Function, variable and (dx)
      'e': 'هـ',  // With Unicode Arabic Tatweel 0x0640
      'm': 'م',
      'l': 'ل',

      // Math functions
      'sin': 'جا',
      'cos': 'جتا',
      'tan': 'ظا',
      'cot': 'ظتا',
      'sec': 'قا',
      'csc': 'قتا',
      'log': 'لو'
    },
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
      // English to Arabic punctuations
      ',': '،',
      ';': '؛',
      // Limits
      'lim': 'نهــا'
    },
    isArabicPage: (document.documentElement.lang === 'ar')
  }),
  arabicLanguageRegExp: /([\u0600-\u06FF]+)/g,
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

    return MathJax.Extension.Arabic.TeX(english, '\\fliph{\\text{' + arabicText + '}}');
  },
  Symbols: function (english, arabicSymbols) {
    // Creates a translated TeX macro that converts Arabic symbols into text nodes,
    // and treats everything else as normal TeX.
    var arabic = arabicSymbols.replace(
      MathJax.Extension.Arabic.arabicLanguageRegExp,
      '\\fliph{\\text{$1}}'
    );

    return MathJax.Extension.Arabic.TeX(english, arabic);
  }
};

MathJax.Hub.Startup.signal.Post('Arabic TeX Startup');
