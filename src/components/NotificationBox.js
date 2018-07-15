/*
    Lil notification box
    By Zoey Désautels
*/

module.exports = class NotificationBox {
    constructor() {
        this.box = document.querySelector(".notification");
        this.text = this.box.querySelector("p");
    }

    showNotifcation(text, secs) {
        this.text.textContent = text;
        this.box.dataset.show = "true";

        if(secs > 0) {
            setTimeout(() => {
                this.hideNotifcation();
            }, secs*1000);
        }
    }

    hideNotifcation() {
        this.box.dataset.show = "false";

        setTimeout(() => {
            this.text.textContent = "";
        }, 500);
    }
}