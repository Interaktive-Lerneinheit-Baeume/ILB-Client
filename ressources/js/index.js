import { Event } from "./utils/Observable.js";
import EventBus from "./utils/EventBus.js";
import ExperimentManager from "./experiment/ExperimentManager.js";
import BookLoader from "./book/BookLoader.js";
import NavController from "./book/NavController.js";
import PageController from "./book/PageController.js";
import PageRenderer from "./book/PageRenderer.js";
import MainSite from "./ui/MainSite.js";

let currentExperiment = {};

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

        currentExperiment = experiment;
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

  if (currentExperiment.engagement === "constructing") {
    console.log("construcitng");
    mainSite.showConstructVis();
    mainSite.hideViewingVis();
  } else {
    mainSite.hideConstructVis();
    mainSite.showViewingVis();
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
  PageController.next();
}

function onPageSelected(event) {
  let timeStamp = Date(Date.now()).toString();
  NavController.setPage(event.data);
  PageRenderer.render(event.data);

  //   ExperimentManager.processPageSelection(event.data, timeStamp);
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
    console.log("endExperiment()" + event.data.chapter);
    EventBus.relayEvent(
      new Event("experimentEnded", {
        time: timeStamp,
        value: "experiment ended",
      })
    );
  }
}

init();
