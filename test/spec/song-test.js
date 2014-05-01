/*global window, describe, it, expect, SheetPractice, beforeEach, spyOn, _*/
describe("Song Suite",function(){
    beforeEach(function(){
        this.bars = [
            [ 
                [ 
                    new SheetPractice.Note({ ticks: 4, note: "c/4" }), 
                    new SheetPractice.Note({ ticks: 4, note: "c/4" }), 
                ],
            ],
            [
                [ new SheetPractice.Note({ ticks: 4, note: "c/4" }), ],
            ],
        ];

        this.notes = _.each(_.flatten(this.bars),function(v){ 
            v.setCurrent(); 
        });
    });

    it("should be constructed consistently",function(){
        var song = new SheetPractice.Song(this.bars);
        expect(song.getBars()).toEqual(this.bars);
        expect(song.remainingNotesInBar()).toEqual(2);
        expect(song.getCurrentNote()).toEqual(this.notes[0]);
    });

    it("should keep track of where the note is", function(){
        var song = new SheetPractice.Song(this.bars);
        expect(song.getCurrentNote()).toEqual(this.notes[0]);
        song.advanceCurrentNote();
        expect(song.getCurrentNote()).toEqual(this.notes[1]);
        song.advanceCurrentNote();
        expect(song.getCurrentNote()).toEqual(this.notes[2]);
    });

    it("should return the next bar accurately", function(){
        var song = new SheetPractice.Song(this.bars);
        expect(song.getNotesInCurrentBar()).toEqual(this.bars[0]);
        song.advanceCurrentNote();
        song.advanceCurrentNote();
        expect(song.getNotesInCurrentBar()).toEqual(this.bars[1]);
    });

});
