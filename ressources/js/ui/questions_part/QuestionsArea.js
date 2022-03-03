import Observable from "../../utils/Observable.js";
import QuestionsKnowledgeVisual from "./QuestionsKnowledgeVisual.js";
import QuestionsApplAnalysisSynthVisual from "./QuestionsApplAnalysisSynthVisual.js";
import QuestionComprehensionVisual from "../../unnoetige_dateien/QuestionsComprehensionVisual.js";

let questionsKnowledgeVisual, questionsComprVisual, questionsApplAnSynVisual;

function initQuestions() {
  let questionsKnowledgeVisualEl = document.querySelector(
    ".questions-knowledge"
  );
  questionsKnowledgeVisual = new QuestionsKnowledgeVisual(
    questionsKnowledgeVisualEl
  );

  let questionsComprVisualEl = document.querySelector(
    ".questions-comprehension"
  );
  questionsComprVisual = new QuestionComprehensionVisual(
    questionsComprVisualEl
  );

  let questionsApplAnSynVisualEl = document.querySelector(
    ".questions-appl-anal-synth"
  );
  questionsApplAnSynVisual = new QuestionsApplAnalysisSynthVisual(
    questionsApplAnSynVisualEl
  );
}

class QuestionsArea extends Observable {
  constructor() {
    super();

    initQuestions();
  }
}

export default QuestionsArea;
