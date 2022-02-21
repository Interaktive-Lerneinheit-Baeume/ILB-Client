import {
    Event,
    Observable
} from "../utils/Observable.js";

let isInitialized = false;

function onRadioButtonChanged(event) {
    let likertValue = event.target.closest("label").getAttribute("data-value"),
        questionLabel = event.target.closest(".likert-scale").getAttribute("data-question-label"),
        questionId = event.target.closest(".likert-scale").getAttribute("data-question-id");
    
    this.notifyAll(new Event("likertItemChanged", {
        label: questionLabel,
        id: questionId,
        value: likertValue
    }));
}

function getFieldDataFromTarget(el) {
    return {
        label: el.getAttribute("data-question-label"),
        id: el.getAttribute("data-question-id"),
        value: el.value
    };
}

function getListDataFromTarget(el) {
    return {
        label: el.closest("[class*=\"-choice-list\"]").getAttribute("data-question-label"),
        id: el.closest("[class*=\"-choice-list\"]").getAttribute("data-question-id"),
        value: el.getAttribute("data-value"),
        status: el.checked
    };
}

function onInputFormChanged(event) {
    let target = event.target,
        data = null;
    if (["checkbox", "radio"].includes(target.getAttribute("type"))) {
        data = getListDataFromTarget(target); //text - type
    } else {
        data = getFieldDataFromTarget(target);
    }
    this.notifyAll(new Event("formInputChanged", data));
}

function findForms(context) {
    let likertScaleButtons = document.querySelectorAll(".likert-scale input[type=\"radio\"]"),
        formInputs = document.querySelectorAll(".field-set input"),
        textAreaInputs = document.querySelectorAll("textarea"); // TODO: Combine with previous selector if possible
    
    likertScaleButtons.forEach((radioButton) => radioButton.addEventListener("change", onRadioButtonChanged.bind(context)));
    formInputs.forEach((inputs) => inputs.addEventListener("change", onInputFormChanged.bind(context)));
    textAreaInputs.forEach((inputs) => inputs.addEventListener("change", onInputFormChanged.bind(context)));
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