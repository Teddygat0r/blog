
class Post {
    constructor (title, summary, content, game, date, likes, comment_count, image_link, id) {
        this.title = title
        this.summary = summary
        this.content = content
        this.game = game
        this.date = date
        this.likes = likes
        this.comment_count = comment_count
        this.image_link = image_link
        this.id = id
    }
    toString() {
        return this.id
    }
}

export const postConverter = {
    toFirestore: () => {

    },

    fromFirestore: async (snapshot, options) => {
        const data = snapshot.data(options)
        return new Post(data.title, data.summary, data.content, data.game, data.date.seconds * 1000, data.likes, data.comment_count, data.image_link, snapshot.id )
    }
}