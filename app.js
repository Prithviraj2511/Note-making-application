const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');
const { argv } = require('yargs');

yargs.version('1.1.0');

yargs.command({
    command: "add",
    describe: "add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});
yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.removeNote(argv.title);
    }
});
yargs.command({
    command: "list",
    describe: "List all notes",
    handler() {
        notes.listNotes();
    }
})
yargs.command({
    command: "read",
    describe: "read the note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})
yargs.parse()