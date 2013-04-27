(function() {
  "use strict";

  var DAYMOON = {};

  soundManager.setup({
    debugMode: false,
    debugFlash: false,
    preferFlash: false,
    useHTML5Audio: true,
    useHighPerformance: true,
    url: "swf",

    onready: function() {
      soundManager.createSound({
        id: "pop",
        url: ["audio/pop.ogg", "audio/pop.mp3"],
        autoLoad: DAYMOON.utils.autoLoad(),
        autoPlay: false,
        loops: 1,
        volume: 100,
        onload: function() { DAYMOON.view.init(); },
        onplay: function() { DAYMOON.view.queueStrobe(); }
      });
    }
  });

  DAYMOON.utils = {
    autoLoad: function() {
      return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? false : true;
    },

    hashes: function() {
      return window.location.href.slice(
        window.location.href.indexOf("?") + 1
      ).split("&");
    },

    params: function () {
      var i,
          hash,
          hashes = this.hashes(),
          vars = {};

      for (i = hashes.length - 1; i >= 0; i--) {
        hash = hashes[i].split("=");
        vars[hash[0]] = hash[1];
      }

      return vars;
    }
  }

  DAYMOON.view = {
    optionsSet: function(params) {
      this.mode = params.mode || "manual",
      this.interval = params.interval || 3000
    },

    strobeIn: function() {
      this.$el.css({ opacity: 1 });
      
      this.strobeOut();
    },

    strobeOut: function() {
      // Fade out with a duration of 84ms
      this.$el.animate({ opacity: 0 }, 84);
    },

    strobe: function() {
      // Plays immediately
      soundManager.sounds.pop.play();
    },

    queueStrobe: function() {
      // Displays moon after 56ms
      setTimeout(DAYMOON.view.strobeIn(), 56);
    },

    init: function() {
      var _this = this;

      _this.$container = $("body");
      _this.$el = $("#moon");
      _this.options = new this.optionsSet(DAYMOON.utils.params());
      
      $(document).imagesLoaded(function() { _this.run(); });
    },

    run: function() {
      var _this = this;

      _this.$container.removeClass("loading");

      if (_this.options.mode === "auto") {
        setInterval(_this.strobe, _this.options.interval);
      } else {
        $(document).on("click tap", function(e) {
          e.preventDefault();

          _this.strobe();
        });
      }
    }
  }

  // Init for iOS
  if (DAYMOON.utils.autoLoad() === false) {
    $(function(){ DAYMOON.view.init(); });
  }
})();
