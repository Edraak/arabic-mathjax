/*!
 * The MIT License
 *
 * Copyright (c) 2015-2016 The Queen Rania Foundation for Education and Development
 *
 * http://www.qrf.org
 * http://www.edraak.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  MathJax.Extension.Arabic.config = MathJax.Hub.CombineConfig('Arabic', {
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
      'l': 'ل'
    }
  });
});

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
      'mfrac',
      'mi',
      'mn',
      'mo',
      'mrow',
      'ms',
      'msqrt',
      'msubsup',
      'mroot',
      'mtext'
    ].forEach(makeElementFlippable);

    MathJax.Hub.Register.StartupHook('HTML-CSS mtable Ready', function () {
      makeElementFlippable('mtable');

      MathJax.Hub.Startup.signal.Post('Arabic mtable Ready');
    });


    MathJax.Hub.Startup.signal.Post('Arabic Ready');
  });
});

MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  var Text = MathJax.Extension.Arabic.Text;

  MathJax.Hub.CombineConfig("Arabic", {
      identifiersMap: {
        // Math functions
        'sin': 'جا',
        'cos': 'جتا',
        'tan': 'ظا',
        'cot': 'ظتا',
        'sec': 'قا',
        'csc': 'قتا',
        'log': 'لو'
      },
      // Limits
      operatorsMap: {
        'lim': 'نهــا'
      }
    });

  MathJax.Extension.Arabic.config = MathJax.Hub.CombineConfig('Arabic', {
    dict: {
      // A macros to force English zero in both languages
      "Zero": ["zero", Text('0', 'صفر')],  // Better localized Zero
      "Radius": ["radius", Text('r', 'نق')],  // Circle radius
      "Area": ["Area", Text('A', 'م')]  // Area of circles and other stuff
    }
  });
});

MathJax.Extension.Arabic = {
  version: '1.0.0',
  config: MathJax.Hub.CombineConfig("Arabic", {
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
      // English to Arabic punctuations
      ',': '،',
      ';': '؛'
    }
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
        parsers[key] = dict[key][1]; // Parser function
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
        this.stack.env.lang = 'ar';
        var arg = this._getArgumentMML(name);
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

// This file starting with the letter `z` to make sure it gets concatenated last!
MathJax.Ajax.loadComplete("[Contrib]/arabic/unpacked/arabic.js");
