import { moviesCollection } from "./myMongo.js"
import { ObjectId } from "mongodb"

const getMovies = (res, type) => {
    moviesCollection.find({ type: type }, { limit: 10, sort: { year: -1 } })
        .project({
            title: 1,
            plot: 1,
            year: 1,
            genres: 1,
            runtime: 1,
            poster: 1,
            years: 1
        })
        .toArray()
        .then(resp => {
            if (!resp)
                resp = { "error": "no data found" }
            else {
                for (let doc of resp) {
                    if (doc.runtime) {
                        let hours = Math.floor(doc.runtime / 60);
                        let minutes = doc.runtime % 60
                        doc.runtime = `${hours} ${hours == 1 ? "hr" : "hrs"} ${minutes} ${minutes == 1 ? "min" : "mins"}`

                    }
                }
            }
            res.status(200).json(resp)
        })
}

const getMovie = (res, ObjectID, movieID) => {
    moviesCollection.findOne({ _id: new ObjectId(movieID) },
        {
            projection: {
                fullplot: 1,
                imdb: { rating: 1 },
                year: 1,
                title: 1,
                plot: 1,
                genres: 1,
                poster: 1,
                cast: 1,
                directors: 1,
                released: 1,
            }
        })


        .then(doc => {
            if (!doc)
                doc = { "error": "no data found" }
            if (doc.released) {
                doc.released = format(doc.released, "MMM,DD,YYYY")
                console.log(doc.released)
            }
            res.status(200).json(doc)
        })
}
const getFaves = (res) => {
    favCollection
        .find({})
        .toArray()
        .then(FavDocs => {
            if (!FavDocs)
                favDocs = { "error": "no data found" }
            res.status(200).json(FavDocs)
            console.log(FavDocs)
        })
}

export { getMovies, getMovie, getFaves }
