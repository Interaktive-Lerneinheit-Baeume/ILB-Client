import { Observable, Event } from "../utils/Observable.js";

let wholeInfo = {},
  radios = [],
  radioLabels = [],
  nextButton,
  now,
  oopEl,
  mmeEl,
  adpEl,
  oopValuesCheckedAsString = "",
  adpValuesCheckedAsString = "",
  mmeValuesCheckedAsString = "",
  javaKnowledges;

const blackColor = "#000000",
  darkBlueColor = blackColor,
  ownGrayColor = "#9b9b9b",
  whiteColor = "#FFFFFF";

function allCirclesAtBeginDesign() {
  for (let index = 0; index < javaKnowledges.length; index++) {
    const element = javaKnowledges[index];
    element.style.background = whiteColor;
  }
}

class StartSite extends Observable {
  constructor() {
    super();
    this.name = document
      .querySelector(".participant-name")
      .querySelector("input");
    this.VPhonor = document.querySelector(".private_data");

    this.number = document
      .querySelector(".participant-number")
      .querySelector("input");
    this.age = document
      .querySelector(".participant-age")
      .querySelector("input");
    this.gender = document
      .querySelector(".participant-gender")
      .querySelector("#radio-buttons");
    oopEl = document.querySelector("#oop");
    adpEl = document.querySelector("#adp");
    mmeEl = document.querySelector("#mme");

    this.anotherSkills = document.querySelector("#another-skills");

    javaKnowledges = document.getElementsByClassName("circle");
    for (let index = 0; index < javaKnowledges.length; index++) {
      const element = javaKnowledges[index];
      element.addEventListener("click", function (e) {
        allCirclesAtBeginDesign();

        if (e.target.id == "1_circle") {
          e.target.style.background = blackColor;
        } else if (e.target.id == "2_circle") {
          document.getElementById("1_circle").style.background = blackColor;
          e.target.style.background = blackColor;
        } else if (e.target.id == "3_circle") {
          document.getElementById("1_circle").style.background = blackColor;
          document.getElementById("2_circle").style.background = blackColor;
          e.target.style.background = blackColor;
        } else if (e.target.id == "4_circle") {
          document.getElementById("1_circle").style.background = blackColor;
          document.getElementById("2_circle").style.background = blackColor;
          document.getElementById("3_circle").style.background = blackColor;
          e.target.style.background = blackColor;
        } else {
          document.getElementById("1_circle").style.background = blackColor;
          document.getElementById("2_circle").style.background = blackColor;
          document.getElementById("3_circle").style.background = blackColor;
          document.getElementById("4_circle").style.background = blackColor;
          e.target.style.background = blackColor;
        }
      });
    }

    now = Date(Date.now()).toString();

    nextButton = document.querySelector("#next-button");

    radioLabels = this.gender.getElementsByClassName("rad");
    radios = this.gender.getElementsByClassName("radios");

    for (let index = 0; index < radios.length; index++) {
      const element = radios[index];
      element.addEventListener("click", function (e) {
        if (index == 0) {
          radioLabels[index].style.color = darkBlueColor;
          radioLabels[1].style.color = ownGrayColor;
          radioLabels[2].style.color = ownGrayColor;
        } else if (index == 1) {
          radioLabels[index].style.color = darkBlueColor;
          radioLabels[0].style.color = ownGrayColor;
          radioLabels[2].style.color = ownGrayColor;
        } else {
          radioLabels[index].style.color = darkBlueColor;
          radioLabels[0].style.color = ownGrayColor;
          radioLabels[1].style.color = ownGrayColor;
        }
      });
    }

    this.number.addEventListener("focus", this.onNumberFocused.bind(this));
    this.number.addEventListener("blur", this.onNumberBlured.bind(this));
  }

  getCirclesColored() {}

  onNumberBlured() {
    this.VPhonor.style.color = "";
  }

  onNumberFocused() {
    this.VPhonor.style.color = blackColor;
  }

  hideTheSite(el) {
    el.style.display = "none";
  }

  showTheSite(el) {
    el.style.display = "block";
  }

  sendDemographicData() {
    wholeInfo = this.getAllInfo();
    let event = new Event("onGotoAnimationButtonClicked", wholeInfo);
    this.notifyAll(event);
  }

  setButtonClickable() {
    nextButton.disabled = false;
  }

  getAllInfo() {
    let gender = this.getGenderInfo();
    let skills = this.getSkillsInfo();
    let anotherLanguages = this.anotherSkills.value;
    let javaKnowledge = this.getJavaKnowledge();

    return {
      age: this.getAge(),
      studentNumber: this.number.value,
      name: this.getName(),
      modus: "startDataReceived",
      skills: skills,
      gender: gender,
      another_languages: anotherLanguages,
      java_knowledge: javaKnowledge,
      start_time: now,
    };
  }

  getJavaKnowledge() {
    let counter = 0;
    for (let index = 0; index < javaKnowledges.length; index++) {
      const element = javaKnowledges[index];
      if (element.style.backgroundColor == "rgb(0, 0, 0)") {
        counter += 1;
      }
    }
    return counter;
  }

  getName() {
    return this.name.value;
  }

  getAge() {
    return this.age.value;
  }

