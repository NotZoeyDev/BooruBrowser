/**
 * Browser thingy
 * By @ZoeyLovesMiki, 2019
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