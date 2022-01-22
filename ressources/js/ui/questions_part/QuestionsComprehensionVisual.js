import Observable from "../../utils/Observable.js";

let differenceInput;

class QuestionsComprehensionVisual extends Observable {
  constructor(el) {
    super();
    differenceInput = el.querySelector("#difference-of-trees");
  }

  getAllInfo() {
    return { compr_differenceOfTrees: differenceInput.value };
  }
}

export default QuestionsComprehensionVisual;
