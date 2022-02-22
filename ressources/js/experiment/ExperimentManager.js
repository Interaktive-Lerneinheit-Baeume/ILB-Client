import { Event, Observable } from "../utils/Observable.js";
import EventBus from "../utils/EventBus.js";
import FormsWatcher from "./FormsWatcher.js";
import Storage from "./../data_storage/Storage.js";

let storage,
  dataID,
  currentExperiment = {};

function onLikertItemChanged(event) {
  console.log("onlikert");
  let elementToAdd = event.data;
  if(elementToAdd.id === "experience"){
    if (currentExperiment["experience"] == null) {
        currentExperiment["experience"] = [];
        currentExperiment["experience"].push(elementToAdd);
      } else {
        currentExperiment["experience"].push(elementToAdd);
      }
  }
  else if(elementToAdd.id === "test-questions"){
    if (currentExperiment["test-questions"] == null) {
        currentExperiment["test-questions"] = [];
        currentExperiment["test-questions"].push(elementToAdd);
      } else {
        currentExperiment["test-questions"].push(elementToAdd);
      }
  }
  else if(elementToAdd.id === "self-assessment"){
    if (currentExperiment["self-assessment"] == null) {
        currentExperiment["self-assessment"] = [];
        currentExperiment["self-assessment"].push(elementToAdd);
      } else {
        currentExperiment["self-assessment"].push(elementToAdd);
      }
  }
  else if(elementToAdd.id === "demographic_data"){
    if (currentExperiment["demographic_data"] == null) {
        currentExperiment["demographic_data"] = [];
        currentExperiment["demographic_data"].push(elementToAdd);
      } else {
        currentExperiment["demographic_data"].push(elementToAdd);
      }
  }
  
  console.log(currentExperiment);
  console.log(event);
}

function onFormInputChanged(event) {
  console.log("onInput");
  let elementToAdd = event.data;
  console.log("elementToAdd");
  console.log(elementToAdd);
  if (currentExperiment["test-questions"] == null) {
    currentExperiment["test-questions"] = [];
    currentExperiment["test-questions"].push(elementToAdd);
  } else {
    currentExperiment["test-questions"].push(elementToAdd);
  }
  console.log(currentExperiment);
  console.log(event);
}

function onGlobalEvent(event) {
  console.log(event);
}

function getIDFromURL() {
  let url = window.location.href;
  return url.split("#")[1];
}

class ExperimentManager extends Observable {
  constructor() {
    super();
    storage = new Storage();

    // initJSONStorage();
    EventBus.addEventListener("globalEvent", onGlobalEvent.bind(this));
  }

  async fetchExperiment() {
    dataID = getIDFromURL();
    console.log("dataID " + dataID);

    if (dataID) {
      if (dataID !== undefined) {
        storage.getExperiment(dataID).then(function (data) {
          // engagement = data.engagement;
          //   onGoingToAnimButtonClick();
        });
      } else {
        alert("Error 404!!!!!!");
      }
    } else {
      storage.pickRandomExperiment().then(function (data) {
        dataID = data.id;
        //   engagement = data.engagement;
        window.location.hash = dataID;
        currentExperiment = data;
        console.log("data");

        console.log(data);
        console.log("fetch");
        console.log(currentExperiment);

        return currentExperiment;
        //   intervalForCheckingFocus = setInterval(checkPageFocus, 60000); //60000 = 1 Min * 60 Sek (1000 MilliSek)
      });
    }

    // TODO: Fetch Experiment from Server, save in currentExperiment and return from Promise
  }

  watchForms() {
    FormsWatcher.init();
    FormsWatcher.addEventListener(
      "likertItemChanged",
      onLikertItemChanged.bind(this)
    );
    FormsWatcher.addEventListener(
      "formInputChanged",
      onFormInputChanged.bind(this)
    );
  }

  processPageSelection(page) {
    // TODO: Process page for necessary experiment logging
  }

  endExperiment() {
    storage.closeExperiment(dataID, experienceAnswers, data);
  }
}

export default new ExperimentManager();
