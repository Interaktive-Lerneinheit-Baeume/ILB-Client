import {
    Event,
    Observable
} from "../utils/Observable.js";
import EventBus from "../utils/EventBus.js";
import FormsWatcher from "./FormsWatcher.js";

function onLikertItemChanged(event) {
    console.log(event);
}

function onInputValueChanged(event) {
    console.log(event);
}

function onGlobalEvent(event) {
    console.log(event);
}

let currentExperiment;

class ExperimentManager extends Observable {

    constructor() {
        super();
        EventBus.addEventListener("globalEvent", onGlobalEvent.bind(this));
    }

    async fetchExperiment() {
    
        return null; // TODO: Fetch Experiment from Server, save in currentExperiment and return from Promise
    }

    watchForms() {
       FormsWatcher.init();
       FormsWatcher.addEventListener("likertItemChanged", onLikertItemChanged.bind(this));
       FormsWatcher.addEventListener("formInputChanged", onInputValueChanged.bind(this));
    }

    processPageSelection(page) {
        // TODO: Process page for necessary experiment logging
    }

    endExperiment() {

    }

}

export default new ExperimentManager();