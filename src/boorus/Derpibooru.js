/*
    Derpibooru support
    By Zoey Désautels
*/

let Booru = require('./Booru.js');

module.exports = class Derpibooru extends Booru {
    constructor() {
        const BASE_URL = "https://derpibooru.org/";
        super(BASE_URL);

        this.page = 1;
        this.tags = "";
        this.loadedIDs = [];
    }

    getPosts(page, tags) {
        if(tags != null && tags.length > 0) {
            let finaltag = "";

            for(let tag of tags) {
                if(finaltag != "") finaltag += ",";

                finaltag += tag.trim().split(" ").join("+");
            }

            tags = finaltag;
        }
        else tags = "";

        this.page = page;
        this.tags = "";

        let searchQuery = `search.json?page=${this.page}&q=${this.tags}`;
        let normalQuery = `images.json?page=${this.page}`;

        super.getPostsJSON(this.tags == "" ? normalQuery : searchQuery, (posts) => {
            console.log(posts);
            if(posts) {
                this.handlePosts(posts, (posts) => {
                    ImagesArea.loadImages(posts);
                });
            }
        });
    }

    handlePosts(posts, callback) {
        let handledPosts = [];

        posts = this.tags == "" ? posts.images : posts.search

        for(let p in posts) {
            let post = posts[p];

            if(!this.loadedIDs.includes(post.id) && !post.is_deleted) {
                handledPosts.push({
                    id: post.id,
                    thumbnail_image: post.representations.thumb.replace("//", "https://"),
                    file: post.image.replace("//", "https://"),
                    source: `https://derpibooru.org/${post.id}`
                });

                this.loadedIDs.push(post.id);
            }
        }

        callback(handledPosts);
    }
}