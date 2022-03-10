import Observable from "../../utils/Observable.js";

let myMainCodeGroups = [],
  myCodeAlgGroups = [];

class CodeVisualizer extends Observable {
  constructor(el, approach) {
    super();

    if (approach == "constructing") {
      this.panelElementCodeAlg = document.querySelector("#panel-code-alg");
    } else {
      //"viewing"
      this.panelElementCodeAlg = document.querySelector("#panel-code-alg");
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
