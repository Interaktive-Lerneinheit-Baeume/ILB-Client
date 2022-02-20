import {
    Event,
    Observable
} from "../utils/Observable.js";
import Page from "./Page.js";

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

    static getPreviousButton(){
        return previousPageButton;
    }

    static setCurrentPageNumber(pageNumber) {
        currentPageNumberElement.innerHTML = pageNumber;
    }

    static setTotalPageNumber(pageNumber) {
        totalPageNumberElement.innerHTML = pageNumber;
    }

    static enablePreviousPageButton() {
        previousPageButton.classList.remove("disabled");
    }

    static enableNextPageButton() {
        nextPageButton.classList.remove("disabled");
    }

    static disablePreviousPageButton() {
        previousPageButton.classList.add("disabled");
    }

    static disableNextPageButton() {
        nextPageButton.classList.add("disabled");
    }

}

export default NavController;
// export default new NavController(document.querySelector(".navigation"));