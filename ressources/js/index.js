import BookLoader from "./book/BookLoader.js";
import StartSite from "./ui/StartSite.js";
import MainSite from "./ui/MainSite.js";
import Storage from "./data_storage/Storage.js";


let startSite, mainSites, startEl, mainEls, endEl, timeoverEl, dataStorage, dataID,
  applAnalQuestions,
  startInfo = {}, finishInfo = {}, nextButton,
  explanation,
  engagement,
  intervalForCheckingFocus,
  pages,
  viewingAufgabe,
  pageIndex = 0;

const hellBrownColor = "#b3804d99";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

function infoAboutInputValues() {
  Toast.fire({
    icon: 'info',
    width: 500,
    iconColor: hellBrownColor,
    title: "Bitte Name, Alter und Gender eintragen!"
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

  pages = document.getElementsByClassName('page');
  pages[pageIndex].classList.remove('no-anim');
  pages[pageIndex].classList.add("flipped");

  if (pageIndex == 0) {
    // DAS FUNKTIONIERT NICHT!!!
    // if (startSite.getName() == "" || startSite.getName() == " " || startSite.getName() == null ||
    //   startSite.getAge() == "" || startSite.getAge() == " " || startSite.getAge() == null ||
    //   startSite.getGenderInfo() == "" || startSite.getGenderInfo() == " " || startSite.getGenderInfo() == null) {

    //   infoAboutInputValues();
    //   console.log("startSite.getName(): " + startSite.getName() + ":startSite.getAge():" + startSite.getAge());
    //   return;
    // }
    // else {
    startSite.gotoAnimation();
    // }
  }
  else if (pageIndex == 1) {
    mainSites.sendToQuestionsButtonClicked();
  }
  else if (pageIndex == 2) {
    mainSites.sendToEndButtonClicked();
  }

  if (pageIndex == 2) {
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
  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
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
    }
    else {
      alert("Error 404!!!!!!");
    }
  }
  else {
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
  }
  else if (pageIndex == 1) {
    nextButton.setAttribute("title", "zum Wissenstest");
  }

  if (pageIndex == 2) {
    nextButton.setAttribute("title", "zu Ende");
  }
}

function initView() {
  startEl = document.querySelector("#start-element");
  startSite = new StartSite(startEl);
  startSite.showTheSite(startEl);

  mainEls = document.getElementsByClassName("main-element");
  mainSites = new MainSite(mainEls);

  applAnalQuestions = document.querySelector(".questions-appl-anal-synth");

  startSite.addEventListener("onGotoAnimationButtonClicked", onGotoAnimationButtonClicked);
  mainSites.addEventListener("onSendToQuestionsButtonClick", onSendToQuestionsButtonClicked);
  mainSites.addEventListener("onSendToEndButtonClick", onSendToEndButtonClicked);

  viewingAufgabe = document.querySelector("#viewing_aufgabe");

  hideElement(viewingAufgabe);

  nextButton = document.querySelector("#next-button");
  nextButton.addEventListener("mouseover", makeHoverText);  // setButtonUnClickable();
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
}

function setButtonUnClickable() {
  nextButton.disabled = true;
}

function showTimeOverElement() {
  showElement(timeoverEl);
  let page_3 = document.querySelector("#page-3");
  let side_2 = page_3.querySelector(".side-2");
  page_3.classList.add("flipped");
  side_2.style.zIndex = "3";
  page_3.style.zIndex = "3";
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
    }
    else if (data.state === "close") {
      for (let index = 0; index < mainEls.length; index++) {
        const element = mainEls[index];
        hideElement(element);
      }
      showElement(endEl);
    }
    else { //"in-use"->dann weiter 
      mainEls[0].style.display = "flex"; //theorie
      mainEls[1].style.display = "flex"; //visualize
      dataStorage.postExperiment(dataID, startInfo, data);
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
  }
  else {
    mainSites.showViewingVis();
    mainSites.hideConstructVis();
    viewingAufgabe.style.display = "inline-block";
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
    }

    else if (data.state === "in-use") {
      mainSites.hideConstructVis();
      mainSites.hideViewingVis();

      hideElement(explanation);
      hideElement(viewingAufgabe);

      showElement(applAnalQuestions);
    }
  });
}

function onSendToEndButtonClicked(ev) {
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
    }

    else if (data.state == "in-use") { //"in-use"->dann schliessen auf close
      dataStorage.closeExperiment(dataID, finishInfo, data);

      for (let index = 0; index < mainEls.length; index++) {
        const mainEl = mainEls[index];
        hideElement(mainEl);
      }

      showElement(endEl);
      hideElement(timeoverEl);
      hideElement(applAnalQuestions);

      Swal.fire({
        position: 'center',
        icon: 'success',
        iconColor: hellBrownColor,
        title: 'Vielen Dank für Ihre Teilnahme!',
        showConfirmButton: false,
        timer: 5000,
        backdrop: `
            rgba(179, 128, 77, 0.6)
            left top
            no-repeat
          `
      })
    }
  });
}

init();