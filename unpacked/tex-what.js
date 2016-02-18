MathJax.Hub.Register.StartupHook('Arabic TeX Ready', function () {
  MathJax.Hub.Register.StartupHook('TeX HTML Ready', function () {
    var TEX = MathJax.InputJax.TeX;

    var texParseMMLToken = TEX.Parse.prototype.mmlToken;

    TEX.Parse.Augment({
      arabicNumber: function (token) {
        var numbersMap = MathJax.Hub.config.Arabic.numbersMap;
        var text = token.data[0].data[0];
        var mapped = text;

        if ('0' === mapped) {
          // Special case for the Arabic zero
          mapped = 'صفر';
        } else {
          Object.keys(numbersMap).forEach(function (arabicNumber) {
            var hindiNumber = numbersMap[arabicNumber];
            var regex = new RegExp('' + arabicNumber, 'g');
            mapped = mapped.replace(regex, hindiNumber);
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
      mmlToken: function (token) {
        // TODO: Check for possible incompatibility with boldsymbol extension
        var parsedToken = texParseMMLToken.apply(this, [token]);

        if ('ar' === this.stack.env.lang) {
          if ('mn' === token.type) {
            return this.arabicNumber(parsedToken);
          } else if ('mi' === parsedToken.type) {
            return this.arabicIdentifier(parsedToken);
          } else if ('mo' === parsedToken.type) {
            return this.arabicOperator(parsedToken);
          }
        }
        return parsedToken;
      }
    });
  });
});
