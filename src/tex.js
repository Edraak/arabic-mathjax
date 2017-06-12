MathJax.Extension.Arabic = {
  version: '1.0.0',
  config: MathJax.Hub.CombineConfig("Arabic", {
    dict: {
      // A macros to force English zero in both languages
      'Zero': ['zero', 'Text', ['0', 'صفر']],  // Better localized Zero
      'Radius': ['radius', 'Text', ['r', 'نق']],  // Circle radius
      'Area': ['Area', 'Text', ['A', 'م']]  // Area of circles and other stuff
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


MathJax.Hub.Register.StartupHook('TeX Jax Ready', function () {
  var TEX = MathJax.InputJax.TeX;
  var Arabic = MathJax.Extension.Arabic;

  var texParseMMLToken = TEX.Parse.prototype.mmlToken;
  var dict = MathJax.Hub.config.Arabic.dict;

  var escapeRegExp = (function () {
    var regExpChar = /[\\^$.*+?()[\]{}|]/g;

    return function (string) {
      return string.replace(regExpChar,'\\$&');
    };
  }());

  var getKeysRegExp = function (map) {
    var keys = Object.keys(map).sort(function (a, b) {
      return b.length - a.length;
    });

    return new RegExp(keys.map(escapeRegExp).join('|'), 'gi');
  };


  TEX.Definitions.Add({
    macros: {
      'ar': 'HandleArabic',
      'alwaysar': 'MarkAsArabic',
      'fliph': 'HandleFlipHorizontal',
      'transx': 'TranslateTeX',
      'transt': 'TranslateText',
      'transs': 'TranslateSymbols'
    }
  });

  var array = TEX.Stack.Item.array;
  var arrayClearEnv = array.prototype.clearEnv;
  var arrayInit = array.prototype.Init;

  array.Augment({
    Init: function () {
      // Overcome the copyEnv issue that has been introduced in:
      //  - Pull Request: https://github.com/mathjax/MathJax/pull/1523
      //
      // Otherwise arrays won't be Arabized.
      //  - Bug Report: https://groups.google.com/forum/#!topic/mathjax-dev/cWoTKcwMqmY
      arrayInit.apply(this, arguments);
      this.copyEnv = true;
    },
    clearEnv: function () {
      // Propagate `lang` from Arrays to their children fractions and others.
      // This is a bug in the MathJax itself, so this code should be removed once the bug is fixed.
      // Follow up on https://github.com/mathjax/MathJax/pull/1523
      // It's still not clear how/when a proper solution is possible.
      var lang = this.env.lang;

      arrayClearEnv.apply(this, arguments);

      if (lang) {
        this.env.lang = lang;
      }
    }
  });

  TEX.Definitions.Add({
    macros: function () {
      var definitions = {};

      Object.keys(dict).forEach(function (key) {
        var texCommand = dict[key][0];
        definitions[texCommand] = key;
      });

      return definitions;
    }()
  });


  TEX.Parse.Augment(function () {
    var parsers = {};

    Object.keys(dict).forEach(function (key) {
      var helperName = dict[key][1];  // Text, TeX or Symbols
      var helperParams = dict[key][2];

      parsers[key] = Arabic[helperName].apply(null, helperParams);
    });

    return parsers;
  }());


  TEX.Parse.Augment({
    flipHorizontal: function (token) {
      token.arabicFlipH = !token.arabicFlipH;
        // Invert the value, because flipping twice means, it is not flipped
      return token;
    },
    arabicNumber: (function () {
      var englishNumbersRegExp = /[0-9]/g;
      var numbersMap = MathJax.Hub.config.Arabic.numbersMap;

      var replaceNumber = function (m) {
        return numbersMap[m];
      };

      return function (token) {
        var text = token.data[0].data[0];
        var mapped = text.replace(englishNumbersRegExp, replaceNumber);

        if (mapped !== text) {
          token.data[0].data[0] = mapped;
          token.arabicFontLang = 'ar';
        }

        return this.flipHorizontal(token);
      }
    }()),
    arabicIdentifier: (function () {
      var identifiersMap = MathJax.Hub.config.Arabic.identifiersMap;
      var identifiersKeysRegExp = getKeysRegExp(identifiersMap);

      var replaceIdentifier = function (m) {
        return identifiersMap[m.toLowerCase()];
      };

      return function (token) {
        var text = token.data[0].data[0];

        if ('chars' === token.data[0].type) {
          // English Symbols like X and Y
          var mapped = text.replace(identifiersKeysRegExp, replaceIdentifier);

          if (mapped !== text) {
            token.data[0].data[0] = mapped;
            token.arabicFontLang = 'ar';
          }
        }

        return this.flipHorizontal(token);
      }
    }()),
    arabicOperator: (function () {
      var operatorsMap = MathJax.Hub.config.Arabic.operatorsMap;
      var operatorsKeysRegExp = getKeysRegExp(operatorsMap);

      var replaceOperator = function (m) {
        return operatorsMap[m];
      };

      return function (token) {
        var text = token.data[0].data[0];
        var mapped = text.replace(operatorsKeysRegExp, replaceOperator);

        if (mapped !== text) {
          token = this.flipHorizontal(token);
          token.arabicFontLang = 'ar';
          token.data[0].data[0] = mapped;
        }

        return token;
      }
    }()),
    _getArgumentMML: function (name) {
      //  returns an argument that is a single MathML element
      //  (in an mrow if necessary)
      //
      //  This functions has been copied here from extensions/TeX/HTML.js, to avoid
      //  adding a dependency.
      //
      //  TODO: Consider importing (as a dependency) this from HTML.js instead!
      var arg = this.ParseArg(name);
      if (arg.inferred && arg.data.length === 1) {
        arg = arg.data[0];
      } else {
        delete arg.inferred;
      }

      return arg;
    },
    mmlToken: function (token) {
      // TODO: Check for possible incompatibility with boldsymbol extension
      var parsedToken = texParseMMLToken.call(this, token);

      if ('ar' === this.stack.env.lang) {
        this.markArabicToken(parsedToken);
      }

      return parsedToken;
    },
    markArabicToken: function (token) {
      if ('mn' === token.type) {
        return this.arabicNumber(token);
      } else if ('mi' === token.type) {
        return this.arabicIdentifier(token);
      } else if ('mo' === token.type) {
        return this.arabicOperator(token);
      }

      return token;
    },
    HandleArabic: function (name) {
      if (MathJax.Hub.config.Arabic.isArabicPage) {
        this.MarkAsArabic(name);
      }
    },
    TranslateTeX: function (name) {
      var english = this.GetArgument(name);
      var arabicText = this.GetArgument(name);
      var helper = Arabic.TeX(english, arabicText);
      return helper.call(this, name);
    },
    TranslateText: function (name) {
      var english = this.GetArgument(name);
      var arabicText = this.GetArgument(name);
      var helper = Arabic.Text(english, arabicText);
      return helper.call(this, name);
    },
    TranslateSymbols: function (name) {
      var english = this.GetArgument(name);
      var arabicText = this.GetArgument(name);
      var helper = Arabic.Symbols(english, arabicText);
      return helper.call(this, name);
    },
    MarkAsArabic: function (name) {
      var originalLang = this.stack.env.lang;

      this.stack.env.lang = 'ar';
      var arg = this._getArgumentMML(name);

      this.stack.env.lang = originalLang;  // Reset the language for other elements.

      this.Push(this.flipHorizontal(arg));
    },
    HandleFlipHorizontal: function (name) {
      var arg = this._getArgumentMML(name);
      this.Push(this.flipHorizontal(arg));
    }
  });

  MathJax.Hub.Startup.signal.Post('Arabic TeX Ready');
});
