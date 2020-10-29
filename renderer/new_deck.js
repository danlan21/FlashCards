'use strict'

const { ipcRenderer } = require('electron');
const Card = require("../Classes/Card");
const Deck = require("../Classes/Deck");
const DeckStorage = require('../Classes/DeckStorage');

var banner = document.createElement("div");
var nameBannerText = document.createElement("p");

var label_name = document.createElement("label");
var input_name = document.createElement("input");
var name_div = document.createElement("div");

var q_box = document.createElement("div");
var q_paragraph = document.createElement("p");
var submit_question = document.createElement("button");
var label_q = document.createElement("label");
var input_q = document.createElement("input");
var label_a = document.createElement("label");
var input_a = document.createElement("input");

var completeButtonDiv = document.createElement("div");
var completeButton = document.createElement("button");

var backButton = document.createElement("button");
var bottomBackButtonDiv = document.createElement("div");

var cardDisplay = document.createElement("div");

var current_questions = new Deck("Temp");
var storage = new DeckStorage();

window.onload = function() {

    //Clear Document from previous loads
    document.body.innerHTML = "";

    //Banner -> 1st
    banner.setAttribute("id", "questionTitleBanner");
    nameBannerText.textContent = "Add a new deck of questions";
    nameBannerText.setAttribute("id", "nameText");
    banner.appendChild(nameBannerText);

    document.body.appendChild(banner);
    /*************************************************************/

    //Name Input -> 2nd
    label_name.textContent = "Title of Question Deck";
    label_name.setAttribute("id", "deckNameLabel");
    
    input_name.setAttribute("type", "text");
    input_name.setAttribute("class", "input");
    input_name.onfocus = function() {
        input_name.style.outline = "none";
    }

    name_div.setAttribute("id", "deckName");
    name_div.appendChild(label_name);
    name_div.appendChild(input_name);

    document.body.appendChild(name_div);
    /*********************************************************/

    //Question Box -> 3rd
    q_box.setAttribute("id", "newQuestion");

    input_q.setAttribute("type", "text");
    input_q.setAttribute("class", "input");
    input_q.setAttribute("id", "inputQuestion");
    input_q.onfocus = function () {
        input_q.style.outline = "none";
    }
    label_q.textContent = "Question";
    label_q.setAttribute("id", "inputQuestionLabel");

    input_a.setAttribute("type", "text");
    input_a.setAttribute("class", "input");
    input_a.setAttribute("id", "inputAnswer");
    input_a.onfocus = function () {
        input_a.style.outline = "none";
    }
    label_a.textContent = "Answer";
    label_a.setAttribute("id", "inputAnswerLabel");

    q_paragraph.appendChild(label_q);
    q_paragraph.appendChild(input_q);
    q_paragraph.appendChild(label_a);
    q_paragraph.appendChild(input_a);

    submit_question.setAttribute("id", "addQuestion");
    submit_question.textContent = "Add Question";
    submit_question.onclick = function() {
        var isValid = true;
        if(input_q.value == "") {
            input_q.style.outline = "2px solid red";
            isValid = false;
        }
        if(input_a.value == "") {
            input_a.style.outline = "2px solid red";
            isValid = false;
        }
        if(isValid) {
            var c = new Card(input_q.value, input_a.value);
            current_questions.newCard(c);
            populateCurrentCards();
            input_a.value = "";
            input_q.value = "";
        }
    }

    q_box.appendChild(q_paragraph);
    q_box.appendChild(submit_question);

    document.body.appendChild(q_box);
    /**********************************************************/

    //Complete Button -> 4th
    completeButton.setAttribute("id", "completeDeck");
    completeButton.textContent = "Complete Deck";
    completeButton.onclick = function() {
        if(input_name.value == "") {
            input_name.style.outline = "2px solid red";
        }
        else {
            current_questions.name = input_name.value;
            storage.add(current_questions);
            storage.write();
            ipcRenderer.send("return");
        }
    }
    completeButtonDiv.setAttribute("class", "bottomButtonDiv");
    completeButtonDiv.appendChild(completeButton);

    document.body.appendChild(completeButtonDiv);
    /*************************************************************/

    //Back Button -> 5th
    backButton.setAttribute("id", "back");
    backButton.textContent = "Back";
    backButton.onclick = function() {
        ipcRenderer.send("return");
    }

    bottomBackButtonDiv.setAttribute("class", "bottomButtonDiv");
    bottomBackButtonDiv.appendChild(backButton);

    document.body.appendChild(bottomBackButtonDiv);
    /*****************************************************************/

    //Card Display -> 6th
    cardDisplay.setAttribute("id", "cardDisplay");

    document.body.appendChild(cardDisplay);
    /******************************************************************/

    //Apply Color scheme based on user's choice
    /*applyColorTheme();*/
}

function applyColorTheme() {
    //TODO: Implement Color Scheme
}

function populateCurrentCards() {
    cardDisplay.innerHTML = "";
    for(var i = 0; i < current_questions.cards.length; i++) {
        var q = document.createElement("p");
        q.textContent = current_questions.cards[i].question;
        cardDisplay.appendChild(q);
    }
}