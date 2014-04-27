/*global window, describe, it, expect, SheetPractice, beforeEach, spyOn*/
describe("Song Suite",function(){
    beforeEach(function(){
        this.notes = [
            [ 
                new SheetPractice.Note({ ticks: 4, note: "c/4" }), 
                new SheetPractice.Note({ ticks: 4, note: "c/4" }), 
            ],
            [ new SheetPractice.Note({ ticks: 4, note: "c/4" }), ],
        ];
    });

    it("should be constructed consistently",function(){
        var song = new SheetPractice.Song([this.notes]);
        expect(song.getBars()).toEqual([this.notes]);
        expect(song.remainingNotesInBar()).toEqual(3);
        expect(song.getCurrentNote()).toEqual(this.notes[0][0]);
    });

    it("should keep track of where the note is", function(){
        var song = new SheetPractice.Song([ this.notes ]);
        expect(song.getCurrentNote()).toEqual(this.notes[0][0]);
        song.advanceCurrentNote();
        expect(song.getCurrentNote()).toEqual(this.notes[0][1]);
        song.advanceCurrentNote();
        expect(song.getCurrentNote()).toEqual(this.notes[1][0]);
    });

});
