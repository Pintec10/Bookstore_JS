var data = [];


function fetchData() {
    return fetch("https://api.myjson.com/bins/zyv02", { method: "GET" }).then(function (resp) {
        return resp.json();
    }).then(function (json) {
        data = json.books;
    }).then(function () {
        pageExecution();
    });
}


function buildShowcase(arr) {
    let bookcase = document.getElementById("bookcase");
    bookcase.innerHTML = "";
    let coverHeight = 0;

    for (let i = 0; i < arr.length; i++) {
        let card = document.createElement("div");
        let cardInner = document.createElement("div");
        let cardFront = document.createElement("div");
        let cover = document.createElement("img");
        let cardBack = document.createElement("div");
        let title = document.createElement("h2");
        let description = document.createElement("p");
        let buttonLink = document.createElement("a");
        let button = document.createElement("button");

        card.className = "flip-card";
        cardInner.className = "flip-card-inner";
        cardFront.className = "flip-card-front";
        cover.className = "img-fluid";
        cardBack.className = "flip-card-back d-flex flex-column justify-content-between p-3 overflow-auto";
        button.className = "button-style bg-danger text-white rounded"

        cover.src = arr[i].cover;
        title.innerHTML = arr[i].title;
        description.innerHTML = arr[i].description;
        buttonLink.setAttribute("data-fancybox", "gallery");
        buttonLink.setAttribute("data-caption", arr[i].title);
        buttonLink.href = arr[i].detail;
        button.innerHTML = "more info";

        cardFront.append(cover);
        buttonLink.append(button);
        cardBack.append(title, description, buttonLink);
        cardInner.append(cardFront, cardBack);
        card.append(cardInner);
        bookcase.append(card);

        // giving "flip-card-inner" a height equal to the one that the image has inside the flexbox
        // (this avoids rows overlapping with each other)
        coverHeight = cardFront.querySelector(".img-fluid").height;
        card.querySelector(".flip-card-inner").style.height = coverHeight + "px";
    }
}

function filterBooks() {
    console.log("Input value is: ")
    console.log(document.getElementById("search-field").value);
    let searchInput = document.getElementById("search-field").value.toLowerCase();
    displayedData = data.filter(x => x.title.toLowerCase().includes(searchInput) || x.description.toLowerCase().includes(searchInput));
    buildShowcase(displayedData);
}


//FINAL EXECUTION
function pageExecution() {
    buildShowcase(data);
    document.getElementById("search-field").addEventListener("keyup", filterBooks);
    window.addEventListener("resize", filterBooks);
    setTimeout(function () { //needed for correct displaying at first page load
        buildShowcase(data);
    }, 400);

}

fetchData();
