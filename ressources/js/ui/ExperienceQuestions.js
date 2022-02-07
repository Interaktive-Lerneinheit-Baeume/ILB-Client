import { Observable, Event } from "../utils/Observable.js";

let obstaclesExperience,
  understandableExperience,
  goodExperience,
  tippExperience;

class ExperienceQuestions extends Observable {
  constructor() {
    super();
    this.textAreasExperience = document.getElementsByClassName("experience");
    obstaclesExperience = document.querySelector("#obstacles-experience");
    understandableExperience = document.querySelector("#understandable-experience");
    goodExperience = document.querySelector("#good-experience");
    tippExperience = document.querySelector("#tipp-experience");
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
