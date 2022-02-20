import {
    Event,
    Observable
} from "../utils/Observable.js";

function hideAllPages(parent) {
    let pages = parent.querySelectorAll(".page");
    pages.forEach((page) => {
        page.classList.remove("left", "right");
        page.classList.add("hidden");
    });
}

class PageRenderer extends Observable {

    constructor(el) {
        super();
        this.el = el;
    }

    render(page) {
        hideAllPages(this.el);
        page.el.classList.add("left");
        page.el.classList.remove("hidden");
        if (page.nextPage !== null) {
            page.nextPage.el.classList.add("right");
            page.nextPage.el.classList.remove("hidden");

        }
    }

}

export default new PageRenderer(document.querySelector(".book"));