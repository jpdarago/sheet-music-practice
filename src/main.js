/*global window, $, _, Vex */

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
}());

var STAVE_WIDTH = 270,
    STAVE_HEIGHT = 100,
    STAVE_PER_LINE = 4;

function stavePositionSequence(xstep, ystep){
    var x = 0; 
    var y = 0;

    return function(){
        var res = {
            x: x*xstep, 
            y: y*ystep,
            newline: (x === 0),
        };
        x++;
        if(x === STAVE_PER_LINE) {
            y++;
            x = 0;
        }
        return res;
    };
}

function buildStave(posSpec) {
    var stave = new Vex.Flow.Stave(posSpec.x, posSpec.y, STAVE_WIDTH);
    if(posSpec.newline) {
        stave = stave.addClef("treble").addTimeSignature("4/4");
    }
    return stave;
}

function buildNotesAndBeams(noteGroup) {
    var vexedGroups = _.map(noteGroup, function(barGroup) {
        return _.map(barGroup, function(note) {
            return new Vex.Flow.StaveNote(note);
        });
    });
    return {
        notes: _.flatten(vexedGroups),
        beams: _.chain(vexedGroups).filter(function(barGroup) {
            return barGroup.length > 1; 
        }).map(function(barGroup) {
            return new Vex.Flow.Beam(barGroup);
        }).value()
    };
}

function drawStave(ctx, stave, notes, beams) {
    stave.setContext(ctx).draw();
    Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);
    _.each(beams, function(beam) {
        beam.setContext(ctx).draw();
    });
}

function renderNotes(ctx, noteGroups) {
    var next = stavePositionSequence(STAVE_WIDTH, STAVE_HEIGHT);
    _.each(noteGroups, function(noteGroup){
        var pos = next();
        var notesAndBeams = buildNotesAndBeams(noteGroup);

        drawStave(ctx, buildStave(pos), notesAndBeams.notes, notesAndBeams.beams);
    });
}

function randomElem(arr) {
    return arr[_.random(0,arr.length-1)];
}

function randomNote(){
    var scale = ["c","d","e","f","g","a","b"];
    return [randomElem(scale) + "/4"];
}

function randomNoteGroup(){
    var durations = [1, 2, 4, 8, 16];
    var durationNames = [
        "16", "8", "4", "2", "1"
    ];

    var total = 0, res = [], i;
    while(total < 16) {
        var ind = _.random(0,durations.length-1);
        var currentGroup = [];
        var d = durations[ind];

        if(d < 16 - total){
            if(ind > 2) {
                currentGroup.push({ keys: randomNote(), duration: durationNames[ind] });
                total += durations[ind];
            } else {
                var repeats = 4 / durations[ind];

                for(i = 0; i < repeats; i++) {
                    currentGroup.push({ keys: randomNote(), duration: durationNames[ind] });
                }

                total += 4;
            }
        }

        res.push(currentGroup);
    }
    return res;
}

(function(canvas){
    var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS); 
    var ctx = renderer.getContext();
    var notes = [];

    function clearCanvas() {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    setInterval(function(){
        clearCanvas();

        notes.push(randomNoteGroup());
        if(notes.length > 20) {
                notes = _.rest(notes, 4);
        }

        renderNotes(ctx, notes);
    }, 1000);
}($("#sheet")[0]));
