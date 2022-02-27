import { Event, Observable } from "../utils/Observable.js";
import NavController from "./NavController.js";
import EventBus from "./../utils/EventBus.js";
import ExperimentManager from "../experiment/ExperimentManager.js";


let currentExperiment = {};

function hideAllPages(parent) {
  let pages = parent.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("left", "right");
    page.classList.add("hidden");
  });
}

class PageRenderer extends Observable {
  constructor(el) {
    super();
    this.el = el;
  }

  render(page) {
    // EventBus.relayEvent(
    //   new Event("checkingTheFields", {
    //     time: Date(Date.now()).toString(),
    //     value: "checking the fields",
    //   })
    // );

    currentExperiment = ExperimentManager.getExperiment();
    console.log(currentExperiment);
    // console.log(currentExperiment["demographic_data"]);

    let emptyFields = false;

    if(currentExperiment !== null && currentExperiment["demographic_data"] !== undefined && currentExperiment["self-assessment"] !== undefined){
        console.log("wir sind drin");
        for (let index = 0; index < currentExperiment["demographic_data"].length; index++) {
            const element = currentExperiment["demographic_data"][index];
            console.log(element);
            if(element["participant-semester"] == null ||
            element["participant-study"] == null ||
            element["participant-education-degree"] == null ||
            element["participant-semester"] == undefined ||
            element["participant-study"] == undefined ||
            element["participant-education-degree"] == undefined){
                emptyFields = true;
                console.log("empty "+emptyFields);
            }
        }

        for (let index = 0; index < currentExperiment["self-assessment"].length; index++) {
            const element = currentExperiment["self-assessment"][index];
            if(element["Meine Kenntnisse der Programmiersprache schätze ich allgemein sehr hoch ein"] == null ||
            element["Ich verstehe den Aufbau von Klassen (Attribute, Konstruktoren, Methoden) und kann geeignete Lösungen für kleinere Problemstellungen entwickeln"] == null ||
            element["Ich bin in der Lage, grundlegende Konzepte der objektorientierten Programmierung, wie z.B. Vererbung, Komposition zu analysieren"] == null ||
            element["Ich bin in der Lage, vorhandene Klassenbibliotheken"] == null ||
            element["Ich kann  primitive Datentype wie byte, short..."] == null ||
            element["Ich bin in der Lage, grundlegende Algorithmen und Datenstrukturen"] == null ||
            element["Ich bin in der Lage, die Datenstrukturen und Algorithmen zu bewerten und zu vergleichen"] == null ||
            element["Ich bin in der Lage, komplexe"] == null ||
            element["Grundlegende Syntax- und Grammatikregeln"] == null
            ) {
                emptyFields = true;
                console.log("empty "+emptyFields);
            }
        }
    }
    
    
    if(emptyFields === true) {
        return;
    }
    else {
        hideAllPages(this.el);
        page.el.classList.add("left");
        page.el.classList.remove("hidden");
        if (page.nextPage !== null && page.nextPage !== undefined) {
          page.nextPage.el.classList.add("right");
          page.nextPage.el.classList.remove("hidden");
        }
    
        if (page.canGoBack === false) {
          NavController.disablePreviousPageButton();
        } else {
          NavController.enablePreviousPageButton();
        }
    
        NavController.setTitleOnNextButton(page.title);
    }
  
    
  }
}

export default new PageRenderer(document.querySelector(".book"));
