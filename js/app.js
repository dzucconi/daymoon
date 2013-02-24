$(function() {
  soundManager.debugMode     = false;
  soundManager.preferFlash   = false; 
  soundManager.useHTML5Audio = true;
  
  soundManager.onready(function() {
    var pop,
        $moon,
        hideMoon,
        showMoon,
        init;

    pop = soundManager.createSound({
      id: "pop",
      url: "audio/pop.mp3",
      autoLoad: true,
      autoPlay: false,
      loops: 1,
      volume: 100
    });

    $moon = $("#moon");

    hideMoon = function() {
      $moon.fadeOut(84); // Fades out in 84ms
    }

    showMoon = function() {
      $moon.show();
      hideMoon();
    }

    init = function() {
      pop.play(); // Plays immediately
      setTimeout(showMoon, 56); // Displays moon after 56ms
    }

    // setInterval(init, 2000);
    
    $("body").on("click", function() {
      init();
    });
  });
});
