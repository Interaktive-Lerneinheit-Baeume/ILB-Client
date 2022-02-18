import BookLoader from "./book/BookLoader.js";
import NavController from "./book/NavController.js";
import PageController from "./book/PageController.js";
import PageRenderer from "./book/PageRenderer.js";

function init() {
    BookLoader.load().then((pages) => {
        initPages(pages);
    });
}

function initPages(pages) {
    NavController.addEventListener("previousPageRequested", onPreviousPageRequested);
    NavController.addEventListener("nextPageRequested", onNextPageRequested);
    PageController.addEventListener("pageSelected", onPageSelected);
    PageController.setPages(pages);
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

init();