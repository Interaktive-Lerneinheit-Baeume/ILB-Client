import {Observable, Event} from "../utils/Observable.js";
import ViewingVisualizer from "./visualizers_part/ViewingVisualizer.js";
import ConstructVisualizer from "./visualizers_part/ConstructVisualizer.js";
import QuestionsArea from "./questions_part/QuestionsArea.js";

let viewingVisualizer, constructVisualizer, 
testQuestionsAreaEl, questionsArea;

class MainSite extends Observable {

    constructor(el){
        super();

        this.visualizerElViewing = el[1].querySelector("#viewing");
        this.visualizerElConstructing = el[1].querySelector("#constructing");

        viewingVisualizer = new ViewingVisualizer(this.visualizerElViewing);
        constructVisualizer = new ConstructVisualizer(this.visualizerElConstructing); 

        testQuestionsAreaEl = el[2];
        questionsArea = new QuestionsArea(testQuestionsAreaEl);
        this.hideTheElement(testQuestionsAreaEl);
    }

    hideTheElement(el){
        el.style.display = 'none';
    }

    showTheElement(el){
        el.style.display = 'block';
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

    sendToEndButtonClicked(){
        let wholeQuestionAnswers = questionsArea.getAllQuestionAnswers();
        let counterPopUp = constructVisualizer.getAllInfo();

        let endTime = Date(Date.now()).toString();
        let end_time = {"end_time": endTime};
        
        let wholeTargetInfo = Object.assign(wholeQuestionAnswers, counterPopUp);
        let targetInfo = Object.assign(wholeTargetInfo, end_time);

        let event = new Event("onSendToEndButtonClick", targetInfo);
        this.notifyAll(event);
    }

    sendToQuestionsButtonClicked() {
        let event = new Event("onSendToQuestionsButtonClick");
        this.notifyAll(event);

        this.showTheElement(testQuestionsAreaEl);
    }
}

export default MainSite;
