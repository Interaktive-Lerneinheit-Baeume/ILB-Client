import ExperimentManager from "./experiment/ExperimentManager.js";
import BookLoader from "./book/BookLoader.js";
import NavController from "./book/NavController.js";
import PageController from "./book/PageController.js";
import PageRenderer from "./book/PageRenderer.js";
import Storage from "./data_storage/Storage.js";
import StartSite from "./ui/StartSite.js";
import MainSite from "./ui/MainSite.js";
import ExperienceQuestions from "./ui/ExperienceQuestions.js";

let dataStorage,
  navController,
  dataID,
  engagement,
  intervalForCheckingFocus,
  startEl,
  mainEls,
  startSite,
  mainSites,
  applAnalQuestions,
  experienceEl,
  experienceQuestions,
  timeoverEl,
  endEl;

function init() {
  BookLoader.load().then((pages) => {
    initPages(pages);
    initJSONStorage();
    initView();
  });
}

function checkPageFocus() {
  dataID = getIDFromURL();

  if (document.hasFocus()) {
    dataStorage.getExperiment(dataID).then(function (data) {
      if (data.state == "open") {
        //   mainSites.hideConstructVis();
        //   mainSites.hideViewingVis();

        //   startSite.hideTheSite(startEl);

        showTimeOverOrEndElement("time_over");
        clearInterval(intervalForCheckingFocus);
      }
    });
  }
}

function showTimeOverOrEndElement(timeOverOrEnd) {
  //   let page_12 = document.querySelector("#page-12");
  //   let side_2 = page_12.querySelector(".side-2");
  //   side_2.classList.add("set_background_for_first_page");
  //   for (let index = 0; index < pages.length; index++) {
  //     const element = pages[index];
  //     element.classList.add("flipped");
  //   }
  //   page_12.style.zIndex = 13;
  //   side_2.style.zIndex = 13;
  //   if (timeOverOrEnd == "time_over") {
  //     hideElement(endEl);
  //     showElement(timeoverEl);
  //     hideElement(nextButton);
  //   } else {
  //     showElement(endEl);
  //     hideElement(timeoverEl);
  //     hideElement(nextButton);
  //   }
}

async function initJSONStorage() {
  dataStorage = new Storage();
  dataID = getIDFromURL();

  if (dataID) {
    if (dataID !== undefined) {
      dataStorage.getExperiment(dataID).then(function (data) {
        engagement = data.engagement;
        //   onGoingToAnimButtonClick();
      });
    } else {
      alert("Error 404!!!!!!");
    }
  } else {
    dataStorage.pickRandomExperiment().then(function (data) {
      dataID = data.id;
      engagement = data.engagement;
      window.location.hash = dataID;
      intervalForCheckingFocus = setInterval(checkPageFocus, 60000); //60000 = 1 Min * 60 Sek (1000 MilliSek)
    });
  }
}

function getIDFromURL() {
  let url = window.location.href;
  return url.split("#")[1];
}

function initPages(pages) {
  navController = new NavController(document.querySelector(".navigation"));
  navController.addEventListener(
    "previousPageRequested",
    onPreviousPageRequested
  );
  navController.addEventListener("nextPageRequested", onNextPageRequested);

  PageController.addEventListener("pageSelected", onPageSelected);
  PageController.setPages(pages);
  
}

