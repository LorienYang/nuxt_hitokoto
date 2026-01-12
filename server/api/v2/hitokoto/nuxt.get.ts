export default defineEventHandler(async () => {
    const mongo = await getMongo()
    const Data = await mongo.collection("Sentences").aggregate([{$sample:{size:1}}]).toArray()
    const Sentences = Data[0]
    if (!Sentences) {
        throw createError({ statusCode: 404, message: '暂无一言' })
    }
    return (Sentences)
})