'use strict'

const { ipcRenderer } = require('electron');
const ColorGenerator = require('../Classes/ColorGenerator');

const gen = new ColorGenerator();

ipcRenderer.on("cards", (event, args) => {
    //Reset Document
    var startingHtml = '<div id="questionTitleBanner"></div>';
    startingHtml += '<table id="container"></div>';
    document.body.innerHTML = startingHtml;

    //Init Banner
    var banner = document.getElementById("questionTitleBanner");
    banner.setAttribute("id", "questionTitleBanner");
    var nameBannerText = document.createElement("p");
    nameBannerText.textContent = args.name;
    nameBannerText.setAttribute("id", "nameText");
    banner.appendChild(nameBannerText);

    var backButton = document.createElement("button");
    backButton.setAttribute("class", "back");
    backButton.textContent = "Back";
    backButton.onclick = function() {
        ipcRenderer.send("return");
    }
    banner.appendChild(backButton);

    //Display Questions
    var container = document.getElementById("container");
    for(var i = 0; i < args.cards.length; i++) {
        if(i % 4 == 0) {
            var row = document.createElement("tr");
        }

        var th = document.createElement("th");
        th.setAttribute("class", "individualQuestion");
        
        var q = document.createElement("div");
        q.setAttribute("class", "question");
        q.textContent = args.cards[i].question;
        q.style.backgroundColor = gen.generate();

        q.onclick = function(event) {
            event.target.style.display = "none";
            event.path[1].children[1].style.display = "flex";
        }

        var a = document.createElement("div");
        a.setAttribute("class", "answer");
        a.textContent = args.cards[i].answer;
        a.style.backgroundColor = gen.generate();

        a.onclick = function(event) {
            event.target.style.display = "none";
            event.path[1].children[0].style.display = "flex";
        }

        th.appendChild(q);
        th.appendChild(a);

        row.appendChild(th);

        if(i % 4 == 3 || i == (args.cards.length - 1)) {
            container.appendChild(row);
        }
    }
})

//Send ready signal to main thread
ipcRenderer.send("cards", "ready")