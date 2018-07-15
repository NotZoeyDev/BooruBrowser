/*
    Main Booru object
    By Zoey Désautels
*/

module.exports = class Booru {
    constructor(baseURL) {
        this.BASE_URL = baseURL;
    }

    // Get default posts json
    getPostsJSON(endpoint, callback) {
        request(`${this.BASE_URL}${endpoint}`, {
            headers: {
                'User-Agent': 'BooruBrowser (by Zoey Désautels)'
            }
        }, (err, res, body) => {
            if(err) callback(null) 
            else {
                try {
                    let posts = JSON.parse(body);
                    callback(posts);
                } catch(e) {
                    callback(null);
                }
            }
        });
    }
}