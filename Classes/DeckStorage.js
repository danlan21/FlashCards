const { app } = require('electron');
const path = require('path');

const Deck = require('./Deck');
const fs = require('fs');
const Card = require('./Card');

const defaultDataPath = "./storage.txt";

class DeckStorage {
    constructor() {
        this.decks = [];
        this.dirty = false;
        this.read();
    }

    clear() {
        this.decks = [];
    }
    
    add(deck) {
        this.decks = this.decks.filter(t => t.name != deck.name);
        this.decks.push(deck);
        this.dirty = true;
    }
    
    write() {
        if(this.dirty) {
            var temp = this.createJson();
            fs.writeFile(defaultDataPath, this.createJson(), {flag: 'w'}, (err) => {
                if (err) throw err;
            });
        }
        this.dirty = false;
    }

    createJson() {
        let data = "";
        for(var i = 0; i < this.decks.length; i++) {
            data += "{" + this.decks[i].name + "\n";
            for(var y = 0; y < this.decks[i].cards.length; y++) {
                data += this.#stringifyCard(this.decks[i].cards[y]) + "\n";
            }
            data += "}\n"
        }
        return data
    }

    #stringifyCard(card) {
        return card.question + "," + card.answer;
    }

    read() {
        if(!fs.existsSync(defaultDataPath)) return this;
        var text = fs.readFileSync(defaultDataPath, 'utf8', (err,data) => {
            if(err) throw err;
            return data;
        });
        var lines = text.split("\n");
        var i = 0;
        this.clear();
        var deck;
        
        while(lines[i] != '') {
            if(lines[i].includes("{")) {
                var name = lines[i].substring(1, lines[i].length);
                deck = new Deck(name);
            }
            else if(!(lines[i].includes("}"))){
                var parts = lines[i].split(",");
                deck.cards.push(new Card(parts[0], parts[1]));
            }
            else {
                this.decks.push(deck);
            }
            i++;
        }

        return this;
    }
}

module.exports = DeckStorage