/**
 * Search bar component
 * By @ZoeyLovesMiki, 2019
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