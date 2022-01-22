import { Observable, Event } from "../utils/Observable.js";

let obstaclesExperience,
  understandableExperience,
  goodExperience,
  tippExperience;

class ExperienceQuestions extends Observable {
  constructor(el) {
    super();
    this.textAreasExperience = document.getElementsByClassName("experience");
    obstaclesExperience = el.querySelector("#obstacles-experience");
    understandableExperience = el.querySelector("#understandable-experience");
    goodExperience = el.querySelector("#good-experience");
    tippExperience = el.querySelector("#tipp-experience");
  }

  sendToEndButtonClicked() {
    let targetInfo = this.getAllExperienceAnswers();
    let event = new Event("onSendToEndButtonClick", targetInfo);
    this.notifyAll(event);
  }

  getAllExperienceAnswers() {
    let wholeInfoTarget = {
      erfahrung_auf_der_lernplattform_einschaetzen: obstaclesExperience.value,
      war_das_lernmaterial_nachvollziebar: understandableExperience.value,
      gut_gefallen: goodExperience.value,
      nicht_gefallen_verbesserungen: tippExperience.value,
    };

    return wholeInfoTarget;
  }
}

export default ExperienceQuestions;
