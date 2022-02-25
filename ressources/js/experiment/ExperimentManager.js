import { Event, Observable } from "../utils/Observable.js";
import EventBus from "../utils/EventBus.js";
import FormsWatcher from "./FormsWatcher.js";
import Storage from "./../data_storage/Storage.js";

let storage,
  dataID,
  currentExperiment = {},
  intervalForCheckingFocus;

function checkPageFocus() {
  if (document.hasFocus()) {
    storage.getExperiment(dataID).then(function (data) {
      if (data.state == "open") {
        //   mainSites.hideConstructVis();
        //   mainSites.hideViewingVis();

        //   startSite.hideTheSite(startEl);

        //   showTimeOverOrEndElement("time_over");
        clearInterval(intervalForCheckingFocus);

        FormsWatcher.breakWholePlattform();

        EventBus.relayEvent(
          new Event("experimentBroken", {
            time: Date(Date.now()).toString(),
            value: "experiment broken",
          })
        );
        storage.breakProcess(data.id);
      }
    });
  }
}

function endExperiment() {
  storage.closeExperiment(currentExperiment.id, currentExperiment);
  clearInterval(intervalForCheckingFocus);
  FormsWatcher.endWholePlattform();
}

function onExperimentEventHandling(elementToAdd) {
  if (currentExperiment["global-control"] == null) {
    currentExperiment["global-control"] = [];
    currentExperiment["global-control"].push(elementToAdd.originalEvent);
  } else {
    currentExperiment["global-control"].push(elementToAdd.originalEvent);
  }
}

function onPageLogging(elementToAdd) {
  if (currentExperiment["page-iterations"] == null) {
    currentExperiment["page-iterations"] = [];
    currentExperiment["page-iterations"].push(elementToAdd.originalEvent);
  } else {
    // doubleChecking(currentExperiment["page-iterations"]);
    currentExperiment["page-iterations"].push(elementToAdd.originalEvent);
  }
}

function onConstructControl(event) {
  let elementToAdd = event.data;

  console.log("constr ");
  console.log(elementToAdd);

  if (currentExperiment["constructing-control"] == null) {
    currentExperiment["constructing-control"] = [];
    currentExperiment["constructing-control"].push(elementToAdd);
    console.log("constr NULL ");
    console.log(elementToAdd);
  } else {
    // currentExperiment["constructing-control"].forEach((element) => {
    //   if (element.info === elementToAdd.info) {
    //     console.log("constr  INFO GLEICH");
    //     console.log(elementToAdd);
    doubleChecking(currentExperiment["constructing-control"], elementToAdd);
    //   } else {
    //     console.log("constr INFO UNGLEICH");
    //     console.log(elementToAdd);
    // doubleChecking(currentExperiment["constructing-control"], elementToAdd);
    //  currentExperiment["constructing-control"].push(elementToAdd);
    //   }
    // });
  }
}

function onPlayAnimationButtonClicked(elementToAdd) {
  console.log("elementToAdd.originalEvent");
  console.log(elementToAdd.originalEvent);
  if (currentExperiment["animation-control"] == null) {
    currentExperiment["animation-control"] = [];
    currentExperiment["animation-control"].push(elementToAdd.originalEvent);
  } else {
    doubleChecking(
      currentExperiment["animation-control"],
      elementToAdd.originalEvent
    );
  }
}

function onLikertItemChanged(event) {
  console.log("onlikert");
  let elementToAdd = event.data;
  console.log(elementToAdd);
  if (elementToAdd.id === "self-assessment") {
    if (currentExperiment["self-assessment"] == null) {
      currentExperiment["self-assessment"] = [];
      currentExperiment["self-assessment"].push(elementToAdd);
    } else {
      console.log("LIKERT double");
      console.log(elementToAdd);
      doubleChecking(currentExperiment["self-assessment"], elementToAdd);
    }
  }
}

function onFormInputChanged(event) {

  let elementToAdd = event.data;

  if (elementToAdd.id === "experience") {
    if (currentExperiment["experience"] == null) {
      currentExperiment["experience"] = [];
      currentExperiment["experience"].push(elementToAdd);
    } else {
      currentExperiment["experience"].push(elementToAdd);
    }
  } else if (elementToAdd.id === "test-questions") {
    if (currentExperiment["test-questions"] == null) {
      currentExperiment["test-questions"] = [];
      currentExperiment["test-questions"].push(elementToAdd);
    } else {
      currentExperiment["test-questions"].push(elementToAdd);
    }
  } else if (elementToAdd.id === "demographic_data") {
    if (currentExperiment["demographic_data"] == null) {
      currentExperiment["demographic_data"] = [];
      currentExperiment["demographic_data"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["demographic_data"], elementToAdd);
    }
  }

  console.log(currentExperiment);
}

