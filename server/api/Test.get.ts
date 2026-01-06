import {defineEventHandler,getQuery} from "h3";
// import fs from "fs"
// import path from "path"
import {MongoClient} from 'mongodb';
const DB_config = useRuntimeConfig()

export default defineEventHandler(async (event)=>{
    const DBClient = new MongoClient(DB_config.dbURL)
    const {C} = getQuery(event)

    const Sentences_DB = DBClient.db('Sentences')
    const Sentences_Config = await Sentences_DB.collection('config').find().toArray()
    const allow = Sentences_Config.map(item => item.UserType)
    if (allow.includes(C)){
        const Sentences = await Sentences_DB.collection(`${C}`).find().toArray()
        const maxVal = Sentences.length - 1
        return (Sentences[randomInt(0,Number(maxVal))])
    }
    else return {
        "id":114514,
        "hitokoto":"你在访问什么呢？"
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