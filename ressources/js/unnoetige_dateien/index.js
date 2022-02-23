import StartSite from "../ui/StartSite.js";
import MainSite from "../ui/MainSite.js";
import Storage from "../data_storage/Storage.js";
import ExperienceQuestions from "../ui/ExperienceQuestions.js";
import BookLoader from "../book/BookLoader.js";

let startSite,
  mainSites,
  experienceQuestions,
  experienceEl,
  startEl,
  mainEls,
  endEl,
  startTimeOfLearningAndVisualisation,
  endTimeOfLearningAndVisualisation,
  durationTimeOfLearningAndVisualisation,
  startTimeOfVisualisation,
  endTimeOfVisualisation,
  durationTimeOfVisualisation,
  startTimeOfKnowledgeTest,
  endTimeOfKnowledgeTest,
  durationTimeOfKnowledgeTest,
  leftNumbering,
  rightNumbering,
  timeoverEl,
  dataStorage,
  dataID,
  applAnalQuestions,
  startInfo = {},
  finishInfo = {},
  nextButton,
  backButton,
  explanation,
  engagement,
  intervalForCheckingFocus,
  pages,
  viewingAufgabe,
  pageIndex = 0,
  firstTimeOpeningVisualisation = 0;

const grayColor = "#acacace6";

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

function infoAboutInputValues(type) {
  if (type == "demographische_daten") {
    Toast.fire({
      icon: "info",
      width: 500,
      iconColor: grayColor,
      title: "Bitte Name, Alter, Gender und Ihren Wissensstand eintragen!",
    });
  } else {
    Toast.fire({
      icon: "info",
      width: 500,
      iconColor: grayColor,
      title: "Bitte Datenstrukturen in den Aufgaben 1,2 und 6 auswählen!",
    });
  }
}

function init() {
  BookLoader.load().then(() => {
    initView();
    initJSONStorage();
    // listenForClosingTheSite();
    reorder();
  });
}

function onBackButtonClicked(ev) {
  if (pageIndex != 0) {
    pages[pageIndex - 1].classList.add("no-anim");
    pages[pageIndex - 1].classList.remove("flipped");
    pageIndex -= 1;

    reorder();
  }
}

