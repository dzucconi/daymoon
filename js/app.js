(function() {
  "use strict";

  var Utils = {
    events: { click : "click" }
  }

  if (typeof window.ontouchstart !== "undefined") {
    Utils.events.click = "tap";
  }

  soundManager.debugMode     = false;
  soundManager.preferFlash   = false; 
  soundManager.useHTML5Audio = true;
  soundManager.onready(function() {
    var Daymoon = {
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

    $("body").on(Utils.events.click, function(e) {
      Daymoon.strobe();
    });
  }); // soundManager.onready
})();
