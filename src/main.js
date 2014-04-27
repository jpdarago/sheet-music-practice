/*global window, $, _, Vex, SheetPractice */

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
}());

(function(canvas){
    var song = new SheetPractice.Song([
        SheetPractice.BuildBarNotes()
    ]);
    var ticker = new SheetPractice.Ticker(song);
    var renderer = new SheetPractice.Renderer({
        staveWidth: 270,
        staveHeight: 100,
        canvasWidth: 1100,
        canvasHeight: 500,
        stavesPerLine: 4,
    });

    function clearCanvas() {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    setInterval(function(){
        ticker.tick();
    }, 2000);

    (function renderLoop(){
        window.requestAnimFrame(renderLoop);
        clearCanvas();
        renderer.render(canvas, song);
    }());
}($("#sheet")[0]));