function onNextButtonClicked(ev) {
  if (pageIndex == 3) {
    startTimeOfLearningAndVisualisation = Date.now();
  }
  if (pageIndex == 5) {
    if (firstTimeOpeningVisualisation == 0) {
      startTimeOfVisualisation = Date.now();
      firstTimeOpeningVisualisation += 1;
    }
  }
  if (pageIndex == 6) {
    endTimeOfLearningAndVisualisation = Date.now();
    durationTimeOfLearningAndVisualisation =
      endTimeOfLearningAndVisualisation - startTimeOfLearningAndVisualisation; //in milliseconds

    endTimeOfVisualisation = Date.now();
    durationTimeOfVisualisation =
      endTimeOfVisualisation - startTimeOfVisualisation;

    startTimeOfKnowledgeTest = Date.now();

  }

  if (pageIndex != 0) {
    let side_1_without_zIndex = document.querySelector(".side-1");
    side_1_without_zIndex.classList.remove("set_background_for_first_page");
  }

  if (pageIndex == 3) {
    // VOR DEM RELEASE auskommentieren
    // if (
    //   startSite.getName() == "" ||
    //   startSite.getName() == " " ||
    //   startSite.getName() == null ||
    //   startSite.getAge() == "" ||
    //   startSite.getAge() == " " ||
    //   startSite.getAge() == null ||
    //   startSite.getGenderInfo() == "" ||
    //   startSite.getGenderInfo() == " " ||
    //   startSite.getGenderInfo() == null ||
    //   startSite.getSkillsInfo() == null ||
    //   startSite.getSkillsInfo() == "" ||
    //   startSite.getMmeValuesCheckedAsString() == "" ||
    //   startSite.getAdpValuesCheckedAsString() == "" ||
    //   startSite.getOopValuesCheckedAsString() == ""
    // ) {
    //   infoAboutInputValues("demographische_daten");
    //   return;
    // } else {
      startSite.sendDemographicData();
    // }
  } else if (pageIndex == 10) {
    // VOR DEM RELEASE auskommentieren
    // if (
    //   mainSites.getQuestionArea().getNotNullInfoFromApplAnSynVisual() == null ||
    //   mainSites.getQuestionArea().getNotNullInfoFromApplAnSynVisual() == "" ||
    //   mainSites.getQuestionArea().getNotNullInfoFromKnowledgeSecond() == null ||
    //   mainSites.getQuestionArea().getNotNullInfoFromKnowledgeSecond() == "" ||
    //   mainSites.getQuestionArea().getNotNullInfoFromKnowledgeFirst() == null ||
    //   mainSites.getQuestionArea().getNotNullInfoFromKnowledgeFirst() == ""
    // ) {
    //   infoAboutInputValues("wissenstest");
    //   return;
    // } else {
      nextButton.innerHTML = "Abschließen";
      mainSites.sendToExperienceButtonClicked();

      endTimeOfKnowledgeTest = Date.now();
      durationTimeOfKnowledgeTest =
        endTimeOfKnowledgeTest - startTimeOfKnowledgeTest;
    // }
  } else if (pageIndex == 11) {
    experienceQuestions.setAllDurationTimes(
      durationTimeOfLearningAndVisualisation / 1000,
      durationTimeOfVisualisation / 1000,
      durationTimeOfKnowledgeTest / 1000
    );
    experienceQuestions.sendToEndButtonClicked();
  }

  pages[pageIndex].classList.remove("no-anim");
  pages[pageIndex].classList.add("flipped");

  if (pageIndex == 12) {
    hideElement(nextButton);
    hideElement(backButton);
    hideElement(leftNumbering);
  }

  pageIndex += 1;
  reorder();
}

function reorder() {

  if (pageIndex !== 0 && pageIndex !== 1 && pageIndex !== 2 && pageIndex != 3) {
    leftNumbering.innerHTML = pageIndex * 2 - 7;
    rightNumbering.innerHTML = pageIndex * 2 - 6;
    showElement(leftNumbering);
    showElement(rightNumbering);
  }

  if (pageIndex == 13) {
    let page_13 = document.querySelector("#page-13");
    let side_1_without_zIndex = page_13.querySelector(".side-2");
    side_1_without_zIndex.classList.add("set_background_for_first_page");
    hideElement(nextButton);
  }

  if (pageIndex == 12) {
    hideElement(leftNumbering);
  }

  if (
    pageIndex == 0 ||
    pageIndex == 1 ||
    pageIndex == 2 ||
    pageIndex == 4 ||
    pageIndex == 7 ||
    pageIndex == 11 ||
    pageIndex == 12
  ) {
    //hideElement(backButton);
  } else {
    showElement(backButton);
  }

  document.querySelectorAll(".book").forEach(function () {
    var pages_flipped = document.querySelectorAll(".flipped");

    for (let index = 0; index < pages.length; index++) {
      const element = pages[index];
      element.style.zIndex = pages.length - index;
      let side_1_without_zIndex = element.querySelector(".side-1");
      side_1_without_zIndex.style.zIndex = element.style.zIndex;
    }

    for (let index = 0; index < pages_flipped.length; index++) {
      const element = pages_flipped[index];
      element.style.zIndex = index + 1;

      let side_1_without_zIndex = element.querySelector(".side-1");
      side_1_without_zIndex.style.zIndex = 0;
    }
  });
}

function listenForClosingTheSite() {
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
    dataStorage.breakProcess(dataID);
  });
}

