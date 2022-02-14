const BOOK_PAGES = [
    "./pages/page-01/index.html",
    "./pages/page-02/index.html",
    "./pages/page-03/index.html",
    "./pages/page-04/index.html",
    "./pages/page-05/index.html",
    "./pages/page-06/index.html",
    "./pages/page-07/index.html",
    "./pages/page-08/index.html",
    "./pages/page-09/index.html",
    "./pages/page-10/index.html",
    "./pages/page-11/index.html",
    "./pages/page-12/index.html",
    "./pages/page-13/index.html"
  ],
  ROOT_ELEMENT = document.querySelector(".book");

async function loadPage(path) {
  let response = await fetch(path),
    html = await response.text(),
    node = document.createElement("div");
  node.innerHTML = html;
  console.log(node.innerHTML);
  return node.firstChild;
}

async function loadPages() {
  for (let i = 0; i < BOOK_PAGES.length; i++) {
    let page = await loadPage(BOOK_PAGES[i]);
    ROOT_ELEMENT.append(page);
    console.log("BOOK_PAGES.length: "+BOOK_PAGES.length);
  }
  return;
}

export default {
  load: loadPages,
};
