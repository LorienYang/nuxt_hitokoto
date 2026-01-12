import { z } from 'zod'
import {v4 as uuidv4} from 'uuid'


export default defineEventHandler (async (event) => {
    const {user} = await requireUserSession(event)
    const mongo = await getMongo()

    const UserData = await mongo.collection('Users')
        .findOne({UUID:`${user.uuid}`},{projection:{_id:0,userName:1}})
    console.log(UserData?.userName)

    const HitokotoSchema = z.object({
        hitokoto: z.string('请输入文本').trim().min(1, '请输入文本'),
        original: z.string('请输入文本').trim().min(1, '请输入文本'),
        from_who: z.string('请输入文本').trim().min(1, '请输入文本'),
        types: z.string()
    })
    const body = await readBody(event)
    const result = HitokotoSchema.safeParse(body)
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: '错误的请求',
            data: z.treeifyError(result.error)
        })
    }
    const { hitokoto,types,original,from_who } = result.data

    async function CreateHitokoto(){
        const UUID = uuidv4()
        try {
            await mongo.collection('Sentences').insertOne({
                hitokoto:`${hitokoto}`,
                from_who:`${from_who}`,
                types:`${types}`,
                from:`${original}`,
                uuid:`${UUID}`,
                createdAt:`${UserData?.userName}`,
                timestamp: new Date().toISOString(),
            })
            setResponseStatus(event, 201)
            return {
                message:'提交成功'
            }
        } catch {
            throw createError({
                statusCode: 400,
                message:'提交失败'
            })
        }
    }

    return CreateHitokoto()
})