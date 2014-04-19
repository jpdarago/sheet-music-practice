/*global describe, it, SheetPractice, spyOn, beforeEach, expect */
describe("BuildBar Suite",function(){
    var buildNote = SheetPractice.Note;
    beforeEach(function(){
        this.halfNotes = [
            new buildNote( { note: "c/4", ticks: 8, }),
            new buildNote( { note: "c/4", ticks: 8 }),
        ];
        this.quarterNotes = [
            new buildNote( { note: "c/4", ticks: 4, }),
            new buildNote( { note: "c/4", ticks: 4 }),
            new buildNote( { note: "c/4", ticks: 4, }),
            new buildNote( { note: "c/4", ticks: 4 }),
        ];
    });

    it("should build a proper bar with only white notes", function(){
        spyOn(SheetPractice,"RandomNote").andReturn(this.halfNotes[0]);

        var barNotes = SheetPractice.BuildBarNotes();
        expect(barNotes.length).toEqual(2);
        expect(barNotes[0]).toEqual(this.halfNotes[0]);
    });

    it("should build a proper bar with only black notes",function(){
        spyOn(SheetPractice,"RandomNote").andReturn(this.quarterNotes[0]);

        var barNotes = SheetPractice.BuildBarNotes();
        expect(barNotes.length).toEqual(4);
        expect(barNotes[0]).toEqual(this.quarterNotes[0]);
    });

    it("should skip too large notes", function(){
        var notes = [
            new buildNote( { note: "c/4", ticks: 8, } ),
            new buildNote( { note: "d/4", ticks: 16, }),
            new buildNote( { note: "c/4", ticks: 8, }),
        ], ind = 0;
        spyOn(SheetPractice, "RandomNote").andCallFake(function(){
            return notes[ind++];   
        });

        var barNotes = SheetPractice.BuildBarNotes();
        expect(barNotes.length).toEqual(2);
        expect(barNotes[1]).toEqual(this.halfNotes[0]);
    });
});