async function initJSONStorage() {
  dataStorage = new Storage();
  dataID = getIDFromURL();

  if (dataID) {
    if (dataID !== undefined) {
      dataStorage.getExperiment(dataID).then(function (data) {
        engagement = data.engagement;
        onGoingToAnimButtonClick();
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

function hideElement(el) {
  el.style.display = "none";
}

function showElement(el) {
  el.style.display = "block";
}

function makeHoverText() {
  if (pageIndex == 3) {
    nextButton.setAttribute("title", "zum Lernmaterial. Unrückgängig!");
  } else if (pageIndex == 6) {
    nextButton.setAttribute("title", "zum Wissenstest. Unrückgängig!");
  } else if (pageIndex == 11) {
    nextButton.setAttribute("title", "Ende des Experiments");
  } else if (pageIndex == 10) {
    nextButton.setAttribute("title", "zur Umfrage. Unrückgängig!");
  } else {
    nextButton.removeAttribute("title");
  }
}

function initView() {
  startEl = document.querySelector("#start-element");
  startSite = new StartSite();

  mainEls = document.getElementsByClassName("main-element");
  mainSites = new MainSite();

  experienceEl = document.querySelector("#experience_questions");
  experienceQuestions = new ExperienceQuestions();

  pages = document.getElementsByClassName("page");

  leftNumbering = document.querySelector("#left-numbering");
  rightNumbering = document.querySelector("#right-numbering");

  //hideElement(leftNumbering);
  //hideElement(rightNumbering);

  applAnalQuestions = document.querySelector(".questions-appl-anal-synth");

  startSite.addEventListener(
    "onGotoAnimationButtonClicked",
    onGotoAnimationButtonClicked
  );

  // startSite.addEventListener("on");
  // startSite.addEventListener();
  // startSite.addEventListener();

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

  viewingAufgabe = document.querySelector("#viewing_aufgabe");

  nextButton = document.querySelector("#next-button");
  backButton = document.querySelector("#back-button");

  nextButton.addEventListener("mouseover", makeHoverText); // setButtonUnClickable();
  nextButton.addEventListener("click", onNextButtonClicked);
  backButton.addEventListener("click", onBackButtonClicked);

  endEl = document.querySelector("#end-element");
  timeoverEl = document.querySelector("#timeover-element");

  document.querySelectorAll("code").forEach((el) => {
    hljs.highlightElement(el);
  });

  if (pageIndex == 0) {
    let side_1_without_zIndex = document.querySelector(".side-1");
    side_1_without_zIndex.classList.add("set_background_for_first_page");
  }
}

function setButtonUnClickable() {
  nextButton.disabled = true;
}

function showTimeOverOrEndElement(timeOverOrEnd) {
  let page_12 = document.querySelector("#page-12");
  let side_2 = page_12.querySelector(".side-2");
  side_2.classList.add("set_background_for_first_page");

  for (let index = 0; index < pages.length; index++) {
    const element = pages[index];
    element.classList.add("flipped");
  }

  page_12.style.zIndex = 13;
  side_2.style.zIndex = 13;

  if (timeOverOrEnd == "time_over") {
    hideElement(endEl);
    showElement(timeoverEl);
    hideElement(nextButton);
  } else {
    showElement(endEl);
    hideElement(timeoverEl);
    hideElement(nextButton);
  }
}

function checkPageFocus() {
  dataID = getIDFromURL();

  if (document.hasFocus()) {
    dataStorage.getExperiment(dataID).then(function (data) {
      if (data.state == "open") {
        mainSites.hideConstructVis();
        mainSites.hideViewingVis();

        startSite.hideTheSite(startEl);

        showTimeOverOrEndElement("time_over");
        clearInterval(intervalForCheckingFocus);
      }
    });
  }
}

function onGotoAnimationButtonClicked(ev) {
  onGoingToAnimButtonClick();
  startInfo = ev.data;

  dataStorage.getExperiment(dataID).then(function (data) {
    if (data.state === "open") {
      showTimeOverOrEndElement("time_over");
    } else if (data.state === "close") {
    } else {
      dataStorage.postExperiment(dataID, startInfo, data);
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

function onGoingToAnimButtonClick() {
  startSite.hideTheSite(startEl);
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

init();