function initView() {
  startEl = document.querySelector("#start-element");
  startSite = new StartSite();

  mainEls = document.getElementsByClassName("main-element");
  mainSites = new MainSite();

  experienceEl = document.querySelector("#experience_questions");
  experienceQuestions = new ExperienceQuestions();

  applAnalQuestions = document.querySelector(".questions-appl-anal-synth");

//   PageRenderer.setListeners(startSite, mainSites, experienceQuestions);
  startSite.addEventListener(
    "onGotoVisualizationButtonClicked",
    onGotoVisualizationButtonClicked
  );

  mainSites.addEventListener(
    "onSendToQuestionsButtonClick",
    onSendToQuestionsButtonClicked
  );
  mainSites.addEventListener(
    "onSendToExperienceButtonClick",
    onSendToExperienceButtonClicked
  );
  experienceQuestions.addEventListener(
    "onSendToEndButtonClick",
    onSendToEndButtonClicked
  );


  //   viewingAufgabe = document.querySelector("#viewing_aufgabe");

  //   nextButton = document.querySelector("#next-button");
  //   backButton = document.querySelector("#back-button");

  //   nextButton.addEventListener("mouseover", makeHoverText); // setButtonUnClickable();
  //   nextButton.addEventListener("click", onNextButtonClicked);
  //   backButton.addEventListener("click", onBackButtonClicked);

  endEl = document.querySelector("#end-element");
  timeoverEl = document.querySelector("#timeover-element");

  document.querySelectorAll("code").forEach((el) => {
    hljs.highlightElement(el);
  });
}

function onPreviousPageRequested() {
  PageController.previous();
}

function onNextPageRequested() {
  PageController.next();
}

function onPageSelected(event) {
  PageRenderer.render(event.data);
}

function prepareForAnimation() {
  if (engagement === "constructing") {
    mainSites.hideViewingVis();
    mainSites.showConstructVis();

    let idNumbersConstr = document.getElementsByClassName("id-number-constr");
    for (let index = 2; index < idNumbersConstr.length; index++) {
      const mainCodeElement = idNumbersConstr[index];
      mainCodeElement.style.visibility = "hidden";
    }
  } else {
    let idNumbersViewing = document.getElementsByClassName("id-number-viewing");

    mainSites.showViewingVis();
    mainSites.hideConstructVis();

    viewingAufgabe.style.display = "flex";

    for (let index = 0; index < idNumbersViewing.length; index++) {
      const mainCodeElement = idNumbersViewing[index];
      mainCodeElement.style.visibility = "hidden";
    }
  }
}

function onGotoVisualizationButtonClicked(ev) {
  prepareForAnimation();

  startInfo = ev.data;

  dataStorage.getExperiment(dataID).then(function (data) {
    if (data.state === "open") {
      showTimeOverOrEndElement("time_over");
    } else if (data.state === "in-use") {
      dataStorage.postExperiment(dataID, startInfo, data);
    }
  });
}

function onSendToQuestionsButtonClicked(ev) {
    let applAnalQuestions = document.querySelector(".questions-appl-anal-synth");
  
    dataStorage.getExperiment(dataID).then(function (data) {
      if (data.state === "open") {
        showTimeOverOrEndElement("time_over");
      } else if (data.state === "in-use") {
        mainSites.hideConstructVis();
        mainSites.hideViewingVis();
        showElement(applAnalQuestions);
      }
    });
  }
  
  function onSendToExperienceButtonClicked(ev) {
    let applAnalQuestions = document.querySelector(".questions-appl-anal-synth");
    finishInfo = ev.data;
  
    dataStorage.getExperiment(dataID).then(function (data) {
      if (data.state === "open") {
      } else if (data.state == "in-use") {
        dataStorage.postQuestionsToExperiment(dataID, finishInfo, data);
      }
    });
  }

function onSendToEndButtonClicked(ev) {
    let experienceAnswers = ev.data;
  
    dataStorage.getExperiment(dataID).then(function (data) {
      if (data.state === "open") {
        showTimeOverOrEndElement("time_over");
      } else if (data.state === "close") {
      } else {
        showTimeOverOrEndElement("end-time");
        dataStorage.closeExperiment(dataID, experienceAnswers, data);
  
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: grayColor,
          title: "Vielen Dank für Ihre Teilnahme!",
          showConfirmButton: false,
          timer: 5000,
          backdrop: `
              rgba(122, 122, 67, 0.6)
              left top
              no-repeat
            `,
        });
      }
    });
  }

init();
