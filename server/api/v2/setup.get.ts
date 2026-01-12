import {v4 as uuidv4} from "uuid";

export default defineEventHandler(async () => {
    const mongo = await getMongo()
    const status = await mongo
        .collection('SiteConfig')
        .findOne({ isSetup: true })
    if (status) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
            message: '服务器已完成安装，请勿再次安装！！！',
            unhandled: false,
            fatal: true
        })
    }
    await mongo.collection('InviteCode').createIndex({ code: 1 }, { unique: true })
    await mongo.collection('Users').createIndex({ email: 1 }, { unique: true })
    await mongo.collection('Users').createIndex({ UUID: 1 }, { unique: true })
    await mongo.collection('SiteConfig').createIndex({ isSetup: 1 }, { unique: true })
    await mongo.collection('SiteConfig').insertOne({ isSetup: true })
    console.log(
        '如果你在首次安装看到此日志是正常的，如果不是首次安装看到此信息请立即检查网站安全！！！'
    )

    const code = uuidv4()
    await mongo.collection('InviteCode').insertOne({code:`${code}`,isUse:false})
    return {
        message: '站点安装完成',
        InvitationCode: code,
    }
})
