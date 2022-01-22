import Observable from "../../utils/Observable.js";

let myMainCodeGroups = [],
  myCodeAlgGroups = [];

class CodeVisualizer extends Observable {
  constructor(el, approach) {
    super();

    if (approach == "constructing") {
      this.panelElementCodeAlg = document.querySelector("#panel-code-alg");
      this.panelElementMainCode = document.querySelector(
        "#panel-main-code-constructing"
      );
    } else {
      //"viewing"
      this.panelElementCodeAlg = document.querySelector("#panel-code-alg");
      this.panelElementMainCode = document.querySelector("#panel-main-code-viewing");
    }
  }

  getCodeAlgGroups() {
    return myCodeAlgGroups;
  }

  getMainCodeGroups() {
    return myMainCodeGroups;
  }
}

export default CodeVisualizer;
