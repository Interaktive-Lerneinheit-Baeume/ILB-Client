import { Event, Observable } from "../utils/Observable.js";
import Time from "../utils/Time.js";
import EventBus from "../utils/EventBus.js";
import FormsWatcher from "./FormsWatcher.js";
import Storage from "./../data_storage/Storage.js";
import SplashScreens from "./../ui/visualizers_part/SplashScreens.js";

let storage,
  dataID,
  currentExperiment = {},
  intervalForCheckingFocus;

function checkPageFocus() {
  if (document.hasFocus()) {
    storage.getExperiment(dataID).then(function (data) {
      if (data.state == "open") {
        // console.log("data id "+data.id + " OPEN state "+data.state);
        clearInterval(intervalForCheckingFocus);
        storage.breakProcess(data.id);
        SplashScreens.setNoExperimentAvailableSplash();
        SplashScreens.removeWelcomeSplash();
        SplashScreens.setSplashScreen();
      }
      // console.log("data id "+data.id + " OR state "+data.state);
    });
  }
}

function endExperiment() {
  clearInterval(intervalForCheckingFocus);
  storage.closeExperiment(currentExperiment.id, currentExperiment);
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
    currentExperiment["page-iterations"].push(elementToAdd.originalEvent);
  }

  if (elementToAdd.originalEvent.data.left_page_title === "time-end-over") {
    onExperimentEventHandling(elementToAdd);
    endExperiment();
    SplashScreens.setSplashScreen();
    SplashScreens.setTimeOverSplash();
  }
}

function onConstructControl(event) {
  let elementToAdd = event.data;
  if (currentExperiment["constructing-control"] == null) {
    currentExperiment["constructing-control"] = [];
    currentExperiment["constructing-control"].push(elementToAdd);
  } else {
    doubleChecking(currentExperiment["constructing-control"], elementToAdd);
  }
}

function onPlayAnimationButtonClicked(elementToAdd) {
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
  let elementToAdd = event.data;

  if (elementToAdd.id === "self-assessment-java") {
    if (currentExperiment["self-assessment-java"] == null) {
      currentExperiment["self-assessment-java"] = [];
      currentExperiment["self-assessment-java"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["self-assessment-java"], elementToAdd);
    }
  }

  if (elementToAdd.id === "self-assessment-javascript") {
    if (currentExperiment["self-assessment-javascript"] == null) {
      currentExperiment["self-assessment-javascript"] = [];
      currentExperiment["self-assessment-javascript"].push(elementToAdd);
    } else {
      doubleChecking(
        currentExperiment["self-assessment-javascript"],
        elementToAdd
      );
    }
  }

  if (elementToAdd.id === "self-assessment-python") {
    if (currentExperiment["self-assessment-python"] == null) {
      currentExperiment["self-assessment-python"] = [];
      currentExperiment["self-assessment-python"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["self-assessment-python"], elementToAdd);
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
      doubleChecking(currentExperiment["experience"], elementToAdd);
    }
  } else if (elementToAdd.id === "test-questions") {
    if (currentExperiment["test-questions"] == null) {
      currentExperiment["test-questions"] = [];
      currentExperiment["test-questions"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["test-questions"], elementToAdd);
    }
  } else if (elementToAdd.id === "demographic_data") {
    if (currentExperiment["demographic_data"] == null) {
      currentExperiment["demographic_data"] = [];
      currentExperiment["demographic_data"].push(elementToAdd);
    } else {
      doubleChecking(currentExperiment["demographic_data"], elementToAdd);
    }
  }
}

function onFormInputFocused(event) {
  let elementToAdd = event.data;

  if (elementToAdd.id === "test-questions") {
    if (currentExperiment["test-questions"] == null) {
      currentExperiment["test-questions"] = [];
      currentExperiment["test-questions"].push(elementToAdd);
    } else {
      doubleChecking(
        currentExperiment["test-questions"],
        elementToAdd,
        "focused"
      );
    }
  }
}

function doubleChecking(
  keyFieldOfExperiment,
  elementToAdd,
  focused = "another"
) {
  let uniqueLabels = [];
  let uniqueInfos = [];
  let uniqueValues = [];

  for (let index = 0; index < keyFieldOfExperiment.length; index++) {
    let demographicObject = keyFieldOfExperiment[index];
    uniqueLabels.push(demographicObject.label);
    uniqueInfos.push(demographicObject.info);
    uniqueValues.push(demographicObject.value);
  }

  let setOfUniqueLables = new Set(uniqueLabels);
  let setOfUniqueInfos = new Set(uniqueInfos);

  if (
    setOfUniqueLables.has(elementToAdd.label) &&
    elementToAdd.label !== "participant-visited-classes" &&
    elementToAdd.label !== "Aufgabe 1)" &&
    elementToAdd.label !== "Aufgabe 2)"
  ) {
    for (let index = 0; index < keyFieldOfExperiment.length; index++) {
      let demographicObject = keyFieldOfExperiment[index];
      if (
        demographicObject.label === elementToAdd.label &&
        elementToAdd.label !== undefined
      ) {
        demographicObject.value = elementToAdd.value;
        demographicObject.status = elementToAdd.status;
        demographicObject.end_time = elementToAdd.end_time;
      }
      if (
        demographicObject.type === elementToAdd.type &&
        elementToAdd.type !== undefined
      ) {
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

      if (
        demographicObject.info === elementToAdd.info &&
        elementToAdd.info !== undefined
      ) {
        demographicObject.time = elementToAdd.time;
        demographicObject.occurency_overall = elementToAdd.occurency_overall;
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
    intervalForCheckingFocus = setInterval(checkPageFocus, Time.ONE_HOUR * 2); //for 2 hours
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
        // alert("Error 404!!!!!!");
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
    FormsWatcher.init();
    FormsWatcher.addEventListener(
      "likertItemChanged",
      onLikertItemChanged.bind(this)
    );

    FormsWatcher.addEventListener(
      "formInputChanged",
      onFormInputChanged.bind(this)
    );

    FormsWatcher.addEventListener(
      "formInputFocused",
      onFormInputFocused.bind(this)
    );
  }

  getExperiment() {
    return currentExperiment;
  }
}

export default new ExperimentManager();
