/*global SheetPractice, _ */
SheetPractice.Song = (function(){
    function Song(notes){
        this.bars = [notes];
        this.currentNote = 0;
        this.currentBar = 0;

        this.getCurrentNote().setCurrent();
    }

    Song.prototype.noteSequence = function() {
        return _.flatten(this.bars);
    };

    Song.prototype.addBar = function(notes){
        var markFirst = this.currentBar === this.bars.length;
        this.bars = this.bars.concat([notes]);
        if(markFirst){
            this.bars[this.currentBar][0].setCurrent();
        }
    };

    Song.prototype.getBars = function(){
        return this.bars;
    };

    Song.prototype.getBar = function(index){
        return this.bars[index];
    };

    Song.prototype.getCurrentNote = function(){
        return this.bars[this.currentBar][this.currentNote];
    };

    Song.prototype.remainingNotesInBar = function(){
        if(this.bars.length <= this.currentBar){
            return 0;
        }
        return this.bars[this.currentBar].length - this.currentNote;
    };

    Song.prototype.advanceCurrentNote = function(){
        var current = this.getCurrentNote();
        if(current){
            current.unsetCurrent();
        }
        if(this.bars[this.currentBar].length === this.currentNote){
            this.currentBar++;
            this.currentNote = 0;
        }else{
            this.currentNote++;
        }

        current = this.getCurrentNote();
        if(current){
            current.setCurrent();
        }
    };

    return Song;
}());
