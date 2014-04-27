/*global SheetPractice, _ */
SheetPractice.Song = (function(){
    function getBarLength(bar){
        return _.reduce(bar, function(ac,l){ return ac + l.length; }, 0);
    }

    function Song(bars){
        this.bars = bars;
        
        this.currentBar = 0;
        this.currentNote = 0;
        this.currentGroup = 0;

        this.remainingInBar = getBarLength(bars[0]);

        this.flipMark(null,this.getCurrentNote());
    }

    Song.prototype.addBar = function(notes){
        var mark = this.currentBar === this.bars.length;
        this.bars.push(notes);
        if(mark){
            var previous = null;
            if(this.currentBar > 0){
                previous = _.last(_.last(this.bars[this.currentBar-1]));
            }
            this.flipMark(previous, this.getCurrentNote());
        }
    };

    Song.prototype.getBars = function(){
        return this.bars;
    };

    Song.prototype.getCurrentNote = function(){
        if(this.currentBar >= this.bars.length){
            return null;
        }
        return this.bars[this.currentBar][this.currentGroup][this.currentNote];
    };

    Song.prototype.remainingNotesInBar = function(){
        return this.remainingInBar;
    };

    Song.prototype.flipMark = function(previous, current){
        if(previous){
            previous.unsetCurrent();
        }
        if(current){
            current.setCurrent();
        }
    };

    Song.prototype.advanceCurrentNote = function(){
        var previous = this.getCurrentNote();
        this.remainingInBar--;

        var bar = this.bars[this.currentBar];

        this.currentNote++;
        if(this.currentNote === bar[this.currentGroup].length){
            this.currentNote = 0;
            this.currentGroup++;
            if(this.currentGroup === bar.length){
                this.currentGroup = 0;
                this.currentBar++;

                bar = this.bars[this.currentBar] || [];
                this.remainingInBar = getBarLength(bar);
            }
        }

        this.flipMark(previous, this.getCurrentNote());
    };

    return Song;
}());
