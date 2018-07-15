/*
    Danbooru support
    By Zoey Désautels
*/

let Booru = require('./Booru.js');

module.exports = class E621 extends Booru {
    constructor() {
        const BASE_URL = "https://e621.net/";
        super(BASE_URL);

        this.page = 0;
        this.tags;
        this.loadedIDs = [];
    }

    getPosts(page, tags) {
        if(tags != null) tags = tags.join("+");
        else tags = this.tags;

        this.page = page;
        this.tags = tags.trim();

        //console.log(this.tags);

        super.getPostsJSON(`post/index.json?page=${this.page}&tags=${this.tags}`, (posts) => {
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
                    thumbnail_image: post.sample_url,
                    file: post.file_url,
                    source: `https://e621.net/post/show/${post.id}`
                });

                this.loadedIDs.push(post.id);
            }
        }

        callback(handledPosts);
    }
}