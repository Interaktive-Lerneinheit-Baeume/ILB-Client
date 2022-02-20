var pageNumber = 0;

class Page {

    constructor(el, title, chapter, showChapter, showPageNumber, canGoBack) {
        this.el = el;
        this.title = title;
        this.chapter = chapter;
        this.showChapter = showChapter;
        this.pageNumber = ++pageNumber;
        this.showPageNumber = false;
        this.canGoBack = canGoBack;
        this.previousPage = null;
        this.nextPage = null;
    }

    static fromElement(el) {
        let title = el.getAttribute("data-title"),
            chapter = el.getAttribute("data-chapter"),
            showChapter = (el.getAttribute("data-show-chapter")) === "true",
            showPageNumber = (el.getAttribute("data-show-page-number")) === "true",
            canGoBack = (el.getAttribute("data-can-go-back")) === "true";
        return new Page(el, title, chapter, showChapter, showPageNumber, canGoBack);
    }
}

export default Page;