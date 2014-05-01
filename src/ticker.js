/*global SheetPractice, _ */
SheetPractice.Ticker = (function(){
    function Ticker(song){
        this.song = song;
        this.hasChangedBar = true;
    }

    Ticker.prototype.tick = function(){
        this.song.advanceCurrentNote();
        this.hasChangedBar = false;
        if(this.song.remainingNotesInBar() <= 1){
            this.hasChangedBar = true;
            this.song.addBar(SheetPractice.BuildBarNotes());
        }
        return this.song.getCurrentNote();
    };

    Ticker.prototype.getSchedulingNotes = function(){
        return this.song.getNotesToSchedule();
    };

    Ticker.prototype.hasChangedBar = function(){
        return this.hasChangedBar;
    };

    return Ticker;
}());
