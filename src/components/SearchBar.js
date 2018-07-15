/*
    Everything related to the search bar
    By Zoey Désautels
*/

module.exports = class SearchBar {
    constructor() {
        this.form = document.querySelector("form");

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.doSearch()
        });
    }

    doSearch() {
        this.tags = this.form.querySelector("input").value.split(",");

        ImagesArea.clearSections();
        BoorusSelect.booru.getPosts(1, this.tags);
    }
} 