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
                NUXT_DB_URL: 'mongodb://localhost:27017/Hitokoto',
                NUXT_SESSION_PASSWORD:'随机32位密码'
            }
        }
    ]
}
