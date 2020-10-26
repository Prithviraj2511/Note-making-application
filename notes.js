const fs = require('fs');
const chalk=require('chalk');

var addNote = (title, body)=> {
    var notes = loadNotes();
    var duplicateNotes=notes.find((note)=>note.title===title);
    if (!duplicateNotes) {
        var newNote = {
            title: title,
            body: body
        }
        notes.push(newNote);
        writeNotes(notes);
        console.log(chalk.green.inverse('note added !'));
    }
    else {
        console.log(chalk.red.inverse('title is already taken !'));
    }
}

var removeNote = (title)=> {
    var notes = loadNotes();

    var remainingNotes = notes.filter((note)=>note.title !== title);
    if (notes.length>remainingNotes.length) {
        writeNotes(remainingNotes);
        console.log(chalk.green.inverse('Note removed !'));
    }
    else {
        console.log(chalk.red.inverse('No note found !'));
    }
}

var listNotes=()=>{
    var notes=loadNotes();
    console.log(chalk.yellow.bold('Your Notes'));
    notes.forEach(note => console.log(note.title));
}

var readNote=(title)=>{
    var notes=loadNotes();
    var readNote=notes.find((note)=>(note.title===title));
    if(readNote){
        console.log(chalk.white.inverse('Title - '+readNote.title));
        console.log(readNote.body);
    }
    else{
        console.log(chalk.red.inverse('no such note present !'));
    }
}

var loadNotes = ()=>{
    try {
        var dataBuffer = fs.readFileSync('notes.json');
        var datajson = dataBuffer.toString();
        return JSON.parse(datajson);
    } catch (error) {
        return [];
    }
}

var writeNotes = (notes)=> {
    var notesjson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesjson);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNote:readNote
}