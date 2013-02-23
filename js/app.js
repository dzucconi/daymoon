$(function() {
  soundManager.debugMode     = false;
  soundManager.preferFlash   = false; 
  soundManager.useHTML5Audio = true;
  
  soundManager.onready(function() {
    var pop = soundManager.createSound({
      id: "pop",
      url: "audio/pop.wav",
      autoLoad: true,
      autoPlay: false,
      loops: 1,
      volume: 100
    });

    var $moon = $("#moon");

    function hide() {
      $moon.hide();
    }

    function show() {
      $moon.show();
      pop.play();
      
      setTimeout(hide, 50);
    }

    setInterval(show, 5000);
  });
});
