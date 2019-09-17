/**
 * Gelbooru support
 * By @ZoeyLovesMiki, 2019
 */

let Booru = require('./Booru.js');

module.exports = class Gelbooru extends Booru {
    constructor() {
        const BASE_URL = "https://gelbooru.com/";
        super(BASE_URL);

        this.page = 1;
        this.tags;
        this.loadedIDs = [];
    }

    getPosts(page, tags) {
        if(tags != null) tags = tags.join("+");
        else tags = this.tags;

        this.page = page;
        this.tags = tags.trim();

        super.getPostsJSON(`index.php?page=dapi&s=post&q=index&json=1&pid=${this.page - 1}&tags=${tags}`, (posts) => {
            if(posts) {
                this.handlePosts(posts, (posts) => {
                    ImagesArea.loadImages(posts);
                });
            }
        });
    }

    handlePosts(posts, callback) {
        let handledPosts = [];

        for(let p in posts) {
            let post = posts[p];

            if(!this.loadedIDs.includes(post.id)) {
                handledPosts.push({
                    id: post.id,
                    thumbnail_image: post.file_url,
                    file: post.file_url,
                    source: `https://gelbooru.com/index.php?page=post&s=view&id=${post.id}`
                });

                this.loadedIDs.push(post.id);
            }
        }

        callback(handledPosts);
    }
}