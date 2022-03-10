import { Event } from "./utils/Observable.js";
import EventBus from "./utils/EventBus.js";
import FormsWatcher from "./experiment/FormsWatcher.js";
import ExperimentManager from "./experiment/ExperimentManager.js";
import BookLoader from "./book/BookLoader.js";
import NavController from "./book/NavController.js";
import PageController from "./book/PageController.js";
import PageRenderer from "./book/PageRenderer.js";
import MainSite from "./ui/MainSite.js";
import SplashScreens from "./ui/visualizers_part/SplashScreens.js";

let experiment = {};
const grayColor = "#acacace6";
let book = document.querySelector(".book");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function toFillAllObligatoryFields() {
  Toast.fire({
    icon: "info",
    width: 550,
    iconColor: grayColor,
    title: "Bitte alle nicht optionalen Felder befüllen!",
  });
}

function onKeyEnterPressed(e) {
  if (e.code === "Enter") {
    e.preventDefault();

    book.classList.remove("hidden");

    SplashScreens.removeWelcomeSplash();
    SplashScreens.removeSplashScreen();

    NavController.enableNextPageButton();
    document.removeEventListener("keypress", onKeyEnterPressed);
  }
}

function init() {
  document.addEventListener("keypress", onKeyEnterPressed);

  ExperimentManager.fetchExperiment().then(
    (currExperiment) => {
      BookLoader.load().then((pages) => {
        initPages(pages);

        SplashScreens.removeDownloadSplash();
        SplashScreens.setWelcomeSplash();

        EventBus.relayEvent(
          new Event("experimentStarted", {
            time: Date(Date.now()).toString(),
            value: "experiment started",
          })
        );

        experiment = currExperiment;
        initViews();
      });
    },
    () => {
      SplashScreens.setNoExperimentAvailableSplash();
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
  // let openFormFields = FormsWatcher.getOpenFormFields();
  // let counterOfCheckedRadios = 0;
  // let fieldIsChecked = false;

  // if (openFormFields.length > 0) {
  //   for (let index = 0; index < openFormFields.length; index++) {
  //     const openField = openFormFields[index];

  //     if (
  //       openField.getAttribute("data-question-label") === "participant-age" ||
  //       openField.getAttribute("data-question-label") === "participant-gender"
  //     ) {
  //       if (
  //         openField.value === null ||
  //         openField.value === undefined ||
  //         openField.value === " " ||
  //         openField.value === ""
  //       ) {
  //         toFillAllObligatoryFields();

  //         return;
  //       }
  //     } else if (
  //       openField.getAttribute("data-question-label") ===
  //       "participant-education-degree"
  //     ) {
  //       for (let index = 0; index < openField.children.length; index++) {
  //         const element = openField.children[index];
  //         if (element.children[0].checked) {
  //           fieldIsChecked = true;
  //         }
  //       }
  //       if (fieldIsChecked === false) {
  //         toFillAllObligatoryFields();
  //         return;
  //       }
  //     }
  //   }

  //   for (let index = 0; index < openFormFields.length; index++) {
  //     const openField = openFormFields[index];
  //     if (openField.getAttribute("class") === "likert-scale") {
  //       let arr = Array.from(openField.querySelectorAll('input[type="radio"]'));

  //       for (let index = 0; index < arr.length; index++) {
  //         const element = arr[index];
  //         if (element.checked) {
  //           counterOfCheckedRadios += 1;
  //         }
  //       }
  //     }
  //   }

  //   if (openFormFields.length === 9) {
  //     if (counterOfCheckedRadios !== 9) {
  //       toFillAllObligatoryFields();
  //       return;
  //     } else {
  //       counterOfCheckedRadios === 0;
  //     }
  //   }
  //   PageController.next();
  // } else {
  //   let openPages = PageRenderer.getActualOpenPages();
  //   if (openPages[0].getAttribute("data-title") === "visualization") {
  //     swal({
  //       title: "Zum Wissenstest unrückgängig",
  //       icon: "info",
  //       iconColor: grayColor,
  //       dangerMode: true,
  //       buttons: true,
  //     }).then((value) => {
  //       if (value) {
  //         PageController.next();
  //       } else {
  //         return;
  //       }
  //     });
    // } else {
      PageController.next();
    // }
  // }
}

function onPageSelected(event) {
  let timeStamp = Date(Date.now()).toString();
  NavController.setPage(event.data);
  PageRenderer.render(event.data);

  EventBus.relayEvent(
    new Event("pageIteration", {
      time: timeStamp,
      value: "pageIteration",
      left_page_chapter: event.data.chapter,
      right_page_chapter: event.data.nextPage.chapter,
      left_page_title: event.data.title,
    })
  );
}

init();
