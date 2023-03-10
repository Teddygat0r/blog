
class Post {
    constructor (title, summary, author, content, game, date, likes, comment_count, image_link, id) {
        this.title = title
        this.summary = summary
        this.author = author
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

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Post(data.title, data.summary, data.author, data.content, data.game, data.date.seconds * 1000, data.likes, data.comment_count, data.image_link, snapshot.id )
    }
}