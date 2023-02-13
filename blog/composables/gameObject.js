
class Game {
    constructor (name, link, banner_link, id) {
        this.name = name
        this.link = link
        this.banner_link = banner_link
        this.id = id
    }
    toString() {
        return this.id
    }
}

export const gameConverter = {
    toFirestore: () => {

    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Game(data.name, data.link, data.banner_link, snapshot.id )
    }
}