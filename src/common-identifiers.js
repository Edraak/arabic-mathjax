MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  MathJax.Extension.Arabic.config = MathJax.Hub.CombineConfig('Arabic', {
    identifiersMap: {
      // Set operations, and other stuff
      'A': 'أ',
      'B': 'ب',
      'C': 'جـ',

      // Variable names
      'a': 'أ',
      'b': 'ب',  // TODO: Consider using Arabic letter dotless beh 0x66e instead
      'c': 'حـ',  // Suffixed with Unicode Arabic Tatweel 0x0640
      'x': 'س',
      'y': 'ص',
      'z': 'ع',
      'n': 'ن',

      // Function names
      'f': 'ق',  // TODO: Consider using dotless qaf (ٯ) instead
      'g': 'حـ',  // With Unicode Arabic Tatweel 0x0640
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
