var pageNumber = 0;

class Page {

    constructor(el, title, showPrevious, chapter, showChapter, showPageNumber, canGoBack) {
        this.el = el;
        this.title = title;
        this.showPrevious = showPrevious;
        this.chapter = chapter;
        this.showChapter = showChapter;
        this.pageNumber = ++pageNumber;
        this.showPageNumber = false;
        this.canGoBack = null;
        this.previousPage = null;
        this.nextPage = null;
    }

    static fromElement(el) {
        let title = el.getAttribute("data-title"),
            showPrevious = (el.getAttribute("data-show-previous")) === "true",
            chapter = el.getAttribute("data-chapter"),
            showChapter = (el.getAttribute("data-show-chapter")) === "true",
            showPageNumber = (el.getAttribute("data-show-page-number")) === "true",
            canGoBack = (el.getAttribute("data-can-go-back")) === "true";
        return new Page(el, title, showPrevious, chapter, showChapter, showPageNumber, canGoBack);
    }
}

export default Page;