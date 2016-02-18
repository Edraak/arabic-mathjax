MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  var ArabicText = MathJax.Arabic.ArabicText;

  MathJax.Arabic.AugmentDict({
    "MegaAr": ["Mega", ArabicText('M', 'ميجا')],
    "NanoAr": ["nano", ArabicText('n', 'نانو')],
    "GigaAr": ["Giga", ArabicText('G', 'جيجا')],
    "TeraAr": ["Tera", ArabicText('T', 'تيرا')],
    "KiloAr": ["kilo", ArabicText('k', 'كيلو')],
    "MicroAr": ["micro", ArabicText('\\mu', 'مايكرو')]
  });
});


MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  var ArabicTeX = MathJax.Arabic.ArabicTeX;

  MathJax.Arabic.AugmentDict({
    "ZeroAr": ["zero", ArabicTeX('0', '\\text{0}')]
  });
});


MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  var ArabicText = MathJax.Arabic.ArabicText;

  MathJax.Arabic.AugmentDict({
    // misc
    "MaxAr": ["max", ArabicText('p', 'اقصى')]
  });
});


MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  var ArabicText = MathJax.Arabic.ArabicText;

  MathJax.Arabic.AugmentDict({
    // physUnits
    "SecondsAr": ["scnd", ArabicText('s', 'ث')],
    "HourAr": ["hour", ArabicText('h', 'ساعة')],
    "DayAr": ["day", ArabicText('\\text{day}', 'يوم')],
    "YearAr": ["year", ArabicText('\\text{year}', 'سنة')],
    "AmpAr": ["Amp", ArabicText('A', 'امبير')],
    "VoltAr": ["volt", ArabicText('v', 'فولت')],
    "KilvenAr": ["Klvn", ArabicText('K', 'كلفن')],
    "HoleAr": ["hole", ArabicText('p', 'ثقب')],
    "WattAr": ["Watt", ArabicText('W', 'واط')],
    "FaradAr": ["F", ArabicText('F', 'فاراد')],
    "CentimeterAr": ["cm", ArabicText('\\text{cm}', 'سم')],
    "GramAr": ["grm", ArabicText('g', 'غرام')]
  });
});


MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  var ArabicText = MathJax.Arabic.ArabicText;

  MathJax.Arabic.AugmentDict({
    // chmUnits
    "PHAr": ["ph", ArabicText('ph', 'ف')],
    "ElectronAr": ["elctrn", ArabicText('n', 'الكترون')]
  });
});


MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  var ArabicText = MathJax.Arabic.ArabicText;

  MathJax.Arabic.AugmentDict({
    // pyhsConsts
    "LightSpeedAr": ["lspeed", ArabicText('c', 'سرعة الضوء')],
    "PlancksAr": ["Plancks", ArabicText('\\hbar', 'ثابت بلانك')],
    "BoltzmannsAr": ["Boltzmanns", ArabicText('k', 'ثابت بولتزمان')],
    "EpsilonZeroAr": ["epsilonzero", ArabicTeX('\\varepsilon_\\zero', '\\fliph{\\varepsilon_\\zero}')]
  });
});


MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  var ArabicText = MathJax.Arabic.ArabicText;

  MathJax.Arabic.AugmentDict({
    // physNames
    "AirMassAr": ["AM", ArabicText('AM', 'كتلة هواء')],
    "ShortCircuitAr": ["sc", ArabicSymbols('sc', 'ق')],
    "PhotovoltaicEnergyAr": ["P", ArabicSymbols('P', 'ط')],
    "INAr": ["inn", ArabicSymbols('in', 'د')],
    "DiffusionLengthAr": ["Ld", ArabicSymbols('L_d', 'ل_ر')],
    "CurrentAr": ["current", ArabicSymbols('I', 'ت')],
    "VoltageAr": ["V", ArabicSymbols('V', 'جـ')]
  });
});


MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
  var ArabicText = MathJax.Arabic.ArabicText;
  var ArabicTeX = MathJax.Arabic.ArabicTeX;
  var ArabicSymbols = MathJax.Arabic.ArabicSymbols;

  MathJax.Arabic.AugmentDict({
    // omarDoesNotKnowIt
    "EKAr": ["ek", ArabicText('e', 'انتشار،ك')],
    "EspsilonRAr": ["er", ArabicTeX('\\epsilon{}r', '\\fliph{\\epsilon{}r}')],
    "CurrentDensityAr": ["J", ArabicSymbols('J', 'ك.ت')],
    "FillFactorAr": ["FF", ArabicSymbols('FF', 'ع.ت')],
    "OpenCircuitAr": ["oc", ArabicSymbols('oc', 'م')],
    "SpreadCoefficientAr": ["D", ArabicSymbols('D', 'م')],
    "RadiationAr": ["rad", ArabicSymbols('l', 'ع')],
    "TemratureAr": ["Tmpr", ArabicSymbols('T', 'د')],
    "ConcentrationReceiverAtomAr": ["NA", ArabicSymbols('NA', 'ن_ق')],
    "ConcentrationDonorAtomAr": ["ND", ArabicSymbols('ND', 'ن_م')],
    "ConcentrationCarierPureAr": ["nii", ArabicSymbols('ni', 'ن_ك')],
    "DeplationAreaWidthAr": ["Wd", ArabicSymbols('W', 'ل_ن')],
    "ElectronsMotionConstantAr": ["mue", ArabicTeX('\\mu{}e', '\\fliph{\\mu{}e}')],
    "DiffusionElectronsAr": ["diffe", ArabicSymbols('\\text{diff},e', 'ن\\ ك')]
  });
});


//MathJax.Hub.Register.StartupHook('Arabic Ext Dict Ready', function () {
//  var ArabicText = MathJax.Arabic.ArabicText;
//  var ArabicTeX = MathJax.Arabic.ArabicTeX;
//  var ArabicSymbols = MathJax.Arabic.ArabicSymbols;
//
//  MathJax.Arabic.AugmentDict({
//    // Solar Energy Course Part #2
//   //'mass': 'MaterialMassAr', 'm', 'ك',
//   //'capacity': 'CapacityAr': 'C', 'ح',
//   //'materialheat': 'MaterialHeat': 'p', 'ن',
//   //'temperature': 'Temperature': 'T', 'د',
//   //'latentheat': 'LatentHeat': 'Q', 'ح_ك',
//   //'latentenergy': 'LatentEnergy': '\\lambda', 'ط_ك',
//   //'heatflux': 'HeatFlux': 'Q_\\text{cond}', 'ح_ت',
//   //'thermalconduct': 'ThermalConductivity': 'K', 'ت_ح',
//   //'area': 'Area': 'A', 'م',
//   //'heattransfcoeff': 'HeatTransferCoefficient': 'h', 'م.ح',
//  });
//});

