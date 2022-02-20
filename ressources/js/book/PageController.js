import { Event, Observable } from "../utils/Observable.js";

class PageController extends Observable {
  constructor() {
    super();
  }

  setPages(pages) {
    this.pages = pages;
    this.currentPage = this.pages[0];
    this.notifyAll(new Event("pageSelected", this.currentPage));
  }

  shift(position, direction) {
    let newPage, currPage, prevPage;
    if (this.currentPage === undefined) {
      return null;
    }

    newPage = this.pages[this.pages.indexOf(this.currentPage) + position];
    currPage = this.pages[this.pages.indexOf(this.currentPage)];
    prevPage = this.pages[this.pages.indexOf(this.currentPage) - position];

    // if(previous !== undefined){
    if (direction === "next") {
      this.currentPage.el.classList.remove("no-anim");
      this.currentPage.el.classList.add("flipped");
      this.currentPage.el.classList.remove("right");
    } else if (direction === "back") {
      if (prevPage !== undefined) {
        this.currentPage.previousPage.el.classList.remove("flipped");
        this.currentPage.previousPage.el.classList.add("no-anim");
        let side_1_without_zIndex =
          this.currentPage.el.querySelector(".side-1");
        side_1_without_zIndex.style.zIndex = 14;
        // this.currentPage.el.classList.add("right");

        // prevPage.el.classList.add("no-anim");
        // prevPage.el.classList.remove("flipped");
        // prevPage.el.classList.remove("right");
      }
    }
    // }

    if (newPage === undefined) {
      this.currentPage = this.currentPage;
    } else {
      this.currentPage = newPage;
    }

    return this.currentPage;
  }

  next() {
    let result = this.shift(1, "next");
    if (result) {
      this.notifyAll(new Event("pageSelected", this.currentPage));
    }
  }

  previous() {
    let result = this.shift(-1, "back");
    //     pages[pageIndex - 1].classList.add("no-anim");
    // pages[pageIndex - 1].classList.remove("flipped");
    if (result) {
      this.notifyAll(new Event("pageSelected", this.currentPage));
    }
  }
}

export default new PageController();
