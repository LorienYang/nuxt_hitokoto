import {defineEventHandler} from "h3";
import {getMongo} from "~~/server/utils/mongo";
import {v4 as uuidv4} from "uuid";

export default defineEventHandler(async (event) => {
    const {user}= await requireUserSession(event)
    const mongo = await getMongo()
    const data = await mongo.collection("Users").findOne({UUID:`${user.uuid}`},{projection:{_id:0,permissions:1}})
    if (!data) {
        setResponseStatus(event, 404);
        return { message: '用户未找到' };
    }
    const permissions = data?.permissions
    const PERMISSION_SUPER_ADMIN = 2
    if(permissions < PERMISSION_SUPER_ADMIN) {
        setResponseStatus(event,403)
        return {
            message:'仅超级管理员可生成邀请码'
        }
    }
    async function CreateInvitationCode() {
        const code = uuidv4();
        await mongo.collection("InviteCode").insertOne({code:`${code}`,isUse:false});
        return {
            InviteCode: code,
        }
    }

    return CreateInvitationCode();
})
