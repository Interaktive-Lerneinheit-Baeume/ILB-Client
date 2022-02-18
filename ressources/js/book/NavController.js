import {
    Event,
    Observable
} from "../utils/Observable.js";

let currentPageNumberElement,
    totalPageNumberElement,
    previousPageButton,
    nextPageButton;

class NavController extends Observable {

    constructor(el) {
        super();
        currentPageNumberElement = el.querySelector(".pagenumber .current");
        totalPageNumberElement = el.querySelector(".pagenumber .total");
        previousPageButton = el.querySelector(".nav-button.previous");
        nextPageButton = el.querySelector(".nav-button.next");
        previousPageButton.addEventListener("click", () => {
            if(previousPageButton.classList.contains("disabled")) {
                return;
            } else {
                this.notifyAll(new Event("previousPageRequested"));
            }
        });
        nextPageButton.addEventListener("click", () => {
            if(nextPageButton.classList.contains("disabled")) {
                return;
            } else {
                this.notifyAll(new Event("nextPageRequested"));
            }
        });
    }

    setCurrentPageNumber(pageNumber) {
        currentPageNumberElement.innerHTML = pageNumber;
    }

    setTotalPageNumber(pageNumber) {
        totalPageNumberElement.innerHTML = pageNumber;
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

}

export default new NavController(document.querySelector(".navigation"));