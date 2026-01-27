import { MongoClient, ServerApiVersion } from "mongodb";
import { MDBURI } from "./config.js";

const client = new MongoClient(MDBURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const myflixDB = client.db("sample_mflix")
const moviesCollection = myflixDB.collection("movies")

export { moviesCollection }