import {
    Event,
    Observable
} from "../utils/Observable.js";

let isInitialized = false;

function onRadioButtonClicked(event) {
    let likertValue = event.target.closest("label").getAttribute("data-value"),
    questionLabel = event.target.closest(".likert-scale").getAttribute("data-question-label"),
    questionId = event.target.closest(".likert-scale").getAttribute("data-question-id");
    this.notifyAll(new Event("likertItemChanged", {
        label: questionLabel,
        id: questionId,
        value: likertValue
    }));
}

function findForms(context) {
    let likertScaleButtons = document.querySelectorAll(".likert-scale input[type=\"radio\"]");
    likertScaleButtons.forEach((button) => button.addEventListener("change", onRadioButtonClicked.bind(context)));
}

class FormsWatcher extends Observable {

    constructor() {
        super();
    }

    init() {
        if (isInitialized) {
            throw new Error("FormsWatcher was already initialized previously.")
        }
        findForms(this);
        isInitialized = true;
    }

}

export default new FormsWatcher();