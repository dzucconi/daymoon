(function() {
  "use strict";

  var Utils = {
    events: {
      click : "click"
    },

    getParams: function () {
      var i,
        hash,
        vars = {},
        hashes = window.location.href.slice(window.location.href.indexOf("?") + 1)
                                     .split("&");

      for (i = hashes.length - 1; i >= 0; i--) {
        hash = hashes[i].split("=");
        vars[hash[0]] = hash[1];
      }

      return vars;
    }
  }

  // Switch to using tap event if on a touch device
  if (typeof window.ontouchstart !== "undefined") { Utils.events.click = "tap"; }

  soundManager.setup({
    debugMode     : false,
    preferFlash   : false,
    useHTML5Audio : true,
    onready       : function() {
      var Daymoon = {
        options: function(params) {
          this.mode     = params.mode     || "manual",
          this.interval = params.interval || 3000
        },

        $el: $("#moon"),

        pop: soundManager.createSound({
          id       : "pop",
          url      : "audio/pop.mp3",
          autoLoad : true,
          autoPlay : false,
          loops    : 1,
          volume   : 100
        }),

        hide: function() {
          // Fade out with a duration of 84ms
          Daymoon.$el.animate({ opacity: 0 }, 84);
        },

        show: function() {
          Daymoon.$el.css({ opacity: 1 });
          
          Daymoon.hide();
        },

        strobe: function() {
          // Plays immediately
          Daymoon.pop.play();

          // Displays moon after 56ms
          setTimeout(Daymoon.show, 56);
        }
      }

      // Init
      var options = new Daymoon.options(Utils.getParams());

      if (options.mode === "auto") {
        setInterval(Daymoon.strobe, options.interval);
      } else {
        // Implicitly manual
        $("body").on(Utils.events.click, function(e) {
          Daymoon.strobe();
        });
      }
    } // soundManager.onready
  }); // soundManager
})();
