/* 
 * jQuery fromTemplate Plugin v0.1.0
 *
 * Copyright (c) 2009 Tomas Salfischberger, John Resig
 * See README for license details
 */
(function($) {
  /* Public function on jQuery elements */
  $.fn.fromTemplate = function(str, data, options) {
    var settings = $.extend({}, $.fn.fromTemplate.defaults, options);

    return this.each(function(){
      $(this).html(renderTemplate(str, settings, data));
    });
  };

  /* Default settings */
  $.fn.fromTemplate.defaults = {
    modelName: "data",
    templatePrefix: "tmpl_"
  };

  /* Private cache */
  var cache = {};

  /* Find template in cache or generate, then render */
  function renderTemplate(str, opt, data) {
    var fn = cache[str] = cache[str] || templateGenerator(str, opt);
    return fn(data);
  };

  /* Generate the template function */
  function templateGenerator(str, opt) {
    tmpl = $("#" + opt.templatePrefix + str).html()
    return new Function(opt.modelName,
      "var p=[]; p.push('" +
      tmpl.replace(/[\r\t\n]/g, " ")
          .replace(/'(?=[^%]*%>)/g,"\t")
          .split("'").join("\\'")
          .split("\t").join("'")
          .replace(/<%=(.+?)%>/g, "',$1,'")
          .split("<%").join("');")
          .split("%>").join("p.push('") +
      "');return p.join('');"
    );
  };
})(jQuery);
