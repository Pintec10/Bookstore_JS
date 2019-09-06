var data = [];


function fetchData() {
    return fetch("https://api.myjson.com/bins/zyv02", { method: "GET" }).then(function (resp) {
        return resp.json();
    }).then(function (json) {
        data = json.books;
        console.log("data after fetch");
        console.log(data);
    }).then(function () {
        pageExecution();
    });
}


function buildShowcase() {
    let bookcase = document.getElementById("bookcase");


    for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div");
        let cardInner = document.createElement("div");
        let cardFront = document.createElement("div");
        let cover = document.createElement("img");
        let cardBack = document.createElement("div");
        let title = document.createElement("h2");
        let description = document.createElement("p");
        let button = document.createElement("button");

        card.className = "flip-card";
        cardInner.className = "flip-card-inner";
        cardFront.className = "flip-card-front";
        cover.className = "img-fluid";
        cardBack.className = "flip-card-back d-flex flex-column justify-content-center align-items-center p-3";
        button.className = "button-style bg-danger text-white rounded"

        cover.src = data[i].cover;
        title.innerHTML = data[i].title;
        description.innerHTML = data[i].description;
        button.innerHTML = "more information";

        cardFront.append(cover);
        cardBack.append(title, description, button);
        cardInner.append(cover, cardFront, cardBack);
        card.append(cardInner);

        bookcase.append(card);
    }
    console.log(bookcase);
}












//FINAL EXECUTION
fetchData();
function pageExecution() {
    console.log("executing!");
    buildShowcase();
}
