/*global jasmine, describe, it, expect, beforeEach, Vex, imagediff, SheetPractice, _*/
describe("RendererTest", function(){
    beforeEach(function(){
        this.addMatchers(imagediff.jasmine);

        this.song4 = 
        this.renderer = new SheetPractice.Renderer({
            staveWidth: 200,
            staveHeight: 100,
            stavePerLine: 4,
            canvasWidth: 500,
            canvasHeight: 250,
        });
    });

    function getContext(canvas, width, height){
        var renderer = new Vex.Flow.Renderer(canvas,
                Vex.Flow.Renderer.Backends.CANVAS);
        renderer.resize(width, height);
        return renderer.getContext();
    }

    function drawStave(ctx, stave, notes){
        stave.setContext(ctx).draw();
        Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);
    }
    
    function simpleCanvas(){
        var canvas = imagediff.createCanvas();
        var ctx = getContext(canvas, 500, 250);

        var stave = new Vex.Flow.Stave(0,0,200);
        stave.addClef("treble").addTimeSignature("4/4");

        var notes = [
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" })
                .setKeyStyle(0,{ fillStyle: "red", }),
        ];

        drawStave(ctx, stave, notes);
        return imagediff.toImageData(canvas);
    } 

    function simpleBeamedCanvas(){
        var canvas = imagediff.createCanvas();
        var ctx = getContext(canvas, 500, 250);

        var stave = new Vex.Flow.Stave(0,0,200);
        stave.addClef("treble").addTimeSignature("4/4");

        var notes = [
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" })
                .setKeyStyle(0,{ fillStyle: "red", }),
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" })
        ];

        var beam = new Vex.Flow.Beam(notes);
        drawStave(ctx, stave, notes);
        beam.setContext(ctx).draw();

        return imagediff.toImageData(canvas);
    }

    function sideBySideCanvas(){
        var canvas = imagediff.createCanvas();
        var ctx = getContext(canvas, 500, 250);

        var stave1 = new Vex.Flow.Stave(0,0,200);
        stave1.addClef("treble").addTimeSignature("4/4");
        var stave2 = new Vex.Flow.Stave(200,0,200);

        var notes1 = [
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" })
                .setKeyStyle(0,{ fillStyle: "red", }),
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
        ];

        var notes2 = [
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" })
        ];

        drawStave(ctx, stave1, notes1);
        drawStave(ctx, stave2, notes2);
        return imagediff.toImageData(canvas);
    }

    function twoLineCanvas(){
        var canvas = imagediff.createCanvas();
        var ctx = getContext(canvas, 500, 250);

        var allStaves = [
            new Vex.Flow.Stave(0,0,200).addClef("treble").addTimeSignature("4/4"),
            new Vex.Flow.Stave(200,0,200),
            new Vex.Flow.Stave(0,100,200).addClef("treble").addTimeSignature("4/4"),
        ];

        var allNotes = [
            [
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" })
                    .setKeyStyle(0,{ fillStyle: "red", }),
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
            ],
            [
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "h" }),
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "h" }),
            ],
            [
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "w" }),
            ],
        ];

        var i;
        for(i = 0; i < allNotes.length; i++){
            drawStave(ctx, allStaves[i], allNotes[i]);
        }

        return imagediff.toImageData(canvas);
    }

    it("can draw a note", function(){
        var gotCanvas = imagediff.createCanvas();
        this.renderer.render(gotCanvas, new SheetPractice.Song([[
            [ new SheetPractice.Note({ note: "c/4", ticks: 4, }) ],
        ]]));
        var got = imagediff.toImageData(gotCanvas);
 
        expect(got).toImageDiffEqual(simpleCanvas());
    });

    it("can draw two staves side by side", function(){
        var gotCanvas = imagediff.createCanvas();
        this.renderer.render(gotCanvas, new SheetPractice.Song([
            [
                [ new SheetPractice.Note({ note: "c/4", ticks: 4, }) ],
                [ new SheetPractice.Note({ note: "c/4", ticks: 4, }) ],
                [ new SheetPractice.Note({ note: "c/4", ticks: 4, }) ],
                [ new SheetPractice.Note({ note: "c/4", ticks: 4, }) ],
            ],
            [
                [ new SheetPractice.Note({ note: "c/4", ticks: 4, }) ],
            ]
        ])); 

        var got = imagediff.toImageData(gotCanvas);
 
        expect(got).toImageDiffEqual(sideBySideCanvas());
    });

    it("can draw two staves when the line passes", function(){
        var renderer = new SheetPractice.Renderer({
            staveWidth: 200,
            staveHeight: 100,
            stavesPerLine: 2,
            canvasWidth: 500,
            canvasHeight: 250,
        });

        var gotCanvas = imagediff.createCanvas();
        renderer.render(gotCanvas, new SheetPractice.Song([
            [
                [ new SheetPractice.Note({ note: "c/4", ticks: 4 }) ],
                [ new SheetPractice.Note({ note: "c/4", ticks: 4 }) ],
                [ new SheetPractice.Note({ note: "c/4", ticks: 4 }) ],
                [ new SheetPractice.Note({ note: "c/4", ticks: 4 }) ],
            ],
            [
                [ new SheetPractice.Note({ note: "c/4", ticks: 8 }) ],
                [ new SheetPractice.Note({ note: "c/4", ticks: 8 }) ],
            ],
            [
                [ new SheetPractice.Note({ note: "c/4", ticks: 16 }) ],
            ]
        ]));
        var got = imagediff.toImageData(gotCanvas);
 
        expect(got).toImageDiffEqual(twoLineCanvas());
    });

    it("can beam notes", function(){
        var gotCanvas = imagediff.createCanvas();
        this.renderer.render(gotCanvas, new SheetPractice.Song([[
            [
                new SheetPractice.Note({ note: "c/4", ticks: 2 }),
                new SheetPractice.Note({ note: "c/4", ticks: 2 }),
            ],
        ]]));
        var got = imagediff.toImageData(gotCanvas);
 
        expect(got).toImageDiffEqual(simpleBeamedCanvas());
    });

});
