import { Observable, Event } from "../utils/Observable.js";
import ViewingVisualizer from "./visualizers_part/ViewingVisualizer.js";
import ConstructVisualizer from "./visualizers_part/ConstructVisualizer.js";
import QuestionsArea from "./questions_part/QuestionsArea.js";

let viewingVisualizer, constructVisualizer, questionsArea;

class MainSite extends Observable {
  constructor() {
    super();

    this.visualizerElViewing = document.querySelector("#viewing");
    this.visualizerElConstructing = document.querySelector("#constructing");

    viewingVisualizer = new ViewingVisualizer(this.visualizerElViewing);

    constructVisualizer = new ConstructVisualizer(
      this.visualizerElConstructing
    );

    questionsArea = new QuestionsArea();
  }

  showConstructVis() {
    this.visualizerElConstructing.style.display = "block";
  }

  showViewingVis() {
    this.visualizerElViewing.style.display = "block";
  }

  hideConstructVis() {
    this.visualizerElConstructing.style.display = "none";
  }

  hideViewingVis() {
    this.visualizerElViewing.style.display = "none";
  }
}

export default MainSite;
