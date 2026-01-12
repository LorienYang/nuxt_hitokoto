module.exports = {
    apps: [
        {
            name: 'Nuxt_Hitokoto',
            script: './.output/server/index.mjs',
            exec_mode: 'cluster',
            instances: 'max',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                NUXT_MONGO_URI: ''
            }
        }
    ]
}
