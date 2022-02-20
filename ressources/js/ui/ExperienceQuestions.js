import { Observable, Event } from "../utils/Observable.js";

let obstaclesExperience,
  understandableExperience,
  goodExperience,
  tippExperience,
  durationTimeOfLearningAndVisualisation, 
  durationTimeOfVisualisation, 
  durationTimeOfKnowledgeTest;

class ExperienceQuestions extends Observable {
  constructor() {
    super();
    this.textAreasExperience = document.getElementsByClassName("experience");
    obstaclesExperience = document.querySelector("#obstacles-experience");
    understandableExperience = document.querySelector("#understandable-experience");
    goodExperience = document.querySelector("#good-experience");
    tippExperience = document.querySelector("#tipp-experience");
  }

  static sendToEndButtonClicked() {
    let targetInfo = this.getAllExperienceAnswers();
    let event = new Event("onSendToEndButtonClick", targetInfo);
    this.notifyAll(event);
  }

  static setAllDurationTimes(pDurationTimeOfLearningAndVisualisation, pDurationTimeOfVisualisation, pDurationTimeOfKnowledgeTest){
    durationTimeOfKnowledgeTest = pDurationTimeOfKnowledgeTest;
    durationTimeOfLearningAndVisualisation = pDurationTimeOfLearningAndVisualisation;
    durationTimeOfVisualisation = pDurationTimeOfVisualisation;

    console.log("SET durationTimeOfKnowledgeTest "+durationTimeOfKnowledgeTest +" durationTimeOfLearningAndVisualisation "+durationTimeOfLearningAndVisualisation);
  }

  getAllExperienceAnswers() {
    console.log("durationTimeOfVisualisation "+durationTimeOfVisualisation, durationTimeOfLearningAndVisualisation, durationTimeOfKnowledgeTest);
    let wholeInfoTarget = {
      erfahrung_auf_der_lernplattform_einschaetzen: obstaclesExperience.value,
      war_das_lernmaterial_nachvollziebar: understandableExperience.value,
      gut_gefallen: goodExperience.value,
      nicht_gefallen_verbesserungen: tippExperience.value,
      duration_time_of_learning_and_visualisation: durationTimeOfLearningAndVisualisation,
      duration_time_of_visualisation: durationTimeOfVisualisation,
      duration_time_of_knowledge_test: durationTimeOfKnowledgeTest
    };

    return wholeInfoTarget;
  }
}

export default ExperienceQuestions;
