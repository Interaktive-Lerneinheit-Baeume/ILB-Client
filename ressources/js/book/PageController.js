import {
    Event,
    Observable
} from "../utils/Observable.js";

class PageController extends Observable {

    constructor() {
        super();
    }

    setPages(pages) {
        this.pages = pages;
        this.currentPage = this.pages[0];
        this.notifyAll(new Event("pageSelected", this.currentPage));
    }

    shift(position) {
        let newPage;
        if (this.currentPage === undefined) {
            return null;
        }
        newPage = this.pages[this.pages.indexOf(this.currentPage) + position];
        if (newPage === undefined) {
            this.currentPage = this.currentPage;
        } else {
            this.currentPage = newPage;
        }
        return this.currentPage;
    }

    next() {
        let result = this.shift(2);
        if (result) {
            this.notifyAll(new Event("pageSelected", this.currentPage));
        }
    }

    previous() {
        let result = this.shift(-2);
        if (result) {
            this.notifyAll(new Event("pageSelected", this.currentPage));
        }
    }

    getOpenPages() {
        return this.currentPage;
    }

}

export default new PageController();