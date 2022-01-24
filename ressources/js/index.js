import StartSite from "./ui/StartSite.js";
import MainSite from "./ui/MainSite.js";
import Storage from "./data_storage/Storage.js";
import ExperienceQuestions from "./ui/ExperienceQuestions.js";
import BookLoader from "./book/BookLoader.js";

let startSite,
  mainSites,
  experienceQuestions,
  experienceEl,
  startEl,
  mainEls,
  endEl,
  timeoverEl,
  dataStorage,
  dataID,
  applAnalQuestions,
  startInfo = {},
  finishInfo = {},
  nextButton,
  explanation,
  engagement,
  intervalForCheckingFocus,
  pages,
  viewingAufgabe,
  pageIndex = 0;

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

function infoAboutInputValues() {
  Toast.fire({
    icon: "info",
    width: 500,
    iconColor: grayColor,
    title: "Bitte Name, Alter, Gender und erworbene Kurse eintragen!",
  });
}

function init() {
  BookLoader.load().then(() => {
    initView();
    initJSONStorage();
    // listenForClosingTheSite(); 
    reorder();
  });
}

function onNextButtonClicked(ev) {
  if (pageIndex == 0) {
    if (
      startSite.getName() == "" ||
      startSite.getName() == " " ||
      startSite.getName() == null ||
      startSite.getAge() == "" ||
      startSite.getAge() == " " ||
      startSite.getAge() == null ||
      startSite.getGenderInfo() == "" ||
      startSite.getGenderInfo() == " " ||
      startSite.getGenderInfo() == null ||
      startSite.getSkillsInfo() == null || 
      startSite.getSkillsInfo() == ""
    ) {
      infoAboutInputValues();
      console.log(
        "startSite.getName(): " +
          startSite.getName() +
          ":startSite.getAge():" +
          startSite.getAge()
      );
      return;
    } else {
      startSite.gotoAnimation();
    }
  } else if (pageIndex == 1) {
    mainSites.sendToQuestionsButtonClicked();
  } else if (pageIndex == 2) {
    mainSites.sendToExperienceButtonClicked();
    nextButton.innerHTML = "Abschließen";
  } else if (pageIndex == 3) {
    experienceQuestions.sendToEndButtonClicked();
  }

  pages = document.getElementsByClassName("page");
  pages[pageIndex].classList.remove("no-anim");
  pages[pageIndex].classList.add("flipped");

  if (pageIndex == 3) {
    hideElement(nextButton);
  }

  pageIndex += 1;
  reorder();
}

