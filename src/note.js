/*global SheetPractice */
SheetPractice.Note = (function(){
    function Note(spec){
        this.note = spec.note;
        this.ticks = spec.ticks;
        this.currentNote = false;
    }

    Note.prototype.getNote = function(){
        return this.note;
    };

    Note.prototype.duration = function(){
        return this.ticks.toString();
    };

    Note.prototype.setCurrent = function(){
        this.currentNote = true;
    };

    Note.prototype.unsetCurrent = function(){
        this.currentNote = false;
    };

    Note.prototype.isCurrentNote = function(){
        return this.currentNote;
    };

    return Note;
}());
