/*global SheetPractice, _, $, VexFlow, Synth */
SheetPractice.Player = (function(){
    function Player(synth, tempo){
        this.piano = synth.createInstrument('piano');
        this.tempo = tempo;
    }

    Player.prototype.playNote = function(note){
        this.piano.play(note.getNoteInScale(),
                        note.getNoteOctave(),
                        note.getTime(this.tempo));
    };

    return Player;
}());
