import {
    Event,
    Observable
} from "../utils/Observable.js";
import FormsWatcher from "./FormsWatcher.js";

function onLikertItemChanged(event) {
    console.log(event);
}

function onInputValueChanged(event) {
    console.log(event);
}

class ExperimentManager extends Observable {

    constructor() {
        super();
    }

    async fetchExperiment() {
        return null; // TODO: Fetch Experiment from Server and return from Promise
    }

    watchForms() {
       FormsWatcher.init();
       FormsWatcher.addEventListener("likertItemChanged", onLikertItemChanged.bind(this));
       FormsWatcher.addEventListener("formInputChanged", onInputValueChanged.bind(this));
    }

    processPageSelection(page) {
        // TODO: Process page for necessary experiment logging
    }

}

export default new ExperimentManager();