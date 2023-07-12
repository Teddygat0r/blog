
class Post {
    constructor (author, comment_count, comments, content, date, game, image_link, likes, summary, title, id) {
        this.author = author
        this.comment_count = comment_count
        this.comments = comments
        this.content = content
        this.date = date
        this.game = game
        this.image_link = image_link
        this.likes = likes
        this.summary = summary
        this.title = title
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
        return new Post(data.author, data.comments.length ?? 0, data.comments, data.content, data.date.seconds * 1000, data.game, data.image_link, data.likes, data.summary, data.title, snapshot.id )
    }
}