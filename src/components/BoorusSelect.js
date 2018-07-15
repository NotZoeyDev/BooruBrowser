/*
    Handles the booru selection thingy
    By Zoey Désautels
*/

module.exports = class BoorusSelect {
    constructor() {
        this.select = document.querySelector("select");
        this.boorus = {};
        this.booru;

        // Load the boorus
        let files = fs.readdirSync(`${__dirname}/../boorus/`);

        for(let file of files) {
            if(file != "Booru.js") {
                this.addBooru(`${__dirname}/../boorus/${file}`, file.replace('.js', ''));
            }
        }

        this.booru = this.boorus[this.select.childNodes[this.select.selectedIndex].value];
        this.booru.getPosts(1, []);

        this.select.addEventListener("change", () => {
            this.booru = this.boorus[this.select.childNodes[this.select.selectedIndex].value];
            ImagesArea.clearSections();
            this.booru.getPosts(1, []);
        });
    }

    addBooru(path, name) {
        this.boorus[name] = new (require(path));
        let optionElem = document.createElement("option");
        optionElem.value = name;
        optionElem.textContent = name;
        this.select.appendChild(optionElem);
    }
}