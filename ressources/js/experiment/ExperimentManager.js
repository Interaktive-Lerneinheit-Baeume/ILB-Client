import {
    Event,
    Observable
} from "../utils/Observable.js";

class ExperimentManager extends Observable {

    constructor() {
        super();
    }

    async fetchExperiment() {
        return null; // TODO: Fetch Experiment from Server and return from Promise
    }

    processPageSelection(page) {
        // TODO: Process page for necessary experiment logging
    }

}

export default new ExperimentManager();