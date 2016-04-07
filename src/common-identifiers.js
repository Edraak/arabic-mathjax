MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  MathJax.Extension.Arabic.config = MathJax.Hub.CombineConfig('Arabic', {
    identifiersMap: {
      // Sets operations, and other stuff
      'A': 'أ',
      'B': 'ب',
      'C': 'جـ',

      // Variable name
      'a': 'أ',

      // Variable name
      // TODO: Consider using Arabic letter dotless beh 0x66e instead
      'b': 'ب',

      // Variable name.
      // Suffixed with Unicode Arabic Tatweel 0x0640
      'c': 'حـ',

      // Mixed use (Function, variable and (dx))
      'd': 'د',

      // Mixed use. With Unicode Arabic Tatweel 0x0640
      'e': 'هـ',

      // Variable name
      'n': 'ن',

      // Mixed use
      'm': 'م',
      'l': 'ل',

      // Function name
      // TODO: Consider using dotless qaf (ٯ) instead
      'f': 'ق',

      // Function name
      'g': 'د',

      // Mixed use
      'k': 'ك',

      // Mixed use
      'r': 'ر',
      't': 'ت',

      // Variable names
      'x': 'س',
      'y': 'ص',
      'z': 'ع'
    }
  });
});
