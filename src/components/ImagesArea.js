/*
    Handles loading images basically
    By Zoey Désautels
*/

module.exports = class ImagesArea {
    constructor() {
        this.area = document.querySelector("main");
        
        this.area.addEventListener("scroll", (event) => {this.handleScroll(event)});
        
        this.index = 0;
    }

    // Reset the ImagesArea
    clearSections() {
        this.area.innerHTML = "";
        this.createSections();
    }

    // Create the five sections used by the system
    createSections() {
        for(let s = 0; s < 5; s++) {
            let sectionElem = document.createElement("section");
            this.area.appendChild(sectionElem);
        }
    }

    // Load images
    loadImages(posts) {
        let toLoad = posts;

        posts.forEach((post) => {

            let imgElem = document.createElement("img");
            imgElem.src = post.thumbnail_image;

            imgElem.onload = function() {
                imgElem.style.opacity = 100;
                imgElem.classList.add("show");
            }

            imgElem.addEventListener("click", () => {
                ImageViewer.loadViewer(post);
            });

            this.area.querySelectorAll("section")[this.index].appendChild(imgElem);

            this.index + 1 == 5 ? this.index = 0 : this.index += 1;
        });
    }

    handleScroll(event) {
        if(this.area.scrollHeight - this.area.scrollTop === this.area.clientHeight) {
            let page = BoorusSelect.booru.page += 1;

            BoorusSelect.booru.getPosts(page, null, (posts) => {
                this.loadImages(posts);
            });
        }
    }
}