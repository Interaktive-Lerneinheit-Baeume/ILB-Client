import ExperimentManager from "./experiment/ExperimentManager.js";
import BookLoader from "./book/BookLoader.js";
import NavController from "./book/NavController.js";
import PageController from "./book/PageController.js";
import PageRenderer from "./book/PageRenderer.js";

function init() {
    ExperimentManager.fetchExperiment().then((experiment) => {
        BookLoader.load().then((pages) => {
            initPages(pages);
            document.querySelector(".splash").classList.add("hidden");
        });
    });
}

function initPages(pages) {
    NavController.addEventListener("previousPageRequested", onPreviousPageRequested);
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
    NavController.setPage(event.data);
    PageRenderer.render(event.data);
}

init();