import { Event, Observable } from "../utils/Observable.js";
import EventBus from "../utils/EventBus.js";
import FormsWatcher from "./FormsWatcher.js";
import Storage from "./../data_storage/Storage.js";

let storage,
  dataID,
  currentExperiment = {};

function endExperiment() {
  console.log("CURR");
  console.log(currentExperiment);
  storage.closeExperiment(currentExperiment.id, currentExperiment);
  console.log("THE END");
}

function onPageLogging(elementToAdd) {
  console.log("pageLogging");
  if (currentExperiment["page-iterations"] == null) {
    currentExperiment["page-iterations"] = [];
    currentExperiment["page-iterations"].push(elementToAdd.originalEvent);
  } else {
    doubleChecking(currentExperiment["page-iterations"]);
    currentExperiment["page-iterations"].push(elementToAdd.originalEvent);
  }
}

function onLikertItemChanged(event) {
  console.log("onlikert");
  let elementToAdd = event.data;

  if (elementToAdd.id === "self-assessment") {
    if (currentExperiment["self-assessment"] == null) {
      currentExperiment["self-assessment"] = [];
      currentExperiment["self-assessment"].push(elementToAdd);
    } else {
      currentExperiment["self-assessment"].push(elementToAdd);
    }
  }

  console.log(currentExperiment);
  console.log(event);
}

function onFormInputChanged(event) {
  //   console.log("onInput");
  let elementToAdd = event.data;
  //   console.log("elementToAdd");
  //   console.log(elementToAdd);
  if (elementToAdd.id === "experience") {
    if (currentExperiment["experience"] == null) {
      currentExperiment["experience"] = [];
      currentExperiment["experience"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["experience"]);
      currentExperiment["experience"].push(elementToAdd);
    }
  } else if (elementToAdd.id === "test-questions") {
    if (currentExperiment["test-questions"] == null) {
      currentExperiment["test-questions"] = [];
      currentExperiment["test-questions"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["test-questions"]);
      currentExperiment["test-questions"].push(elementToAdd);
    }
  } else if (elementToAdd.id === "self-assessment") {
    if (currentExperiment["self-assessment"] == null) {
      currentExperiment["self-assessment"] = [];
      currentExperiment["self-assessment"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["self-assessment"]);
      currentExperiment["self-assessment"].push(elementToAdd);
    }
  } else if (elementToAdd.id === "demographic_data") {
    if (currentExperiment["demographic_data"] == null) {
      currentExperiment["demographic_data"] = [];
      currentExperiment["demographic_data"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["demographic_data"], elementToAdd);
    }
    //   currentExperiment["demographic_data"].push(elementToAdd);
  }
}
//   console.log(currentExperiment);
//   console.log(event);

// TODO wenn wir immer die Daten von den Listeners überschreiben wollen
//momentan nur für participan-degree - Ausbildungsinfo
function doubleChecking(keyFieldOfExperiment, elementToAdd) {
  console.log("keyFieldOfExperiment.length " + keyFieldOfExperiment.length);

  for (let index = 0; index < keyFieldOfExperiment.length; index++) {
    let demographicObject = keyFieldOfExperiment[index];
    if (demographicObject.label === "participant-degree") {
      // keyFieldOfExperiment.slice(0, 1);
      // keyFieldOfExperiment.push(elementToAdd);

      demographicObject.value = elementToAdd.value;
      demographicObject.status = elementToAdd.status;
    }
  }
}

function onGlobalEvent(event) {
  let elementToAdd = event.data;

  if (elementToAdd.originalEvent.type === "pageIteration") {
    onPageLogging(event.data); // - > "page-iterations" Object aus Array
  } else {
    //experimentEnded or experimentStarted - > "global-control" Object aus Array
    if (currentExperiment["global-control"] == null) {
      currentExperiment["global-control"] = [];
      currentExperiment["global-control"].push(elementToAdd.originalEvent);
    } else {
      doubleChecking(currentExperiment["global-control"]);
      currentExperiment["global-control"].push(elementToAdd.originalEvent);
    }

    if (elementToAdd.originalEvent.type === "experimentEnded") {
      endExperiment();
    }
  }
}

function getIDFromURL() {
  let url = window.location.href;
  return url.split("#")[1];
}

class ExperimentManager extends Observable {
  constructor() {
    super();
    storage = new Storage();

    EventBus.addEventListener("globalEvent", onGlobalEvent.bind(this));
  }

  async fetchExperiment() {
    dataID = getIDFromURL();
    console.log("dataID " + dataID);

    if (dataID) {
      if (dataID !== undefined) {
        storage.getExperiment(dataID).then(function (data) {});
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

  //   processPageSelection(page) {
  //     onPageLogging();
  //   }
}

export default new ExperimentManager();
