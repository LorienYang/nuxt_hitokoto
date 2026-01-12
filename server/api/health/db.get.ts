export default defineEventHandler(async () => {
    console.log('[DB URL]', useRuntimeConfig().DB_URL)

    try {
        const mongo = await getMongo()

        await mongo.command({ ping: 1 })

        return {
            ok: true,
            database: 'alive',
            time: new Date().toISOString(),
        }
    } catch (err) {
        console.error('[DB HEALTH]', err)
        throw createError({
            statusCode: 500,
            message: 'Database not reachable',
        })
    }
})
