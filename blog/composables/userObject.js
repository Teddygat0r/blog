
class User {
    constructor (about, email, liked_posts, profile_picture, username, id) {
        this.email = email
        this.liked_posts = liked_posts
        this.profile_picture = profile_picture
        this.username = username
        this.about = about
        this.id = id
    }
    toString() {
        return this.id
    }
}

export const userConverter = {
    toFirestore: () => {

    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new User(data.about, data.email, data.liked_posts, data.profile_picture, data.username, snapshot.id )
    }
}