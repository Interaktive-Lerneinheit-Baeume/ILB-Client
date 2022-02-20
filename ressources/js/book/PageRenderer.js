import { Event, Observable } from "../utils/Observable.js";
import NavController from "./NavController.js";
import StartSite from "./../ui/StartSite.js";
import ExperienceQuestions from "../ui/ExperienceQuestions.js";

let pages,
  firstTimeOpeningVisualisation = 0,
  startTimeOfLearningAndVisualisation,
  endTimeOfLearningAndVisualisation,
  durationTimeOfLearningAndVisualisation,
  startTimeOfVisualisation,
  endTimeOfVisualisation,
  durationTimeOfVisualisation,
  startTimeOfKnowledgeTest,
  endTimeOfKnowledgeTest,
  durationTimeOfKnowledgeTest,
  
  startSite,
  mainSites,
  experience
  ;

function hideAllPages(parent) {
  pages = parent.querySelectorAll(".page");
  // bazo
  //   pages.forEach((page) => {
  //     page.classList.remove("left", "right");
  //     page.classList.add("hidden");
  //   });
}

class PageRenderer extends Observable {
  constructor(el) {
    super();
    this.el = el;
  }

  render(page) {
    hideAllPages(this.el);

    page.el.classList.add("right");

    // bazo
    // page.el.classList.remove("left", "right");
    // bazo
    // if (page.showPrevious === true && page.previousPage !== null) {
    //   page.previousPage.el.classList.add("left");
    //   page.previousPage.el.classList.remove("hidden");
    // }

    // bazo
    // page.el.classList.add("right");
    // page.el.classList.remove("hidden");

    let pages_flipped = document.querySelectorAll(".flipped");

    for (let index = 0; index < pages.length; index++) {
      const element = pages[index];
      element.style.zIndex = pages.length - index;
      let side_1_without_zIndex = element.querySelector(".side-1");
      side_1_without_zIndex.style.zIndex = element.style.zIndex;
    }

    for (let index = 0; index < pages_flipped.length; index++) {
      const element = pages_flipped[index];
      element.style.zIndex = 14;

      let side_1_without_zIndex = element.querySelector(".side-1");
      side_1_without_zIndex.style.zIndex = 0;
    }

    console.log(
        "page.saveToSend " +
          page.saveToSend +
          page.el.classList +
          " chapter "+ 
          page.chapter
      );

    if (page.canGoBack === false) {
      NavController.disablePreviousPageButton();
    } else {
      NavController.enablePreviousPageButton();
    }

    if (page.chapter === "binary_tree") {
      startTimeOfLearningAndVisualisation = Date.now();
      console.log("CHAPTER tree "+startTimeOfLearningAndVisualisation);
    } else if (page.chapter === "binary_tree_visualization") {

      if (firstTimeOpeningVisualisation == 0) {
        startTimeOfVisualisation = Date.now();
        firstTimeOpeningVisualisation += 1;
        console.log("CHAPTER tree vis "+startTimeOfVisualisation);
      }
    }


    
    if (page.chapter === "demographic_asessment_data") {
      console.log("save");
    //   startSite = StartSite.getStartSite();
    //   startSite.sendDemographicData();
    } else if (page.saveToSend === "end_time_of_learning_and_vis") {
      endTimeOfLearningAndVisualisation = Date.now();
      endTimeOfVisualisation = Date.now();
      startTimeOfKnowledgeTest = Date.now();

      durationTimeOfLearningAndVisualisation =
        endTimeOfLearningAndVisualisation - startTimeOfLearningAndVisualisation; //in milliseconds

      durationTimeOfVisualisation =
        endTimeOfVisualisation - startTimeOfVisualisation;
      
    } else if (page.saveToSend === "knowledge_test") {
      endTimeOfKnowledgeTest = Date.now();

      durationTimeOfKnowledgeTest =
        endTimeOfKnowledgeTest - startTimeOfKnowledgeTest;

    //   mainSites.sendToExperienceButtonClicked();

    } else if (page.saveToSend === "experience") {
    //   experience.setAllDurationTimes(
    //     durationTimeOfLearningAndVisualisation / 1000,
    //     durationTimeOfVisualisation / 1000,
    //     durationTimeOfKnowledgeTest / 1000
    //   );

    //   experience.sendToEndButtonClicked();
    }
  }

  setListeners(pStartSite, pMainSites, pExperienceQuestions) {
    startSite = pStartSite;
    mainSites = pMainSites;
    experience = pExperienceQuestions;
  }
}

export default new PageRenderer(document.querySelector(".book"));
