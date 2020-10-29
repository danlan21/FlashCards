'use strict'

const { ipcMain, app } = require('electron');
const path = require('path');

//Classes
const Deck = require('./Classes/Deck')
const DeckStorage = require('./Classes/DeckStorage')
const Card = require('./Classes/Card')
const Window = require("./Window");

let stor = new DeckStorage();

let card_page = "cards_flip.html";
let home = path.join('renderer', 'index.html');
let new_deck = path.join('renderer', 'new_deck.html');

let selectedDeck;

app.on('ready', () => {
    var mainWindow = new Window({
        file: home
    })
    
    console.log(app.getPath('userData'));

    ipcMain.on("decks", (event, message) => {
        event.reply("decks", stor.read().decks);
    })

    ipcMain.on("deckClick", (event, message) => {
        mainWindow.loadFile(path.join('renderer', card_page));
        selectedDeck = message[1].filter(t => t.name == message[0]);
    })

    ipcMain.on("cards", (event, message) => {
        event.reply("cards", selectedDeck[0]);
    })

    ipcMain.on("return", (event, message) => {
        mainWindow.loadFile(home);
    })

    ipcMain.on("newDeck", (event, message) => {
        mainWindow.loadFile(new_deck);
    })
})

app.on('window-all-close', function() {
    stor.write();
    app.quit();
})