import {defineEventHandler} from "h3";
import { z } from 'zod'
import {v4 as uuidv4} from 'uuid'
import * as argon2 from "argon2";

export default defineEventHandler(async (event) => {
    const registerSchema = z.object({
        email: z.email('无效的电子邮箱')
            .trim()
            .toLowerCase()
            .regex(/.*@(gmail|qq|163|outlook|icloud|sina)\.(com|net|cn)$/i, {
                message: '请使用主流服务商提供的邮箱'
            }),
        password: z.string()
            .trim()
            .min(64, '请传入SHA256后的密码'),
        inviteCode: z.uuid('请输入邀请码')
            .trim(),
        userName: z.string('请输入用户名')
            .trim()
            .min(6,'用户名不得低于6位')
            .regex(/^[A-Za-z0-9]+$/,'用户名仅支持英文+数字组合')
            .max(16,'用户名不得超过16位')

    })
    const mongo = await getMongo();
    const body = await readBody(event)
    const result = registerSchema.safeParse(body)

    if (!result.success) {
        console.log(body.password)
        console.error(result.error)
        throw createError({
            statusCode: 400,
            message: '错误的请求',
            data: z.treeifyError(result.error)
        })
    }

    const { email, inviteCode, userName } = result.data
    const  password = await argon2.hash(result.data.password)

    async function CheckInvitedCode(){
        const CodeDOC = await mongo.collection('InviteCode').findOne({code: `${inviteCode}`})
        if (!CodeDOC) {
            throw createError({
                statusCode: 400,
                message: '邀请码不存在',
            });
        }
        if (CodeDOC.isUse === true) {
            throw createError({
                statusCode: 400,
                message: '邀请码已被使用'
            })
        }
    }
    async function CheckEmail(){
        const MailDoc = await mongo.collection('Users').findOne({email: `${email}`},{projection:{email:1,_id:0}})
        console.log(MailDoc)
        if (MailDoc) {
            throw createError({
                statusCode: 400,
                message: '此邮箱已被注册'
            })
        }
    }
    async function CheckUserName(){
        const NameDoc = await mongo.collection('Users').findOne({userName:`${userName}`},{projection:{userName:1,_id:0}})
        if (NameDoc) {
            throw createError({
                statusCode: 400,
                message:'此用户名已存在'
            })
        }
    }
    async function NewUser(){
        const UUID = uuidv4()
        await mongo.collection('InviteCode').updateOne({code: `${inviteCode}`}, {$set:{isUse:true}})
        await mongo.collection('Users').insertOne({
            userName:userName,
            UUID: UUID,
            email: email,
            passwordHash: password,
            permissions: 0
        })
        setResponseStatus(event, 201)
        return {
            message: '您已成功注册账号！'
        }
    }

    await CheckInvitedCode()
    await CheckEmail()
    await CheckUserName()
    return await NewUser()
})