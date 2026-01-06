import {defineEventHandler} from "h3";
import {MongoClient} from 'mongodb';
const DB_config = useRuntimeConfig()


export default defineEventHandler(async (event) => {
    const DBClient = new MongoClient(DB_config.dbURL)
    const Sentences_DB = DBClient.db('Sentences')
    const {UserName:Body_UserName,hitokoto:Body_Hitokoto} = await readBody(event)
    console.log(Body_Hitokoto,Body_UserName)

    async function checkBody () {
        const config = await Sentences_DB.collection('config').find({},{projection:{UserName:1}}).toArray()
        const allow = config.map(item => item.UserName)
        if (allow.includes(Body_UserName)) {
            await addHitokoto()
        }
        else console.log(false)
    }
    async function addHitokoto() {
        const config = await Sentences_DB.collection('config').find({UserName:`${Body_UserName}`},{projection:{UserType:1,_id:0}}).toArray()
        console.log(config)
        const type = config.map(item => item.UserType)
        const Sentences = await Sentences_DB.collection(`${type}`).find({},{projection:{id:1,_id:0}}).toArray()
        console.log(Sentences)

        // await Sentences_DB.collection(`${type}`).insertOne(
        //     {
        //         id:(Sentences.length+1),
        //         hitokoto:`${Body_Hitokoto}`
        //     }
        // )
        console.log("成功")
    }

    await checkBody()

})