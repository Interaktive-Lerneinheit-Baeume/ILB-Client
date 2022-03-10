import { Event, Observable } from "../utils/Observable.js";
import Page from "./Page.js";

let currentPageNumberElement,
  totalPageNumberElement,
  previousPageButton,
  nextPageButton,
  chapterIndicator;

class NavController extends Observable {
  constructor(el) {
    super();
    previousPageButton = el.querySelector(".nav-button.previous");
    nextPageButton = el.querySelector(".nav-button.next");
    chapterIndicator = document.querySelector(".menu .chapter");
    previousPageButton.addEventListener("click", () => {
      if (previousPageButton.classList.contains("disabled")) {
        return;
      } else {
        this.notifyAll(new Event("previousPageRequested"));
      }
    });
    nextPageButton.addEventListener("click", () => {
      if (nextPageButton.classList.contains("disabled")) {
        return;
      } else {
        this.notifyAll(new Event("nextPageRequested"));
      }
    });
  }

  setPage(page) {
    if (page.nextPage !== null && page.nextPage !== undefined) {
      this.enableNextPageButton();
    } else {
      this.disableNextPageButton();
    }
    if (
      page.canGoBack &&
      page.previousPage !== null &&
      page.previousPage !== undefined
    ) {
      this.enablePreviousPageButton();
    } else {
      this.disablePreviousPageButton();
    }
    chapterIndicator.innerHTML = page.chapter;
  }

  enablePreviousPageButton() {
    previousPageButton.classList.remove("disabled");
  }

  enableNextPageButton() {
    nextPageButton.classList.remove("disabled");
  }

  disablePreviousPageButton() {
    previousPageButton.classList.add("disabled");
  }

  disableNextPageButton() {
    nextPageButton.classList.add("disabled");
  }

  setTitleOnNextButton(title) {
    if (title === "self-assessment-3") {
      nextPageButton.setAttribute("title", "zum Lernmaterial. Unrückgängig!");
    } else if (title === "visualization") {
      nextPageButton.setAttribute("title", "zum Wissenstest. Unrückgängig!");
    }
    else {
      nextPageButton.removeAttribute("title");
    }
  }
}

export default new NavController(document.querySelector(".navigation"));
