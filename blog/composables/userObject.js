
class User {
    constructor (email, liked_posts, username, id) {
        this.email = email
        this.liked_posts = liked_posts
        this.username = username
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
        return new User(data.email, data.liked_posts, data.username, snapshot.id )
    }
}