'use strict'

const { ipcRenderer } = require('electron');
const ColorGenerator = require('../Classes/ColorGenerator');
const gen = new ColorGenerator();


ipcRenderer.on("cards", (event, args) => {
    //Reset Document
    var startingHtml = '<div id="questionTitleBanner"></div>';
    startingHtml += '<div id="container"></div>';
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
        var flipcard = document.createElement("div");
        flipcard.setAttribute("class", "flip-card");

        //TODO: Flip on-click, check if allow to flip back from A to Q?
        flipcard.onclick = function(event) {
            if(this.children[0].style.transform == "rotateY(180deg)") {
                this.children[0].style.transform = "rotateY(0deg)";
            }
            else {
                this.children[0].style.transform = "rotateY(180deg)";
            }
        }

        var inner = document.createElement("div");
        inner.setAttribute("class", "flip-card-inner");

        var front = document.createElement("div");
        front.setAttribute("class", "flip-card-front");
        front.textContent = args.cards[i].question;
        front.style.backgroundColor = gen.generate();

        var back = document.createElement("div");
        back.setAttribute("class", "flip-card-back");
        back.textContent = args.cards[i].answer;
        back.style.backgroundColor = gen.generate();

        inner.appendChild(front);
        inner.appendChild(back);

        flipcard.appendChild(inner);
        container.appendChild(flipcard);
    }
});

//Send ready signal to main thread
ipcRenderer.send("cards", "ready")