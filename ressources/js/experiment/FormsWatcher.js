import { Event, Observable } from "../utils/Observable.js";

let isInitialized = false;

function onRadioButtonChanged(event) {
  let likertValue = event.target.closest("label").getAttribute("data-value"),
    questionLabel = event.target
      .closest(".likert-scale")
      .getAttribute("data-question-label"),
    questionId = event.target
      .closest(".likert-scale")
      .getAttribute("data-question-id"),
    questionCategory = event.target
      .closest(".likert-scale")
      .getAttribute("data-category");

  this.notifyAll(
    new Event("likertItemChanged", {
      label: questionLabel,
      id: questionId,
      value: likertValue,
      category: questionCategory,
    })
  );
}

function getFieldDataFromTarget(el) {
  return {
    label: el.getAttribute("data-question-label"),
    id: el.getAttribute("data-question-id"),
    value: el.value,
    end_time: Date(Date.now()).toString(),
    end_time_milliseconds: Date.now()
  };
}

function getListDataFromTarget(el) {
  return {
    label: el
      .closest('[class*="-choice-list"]')
      .getAttribute("data-question-label"),
    id: el.closest('[class*="-choice-list"]').getAttribute("data-question-id"),
    value: el.getAttribute("data-value"),
    status: el.checked,
    end_time: Date(Date.now()).toString(),
    end_time_milliseconds: Date.now()
  };
}

function onInputFormChanged(event) {
  let target = event.target,
    data = null;
  if (["checkbox", "radio"].includes(target.getAttribute("type"))) {
    data = getListDataFromTarget(target);
  } else {
    data = getFieldDataFromTarget(target); //type = text
  }
  this.notifyAll(new Event("formInputChanged", data));
}

function getFieldDataFromTargetEndTime(el) {
  return {
    label: el.getAttribute("data-question-label"),
    id: el.getAttribute("data-question-id"),
    value: el.value,
    start_time: Date(Date.now()).toString(),
    start_time_milliseconds: Date.now()
  };
}

function onInputFormFocused(event) {
  let target = event.target,
    data = null;

  if (!["checkbox", "radio"].includes(target.getAttribute("type"))) {
    data = getFieldDataFromTargetEndTime(target);
  }

  this.notifyAll(new Event("formInputFocused", data));
}

function findForms(context) {
  let likertScaleButtons = document.querySelectorAll(
      '.likert-scale input[type="radio"]'
    ),
    formInputs = document.querySelectorAll(
      ".field-set input, .field-set textarea"
    );

  likertScaleButtons.forEach((radioButton) =>
    radioButton.addEventListener("change", onRadioButtonChanged.bind(context))
  );

  formInputs.forEach((inputs) =>
    inputs.addEventListener("change", onInputFormChanged.bind(context))
  );

  Array.from(formInputs)
    .filter((el) => el.classList.contains("textarea_input"))
    .forEach((inputs) =>
      inputs.addEventListener("focus", onInputFormFocused.bind(context))
    );
}

class FormsWatcher extends Observable {
  constructor() {
    super();
  }

  init() {
    if (isInitialized) {
      throw new Error("FormsWatcher was already initialized previously.");
    }
    findForms(this);
    isInitialized = true;
  }

  getOpenFormFields() {
    let visibleFormFields = [
        ...document.querySelectorAll("[data-optional]"),
      ].filter(
        (element) => !element.closest(".page").classList.contains("hidden")
      ),
      unfilledRequiredFields = visibleFormFields.filter((field) => {
        return field.getAttribute("data-optional") === "false";
      });

    return unfilledRequiredFields;
  }
}

export default new FormsWatcher();
