/*
    Main component
    By Zoey Désautels
*/

module.exports = class Browser {
    constructor() {
        this.Window = remote.getCurrentWindow();

        document.addEventListener("DOMContentLoaded", () => {this.handleLoadEvent()});
    }

    handleLoadEvent() {
        ImagesArea.createSections();
    }
}