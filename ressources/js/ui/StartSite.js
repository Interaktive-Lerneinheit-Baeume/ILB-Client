import { Observable, Event } from "../utils/Observable.js";

let wholeInfo = {},
  radios = [],
  radioLabels = [],
  nextButton,
  now,
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
  constructor(el) {
    super();
    this.name = el.querySelector(".participant-name").querySelector("input");
    this.VPhonor = el.querySelector(".private_data");

    this.number = el
      .querySelector(".participant-number")
      .querySelector("input");
    this.age = el.querySelector(".participant-age").querySelector("input");
    this.gender = el
      .querySelector(".participant-gender")
      .querySelector("#radio-buttons");
    this.skills = el
      .querySelector(".participant-skills")
      .querySelector("#skills-checkboxes");
    this.anotherSkills = el.querySelector("#another-skills");

    javaKnowledges = el.getElementsByClassName("circle");
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

  gotoAnimation() {
    wholeInfo = this.getAllInfo();
    // if (this.getName() == "" || this.getName() == " " || this.getName() == null ||
    //     this.getGenderInfo() == "" || this.getGenderInfo() == " " || this.getGenderInfo() == null ||
    //     this.getAge() == "" || this.getAge() == " " || this.getAge() == null) {
    //     console.log("nuuul" + wholeInfo.name + ": :" + wholeInfo.json);
    //     return;
    // }
    // else {
    let event = new Event("onGotoAnimationButtonClicked", wholeInfo);
    this.notifyAll(event);
    // }
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

  getSkillsInfo() {
    let wholeSkillsAsString = "";
    if (this.skills.querySelector("#oop").checked) {
      wholeSkillsAsString += "oop, ";
    }
    if (this.skills.querySelector("#adp").checked) {
      wholeSkillsAsString += "adp, ";
    }
    if (this.skills.querySelector("#mme").checked) {
      wholeSkillsAsString += "mme, ";
    }
    if (this.skills.querySelector("#android").checked) {
      wholeSkillsAsString += "android, ";
    }

    return wholeSkillsAsString;
  }
}

export default StartSite;
