import { Event } from "./utils/Observable.js";
import EventBus from "./utils/EventBus.js";
import FormsWatcher from "./experiment/FormsWatcher.js";
import ExperimentManager from "./experiment/ExperimentManager.js";
import BookLoader from "./book/BookLoader.js";
import NavController from "./book/NavController.js";
import PageController from "./book/PageController.js";
import PageRenderer from "./book/PageRenderer.js";
import MainSite from "./ui/MainSite.js";
import SplashScreen from "./ui/visualizers_part/SplashScreens.js";

let experiment = {};
const grayColor = "#acacace6";
let splashEnd, splashStart;
let book = document.querySelector(".book");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
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

function onKeyEnterPressed(e) {
  if (e.code === "Enter") {
    e.preventDefault();
    SplashScreen.removeStartSplash();
    book.classList.remove("hidden");
    NavController.enableNextPageButton();
    document.removeEventListener("keypress", onKeyEnterPressed);
  }
}

function init() {
  SplashScreen.startWholePlattform();
  document.addEventListener("keypress", onKeyEnterPressed);

  ExperimentManager.fetchExperiment().then(
    (experiment) => {
      BookLoader.load().then((pages) => {
        initPages(pages);

       SplashScreen.removeDownloadSplash();

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
      SplashScreen.breakWholePlattform();
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
  let openFormFields = FormsWatcher.getOpenFormFields();
  // if (openFormFields.length > 0) {
  // TODO: Handle required form fields not yet filled out
  // TODO: Remove debug output
  // console.error(new Error("Required fields are empty!"));
  // } else {
  PageController.next();
  // }
}

function onPageSelected(event) {
  let timeStamp = Date(Date.now()).toString();
  NavController.setPage(event.data);
  PageRenderer.render(event.data);

  /**
   * TODO: Do not handle page type here. Instead, send page object (event.data) to
   * ExperimentManager an let him decide how rendering of this particular page should
   * be logged. In general: Tell ExperimentManager what has happended (everytime) and
   * implement logic to decide if this event should be logged in the Manager module.
   */

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
    SplashScreen.sendEndSplash();
    SplashScreen.removeStartSplash();
    // splashEnd.classList.remove("hidden");
    // splashStart.classList.add("hidden");
  }
}

init();
