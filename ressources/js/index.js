import { Event } from "./utils/Observable.js";
import EventBus from "./utils/EventBus.js";
import ExperimentManager from "./experiment/ExperimentManager.js";
import BookLoader from "./book/BookLoader.js";
import NavController from "./book/NavController.js";
import PageController from "./book/PageController.js";
import PageRenderer from "./book/PageRenderer.js";
import MainSite from "./ui/MainSite.js";

let dataStorage,
  dataID,
  engagement,
  intervalForCheckingFocus,
  currentExperiment = {};

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

// async function initJSONStorage() {
//   dataStorage = new Storage();
//   dataID = getIDFromURL();

//   if (dataID) {
//     if (dataID !== undefined) {
//       dataStorage.getExperiment(dataID).then(function (data) {
//         engagement = data.engagement;
//         //   onGoingToAnimButtonClick();
//       });
//     } else {
//       alert("Error 404!!!!!!");
//     }
//   } else {
//     dataStorage.pickRandomExperiment().then(function (data) {
//       dataID = data.id;
//       engagement = data.engagement;
//       window.location.hash = dataID;
//       intervalForCheckingFocus = setInterval(checkPageFocus, 60000); //60000 = 1 Min * 60 Sek (1000 MilliSek)
//     });
//   }
// }

// function getIDFromURL() {
//   let url = window.location.href;
//   return url.split("#")[1];
// }

function initViews() {
  //   let questionsArea = new QuestionsArea();
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

  console.log("page selected " + event.data);
  console.log(event.data);

  //   ExperimentManager.processPageSelection(event.data, timeStamp);
  if (event.data.nextPage !== undefined && event.data.nextPage !== null) {
    console.log("nuuuul");
    EventBus.relayEvent(
      new Event("pageIteration", {
        time: Date(Date.now()).toString(),
        value: "pageIteration",
        left_page_chapter: event.data.chapter,
        right_page_chapter: event.data.nextPage.chapter,
      })
    );
  }

  if (event.data.chapter === "time-end-over") {
    console.log("endExperiment()" + event.data.chapter);
    EventBus.relayEvent(
      new Event("experimentEnded", {
        time: Date(Date.now()).toString(),
        value: "experiment ended and saved",
      })
    );
  }

  //   ExperimentManager.endExperiment();
}

function checkPageFocus() {
  dataID = getIDFromURL();

  if (document.hasFocus()) {
    dataStorage.getExperiment(dataID).then(function (data) {
      if (data.state == "open") {
        //   mainSites.hideConstructVis();
        //   mainSites.hideViewingVis();

        //   startSite.hideTheSite(startEl);

        //   showTimeOverOrEndElement("time_over");
        clearInterval(intervalForCheckingFocus);
      }
    });
  }
}

init();
