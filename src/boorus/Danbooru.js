/**
 * Danbooru support
 * By: @ZoeyLovesMiki, 2019
 */

let Booru = require('./Booru.js');

module.exports = class Danbooru extends Booru {
    constructor() {
        const BASE_URL = "https://danbooru.donmai.us/";
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

        super.getPostsJSON(`posts.json?page=${this.page}&tags=${this.tags}`, (posts) => {
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

            if(!this.loadedIDs.includes(post.id) && !post.is_deleted) {
                handledPosts.push({
                    id: post.id,
                    thumbnail_image: post.preview_file_url,
                    file: post.file_url,
                    source: `https://danbooru.donmai.us/posts/${post.id}`
                });

                this.loadedIDs.push(post.id);
            }
        }

        callback(handledPosts);
    }
}