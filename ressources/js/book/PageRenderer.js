import { Event, Observable } from "../utils/Observable.js";
import NavController from "./NavController.js";
import EventBus from "./../utils/EventBus.js";
import ExperimentManager from "../experiment/ExperimentManager.js";
import SplashScreens from "../ui/visualizers_part/SplashScreens.js";

let currentExperiment = {}, pages;

function hideAllPages(parent) {
  pages = parent.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("left", "right");
    page.classList.add("hidden");
  });
}

class PageRenderer extends Observable {
  constructor(el) {
    super();
    this.el = el;
  }

  render(page) {
    currentExperiment = ExperimentManager.getExperiment();

    hideAllPages(this.el);
    page.el.classList.add("left");
    page.el.classList.remove("hidden");

    if (page.nextPage !== null && page.nextPage !== undefined) {
      page.nextPage.el.classList.add("right");
      page.nextPage.el.classList.remove("hidden");
    }

    if (page.canGoBack === false) {
      NavController.disablePreviousPageButton();
    } else {
      NavController.enablePreviousPageButton();
    }

    NavController.setTitleOnNextButton(page.title);

  }


  getActualOpenPages(){
    let openPages = [];
    for (let index = 0; index < pages.length; index++) {
      const p = pages[index];
      if(!(p.classList.contains("hidden"))){
        openPages.push(p);
      }
      
    }
 
    return openPages;
  }
}

export default new PageRenderer(document.querySelector(".book"));
