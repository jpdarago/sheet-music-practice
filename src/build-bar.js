/*global SheetPractice, _ */
SheetPractice.RandomNote = (function(){
    function randomElem(arr) {
        return arr[_.random(0,arr.length-1)];
    }

    var durations = [1, 2, 4, 8, 16];
    var scale = ["c","d","e","f","g","a","b"];

    return function(){
        var duration = randomElem(durations);
        return new SheetPractice.Note({
            note: randomElem(scale) + "/4",
            ticks: durations[duration],
        });
    }; 
}());

SheetPractice.BuildBarNotes = (function(){ 
    function buildBar(){
        var total = 0, res = [];
        while(total < 16) {
            var note = SheetPractice.RandomNote();
            if(note.ticks <= 16-total){
                res.push(note);
                total += note.ticks;
            }
        }

        return res;
    }

    return buildBar;
}());
