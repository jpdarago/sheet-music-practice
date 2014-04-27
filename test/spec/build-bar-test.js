/*global describe, it, SheetPractice, spyOn, beforeEach, expect */
describe("BuildBar Suite",function(){
    var buildNote = function(s){
            return new SheetPractice.Note(s);
    };
    beforeEach(function(){
        this.halfNote = buildNote( { note: "c/4", ticks: 8, });
        this.quarterNote = buildNote( { note: "c/4", ticks: 4, });
        this.eightNote = buildNote( { note: "c/4", ticks: 2, });
    });

    function iterator(array){
        var i = 0;
        return function(){
            if(i >= array.length){
                return null;
            }
            return array[i++];
        };
    }

    it("should build a proper bar with only white notes", function(){
        spyOn(SheetPractice,"RandomDuration").andReturn(8);
        spyOn(SheetPractice,"RandomNoteInScale").andReturn("c/4");

        var barNotes = SheetPractice.BuildBarNotes();
        expect(barNotes.length).toEqual(2);
        expect(barNotes[0].length).toEqual(1);

        var note = barNotes[0][0];
        expect(note.getNote()).toEqual("c/4");
        expect(note.duration()).toEqual("2");
    });

    it("should build a proper bar with only black notes",function(){
        spyOn(SheetPractice,"RandomDuration").andReturn(4);
        spyOn(SheetPractice,"RandomNoteInScale").andReturn("c/4");

        var barNotes = SheetPractice.BuildBarNotes();
        expect(barNotes.length).toEqual(4);
        expect(barNotes[0][0]).toEqual(this.quarterNote);
    });

    it("should skip too large notes", function(){
        spyOn(SheetPractice, "RandomDuration").andCallFake(iterator([8,16,8]));
        spyOn(SheetPractice, "RandomNoteInScale").andCallFake(iterator([
            "c/4","c/4","c/4",
        ]));

        var barNotes = SheetPractice.BuildBarNotes();
        expect(barNotes.length).toEqual(2);
        expect(barNotes[1][0]).toEqual(this.halfNote);
    });

    it("should group notes into groups", function(){
        spyOn(SheetPractice, "RandomDuration").andCallFake(iterator([2,4,4,4]));
        spyOn(SheetPractice, "RandomNoteInScale").andCallFake(iterator([
            "c/4","c/4", "d/4","d/4","d/4",
        ]));
        var barNotes = SheetPractice.BuildBarNotes();

        expect(barNotes.length).toEqual(4);
        expect(barNotes[0].length).toEqual(2);
        expect(barNotes[0][0]).toEqual(this.eightNote);
        expect(barNotes[0][1]).toEqual(this.eightNote);
    });

    it("should group notes", function(){
        spyOn(SheetPractice, "RandomDuration").andCallFake(iterator([2,2,4,4,4]));
        spyOn(SheetPractice, "RandomNoteInScale").andCallFake(iterator([
            "c/4", "d/4", "d/4", "d/4", "d/4",
        ]));
        var barNotes = SheetPractice.BuildBarNotes();

        expect(barNotes.length).toEqual(4);
        expect(barNotes[0].length).toEqual(2);
        expect(barNotes[0][0]).toEqual(buildNote({ note: "c/4", ticks: 2 }));
        expect(barNotes[0][1]).toEqual(buildNote({ note: "d/4", ticks: 2 }));
    });
});
