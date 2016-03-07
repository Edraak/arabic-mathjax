MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  MathJax.Hub.Register.StartupHook('TeX Jax Ready', function () {
    var TEX = MathJax.InputJax.TeX;
    var texParseMMLToken = TEX.Parse.prototype.mmlToken;
    var texParseAlignedArray = TEX.Parse.prototype.AlignedArray;
    var dict = MathJax.Hub.config.Arabic.dict;


    TEX.Definitions.Add({
      macros: {
        'ar': 'HandleArabic',
        'alwaysar': 'MarkAsArabic',
        'fliph': 'HandleFlipHorizontal'
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
        return token.With({
          // Invert the value, because flipping twice means, it is not flipped
          fliph: !token.Get('fliph')
        });
      },
      arabicNumber: function (token) {
        var numbersMap = MathJax.Hub.config.Arabic.numbersMap;
        var text = token.data[0].data[0];
        var mapped = text;

        Object.keys(numbersMap).forEach(function (arabicNumber) {
          var hindiNumber = numbersMap[arabicNumber];
          var regex = new RegExp('' + arabicNumber, 'g');
          mapped = mapped.replace(regex, hindiNumber);
        });

        if (mapped !== text) {
          token.data[0].data[0] = mapped;
          token = token.With({
            fontLang: 'ar'
          });
        }

        return this.flipHorizontal(token);
      },
      arabicIdentifier: function (token) {
        var identifiersMap = MathJax.Hub.config.Arabic.identifiersMap;
        var identifiersKeys = Object.keys(identifiersMap).sort(function (a, b) {
          return b.length - a.length;
        });

        var text = token.data[0].data[0];
        var mapped = text;

        if ('chars' === token.data[0].type) {
          // English Symbols like X and Y
          identifiersKeys.forEach(function (enChar) {
            var arChar = identifiersMap[enChar];
            var regex = new RegExp(enChar, 'g');
            mapped = mapped.replace(regex, arChar);
          });
        }

        if (mapped !== text) {
          token.data[0].data[0] = mapped;
          token = token.With({
            fontLang: 'ar'
          });
        }

        return this.flipHorizontal(token);
      },
      arabicOperator: function (token) {
        var operatorsMap = MathJax.Hub.config.Arabic.operatorsMap;
        var text = token.data[0].data[0];
        var mapped = text;

        Object.keys(operatorsMap).forEach(function (enOperator) {
          var regex = new RegExp('' + enOperator, 'g');
          var arOperator = operatorsMap[enOperator];
          mapped = mapped.replace(regex, arOperator);
        });

        if (mapped !== text) {
          token = this.flipHorizontal(token).With({
            fontLang: 'ar'
          });

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
        if (arg.inferred && arg.data.length == 1)
          {arg = arg.data[0]} else {delete arg.inferred}
        return arg;
      },
      mmlToken: function (token) {
        // TODO: Check for possible incompatibility with boldsymbol extension
        var parsedToken = texParseMMLToken.apply(this, [token]);

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
      AlignedArray: function () {
        // Helper to Arabize the matrices, arrays and piecewise functions.
        var array = texParseAlignedArray.apply(this, arguments);
        var _this = this;

        if ('ar' === this.stack.env.lang) {
          var arrayEndTable = array.EndTable;
          array.EndTable = function () {
            var retVal = arrayEndTable.apply(this, arguments);

            // First level, iterate over the rows
            array.table.forEach(function (row, rowIndex) {
              // Second level, iterate over the columns
              row.data.forEach(function (cell, colIndex) {
                // Third level, iterate over the cell content
                cell.data[0].data.forEach(function (token) {
                  // Skip the first element of the matrix to solve a bug,
                  // not sure why it is there.
                  if (rowIndex || colIndex) {
                    _this.markArabicToken(token);
                  }
                });
              });
            });

            return retVal;
          };
        }

        return array;
      },
      HandleArabic: function (name) {
        if (MathJax.Hub.config.Arabic.isArabicPage) {
          this.MarkAsArabic(name);
        }
      },
      MarkAsArabic: function (name) {
        this.stack.env.lang = 'ar';

        var arg = this._getArgumentMML(name);

        this.Push(this.flipHorizontal(arg).With({
          lang: 'ar'
        }));
      },
      HandleFlipHorizontal: function (name) {
        var arg = this._getArgumentMML(name);
        this.Push(this.flipHorizontal(arg));
      }
    });

    MathJax.Hub.Startup.signal.Post('Arabic TeX Ready');
  });
});
