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

    hideMoon = function() { $moon.hide(); }

    showMoon = function() {
      $moon.show();
      setTimeout(hideMoon, 84); // Hides moon after 84ms
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
