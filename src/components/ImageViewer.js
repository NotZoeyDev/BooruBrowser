/*
    The image viewer thingy
    By Zoey Désautels
*/

module.exports = class ImageViewer {
    constructor() {
        this.viewer = document.querySelector(".viewer");
        this.image = this.viewer.querySelector("img");

        this.viewer.addEventListener("click", () => {
            this.unloadViewer();
        });

        this.image.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.handleRightClick();
        });
    }

    loadViewer(post) {
        this.image.src = post.file;
        this.image.dataset.source = post.source;

        this.image.style.display = "none";
        this.viewer.dataset.shown = "true";

        NotificationBox.showNotifcation("Loading image...", 0);

        this.image.onload = () => {
            this.image.style.display = "block";
            NotificationBox.hideNotifcation();
        }
    }

    handleRightClick() {
        let imageMenu = new Menu();

        imageMenu.append(new MenuItem({
            label: "download", click: () => { this.downloadImage(this.image.src); }
        }));

        imageMenu.append(new MenuItem({
            label: "open in browser", click: () => { this.openImage(this.image.dataset.source); }
        }));

        imageMenu.popup(Browser.Window);
    }

    downloadImage(image) {
        dialog.showSaveDialog(Browser.Window, {
            title: "Save location",
            defaultPath: path.basename(image)
        }, (filename, bookmark) => {
            if(filename) {
                request.get(image).on('error', (err) => {
                    NotificationBox.showNotifcation("Error while downloading", 5);
                }).pipe(fs.createWriteStream(filename)).on('finish', () => {
                    NotificationBox.showNotifcation("Download successful", 5);
                    clipboard.writeImage(filename);
                });
            }
        });
    }

    openImage(source) {
        shell.openExternal(source);
    }

    unloadViewer() {
        this.viewer.dataset.shown = "false";
        this.image.src = "";
        this.image.dataset.source = "";
    }
}