  getGenderInfo() {
    //0-male, 1-female, 2-diverse
    for (let index = 0; index < radios.length; index++) {
      if (radios[index].checked) {
        return radios[index].value;
      }
    }
  }

  getOopValuesCheckedAsString() {
    return oopValuesCheckedAsString;
  }

  getAdpValuesCheckedAsString() {
    return adpValuesCheckedAsString;
  }

  getMmeValuesCheckedAsString(){
    return mmeValuesCheckedAsString;
  }

  getSkillsInfo() {
    let wholeSkillsAsString = "";

    //oop
    if (
      oopEl
        .querySelector("#radio-buttons")
        .querySelector("#my_radio_button_id1").checked
    ) {
      oopValuesCheckedAsString += "object-oriented programming: gar nicht; ";
      wholeSkillsAsString += "object-oriented programming: gar nicht; ";
    } else if (
      oopEl
        .querySelector("#radio-buttons")
        .querySelector("#my_radio_button_id2").checked
    ) {
      oopValuesCheckedAsString += "object-oriented programming: wenig; ";
      wholeSkillsAsString += "object-oriented programming: wenig; ";
    } else if (
      oopEl
        .querySelector("#radio-buttons")
        .querySelector("#my_radio_button_id3").checked
    ) {
      oopValuesCheckedAsString += "object-oriented programming: gut; ";
      wholeSkillsAsString += "object-oriented programming: gut; ";
    } else if (
      oopEl
        .querySelector("#radio-buttons")
        .querySelector("#my_radio_button_id4").checked
    ) {
      oopValuesCheckedAsString += "object-oriented programming: sehr gut; ";
      wholeSkillsAsString += "object-oriented programming: sehr gut; ";
    } else if (
      oopEl
        .querySelector("#radio-buttons")
        .querySelector("#my_radio_button_id5").checked
    ) {
      oopValuesCheckedAsString +=
        "object-oriented programming: ausgezeichnet; ";
      wholeSkillsAsString += "object-oriented programming: ausgezeichnet ";
    }

    // wholeSkillsAsString += oopValuesCheckedAsString;

    //adp
    if (
      adpEl
        .querySelector("#radio-buttons")
        .querySelector("#adp-my_radio_button_id1").checked
    ) {
      adpValuesCheckedAsString += "algorithm and datastructure: gar nicht; ";
      wholeSkillsAsString += "algorithm and datastructure: gar nicht; ";
    } else if (
      adpEl
        .querySelector("#radio-buttons")
        .querySelector("#adp-my_radio_button_id2").checked
    ) {
      adpValuesCheckedAsString += "algorithm and datastructure: wenig; ";
      wholeSkillsAsString += "algorithm and datastructure: wenig; ";

    } else if (
      adpEl
        .querySelector("#radio-buttons")
        .querySelector("#adp-my_radio_button_id3").checked
    ) {
      adpValuesCheckedAsString += "algorithm and datastructure: gut; ";
      wholeSkillsAsString += "algorithm and datastructure: gut; ";

    } else if (
      adpEl
        .querySelector("#radio-buttons")
        .querySelector("#adp-my_radio_button_id4").checked
    ) {
      adpValuesCheckedAsString += "algorithm and datastructure: sehr gut; ";
      wholeSkillsAsString += "algorithm and datastructure: sehr gut; ";

    } else if (
      adpEl
        .querySelector("#radio-buttons")
        .querySelector("#adp-my_radio_button_id5").checked
    ) {
      adpValuesCheckedAsString +=
        "algorithm and datastructure: ausgezeichnet; ";
      wholeSkillsAsString += "algorithm and datastructure: ausgezeichnet; ";

    }

    // wholeSkillsAsString += adpValuesCheckedAsString;

    //mme
    if (
      mmeEl
        .querySelector("#radio-buttons")
        .querySelector("#mme-my_radio_button_id1").checked
    ) {
      mmeValuesCheckedAsString += "javascript programming: gar nicht; ";
      wholeSkillsAsString += "javascript programming: gar nicht; ";

    } else if (
      mmeEl
        .querySelector("#radio-buttons")
        .querySelector("#mme-my_radio_button_id2").checked
    ) {
      mmeValuesCheckedAsString += "javascript programming: wenig; ";
      wholeSkillsAsString += "javascript programming: wenig; ";

    } else if (
      mmeEl
        .querySelector("#radio-buttons")
        .querySelector("#mme-my_radio_button_id3").checked
    ) {
      mmeValuesCheckedAsString += "javascript programming: gut; ";
      wholeSkillsAsString += "javascript programming: gut; ";

    } else if (
      mmeEl
        .querySelector("#radio-buttons")
        .querySelector("#mme-my_radio_button_id4").checked
    ) {
      mmeValuesCheckedAsString += "javascript programming: sehr gut; ";
      wholeSkillsAsString += "javascript programming: sehr gut; ";

    } else if (
      mmeEl
        .querySelector("#radio-buttons")
        .querySelector("#mme-my_radio_button_id5").checked
    ) {
      mmeValuesCheckedAsString += "javascript programming: ausgezeichnet; ";
      wholeSkillsAsString += "javascript programming: ausgezeichnet; ";

    }
    return wholeSkillsAsString;
  }
}

export default StartSite;
