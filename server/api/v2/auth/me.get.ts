export default eventHandler(async (event) => {
    const {user} = await requireUserSession(event)
    const mongo = await getMongo()
    const UserData = await mongo.collection('Users').findOne({UUID:`${user.uuid}`},{projection:{_id:0,email:1,userName:1,permissions:1}})
    if (!UserData) {
        throw createError({ statusCode: 401, message: 'User not found' })
    }
    return (UserData)
})