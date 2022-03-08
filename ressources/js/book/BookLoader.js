import Page from "./Page.js";

const BOOK_PAGE_URLS = [
    "./pages/precover.html", // checked
    "./pages/cover.html", // checked
    "./pages/preface.html", // checked
    "./pages/empty.html", // checked
    "./pages/demographics-01.html", // checked
    "./pages/demographics-02.html", // checked
    "./pages/self-assessment/self-assessment-java-1.html", // checked
    "./pages/self-assessment/self-assessment-java-2.html", // checked
    "./pages/self-assessment/self-assessment-javascript-1.html", // checked
    "./pages/self-assessment/self-assessment-javascript-2.html", // checked
    "./pages/self-assessment/self-assessment-python-1.html", // checked
    "./pages/self-assessment/self-assessment-python-2.html", // checked
    "./pages/binary-tree/binary_tree_1.html", // checked // Leere Seite vor dieser Seite für bessere Darstellung entfernt
    "./pages/binary-tree/binary_tree_2.html", // Erklärung zum Code fehlt!
    "./pages/binary-tree/binary_tree_3.html", // checked
    "./pages/binary-tree/binary_tree_4.html",
    // "./pages/empty.html", // checked // Leere Seite hier für bessere Darstellung eingefügt
    "./pages/binary-tree/binary_tree_5.html", // Erklärung fehlt!
    "./pages/empty.html",
    "./pages/binary-tree/binary_tree_6.html", // Erklärung fehlt!
    "./pages/binary-tree/binary_tree_7.html",
    "./pages/quiz/test_1.html", // checked // Einleitung feht! // Prüfen ob aktuellste Version der Fragen
    "./pages/quiz/test_2.html", // checked // Prüfen ob aktuellste Version der Fragen
    "./pages/quiz/test_3_4.html", // checked // Prüfen ob aktuellste Version der Fragen
    "./pages/quiz/test_5.html", // checked // Prüfen ob aktuellste Version der Fragen
    "./pages/quiz/test_6.html", // checked // Prüfen ob aktuellste Version der Fragen
    "./pages/quiz/test_7.html", // checked // Prüfen ob aktuellste Version der Fragen
    "./pages/questionnaire/experience_1.html", // checked
    "./pages/questionnaire/experience_2.html", // checked
    "./pages/end/empty.html", // checked // Wofür wird diese Seite benötigt!
    "./pages/end/empty.html" // checked // Wofür wird diese Seite benötigt!
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
