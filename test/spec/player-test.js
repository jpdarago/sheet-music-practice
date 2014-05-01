/*global spyOn, jasmine, describe, it, expect, beforeEach, Vex, imagediff, SheetPractice, _*/
describe("Player", function(){
    it("can schedule notes",function(){
        var fakeSynth = jasmine.createSpyObj("fakeSynth",["createInstrument"]);
        var fakePiano = jasmine.createSpyObj("fakePiano",[ "play" ]);

        fakeSynth.createInstrument.andReturn(fakePiano);

        var note = new SheetPractice.Note({ note: "c/4", ticks: 2, });
        var player = new SheetPractice.Player(fakeSynth, 1);
        player.playNote(note);

        expect(fakePiano.play).toHaveBeenCalledWith("C",4,30);
    });
});
