
class Comment {
    constructor (author, content, date, post, id) {
        this.author = author
        this.content = content
        this.date = date
        this.post = post
        this.id = id
    }
    toString() {
        return this.id
    }
}

export const commentConverter = {
    toFirestore: () => {

    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Comment(data.author, data.content, data.date.seconds * 1000, data.post, snapshot.id )
    }
}