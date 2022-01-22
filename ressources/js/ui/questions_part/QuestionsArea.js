import Observable from "../../utils/Observable.js";
import QuestionsKnowledgeVisual from "./QuestionsKnowledgeVisual.js";
import QuestionsApplAnalysisSynthVisual from "./QuestionsApplAnalysisSynthVisual.js";
import QuestionComprehensionVisual from "./QuestionsComprehensionVisual.js";

let questionsKnowledgeVisual, questionsComprVisual, questionsApplAnSynVisual;

function initQuestions(testQuestionsAreaEl) {
  let questionsKnowledgeVisualEl = testQuestionsAreaEl.querySelector(
    ".questions-knowledge"
  );
  questionsKnowledgeVisual = new QuestionsKnowledgeVisual(
    questionsKnowledgeVisualEl
  );

  let questionsComprVisualEl = testQuestionsAreaEl.querySelector(
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
  constructor(el) {
    super();

    initQuestions(el);
  }

  getAllQuestionAnswers() {
    let wholeInfoTarget = Object.assign(
      questionsKnowledgeVisual.getAllInfo(),
      questionsComprVisual.getAllInfo(),
      questionsApplAnSynVisual.getAllInfo()
    );
    return wholeInfoTarget;
  }
}

export default QuestionsArea;
