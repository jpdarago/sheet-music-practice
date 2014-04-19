/*global window, describe, it, expect, SheetPractice, beforeEach, spyOn*/
describe("Ticker Suite",function(){
    beforeEach(function(){
        this.notes = [
            new SheetPractice.Note({ 
                ticks: 8,
                note: "c/4",
            }), 
            new SheetPractice.Note({ 
                ticks: 8,
                note: "d/4",
            }),
        
        ];
        this.song = new SheetPractice.Song(this.notes);
        this.ticker = new SheetPractice.Ticker(this.song);
    });

    it("should be constructed consistently", function(){
        var current = this.song.getCurrentNote();
        expect(current).toEqual(this.notes[0]);
        expect(current.isCurrentNote()).toBe(true);
    });

    it("should be able to tick the notes", function(){
        var previous = this.song.getCurrentNote();
        this.ticker.tick();

        expect(this.song.getCurrentNote()).toEqual(this.notes[1]);
        expect(previous.isCurrentNote()).toBe(false);
    });

    it("should add a bar when we tick further away", function(){
        var note = new SheetPractice.Note({ 
            ticks: 8,
            note: "e/4",
        });

        spyOn(SheetPractice, "BuildBarNotes").andReturn([note]);

        this.ticker.tick();
        this.ticker.tick();
        this.ticker.tick();
        
        expect(SheetPractice.BuildBarNotes).toHaveBeenCalled();
        expect(this.song.getCurrentNote()).toEqual(note);
        expect(this.song.getCurrentNote().isCurrentNote()).toBe(true);
    });
});
