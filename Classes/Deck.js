const Card = require('./Card')

class Deck {

    constructor(name) {
        this.name = name;
        this.cards = [];
    }

    newCard(card) {
        if(card.constructor.name != "Card") {
            return false
        }
        this.cards.push(card);
    }

    randomize() {
        //TODO: Randomize card positions in deck.
    }
}

module.exports = Deck