/*global window, $, _, Vex, SheetPractice, Synth */

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

    var previous = new Date(), note = song.getCurrentNote(), tempo = 60;
    setInterval(function(){
        var date = new Date();
        if(date - previous >= note.getTimeMillis(tempo)){
            ticker.tick();
            note = song.getCurrentNote();
            previous = date;
        }
    },250);

    (function renderLoop(){
        window.requestAnimFrame(renderLoop);
        clearCanvas();
        renderer.render(canvas, song);
    }());
}($("#sheet")[0]));
