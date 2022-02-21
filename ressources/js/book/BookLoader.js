import Page from "./Page.js";

const BOOK_PAGE_URLS = [
    "./pages/empty.html",
    "./pages/cover.html",
    "./pages/empty.html",
    "./pages/preface.html",
    "./pages/demographics-01.html",
    "./pages/demographics-02.html",
    "./pages/self-assessment-java.html",
    "./pages/empty.html", 

    "./pages/empty.html",
    "./pages/page-05/binary_tree_1.html",
    "./pages/page-05/binary_tree_2.html",

    "./pages/page-06/binary_tree_3.html",
    "./pages/page-06/binary_tree_4.html",

    "./pages/page-07/binary_tree_5.html",

    "./pages/page-08/test_1.html",
    "./pages/page-08/test_2.html",

    "./pages/page-09/test_3_4.html",
    "./pages/page-09/test_5.html",

    "./pages/page-10/test_6.html",
    "./pages/page-10/test_7.html",

    "./pages/page-11/experience_1.html",
    "./pages/page-11/experience_2.html",
    // "./pages/page-08/index.html",
    // "./pages/page-09/index.html",
    // "./pages/page-10/index.html",
    // "./pages/page-11/index.html",
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
