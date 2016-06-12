MathJax.Hub.Register.StartupHook('TeX Jax Ready', function () {
  MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
    var TEX = MathJax.InputJax.TeX;
    var Arabic = MathJax.Extension.Arabic;
    var texParsePush = TEX.Parse.prototype.Push;
    var texParseMMLToken = TEX.Parse.prototype.mmlToken;
    var texParseAlignedArray = TEX.Parse.prototype.AlignedArray;
    var dict = MathJax.Hub.config.Arabic.dict;

    var englishNumbersRegExp = /[0-9]/g;

    var escapeRegExp = (function () {
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reHasRegExpChar = new RegExp(reRegExpChar.source);

      return function (string) {
        return (string && reHasRegExpChar.test(string))
          ? string.replace(reRegExpChar, '\\$&')
          : string;
      };
    }());

    var getKeysRegExp = function (map) {
      var keys = Object.keys(map).sort(function (a, b) {
        return b.length - a.length;
      });

      return new RegExp(keys.map(escapeRegExp).join('|'), 'gi');
    };

    var identifiersMap = MathJax.Hub.config.Arabic.identifiersMap;
    var identifiersKeysRegExp = getKeysRegExp(identifiersMap);

    var operatorsMap = MathJax.Hub.config.Arabic.operatorsMap;
    var operatorsKeysRegExp = getKeysRegExp(operatorsMap);


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
      arabicNumber: function (token) {
        var numbersMap = MathJax.Hub.config.Arabic.numbersMap;
        var text = token.data[0].data[0];
        var mapped = text.replace(englishNumbersRegExp, function (m) {
          return numbersMap[m];
        });

        if (mapped !== text) {
          token.data[0].data[0] = mapped;
          token.arabicFontLang = 'ar';
        }

        return this.flipHorizontal(token);
      },
      arabicIdentifier: function (token) {
        var text = token.data[0].data[0];

        if ('chars' === token.data[0].type) {
          // English Symbols like X and Y
          var mapped = text.replace(identifiersKeysRegExp, function (m) {
            return identifiersMap[m.toLowerCase()];
          });

          if (mapped !== text) {
            token.data[0].data[0] = mapped;
            token.arabicFontLang = 'ar';
          }
        }

        return this.flipHorizontal(token);
      },
      arabicOperator: function (token) {
        var text = token.data[0].data[0];
        var mapped = text.replace(operatorsKeysRegExp, function (m) {
          return operatorsMap[m];
        });

        if (mapped !== text) {
          token = this.flipHorizontal(token);
          token.arabicFontLang = 'ar';
          token.data[0].data[0] = mapped;
        }

        return token;
      },
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
      Push: function () {
        var beforeLang = this.stack.env.lang;
        var retVal = texParsePush.apply(this, arguments);

        // Huge giant hack to propagate `lang` from Arrays (and other environments?)
        // to their children fractions and others.
        if (beforeLang) {
          if (!this.stack.env.lang) {
            this.stack.env.lang = beforeLang;
          }
        }

        return retVal;
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

        console.log('originalLang', originalLang);
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
});
