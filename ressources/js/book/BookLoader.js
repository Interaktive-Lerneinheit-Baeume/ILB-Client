import Page from "./Page.js";

const BOOK_PAGE_URLS = [
    "./pages/empty.html",
    "./pages/cover.html",
    "./pages/preface.html",
    "./pages/demographics.html",
    "./pages/self-assessment-java.html",
    "./pages/empty.html",/*
    "./pages/toc.html",*/

        "./pages/page-05/index.html",
        "./pages/page-06/index.html",
        "./pages/page-07/index.html",
        "./pages/page-08/index.html",
        "./pages/page-09/index.html",
        "./pages/page-10/index.html",
        "./pages/page-11/index.html",
        "./pages/page-12/index.html",
  ],
  ROOT_ELEMENT = document.querySelector(".book");

async function loadPageElement(path) {
  let response = await fetch(path),
    html = await response.text(),
    node = document.createElement("div");
  node.innerHTML = html;
  return node.firstChild;
}

async function loadPages() {
  let pageElements = [],
    pages = [];
  for (let i = 0; i < BOOK_PAGE_URLS.length; i++) {
    let element = await loadPageElement(BOOK_PAGE_URLS[i]);
    pageElements.push(element);
    ROOT_ELEMENT.append(element);
  }
  pages = pageElements.map((element) => Page.fromElement(element));
  for (let i = 0; i < pages.length; i++) {
    pages[i].previousPage = pages[i - 1];
    pages[i].nextPage = pages[i + 1];
  }
  return pages;
}

export default {
  load: loadPages,
};