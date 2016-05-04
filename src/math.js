MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  var Text = MathJax.Extension.Arabic.Text;

  MathJax.Hub.CombineConfig("Arabic", {
      identifiersMap: {
        // Math functions
        'sin': 'جا',
        'cos': 'جتا',
        'tan': 'ظا',
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
