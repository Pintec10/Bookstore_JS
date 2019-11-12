var app = new Vue({
    el: "#app",

    data: {
        bookList: [],
        searchInput: ""
    },

    methods: {
        fetchData() {
            return fetch("https://api.myjson.com/bins/zyv02", { method: "GET" }).then(function (resp) {
                return resp.json();
            }).then(function (json) {
                app.bookList = json.books;
            }).then(function () {
                setTimeout(function () { //needed for correct displaying at first page load
                    app.assignHeight();
                }, 350);
                window.addEventListener("resize", app.assignHeight);
                document.getElementById("search-field").addEventListener("keyup", app.assignHeight);
            });
        },

        assignHeight() {
            let covers = document.querySelectorAll(".img-fluid");
            let flipInners = document.querySelectorAll(".flip-card-inner");
            for (let elem = 0; elem < covers.length; elem++) {
                console.log("ITERATION nr. " + elem);
                console.log("Assigning height to this div:");
                console.log(flipInners[elem]);
                console.log("which has a height initially of:");
                console.log(flipInners[elem].height);
                console.log("The corresponding cover is:");
                console.log(covers[elem]);
                console.log("and its height is:");
                console.log(covers[elem].height);

                flipInners[elem].style.height = covers[elem].height + "px";

                console.log("In the end, the div is (note the style height attribute which appeared):");
                console.log(flipInners[elem]);
                console.log("In the end, the div 's height is':");
                console.log(flipInners[elem].style.height);
            }
        }
    },

    computed: {
        filterBooks() {
            return this.bookList.filter(x => x.title.toLowerCase().includes(app.searchInput) || x.description.toLowerCase().includes(app.searchInput));

        },

    },

    created() {
        this.fetchData();
    }
})