function reorder() {
  document.querySelectorAll(".book").forEach(function () {
    pages = document.querySelectorAll(".page");
    var pages_flipped = document.querySelectorAll(".flipped");

    for (let index = 0; index < pages.length; index++) {
      const element = pages[index];
      element.style.zIndex = pages.length - index;
    }

    for (let index = 0; index < pages_flipped.length; index++) {
      const element = pages_flipped[index];
      element.style.zIndex = index + 1;

      let side_1_without_zIndex = element.querySelector(".side-1");
      side_1_without_zIndex.style.zIndex = "auto";
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
  if (pageIndex == 0) {
    nextButton.setAttribute("title", "zur Visualisierung");
  } else if (pageIndex == 1) {
    nextButton.setAttribute("title", "zum Wissenstest");
  } else if (pageIndex == 2) {
    nextButton.setAttribute("title", "zu kurzer Befragung");
  }

  if (pageIndex == 3) {
    nextButton.setAttribute("title", "zu Ende");
  }
}

function initView() {
  startEl = document.querySelector("#start-element");
  startSite = new StartSite(startEl);
  startSite.showTheSite(startEl);

  mainEls = document.getElementsByClassName("main-element");
  mainSites = new MainSite(mainEls);

  experienceEl = document.querySelector("#experience_questions");
  experienceQuestions = new ExperienceQuestions(experienceEl);
  hideElement(experienceEl);

  applAnalQuestions = document.querySelector(".questions-appl-anal-synth");

  startSite.addEventListener(
    "onGotoAnimationButtonClicked",
    onGotoAnimationButtonClicked
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

  viewingAufgabe = document.querySelector("#viewing_aufgabe");

  hideElement(viewingAufgabe);

  nextButton = document.querySelector("#next-button");
  nextButton.addEventListener("mouseover", makeHoverText); // setButtonUnClickable();
  nextButton.addEventListener("click", onNextButtonClicked);

  for (let index = 0; index < mainEls.length; index++) {
    const element = mainEls[index];
    hideElement(element);
  }

  endEl = document.querySelector("#end-element");
  hideElement(endEl);

  timeoverEl = document.querySelector("#timeover-element");
  hideElement(timeoverEl);

  explanation = document.querySelector("#explanation");
  hideElement(explanation);

  document.querySelectorAll("code").forEach((el) => {
    hljs.highlightElement(el);
  });
}

function setButtonUnClickable() {
  nextButton.disabled = true;
}

function showTimeOverElement() {
  showElement(timeoverEl);
  let page_4 = document.querySelector("#page-4");
  let side_2 = page_4.querySelector(".side-2");
  page_4.classList.add("flipped");
  side_2.style.zIndex = "4";
  page_4.style.zIndex = "4";
}

function checkPageFocus() {
  dataID = getIDFromURL();

  if (document.hasFocus()) {
    dataStorage.getExperiment(dataID).then(function (data) {
      if (data.state == "open") {
        mainSites.hideConstructVis();
        mainSites.hideViewingVis();

        hideElement(endEl);
        hideElement(applAnalQuestions);
        hideElement(explanation);
        hideElement(viewingAufgabe);
        hideElement(nextButton);

        startSite.hideTheSite(startEl);

        for (let index = 0; index < mainEls.length; index++) {
          const element = mainEls[index];
          hideElement(element);
        }

        for (let index = 0; index < pages.length; index++) {
          const element = pages[index];
          element.classList.add("flipped");
        }
        showTimeOverElement();

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
      showTimeOverElement();
      for (let index = 0; index < mainEls.length; index++) {
        const element = mainEls[index];
        hideElement(element);
      }
    } else if (data.state === "close") {
      for (let index = 0; index < mainEls.length; index++) {
        const element = mainEls[index];
        hideElement(element);
      }
      showElement(endEl);
    } else {
      mainEls[0].style.display = "block";
      mainEls[1].style.display = "block";
      dataStorage.postExperiment(dataID, startInfo, data);
    }
  });
}

function onSendToEndButtonClicked(ev) {
  let experienceAnswers = ev.data;

  dataStorage.getExperiment(dataID).then(function (data) {
    if (data.state === "open") {
      showTimeOverElement();
      for (let index = 0; index < mainEls.length; index++) {
        const element = mainEls[index];
        hideElement(element);
      }
    } else if (data.state === "close") {
      for (let index = 0; index < mainEls.length; index++) {
        const element = mainEls[index];
        hideElement(element);
      }
      showElement(endEl);
    } else {
      for (let index = 0; index < mainEls.length; index++) {
        const element = mainEls[index];
        hideElement(element);
      }

      hideElement(experienceEl);
      dataStorage.closeExperiment(dataID, experienceAnswers, data);
      showElement(endEl);

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

  for (let index = 0; index < mainEls.length; index++) {
    const element = mainEls[index];
    showElement(element);
  }

  hideElement(applAnalQuestions);
  explanation.style.display = "flex";

  if (engagement === "constructing") {
    mainSites.hideViewingVis();
    mainSites.showConstructVis();
  } else {
    mainSites.showViewingVis();
    mainSites.hideConstructVis();
    viewingAufgabe.style.display = "flex";
  }
}

function onSendToQuestionsButtonClicked(ev) {
  let applAnalQuestions = document.querySelector(".questions-appl-anal-synth");

  dataStorage.getExperiment(dataID).then(function (data) {
    if (data.state === "open") {
      showTimeOverElement();
      hideElement(endEl);
      for (let index = 0; index < mainEls.length; index++) {
        const mainEl = mainEls[index];
        hideElement(mainEl);
      }

      hideElement(applAnalQuestions);
    } else if (data.state === "in-use") {
      mainSites.hideConstructVis();
      mainSites.hideViewingVis();

      hideElement(explanation);
      hideElement(viewingAufgabe);

      showElement(applAnalQuestions);
    }
  });
}

function onSendToExperienceButtonClicked(ev) {
  let applAnalQuestions = document.querySelector(".questions-appl-anal-synth");
  finishInfo = ev.data;

  dataStorage.getExperiment(dataID).then(function (data) {
    if (data.state === "open") {
      showElement(timeoverEl);
      hideElement(endEl);
      for (let index = 0; index < mainEls.length; index++) {
        const element = mainEls[index];
        hideElement(element);
      }
    } else if (data.state == "in-use") {
      dataStorage.postQuestionsToExperiment(dataID, finishInfo, data);

      for (let index = 0; index < mainEls.length; index++) {
        const mainEl = mainEls[index];
        hideElement(mainEl);
      }

      hideElement(endEl);
      hideElement(timeoverEl);
      hideElement(applAnalQuestions);
      showElement(experienceEl);
    }
  });
}

init();
