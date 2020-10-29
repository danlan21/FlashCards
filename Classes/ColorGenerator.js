class ColorGenerator {
    constructor(){}
    generate() {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }
}

module.exports = ColorGenerator