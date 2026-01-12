import {defineEventHandler} from "h3";
import { z } from 'zod'
import * as argon2 from "argon2";

export default defineEventHandler(async (event) => {

    const mongo = await getMongo()

    const loginSchema = z.object({
        email: z.email('邮箱格式不正确')
            .toLowerCase(),
        password: z.string()
            .min(64, '请传入SHA256后的密码'),
    })
    const body = await readBody(event)
    const result = loginSchema.safeParse(body)

    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: '错误的请求',
            data: z.treeifyError(result.error)
        })
    }

    const {email, password} = result.data

    async function loginUser() {
        const userFrom = await mongo.collection('Users').findOne({email:`${email}`},{projection:{_id:0}})
        if (!userFrom) {
            throw createError({
                statusCode: 401,
                message:'此用户未注册'
            })
        }
        try {
            if (await argon2.verify(userFrom.passwordHash,password)) {
                await setUserSession(event,{
                    user: {
                        uuid: userFrom.UUID,
                    }
                })
                setResponseStatus(event, 200)
                return {
                    message:'登录成功'
                }
            }else {
                setResponseStatus(event, 401)
                return {
                    message:'密码错误'
                }
            }
        }catch{
            throw createError({
                statusCode: 500,
                message:'服务器内部错误'
            })
        }
    }
    console.log()
    return await loginUser()
})