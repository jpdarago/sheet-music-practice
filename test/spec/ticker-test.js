/*global window, describe, it, expect, SheetPractice, beforeEach, spyOn*/
describe("Ticker Suite",function(){
    beforeEach(function(){
        this.notes = [
            [ 
            new SheetPractice.Note({ 
                    ticks: 4,
                    note: "c/4",
                }), 
            ],
            [
                new SheetPractice.Note({ 
                    ticks: 4,
                    note: "d/4",
                }),
            ],
        
        ];

        this.song = new SheetPractice.Song([this.notes]);
        this.ticker = new SheetPractice.Ticker(this.song);
    });

    it("should be able to tick the notes", function(){
        var previous = this.song.getCurrentNote();
        this.ticker.tick();

        expect(this.song.getCurrentNote()).toEqual(this.notes[1][0]);
        expect(this.song.getCurrentNote().isCurrentNote()).toBe(true);
    });

    it("should add a bar when we tick further away", function(){
        var note = new SheetPractice.Note({ 
            ticks: 4,
            note: "e/4",
        });

        spyOn(SheetPractice, "BuildBarNotes").andReturn([[note]]);

        this.ticker.tick();
        expect(SheetPractice.BuildBarNotes).toHaveBeenCalled();

        this.ticker.tick();
        
        expect(this.song.getCurrentNote()).toEqual(note);
        expect(this.song.getCurrentNote().isCurrentNote()).toBe(true);

        this.ticker.tick();

        expect(this.song.getCurrentNote()).toEqual(note);
        expect(this.song.getCurrentNote().isCurrentNote()).toBe(true);
    });

    it("should be consistent when started with a note", function(){
        var song = new SheetPractice.Song([[[ new SheetPractice.Note({
            ticks: 4, note: "d/4",
        }) ]]]);

        var note = new SheetPractice.Note({
            ticks: 4, note: "e/4",
        });

        spyOn(SheetPractice, "BuildBarNotes").andReturn([[note]]);

        var prev = song.getCurrentNote();
        var ticker = new SheetPractice.Ticker(song);
        ticker.tick();

        expect(SheetPractice.BuildBarNotes).toHaveBeenCalled();

        expect(song.getCurrentNote()).toEqual(note);
        expect(song.getCurrentNote().isCurrentNote()).toBe(true);
        expect(prev.isCurrentNote()).toBe(false);
    });
});
