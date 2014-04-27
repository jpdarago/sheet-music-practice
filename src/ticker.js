/*global SheetPractice, _ */
SheetPractice.Ticker = (function(){
    function Ticker(song){
        this.song = song;
    }

    Ticker.prototype.tick = function(){
        this.song.advanceCurrentNote();
        if(this.song.remainingNotesInBar() <= 1){
            this.song.addBar(SheetPractice.BuildBarNotes());
        }
    };

    return Ticker;
}());
