/*global $, _, Vex, SheetPractice*/
SheetPractice.Renderer = (function(){
    function Renderer(params){
        this.staveWidth = params.staveWidth;
        this.staveHeight = params.staveHeight;
        this.stavesPerLine = params.stavesPerLine;
        this.canvasWidth = params.canvasWidth;
        this.canvasHeight = params.canvasHeight;
    }

    Renderer.prototype.render = function(canvas, song) {
        var me = this;
        function freshCanvas(canvas){
            var renderer = new Vex.Flow.Renderer(canvas, 
                Vex.Flow.Renderer.Backends.CANVAS); 
            renderer.resize(me.canvasWidth, me.canvasHeight);
            return renderer.getContext();
        }

        function stavePositionSequence(xstep, ystep) {
            var x = 0;
            var y = 0;

            return function(){
                var res = {
                    x: x*xstep, 
                    y: y*ystep,
                };
                x++;
                if(x === me.stavesPerLine) {
                    y++;
                    x = 0;
                }
                return res;
            };
        }

        function buildVexFlowNote(note) {
            var vexNote = new Vex.Flow.StaveNote({
                keys: [note.getNote()],
                duration: note.duration(),
            });
            if(note.isCurrentNote()){
                vexNote.setKeyStyle(0,{
                    fillStyle: "red",
                });
            }
            return vexNote;
        }

        function barToVexflowBar(bar) {
            var i, res = [];
            for(i = 0; i < bar.length; i++){
                res.push(buildVexFlowNote(bar[i]));
            }
            return res;
        }

        var ctx = freshCanvas(canvas);
        var next = stavePositionSequence(me.staveWidth, me.staveHeight);
        var i, j, staves = [], bars = song.getBars();
        for(i = 0; i < bars.length; i++){
            var pos = next();
            console.log(pos);
            var stave = new Vex.Flow.Stave(pos.x, pos.y, me.staveWidth);
            if(pos.x === 0){
                stave.addClef("treble").addTimeSignature("4/4");
            }

            var barNotes = barToVexflowBar(song.getBar(i));
            stave.setContext(ctx).draw();

            Vex.Flow.Formatter.FormatAndDraw(ctx, stave, barNotes);
        }
    };

    return Renderer;
}());
