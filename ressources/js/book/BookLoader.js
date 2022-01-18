const BOOK_PAGES = ["./pages/page-01/index.html", "./pages/page-02/index.html", "./pages/page-03/index.html"],
    ROOT_ELEMENT = document.querySelector(".book");


async function loadPage(path) {
    let response = await fetch(path),
        html = await response.text(),
        node = document.createElement("div");
    node.innerHTML = html;
    return node.firstChild; 
}

async function loadPages() {
    for(let i = 0; i < BOOK_PAGES.length; i++) {
        let page = await loadPage(BOOK_PAGES[i]);
        ROOT_ELEMENT.append(page);
    }
    return;
}

export default {
    load: loadPages
};