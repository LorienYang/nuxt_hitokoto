import { createReadStream } from 'node:fs'
import { resolve } from 'path'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const {type} = getQuery(event)
    function randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const ImgSrc = resolve(`./public/pic/${type}/${randomInt(1, 2)}.jpg`)

    console.log(ImgSrc)
    setHeader(event, 'Content-Type', 'image')
    return sendStream(event,createReadStream(ImgSrc))
})