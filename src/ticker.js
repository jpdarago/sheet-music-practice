/*global SheetPractice, _ */
SheetPractice.Ticker = (function(){
    function Ticker(song){
        this.song = song;
    }

    Ticker.prototype.tick = function(){
        if(this.song.remainingNotesInBar() === 0){
            this.song.addBar(SheetPractice.BuildBarNotes());
        }
        this.song.advanceCurrentNote();
    };

    return Ticker;
}());
