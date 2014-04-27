/*global SheetPractice, _ */
SheetPractice.RandomDuration = function(){
    var durations = [1, 2, 4, 8, 16];
    return durations[_.random(0,durations.length-1)];
};

SheetPractice.RandomNoteInScale = function(){
    var scale = ["c","d","e","f","g","a","b"];
    return scale[_.random(0,scale.length-1)] + "/4";
};

SheetPractice.RandomNote = function(){
    return new SheetPractice.Note({
        note: SheetPractice.RandomNoteInScale(),
        ticks: SheetPractice.RandomDuration(),
    });
};

SheetPractice.BuildBarNotes = function(){ 
    var total = 0, res = [];
    while(total < 16) {
        var noteDuration = SheetPractice.RandomDuration();
        if(noteDuration <= 16-total){
            var group = [], soFar = 0;

            for(soFar = 0; soFar < 4; soFar += noteDuration){
                group.push(new SheetPractice.Note({
                    ticks: noteDuration,
                    note: SheetPractice.RandomNoteInScale(),
                }));
            }

            res.push(group);
            total += soFar;
        }
    }
    return res;
};
