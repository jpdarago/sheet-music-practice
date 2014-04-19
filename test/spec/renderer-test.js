/*global jasmine, describe, it, expect, beforeEach, Vex, imagediff, SheetPractice, _*/
describe("RendererTest", function(){
    beforeEach(function(){
        this.addMatchers(imagediff.jasmine);
        this.song1 = new SheetPractice.Song([
            new SheetPractice.Note({ note: "c/4", ticks: 4, }),
        ]);

        this.song2 = new SheetPractice.Song([
            new SheetPractice.Note({ note: "c/4", ticks: 4, }),
            new SheetPractice.Note({ note: "c/4", ticks: 4, }),
            new SheetPractice.Note({ note: "c/4", ticks: 4, }),
            new SheetPractice.Note({ note: "c/4", ticks: 4, }),
        ]);
        this.song2.addBar([
            new SheetPractice.Note({ note: "c/4", ticks: 4, }),
        ]);

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

        var stave1 = new Vex.Flow.Stave(0,0,200);
        stave1.addClef("treble").addTimeSignature("4/4");
        var stave2 = new Vex.Flow.Stave(0,100,200);
        stave2.addClef("treble").addTimeSignature("4/4");

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

    it("can draw a note", function(){
        var gotCanvas = imagediff.createCanvas();
        this.renderer.render(gotCanvas, this.song1); 
        var got = imagediff.toImageData(gotCanvas);
 
        expect(got).toImageDiffEqual(simpleCanvas());
    });

    it("can draw two staves side by side", function(){
        var gotCanvas = imagediff.createCanvas();
        this.renderer.render(gotCanvas, this.song2); 
        var got = imagediff.toImageData(gotCanvas);
 
        expect(got).toImageDiffEqual(sideBySideCanvas());
    });

    it("can draw two staves when the line passes", function(){
        var renderer = new SheetPractice.Renderer({
            staveWidth: 200,
            staveHeight: 100,
            stavesPerLine: 1,
            canvasWidth: 500,
            canvasHeight: 250,
        });

        var gotCanvas = imagediff.createCanvas();
        renderer.render(gotCanvas, this.song2); 
        var got = imagediff.toImageData(gotCanvas);
 
        expect(got).toImageDiffEqual(twoLineCanvas());
    });
});
