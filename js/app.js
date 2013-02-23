$(function() {
  var $moon = $("#moon");

  function hide() {
    $moon.hide();
  }

  function show() {
    $moon.show();
    
    setTimeout(hide, 50);
  }

  setInterval(show, 1000);
});
