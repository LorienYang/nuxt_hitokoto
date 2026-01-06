import {defineEventHandler,getQuery} from "h3";
// import fs from "fs"
// import path from "path"
import {MongoClient} from 'mongodb';
const DB_config = useRuntimeConfig()

export default defineEventHandler(async (event)=>{
    const URL:(string) = DB_config.dbURL
    const DBClient = new MongoClient(URL)

    const {C} = getQuery(event)
    const database = DBClient.db('Users')
    const Sentences_DB = DBClient.db('Sentences')
    const data = await database.collection('user').find({},{projection:{_id:0,name:0,from_who:0}}).toArray()
    const allow= data.map(item => item.type)
    console.log(allow)
    if (allow.includes(C)){
        return true
        // const Max_Sentences = await Sentences_DB.collection(`${C}`).find({},{projection:{id:1}}).sort({id:-1}).limit(1).toArray()
        // const maxVal = Max_Sentences.map(Number => Number.id)
        // console.log(maxVal)
        // return (randomInt(1,Number(maxVal)))
    }

    function randomInt(min:number,max:number) {
        return Math.floor(Math.random()*(max-min+1)+min)
    }

    // try {
    //     const database = DBClient.db('Sentences')
    //     const Hitokoto = await database.collection('star').find({id:randomInt(1,2)},{projection:{_id:0}}).toArray()
    //     console.log(Hitokoto)
    //     return (Hitokoto)
    // }
    // finally {
    //     await DBClient.close();
    // }
})