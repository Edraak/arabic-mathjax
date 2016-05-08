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
MathJax.Hub.Register.StartupHook("Arabic TeX Startup",function(){MathJax.Extension.Arabic.config=MathJax.Hub.CombineConfig("Arabic",{identifiersMap:{a:"\u0623",b:"\u0628",c:"\u062c\u0640",x:"\u0633",y:"\u0635",z:"\u0639",n:"\u0646",f:"\u0642",g:"\u062c\u0640",h:"\u0647\u0640",k:"\u0643",r:"\u0631",t:"\u062a",d:"\u062f",e:"\u0647\u0640",m:"\u0645",l:"\u0644"}})}),MathJax.Hub.Register.StartupHook("HTML-CSS Jax Require",function(){MathJax.Hub.Config({"HTML-CSS":{styles:{".MathJax .mfliph":{display:"inline-block !important","-moz-transform":"scaleX(-1)","-webkit-transform":"scaleX(-1)","-o-transform":"scaleX(-1)",transform:"scaleX(-1)","-ms-filter":"fliph",filter:"fliph"},".MathJax .mar":{"font-style":"normal !important"},".MathJax .mar > span":{"font-style":"normal !important"}}}})}),MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){MathJax.Hub.Register.StartupHook("Arabic TeX Ready",function(){var a=MathJax.ElementJax.mml,t=function(t){var r=a[t].prototype.toHTML;a[t].Augment({toHTML:function(){var a=r.apply(this,arguments);if(this.arabicFlipH){var t=document.createElement("span"),n=" mfliph";if("ar"===this.arabicFontLang&&(n+=" mar"),t.className=n,a.firstChild)for(;a.firstChild;)t.appendChild(a.firstChild);a.appendChild(t)}return a}})};["mfrac","mi","mn","mo","mrow","ms","msqrt","msubsup","mroot","mtext"].forEach(t),MathJax.Hub.Register.StartupHook("HTML-CSS mtable Ready",function(){t("mtable"),MathJax.Hub.Startup.signal.Post("Arabic mtable Ready")}),MathJax.Hub.Startup.signal.Post("Arabic Ready")})}),MathJax.Hub.Register.StartupHook("Arabic TeX Startup",function(){var a=MathJax.Extension.Arabic.Text;MathJax.Hub.CombineConfig("Arabic",{identifiersMap:{sin:"\u062c\u0627",cos:"\u062c\u062a\u0627",tan:"\u0638\u0627",cot:"\u0638\u062a\u0627",sec:"\u0642\u0627",csc:"\u0642\u062a\u0627",log:"\u0644\u0648"},operatorsMap:{lim:"\u0646\u0647\u0640\u0640\u0627"}}),MathJax.Extension.Arabic.config=MathJax.Hub.CombineConfig("Arabic",{dict:{Zero:["zero",a("0","\u0635\u0641\u0631")],Radius:["radius",a("r","\u0646\u0642")],Area:["Area",a("A","\u0645")]}})}),MathJax.Extension.Arabic={version:"1.0.0",config:MathJax.Hub.CombineConfig("Arabic",{dict:{},isArabicPage:"ar"===document.documentElement.lang,identifiersMap:{},numbersMap:{0:"\u0660",1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669"},operatorsMap:{",":"\u060c",";":"\u061b"}}),arabicLanguageRegExp:/([\u0600-\u06FF]+)/g,TeX:function(a,t){return function(r){var n,i=MathJax.InputJax.TeX;n="ar"===this.stack.env.lang?t:a,this.Push(i.Parse(n).mml())}},Text:function(a,t){return MathJax.Extension.Arabic.TeX(a,"\\fliph{\\text{"+t+"}}")},Symbols:function(a,t){var r=t.replace(MathJax.Extension.Arabic.arabicLanguageRegExp,"\\fliph{\\text{$1}}");return MathJax.Extension.Arabic.TeX(a,r)}},MathJax.Hub.Startup.signal.Post("Arabic TeX Startup"),MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){MathJax.Hub.Register.StartupHook("Arabic TeX Startup",function(){var a=MathJax.InputJax.TeX,t=MathJax.Extension.Arabic,r=a.Parse.prototype.Push,n=a.Parse.prototype.mmlToken,i=(a.Parse.prototype.AlignedArray,MathJax.Hub.config.Arabic.dict),e=/[0-9]/g,o=function(){var a=/[\\^$.*+?()[\]{}|]/g,t=new RegExp(a.source);return function(r){return r&&t.test(r)?r.replace(a,"\\$&"):r}}(),s=function(a){var t=Object.keys(a).sort(function(a,t){return t.length-a.length});return new RegExp(t.map(o).join("|"),"gi")},c=MathJax.Hub.config.Arabic.identifiersMap,u=s(c),l=MathJax.Hub.config.Arabic.operatorsMap,h=s(l);a.Definitions.Add({macros:{ar:"HandleArabic",alwaysar:"MarkAsArabic",fliph:"HandleFlipHorizontal",transx:"TranslateTeX",transt:"TranslateText",transs:"TranslateSymbols"}}),a.Definitions.Add({macros:function(){var a={};return Object.keys(i).forEach(function(t){var r=i[t][0];a[r]=t}),a}()}),a.Parse.Augment(function(){var a={};return Object.keys(i).forEach(function(t){a[t]=i[t][1]}),a}()),a.Parse.Augment({flipHorizontal:function(a){return a.arabicFlipH=!a.arabicFlipH,a},arabicNumber:function(a){var t=MathJax.Hub.config.Arabic.numbersMap,r=a.data[0].data[0],n=r.replace(e,function(a){return t[a]});return n!==r&&(a.data[0].data[0]=n,a.arabicFontLang="ar"),this.flipHorizontal(a)},arabicIdentifier:function(a){var t=a.data[0].data[0];if("chars"===a.data[0].type){var r=t.replace(u,function(a){return c[a.toLowerCase()]});r!==t&&(a.data[0].data[0]=r,a.arabicFontLang="ar")}return this.flipHorizontal(a)},arabicOperator:function(a){var t=a.data[0].data[0],r=t.replace(h,function(a){return l[a]});return r!==t&&(a=this.flipHorizontal(a),a.arabicFontLang="ar",a.data[0].data[0]=r),a},_getArgumentMML:function(a){var t=this.ParseArg(a);return t.inferred&&1===t.data.length?t=t.data[0]:delete t.inferred,t},Push:function(){var a=this.stack.env.lang,t=r.apply(this,arguments);return a&&(this.stack.env.lang||(this.stack.env.lang=a)),t},mmlToken:function(a){var t=n.call(this,a);return"ar"===this.stack.env.lang&&this.markArabicToken(t),t},markArabicToken:function(a){return"mn"===a.type?this.arabicNumber(a):"mi"===a.type?this.arabicIdentifier(a):"mo"===a.type?this.arabicOperator(a):a},HandleArabic:function(a){MathJax.Hub.config.Arabic.isArabicPage&&this.MarkAsArabic(a)},TranslateTeX:function(a){var r=this.GetArgument(a),n=this.GetArgument(a),i=t.TeX(r,n);return i.call(this,a)},TranslateText:function(a){var r=this.GetArgument(a),n=this.GetArgument(a),i=t.Text(r,n);return i.call(this,a)},TranslateSymbols:function(a){var r=this.GetArgument(a),n=this.GetArgument(a),i=t.Symbols(r,n);return i.call(this,a)},MarkAsArabic:function(a){this.stack.env.lang="ar";var t=this._getArgumentMML(a);this.Push(this.flipHorizontal(t))},HandleFlipHorizontal:function(a){var t=this._getArgumentMML(a);this.Push(this.flipHorizontal(t))}}),MathJax.Hub.Startup.signal.Post("Arabic TeX Ready")})}),MathJax.Ajax.loadComplete("[Contrib]/arabic/arabic.js");