'use strict'

const { BrowserWindow } = require('electron')

const winProps = {
    width: 1000,
    height: 800,
    show: false,
    webPreferences: {
        nodeIntegration: true
  }
}

class Window extends BrowserWindow {
    constructor({ file, ...windowSettings }) {
        //New BrowserWindow with custom properties
        super({...winProps, ...windowSettings})

        //Load file
        this.loadFile(file)

        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window