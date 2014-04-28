/*global SheetPractice */
SheetPractice.Note = (function(){
    function Note(spec){
        this.note = spec.note;
        this.ticks = spec.ticks;
        this.currentNote = false;

        var pieces = spec.note.split("/");
        this.noteInScale = pieces[0].toUpperCase();
        this.noteOctave = parseInt(pieces[1],10);
    }

    Note.prototype.getTime = function(tempo){
        return ((60 * this.ticks) / (4 * tempo));
    };

    Note.prototype.getTimeMillis = function(tempo){
        return this.getTime(tempo) * 1000;
    };

    Note.prototype.getNote = function(){
        return this.note;
    };

    Note.prototype.getNoteInScale = function(){
        return  this.noteInScale;
    };

    Note.prototype.getNoteOctave = function(){
        return this.noteOctave;
    };

    Note.prototype.duration = function(){
        return (16 / this.ticks).toString();
    };

    Note.prototype.getTicks = function(){
        return this.ticks;
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