// TODO wenn wir immer die Daten von den Listeners überschreiben wollen
//momentan nur für participan-degree - Ausbildungsinfo
function doubleChecking(keyFieldOfExperiment, elementToAdd) {
  console.log("elementToAdd");
  console.log(elementToAdd);
  console.log("keyFieldOfExperiment" + keyFieldOfExperiment.length);
  console.log(keyFieldOfExperiment);

  let uniqueLabels = [];
  let uniqueInfos = [];

  for (let index = 0; index < keyFieldOfExperiment.length; index++) {
    let demographicObject = keyFieldOfExperiment[index];
    uniqueLabels.push(demographicObject.label);
    uniqueInfos.push(demographicObject.info);
  }

  let setOfUniqueLables = new Set(uniqueLabels);
  let setOfUniqueInfos = new Set(uniqueInfos);
  console.log("set");

  console.log(setOfUniqueLables);

  if (setOfUniqueLables.has(elementToAdd.label) && elementToAdd.label !== "participant-visited-classes") {
    for (let index = 0; index < keyFieldOfExperiment.length; index++) {
      let demographicObject = keyFieldOfExperiment[index];
      console.log(demographicObject);
      if (
        demographicObject.label === elementToAdd.label &&
        elementToAdd.label !== undefined
      ) {
        demographicObject.value = elementToAdd.value;
        demographicObject.status = elementToAdd.status;
        console.log(demographicObject.value);
        console.log(elementToAdd.value);
        console.log(elementToAdd.status);
      }
      if (
        demographicObject.type === elementToAdd.type &&
        elementToAdd.type !== undefined
      ) {
        console.log("constr UNDEFINED TIME");
        console.log(elementToAdd);
        demographicObject.data.time = elementToAdd.data.time;
        demographicObject.data.occurency_overall =
          elementToAdd.data.occurency_overall;
      }
    }
  } else {
    keyFieldOfExperiment.push(elementToAdd);
  }

  if (setOfUniqueInfos.has(elementToAdd.info)) {
    for (let index = 0; index < keyFieldOfExperiment.length; index++) {
      let demographicObject = keyFieldOfExperiment[index];
      console.log(demographicObject);

      if (
        demographicObject.info === elementToAdd.info &&
        elementToAdd.info !== undefined
      ) {
        demographicObject.time = elementToAdd.time;
        demographicObject.occurency_overall = elementToAdd.occurency_overall;
        console.log("constr UNDEFINDE INFO");
        console.log(elementToAdd);
      }
    }
  } else {
    keyFieldOfExperiment.push(elementToAdd);
  }
}

function onGlobalEvent(event) {
  let elementToAdd = event.data;

  switch (elementToAdd.originalEvent.type) {
    case "pageIteration":
      onPageLogging(event.data);
      break;
    case "experimentEnded":
      onExperimentEventHandling(elementToAdd);
      endExperiment();
      break;
    case "experimentStarted":
      onExperimentEventHandling(elementToAdd);
      break;
    case "constructingWarningOccurencyLeftNode":
      onConstructControl(elementToAdd.originalEvent);
      break;
    case "constructingWarningOccurencyRightNode":
      onConstructControl(elementToAdd.originalEvent);
      break;
    case "playAnimationButtonClicked":
      onPlayAnimationButtonClicked(elementToAdd);
      break;
    case "experimentBroken": //wird das erreicht?
      onExperimentEventHandling(elementToAdd);
      break;
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

    if (dataID) {
      if (dataID !== undefined) {
        await storage.getExperiment(dataID).then(function (data) {
          currentExperiment = data;
        });
      } else {
        alert("Error 404!!!!!!");
      }
    } else {
      await storage.pickRandomExperiment().then(function (data) {
        dataID = data.id;
        window.location.hash = dataID;
        currentExperiment = data;
      });
    }
    return currentExperiment;
  }

  watchForms() {
    intervalForCheckingFocus = setInterval(checkPageFocus, 60000);

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
}

export default new ExperimentManager();
