import { moviesCollection } from "./myMongo.js"

const getMovies = (res) => {
    moviesCollection.find({}, {limit: 10, sort: {year: -1}})
    .project({
        title:1,
        plot:1,
        year:1,
        genres:1,
        runtime:1,
        poster:1,
        years:1
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
                        doc.runtime = `${hours} ${hours == 1? "hr" : "hrs"} ${minutes} ${minutes == 1 ? "min" : "mins"}`

                    }
                }
            }
            res.status(200).json(resp)
        })

}
export { getMovies }