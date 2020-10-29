'use strict'

const { ipcRenderer } = require('electron')


//Add each deck to the table
ipcRenderer.on('decks', (event, args) => {
    //Create Add Button
    var addButton = document.getElementById("addButton");
    addButton.onclick = function () {
        ipcRenderer.send("newDeck");
    }
    //Populate Decks
    const decks = document.getElementById("listDecks");
    
    if(args.length > 0) {
        document.getElementById("decksEmptyBanner").style.display = 'none';
        for(var i = 0; i < args.length; i++) {
            if(i % 3 == 0) {
                var row = document.createElement("tr");
            }
            var firstDeck = document.createElement("th");
            firstDeck.setAttribute("class", "singleDeck");
            firstDeck.setAttribute("id", "deck_"+(i+1));
            firstDeck.textContent = args[i].name;
            firstDeck.onclick = function(event) {
                ipcRenderer.send("deckClick", [event.target.innerText, args]);
            };
            row.appendChild(firstDeck);
            if(i % 3 == 2 || i == (args.length - 1)) {
                decks.appendChild(row);
            }
        }
    }

    //TODO: Add New Deck Button
})


//Send ready signal to main thread
ipcRenderer.send("decks", "ready")