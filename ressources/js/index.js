import { Event } from "./utils/Observable.js";
import EventBus from "./utils/EventBus.js";
import ExperimentManager from "./experiment/ExperimentManager.js";
import BookLoader from "./book/BookLoader.js";
import NavController from "./book/NavController.js";
import PageController from "./book/PageController.js";
import PageRenderer from "./book/PageRenderer.js";
import MainSite from "./ui/MainSite.js";

let experiment = {};
const grayColor = "#acacace6";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
//   offset: [
//     x: '15px',
//     y: '-5px',
// ],
  showConfirmButton: false,
  timer: 4000,
  height: 200,
  target: document.getElementById("myDiv"),
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function infoAboutDemographic() {
  Toast.fire({
    icon: "info",
    width: 500,
    height: 200,
    iconColor: grayColor,
    title: "Bitte höchsten Abschluss angeben!",
  });
}

function infoAboutSelfAssessment() {
  Toast.fire({
    icon: "info",
    width: 500,
    height: 200,
    iconColor: grayColor,
    title: "Bitte alle Felder befüllen!",
  });
}

function init() {
  ExperimentManager.fetchExperiment().then(
    (experiment) => {
      BookLoader.load().then((pages) => {
        initPages(pages);
        document.querySelector(".splash").classList.add("hidden");

        EventBus.relayEvent(
          new Event("experimentStarted", {
            time: Date(Date.now()).toString(),
            value: "experiment started",
          })
        );

        experiment = experiment;
        initViews();
      });
    },
    () => {
      document
        .querySelector(".no_experiment_available")
        .classList.remove("hidden");
    }
  );
}

function initViews() {
  let mainSite = new MainSite();

  document.querySelectorAll("code").forEach((el) => {
    hljs.highlightElement(el);
  });

  let idNumbersViewing = document.getElementsByClassName("id-number-viewing");

  if (experiment.engagement === "constructing") {
    mainSite.showConstructVis();
    mainSite.hideViewingVis();
  } else {
    mainSite.hideConstructVis();
    mainSite.showViewingVis();
    for (let index = 0; index < idNumbersViewing.length; index++) {
      const mainCodeElement = idNumbersViewing[index];
      mainCodeElement.style.visibility = "hidden";
    }
  }
}

function initPages(pages) {
  NavController.addEventListener(
    "previousPageRequested",
    onPreviousPageRequested
  );
  NavController.addEventListener("nextPageRequested", onNextPageRequested);
  PageController.addEventListener("pageSelected", onPageSelected);
  PageController.setPages(pages);
  ExperimentManager.watchForms();
}

function onPreviousPageRequested() {
  PageController.previous();
}

function onNextPageRequested() {
  let emptyFields = false;
  let currentExperiment = ExperimentManager.getExperiment();
  let page = PageController.getOpenPages();

  if (
    page.title === "self-assessment-1" &&
    page.nextPage.title === "self-assessment-2"
  ) {
    if (
      currentExperiment !== null &&
      currentExperiment["self-assessment"] !== undefined &&
      currentExperiment["self-assessment"] !== null
    ) {
      let uniqueLabels = [];

      for (
        let index = 0;
        index < currentExperiment["self-assessment"].length;
        index++
      ) {
        const element = currentExperiment["self-assessment"][index];
        uniqueLabels.push(element.label);
      }

      let setOfUniqueLabels = new Set(uniqueLabels);
      if (setOfUniqueLabels.size === 9) {
        emptyFields = false;
      } else {
        infoAboutSelfAssessment();
        emptyFields = true;
      }
    } else if (
      currentExperiment["self-assessment"] === undefined ||
      currentExperiment["self-assessment"] === null
    ) {
      infoAboutSelfAssessment();
      emptyFields = true;
    }
  }

  if (page.title === "demographics" && page.nextPage.title === "demographics") {
    if (
      currentExperiment !== null &&
      currentExperiment["demographic_data"] !== undefined &&
      currentExperiment["demographic_data"] !== null
    ) {
      let uniqueLabels = [];

      for (
        let index = 0;
        index < currentExperiment["demographic_data"].length;
        index++
      ) {
        const element = currentExperiment["demographic_data"][index];
        uniqueLabels.push(element.label);
      }

      let setOfUniqueLabels = new Set(uniqueLabels);
      if (
        setOfUniqueLabels.size === 1 &&
        setOfUniqueLabels.has("participant-education-degree")
      ) {
        emptyFields = false;
      } else {
        infoAboutDemographic();
        emptyFields = true;
      }
    } else if (
      currentExperiment["demographic_data"] === undefined ||
      currentExperiment["demographic_data"] === null
    ) {
      infoAboutDemographic();
      emptyFields = true;
    }
  }

  if (emptyFields === true) {
    return;
  } else {
    PageController.next();
  }
}

function onPageSelected(event) {
  let timeStamp = Date(Date.now()).toString();
  NavController.setPage(event.data);
  PageRenderer.render(event.data);

  if (event.data.nextPage !== undefined && event.data.nextPage !== null) {
    EventBus.relayEvent(
      new Event("pageIteration", {
        time: timeStamp,
        value: "pageIteration",
        left_page_chapter: event.data.chapter,
        right_page_chapter: event.data.nextPage.chapter,
      })
    );
  }

  if (event.data.title === "time-end-over") {
    EventBus.relayEvent(
      new Event("experimentEnded", {
        time: timeStamp,
        value: "experiment ended",
      })
    );
  }
}

init();
